const assert=require('node:assert/strict');
const {openPage,settled,chromium}=require('./regression.cjs');
const langs=['tr','en','de','fr','it','es','pt','ru','ja','el','zh-CN','zh-TW'];
const owned=id=>({productIdentifier:id,purchaseState:'1',isAcknowledged:true});
const key=id=>id==='tum_modlar'?'kartOyunModAcik':'kartOyunReklamsiz';
const button=id=>id==='tum_modlar'?'#btnMod':'#btnReklam';
async function tick(p,ms){await p.clock.fastForward(ms);await p.clock.runFor(2);}
async function queries(p){return p.evaluate(()=>testNative.log.filter(x=>x==='query').length);}
async function value(p,id){return p.evaluate(k=>localStorage.getItem(k),key(id));}
async function store(browser,purchases=[]){
 const p=await openPage(browser,{billing:true,ads:true,purchases});
 await p.waitForFunction(()=>SatinalmaDurumu.hazir);await settled(p);
 await p.clock.install();
 await p.getByRole('button',{name:'🛒 Satın alımlar',exact:true}).click();await p.clock.runFor(2);
 return p;
}
async function failedPurchase(p,id){
 await p.locator(button(id)).click();await p.waitForFunction(()=>!!testNative.pendingPurchase);
 await p.evaluate(product=>{
  testNative.purchases.push({productIdentifier:product,purchaseState:'1',isAcknowledged:true});
  testNative.failQuery=true;testNative.emit('resume');testNative.pendingPurchase.resolve({});
 },id);
 await p.clock.runFor(2);
 assert.match(await p.locator('#magazaMesaj').innerText(),/kontrol edilemedi/);
 assert.equal(await p.evaluate(()=>SatinalmaDurumu.hazir),true);
 assert.equal(await value(p,id),'0');
 assert.equal(await queries(p),2);
}
async function finish(p){assert.equal(await p.evaluate(()=>testNative.maxActive),1);assert.deepEqual(p.errors,[]);await p.close();}
async function purchaseRecovery(browser){
 for(const id of ['tum_modlar','reklam_kaldir'])for(const hasOther of [false,true]){
  const other=id==='tum_modlar'?'reklam_kaldir':'tum_modlar';
  const p=await store(browser,hasOther?[owned(other)]:[]);
  const removals=await p.evaluate(()=>testNative.ads.filter(x=>x==='remove').length);
  await failedPurchase(p,id);
  if(hasOther)assert.equal(await value(p,other),'1','temporary failure must retain the other purchase');
  await p.evaluate(()=>testNative.failQuery=false);await tick(p,5000);
  assert.equal(await value(p,id),'1','successful purchase must recover automatically while still in the foreground');
  assert.equal(await p.locator(button(id)).isDisabled(),true);
  assert.doesNotMatch(await p.locator('#magazaMesaj').innerText(),/kontrol edilemedi/,'clear the stale query error after recovery');
  if(id==='reklam_kaldir')assert((await p.evaluate(()=>testNative.ads.filter(x=>x==='remove').length))>removals,'recovered ad-free purchase removes the banner');
  if(hasOther)assert.equal(await value(p,other),'1');
  assert.equal(await queries(p),3);await tick(p,600000);
  assert.equal(await queries(p),3,'successful recovery cancels scheduled retries');
  await finish(p);
 }
 console.log('PASS post-purchase recovery: both products, foreground retry, retained ownership, banner removal and cleared error');
}
async function retryBoundaries(browser){
 const p=await store(browser,[owned('reklam_kaldir')]);await failedPurchase(p,'tum_modlar');
 for(const delay of [5000,15000,30000,60000,120000])await tick(p,delay);
 assert.equal(await queries(p),7);await tick(p,3600000);
 assert.equal(await queries(p),7,'persistent failures must stop after five automatic retries');
 assert.equal(await value(p,'tum_modlar'),'0');assert.equal(await value(p,'reklam_kaldir'),'1');
 await p.evaluate(()=>testNative.failQuery=false);await p.locator('#btnGeriYukle').click();await p.clock.runFor(2);
 assert.equal(await value(p,'tum_modlar'),'1');assert.equal(await queries(p),8);
 await tick(p,600000);assert.equal(await queries(p),8);await finish(p);
 const held=await store(browser);await failedPurchase(held,'tum_modlar');
 await held.evaluate(()=>{testNative.failQuery=false;testNative.holdQuery=true;});await tick(held,5000);
 await held.waitForFunction(()=>!!testNative.pendingQuery);
 await held.evaluate(()=>{testNative.emit('resume');dispatchEvent(new Event('online'));testNative.emit('resume');});await tick(held,60000);
 assert.equal(await queries(held),3,'resume and online cannot duplicate an in-flight retry');
 await held.evaluate(()=>{testNative.holdQuery=false;testNative.pendingQuery.resolve();});await held.clock.runFor(2);
 assert.equal(await value(held,'tum_modlar'),'1');await finish(held);
 const busy=await store(browser);await failedPurchase(busy,'tum_modlar');
 await busy.evaluate(()=>testNative.pendingPurchase=null);await busy.locator('#btnReklam').click();
 await busy.waitForFunction(()=>!!testNative.pendingPurchase);await tick(busy,60000);
 assert.equal(await queries(busy),2,'retry cannot interrupt another native purchase');
 await busy.evaluate(()=>{testNative.failQuery=false;testNative.pendingPurchase.reject({code:'USER_CANCELED'});});await busy.clock.runFor(2);
 await tick(busy,5000);
 assert.equal(await value(busy,'tum_modlar'),'1');assert.equal(await value(busy,'reklam_kaldir'),'0','cancelled purchase never grants access');
 assert.equal(await queries(busy),3);await finish(busy);
 console.log('PASS post-purchase retry limits: bounded offline attempts, manual restore, concurrent events and cancellation');
}
async function setupGame(p){
 await p.evaluate(()=>{
  testNative.exitCalls=0;Capacitor.Plugins.App.exitApp=async()=>{testNative.exitCalls++;};
  OYUNCULAR[0].ad='Ece';OYUNCULAR[1].ad='Hasan';OYUNCULAR.forEach(o=>o.cins='belirtmem');
  turSayfasiAc('Romantik');oyunuBaslat();deste=deste.slice(0,1);
 });
 await p.locator('#cekBtn').click();
}
async function summaryBack(browser){
 const p=await openPage(browser,{});
 for(const lang of langs)for(const manual of [false,true]){
  await p.evaluate(l=>localStorage.setItem('kartOyunDili',l),lang);await p.reload();await setupGame(p);
  if(manual)await p.locator('#oyun button').filter({hasText:'🏁'}).click();else await p.locator('#cekBtn').click();
  await p.locator('#ozet').waitFor({state:'visible'});
  assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'ozet');
  await p.evaluate(()=>testNative.emit('backButton'));
  assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'menu',lang+' summary back must return home');
  assert.equal(await p.evaluate(()=>testNative.exitCalls),0);
  await p.evaluate(()=>testNative.emit('backButton'));
  assert.equal(await p.evaluate(()=>testNative.exitCalls),1,'back on home retains normal exit');
 }
 assert.deepEqual(p.errors,[]);await p.close();
 console.log('PASS summary back: 12 languages, natural/manual endings, home navigation and normal home exit');
}
async function summaryAdGuard(browser){
 const p=await openPage(browser,{ads:true});await settled(p);await p.clock.install();await setupGame(p);
 await p.evaluate(()=>localStorage.setItem('kartOyunReklamSayac','14'));await p.locator('#cekBtn').click();await p.clock.runFor(2);
 assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'ozet');
 assert(await p.getByText('Kısa bir mola',{exact:true}).isVisible());
 await p.evaluate(()=>testNative.emit('backButton'));
 assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'ozet','ad guard handles the first back before summary navigation');
 await p.evaluate(()=>testNative.emit('backButton'));await tick(p,2100);
 assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'menu');
 assert.equal(await p.evaluate(()=>testNative.exitCalls),0);
 assert.equal(await p.evaluate(()=>testNative.ads.filter(x=>x==='show').length),0);
 assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunReklamSayac')),'15');
 assert.deepEqual(p.errors,[]);await p.close();
 console.log('PASS summary back preserves the ad-break guard and cancels delayed ads');
}
(async()=>{
 const b=await chromium.launch({executablePath:process.env.EDGE_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 const cases=process.argv.includes('--reproduce')?[purchaseRecovery,summaryBack]:[purchaseRecovery,retryBoundaries,summaryBack,summaryAdGuard];
 try{for(const test of cases){try{await test(b);}catch(e){console.error('FAIL '+test.name+': '+e.stack);process.exitCode=1;}}}finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
