// Doğruluk mu Cesaretlik mi modu kartları. Biçim: ["tür","görev","doğruluk ya da cesaret"]
MODLAR.push({ad:"Doğruluk mu Cesaretlik mi",ikon:"🎯",aciklama:"Dürüst ol ya da cesaretini göster"});
ekle("Doğruluk mu Cesaretlik mi",[
["sohbet","Partnerinle ilk karşılaştığında ne hissettiğini dürüstçe anlat.","dogruluk"],
["soru","Partnerinde sana en çok iyi gelen şey ne?","dogruluk"],
["itiraf","Partnerine hiç söylemediğin ama söylemek istediğin güzel bir şey var mı? Söyle.","dogruluk"],
["soru","Partnerinle ilişkinde seni en çok mutlu eden an hangisiydi?","dogruluk"],
["sohbet","Partnerinin seni ilk gülümseten anını hatırla ve anlat.","dogruluk"],
["soru","Partnerinin hangi huyunu en çok seviyorsun?","dogruluk"],
["itiraf","Partnerin için yapıp ona hiç söylemediğin bir şey var mı?","dogruluk"],
["soru","Partnerine bir gün sürpriz yapsan ne yapardın?","dogruluk"],
["sohbet","Partnerinle ilgili aklına gelen en komik anıyı anlat.","dogruluk"],
["soru","Partnerinle yapmak istediğin ama henüz yapmadığınız bir şey ne?","dogruluk"],
["sohbet","Seni en çok ne endişelendiriyor ve partnerin sana nasıl destek olabilir?","dogruluk"],
["sohbet","Partnerine ilk ne zaman güvenmeye başladığını anlat.","dogruluk"],
["soru","Partnerinden en çok neyi öğrendin?","dogruluk"],
["itiraf","Hayatında yaptığın en utandırıcı ama şimdi güldüğün şey ne?","dogruluk"],
["itiraf","Partnerinle ilgili hiç kıskandığın bir şey oldu mu? Tatlı bir dille söyle.","dogruluk"],
["soru","En çok hangi şarkıyı partnerinle özdeşleştiriyorsun?","dogruluk"],
["sohbet","Partnerinle geçirdiğin en güzel gün hangisiydi?","dogruluk"],
["soru","Partnerinin sana ilk söylediği ve unutamadığın cümle neydi?","dogruluk"],
["itiraf","Partnerin hakkında en çok hangi şeye hayranlık duyuyorsun?","dogruluk"],
["soru","Partnerinle birlikte yaşlandığını hayal ettiğinde aklına gelen ilk görüntü ne?","dogruluk"],
["yaratici","Partnerin için 20 saniye doğaçlama bir şarkı söyle.","cesaret"],
["hareket","Partnerine 3 farklı şekilde ‘günaydın’ de.","cesaret"],
["hareket","30 saniye boyunca partnerinin taklidini yap.","cesaret"],
["yaratici","Partnerine bir kalp çiz ve ona hediye et.","cesaret"],
["yakin","Partnerine 10 saniye boyunca göz kırpmadan bak.","cesaret"],
["meydan","Partnerinin en sevdiği şarkıyı 15 saniye söyle.","cesaret"],
["yaratici","Partnerin için 4 satırlık bir iltifat şiiri uydur ve oku.","cesaret"],
["hareket","30 saniye boyunca partnerinle dans et.","cesaret"],
["yakin","Partnerine sarıl ve 20 saniye bırakma.","cesaret"],
["yakin","Partnerinin elini tut ve ona 3 güzel şey söyle.","cesaret"],
["sohbet","Telefonundan partnerinle en sevdiğin fotoğrafı göster ve hikayesini anlat.","cesaret"],
["sohbet","Partnerine 20 saniyelik bir teşekkür konuşması yap.","cesaret"],
["hareket","1 dakika boyunca robot gibi konuş, partnerin sana soru sorsun.","cesaret"],
["yaratici","Partnerine komik bir lakap bul ve bugün o lakapla seslen.","cesaret"],
["yakin","Partnerinin sırtına parmakla bir kelime yaz, o tahmin etsin.","cesaret"],
["yakin","Partnerin isterse, onun yanağına küçük bir öpücük kondur.","cesaret"],
["hareket","Partnerinle 1 dakika bir film sahnesini canlandırın.","cesaret"],
["meydan","10 saniye boyunca en komik yüz ifadeni yap.","cesaret"],
["meydan","Partnerine tekrar etmeden 5 farklı iltifat et.","cesaret"],
["yaratici","Partnerin için kısa bir sevgi mesajı yaz ve ona oku.","cesaret"]
]);

