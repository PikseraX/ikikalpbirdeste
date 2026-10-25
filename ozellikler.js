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

