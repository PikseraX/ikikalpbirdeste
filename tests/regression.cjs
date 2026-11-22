
/* Run from the project root: node tests/regression.cjs
   Uses PLAYWRIGHT_MODULE when set, otherwise the Codex bundled Playwright. */
const path = require('node:path'), fs = require('node:fs'), vm = require('node:vm');
const assert = require('node:assert/strict');
const pw = process.env.PLAYWRIGHT_MODULE || path.join(process.env.USERPROFILE, '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {chromium} = require(pw);
const root=path.resolve(__dirname,'..');
async function openPage(browser, nativeOptions){
  const p=await browser.newPage({viewport:{width:320,height:640},serviceWorkers:'block',reducedMotion:'reduce'});
  p.errors=[];p.on('pageerror',e=>p.errors.push(e.message));
  await p.route('https://game.test/**',r=>r.fulfill({path:path.join(root,'www',new URL(r.request().url()).pathname)}));
  if(nativeOptions) await p.addInitScript(mockNative,nativeOptions);
  await p.goto('https://game.test/index.html');
  return p;
}
function mockNative(options){
  const t=window.testNative={log:[],events:{},consent:options.consent||{canRequestAds:true,privacyOptionsRequirementStatus:'REQUIRED',status:'OBTAINED'},ads:[],purchases:options.purchases||[],active:0,maxActive:0};
  t.holdQuery=!!options.holdQuery;t.failQuery=!!options.failQuery;t.failInfo=!!options.failInfo;t.holdPrepare=!!options.holdPrepare;if(options.paid)localStorage.setItem('kartOyunReklamsiz','1');
  const deferred=key=>new Promise((resolve,reject)=>{t[key]={resolve,reject};});
  const event=(name,fn)=>{(t.events[name]||(t.events[name]=[])).push(fn);return Promise.resolve({remove(){}});};
  t.emit=(name,arg)=>{(t.events[name]||[]).forEach(fn=>fn(arg));};
  const billing=async(name,fn)=>{t.log.push(name);t.active++;t.maxActive=Math.max(t.maxActive,t.active);try{return await fn();}finally{t.active--;}};
  const plugins={App:{addListener:event,exitApp:async()=>{}}};
  if(options.ads)plugins.AdMob={
    addListener:event,
    requestConsentInfo:async()=>{t.ads.push('info');if(t.failInfo)throw Error('offline');return t.consent;},
    showConsentForm:async()=>{t.ads.push('form');if(options.holdConsent&&!t.consentReleased){await deferred('pendingConsent');t.consentReleased=true;}return t.consent;},
    showPrivacyOptionsForm:async()=>{t.ads.push('privacy');await deferred('pendingPrivacy');},
    initialize:async()=>{t.ads.push('initialize');},
    showBanner:async()=>{t.ads.push('banner');},
    removeBanner:async()=>{t.ads.push('remove');},
    prepareInterstitial:async()=>{t.ads.push('prepare');if(t.holdPrepare)await deferred('pendingPrepare');},
    showInterstitial:async()=>{t.ads.push('show');if(t.failShow)throw Error('show failed');}
  };
  if(options.billing)plugins.NativePurchases={
    addListener:event,
    getProducts:opts=>billing('products',async()=>{t.productRequest=opts;return {products:opts.productIdentifiers.map(identifier=>({identifier,priceString:'€1.00'}))};}),
    getPurchases:opts=>billing('query',async()=>{t.entitlementRequest=opts;if(t.failQuery)throw Error('offline');if(t.holdQuery)await deferred('pendingQuery');return {purchases:t.purchases};}),
    purchaseProduct:opts=>billing('purchase',()=>deferred('pendingPurchase')),
    restorePurchases:()=>billing('restore',async()=>{}),
    acknowledgePurchase:()=>billing('ack',async()=>{})
  };
  window.Capacitor={Plugins:plugins,getPlatform:()=>options.platform||'android'};
}
async function settled(p){await p.evaluate(()=>new Promise(r=>setTimeout(r,30)));}
async function billingTests(browser){
  const p=await openPage(browser,{billing:true});await settled(p);
  await p.getByRole('button',{name:'🛒 Satın alımlar',exact:true}).click();await settled(p);
  assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'magaza');
  await p.evaluate(()=>{document.getElementById('btnMod').click();document.getElementById('btnMod').click();document.getElementById('btnReklam').click();document.getElementById('btnGeriYukle').click();testNative.emit('resume');});
  await p.waitForFunction(()=>!!testNative.pendingPurchase);
  let state=await p.evaluate(()=>({log:testNative.log,disabled:['btnMod','btnReklam','btnGeriYukle'].map(id=>document.getElementById(id).disabled),max:testNative.maxActive}));
  assert.equal(state.log.filter(x=>x==='purchase').length,1);assert(!state.log.includes('restore'));assert(state.disabled.every(Boolean));assert.equal(state.max,1);
  await p.evaluate(()=>testNative.pendingPurchase.reject({message:'Purchase is not purchased',code:'USER_CANCELED'}));await settled(p);
  assert.match(await p.locator('#magazaMesaj').innerText(),/iptal edildi/);assert.equal(await p.locator('#btnMod').isEnabled(),true);
  await p.locator('#btnMod').click();await settled(p);
  await p.evaluate(()=>{testNative.purchases=[{productIdentifier:'tum_modlar',purchaseState:'1',isAcknowledged:false,purchaseToken:'mock-token'}];testNative.pendingPurchase.resolve({});});await settled(p);
  assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunModAcik')),'1');
  assert.match(await p.locator('#magazaMesaj').innerText(),/Teşekkürler/);
  await p.evaluate(()=>{testNative.failQuery=true;testNative.emit('resume');});await settled(p);
  assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunModAcik')),'1','failed refresh must retain paid access');
  await p.evaluate(()=>{testNative.failQuery=false;testNative.purchases.push({productIdentifier:'reklam_kaldir',purchaseState:'PURCHASED'});});
  await p.locator('#btnGeriYukle').click();await settled(p);
  assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunReklamsiz')),'1');
  assert.equal(await p.evaluate(()=>testNative.maxActive),1);
  assert.deepEqual(p.errors,[]);await p.close();console.log('PASS billing: serialized purchase/restore/query/ack, cancellation, ownership preservation');
}

