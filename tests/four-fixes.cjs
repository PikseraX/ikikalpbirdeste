const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {openPage,settled,chromium}=require('./regression.cjs');
const langs=['tr','en','de','fr','it','es','pt','ru','ja','el','zh-CN','zh-TW'];
const paidAd={productIdentifier:'reklam_kaldir',purchaseState:'1',isAcknowledged:true};
function players(){OYUNCULAR[0].ad='Ece';OYUNCULAR[1].ad='Hasan';OYUNCULAR.forEach(o=>o.cins='belirtmem');}
async function tick(p,ms){await p.clock.fastForward(ms);await p.clock.runFor(2);}
async function failedStart(browser,options={}){
 const p=await openPage(browser,{ads:true,billing:true,failQuery:true,...options});
 await p.clock.install();await p.reload();await p.clock.runFor(2);return p;
}
async function retryTests(browser){
 for(const paid of [false,true]){
  const p=await failedStart(browser,{purchases:paid?[paidAd]:[]});
  assert.equal(await p.evaluate(()=>testNative.log.filter(x=>x==='query').length),1);
  assert.deepEqual(await p.evaluate(()=>testNative.ads),[]);
  await p.evaluate(()=>testNative.failQuery=false);
  await tick(p,5000);
  assert.equal(await p.evaluate(()=>SatinalmaDurumu.hazir),true);
  const ads=await p.evaluate(()=>testNative.ads);
  if(paid){assert(!ads.includes('form')&&!ads.includes('initialize')&&!ads.includes('banner')&&!ads.includes('prepare'));}
  else assert(ads.includes('initialize')&&ads.includes('banner')&&ads.includes('prepare'));
  await tick(p,300000);
  assert.equal(await p.evaluate(()=>testNative.log.filter(x=>x==='query').length),2,'successful query must cancel retries');
  assert.equal(await p.evaluate(()=>testNative.maxActive),1);
  assert.deepEqual(p.errors,[]);await p.close();
 }
 const cap=await failedStart(browser);
 for(const delay of [5000,15000,30000,60000,120000])await tick(cap,delay);
 assert.equal(await cap.evaluate(()=>testNative.log.filter(x=>x==='query').length),6);
 await tick(cap,3600000);
 assert.equal(await cap.evaluate(()=>testNative.log.filter(x=>x==='query').length),6,'offline retries must be bounded');
 assert.deepEqual(await cap.evaluate(()=>testNative.ads),[]);
 await cap.evaluate(()=>{testNative.failQuery=false;dispatchEvent(new Event('online'));});await cap.clock.runFor(2);
 assert.equal(await cap.evaluate(()=>SatinalmaDurumu.hazir),true);
 assert((await cap.evaluate(()=>testNative.ads)).includes('banner'));
 assert.deepEqual(cap.errors,[]);await cap.close();
 const busy=await failedStart(browser);
 await busy.getByRole('button',{name:'🛒 Satın alımlar',exact:true}).click();
 await busy.locator('#btnMod').click();await busy.waitForFunction(()=>!!testNative.pendingPurchase);
 await tick(busy,5000);
 assert.equal(await busy.evaluate(()=>testNative.log.filter(x=>x==='query').length),1,'retry must not interrupt native purchase');
 await busy.evaluate(()=>{testNative.failQuery=false;testNative.pendingPurchase.reject({code:'USER_CANCELED'});});await busy.clock.runFor(2);
 await tick(busy,5000);
 assert.equal(await busy.evaluate(()=>SatinalmaDurumu.hazir),true);
 assert.equal(await busy.evaluate(()=>testNative.maxActive),1);
 assert.deepEqual(busy.errors,[]);await busy.close();
 const held=await failedStart(browser);
 await held.evaluate(()=>{testNative.failQuery=false;testNative.holdQuery=true;});await tick(held,5000);
 await held.waitForFunction(()=>!!testNative.pendingQuery);
 await held.evaluate(()=>{testNative.emit('resume');dispatchEvent(new Event('online'));testNative.emit('resume');});await tick(held,60000);
 assert.equal(await held.evaluate(()=>testNative.log.filter(x=>x==='query').length),2);
 assert.equal(await held.evaluate(()=>testNative.maxActive),1);
 assert.deepEqual(await held.evaluate(()=>testNative.ads),[]);
 await held.evaluate(()=>{testNative.holdQuery=false;testNative.pendingQuery.resolve();});await held.clock.runFor(2);
 assert.equal(await held.evaluate(()=>SatinalmaDurumu.hazir),true);
 assert.equal(await held.evaluate(()=>testNative.ads.filter(x=>x==='initialize').length),1);
 assert.deepEqual(held.errors,[]);await held.close();
 console.log('PASS automatic ownership retry: recovery without resume, ad-free protection, bounded attempts, cancellation, serialized native calls');
}
async function adBackTests(browser){
 const p=await openPage(browser,{ads:true});await settled(p);await p.clock.install();await p.evaluate(players);
 await p.evaluate(()=>{turSayfasiAc('Romantik');oyunuBaslat();kartCek(false);localStorage.setItem('kartOyunReklamSayac','14');kartCek(false);});
 assert(await p.getByText('Kısa bir mola',{exact:true}).isVisible());
 await p.evaluate(()=>testNative.emit('backButton'));
 assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'oyun','first back dismisses the break');
 assert.equal(await p.getByText('Kısa bir mola',{exact:true}).count(),0);
 await p.evaluate(()=>{for(let i=0;i<4;i++)testNative.emit('backButton');});
 await tick(p,2100);
 assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'menu');
 assert.equal(await p.evaluate(()=>testNative.ads.filter(x=>x==='show').length),0);
 assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunReklamSayac')),'15','cancelled break cannot consume the count');
 assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunSonGecisReklamZamani')),null);
 // The already prepared ad remains usable on the next eligible action.
 await p.evaluate(()=>{turSayfasiAc('Romantik');oyunuBaslat();kartCek(false);kartCek(false);});await tick(p,2100);
 assert.equal(await p.evaluate(()=>testNative.ads.filter(x=>x==='show').length),1);
 await p.evaluate(()=>{testNative.emit('backButton');testNative.emit('interstitialAdShowed');testNative.emit('backButton');});
 assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'oyun','native ad must not navigate the underlying game');
 assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunReklamSayac')),'0');
 await p.evaluate(()=>testNative.emit('interstitialAdDismissed'));await tick(p,1100);
 await p.evaluate(()=>testNative.emit('backButton'));
 assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'turEkran','ordinary back resumes after native dismissal');
 // Navigation caused by another application path must also cancel a pending break.
 await p.evaluate(()=>{oyunuBaslat();kartCek(false);localStorage.setItem('kartOyunReklamSayac','14');localStorage.setItem('kartOyunSonGecisReklamZamani',String(Date.now()-300001));kartCek(false);goster('menu');});
 await tick(p,2100);
 assert.equal(await p.evaluate(()=>testNative.ads.filter(x=>x==='show').length),1);
 assert.equal(await p.getByText('Kısa bir mola',{exact:true}).count(),0);
 // Reaching the normal end-of-deck summary is still an eligible natural break.
 await p.evaluate(()=>{turSayfasiAc('Romantik');oyunuBaslat();deste=['Test card'];kartCek(false);localStorage.setItem('kartOyunReklamSayac','14');kartCek(false);});
 await p.clock.runFor(2);
 assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'ozet');
 await tick(p,2100);
 assert.equal(await p.evaluate(()=>testNative.ads.filter(x=>x==='show').length),2);
 assert.deepEqual(p.errors,[]);await p.close();
 console.log('PASS ad/back: dismiss break, no delayed ad in menu, native-ad navigation guard, preserved count/cooldown, summary ad');
}
function parserTests(){
 const ctx={};ctx.window=ctx;vm.runInNewContext(fs.readFileSync('www/ozellikler.js','utf8').split('/*END*/')[0],ctx);
 const noDuration=['Ask {partner} a second question.','Give {partner} a second chance.','Ask for a second question.','Ask for a second and final question.','Ask a second long question.',
  'Pose une seconde question à {partner}.','Fai un secondo tentativo.','Haz un segundo intento.','Planeje um segundo encontro com {partner}.'];
 for(const t of noDuration)assert.equal(ctx.sureBul(t),0,t);
 for(const t of ['Wait a second.','Wait a second before answering.','Hug {partner} for a second, then smile.',
  'Wait a second and then smile.','Attends une seconde avant de répondre.','Aspetta un secondo.',
  'Espera un segundo.','Aguarde um segundo.','un secondo','bir saniye','eine Sekunde','одну секунду','ένα δευτερόλεπτο'])assert.equal(ctx.sureBul(t),1,t);
 for(const [t,seconds]of [
  ['Ask a second question, then hug for 30 seconds.',30],
  ['Pose une seconde question, puis attends 2 minutes.',120],
  ['Fai un secondo tentativo per 20 secondi.',20],
  ['Haz un segundo intento durante 1 minuto.',60],
  ['Planeje um segundo encontro e abrace por 30 segundos.',30],
  ['Hug for 1 second.',1],['Hug for one minute.',60],['30 Sekunden',30],['30 δευτερόλεπτα',30],['３０秒',30],['一分钟',60]
 ])assert.equal(ctx.sureBul(t),seconds,t);
 console.log('PASS duration parsing: ordinals excluded in five languages, later actual durations found, explicit/written durations retained');
}
async function ordinalUiTests(browser){
 const p=await openPage(browser);
 const examples={en:'Ask {partner} a second question.',fr:'Pose une seconde question à {partner}.',it:'Fai un secondo tentativo con {partner}.',es:'Haz un segundo intento con {partner}.',pt:'Planeje um segundo encontro com {partner}.'};
 for(const [lang,task]of Object.entries(examples)){
  await p.evaluate(l=>{localStorage.setItem('kartOyunDili',l);localStorage.removeItem('kartOyunKendi');},lang);await p.reload();
  await p.locator('#menu button').filter({hasText:'🃏'}).click();await p.locator('#kendiInp').fill(task);await p.locator('#ekleKBtn').click();
  await p.evaluate(players);
  await p.evaluate(()=>{turSayfasiAc('Romantik');Object.keys(MOD_TURLER.Romantik).forEach(k=>MOD_TURLER.Romantik[k]=k==='kendi');});
  await p.locator('#baslaBtn').click();await p.locator('#cekBtn').click();
  assert((await p.locator('#kart').textContent()).includes('Hasan'));
  assert.equal(await p.locator('#sureBtn').isVisible(),false,lang);
 }
 assert.deepEqual(p.errors,[]);await p.close();
 console.log('PASS custom-card UI: saved ordinal tasks have the selected name and no spurious timer in five languages');
}
async function frames(p){await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>requestAnimationFrame(r)))));}
async function titleTests(browser){
 const p=await openPage(browser);let checks=0;
 for(const lang of langs){
  await p.evaluate(l=>localStorage.setItem('kartOyunDili',l),lang);await p.reload();
  for(const width of [320,360,390,768,320]){
   await p.setViewportSize({width,height:800});await frames(p);
   const layout=await p.evaluate(()=>{
    const box=document.querySelector('.logoY'),heart=document.querySelector('.logoK'),br=box.getBoundingClientRect(),hr=heart.getBoundingClientRect();
    return {font:parseFloat(getComputedStyle(box).fontSize),heartFont:getComputedStyle(heart).fontSize,heartAbove:hr.bottom<=br.top+1,centerDelta:Math.abs(hr.left+hr.width/2-br.left-br.width/2),
     lines:[...document.querySelectorAll('#oyunBaslik>span')].map(e=>{const r=document.createRange();r.selectNodeContents(e);const rects=[...r.getClientRects()];return{text:e.textContent,count:new Set(rects.map(r=>r.y)).size,inside:rects.every(r=>r.left>=br.left-1&&r.right<=br.right+1)};})};
   });
   assert(layout.lines.every(x=>x.count===1&&x.inside),lang+'/'+width+JSON.stringify(layout));
   assert(layout.font>=20&&layout.font<=35.21,JSON.stringify(layout));
   assert.equal(layout.heartFont,'64px');assert(layout.heartAbove&&layout.centerDelta<1,JSON.stringify(layout));checks++;
  }
  await p.evaluate(()=>goster('oyuncular'));await p.setViewportSize({width:360,height:640});await p.evaluate(()=>goster('menu'));await frames(p);
  const fits=await p.locator('.logoY').evaluate(e=>e.scrollWidth<=e.clientWidth+1);assert(fits,lang+' hidden-menu resize');
 }
 assert.deepEqual(p.errors,[]);await p.close();
 console.log('PASS localized title: '+checks+' width/language checks, two lines, no clipping, responsive resizing, original heart size/position');
}
(async()=>{
 parserTests();
 const b=await chromium.launch({executablePath:process.env.EDGE_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 try{await retryTests(b);await adBackTests(b);await ordinalUiTests(b);await titleTests(b);}finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
