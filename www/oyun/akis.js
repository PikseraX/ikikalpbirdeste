/* Oyuncular, kategori seçimi, kart çekme ve geri bildirim akışı. */
var GERI_EPOSTA = "ikikalpbirdeste@gmail.com";
var MAX_OYUNCU = 8;
var PCINS_ETIKET = { hepsi: "Her ikisi", kadin: "Kadın", erkek: "Erkek" };
var sonId = 0;
function yeniId() {
  sonId++;
  return sonId;
}
function yeniOyuncu() {
  return { id: yeniId(), ad: "", cins: "", pcins: "hepsi", partner: "rastgele" };
}
var OYUNCULAR = [yeniOyuncu(), yeniOyuncu()];
var PARTNER_SECLER = [];
var MOD_TURLER = {};
var mod = "",
  deste = [],
  sira = 0,
  oyuncuIdx = 0,
  sonKart = "",
  ilk = true,
  oyunBitti = false;

function modBul(ad) {
  return MODLAR.filter(function (x) {
    return x.ad === ad;
  })[0];
}
function modGorevleri(modAd) {
  return GOREVLER[modAd] || [];
}
function mevcutTurler(modAd) {
  var g = modGorevleri(modAd);
  return TUR_LISTESI.filter(function (t) {
    return g.some(function (x) {
      return x[0] === t.k;
    });
  });
}
function modTurleriYukle() {
  var kayit = {};
  try {
    var k = localStorage.getItem("kartOyunModTurler");
    if (k) {
      kayit = JSON.parse(k) || {};
    }
  } catch (e) {
    kayit = {};
  }
  MODLAR.forEach(function (m) {
    MOD_TURLER[m.ad] = {};
    var o = kayit[m.ad] && typeof kayit[m.ad] === "object" ? kayit[m.ad] : {};
    var mt = mevcutTurler(m.ad);
    mt.forEach(function (t) {
      var v = typeof o[t.k] === "boolean" ? o[t.k] : true;
      MOD_TURLER[m.ad][t.k] = v;
    });
    // Validate enabled categories in ozellikler.js after custom cards are loaded.
  });
}
function modTurleriKaydet() {
  try {
    localStorage.setItem("kartOyunModTurler", JSON.stringify(MOD_TURLER));
  } catch (e) {}
}
function gorevSayisi(modAd) {
  return modGorevleri(modAd).filter(function (g) {
    return MOD_TURLER[modAd][g[0]];
  }).length;
}

function oyunculariYukle() {
  try {
    var k = localStorage.getItem("kartOyunOyuncular");
    if (!k) {
      return;
    }
    var a = JSON.parse(k);
    if (!Array.isArray(a) || a.length < 2 || a.length > MAX_OYUNCU) {
      return;
    }
    var temiz = [],
      idler = {},
      idGecerli = true;
    for (var i = 0; i < a.length; i++) {
      if (a[i] && typeof a[i].ad === "string" && typeof a[i].cins === "string") {
        var id = a[i].id;
        if (!Number.isInteger(id) || id <= 0 || idler[id]) {
          idGecerli = false;
        }
        idler[id] = true;
        var pc = a[i].pcins === "kadin" || a[i].pcins === "erkek" ? a[i].pcins : "hepsi";
        temiz.push({
          id: id,
          ad: a[i].ad.slice(0, 16),
          cins: a[i].cins,
          pcins: pc,
          partner: a[i].partner
        });
      }
    }
    if (temiz.length < 2) {
      return;
    }
    if (!idGecerli) {
      temiz.forEach(function (o) {
        o.id = yeniId();
        o.partner = "rastgele";
      });
    } else {
      temiz.forEach(function (o) {
        if (o.id > sonId) {
          sonId = o.id;
        }
      });
    }
    OYUNCULAR = temiz;
    partnerleriDuzelt();
  } catch (e) {}
}
function oyunculariKaydet() {
  try {
    localStorage.setItem("kartOyunOyuncular", JSON.stringify(OYUNCULAR));
  } catch (e) {}
}