async function pendingPurchaseTests(browser){
 const p=await openPage(browser,{billing:true});
 await p.getByRole('button',{name:'🛒 Satın alımlar',exact:true}).click();
 await p.locator('#btnMod').click();await p.waitForFunction(()=>!!testNative.pendingPurchase);
 await p.evaluate(()=>{
  testNative.purchases=[{productIdentifier:'tum_modlar',purchaseState:'2',isAcknowledged:false,purchaseToken:'pending-token'}];
  testNative.pendingPurchase.reject(new Error('Purchase is pending'));
 });await settled(p);
 assert.match(await p.locator('#magazaMesaj').innerText(),/Ödeme beklemede/);
 assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunModAcik')),'0');
 await p.evaluate(()=>testNative.emit('resume'));await settled(p);
 assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunModAcik')),'0','pending payment must not unlock modes');
 assert.equal(await p.evaluate(()=>testNative.log.includes('ack')),false,'pending payment must not be acknowledged');
 await p.evaluate(()=>{testNative.purchases[0].purchaseState='1';testNative.emit('resume');});await settled(p);
 assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunModAcik')),'1','approved payment must unlock on resume');
 assert.equal(await p.evaluate(()=>testNative.log.includes('ack')),true);
 assert.equal(await p.evaluate(()=>testNative.maxActive),1);
 assert.deepEqual(p.errors,[]);await p.close();
 console.log('PASS pending payment: clear message, no premature unlock/acknowledgement, approved purchase restored on resume');
}

