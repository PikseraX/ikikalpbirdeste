/* Görünüm: temalar, avatar, alt çubuk, ilerleme, kutlama */
(function(){
var d=document;
function el(i){return d.getElementById(i);}
function dene(f){try{f();}catch(e){}}
function oku(k,v){try{var x=localStorage.getItem(k);return x===null?v:JSON.parse(x);}catch(e){return v;}}
function yaz(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
var MODTEMA={
"Romantik":["#ec4899","#8b5cf6"],
"Eğlenceli":["#f97316","#f59e0b"],
"Beni Ne Kadar Tanıyorsun":["#06b6d4","#6366f1"],
"Uzak Mesafe":["#3b82f6","#22d3ee"],
"Evde Gece":["#6366f1","#1e40af"],
"Yeni Tanışanlar":["#22c55e","#84cc16"],
"Gelecek":["#a855f7","#ec4899"],
"Ok mu Nok mu":["#14b8a6","#f43f5e"],
"İkisinden Birini Seç":["#eab308","#8b5cf6"],
"Doğruluk mu Cesaretlik mi":["#ef4444","#f97316"]
};
var TEMALAR=[{k:"mor",r:"#7c3aed",bg:"#1a1025"},{k:"gece",r:"#3b82f6",bg:"#0b1220"},{k:"pembe",r:"#ec4899",bg:"#2a1020"}];
var DEF=["🦊","🐻","🐼","🐯","🦄","🐸","🐙","🦋"],ALL=["🦊","🐻","🐼","🐯","🦄","🐸","🐙","🦋","🐰","🌸","⭐","🍀"];
var AV=oku("kartOyunAvatar",{});
if(!AV||typeof AV!=="object"||Array.isArray(AV)){AV={};}
function avatarOf(o){return AV[o.id]||DEF[((o.id-1)%DEF.length+DEF.length)%DEF.length];}

/* Genel tema */
function temaSec(k){
var t=TEMALAR.filter(function(x){return x.k===k;})[0]||TEMALAR[0];
if(t.k==="mor"){d.body.removeAttribute("data-tema");}else{d.body.setAttribute("data-tema",t.k);}
var m=d.querySelector('meta[name="theme-color"]');if(m){m.setAttribute("content",t.bg);}
yaz("kartOyunTema",t.k);
var bs=d.querySelectorAll("#temaSec button");
for(var i=0;i<bs.length;i++){bs[i].classList.toggle("sel",bs[i].getAttribute("data-k")===t.k);}
}
dene(function(){
var ts=d.createElement("div");ts.id="temaSec";
var lb=d.createElement("span");lb.textContent="🎨 Tema";ts.appendChild(lb);
TEMALAR.forEach(function(t){
var b=d.createElement("button");b.type="button";b.setAttribute("data-k",t.k);b.style.background=t.r;
b.setAttribute("aria-label","Tema: "+t.k);
b.onclick=function(){temaSec(t.k);};
ts.appendChild(b);
});
el("menu").appendChild(ts);
temaSec(oku("kartOyunTema","mor"));
});

/* Ekran geçişi: moda göre renk, özette kutlama */
var goster0=window.goster;
window.goster=function(id){
goster0(id);
dene(function(){
var m=MODTEMA[mod];
if(m&&(id==="turEkran"||id==="oyun"||id==="ozet")){d.body.style.setProperty("--acc",m[0]);d.body.style.setProperty("--acc2",m[1]);}
else{d.body.style.removeProperty("--acc");d.body.style.removeProperty("--acc2");}
if(id==="ozet"){yagmur();}
});
};
function yagmur(){
if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches){return;}
var E=["💜","💖","✨","🎉","💕","⭐"];
for(var i=0;i<26;i++){(function(){
var s=d.createElement("span"),sn=2.4+Math.random()*2.2;
s.className="kalpyagmur";s.textContent=E[Math.floor(Math.random()*E.length)];
s.style.left=(Math.random()*100)+"%";s.style.fontSize=(18+Math.random()*20)+"px";
s.style.animationDuration=sn+"s";s.style.animationDelay=(Math.random()*1.2)+"s";
d.body.appendChild(s);
setTimeout(function(){if(s.parentNode){s.parentNode.removeChild(s);}},(sn+1.5)*1000+300);
})();}
}

/* Mod listesinde renkli şerit */
function modRenkle(){
var bs=d.querySelectorAll("#modListe button");
for(var i=0;i<bs.length;i++){
var sp=bs[i].querySelector("span span"),m=sp?MODTEMA[sp.textContent]:null;
if(m){bs[i].style.setProperty("--modrenk",m[0]);}
}
}
var mc0=window.modlariCiz;
window.modlariCiz=function(){mc0();dene(modRenkle);};
dene(modRenkle);

/* Oyuncu avatarları */
var oc0=window.oyunculariCiz;
window.oyunculariCiz=function(){
oc0();
dene(function(){
var kutular=d.querySelectorAll("#oyuncuListe .oyuncu");
for(var i=0;i<kutular.length;i++){(function(k,o){
if(!o){return;}
var row=d.createElement("div");row.className="avRow";
ALL.forEach(function(e){
var b=d.createElement("button");b.type="button";b.className="avbtn";b.textContent=e;
if(avatarOf(o)===e){b.classList.add("sel");}
b.onclick=function(){
AV[o.id]=e;yaz("kartOyunAvatar",AV);
var xs=row.querySelectorAll(".avbtn");
for(var j=0;j<xs.length;j++){xs[j].classList.toggle("sel",xs[j]===b);}
};
row.appendChild(b);
});
k.insertBefore(row,k.firstChild);
})(kutular[i],OYUNCULAR[i]);}
});
};
dene(function(){window.oyunculariCiz();});

/* Sıra kutusu */
function kisiBul(ad){for(var i=0;i<OYUNCULAR.length;i++){if(OYUNCULAR[i].ad===ad){return OYUNCULAR[i];}}return null;}
function kisiEl(ad){
var s=d.createElement("span"),e=d.createElement("span"),n=d.createElement("span"),o=kisiBul(ad);
s.className="kisi";e.className="em";e.textContent=o?avatarOf(o):"🙂";n.textContent=ad;
s.appendChild(e);s.appendChild(n);return s;
}
function siraCiz(){
var t=el("siraBilgi").textContent.trim(),b=el("sira2");
if(!t){b.style.display="none";return;}
var m=t.match(/^Sıra:\s*(.+?)\s*\|\s*Partner:\s*(.+)$/),m2=t.match(/^Kartı okuyan:\s*(.+)$/);
b.innerHTML="";
if(m){var h=d.createElement("span");h.textContent="💞";b.appendChild(kisiEl(m[1]));b.appendChild(h);b.appendChild(kisiEl(m[2]));}
else if(m2){var y=d.createElement("span");y.className="bilgi";y.textContent="okuyor";b.appendChild(kisiEl(m2[1]));b.appendChild(y);}
else{b.textContent=t;}
b.style.display="flex";
}
dene(function(){
var s2=d.createElement("div");s2.id="sira2";
el("siraBilgi").insertAdjacentElement("beforebegin",s2);
new MutationObserver(function(){dene(siraCiz);}).observe(el("siraBilgi"),{childList:true,characterData:true,subtree:true});
});

/* Kart: kapalı yüz, dokununca çekme, köşe ikonu */
dene(function(){
var kart=el("kart");
function durum(){kart.classList.toggle("kapali",kart.textContent.indexOf("Hazır olunca")===0);}
new MutationObserver(durum).observe(kart,{childList:true,characterData:true,subtree:true});
durum();
kart.addEventListener("click",function(){
if(kart.classList.contains("kapali")){var b=el("cekBtn");if(b&&b.style.display!=="none"){b.click();}}
});
});

/* İlerleme çubuğu */
dene(function(){
var il=d.createElement("div");il.id="ilerleme";il.appendChild(d.createElement("i"));
el("sayac").insertAdjacentElement("afterend",il);
});
function ilerle(){
var b=el("ilerleme"),n=(typeof deste!=="undefined"&&deste.length)?deste.length:0;
if(b&&b.firstChild){b.firstChild.style.width=(n?Math.min(100,Math.round(sira/n*100)):0)+"%";}
}
var RENK={sohbet:"#38bdf8",soru:"#fbbf24",itiraf:"#f43f5e",tahmin:"#a78bfa",hareket:"#fb923c",yaratici:"#34d399",meydan:"#facc15",yakin:"#f472b6",gunluk:"#94a3b8",sosyal:"#60a5fa",aile:"#f59e0b",hayat:"#2dd4bf",ask:"#fb7185",cilgin:"#c084fc",kendi:"#e879f9",dogruluk:"#38bdf8",cesaret:"#ef4444"};
var KIND={dogruluk:{e:"💬",ad:"Doğruluk"},cesaret:{e:"🔥",ad:"Cesaret"}};
function etiketle(){
var kart=el("kart"),et=el("turEtiket");
if(el("pasBtn").style.display==="none"||!sonKart){kart.removeAttribute("data-ik");return;}
var k="kendi",kd="",l=GOREVLER[mod]||[];
for(var i=0;i<l.length;i++){if(l[i][1]===sonKart){k=l[i][0];kd=l[i][2]||"";break;}}
var b=k==="kendi"?{e:"✍️",ad:"Kendi kartın"}:(TUR_LISTESI.filter(function(x){return x.k===k;})[0]||{e:"🎴",ad:""});
var r=RENK[kd||k]||"#7c3aed",yz=KIND[kd]?KIND[kd].e+" "+KIND[kd].ad+" · "+b.e+" "+b.ad:b.e+" "+b.ad;
kart.style.borderColor=r;kart.style.boxShadow="0 0 18px "+r+"55";
if(et){et.style.color=r;et.textContent=yz;et.style.display="block";}
kart.setAttribute("data-ik",KIND[kd]?KIND[kd].e:b.e);
}
var kc0=window.kartCek;
window.kartCek=function(pas,not){
kc0(pas,not);
dene(function(){etiketle();ilerle();});
};
var ob0=window.oyunuBaslat;
window.oyunuBaslat=function(){
ob0();
dene(function(){el("kart").removeAttribute("data-ik");ilerle();});
};

/* Alt sabit düğme çubuğu */
dene(function(){
var bar=d.createElement("div");bar.id="altBar";
var sat=d.createElement("div");sat.id="altSatir";
if(el("cekBtn")){bar.appendChild(el("cekBtn"));}
["pasBtn","gizleBtn"].forEach(function(i){var x=el(i);if(x){sat.appendChild(x);}});
bar.appendChild(sat);
el("oyun").appendChild(bar);
});

/* Ana menü: büyük logo ve yüzen kalpler */
dene(function(){
var h=d.querySelector("#menu h1");
if(h){h.innerHTML='<span class="logoK">💜</span><span class="logoY">İki Kalp<br>Bir Deste</span>';}
var yz=d.createElement("div");yz.className="yuzenler";
var E=["💜","💖","💕","✨","💗"];
for(var i=0;i<10;i++){
var s=d.createElement("span");s.className="yuzen";s.textContent=E[i%E.length];
s.style.left=(5+Math.random()*88)+"%";s.style.fontSize=(16+Math.random()*22)+"px";
s.style.animationDuration=(9+Math.random()*9)+"s";s.style.animationDelay=(-Math.random()*14)+"s";
yz.appendChild(s);
}
el("menu").insertBefore(yz,el("menu").firstChild);
});
})();