function goster(id) {
  document.querySelectorAll(".ekran").forEach(function (e) {
    e.classList.remove("aktif");
  });
  document.getElementById(id).classList.add("aktif");
}

function adaylar(idx) {
  var n = OYUNCULAR.length,
    liste = [],
    pc = OYUNCULAR[idx].pcins;
  for (var j = 0; j < n; j++) {
    if (j === idx) {
      continue;
    }
    if (n === 2 || pc === "hepsi" || OYUNCULAR[j].cins === pc) {
      liste.push(j);
    }
  }
  return liste;
}
function partnerleriDuzelt() {
  for (var i = 0; i < OYUNCULAR.length; i++) {
    var o = OYUNCULAR[i];
    if (typeof o.partner === "number") {
      var ad = adaylar(i),
        bulundu = false;
      for (var k = 0; k < ad.length; k++) {
        if (OYUNCULAR[ad[k]].id === o.partner) {
          bulundu = true;
        }
      }
      if (!bulundu) {
        o.partner = "rastgele";
      }
    } else {
      o.partner = "rastgele";
    }
  }
}

function gorunenAd(i) {
  var ad = OYUNCULAR[i].ad.trim();
  return ad !== "" ? ad : i + 1 + ". oyuncu";
}
function partnerSecenekleriDoldur(sec, i) {
  sec.innerHTML = "";
  adaylar(i).forEach(function (j) {
    var op = document.createElement("option");
    op.value = String(OYUNCULAR[j].id);
    op.textContent = gorunenAd(j);
    if (OYUNCULAR[j].ad.trim()) op.setAttribute("translate", "no");
    sec.appendChild(op);
  });
  var rast = document.createElement("option");
  rast.value = "rastgele";
  var pc = OYUNCULAR[i].pcins;
  rast.textContent = pc === "hepsi" ? "🎲 Rastgele" : "🎲 Rastgele (" + PCINS_ETIKET[pc] + ")";
  sec.appendChild(rast);
  sec.value = String(OYUNCULAR[i].partner);
}
function partnerleriYenile() {
  for (var i = 0; i < OYUNCULAR.length; i++) {
    if (PARTNER_SECLER[i]) {
      partnerSecenekleriDoldur(PARTNER_SECLER[i], i);
    }
  }
}
function oyunculariCiz() {
  var kap = document.getElementById("oyuncuListe");
  kap.innerHTML = "";
  PARTNER_SECLER = [];
  OYUNCULAR.forEach(function (o, i) {
    var kutu = document.createElement("div");
    kutu.className = "oyuncu";
    var ust = document.createElement("div");
    ust.className = "satir";
    var inp = document.createElement("input");
    inp.type = "text";
    inp.maxLength = 16;
    inp.placeholder = i + 1 + ". oyuncunun adı";
    inp.value = o.ad;
    inp.setAttribute("autocomplete", "off");
    inp.oninput = function () {
      OYUNCULAR[i].ad = inp.value;
      partnerleriYenile();
    };
    ust.appendChild(inp);
    if (OYUNCULAR.length > 2) {
      var sil = document.createElement("button");
      sil.className = "sil";
      sil.textContent = "✕";
      sil.onclick = function () {
        oyuncuSil(i);
      };
      ust.appendChild(sil);
    }
    kutu.appendChild(ust);
    var sec = document.createElement("select");
    [
      ["", "Cinsiyet seç"],
      ["kadin", "Kadın"],
      ["erkek", "Erkek"],
      ["belirtmem", "Belirtmek istemiyorum"]
    ].forEach(function (s) {
      var op = document.createElement("option");
      op.value = s[0];
      op.textContent = s[1];
      if (o.cins === s[0]) {
        op.selected = true;
      }
      sec.appendChild(op);
    });
    sec.onchange = function () {
      OYUNCULAR[i].cins = sec.value;
      partnerleriDuzelt();
      partnerleriYenile();
    };
    kutu.appendChild(sec);
    if (OYUNCULAR.length > 2) {
      var et1 = document.createElement("div");
      et1.className = "etiket";
      et1.textContent = "Partner cinsiyeti";
      kutu.appendChild(et1);
      var pcSec = document.createElement("select");
      ["hepsi", "kadin", "erkek"].forEach(function (v) {
        var op = document.createElement("option");
        op.value = v;
        op.textContent = PCINS_ETIKET[v];
        if (o.pcins === v) {
          op.selected = true;
        }
        pcSec.appendChild(op);
      });
      pcSec.onchange = function () {
        OYUNCULAR[i].pcins = pcSec.value;
        partnerleriDuzelt();
        partnerleriYenile();
      };
      kutu.appendChild(pcSec);
      var et2 = document.createElement("div");
      et2.className = "etiket";
      et2.textContent = "Partneri";
      kutu.appendChild(et2);
      var ps = document.createElement("select");
      partnerSecenekleriDoldur(ps, i);
      ps.onchange = function () {
        OYUNCULAR[i].partner = ps.value === "rastgele" ? "rastgele" : Number(ps.value);
      };
      kutu.appendChild(ps);
      PARTNER_SECLER[i] = ps;
    }
    kap.appendChild(kutu);
  });
  document.getElementById("ekleBtn").style.display =
    OYUNCULAR.length >= MAX_OYUNCU ? "none" : "block";
}
function oyuncuEkle() {
  if (OYUNCULAR.length >= MAX_OYUNCU) {
    return;
  }
  OYUNCULAR.push(yeniOyuncu());
  document.getElementById("oyuncuUyari").textContent = "";
  oyunculariCiz();
}
function oyuncuSil(i) {
  if (OYUNCULAR.length <= 2) {
    return;
  }
  OYUNCULAR.splice(i, 1);
  partnerleriDuzelt();
  document.getElementById("oyuncuUyari").textContent = "";
  oyunculariCiz();
}
function oyuncularKontrol() {
  var gorulen = Object.create(null),
    n = OYUNCULAR.length;
  for (var i = 0; i < n; i++) {
    var ad = OYUNCULAR[i].ad.trim();
    if (ad === "") {
      return i + 1 + ". oyuncunun adını yaz.";
    }
    if (OYUNCULAR[i].cins === "") {
      return ad + " için cinsiyet seç.";
    }
    var anahtar = ad.toLocaleLowerCase("tr");
    if (gorulen[anahtar]) {
      return "Aynı isim iki kez kullanılmış: " + ad + ". İsimleri ayırt edilebilir yap.";
    }
    gorulen[anahtar] = true;
  }
  if (n > 2) {
    for (var j = 0; j < n; j++) {
      if (adaylar(j).length === 0) {
        return (
          OYUNCULAR[j].ad.trim() +
          " için seçtiğin partner cinsiyetinde (" +
          PCINS_ETIKET[OYUNCULAR[j].pcins] +
          ") başka oyuncu yok. Partner cinsiyetini değiştir."
        );
      }
    }
  }
  return "";
}
function oyuncularDevam() {
  var hata = oyuncularKontrol();
  document.getElementById("oyuncuUyari").textContent = hata;
  if (hata !== "") {
    return;
  }
  var girdiler = document.querySelectorAll("#oyuncuListe input[type='text']");
  for (var i = 0; i < OYUNCULAR.length; i++) {
    OYUNCULAR[i].ad = OYUNCULAR[i].ad.trim();
    if (girdiler[i]) girdiler[i].value = OYUNCULAR[i].ad;
  }
  oyunculariKaydet();
  goster("modlar");
}