async function storeKitTests(browser){
 const p=await openPage(browser,{billing:true,ads:true,platform:'ios'});
 assert(await p.locator('#gizlilikPolitikasi').isVisible());
 await p.getByRole('button',{name:'🛒 Satın alımlar',exact:true}).click();
 await p.locator('#btnMod').click();
 await p.waitForFunction(()=>!!testNative.pendingPurchase);
 assert.equal(await p.locator('#btnReklam').count(),0);
 assert.deepEqual(await p.evaluate(()=>testNative.productRequest.productIdentifiers),['tum_modlar']);
 assert.equal(await p.evaluate(()=>testNative.entitlementRequest.onlyCurrentEntitlements),true);
 await p.evaluate(()=>testNative.pendingPurchase.reject(new Error('Transaction pending')));
 await p.waitForFunction(()=>document.getElementById('magazaMesaj').textContent.includes('App Store onayı'));
 assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunModAcik')),'0');
 await p.evaluate(()=>{
   testNative.purchases=[{productIdentifier:'tum_modlar',transactionId:'101'}];
   testNative.emit('transactionUpdated');
 });
 await p.waitForFunction(()=>localStorage.getItem('kartOyunModAcik')==='1');
 await p.locator('#btnGeriYukle').click();
 await p.waitForFunction(()=>document.getElementById('magazaMesaj').textContent.includes('geri yüklendi'));
 await p.evaluate(()=>{testNative.purchases[0].revocationDate='2026-11-19';testNative.emit('transactionUpdated');});
 await p.waitForFunction(()=>localStorage.getItem('kartOyunModAcik')==='0');
 assert.deepEqual(await p.evaluate(()=>testNative.ads),[]);
 assert.equal(await p.evaluate(()=>testNative.log.includes('ack')),false);
 assert.deepEqual(p.errors,[]);
 await p.close();
 console.log('PASS iOS StoreKit: product selection, pending approval, restored and revoked entitlements, no advertising');
}

async function consentTests(browser){
  const p=await openPage(browser,{ads:true,holdConsent:true});
  await p.waitForFunction(()=>!!testNative.pendingConsent);
  let log=await p.evaluate(()=>testNative.ads);assert(!log.includes('initialize')&&!log.includes('banner')&&!log.includes('prepare'));
  await p.evaluate(()=>{testNative.emit('resume');window.bannerYenidenGoster();testNative.pendingConsent.resolve();});await settled(p);
  log=await p.evaluate(()=>testNative.ads);assert.equal(log.filter(x=>x==='initialize').length,1);assert.equal(log.filter(x=>x==='info').length,1);assert(log.includes('banner')&&log.includes('prepare'));
  assert(await p.locator('#gizlilikBtn').isVisible());
  await p.locator('#gizlilikBtn').click();await p.waitForFunction(()=>!!testNative.pendingPrivacy);
  await p.evaluate(()=>{testNative.consent.canRequestAds=false;testNative.pendingPrivacy.resolve();});await settled(p);
  const before=await p.evaluate(()=>testNative.ads.filter(x=>x==='banner'||x==='prepare').length);
  await p.evaluate(()=>{testNative.emit('resume');window.bannerYenidenGoster();});await settled(p);
  assert.equal(await p.evaluate(()=>testNative.ads.filter(x=>x==='banner'||x==='prepare').length),before);
  assert.equal(await p.evaluate(()=>ReklamTani.onay),'bekliyor');
  await p.locator('#gizlilikBtn').click();await settled(p);
  await p.evaluate(()=>{testNative.consent.canRequestAds=true;testNative.pendingPrivacy.resolve();});await settled(p);
  assert((await p.evaluate(()=>testNative.ads.filter(x=>x==='banner').length))>=2);
  // Failing interstitial calls cannot consume the count or start the cooldown.
  await p.clock.install();
  await p.evaluate(()=>{ilk=false;oyunBitti=true;testNative.failShow=true;});
  // Drive the public wrapper with the game active and a long harmless deck.
  await p.evaluate(()=>{OYUNCULAR[0].ad='Deniz';OYUNCULAR[1].ad='Ece';turSayfasiAc('Romantik');oyunuBaslat();deste=Array(100).fill('Test');kartCek(false);for(let i=0;i<15;i++)kartCek(true);});
  await p.clock.fastForward(2100);
  assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunReklamSayac')),'15');
  assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunSonGecisReklamZamani')),null);
  await p.clock.fastForward(1100);
  await p.evaluate(()=>{testNative.failShow=false;kartCek(false);});await p.clock.fastForward(2100);
  await p.evaluate(()=>testNative.emit('interstitialAdShowed'));
  assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunReklamSayac')),'0');
  await p.evaluate(()=>testNative.emit('interstitialAdDismissed'));await p.clock.fastForward(1100);
  const shown=await p.evaluate(()=>testNative.ads.filter(x=>x==='show').length);
  await p.evaluate(()=>{for(let i=0;i<20;i++)kartCek(i>=8);});await p.clock.fastForward(2100);
  assert.equal(await p.evaluate(()=>testNative.ads.filter(x=>x==='show').length),shown);
  await p.clock.fastForward(300000);await p.evaluate(()=>kartCek(false));await p.clock.fastForward(2100);
  assert.equal(await p.evaluate(()=>testNative.ads.filter(x=>x==='show').length),shown+1);
  assert.deepEqual(p.errors,[]);await p.close();
  const denied=await openPage(browser,{ads:true,consent:{canRequestAds:false,status:'REQUIRED',privacyOptionsRequirementStatus:'REQUIRED'}});
  await settled(denied);assert.equal(await denied.evaluate(()=>testNative.ads.includes('initialize')),false);assert.deepEqual(denied.errors,[]);await denied.close();
  console.log('PASS consent/ads: gate before requests, privacy changes, single initialization, failure retention, 15 actions AND 5 minutes');
}

