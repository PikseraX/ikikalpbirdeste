// Regression cases from the November audit; all native calls use mocks.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {openPage,settled,chromium}=require('./regression.cjs');
const langs=['tr','en','de','fr','it','es','pt','ru','ja','el','zh-CN','zh-TW'];
const paidModes={productIdentifier:'tum_modlar',purchaseState:'1',isAcknowledged:true};
const paidAds={productIdentifier:'reklam_kaldir',purchaseState:'PURCHASED',isAcknowledged:true};
async function language(p,l){await p.evaluate(l=>{localStorage.setItem('kartOyunDili',l);localStorage.setItem('kartOyunModAcik','1');},l);await p.reload();}
function players(){OYUNCULAR[0].ad='Ece';OYUNCULAR[1].ad='Hasan';OYUNCULAR.forEach(o=>o.cins='belirtmem');}
async function purchaseGate(browser){
 for(const paid of [false,true]){
  const p=await openPage(browser,{ads:true,billing:true,holdQuery:true,purchases:paid?[paidAds]:[]});
  await p.waitForFunction(()=>!!testNative.pendingQuery);await settled(p);
  assert.deepEqual(await p.evaluate(()=>testNative.ads),[],'no consent/ad request before ownership is known');
  await p.evaluate(()=>{testNative.holdQuery=false;testNative.pendingQuery.resolve();});await settled(p);
  const log=await p.evaluate(()=>testNative.ads);
  if(paid){assert(!log.includes('form'));assert(!log.includes('initialize'));assert(!log.includes('banner'));}
  else{assert(log.includes('form')&&log.includes('initialize')&&log.includes('banner')&&log.includes('prepare'));}
  assert.deepEqual(p.errors,[]);await p.close();
 }
 const p=await openPage(browser,{ads:true,billing:true,failQuery:true});await settled(p);
 assert.deepEqual(await p.evaluate(()=>testNative.ads),[]);
 await p.evaluate(()=>{testNative.failQuery=false;dispatchEvent(new Event('online'));});await settled(p);
 assert((await p.evaluate(()=>testNative.ads)).includes('banner'));
 await p.close();
 const cached=await openPage(browser,{ads:true,billing:true,paid:true,failQuery:true});await settled(cached);
 assert.equal(await cached.evaluate(()=>localStorage.getItem('kartOyunReklamsiz')),'1');
 assert.deepEqual(await cached.evaluate(()=>testNative.ads),[]);await cached.close();
 for(const mode of ['Ok mu Nok mu','Doğruluk mu Cesaretlik mi']){
  const p=await openPage(browser,{billing:true,purchases:[paidModes]});await settled(p);
  await p.evaluate(players);
  await p.evaluate(m=>{turSayfasiAc(m);oyunuBaslat();},mode);
  assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'oyun');
  await p.evaluate(()=>{testNative.purchases=[];testNative.emit('resume');});await settled(p);
  assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'modlar');
  await p.evaluate(()=>{document.getElementById('ozTekrar').click();});
  assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'magaza');
  assert.equal(await p.evaluate(()=>oyunBitti),true);
  await p.evaluate(()=>{testNative.purchases=[{productIdentifier:'tum_modlar',purchaseState:'1'}];testNative.emit('resume');});await settled(p);
  await p.evaluate(m=>{turSayfasiAc(m);oyunuBaslat();},mode);
  assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'oyun');
  await p.evaluate(()=>{goster('modlar');turSayfasiAc(mod);testNative.purchases=[];testNative.emit('resume');});await settled(p);
  assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'modlar','refund must close category selection too');
  assert.equal(await p.evaluate(()=>testNative.maxActive),1);assert.deepEqual(p.errors,[]);await p.close();
 }
 console.log('PASS purchase gating: reinstall, delayed/failed ownership, online recovery, refunded replay/category access');
}
async function truthChoice(browser){
 for(const hide of [false,true]){
  const p=await openPage(browser,{ads:true});await language(p,'tr');await p.evaluate(players);
  await p.evaluate(()=>{
   turSayfasiAc('Doğruluk mu Cesaretlik mi');oyunuBaslat();
   const rows=GOREVLER[mod],truth=rows.find(g=>g[2]==='dogruluk')[1],dare=rows.find(g=>g[2]==='cesaret')[1];
   deste=[truth,dare];KART_SURELER={[truth]:30};
   document.querySelector('#dcSecim button').click();document.getElementById('sureBtn').click();
  });
  await p.locator(hide?'#gizleBtn':'#pasBtn').click();await settled(p);
  const waiting=await p.evaluate(()=>({card:sonKart,reader:oyuncuIdx,first:ilk,cursor:sira,
   count:localStorage.getItem('kartOyunReklamSayac'),timer:document.getElementById('sureBtn').style.display,
   buttons:[...document.querySelectorAll('#dcSecim button')].map(b=>({display:b.style.display,disabled:b.disabled}))}));
  assert.equal(waiting.card,'');assert.equal(waiting.reader,0);assert.equal(waiting.first,true);
  assert.equal(waiting.count,'1');assert.equal(waiting.timer,'none');assert.equal(waiting.cursor,hide?0:1);
  assert.equal(waiting.buttons[0].display,'none');assert.equal(waiting.buttons[1].disabled,false);
  await p.evaluate(()=>kartCek(true));
  assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunReklamSayac')),'1');
  await p.locator('#dcSecim button').nth(1).click();
  assert.equal(await p.evaluate(()=>oyuncuIdx),0,'same reader chooses explicitly after skip/hide');
  assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunReklamSayac')),'1','choice cannot double-count skipped card');
  await p.locator('#dcSecim button').nth(1).click();await settled(p);
  assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'ozet');
  const rows=await p.locator('#ozetIcerik .kitem').allTextContents();
  assert(rows.includes('✅ Tamamlanan1'));assert(rows.includes(hide?'🚫 Gizlenen1':'⏭️ Atlanan1'));
  assert.equal(await p.evaluate(()=>localStorage.getItem('kartOyunReklamSayac')),'2');
  assert.deepEqual(p.errors,[]);await p.close();
 }
 console.log('PASS truth/dare: exhausted type waits for same player, timer stops, skip/hide counted once, final summary');
}
async function layoutAndMotion(browser){
 const p=await openPage(browser,{ads:true});
 for(const lang of langs){
  await language(p,lang);
  await p.evaluate(()=>{
   localStorage.setItem('kartOyunReklamSayac','0');testNative.emit('bannerAdSizeChanged',{height:50});
   OYUNCULAR[0].ad='MaximilianWalker';OYUNCULAR[1].ad='ChristinaSchmidt';
   turSayfasiAc('Doğruluk mu Cesaretlik mi');oyunuBaslat();
   for(let i=0;i<4;i++)document.querySelector('#dcSecim button').click();
  });await settled(p);
  const box=await p.evaluate(async()=>{
   await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
   const game=document.getElementById('oyun');game.scrollTop=game.scrollHeight;
   const buttons=[...game.children].filter(e=>e.tagName==='BUTTON'),last=buttons.at(-1);
   const r=last.getBoundingClientRect(),bar=document.getElementById('altBar').getBoundingClientRect();
   return {bottom:r.bottom,barTop:bar.top,barHeight:bar.height,padding:parseFloat(getComputedStyle(game).paddingBottom),
    hit:last.contains(document.elementFromPoint(r.left+r.width/2,r.bottom-2)),
    warning:document.getElementById('dcInfo').textContent};
  });
  assert(box.warning.split('\n').length>1,lang+' missing streak fixture');
  assert(box.padding>=box.barHeight,lang+JSON.stringify(box));assert(box.bottom<box.barTop,lang+JSON.stringify(box));assert(box.hit,lang);
  // Every translated card with the longest allowed name: no clipped text lines.
  const overflow=await p.evaluate(()=>{
   OYUNCULAR[0].ad='WWWWWWWWWWWWWWWW';OYUNCULAR[1].ad='WWWWWWWWWWWWWWWW';
   turSayfasiAc('Romantik');oyunuBaslat();
   const issues=[],card=document.getElementById('kart');
   for(const [m,rows]of Object.entries(GOREVLER))for(let i=0;i<rows.length;i++){
    card.textContent=ismeCevir(rows[i][1],OYUNCULAR[1].ad);
    const bounds=card.getBoundingClientRect(),range=document.createRange();range.selectNodeContents(card);
    if([...range.getClientRects()].some(r=>r.left<bounds.left+1||r.right>bounds.right-1))issues.push(m+'/'+i);
   }
   deste=['Ask {partner} to smile.'];sira=0;kartCek(false);return issues;
  });
  assert.deepEqual(overflow,[],lang+' card text overflow');
  await settled(p);
  const people=await p.locator('#sira2').evaluate(e=>({client:e.clientWidth,scroll:e.scrollWidth}));
  assert(people.scroll<=people.client+1,lang+' name row overflow');
 }
 await p.setViewportSize({width:412,height:915});await settled(p);
 assert.equal(await p.locator('#kart').evaluate(e=>e.getAnimations().length),0);
 assert.equal(await p.locator('#oyun').evaluate(e=>e.getAnimations().length),0);
 await p.emulateMedia({reducedMotion:'no-preference'});
 await p.evaluate(()=>{oyunuBaslat();kartCek(false);});
 assert(await p.locator('#kart').evaluate(e=>e.getAnimations().some(a=>a.playState==='running')),'normal card animation remains enabled');
 await p.emulateMedia({reducedMotion:'reduce'});
 await p.evaluate(()=>{goster('kartlar');document.getElementById('kendiInp').value='W'.repeat(140);document.getElementById('ekleKBtn').click();});
 assert.equal(await p.locator('#kartListe .kitem').evaluate(e=>e.scrollWidth<=e.clientWidth+1),true);
 assert.deepEqual(p.errors,[]);await p.close();
 console.log('PASS layout: 12 languages × 306 cards, long names, banner/streak bar height, resizing, custom text, reduced motion');
}
function timerParsing(){
 const ctx={};ctx.window=ctx;vm.createContext(ctx);
 vm.runInContext(fs.readFileSync('www/ozellikler.js','utf8').split('/*END*/')[0],ctx);
 const seconds=['30 saniye','30 seconds','30 Sekunden','30 secondes','30 secondi','30 segundos','30 segundos','30 секунд','３０秒間','30 δευτερόλεπτα','30秒钟','30秒鐘'];
 const minutes=['1 dakika','1 minute','1 Minute','1 minute','1 minuto','1 minuto','1 minuto','1 минуту','1分間','1 λεπτό','1分钟','1分鐘'];
 for(const t of seconds)assert.equal(ctx.sureBul('Test '+t),30,t);
 for(const t of minutes)assert.equal(ctx.sureBul('Test '+t),60,t);
 for(const t of ['one minute','bir dakika','eine Minute','une minute','un minuto','um minuto','одну минуту','ένα λεπτό','一分','一分钟','一分鐘'])assert.equal(ctx.sureBul(t),60,t);
 for(const [t,n]of [['30 saniyelik görev',30],['1 dakikada',60],['1,5 Minuten',90],['2.5 minutes',150],['抱住{partner}三十秒',30],['{partner}と二分間',120],['20秒後に',20],['un secondo',1]])assert.equal(ctx.sureBul(t),n,t);
 for(const t of ['toString','constructor','No timer','30 secondhand items','-30 seconds','-30秒','130minutesX','0 seconds'])assert.equal(ctx.sureBul(t),0,t);
 console.log('PASS custom timer parser: 12 languages, minutes/seconds, full-width digits, written one, decimals, invalid/prototype inputs');
}
async function timerUi(browser){
 const p=await openPage(browser);await p.clock.install();
 const tasks={tr:'{partner} ile 30 saniye konuş.',en:'Hug {partner} for 30 seconds.',de:'Umarme {partner} 30 Sekunden lang.',fr:'Serre {partner} pendant 30 secondes.',it:'Abbraccia {partner} per 30 secondi.',es:'Abraza a {partner} durante 30 segundos.',pt:'Abrace {partner} por 30 segundos.',ru:'Обними {partner} на 30 секунд.',ja:'{partner}を30秒抱きしめて。',el:'Αγκάλιασε {partner} για 30 δευτερόλεπτα.','zh-CN':'拥抱{partner}30秒。','zh-TW':'擁抱{partner}30秒。'};
 for(const lang of langs){
  await language(p,lang);await p.evaluate(players);
  await p.evaluate(t=>{turSayfasiAc('Romantik');oyunuBaslat();deste=[t];kartCek(false);document.getElementById('sureBtn').click();},tasks[lang]);
  assert(await p.locator('#sureBtn').isVisible(),lang);
  await p.clock.fastForward(10000);
  assert.match(await p.locator('#sureBtn').textContent(),/20/,lang);
  await p.locator('#sureBtn').click();await p.clock.fastForward(10000);
  assert.match(await p.locator('#sureBtn').textContent(),/20/,lang+' pause');
  await p.locator('#sureBtn').click();await p.clock.fastForward(21000);
  assert(await p.locator('#sureBtn').evaluate(e=>e.classList.contains('bitti')),lang+' finish');
  assert((await p.locator('#kart').textContent()).includes('Hasan'));
 }
 assert.deepEqual(p.errors,[]);await p.close();console.log('PASS custom timer UI in all 12 languages: start, pause, resume, finish, selected partner');
}
async function textAndMigration(browser){
 const p=await openPage(browser);
 for(const lang of ['de','it','pt','fr','es']){
  await language(p,lang);
  const cases={de:[['Beni Ne Kadar Tanıyorsun',25],['Doğruluk mu Cesaretlik mi',6],['Doğruluk mu Cesaretlik mi',23],['Doğruluk mu Cesaretlik mi',35]],
   it:[['Beni Ne Kadar Tanıyorsun',0],['Yeni Tanışanlar',27],['Doğruluk mu Cesaretlik mi',35]],pt:[['Beni Ne Kadar Tanıyorsun',21],['Beni Ne Kadar Tanıyorsun',22],['Beni Ne Kadar Tanıyorsun',27]],fr:[['Romantik',2],['Romantik',6],['Romantik',16],['Yeni Tanışanlar',7],['Doğruluk mu Cesaretlik mi',3]],es:[['Beni Ne Kadar Tanıyorsun',25]]}[lang];
  for(const name of ['Hasan','Ece','Alex']){
   const texts=await p.evaluate(({cases,name})=>cases.map(([m,i])=>ismeCevir(GOREVLER[m][i][1],name)),{cases,name});
   assert(texts.every(t=>t.includes(name)));assert(!texts.some(t=>/\bihm\b|\bchiedile\b|\bdalle\b|deixe-a|\bde ella\b|\bheureux\b|\ballé\b/u.test(t)),texts.join('\n'));
  }
  for(const name of ['$&',"$$","$'","$"+String.fromCharCode(96),'Hayat']){
   const expected=await p.evaluate(name=>{
    OYUNCULAR[0].ad=name;OYUNCULAR[0].cins='';OYUNCULAR[1].ad='Ece';OYUNCULAR[1].cins='belirtmem';
    oyunculariCiz();oyuncularDevam();return DIL.cevir(name+' için cinsiyet seç.');
   },name);await settled(p);
   assert.equal(await p.locator('#oyuncuUyari').textContent(),expected,lang+'/'+name);
  }
 }
 const old='Partnerine sor: Seni en çok hangi anda özlüyorsun?',correct='Partnerine sor: Beni en çok hangi anda özlüyorsun?';
 for(const v2 of [false,true]){
  await p.evaluate(({old,v2})=>{localStorage.setItem('kartOyunDili','tr');localStorage.removeItem('kartOyunGizli');localStorage.removeItem('kartOyunGizliV2');localStorage.setItem(v2?'kartOyunGizliV2':'kartOyunGizli',JSON.stringify([v2?'hazir:'+old:old]));},{old,v2});await p.reload();
  assert((await p.evaluate(()=>JSON.parse(localStorage.getItem('kartOyunGizliV2')))).includes('hazir:'+correct));
  assert.equal(await p.evaluate(correct=>{turSayfasiAc('Uzak Mesafe');oyunuBaslat();return deste.includes(correct);},correct),false);
  await language(p,'en');
  assert.equal(await p.evaluate(()=>{turSayfasiAc('Uzak Mesafe');oyunuBaslat();return deste.includes(GOREVLER['Uzak Mesafe'][5][1]);}),false);
 }
 assert.deepEqual(p.errors,[]);await p.close();console.log('PASS neutral named templates, literal UI names, corrected Turkish card and hidden-card migration across languages');
}
async function emptyReplay(browser){
 const p=await openPage(browser);
 for(const lang of ['tr','en','ja']){
  await language(p,lang);await p.evaluate(players);
  await p.evaluate(()=>{turSayfasiAc('Romantik');oyunuBaslat();kartCek(false);while(!oyunBitti)document.getElementById('gizleBtn').click();});await settled(p);
  assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'ozet');
  await p.locator('#ozTekrar').click();await settled(p);
  assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'turEkran');
  assert(await p.locator('#uyari').isVisible());assert((await p.locator('#uyari').textContent()).length>20);
  assert.equal(await p.evaluate(()=>oyunBitti),true);
  // Recover using the actual hidden-card UI; replay must become possible again.
  await p.locator('#turEkran button').filter({hasText:/🃏/}).click();
  await p.locator('#sekG').click();await p.locator('#geriAcBtn').click();await p.locator('#kGeriBtn').click();
  await p.locator('#baslaBtn').click();assert.equal(await p.locator('.ekran.aktif').getAttribute('id'),'oyun');
 }
 assert.deepEqual(p.errors,[]);await p.close();
 console.log('PASS fresh scan: all-hidden deck replay gives a visible localized recovery route, restored cards playable');
}
(async()=>{
 timerParsing();
 const browser=await chromium.launch({executablePath:process.env.EDGE_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 try{await purchaseGate(browser);await truthChoice(browser);await layoutAndMotion(browser);await timerUi(browser);await textAndMigration(browser);await emptyReplay(browser);}
 finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