function modlariCiz() {
  var kap = document.getElementById("modListe");
  kap.innerHTML = "";
  MODLAR.forEach(function (m) {
    if (modGorevleri(m.ad).length === 0) {
      return;
    }
    var b = document.createElement("button");
    b.className = "mod";
    var ik = document.createElement("span");
    ik.className = "mik";
    ik.textContent = m.ikon;
    var metin = document.createElement("span");
    var baslik = document.createElement("span");
    baslik.textContent = m.ad;
    var alt = document.createElement("small");
    alt.textContent = m.aciklama;
    metin.appendChild(baslik);
    metin.appendChild(alt);
    b.appendChild(ik);
    b.appendChild(metin);
    b.onclick = function () {
      turSayfasiAc(m.ad);
    };
    kap.appendChild(b);
  });
}

function turSayfasiAc(ad) {
  mod = ad;
  var m = modBul(ad);
  document.getElementById("turBaslik").textContent = m.ikon + " " + m.ad;
  document.getElementById("turAciklama").textContent = "Bu mod için hangi görev türleri gelsin?";
  document.getElementById("uyari").textContent = "";
  var kap = document.getElementById("turGrid");
  kap.innerHTML = "";
  mevcutTurler(ad).forEach(function (t) {
    var b = document.createElement("button");
    b.id = "tur_" + t.k;
    b.className = "tur";
    var ik = document.createElement("span");
    ik.className = "ik";
    ik.textContent = t.e;
    b.appendChild(ik);
    b.appendChild(document.createTextNode(t.ad));
    b.onclick = function () {
      turDegis(t.k);
    };
    kap.appendChild(b);
  });
  turGuncelle();
  goster("turEkran");
}
function turGuncelle() {
  var hepsiAcik = true;
  mevcutTurler(mod).forEach(function (t) {
    var acik = MOD_TURLER[mod][t.k];
    document.getElementById("tur_" + t.k).classList.toggle("acik", acik);
    if (!acik) {
      hepsiAcik = false;
    }
  });
  document.getElementById("hepsiBtn").style.display = hepsiAcik ? "none" : "block";
  document.getElementById("baslaBtn").textContent = "🎴 Başla (" + gorevSayisi(mod) + " görev)";
}
function turDegis(k) {
  var acikSayi = 0;
  mevcutTurler(mod).forEach(function (t) {
    if (MOD_TURLER[mod][t.k]) {
      acikSayi++;
    }
  });
  if (MOD_TURLER[mod][k] && acikSayi === 1) {
    document.getElementById("uyari").textContent = "En az bir tür açık kalmalı.";
    return;
  }
  MOD_TURLER[mod][k] = !MOD_TURLER[mod][k];
  document.getElementById("uyari").textContent = "";
  modTurleriKaydet();
  turGuncelle();
}
function hepsiniAc() {
  mevcutTurler(mod).forEach(function (t) {
    MOD_TURLER[mod][t.k] = true;
  });
  document.getElementById("uyari").textContent = "";
  modTurleriKaydet();
  turGuncelle();
}