async function consentEdgeTests(browser){
  const p=await openPage(browser,{ads:true,failInfo:true});
  await settled(p);
  assert.equal(await p.evaluate(()=>testNative.ads.includes('initialize')),false);
  await p.evaluate(()=>{testNative.failInfo=false;window.dispatchEvent(new Event('online'));});await settled(p);
  assert.equal(await p.evaluate(()=>testNative.ads.filter(x=>x==='initialize').length),1);
  assert.deepEqual(p.errors,[]);await p.close();
  const paid=await openPage(browser,{ads:true,paid:true,holdConsent:true,consent:{canRequestAds:false,status:'REQUIRED',privacyOptionsRequirementStatus:'REQUIRED'}});
  await settled(paid);
  assert.equal(await paid.evaluate(()=>testNative.ads.includes('form')),false);
  assert.equal(await paid.evaluate(()=>testNative.ads.includes('initialize')),false);
  await paid.evaluate(()=>{localStorage.setItem('kartOyunReklamsiz','0');window.bannerYenidenGoster();});
  await paid.waitForFunction(()=>!!testNative.pendingConsent);
  await paid.evaluate(()=>{testNative.consent.canRequestAds=true;testNative.pendingConsent.resolve();});await settled(paid);
  assert.equal(await paid.evaluate(()=>testNative.ads.filter(x=>x==='initialize').length),1);
  assert.deepEqual(paid.errors,[]);await paid.close();
  // A prepared ad from before the privacy change must not be eligible afterward.
  const stale=await openPage(browser,{ads:true,holdPrepare:true});await stale.waitForFunction(()=>!!testNative.pendingPrepare);
  await stale.locator('#gizlilikBtn').click();await stale.waitForFunction(()=>!!testNative.pendingPrivacy);
  await stale.evaluate(()=>{testNative.consent.canRequestAds=false;testNative.pendingPrivacy.resolve();testNative.pendingPrepare.resolve();});await settled(stale);
  await stale.evaluate(()=>{OYUNCULAR[0].ad='A';OYUNCULAR[1].ad='B';turSayfasiAc('Romantik');oyunuBaslat();kartCek(false);for(let i=0;i<16;i++)kartCek(true);});
  assert.equal(await stale.evaluate(()=>testNative.ads.includes('show')),false);
  assert.equal(await stale.locator('#reklamGizlilikMesaj').isVisible(),false);
  assert.deepEqual(stale.errors,[]);await stale.close();
  console.log('PASS consent edges: offline retry, refunded ad-free purchase, stale prepared ad after privacy change');
}


