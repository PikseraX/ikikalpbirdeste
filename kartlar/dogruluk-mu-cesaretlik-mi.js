// Doğruluk mu Cesaretlik mi modu kartları. Biçim: ["tür","görev"]
TUR_LISTESI.push({k:"dogruluk",e:"💬",ad:"Doğruluk"},{k:"cesaret",e:"🔥",ad:"Cesaret"});
MODLAR.push({ad:"Doğruluk mu Cesaretlik mi",ikon:"🎯",aciklama:"Dürüst ol ya da cesaretini göster"});
ekle("Doğruluk mu Cesaretlik mi",[
["dogruluk","Partnerinle ilk karşılaştığında ne hissettiğini dürüstçe anlat."],
["dogruluk","Partnerinde sana en çok iyi gelen şey ne?"],
["dogruluk","Partnerine hiç söylemediğin ama söylemek istediğin güzel bir şey var mı? Söyle."],
["dogruluk","Partnerinle ilişkinde seni en çok mutlu eden an hangisiydi?"],
["dogruluk","Partnerinin seni ilk gülümseten anını hatırla ve anlat."],
["dogruluk","Partnerinin hangi huyunu en çok seviyorsun?"],
["dogruluk","Partnerin için yapıp ona hiç söylemediğin bir şey var mı?"],
["dogruluk","Partnerine bir gün sürpriz yapsan ne yapardın?"],
["dogruluk","Partnerinle ilgili aklına gelen en komik anıyı anlat."],
["dogruluk","Partnerinle yapmak istediğin ama henüz yapmadığınız bir şey ne?"],
["dogruluk","Seni en çok ne endişelendiriyor ve partnerin sana nasıl destek olabilir?"],
["dogruluk","Partnerine ilk ne zaman güvenmeye başladığını anlat."],
["dogruluk","Partnerinden en çok neyi öğrendin?"],
["dogruluk","Hayatında yaptığın en utandırıcı ama şimdi güldüğün şey ne?"],
["dogruluk","Partnerinle ilgili hiç kıskandığın bir şey oldu mu? Tatlı bir dille söyle."],
["dogruluk","En çok hangi şarkıyı partnerinle özdeşleştiriyorsun?"],
["dogruluk","Partnerinle geçirdiğin en güzel gün hangisiydi?"],
["dogruluk","Partnerinin sana ilk söylediği ve unutamadığın cümle neydi?"],
["dogruluk","Partnerin hakkında en çok hangi şeye hayranlık duyuyorsun?"],
["dogruluk","Partnerinle birlikte yaşlandığını hayal ettiğinde aklına gelen ilk görüntü ne?"],
["cesaret","Partnerin için 20 saniye doğaçlama bir şarkı söyle."],
["cesaret","Partnerine 3 farklı şekilde ‘günaydın’ de."],
["cesaret","30 saniye boyunca partnerinin taklidini yap."],
["cesaret","Partnerine bir kalp çiz ve ona hediye et."],
["cesaret","Partnerine 10 saniye boyunca göz kırpmadan bak."],
["cesaret","Partnerinin en sevdiği şarkıyı 15 saniye söyle."],
["cesaret","Partnerin için 4 satırlık bir iltifat şiiri uydur ve oku."],
["cesaret","30 saniye boyunca partnerinle dans et."],
["cesaret","Partnerine sarıl ve 20 saniye bırakma."],
["cesaret","Partnerinin elini tut ve ona 3 güzel şey söyle."],
["cesaret","Telefonundan partnerinle en sevdiğin fotoğrafı göster ve hikayesini anlat."],
["cesaret","Partnerine 20 saniyelik bir teşekkür konuşması yap."],
["cesaret","1 dakika boyunca robot gibi konuş, partnerin sana soru sorsun."],
["cesaret","Partnerine komik bir lakap bul ve bugün o lakapla seslen."],
["cesaret","Partnerinin sırtına parmakla bir kelime yaz, o tahmin etsin."],
["cesaret","Partnerin isterse, onun yanağına küçük bir öpücük kondur."],
["cesaret","Partnerinle 1 dakika bir film sahnesini canlandırın."],
["cesaret","10 saniye boyunca en komik yüz ifadeni yap."],
["cesaret","Partnerine tekrar etmeden 5 farklı iltifat et."],
["cesaret","Partnerin için kısa bir sevgi mesajı yaz ve ona oku."]
]);