/* Seçim sistemi: oyuncu Doğruluk ya da Cesaret'i kendisi seçer, aynı seçeneği arka arkaya 3 kez seçemez */
window.addEventListener("load",function(){
var DCM="Doğruluk mu Cesaretlik mi",STREAK=Object.create(null),lastT="",d=document;
function el(i){return d.getElementById(i);}
function tipOf(t){var l=GOREVLER[DCM]||[];for(var i=0;i<l.length;i++){if(l[i][1]===t)return l[i][2]||"";}return "";}
function uygun(t,k){var tip=tipOf(t);return !tip||tip===k;}
function var_(k){for(var i=sira;i<deste.length;i++){if(uygun(deste[i],k))return true;}return false;}
function ikisiAcik(){return var_("dogruluk")&&var_("cesaret");}
function secen(){var n=OYUNCULAR.length;return ilk?OYUNCULAR[oyuncuIdx]:OYUNCULAR[(oyuncuIdx+1)%n];}
function engelli(ad,t){var s=STREAK[ad];return ikisiAcik()&&!!s&&s.t===t&&s.c>=2;}
function ayarla(t){
for(var i=sira;i<deste.length;i++){
if(uygun(deste[i],t)){var x=deste[sira];deste[sira]=deste[i];deste[i]=x;return true;}
}
return false;}
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
if(oyunBitti){kutu.style.display="none";return;}
var son=sira>=deste.length;
var ch=secen(),xD=engelli(ch.ad,"dogruluk"),xC=engelli(ch.ad,"cesaret");
bD.style.display=(son?lastT==="dogruluk":var_("dogruluk"))?"":"none";
bC.style.display=(son?lastT==="cesaret":var_("cesaret"))?"":"none";
bD.textContent=son?"✅ Yaptık, Sonraki Kart":"💬 Doğruluk";
bC.textContent=son?"✅ Yaptık, Sonraki Kart":"🔥 Cesaret";
bD.disabled=xD;bC.disabled=xC;bD.style.opacity=xD?".4":"";bC.style.opacity=xC?".4":"";
var m=son?"":(ilk?"Sıra: ":"Sıradaki: ")+ch.ad+" — Doğruluk mu, Cesaret mi?";
if(xD)m+="\n"+ch.ad+" arka arkaya 2 kez Doğruluk seçti, bu sefer Cesaret.";
if(xC)m+="\n"+ch.ad+" arka arkaya 2 kez Cesaret seçti, bu sefer Doğruluk.";
bilgi.textContent=m;}
var prev=window.kartCek;
function sec(t){
if(mod!==DCM||oyunBitti)return;
if(sira>=deste.length){prev(false);guncelle();return;}
var ch=secen();
if(engelli(ch.ad,t)){guncelle();return;}
if(!ayarla(t)){guncelle();return;}
if(prev(false)===false)return;
lastT=t;
var s=STREAK[ch.ad];
STREAK[ch.ad]=(s&&s.t===t)?{t:t,c:s.c+1}:{t:t,c:1};
guncelle();}
bD.onclick=function(){sec("dogruluk");};
bC.onclick=function(){sec("cesaret");};
window.kartCek=function(pas,not){
if(mod!==DCM){return prev(pas,not);}
if(oyunBitti||!pas||!lastT){return false;}
var secimBekle=sira<deste.length&&!ayarla(lastT);
var sonuc=prev(pas,not,secimBekle);
if(sonuc===false)return false;
if(secimBekle)lastT="";
else if(!oyunBitti)lastT=tipOf(sonKart)||lastT;
guncelle();return sonuc;};
var ob=window.oyunuBaslat;
window.oyunuBaslat=function(){
if(ob()===false)return false;
if(mod===DCM){
STREAK=Object.create(null);lastT="";
el("cekBtn").style.display="none";kutu.style.display="flex";
el("kart").textContent="Doğruluk mu, Cesaret mi? 👇";
var k=el("kuralBilgi");k.textContent="Sıradaki oyuncu kendisi seçer. Aynı seçeneği arka arkaya 3 kez seçemezsin.";k.style.display="block";
guncelle();
}else{kutu.style.display="none";}};
});