async function customPreferencesTests(browser){
 const p=await openPage(browser);
 const originalCount=await p.evaluate(()=>GOREVLER.Romantik.length);
 await p.getByRole('button',{name:'🃏 Kartlarım',exact:true}).click();
 await p.locator('#kendiInp').fill('Our custom-only card.');await p.locator('#ekleKBtn').click();
 await p.evaluate(()=>{turSayfasiAc('Romantik');mevcutTurler(mod).forEach(t=>turDegis(t.k));});
 assert.equal(await p.evaluate(()=>gorevSayisi('Romantik')),1);
 await p.reload();
 assert.equal(await p.evaluate(()=>gorevSayisi('Romantik')),1,'custom-only selection must survive restart');
 assert.equal(await p.evaluate(()=>mevcutTurler('Romantik').some(t=>MOD_TURLER.Romantik[t.k])),false);
 await p.locator('#dilSecim select').selectOption('en');
 await p.waitForFunction(()=>window.DIL&&DIL.kod==='en');
 assert.equal(await p.evaluate(()=>gorevSayisi('Romantik')),1,'language change must preserve custom-only selection');
 const deck=await p.evaluate(()=>{OYUNCULAR[0].ad='Deniz';OYUNCULAR[1].ad='Ece';turSayfasiAc('Romantik');oyunuBaslat();return deste;});
 assert.deepEqual(deck,['Our custom-only card.']);
 await p.locator('#oyun button').filter({hasText:'🏁'}).click();await p.locator('#ozMenu').click();
 await p.getByRole('button',{name:'🃏 My Cards',exact:true}).click();
 await p.locator('#kartListe .kitem button').click();
 assert.equal(await p.evaluate(()=>gorevSayisi('Romantik')),originalCount,'deleting last custom card must restore playable categories');
 await p.evaluate(()=>{const prefs=JSON.parse(localStorage.getItem('kartOyunModTurler'));Object.keys(prefs.Romantik).forEach(k=>prefs.Romantik[k]=false);localStorage.setItem('kartOyunModTurler',JSON.stringify(prefs));});
 await p.reload();
 assert.equal(await p.evaluate(()=>gorevSayisi('Romantik')),originalCount,'empty selection without custom cards must recover');
 assert.deepEqual(p.errors,[]);await p.close();
 console.log('PASS custom-only categories: restart, language change, real deck, last-card deletion and empty-selection recovery');
}
async function restartLayoutTests(browser){
 const p=await openPage(browser,{ads:true});
 await p.evaluate(()=>{testNative.emit('bannerAdSizeChanged',{height:50});OYUNCULAR[0].ad='Deniz';OYUNCULAR[1].ad='Ece';turSayfasiAc('Romantik');oyunuBaslat();});
 await p.locator('#cekBtn').click();
 const scrolled=await p.locator('#oyun').evaluate(e=>{e.scrollTop=e.scrollHeight;return e.scrollTop;});
 assert(scrolled>0,'fixture must scroll on a small screen');
 await p.getByRole('button',{name:'🏁 Oyunu bitir',exact:true}).click();await p.locator('#ozTekrar').click();
 await settled(p);
 const layout=await p.evaluate(async()=>{
  const card=document.getElementById('kart');await Promise.all(card.getAnimations().map(a=>a.finished.catch(()=>{})));
  return {scroll:document.getElementById('oyun').scrollTop,titleTop:document.getElementById('modAdi').getBoundingClientRect().top,cardTop:card.getBoundingClientRect().top};
 });
 assert.equal(layout.scroll,0);assert(layout.titleTop>=0);assert(layout.cardTop>=0);
 await p.getByRole('button',{name:'← Türleri değiştir',exact:true}).click();await p.locator('#baslaBtn').click();
 assert.equal(await p.locator('#oyun').evaluate(e=>e.scrollTop),0,'new game after category selection must also start at the top');
 assert.deepEqual(p.errors,[]);await p.close();
 console.log('PASS small-screen restart: summary replay and category restart reset scroll with banner space reserved');
}