function karistir(d) {
  for (var i = d.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = d[i];
    d[i] = d[j];
    d[j] = t;
  }
  return d;
}
/* Hazır ve özel kart desteleri aynı karıştırma kuralını kullanır. */
function desteyiHazirla(liste) {
  deste = karistir(liste);
  if (deste.length > 1 && deste[0] === sonKart) {
    var t = deste[0];
    deste[0] = deste[1];
    deste[1] = t;
  }
  sira = 0;
}
function yeniDeste() {
  var liste = modGorevleri(mod)
    .filter(function (g) {
      return MOD_TURLER[mod][g[0]];
    })
    .map(function (g) {
      return g[1];
    });
  desteyiHazirla(liste);
}
function oyunuBaslat() {
  oyunBitti = false;
  oyuncuIdx = 0;
  sonKart = "";
  ilk = true;
  yeniDeste();
  if (deste.length === 0) {
    oyunBitti = true;
    turSayfasiAc(mod);
    document.getElementById("uyari").textContent =
      "Gösterilecek kart kalmadı. Gizlenen kartları geri açabilir ya da başka tür seçebilirsin.";
    return false;
  }
  var m = modBul(mod);
  document.getElementById("modAdi").textContent = m.ikon + " " + m.ad;
  document.getElementById("kart").textContent = "Hazır olunca kart çek 👇";
  document.getElementById("siraBilgi").textContent = "";
  document.getElementById("sayac").textContent = "";
  var kural = document.getElementById("kuralBilgi");
  if (m.kural) {
    kural.textContent = m.kural;
    kural.style.display = "block";
  } else {
    kural.textContent = "";
    kural.style.display = "none";
  }
  document.getElementById("cekBtn").textContent = "🎴 Kart Çek";
  document.getElementById("pasBtn").style.display = "none";
  goster("oyun");
  document.getElementById("oyun").scrollTop = 0;
}
function partnerBul(idx) {
  var o = OYUNCULAR[idx],
    ad = adaylar(idx);
  if (typeof o.partner === "number") {
    for (var k = 0; k < ad.length; k++) {
      if (OYUNCULAR[ad[k]].id === o.partner) {
        return ad[k];
      }
    }
  }
  if (ad.length === 0) {
    for (var j = 0; j < OYUNCULAR.length; j++) {
      if (j !== idx) {
        ad.push(j);
      }
    }
  }
  return ad[Math.floor(Math.random() * ad.length)];
}
function kartCek(pas) {
  if (oyunBitti) return;
  if (sira >= deste.length) {
    oyunBitti = true;
    document.getElementById("cekBtn").style.display = "none";
    document.getElementById("pasBtn").style.display = "none";
    var gizleBtn = document.getElementById("gizleBtn");
    if (gizleBtn) gizleBtn.style.display = "none";
    var sureBtn = document.getElementById("sureBtn");
    if (sureBtn) sureBtn.style.display = "none";
    setTimeout(function () {
      if (typeof window.oyunuBitir === "function") window.oyunuBitir();
      else goster("ozet");
    }, 0);
    return;
  }
  var n = OYUNCULAR.length,
    m = modBul(mod);
  if (!pas && !ilk) {
    oyuncuIdx = (oyuncuIdx + 1) % n;
  }
  ilk = false;
  var gorev = deste[sira];
  sira++;
  sonKart = gorev;
  var kart = document.getElementById("kart");
  kart.classList.remove("cevir");
  void kart.offsetWidth;
  kart.textContent = gorev;
  kart.classList.add("cevir");
  if (m.kural) {
    document.getElementById("siraBilgi").textContent = "Kartı okuyan: " + OYUNCULAR[oyuncuIdx].ad;
  } else {
    var partnerIdx = partnerBul(oyuncuIdx);
    document.getElementById("siraBilgi").textContent =
      "Sıra: " + OYUNCULAR[oyuncuIdx].ad + "  |  Partner: " + OYUNCULAR[partnerIdx].ad;
  }
  document.getElementById("sayac").textContent = "Kart " + sira + " / " + deste.length;
  document.getElementById("cekBtn").textContent = m.buton ? m.buton : "✅ Yaptık, Sonraki Kart";
  document.getElementById("pasBtn").style.display = "block";
}

