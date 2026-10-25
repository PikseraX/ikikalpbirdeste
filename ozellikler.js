/*PURE*/
var TR="a-zçğıöşüA-ZÇĞİÖŞÜ";
function adGoster(a){return a.trim().replace(/(^|\s)(\S)/g,function(m,b,c){return b+c.toLocaleUpperCase("tr");});}
function ekAl(ad,tur){
var l=ad.toLocaleLowerCase("tr"),son=l.charAt(l.length-1),sv="aeıioöuü",vok=sv.indexOf(son)>=0,v="e";
for(var i=l.length-1;i>=0;i--){if(sv.indexOf(l.charAt(i))>=0){v=l.charAt(i);break;}}
var iki="aıou".indexOf(v)>=0?"a":"e",dort={a:"ı","ı":"ı",e:"i",i:"i",o:"u",u:"u","ö":"ü","ü":"ü"}[v],y=vok?"y":"",sert="çfhkpsşt".indexOf(son)>=0?"t":"d";
var e={dat:y+iki,acc:y+dort,gen:(vok?"n":"")+dort+"n",ins:y+"l"+iki,abl:sert+iki+"n",loc:sert+iki}[tur];
return "\u2019"+e;}
function ismeCevir(t,ad){
var A=adGoster(ad),h={"in":"",ine:"dat",ini:"acc",inin:"gen",inle:"ins",inden:"abl",inde:"loc"};
return t.replace(new RegExp("(^|[^"+TR+"])([Pp])artner([a-zçğıöşü]*)","g"),function(m,pre,p,s){
if(!h.hasOwnProperty(s))return m;
return pre+A+(h[s]?ekAl(A,h[s]):"");});}
function sureBul(t){
var m=t.match(/(\d+)\s*(saniye|dakika)/i);
if(m){var v=+m[1];return m[2].toLowerCase()==="dakika"?v*60:v;}
if(/\bbir\s+dakika/i.test(t))return 60;
return 0;}
/*END*/
(function(){
var d=document;
function el(i){return d.getElementById(i);}
function yukle(k){try{var x=JSON.parse(localStorage.getItem(k));return Array.isArray(x)?x.filter(function(s){return typeof s==="string";}):[];}catch(e){return [];}}
function kaydet(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
var KENDI=yukle("kartOyunKendi"),GIZLI=yukle("kartOyunGizli"),gk="menu",sk="kendi",tId=0,tSn=0;
function yerlesik(t){for(var m in GOREVLER){if(GOREVLER[m].some(function(g){return g[1]===t;}))return true;}return false;}
function acikSay(m){var a=0;mevcutTurler(m).forEach(function(t){if(MOD_TURLER[m][t.k])a++;});if(KENDI.length&&MOD_TURLER[m].kendi!==false)a++;return a;}
function duzelt(){MODLAR.forEach(function(x){if(acikSay(x.ad)===0){mevcutTurler(x.ad).forEach(function(t){MOD_TURLER[x.ad][t.k]=true;});}});modTurleriKaydet();}
function liste(m){
var l=(GOREVLER[m]||[]).filter(function(g){return MOD_TURLER[m][g[0]]&&GIZLI.indexOf(g[1])<0;}).map(function(g){return g[1];});
if(KENDI.length&&MOD_TURLER[m].kendi!==false)KENDI.forEach(function(t){if(GIZLI.indexOf(t)<0&&l.indexOf(t)<0)l.push(t);});
return l;}
window.gorevSayisi=function(m){return liste(m).length;};
window.yeniDeste=function(){deste=karistir(liste(mod));if(deste.length>1&&deste[0]===sonKart){var t=deste[0];deste[0]=deste[1];deste[1]=t;}sira=0;};
var my=window.modTurleriYukle;
window.modTurleriYukle=function(){my();var k={};try{k=JSON.parse(localStorage.getItem("kartOyunModTurler"))||{};}catch(e){}
MODLAR.forEach(function(m){MOD_TURLER[m.ad].kendi=!(k[m.ad]&&k[m.ad].kendi===false);});};
window.modTurleriYukle();duzelt();
var tg=window.turGuncelle;
window.turGuncelle=function(){tg();var b=el("tur_kendi");if(b){var a=MOD_TURLER[mod].kendi!==false;b.classList.toggle("acik",a);if(!a)el("hepsiBtn").style.display="block";}};
var ts=window.turSayfasiAc;
window.turSayfasiAc=function(ad){ts(ad);
if(KENDI.length){var b=d.createElement("button"),i=d.createElement("span");b.id="tur_kendi";b.className="tur";i.className="ik";i.textContent="✍️";b.appendChild(i);b.appendChild(d.createTextNode("Kendi ("+KENDI.length+")"));b.onclick=function(){turDegis("kendi");};el("turGrid").appendChild(b);}
turGuncelle();};
window.turDegis=function(k){
var s=k==="kendi"?MOD_TURLER[mod].kendi!==false:MOD_TURLER[mod][k];
if(s&&acikSay(mod)===1){el("uyari").textContent="En az bir tür açık kalmalı.";return;}
MOD_TURLER[mod][k]=!s;el("uyari").textContent="";modTurleriKaydet();turGuncelle();};
var ha=window.hepsiniAc;
window.hepsiniAc=function(){MOD_TURLER[mod].kendi=true;ha();};
/* Kartlarım ekranı */
var st=d.createElement("style");
st.textContent=".sekmeler{display:flex;gap:6px;width:100%;max-width:340px}.sek{flex:1;width:auto;max-width:none;padding:12px 4px;font-size:.85rem;background:#2d2040;opacity:.6}.sek.acik{background:#7c3aed;opacity:1}.kitem{display:flex;gap:8px;align-items:center;justify-content:space-between;text-align:left;width:100%;max-width:340px;padding:10px 12px;border-radius:12px;background:#241836;border:1px solid #4b3a6e;font-size:.9rem}.kitem button{width:auto;flex:none;padding:8px 12px;font-size:.85rem;background:#3b2a5c}#kartListe{display:flex;flex-direction:column;gap:8px;width:100%;align-items:center}#kendiInp{width:100%;padding:14px;border-radius:12px;border:1px solid #4b3a6e;background:#2d2040;color:#fff;font-size:16px;font-family:inherit}.sure{background:#0f766e}.sure.bitti{background:#b45309}";
d.head.appendChild(st);
var ks=d.createElement("div");ks.id="kartlar";ks.className="ekran";
ks.innerHTML='<h2>🃏 Kartlarım</h2><div class="sekmeler"><button id="sekK" class="sek"></button><button id="sekG" class="sek"></button></div><div id="paneK" style="width:100%;max-width:340px;display:flex;flex-direction:column;gap:8px"><input id="kendiInp" maxlength="140" placeholder="Kendi görev kartını yaz" autocomplete="off"><p class="bilgi">İpucu: “Partnerine …” yazarsan oyun partnerin adını kendisi koyar.</p><button id="ekleKBtn">＋ Kart Ekle</button></div><p id="kartUyari" class="bilgi uyari"></p><div id="kartListe"></div><button id="geriAcBtn" class="ikincil kucuk">Hepsini geri aç</button><button id="kGeriBtn" class="ikincil">← Geri</button>';
d.body.appendChild(ks);
function ciz(){
el("sekK").textContent="✍️ Kendi ("+KENDI.length+")";el("sekG").textContent="🚫 Gizlenen ("+GIZLI.length+")";
el("sekK").classList.toggle("acik",sk==="kendi");el("sekG").classList.toggle("acik",sk==="gizli");
el("paneK").style.display=sk==="kendi"?"flex":"none";
el("geriAcBtn").style.display=(sk==="gizli"&&GIZLI.length)?"block":"none";
var L=el("kartListe"),A=sk==="kendi"?KENDI:GIZLI;L.innerHTML="";
if(!A.length){var p=d.createElement("p");p.className="bilgi";p.textContent=sk==="kendi"?"Henüz kendi kartın yok.":"Gizlenmiş kart yok.";L.appendChild(p);}
A.forEach(function(t,i){
var r=d.createElement("div"),s=d.createElement("span"),b=d.createElement("button");
r.className="kitem";s.textContent=t;b.textContent=sk==="kendi"?"✕":"↩️ Aç";
b.onclick=function(){
if(sk==="kendi"){KENDI.splice(i,1);if(!yerlesik(t))GIZLI=GIZLI.filter(function(x){return x!==t;});kaydet("kartOyunKendi",KENDI);kaydet("kartOyunGizli",GIZLI);duzelt();}
else{GIZLI.splice(i,1);kaydet("kartOyunGizli",GIZLI);}
ciz();};
r.appendChild(s);r.appendChild(b);L.appendChild(r);});}
function ac(n){gk=n;sk="kendi";el("kartUyari").textContent="";ciz();goster("kartlar");}
el("sekK").onclick=function(){sk="kendi";ciz();};
el("sekG").onclick=function(){sk="gizli";el("kartUyari").textContent="";ciz();};
el("ekleKBtn").onclick=function(){
var inp=el("kendiInp"),t=inp.value.replace(/\s+/g," ").trim(),u=el("kartUyari");
if(!t){u.textContent="Önce kartı yaz.";return;}
if(KENDI.length>=100){u.textContent="En fazla 100 kart ekleyebilirsin.";return;}
if(KENDI.indexOf(t)>=0){u.textContent="Bu kart zaten var.";return;}
KENDI.push(t);kaydet("kartOyunKendi",KENDI);inp.value="";u.textContent="Kart eklendi. Oyunda “Kendi” türünden gelir.";ciz();};
el("geriAcBtn").onclick=function(){GIZLI=[];kaydet("kartOyunGizli",GIZLI);ciz();};
el("kGeriBtn").onclick=function(){if(gk==="tur")turSayfasiAc(mod);else goster("menu");};
var mb=d.createElement("button");mb.className="ikincil";mb.textContent="🃏 Kartlarım";mb.onclick=function(){ac("menu");};
el("menu").insertBefore(mb,el("menu").getElementsByTagName("button")[0].nextSibling);
var tb=d.createElement("button");tb.className="ikincil kucuk";tb.textContent="🃏 Kartlarım (kendi / gizlenen)";tb.onclick=function(){ac("tur");};
el("baslaBtn").parentNode.insertBefore(tb,el("baslaBtn"));
/* Oyun ekranı: sayaç ve gizle */
var sb=d.createElement("button");sb.id="sureBtn";sb.className="sure";sb.style.display="none";
el("kart").insertAdjacentElement("afterend",sb);
var gb=d.createElement("button");gb.id="gizleBtn";gb.className="ikincil kucuk";gb.style.display="none";gb.textContent="🚫 Bir daha gösterme";
el("pasBtn").insertAdjacentElement("afterend",gb);
function bic(s){return s>=60?Math.floor(s/60)+":"+("0"+s%60).slice(-2):s+" sn";}
function hazir(sn){clearInterval(tId);tId=0;tSn=sn;sb.classList.remove("bitti");if(!sn){sb.style.display="none";return;}sb.style.display="block";sb.textContent="⏱️ "+bic(sn)+" – Başlat";}
sb.onclick=function(){
if(tId){clearInterval(tId);tId=0;sb.textContent="⏱️ "+bic(tSn)+" – Başlat";return;}
sb.classList.remove("bitti");
var bitis=Date.now()+tSn*1000;
function tik(){var k=Math.ceil((bitis-Date.now())/1000);if(k<=0){clearInterval(tId);tId=0;sb.textContent="⏰ Süre doldu!";sb.classList.add("bitti");return;}sb.textContent="⏱️ "+bic(k)+" – Durdur";}
tik();tId=setInterval(tik,250);};
var ob=window.oyunuBaslat;
window.oyunuBaslat=function(){ob();el("cekBtn").style.display="";gb.style.display="none";hazir(0);};
window.kartCek=function(pas,not){
var n=OYUNCULAR.length,m=modBul(mod),kart=el("kart");
if(!pas&&!ilk){oyuncuIdx=(oyuncuIdx+1)%n;}
ilk=false;
if(sira>=deste.length){yeniDeste();}
if(!deste.length){kart.textContent="Gösterilecek kart kalmadı. Gizlenen kartları geri açabilir ya da başka tür seçebilirsin.";el("cekBtn").style.display="none";el("pasBtn").style.display="none";gb.style.display="none";el("sayac").textContent="";hazir(0);return;}
var g=deste[sira],gs=g;sira++;sonKart=g;
if(m.kural){el("siraBilgi").textContent="Kartı okuyan: "+OYUNCULAR[oyuncuIdx].ad;}
else{var pi=partnerBul(oyuncuIdx);el("siraBilgi").textContent="Sıra: "+OYUNCULAR[oyuncuIdx].ad+"  |  Partner: "+OYUNCULAR[pi].ad;gs=ismeCevir(g,OYUNCULAR[pi].ad);}
kart.classList.remove("cevir");void kart.offsetWidth;kart.textContent=gs;kart.classList.add("cevir");
el("sayac").textContent=not||("Kart "+sira+" / "+deste.length);
el("cekBtn").textContent=m.buton?m.buton:"✅ Yaptık, Sonraki Kart";
el("pasBtn").style.display="block";gb.style.display="block";
hazir(sureBul(g));};
gb.onclick=function(){
var g=sonKart;if(!g)return;
if(GIZLI.indexOf(g)<0){GIZLI.push(g);kaydet("kartOyunGizli",GIZLI);}
for(var j=deste.length-1;j>=0;j--){if(deste[j]===g){deste.splice(j,1);if(j<sira)sira--;}}
kartCek(true,"Kart gizlendi. Geri açmak için Kartlarım › Gizlenen.");};
ciz();
})();

/* Süre bitince ses ve titreşim */
(function(){
var b=document.getElementById("sureBtn"),ctx=null,et=null,uyarildi=false;
if(!b)return;
function hazirla(){try{var AC=window.AudioContext||window.webkitAudioContext;if(AC&&!ctx)ctx=new AC();if(ctx&&ctx.state==="suspended")ctx.resume();}catch(e){}}
try{var l=document.createElement("label"),i=document.createElement("input");l.style.display="none";l.setAttribute("aria-hidden","true");i.type="checkbox";i.setAttribute("switch","");l.appendChild(i);document.body.appendChild(l);et=l;}catch(e){}
function nota(f,t0,sure){if(!ctx)return;try{var o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime+t0;o.type="sine";o.frequency.value=f;g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(0.3,t+0.01);g.gain.exponentialRampToValueAtTime(0.0001,t+sure);o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+sure+0.05);}catch(e){}}
function bitti(){
nota(880,0,0.15);nota(1175,0.2,0.3);
try{if(navigator.vibrate){navigator.vibrate([200,100,200]);}else if(et){et.click();setTimeout(function(){et.click();},180);}}catch(e){}
}
b.addEventListener("click",hazirla);
new MutationObserver(function(){
var doldu=b.textContent.indexOf("Süre doldu")>=0;
if(doldu&&!uyarildi){uyarildi=true;bitti();}
else if(!doldu){uyarildi=false;}
}).observe(b,{childList:true,characterData:true,subtree:true});
})();
/* Tür renkleri, oyun özeti ve geri bildirim */
(function(){
var GERI_EPOSTA="ikikalpbirdeste@gmail.com";
var d=document;
function el(i){return d.getElementById(i);}
var RENK={sohbet:"#38bdf8",soru:"#fbbf24",itiraf:"#f43f5e",tahmin:"#a78bfa",hareket:"#fb923c",yaratici:"#34d399",meydan:"#facc15",yakin:"#f472b6",gunluk:"#94a3b8",sosyal:"#60a5fa",aile:"#f59e0b",hayat:"#2dd4bf",ask:"#fb7185",cilgin:"#c084fc",kendi:"#e879f9"};
function turBilgi(k){
if(k==="kendi")return {e:"✍️",ad:"Kendi kartın"};
for(var i=0;i<TUR_LISTESI.length;i++){if(TUR_LISTESI[i].k===k)return TUR_LISTESI[i];}
return {e:"🎴",ad:""};}
function turBul(t){var l=GOREVLER[mod]||[];for(var i=0;i<l.length;i++){if(l[i][1]===t)return l[i][0];}return "kendi";}
var kart=el("kart"),tl=d.createElement("div");
tl.id="turEtiket";tl.style.cssText="display:none;font-size:.85rem;font-weight:700";
kart.insertAdjacentElement("beforebegin",tl);
function renkSifirla(){kart.style.borderColor="";kart.style.boxShadow="";tl.style.display="none";}
function renkUygula(k){var r=RENK[k]||"#7c3aed",b=turBilgi(k);kart.style.borderColor=r;kart.style.boxShadow="0 0 18px "+r+"55";tl.style.color=r;tl.textContent=b.e+" "+b.ad;tl.style.display="block";}
var bas=0,tam=0,pasS=0,giz=0,turSay={},oyTam={},sonTur="",gDon="menu";
function sifirla(){bas=Date.now();tam=0;pasS=0;giz=0;turSay={};oyTam={};sonTur="";}
var ob=window.oyunuBaslat;
window.oyunuBaslat=function(){ob();sifirla();renkSifirla();};
var ek=window.kartCek;
window.kartCek=function(pas,not){
var ilkMi=ilk,onceki=OYUNCULAR[oyuncuIdx]?OYUNCULAR[oyuncuIdx].ad:"",oncekiTur=sonTur;
ek(pas,not);
if(!pas){if(!ilkMi){tam++;if(oncekiTur){turSay[oncekiTur]=(turSay[oncekiTur]||0)+1;}oyTam[onceki]=(oyTam[onceki]||0)+1;}}
else if(not){giz++;}else{pasS++;}
if(el("cekBtn").style.display==="none"){renkSifirla();sonTur="";}
else{sonTur=turBul(sonKart);renkUygula(sonTur);}
};
/* Oyun özeti */
var oz=d.createElement("div");oz.id="ozet";oz.className="ekran";
oz.innerHTML='<h2>🎉 Oyun Özeti</h2><p id="ozetMod" class="bilgi"></p><div id="ozetIcerik" style="display:flex;flex-direction:column;gap:8px;width:100%;max-width:340px"></div><p id="ozetNot" class="bilgi"></p><button id="ozTekrar">🔁 Yeniden oyna</button><button id="ozMod" class="ikincil">Mod değiştir</button><button id="ozGeri" class="ikincil">💬 Geri bildirim</button><button id="ozMenu" class="ikincil">Ana menü</button>';
d.body.appendChild(oz);
function satir(a,b){var r=d.createElement("div"),x=d.createElement("span"),y=d.createElement("strong");r.className="kitem";x.textContent=a;y.textContent=b;r.appendChild(x);r.appendChild(y);el("ozetIcerik").appendChild(r);}
function ozetAc(){
el("ozetIcerik").innerHTML="";
var m=modBul(mod);el("ozetMod").textContent=m.ikon+" "+m.ad;
satir("🕒 Süre",Math.max(1,Math.round((Date.now()-bas)/60000))+" dk");
satir("✅ Tamamlanan",String(tam));satir("⏭️ Atlanan",String(pasS));satir("🚫 Gizlenen",String(giz));
var en="",say=0;for(var k in turSay){if(turSay[k]>say){say=turSay[k];en=k;}}
if(en){var b=turBilgi(en);satir("🏆 En çok gelen tür",b.e+" "+b.ad+" ("+say+")");}
OYUNCULAR.forEach(function(o){satir("👤 "+o.ad,(oyTam[o.ad]||0)+" kart");});
el("ozetNot").textContent=tam?"Güzel oyundu! Bir sonraki oyunda görüşürüz 💜":"Henüz hiç kart tamamlanmadı. “Yaptık” dediğin kartlar burada sayılır.";
goster("ozet");}
var bt=d.createElement("button");bt.className="ikincil kucuk";bt.textContent="🏁 Oyunu bitir";bt.onclick=ozetAc;
el("gizleBtn").insertAdjacentElement("afterend",bt);
el("ozTekrar").onclick=function(){oyunuBaslat();};
el("ozMod").onclick=function(){goster("modlar");};
el("ozMenu").onclick=function(){goster("menu");};
el("ozGeri").onclick=function(){gbAc("ozet");};
/* Geri bildirim */
var gi=d.createElement("div");gi.id="geriEkran";gi.className="ekran";
gi.innerHTML='<h2>💬 Geri bildirim</h2><p class="bilgi">Önerini ya da bulduğun hatayı yaz. E-posta uygulaman hazır bir mesajla açılır, sen gönderirsin.</p><div class="oyuncu"><select id="gTur"><option>💡 Öneri</option><option>🐞 Hata</option><option>🃏 Kart önerisi</option><option>❤️ Beğendim</option></select><textarea id="gMetin" maxlength="500" rows="5" placeholder="Mesajını yaz…" style="width:100%;padding:14px;border-radius:12px;border:1px solid #4b3a6e;background:#2d2040;color:#fff;font-size:16px;font-family:inherit;resize:vertical"></textarea></div><p id="gUyari" class="bilgi uyari"></p><button id="gGonder">📨 Gönder</button><button id="gKopya" class="ikincil">📋 Metni kopyala</button><button id="gGeri" class="ikincil">← Geri</button>';
d.body.appendChild(gi);
function gbAc(n){gDon=n;el("gUyari").textContent="";goster("geriEkran");}
function govde(){var t=el("gMetin").value.trim();if(!t){el("gUyari").textContent="Önce mesajını yaz.";return "";}return el("gTur").value+"\n\n"+t+"\n\n— Mod: "+(mod||"-");}
el("gGonder").onclick=function(){
var g=govde();if(!g)return;
if(GERI_EPOSTA.indexOf("@")<1){el("gUyari").textContent="Kodun başındaki e-posta adresi henüz değiştirilmemiş.";return;}
el("gUyari").textContent="";
location.href="mailto:"+GERI_EPOSTA+"?subject="+encodeURIComponent("Kart Oyunu geri bildirim")+"&body="+encodeURIComponent(g);};
el("gKopya").onclick=function(){
var g=govde();if(!g)return;
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(g).then(function(){el("gUyari").textContent="Kopyalandı. İstediğin yere yapıştırabilirsin.";}).catch(function(){el("gUyari").textContent="Kopyalanamadı, metni elle seçip kopyala.";});}
else{el("gUyari").textContent="Kopyalanamadı, metni elle seçip kopyala.";}};
el("gGeri").onclick=function(){goster(gDon);};
var mb=d.createElement("button");mb.className="ikincil";mb.textContent="💬 Geri bildirim";mb.onclick=function(){gbAc("menu");};
el("menu").appendChild(mb);
})();