/* Seçim sistemi: oyuncu Doğruluk ya da Cesaret'i kendisi seçer, aynı seçeneği arka arkaya 3 kez seçemez */
window.addEventListener("load",function(){
var DCM="Doğruluk mu Cesaretlik mi",STREAK={},lastT="",d=document;
function el(i){return d.getElementById(i);}
function tipOf(t){var l=GOREVLER[DCM]||[];for(var i=0;i<l.length;i++){if(l[i][1]===t)return l[i][0];}return "";}
function ikisiAcik(){return MOD_TURLER[DCM].dogruluk!==false&&MOD_TURLER[DCM].cesaret!==false;}
function secen(){var n=OYUNCULAR.length;return ilk?OYUNCULAR[oyuncuIdx]:OYUNCULAR[(oyuncuIdx+1)%n];}
function engelli(ad,t){var s=STREAK[ad];return ikisiAcik()&&!!s&&s.t===t&&s.c>=2;}
function ayarla(t){
for(var tur=0;tur<2;tur++){
for(var i=sira;i<deste.length;i++){
if(tipOf(deste[i])===t){var x=deste[sira];deste[sira]=deste[i];deste[i]=x;return true;}
}
yeniDeste();
}
return false;}
function bos(){el("kart").textContent="Bu türde gösterilecek kart kalmadı. Türleri değiştirebilir ya da gizlenen kartları geri açabilirsin.";}
var kutu=d.createElement("div");kutu.id="dcSecim";
kutu.style.cssText="display:none;flex-direction:column;gap:8px;width:100%;max-width:340px;align-items:center";
var bilgi=d.createElement("div");bilgi.id="dcInfo";bilgi.className="bilgi";bilgi.style.whiteSpace="pre-line";
var satir=d.createElement("div");satir.style.cssText="display:flex;gap:8px;width:100%";
var bD=d.createElement("button"),bC=d.createElement("button");
bD.textContent="💬 Doğruluk";bC.textContent="🔥 Cesaret";
bD.style.flex="1";bC.style.flex="1";bD.style.width="auto";bC.style.width="auto";
satir.appendChild(bD);satir.appendChild(bC);kutu.appendChild(bilgi);kutu.appendChild(satir);
el("cekBtn").insertAdjacentElement("afterend",kutu);
function guncelle(){
if(mod!==DCM)return;
var ch=secen(),xD=engelli(ch.ad,"dogruluk"),xC=engelli(ch.ad,"cesaret");
bD.style.display=MOD_TURLER[DCM].dogruluk!==false?"":"none";
bC.style.display=MOD_TURLER[DCM].cesaret!==false?"":"none";
bD.disabled=xD;bC.disabled=xC;bD.style.opacity=xD?".4":"";bC.style.opacity=xC?".4":"";
var m=(ilk?"Sıra: ":"Sıradaki: ")+ch.ad+" — Doğruluk mu, Cesaret mi?";
if(xD)m+="\n"+ch.ad+" arka arkaya 2 kez Doğruluk seçti, bu sefer Cesaret.";
if(xC)m+="\n"+ch.ad+" arka arkaya 2 kez Cesaret seçti, bu sefer Doğruluk.";
bilgi.textContent=m;}
var prev=window.kartCek;
function sec(t){
if(mod!==DCM)return;
var ch=secen();
if(engelli(ch.ad,t)){guncelle();return;}
if(!ayarla(t)){bos();return;}
lastT=t;
var s=STREAK[ch.ad];
STREAK[ch.ad]=(s&&s.t===t)?{t:t,c:s.c+1}:{t:t,c:1};
prev(false);
guncelle();}
bD.onclick=function(){sec("dogruluk");};
bC.onclick=function(){sec("cesaret");};
window.kartCek=function(pas,not){
if(mod!==DCM){return prev(pas,not);}
if(!pas||!lastT){return;}
if(!ayarla(lastT)){bos();return;}
prev(pas,not);};
var ob=window.oyunuBaslat;
window.oyunuBaslat=function(){
ob();
if(mod===DCM){
STREAK={};lastT="";
el("cekBtn").style.display="none";kutu.style.display="flex";
el("kart").textContent="Doğruluk mu, Cesaret mi? 👇";
var k=el("kuralBilgi");k.textContent="Sıradaki oyuncu kendisi seçer. Aynı seçeneği arka arkaya 3 kez seçemezsin.";k.style.display="block";
guncelle();
}else{kutu.style.display="none";}};
});
