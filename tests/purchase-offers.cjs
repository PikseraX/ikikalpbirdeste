const assert=require('node:assert/strict');
const {openPage,settled,chromium}=require('./regression.cjs');
const ids=['tum_modlar','reklam_kaldir'];
const button=id=>id==='tum_modlar'?'#btnMod':'#btnReklam';
const offer=(id,token,price)=>({identifier:id,priceString:price,offerToken:token});
async function setup(b,offers){
 const p=await openPage(b,{billing:true});await settled(p);
 await p.evaluate(items=>{
  testNative.offers=items;testNative.sent=[];testNative.productQueries=0;
  const P=Capacitor.Plugins.NativePurchases,buy=P.purchaseProduct,products=P.getProducts;
  P.getProducts=async args=>{
   testNative.productQueries++;
   if(testNative.holdProducts)await new Promise(r=>testNative.releaseProducts=r);
   await products(args);return {products:testNative.offers};
  };
  P.purchaseProduct=args=>{testNative.sent.push(args);return buy(args);};
 },offers);
 await p.locator('#menu button').filter({hasText:'🛒'}).click();await settled(p);return p;
}
async function finish(p){assert.deepEqual(p.errors,[]);assert.equal(await p.evaluate(()=>testNative.maxActive),1);await p.close();}
async function choices(b){
 for(const id of ids)for(const order of ['base-first','promo-first','single','legacy']){
  const base=offer(id,'base','€4.99'),promo=offer(id,'promo','€1.99');
  const offers=order==='base-first'?[base,promo]:order==='promo-first'?[promo,base]:order==='single'?[promo]:[{identifier:id,priceString:'€4.99'}];
  const p=await setup(b,offers.concat([offer(ids.find(x=>x!==id),'other','€9.99')]));
  assert((await p.locator(button(id)).innerText()).includes(offers[0].priceString),'select the first eligible offer deliberately');
  await p.locator(button(id)).click();await p.waitForFunction(()=>testNative.sent.length===1);
  const sent=await p.evaluate(()=>testNative.sent[0]);
  assert.equal(sent.offerToken,offers[0].offerToken,'payment must receive the token belonging to the displayed price');
  assert.equal(sent.productIdentifier,id);assert.equal(sent.quantity,1);
  await p.evaluate(()=>testNative.pendingPurchase.reject({code:'USER_CANCELED'}));await settled(p);await finish(p);
 }
 console.log('PASS offer selection: both products, both offer orders, single offer and legacy product without token');
}
async function expiredOffers(b){
 for(const error of [{message:'Offer token not found for product: tum_modlar'},{code:'ITEM_UNAVAILABLE',message:'Purchase is not purchased'}]){
  const p=await setup(b,[offer('tum_modlar','old','€1.99'),offer('reklam_kaldir','other','€9.99')]);
  await p.locator('#btnMod').click();await p.waitForFunction(()=>testNative.sent.length===1);
  await p.evaluate(e=>{testNative.offers[0]={identifier:'tum_modlar',offerToken:'new',priceString:'€4.99'};testNative.pendingPurchase.reject(e);},error);await settled(p);
  assert.equal(await p.evaluate(()=>testNative.productQueries),2,'invalid offer refreshes the shop');
  assert((await p.locator('#btnMod').innerText()).includes('€4.99'));
  assert.equal(await p.evaluate(()=>testNative.sent.length),1,'new price must never trigger an automatic payment');
  assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunModAcik')),'0');
  await p.locator('#btnMod').click();await p.waitForFunction(()=>testNative.sent.length===2);
  assert.equal(await p.evaluate(()=>testNative.sent[1].offerToken),'new');
  await p.evaluate(()=>{testNative.purchases=[{productIdentifier:'tum_modlar',purchaseState:'1',isAcknowledged:true}];testNative.pendingPurchase.resolve({});});await settled(p);
  assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunModAcik')),'1');await finish(p);
 }
 console.log('PASS expired offers: token-not-found and unavailable errors refresh prices; new payment requires a new user action');
}
async function queuedOffer(b){
 const p=await setup(b,[offer('tum_modlar','clicked','€1.99'),offer('reklam_kaldir','other','€9.99')]);
 await p.locator('#btnKapat').click();await p.evaluate(()=>testNative.holdProducts=true);
 await p.locator('#menu button').filter({hasText:'🛒'}).click();await p.waitForFunction(()=>!!testNative.releaseProducts);
 await p.locator('#btnMod').click();
 await p.evaluate(()=>{testNative.offers[0]={identifier:'tum_modlar',offerToken:'refreshed',priceString:'€4.99'};testNative.holdProducts=false;testNative.releaseProducts();});
 await p.waitForFunction(()=>testNative.sent.length===1);
 assert.equal(await p.evaluate(()=>testNative.sent[0].offerToken),'clicked','queued payment retains the offer visible when clicked');
 await p.evaluate(()=>testNative.pendingPurchase.reject({code:'USER_CANCELED'}));await settled(p);await finish(p);
 console.log('PASS queued price refresh: selected token is captured at click time, native operations stay serialized');
}
(async()=>{const b=await chromium.launch({executablePath:process.env.EDGE_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
try{await choices(b);await expiredOffers(b);await queuedOffer(b);}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