function gbAc() {
  document.getElementById("gUyari").textContent = "";
  goster("geriEkran");
}
function gGovde() {
  var t = document.getElementById("gMetin").value.trim();
  if (!t) {
    document.getElementById("gUyari").textContent = "Önce mesajını yaz.";
    return "";
  }
  var cevir = window.DIL
    ? window.DIL.cevir
    : function (s) {
        return s;
      };
  return (
    cevir(document.getElementById("gTur").value) +
    "\n\n" +
    t +
    "\n\n— " +
    cevir("Mod") +
    ": " +
    cevir(mod || "-")
  );
}
function gGonder() {
  var g = gGovde();
  if (!g) {
    return;
  }
  if (GERI_EPOSTA.indexOf("@") < 1) {
    document.getElementById("gUyari").textContent =
      "Kodun başındaki e-posta adresi henüz değiştirilmemiş.";
    return;
  }
  document.getElementById("gUyari").textContent = "";
  location.href =
    "mailto:" +
    GERI_EPOSTA +
    "?subject=" +
    encodeURIComponent(
      window.DIL
        ? window.DIL.cevir("İki Kalp Bir Deste geri bildirim")
        : "İki Kalp Bir Deste geri bildirim"
    ) +
    "&body=" +
    encodeURIComponent(g);
}

modTurleriYukle();
modlariCiz();
oyunculariYukle();
oyunculariCiz();
