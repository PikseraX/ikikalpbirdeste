/* Satın alma: mod kilidi ve reklam kaldırma. Eklenti: @capgo/native-purchases
   Ürün kimlikleri Play Console'da birebir aynı yazılmalı. */
(function(){
var d=document;
function el(i){return d.getElementById(i);}
var URUN_MOD="tum_modlar",URUN_REKLAM="reklam_kaldir";
var KILITLI=["Ok mu Nok mu","İkisinden Birini Seç","Doğruluk mu Cesaretlik mi"];

var P=null;
try{if(window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.NativePurchases){P=window.Capacitor.Plugins.NativePurchases;}}catch(e){}

function oku(k){try{return localStorage.getItem(k)==="1";}catch(e){return false;}}
function yaz(k,v){try{localStorage.setItem(k,v?"1":"0");}catch(e){}}
var modAcik=oku("kartOyunModAcik"),reklamsiz=oku("kartOyunReklamsiz");
var urunler={},geriHedef="menu";

/* Mod listesinde kilit işareti */
function kilitIsaretle(){
var bs=d.querySelectorAll("#modListe button");
for(var i=0;i<bs.length;i++){
var sp=bs[i].querySelector("span span"),ad=sp?sp.textContent:"";
var eski=bs[i].querySelector(".kilit");
if(eski){eski.parentNode.removeChild(eski);}
if(KILITLI.indexOf(ad)>=0&&!modAcik){
var k=d.createElement("span");
k.className="kilit";k.textContent="🔒";k.style.marginLeft="auto";k.style.fontSize="1.3rem";
bs[i].appendChild(k);
}
}
}
var mc0=window.modlariCiz;
window.modlariCiz=function(){mc0();try{kilitIsaretle();}catch(e){}};
try{kilitIsaretle();}catch(e){}

/* Kilitli moda dokununca satın alma ekranı açılır */
var ts0=window.turSayfasiAc;
window.turSayfasiAc=function(ad){
if(KILITLI.indexOf(ad)>=0&&!modAcik){
magazaAc("modlar","🔒 "+ad+" modu kilitli. Açmak için aşağıdan satın alabilirsin.");
return;
}
ts0(ad);
};

/* Satın alma ekranı */
var ek=d.createElement("div");ek.id="magaza";ek.className="ekran";
ek.innerHTML='<h2>🛒 Satın alımlar</h2>'
+'<p id="magazaNot" class="bilgi"></p>'
+'<div class="oyuncu"><strong>🔓 Tüm modların kilidi</strong><p class="bilgi">Ok mu Nok mu, İkisinden Birini Seç ve Doğruluk mu Cesaretlik mi modları açılır. Tek seferlik ödeme.</p><button id="btnMod"></button></div>'
+'<div class="oyuncu"><strong>🚫 Reklamları kaldır</strong><p class="bilgi">Tüm reklamlar kalıcı olarak kalkar: ekranın altındaki reklam ve oyun arasında çıkan tam ekran reklamlar. Tek seferlik ödeme.</p><button id="btnReklam"></button></div>'
+'<p id="magazaMesaj" class="bilgi uyari"></p>'
+'<button id="btnGeriYukle" class="ikincil kucuk">Satın alımlarımı geri yükle</button>'
+'<button id="btnKapat" class="ikincil">← Geri</button>';
d.body.appendChild(ek);

function mesaj(t){el("magazaMesaj").textContent=t;}

function dugme(b,sahip,u,id){
b.onclick=function(){satinAl(id);};
if(sahip){b.textContent="✅ Açık";b.disabled=true;b.style.opacity=".7";return;}
b.style.opacity="";
if(!P){b.textContent="Bu cihazda kullanılamıyor";b.disabled=true;return;}
if(u===null){b.textContent="Şu an alınamıyor";b.disabled=true;return;}
if(!u){b.textContent="Fiyat yükleniyor…";b.disabled=true;return;}
b.textContent="Satın al · "+u.priceString;b.disabled=false;
}
function magazaCiz(){
dugme(el("btnMod"),modAcik,urunler[URUN_MOD],URUN_MOD);
dugme(el("btnReklam"),reklamsiz,urunler[URUN_REKLAM],URUN_REKLAM);
}
function fiyatYukle(){
if(!P){magazaCiz();return;}
P.getProducts({productIdentifiers:[URUN_MOD,URUN_REKLAM],productType:"inapp"}).then(function(r){
var l=(r&&r.products)||[];
urunler[URUN_MOD]=null;urunler[URUN_REKLAM]=null;
l.forEach(function(p){if(p&&(p.identifier===URUN_MOD||p.identifier===URUN_REKLAM)){urunler[p.identifier]=p;}});
magazaCiz();
}).catch(function(){
urunler[URUN_MOD]=null;urunler[URUN_REKLAM]=null;
magazaCiz();
});
}
function magazaAc(hedef,not){
geriHedef=hedef;
el("magazaNot").textContent=not||"";
mesaj("");
magazaCiz();
fiyatYukle();
goster("magaza");
}
el("btnKapat").onclick=function(){goster(geriHedef);};

/* Satın alma durumu: sahip olunanları Google Play'den sor */
function gecerli(p){
return !!p&&(p.purchaseState==="PURCHASED"||p.purchaseState==="1");
}
function uygula(m,a){
modAcik=m;reklamsiz=a;
yaz("kartOyunModAcik",m);yaz("kartOyunReklamsiz",a);
try{if(window.modlariCiz){window.modlariCiz();}}catch(e){}
try{
if(a){if(window.bannerKaldir){window.bannerKaldir();}}
else{if(window.bannerYenidenGoster){window.bannerYenidenGoster();}}
}catch(e){}
try{magazaCiz();}catch(e){}
}
function durumYenile(){
if(!P){return Promise.resolve();}
return P.getPurchases({productType:"inapp"}).then(function(r){
var l=(r&&r.purchases)||[],m=false,a=false;
l.forEach(function(p){
if(!gecerli(p)){return;}
if(p.productIdentifier===URUN_MOD){m=true;}
if(p.productIdentifier===URUN_REKLAM){a=true;}
if(p.isAcknowledged===false&&p.purchaseToken){
try{P.acknowledgePurchase({purchaseToken:p.purchaseToken}).catch(function(){});}catch(e){}
}
});
uygula(m,a);
}).catch(function(){});
}

function satinAl(id){
if(!P){mesaj("Satın alma bu cihazda kullanılamıyor.");return;}
mesaj("Google Play açılıyor…");
P.purchaseProduct({productIdentifier:id,productType:"inapp",quantity:1}).then(function(){
return durumYenile();
}).then(function(){
var ok=(id===URUN_MOD&&modAcik)||(id===URUN_REKLAM&&reklamsiz);
mesaj(ok?"Teşekkürler! Satın alma tamamlandı 💜":"Satın alma işleniyor. Birkaç dakika sonra geri yükle düğmesine dokun.");
}).catch(function(e){
var t=String((e&&e.message)||e||"");
mesaj(/cancel|iptal/i.test(t)?"Satın alma iptal edildi.":"Satın alma tamamlanamadı. Daha sonra tekrar dene.");
});
}
el("btnGeriYukle").onclick=function(){
if(!P){mesaj("Bu cihazda kullanılamıyor.");return;}
mesaj("Kontrol ediliyor…");
P.restorePurchases().catch(function(){}).then(function(){
return durumYenile();
}).then(function(){
mesaj((modAcik||reklamsiz)?"Satın alımların geri yüklendi.":"Geri yüklenecek bir satın alma bulunamadı.");
});
};

/* Ana menüye Satın alımlar düğmesi */
try{
var menu=el("menu"),bs=menu.getElementsByTagName("button"),gb=null;
for(var i=0;i<bs.length;i++){if(bs[i].textContent.indexOf("Geri bildirim")>=0){gb=bs[i];break;}}
var mb=d.createElement("button");
mb.className="ikincil";mb.textContent="🛒 Satın alımlar";
mb.onclick=function(){magazaAc("menu","");};
if(gb){menu.insertBefore(mb,gb.nextSibling);}else{menu.appendChild(mb);}
}catch(e){}

/* Açılışta ve uygulamaya dönünce durumu yenile (iade olursa kilit geri gelir) */
durumYenile();
try{
var AP=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.App;
if(AP&&AP.addListener){AP.addListener("resume",function(){durumYenile();});}
}catch(e){}
})();
