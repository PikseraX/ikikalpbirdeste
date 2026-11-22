// Regression coverage for the fresh audit: compounds, reader wording, themes and hidden-card migration.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {openPage,settled,chromium}=require('./regression.cjs');
const tasks={
 tr:'Partnerine 1 dakika 30 saniye sarıl.',
 en:'Hug {partner} for 1 minute 30 seconds.',
 de:'Umarme {partner} 1 Minute und 30 Sekunden lang.',
 fr:'Prends {partner} dans tes bras pendant 1 minute et 30 secondes.',
 it:'Abbraccia {partner} per 1 minuto e 30 secondi.',
 es:'Abraza a {partner} durante 1 minuto y 30 segundos.',
 pt:'Abrace {partner} por 1 minuto e 30 segundos.',
 ru:'Обними {partner} на 1 минуту и 30 секунд.',
 el:'Αγκάλιασε {partner} για 1 λεπτό και 30 δευτερόλεπτα.',
 ja:'{partner}と1分30秒ハグする。',
 'zh-CN':'和{partner}拥抱1分钟30秒。',
 'zh-TW':'和{partner}擁抱1分鐘30秒。'
};
function parserTests(){
 const c={};c.window=c;vm.runInNewContext(fs.readFileSync('www/ozellikler.js','utf8').split('/*END*/')[0],c);
 for(const text of Object.values(tasks))assert.equal(c.sureBul(text),90,text);
 for(const [text,n]of [
 ['one minute and one second',61],['une minute et une seconde.',61],['un minuto e un secondo.',61],
 ['bir dakika ve bir saniye',61],['eine Minute und eine Sekunde',61],
 ['1 minute, 30 seconds',90],['1.5 minutes 15 seconds',105],['1,5 minutes 15 seconds',105],
 ['一分三十秒',90],['１分３０秒',90],['一分鐘三十秒',90],['1分と30秒',90],
 ['30 seconds',30],['1 minute 0 seconds',60],['0 minutes 30 seconds',30],
 ['Hug for 1 minute, then dance for 30 seconds.',60],
 ['1 dakika sarıl, sonra 30 saniye dans et.',60],
 ['1 minute and wait for 30 seconds.',60],
 ['1分ハグして、30秒踊る。',60],
 ['1 minute and a second question.',60],['1 minuto e un secondo tentativo.',60],
 ['Ask a second question, then hug for 1 minute 30 seconds.',90],
 ['Ask for a second and final question.',0]
 ])assert.equal(c.sureBul(text),n,text);
 console.log('PASS compound durations: 12 languages, written one, full-width/CJK numbers, decimals, separated tasks and ordinal guards');
}
async function durationUi(browser){
 const p=await openPage(browser);await p.clock.install();
 for(const [lang,text]of Object.entries(tasks)){
  await p.evaluate(l=>{localStorage.setItem('kartOyunDili',l);localStorage.removeItem('kartOyunKendi');},lang);await p.reload();
  await p.locator('#menu button').filter({hasText:'🃏'}).click();
  await p.locator('#kendiInp').fill(text);await p.locator('#ekleKBtn').click();
  await p.evaluate(()=>{OYUNCULAR[0].ad='Ece';OYUNCULAR[1].ad='Hasan';turSayfasiAc('Romantik');Object.keys(MOD_TURLER.Romantik).forEach(k=>MOD_TURLER.Romantik[k]=k==='kendi');});
  await p.locator('#baslaBtn').click();await p.locator('#cekBtn').click();
  assert((await p.locator('#kart').textContent()).includes('Hasan'));
  assert.match(await p.locator('#sureBtn').textContent(),/1:30/);
  await p.locator('#sureBtn').click();await p.clock.fastForward(61000);await p.clock.runFor(2);
  assert.equal(await p.locator('#sureBtn').evaluate(e=>e.classList.contains('bitti')),false,lang+' must last more than 60 seconds');
  assert.match(await p.locator('#sureBtn').textContent(),/29/);
  await p.clock.fastForward(30000);await p.clock.runFor(2);
  assert.equal(await p.locator('#sureBtn').evaluate(e=>e.classList.contains('bitti')),true,lang);
 }
 assert.deepEqual(p.errors,[]);await p.close();
 console.log('PASS custom compound timer UI: 90 seconds actually counted in all 12 languages');
}
async function themes(browser){
 const p=await openPage(browser);
 for(const [theme,rgb]of [['mor','rgb(26, 16, 37)'],['gece','rgb(11, 18, 32)'],['pembe','rgb(42, 16, 32)']]){
  await p.evaluate(()=>goster('menu'));await p.locator('#temaSec button[data-k="'+theme+'"]').click();
  for(const screen of ['oyuncular','modlar','turEkran','oyun','ozet','kartlar','magaza','geriEkran']){
   await p.evaluate(id=>goster(id),screen);
   assert.equal(await p.locator('body').evaluate(e=>getComputedStyle(e).backgroundColor),rgb,theme+'/'+screen);
  }
  await p.reload();
  assert.equal(await p.locator('body').evaluate(e=>getComputedStyle(e).backgroundColor),rgb,theme+' persisted');
 }
 assert.deepEqual(p.errors,[]);await p.close();console.log('PASS all three theme backgrounds across eight screens and reload');
}
async function wordingAndMigration(browser){
 const p=await openPage(browser);
 const tr=await p.evaluate(()=>JSON.parse(JSON.stringify(GOREVLER)));
 const cases={it:['Romantik',17,/eri emozionato|da bambino|sei solo|sei mai stato|da anziano/iu],
  es:['Eğlenceli',29,/de niño|era niño/iu],pt:['Romantik',17,/ficou nervoso|está sozinho|deixou você animado|sentir-se obrigado/iu],
  ru:['Romantik',17,/ты волновался|ты подумал|впервые захотел сказать|ты хотел бы|ты никогда не рассказывал|как долго думал|ты делал|ты понял|ты научился/iu],
  el:['Eğlenceli',29,/χαρούμενο|μικρός|αόρατος|μόνος/iu]};
 let migrated=0;
 for(const [lang,[mode,index,masculine]]of Object.entries(cases)){
  await p.evaluate(l=>{localStorage.setItem('kartOyunDili',l);localStorage.setItem('kartOyunModAcik','1');localStorage.removeItem('kartOyunGizli');localStorage.removeItem('kartOyunGizliV2');},lang);await p.reload();
  const texts=await p.evaluate(()=>Object.values(GOREVLER).flat().map(g=>ismeCevir(g[1],'Hasan')));
  assert(!texts.some(t=>masculine.test(t)),lang+' masculine reader wording remains');
  let neutral;
  for(const gender of ['kadin','erkek','belirtmem']){
   await p.evaluate(({mode,index,gender})=>{
    OYUNCULAR[0].ad='Ece';OYUNCULAR[0].cins=gender;OYUNCULAR[1].ad='Hasan';OYUNCULAR[1].cins='erkek';
    turSayfasiAc(mode);oyunuBaslat();deste=[GOREVLER[mode][index][1]];kartCek(false);
   },{mode,index,gender});await settled(p);
   const text=await p.locator('#kart').textContent();
   assert(!masculine.test(text),text);if(neutral)assert.equal(text,neutral);neutral=text;
  }
  const aliases=await p.evaluate(l=>KART_ESKI_CEVIRILER[l],lang);
  assert(aliases.length>0);
  const ids=[...new Set(aliases.map(([m,i])=>'hazir:'+tr[m][i][1]))];
  await p.evaluate(old=>{localStorage.removeItem('kartOyunGizliV2');localStorage.setItem('kartOyunGizli',JSON.stringify(old));},aliases.map(x=>x[2]));await p.reload();
  assert.deepEqual((await p.evaluate(()=>JSON.parse(localStorage.getItem('kartOyunGizliV2')))).sort(),ids.sort(),lang+' old wording must resolve to stable IDs');
  const hidden=await p.evaluate(rows=>{
   const counts={};for(const [m]of rows)counts[m]=gorevSayisi(m);
   return rows.every(([m,i])=>counts[m]===GOREVLER[m].length-rows.filter(x=>x[0]===m).length);
  },aliases);
  assert(hidden,lang+' updated cards must stay hidden');
  await p.locator('#menu button').filter({hasText:'🃏'}).click();await p.locator('#sekG').click();
  assert.equal(await p.locator('#kartListe .kitem').count(),ids.length);
  const listed=await p.locator('#kartListe .kitem span').allTextContents();
  const current=await p.evaluate(rows=>rows.map(([m,i])=>GOREVLER[m][i][1]),aliases);
  assert.deepEqual([...listed].sort(),[...current].sort(),'hidden-card list shows corrected wording');
  await p.locator('#geriAcBtn').click();
  assert.equal(await p.locator('#kartListe .kitem').count(),0);
  assert.equal(await p.evaluate(()=>Object.keys(GOREVLER).reduce((n,m)=>n+gorevSayisi(m),0)),306);
  migrated+=aliases.length;
 }
 assert.deepEqual(p.errors,[]);await p.close();
 console.log('PASS neutral reader wording for all gender choices; '+migrated+' legacy translated hidden-card records migrate and restore');
}
(async()=>{
 parserTests();
 const b=await chromium.launch({executablePath:process.env.EDGE_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 try{await durationUi(b);await themes(b);await wordingAndMigration(b);}finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