async function uiTests(browser){
 const p=await openPage(browser);
 const langs=['tr','en','de','fr','it','es','pt','ru','ja','el','zh-CN','zh-TW'];
 for(const lang of langs){
  await p.evaluate(l=>{localStorage.setItem('kartOyunDili',l);localStorage.setItem('kartOyunModAcik','1');},lang);await p.reload();
  const result=await p.evaluate(async()=>{
   const wait=()=>new Promise(r=>setTimeout(r,10)),issues=[];
   OYUNCULAR[0].ad='Hayat';OYUNCULAR[1].ad='Sohbet';OYUNCULAR.forEach(o=>o.cins='belirtmem');
   const cards=Object.values(GOREVLER).flat();if(cards.length!==306)issues.push('deck count');
   const pending="Ödeme beklemede. Google Play'deki ödeme adımlarını tamamla. Onaylandıktan sonra satın alımlarını geri yükleyebilirsin.";if(DIL.kod!=='tr'&&DIL.cevir(pending)===pending)issues.push('pending payment translation');
   if(cards.some(r=>DIL.cevir(r[1])!==r[1]))issues.push('card translation mutation');
   for(const m of MODLAR){
    turSayfasiAc(m.ad);await wait();
    const grid=[...document.querySelectorAll('#turGrid button')].map(x=>x.getBoundingClientRect());
    if(grid.some(r=>r.left<0||r.right>innerWidth+1))issues.push('grid '+m.ad);
    oyunuBaslat();await wait();
    if(m.ad==='Doğruluk mu Cesaretlik mi'&&DIL.kod!=='tr'&&document.getElementById('kart').textContent.includes('Doğruluk'))issues.push('DC prompt');
    const step=()=>{if(m.ad==='Doğruluk mu Cesaretlik mi'){const b=[...document.querySelectorAll('#dcSecim button')].find(b=>!b.disabled&&b.style.display!=='none');if(b)b.click();}else document.getElementById('cekBtn').click();};
    step();await wait();
    const people=document.querySelectorAll('#sira2 .kisi');
    if(people.length!==(m.kural?1:2))issues.push('avatar '+m.ad);
    if(!document.getElementById('sira2').textContent.includes('Hayat'))issues.push('name '+m.ad);
    if(DIL.kod!=='tr'){
     if(/Doğruluk|Cesaret|Sohbet|İtiraf|Sorular|Hareket|Yaratıcı|Meydan/.test(document.getElementById('turEtiket').textContent))issues.push('badge '+m.ad);
     if(document.getElementById('cekBtn').textContent.includes('Sonraki'))issues.push('next '+m.ad);
    }
    let count=0;while(!oyunBitti&&count++<deste.length+2)step();await wait();
    if(!oyunBitti||document.querySelector('.ekran.aktif').id!=='ozet')issues.push('finish '+m.ad);
   }
   document.getElementById('gMetin').value='My message: Hayat snack {partner}';document.getElementById('gTur').value='Hata';mod='Romantik';
   const feedback=gGovde();
   if(!feedback.includes('My message: Hayat snack {partner}'))issues.push('user message mutation');
   if(DIL.kod!=='tr'&&(/Hata|Romantik|— Mod:/.test(feedback)&&!['it','es','pt'].includes(DIL.kod)))issues.push('feedback metadata');
   return {issues,subject:DIL.cevir('İki Kalp Bir Deste geri bildirim'),feedback};
  });
  assert.deepEqual(result.issues,[],lang);if(lang!=='tr')assert(!result.subject.includes('geri bildirim'));
  console.log('PASS',lang,'all modes, cards, small-screen grid, avatars, labels and feedback');
 }
 // Special custom-card names must be substituted in all modes, including rule modes.
 await p.evaluate(()=>{localStorage.setItem('kartOyunKendi',JSON.stringify(['Tell {partner}: snack Hayat.']));localStorage.setItem('kartOyunDili','en');});await p.reload();
 const custom=await p.evaluate(async()=>{
  OYUNCULAR[0].ad='Hayat';OYUNCULAR[1].ad='Sohbet';OYUNCULAR.forEach(o=>o.cins='belirtmem');
  const result=[];
  for(const m of MODLAR){turSayfasiAc(m.ad);oyunuBaslat();deste=['Tell {partner}: snack Hayat.'];sira=0;
   if(m.ad==='Doğruluk mu Cesaretlik mi'){[...document.querySelectorAll('#dcSecim button')].find(b=>!b.disabled&&b.style.display!=='none').click();}else kartCek(false);
   await new Promise(r=>setTimeout(r,10));result.push([m.ad,document.getElementById('kart').textContent]);
  }return result;
 });
 assert(custom.every(x=>x[1]==='Tell Sohbet: snack Hayat.'),JSON.stringify(custom));
 assert.deepEqual(p.errors,[]);await p.close();
 console.log('PASS custom partner substitution in all 10 modes');
}

