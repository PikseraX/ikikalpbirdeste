const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {openPage,chromium}=require('./regression.cjs');
const delays=[5000,15000,30000,60000,120000];
const examples=[
 ['zh-CN','请抱住{partner}，30秒后松开。',30],
 ['zh-TW','請擁抱{partner}，30秒後放開。',30],
 ['de','Halte eine 20-sekündige Rede für {partner}.',20],
 ['el','Κάνε μια ομιλία 20 δευτερολέπτων για {partner}.',20],
 ['en','Hug {partner} for a second and smile.',1],
 ['fr','Regarde {partner} pendant une seconde en souriant.',1]
];
const purchase=id=>({productIdentifier:id,purchaseState:'1',isAcknowledged:false,purchaseToken:'token-'+id});
async function tick(p,ms){await p.clock.fastForward(ms);await p.clock.runFor(2);}
async function page(b,options={}){
 const p=await openPage(b,{billing:true,ads:true,purchases:options.purchases||[]});
 await p.addInitScript(cfg=>{
  const t=testNative,P=Capacitor.Plugins.NativePurchases,ack=P.acknowledgePurchase,products=P.getProducts;
  t.failAck=cfg.failAck!==false;t.failPrices=!!cfg.failPrices;t.ackTokens=[];t.priceAttempts=0;t.missingProducts=cfg.missingProducts||[];
  P.acknowledgePurchase=async args=>{
   t.ackTokens.push(args.purchaseToken);await ack(args);
   if(t.failAck&&(!t.failOnlyToken||t.failOnlyToken===args.purchaseToken))throw Error('Temporary acknowledgement failure');
   t.purchases.forEach(x=>{if(x.purchaseToken===args.purchaseToken)x.isAcknowledged=true;});
  };
  P.getProducts=async args=>{
   t.priceAttempts++;
   if(t.holdPrices)await new Promise(resolve=>t.releasePrices=resolve);
   const r=await products(args);if(t.failPrices)throw Error('Temporary product query failure');return {products:r.products.filter(p=>!t.missingProducts.includes(p.identifier))};
  };
 },options);
 await p.clock.install();await p.reload();await p.clock.runFor(2);
 return p;
}
async function store(p){await p.locator('#menu button').filter({hasText:'🛒'}).click();await p.clock.runFor(2);}
async function finish(p){assert.deepEqual(p.errors,[]);assert.equal(await p.evaluate(()=>testNative.maxActive),1);await p.close();}
async function buy(p,id){
 await p.locator(id==='tum_modlar'?'#btnMod':'#btnReklam').click();await p.waitForFunction(()=>!!testNative.pendingPurchase);
 await p.evaluate(x=>{testNative.purchases.push(x);testNative.emit('resume');testNative.pendingPurchase.resolve({purchaseState:'1'});},purchase(id));await p.clock.runFor(2);
}
async function acknowledgementRecovery(b){
 for(const id of ['tum_modlar','reklam_kaldir']){
  const p=await page(b);await store(p);await buy(p,id);
  const key=id==='tum_modlar'?'kartOyunModAcik':'kartOyunReklamsiz';
  assert.equal(await p.evaluate(k=>localStorage.getItem(k),key),'1','verified rights stay available while acknowledgement is pending');
  assert.equal(await p.evaluate(()=>testNative.ackTokens.length),1);
  await p.evaluate(()=>testNative.failAck=false);await tick(p,5000);
  assert.equal(await p.evaluate(()=>testNative.purchases[0].isAcknowledged),true,'failed acknowledgement must retry without an app-resume event');
  assert.equal(await p.evaluate(()=>testNative.ackTokens.length),2);
  await tick(p,600000);assert.equal(await p.evaluate(()=>testNative.ackTokens.length),2);
  assert.equal(await p.evaluate(()=>testNative.log.filter(x=>x==='purchase').length),1,'retry never starts another payment');
  await finish(p);
 }
 console.log('PASS acknowledgement recovery: both products, retained rights, no duplicate payment and retries stop after success');
}
async function acknowledgementEdges(b){
 const p=await page(b,{purchases:[purchase('reklam_kaldir')]});
 for(const ms of delays)await tick(p,ms);
 assert.equal(await p.evaluate(()=>testNative.ackTokens.length),6,'acknowledgement retry budget cannot reset after each successful ownership query');
 await tick(p,3600000);assert.equal(await p.evaluate(()=>testNative.ackTokens.length),6);
 assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunReklamsiz')),'1');
 assert(!(await p.evaluate(()=>testNative.ads)).includes('initialize'),'unacknowledged ad-free purchase still suppresses ads');
 await p.evaluate(()=>{testNative.failAck=false;testNative.emit('resume');dispatchEvent(new Event('online'));});await p.clock.runFor(2);
 assert.equal(await p.evaluate(()=>testNative.purchases[0].isAcknowledged),true);
 await finish(p);
 const restart=await page(b,{purchases:[purchase('tum_modlar')]});
 assert.equal(await restart.evaluate(()=>testNative.ackTokens.length),1);
 await restart.addInitScript(()=>testNative.failAck=false);await restart.reload();await restart.clock.runFor(2);
 assert.equal(await restart.evaluate(()=>testNative.purchases[0].isAcknowledged),true,'Play purchase records recover acknowledgements after app restart');await finish(restart);
 const revoked=await page(b,{purchases:[purchase('tum_modlar')]});
 await revoked.evaluate(()=>{testNative.purchases=[];testNative.failAck=false;});await tick(revoked,5000);
 assert.equal(await revoked.evaluate(()=>localStorage.getItem('kartOyunModAcik')),'0');
 assert.equal(await revoked.evaluate(()=>testNative.ackTokens.length),1,'a revoked purchase cannot be re-acknowledged from stale local data');
 await tick(revoked,600000);assert.equal(await revoked.evaluate(()=>testNative.log.filter(x=>x==='query').length),2);await finish(revoked);
 const mixed=await page(b);
 await mixed.evaluate(items=>{testNative.purchases=items;testNative.failOnlyToken='token-tum_modlar';testNative.emit('resume');},[purchase('tum_modlar'),purchase('reklam_kaldir')]);await mixed.clock.runFor(2);
 assert.deepEqual(await mixed.evaluate(()=>[localStorage.getItem('kartOyunModAcik'),localStorage.getItem('kartOyunReklamsiz')]),['1','1']);
 await mixed.evaluate(()=>testNative.failAck=false);await tick(mixed,5000);
 assert.deepEqual(await mixed.evaluate(()=>testNative.ackTokens),['token-tum_modlar','token-reklam_kaldir','token-tum_modlar']);
 await finish(mixed);
 const busy=await page(b,{purchases:[purchase('tum_modlar')]});await store(busy);
 await busy.locator('#btnReklam').click();await busy.waitForFunction(()=>!!testNative.pendingPurchase);
 await busy.evaluate(()=>{testNative.emit('resume');dispatchEvent(new Event('online'));});await tick(busy,60000);
 assert.equal(await busy.evaluate(()=>testNative.ackTokens.length),1,'retry must wait for a pending native purchase');
 await busy.evaluate(()=>{testNative.failAck=false;testNative.pendingPurchase.reject({code:'USER_CANCELED'});});await busy.clock.runFor(2);await tick(busy,5000);
 assert.equal(await busy.evaluate(()=>testNative.purchases[0].isAcknowledged),true);assert.equal(await busy.evaluate(()=>localStorage.getItem('kartOyunReklamsiz')),'0');
 await finish(busy);
 console.log('PASS acknowledgement edges: bounded retries, ad-free safety, restart, revoked purchases, mixed tokens and native-operation serialization');
}
async function priceRecovery(b){
 for(const mode of ['timer','online','resume']){
  const p=await page(b,{failPrices:true});await store(p);
  assert.equal(await p.locator('#btnMod').isDisabled(),true);assert.equal(await p.evaluate(()=>testNative.priceAttempts),1);
  await p.evaluate(()=>testNative.failPrices=false);
  if(mode==='timer')await tick(p,5000);
  else{await p.evaluate(event=>event==='online'?dispatchEvent(new Event('online')):testNative.emit('resume'),mode);await p.clock.runFor(2);}
  assert.equal(await p.locator('#btnMod').isEnabled(),true,mode+' must recover prices without leaving the shop');
  assert.equal(await p.locator('#btnReklam').isEnabled(),true);assert.equal(await p.evaluate(()=>testNative.priceAttempts),2);
  await tick(p,600000);assert.equal(await p.evaluate(()=>testNative.priceAttempts),2);
  await finish(p);
 }
 console.log('PASS shop recovery: timed, online and resume retries restore purchase buttons without reopening the shop');
}
async function priceEdges(b){
 const cap=await page(b,{failPrices:true});await store(cap);
 for(const ms of delays)await tick(cap,ms);assert.equal(await cap.evaluate(()=>testNative.priceAttempts),6);
 await tick(cap,3600000);assert.equal(await cap.evaluate(()=>testNative.priceAttempts),6);
 await cap.evaluate(()=>testNative.failPrices=false);await cap.locator('#btnGeriYukle').click();await cap.clock.runFor(2);
 assert.equal(await cap.locator('#btnMod').isEnabled(),true,'manual restore can also refresh failed prices after the automatic retry budget');
 await finish(cap);
 const closed=await page(b,{failPrices:true});await store(closed);await closed.locator('#btnKapat').click();
 await closed.evaluate(()=>testNative.failPrices=false);await tick(closed,600000);
 await closed.evaluate(()=>{dispatchEvent(new Event('online'));testNative.emit('resume');});await closed.clock.runFor(2);
 assert.equal(await closed.evaluate(()=>testNative.priceAttempts),1,'hidden shop must not keep querying products');
 await store(closed);assert.equal(await closed.locator('#btnMod').isEnabled(),true);await finish(closed);
 const held=await page(b,{failPrices:true});await store(held);
 await held.evaluate(()=>{testNative.failPrices=false;testNative.holdPrices=true;dispatchEvent(new Event('online'));});await held.clock.runFor(2);
 await held.waitForFunction(()=>!!testNative.releasePrices);
 await held.evaluate(()=>{for(let i=0;i<3;i++){testNative.emit('resume');dispatchEvent(new Event('online'));}});await tick(held,60000);
 assert.equal(await held.evaluate(()=>testNative.priceAttempts),2,'in-flight price refreshes are coalesced');
 await held.evaluate(()=>{testNative.holdPrices=false;testNative.releasePrices();});await held.clock.runFor(2);
 assert.equal(await held.locator('#btnMod').isEnabled(),true);await finish(held);
 console.log('PASS price retry edges: finite attempts, manual recovery, hidden shop and coalesced event refreshes');
}
async function partialPrices(b){
 for(const missing of ['tum_modlar','reklam_kaldir'])for(const event of ['timer','online','resume','restore']){
  const p=await page(b,{missingProducts:[missing]});await store(p);
  const absent=missing==='tum_modlar'?'#btnMod':'#btnReklam',present=missing==='tum_modlar'?'#btnReklam':'#btnMod';
  assert.equal(await p.locator(absent).isDisabled(),true);assert.equal(await p.locator(present).isEnabled(),true);
  await p.evaluate(()=>testNative.missingProducts=[]);
  if(event==='timer')await tick(p,5000);
  else if(event==='restore'){await p.locator('#btnGeriYukle').click();await p.clock.runFor(2);}
  else{await p.evaluate(e=>e==='online'?dispatchEvent(new Event('online')):testNative.emit('resume'),event);await p.clock.runFor(2);}
  assert.equal(await p.locator(absent).isEnabled(),true,'partial prices must recover on '+event+' without reopening');
  assert.equal(await p.locator(present).isEnabled(),true);assert.equal(await p.evaluate(()=>testNative.priceAttempts),2);
  await tick(p,600000);assert.equal(await p.evaluate(()=>testNative.priceAttempts),2);await finish(p);
 }
 console.log('PASS partial prices: both missing products, available product usable, timed/online/resume/manual recovery and retries stop');
}
async function partialPriceEdges(b){
 const cap=await page(b,{missingProducts:['reklam_kaldir']});await store(cap);
 for(const ms of delays)await tick(cap,ms);
 assert.equal(await cap.evaluate(()=>testNative.priceAttempts),6,'successful partial responses must not reset the retry budget');
 await tick(cap,3600000);assert.equal(await cap.evaluate(()=>testNative.priceAttempts),6);
 assert.equal(await cap.locator('#btnMod').isEnabled(),true);
 await cap.evaluate(()=>testNative.missingProducts=[]);await cap.locator('#btnGeriYukle').click();await cap.clock.runFor(2);
 assert.equal(await cap.locator('#btnReklam').isEnabled(),true);await finish(cap);
 const closed=await page(b,{missingProducts:['tum_modlar']});await store(closed);await closed.locator('#btnKapat').click();
 await closed.evaluate(()=>testNative.missingProducts=[]);await tick(closed,600000);
 await closed.evaluate(()=>{testNative.emit('resume');dispatchEvent(new Event('online'));});await closed.clock.runFor(2);
 assert.equal(await closed.evaluate(()=>testNative.priceAttempts),1);await store(closed);
 assert.equal(await closed.locator('#btnMod').isEnabled(),true);await finish(closed);
 const empty=await page(b,{missingProducts:['tum_modlar','reklam_kaldir']});await store(empty);
 await empty.evaluate(()=>testNative.missingProducts=[]);await tick(empty,5000);
 assert.equal(await empty.locator('#btnMod').isEnabled(),true);assert.equal(await empty.locator('#btnReklam').isEnabled(),true);await finish(empty);
 const busy=await page(b,{missingProducts:['reklam_kaldir']});await store(busy);
 await busy.locator('#btnMod').click();await busy.waitForFunction(()=>!!testNative.pendingPurchase);await tick(busy,60000);
 assert.equal(await busy.evaluate(()=>testNative.priceAttempts),1,'price retry waits for the payment operation');
 await busy.evaluate(()=>{
  testNative.missingProducts=[];testNative.purchases=[{productIdentifier:'tum_modlar',purchaseState:'1',isAcknowledged:true}];
  testNative.pendingPurchase.resolve({});
 });await busy.clock.runFor(2);await tick(busy,5000);
 assert.equal(await busy.locator('#btnReklam').isEnabled(),true);assert.equal(await busy.evaluate(()=>testNative.priceAttempts),2);await finish(busy);
 console.log('PASS partial price edges: bounded attempts, hidden shop, empty result, manual recovery and serialized payment');
}
function parserTests(){
 const c={};c.window=c;vm.runInNewContext(fs.readFileSync('www/ozellikler.js','utf8').split('/*END*/')[0],c);
 for(const [,text,seconds]of examples)assert.equal(c.sureBul(text),seconds,text);
 for(const [text,n]of [
  ['和{partner}一起做点心，五分钟内完成。',300],['１，５分钟',90],['1,5 minutes',90],
  ['请等待，1分钟30秒。',90],['20-sekündigen Vortrag',20],['eine einminütige Rede',60],['1-Minute-Aufgabe',60],
  ['ομιλία 2 λεπτών',120],['1 λεπτό και 20 δευτερολέπτων',80],
  ['Hug for a second and then relax.',1],['Hug for a second and breathe.',1],
  ['Hug for one minute and a second and smile.',61],['Regarde pendant une seconde en respirant.',1],
  ['Ask for a second and final question.',0],['Ask for a second and last question.',0],['Ask for a second and interesting question.',0],
  ['Ask a second question.',0],['Choisis une seconde enveloppe.',0],['Choisis une seconde entrée.',0],
  ['1 minute and a second question.',60],['1 minuto e un secondo tentativo.',60],
  ['-30秒',0],['請等，-30秒。',0],['-20-sekündige Rede',0],['-30 seconds',0],
  ['1.5 minutes 15 seconds',105],['Wait for 1 minute, then smile for 30 seconds.',60],['30 secondhand items',0]
 ])assert.equal(c.sureBul(text),n,text);
 console.log('PASS custom duration parsing: CJK punctuation, German adjectives, Greek cases, natural one-second tasks, decimals and ordinal/negative guards');
}
async function timerUi(b){
 const p=await openPage(b);await p.clock.install();
 for(const [lang,text,seconds]of examples){
  await p.evaluate(l=>{localStorage.setItem('kartOyunDili',l);localStorage.removeItem('kartOyunKendi');},lang);await p.reload();
  await p.locator('#menu button').filter({hasText:'🃏'}).click();await p.locator('#kendiInp').fill(text);await p.locator('#ekleKBtn').click();
  await p.evaluate(()=>{OYUNCULAR[0].ad='Ece';OYUNCULAR[1].ad='Hasan';turSayfasiAc('Romantik');Object.keys(MOD_TURLER.Romantik).forEach(k=>MOD_TURLER.Romantik[k]=k==='kendi');});
  await p.locator('#baslaBtn').click();await p.locator('#cekBtn').click();
  assert((await p.locator('#kart').textContent()).includes('Hasan'));assert.equal(await p.locator('#sureBtn').isVisible(),true,lang);
  assert.equal(await p.evaluate(()=>sureBul(sonKart)),seconds,lang);await p.locator('#sureBtn').click();
  await tick(p,Math.max(0,seconds*1000-500));assert.equal(await p.locator('#sureBtn').evaluate(e=>e.classList.contains('bitti')),false);
  await tick(p,600);assert.equal(await p.locator('#sureBtn').evaluate(e=>e.classList.contains('bitti')),true);
 }
 assert.deepEqual(p.errors,[]);await p.close();
 console.log('PASS custom timer UI: six languages, correct partner, visible buttons and real 1/20/30-second countdowns');
}
(async()=>{
 let b;try{
  if(process.argv.includes('--partial-prices')){
   b=await chromium.launch({executablePath:process.env.EDGE_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
   for(const test of [partialPrices,partialPriceEdges])await test(b);
  }else if(process.argv.includes('--reproduce')){
   try{parserTests();}catch(e){console.error('FAIL parser: '+e.message);process.exitCode=1;}
   b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
   for(const test of [acknowledgementRecovery,priceRecovery])try{await test(b);}catch(e){console.error('FAIL '+test.name+': '+e.message);process.exitCode=1;}
  }else{
   parserTests();b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
   for(const test of [acknowledgementRecovery,acknowledgementEdges,priceRecovery,priceEdges,partialPrices,partialPriceEdges,timerUi])await test(b);
  }
 }finally{if(b)await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