async function partnerNameTests(browser){
 // Use the independent Turkish decks to identify cards that address the selected partner.
 const source={MODLAR:[],GOREVLER:{},addEventListener(){}};
 source.window=source;source.ekle=(m,rows)=>source.GOREVLER[m]=rows;vm.createContext(source);
 for(const f of fs.readdirSync(path.join(root,'www/kartlar')).filter(f=>f.endsWith('.js')))vm.runInContext(fs.readFileSync(path.join(root,'www/kartlar',f),'utf8'),source);
 const pure=fs.readFileSync(path.join(root,'www/ozellikler.js'),'utf8').split('/*END*/')[0];
 vm.runInContext(pure,source);
 const fixtures={};
 for(const [mod,rows] of Object.entries(source.GOREVLER))fixtures[mod]=rows.map(r=>({named:/[Pp]artner/.test(r[1]),generic:/partnersiz/.test(r[1]),seconds:source.sureBul(r[1]),kind:r[2]||'',original:r[1]}));
 const p=await openPage(browser);
 const langs=['tr','en','de','fr','it','es','pt','ru','ja','el','zh-CN','zh-TW'];
 for(const lang of langs){
  await p.evaluate(l=>{localStorage.setItem('kartOyunDili',l);localStorage.setItem('kartOyunModAcik','1');},lang);await p.reload();
  const result=await p.evaluate(async fixtures=>{
   const issues=[];let total=0,named=0,timed=0;
   OYUNCULAR=[yeniOyuncu(),yeniOyuncu(),yeniOyuncu()];
   ['Ece','Deniz','Hasan'].forEach((name,i)=>{OYUNCULAR[i].ad=name;OYUNCULAR[i].cins='belirtmem';});
   OYUNCULAR[0].partner=OYUNCULAR[2].id;OYUNCULAR[1].partner=OYUNCULAR[0].id;OYUNCULAR[2].partner=OYUNCULAR[1].id;
   for(const m of MODLAR){
    turSayfasiAc(m.ad);oyunuBaslat();
    const rows=GOREVLER[m.ad];
    for(let i=0;i<rows.length;i++){
     const raw=rows[i][1],f=fixtures[m.ad][i];
     deste=[raw];sira=0;ilk=true;oyuncuIdx=0;oyunBitti=false;
     if(m.ad==='Doğruluk mu Cesaretlik mi')document.querySelectorAll('#dcSecim button')[f.kind==='cesaret'?1:0].click();
     else document.getElementById('cekBtn').click();
     // Let the translation observer run before checking the displayed name.
     await new Promise(r=>setTimeout(r,0));
     const text=document.getElementById('kart').textContent;
     const label=DIL.kod+'/'+m.ad+'/'+i;
     total++;
     // The Turkish generic word 'partnersiz' has no possessive-name placeholder.
     if(f.named&&!(DIL.kod==='tr'&&f.generic)){named++;if(!text.includes('Hasan'))issues.push(label+' missing chosen name: '+text);}
     if(text.includes('{partner}'))issues.push(label+' unexpanded marker');
     if(KART_OYUNCULARI.partner!=='Hasan'||KART_OYUNCULARI.okuyan!=='Ece')issues.push(label+' wrong player');
     if(sonKart!==raw||rows[i][1]!==raw)issues.push(label+' changed storage key');
     if(DIL.kod!=='tr'&&KART_CEVIRILER[DIL.kod][m.ad][i]!==raw)issues.push(label+' changed locale pack');
     if(sureBul(raw)!==f.seconds)issues.push(label+' duration changed');
     const visible=document.getElementById('sureBtn').style.display!=='none';
     if(visible!==(f.seconds>0))issues.push(label+' timer visibility');
     if(f.seconds>0)timed++;
    }
   }
   // Literal player names must not be treated as templates, HTML, or replacement patterns.
   const raw=GOREVLER.Romantik[11][1];
   for(const name of ['Partnerine','$&',"{partner}","O'Neil <b> &"]){
    if(ismeCevir('Tell {partner}: {partner}',name)!=='Tell '+name+': '+name)issues.push('literal custom name '+name);
    if(!ismeCevir(raw,name).includes(name))issues.push('literal built-in name '+name);
   }
   if(ismeCevir('Partnerine merhaba de.','Hasan')!=='Hasan’a merhaba de.')issues.push('Turkish suffix');
   if(DIL.kod==='fr'){
    for(const [m,i] of [['Romantik',12],['Eğlenceli',8],['Eğlenceli',9],['Evde Gece',17]]){
     const raw=GOREVLER[m][i][1];if(ismeCevir(raw,'Hasan')!==raw)issues.push('reciprocal/object pronoun '+m+'/'+i);
    }
    if(!ismeCevir(GOREVLER['Beni Ne Kadar Tanıyorsun'][0][1],'Ece').includes('d’Ece'))issues.push('French vowel elision');
   }
   return {issues,total,named,timed};
  },fixtures);
  assert.deepEqual(result.issues,[],lang);assert.equal(result.total,306);assert(result.named>=(lang==='tr'?168:169));assert(result.timed>0);
  // Old saved raw-text entries must migrate and remain hidden despite localized display names.
  const raw=await p.evaluate(()=>{
   const text=GOREVLER.Romantik[11][1];
   localStorage.removeItem('kartOyunGizliV2');localStorage.setItem('kartOyunGizli',JSON.stringify([text]));return text;
  });
  await p.reload();
  assert((await p.evaluate(()=>JSON.parse(localStorage.getItem('kartOyunGizliV2')))).includes('hazir:'+fixtures.Romantik[11].original));
  const deck=await p.evaluate(()=>{OYUNCULAR[0].ad='Ece';OYUNCULAR[1].ad='Hasan';turSayfasiAc('Romantik');oyunuBaslat();return deste;});
  assert(!deck.includes(raw),lang+' hidden card returned');
  await p.evaluate(()=>{localStorage.removeItem('kartOyunGizliV2');localStorage.removeItem('kartOyunGizli');});
  console.log('PASS',lang,result.total+' real draws, '+result.named+' named cards, '+result.timed+' timer checks, legacy hidden-card migration');
 }
 await p.evaluate(()=>localStorage.setItem('kartOyunDili','en'));await p.reload();
 const actors=await p.evaluate(()=>{
  OYUNCULAR=[yeniOyuncu(),yeniOyuncu(),yeniOyuncu()];
  ['Ece','Deniz','Hasan'].forEach((name,i)=>{OYUNCULAR[i].ad=name;OYUNCULAR[i].cins='belirtmem';});
  OYUNCULAR[0].partner=OYUNCULAR[2].id;OYUNCULAR[1].partner=OYUNCULAR[0].id;
  const raw=GOREVLER.Romantik[11][1];
  turSayfasiAc('Romantik');oyunuBaslat();deste=[raw,raw];kartCek(false);
  const first=document.getElementById('kart').textContent;
  kartCek(false);const next=document.getElementById('kart').textContent;
  OYUNCULAR[0].partner=OYUNCULAR[1].id;oyunuBaslat();deste=[raw,raw];kartCek(false);
  const changed=document.getElementById('kart').textContent;
  document.getElementById('gizleBtn').click();
  return {first,next,changed,hidden:JSON.parse(localStorage.getItem('kartOyunGizliV2'))};
 });
 assert(actors.first.includes('Hasan'));assert(actors.next.includes('Ece'));assert(actors.changed.includes('Deniz'));
 assert(actors.hidden.includes('hazir:'+fixtures.Romantik[11].original));
 await p.evaluate(()=>localStorage.setItem('kartOyunDili','de'));await p.reload();
 assert.equal(await p.evaluate(()=>{OYUNCULAR[0].ad='Alex';OYUNCULAR[1].ad='Sam';turSayfasiAc('Romantik');oyunuBaslat();return deste.includes(GOREVLER.Romantik[11][1]);}),false);
 assert.deepEqual(p.errors,[]);await p.close();
 console.log('PASS selected partner after turn/change, literal names, Turkish suffixes, hidden card survives name/language changes');
}

module.exports={openPage,settled,chromium};
if(require.main===module)(async()=>{
 for(const file of fs.readdirSync(path.join(root,'www')).filter(f=>f.endsWith('.js')))new vm.Script(fs.readFileSync(path.join(root,'www',file),'utf8'),{filename:file});
 const browser=await chromium.launch({executablePath:process.env.EDGE_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 try{await billingTests(browser);await pendingPurchaseTests(browser);await storeKitTests(browser);await consentTests(browser);await consentEdgeTests(browser);if(!process.argv.includes('--native')){await customPreferencesTests(browser);await restartLayoutTests(browser);await uiTests(browser);await partnerNameTests(browser);}}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

