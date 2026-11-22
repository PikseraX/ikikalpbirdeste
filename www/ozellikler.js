/*PURE*/
var TR = "a-zçğıöşüA-ZÇĞİÖŞÜ";
function adGoster(a) {
  return a.trim().replace(/(^|\s)(\S)/g, function (m, b, c) {
    return b + c.toLocaleUpperCase("tr");
  });
}
function ekAl(ad, tur) {
  var l = ad.toLocaleLowerCase("tr"),
    son = l.charAt(l.length - 1),
    sv = "aeıioöuü",
    vok = sv.indexOf(son) >= 0,
    v = "e";
  for (var i = l.length - 1; i >= 0; i--) {
    if (sv.indexOf(l.charAt(i)) >= 0) {
      v = l.charAt(i);
      break;
    }
  }
  var iki = "aıou".indexOf(v) >= 0 ? "a" : "e",
    dort = { a: "ı", "ı": "ı", e: "i", i: "i", o: "u", u: "u", "ö": "ü", "ü": "ü" }[v],
    y = vok ? "y" : "",
    sert = "çfhkpsşt".indexOf(son) >= 0 ? "t" : "d";
  var e = {
    dat: y + iki,
    acc: y + dort,
    gen: (vok ? "n" : "") + dort + "n",
    ins: y + "l" + iki,
    abl: sert + iki + "n",
    loc: sert + iki,
    siz: "s" + dort + "z"
  }[tur];
  return "\u2019" + e;
}
function ismeCevir(t, ad) {
  var sablonlar = window.KART_ISIM_SABLONLARI;
  if (sablonlar && Object.prototype.hasOwnProperty.call(sablonlar, t)) {
    t = sablonlar[t];
    // Elide French de/que before names beginning with a vowel; names stay literal.
    if (window.DIL && DIL.kod === "fr" && /^[aeiouyàâäéèêëîïôöùûüÿœæ]/i.test(ad.trim())) {
      t = t.replace(/\b(de|que) \{partner\}/gi, function (m, w) {
        return w.slice(0, -1) + "’{partner}";
      });
    }
    return t.replace(/\{partner\}/g, function () {
      return ad;
    });
  }
  var A = adGoster(ad),
    h = { "in": "", ine: "dat", ini: "acc", inin: "gen", inle: "ins", inden: "abl", inde: "loc", siz: "siz" };
  // Replace once so a player's name is never interpreted as another placeholder.
  return t.replace(
    new RegExp("\\{partner\\}|(^|[^" + TR + "])([Pp])artner([a-zçğıöşü]*)", "g"),
    function (m, pre, p, s) {
      if (m === "{partner}") return ad;
      if (!Object.prototype.hasOwnProperty.call(h, s)) return m;
      return pre + A + (h[s] ? ekAl(A, h[s]) : "");
    }
  );
}
function sureBul(t) {
  var sureler = window.KART_SURELER;
  if (
    sureler &&
    Object.prototype.hasOwnProperty.call(sureler, t) &&
    Number.isFinite(sureler[t]) &&
    sureler[t] > 0
  )
    return sureler[t];
  // Keep Chinese sentence commas distinct from decimal commas during normalization.
  var ham = String(t).replace(/，/g, function (c, i, s) {
    return /\p{N}/u.test(s.charAt(i - 1)) && /\p{N}/u.test(s.charAt(i + 1)) ? c : c + " ";
  });
  var metin = ham.normalize("NFKC").toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
  var sn =
    "saniye(?:ler)?(?:lik|de|den)?|seconds?|secs?|sekunden?|sekundig(?:e[nmrs]?)?|sek\\.?|secondes?|second[oi]|segundos?|секунд(?:а|ы|у|е|ой|ах|ами)?|δευτερολεπτ(?:ο|α|ου|ων)";
  var dk =
    "dakika(?:lar)?(?:lık|lik|da|dan)?|minutes?|mins?\\.?|minuten?|minutig(?:e[nmrs]?)?|minutos?|minuti|минут(?:а|ы|у|е|ой|ах|ами)?|λεπτ(?:ο|α|ου|ων)";
  var bir = "bir|one|an?|ein(?:e|en|er|em)?|un[oa]?|une|uma?|од(?:ин|на|ну)|ενα";
  var sayi = "\\d+(?:[.,]\\d+)?|" + bir;
  function miktar(v) {
    return /^\d/.test(v) ? Number(v.replace(",", ".")) : 1;
  }
  function zamanMi(v, birim, once, sonra, bilesik) {
    if (/^\d/.test(v) || !/^(?:second[eo]?|segundo)$/.test(birim)) return true;
    // Written "a second"/"un secondo" can also mean an ordinal.
    sonra = sonra.trim();
    once = once.trim();
    // A temporal introduction plus an action continuation is not an ordinal noun phrase.
    var devam =
      /^(?:and\s+(?:then\b|(?:smile|laugh|breathe|relax|look|listen|wink|hug|kiss|dance|wait|count|speak|say|tell|ask|give|hold|turn|close|open|take|make|stop|start|continue|repeat|release)\b)|en\s+\p{L}+ant\b)/u.test(
        sonra
      );
    return (
      ((bilesik || /\b(?:for|pendant|durant)$/.test(once)) && devam) ||
      !sonra ||
      /^[.,;:!?…)\]»”]/.test(sonra) ||
      /^(?:before|after|then|while|without|until|avant|apres|puis|sans|prima|dopo|poi|senza|antes|despues|luego|sin|depois|sem|enquanto)\b/.test(
        sonra
      ) ||
      /\b(?:wait|attends?|attendez|aspetta|attendi|espera|espere|aguarde)$/.test(once)
    );
  }
  var re = new RegExp(
    "(?:^|[^\\p{L}\\p{N}.,+\\-])(" +
      sayi +
      ")\\s*(?:-\\s*)?(" +
      sn +
      "|" +
      dk +
      ")(?![\\p{L}\\p{N}])",
    "gu"
  );
  var dakika = new RegExp("^(?:" + dk + ")$", "u");
  // Only adjacent minute + second components form one duration, never a later task.
  var saniyeEki = new RegExp(
    "^\\s*(?:(?:,\\s*)?(?:ve|and|und|et|e|y|и|και)\\s+|,\\s*)?(" +
      sayi +
      ")\\s*(?:-\\s*)?(" +
      sn +
      ")(?![\\p{L}\\p{N}])",
    "u"
  );
  var m;
  while ((m = re.exec(metin))) {
    var son = m.index + m[0].length,
      sonra = metin.slice(son);
    if (!zamanMi(m[1], m[2], metin.slice(0, m.index), sonra)) continue;
    var v = miktar(m[1]);
    if (!Number.isFinite(v) || v <= 0) continue;
    if (!dakika.test(m[2])) return Math.round(v);
    var toplam = v * 60,
      ek = saniyeEki.exec(sonra);
    if (ek && zamanMi(ek[1], ek[2], metin.slice(0, son), sonra.slice(ek[0].length), true)) {
      var ekDeger = miktar(ek[1]);
      if (Number.isFinite(ekDeger) && ekDeger >= 0) toplam += ekDeger;
    }
    return Math.round(toplam);
  }
  // Japanese/Chinese compounds have no required spaces; full-width digits normalize above.
  var cjkSayi = "\\d+(?:[.,]\\d+)?|[一二两兩三四五六七八九十百]+";
  function cjkMiktar(v) {
    var n = Number(v.replace(",", "."));
    if (Number.isFinite(n)) return n;
    var digits = { 一: 1, 二: 2, 两: 2, 兩: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 },
      sum = 0,
      last = 0;
    for (var c of v) {
      if (c === "十" || c === "百") {
        sum += (last || 1) * (c === "十" ? 10 : 100);
        last = 0;
      } else last = digits[c];
    }
    return sum + last;
  }
  m = new RegExp(
    "(?:^|[^\\d.,+\\-])(" + cjkSayi + ")\\s*(秒(?:钟|鐘|間)?|分(?:钟|鐘|間)?)",
    "u"
  ).exec(metin);
  if (m) {
    var n = cjkMiktar(m[1]);
    if (!Number.isFinite(n) || n <= 0) return 0;
    if (m[2].charAt(0) !== "分") return Math.round(n);
    var cjkEk = new RegExp("^\\s*(?:[と和又]\\s*)?(" + cjkSayi + ")\\s*秒(?:钟|鐘|間)?", "u").exec(
      metin.slice(m.index + m[0].length)
    );
    var saniye = cjkEk ? cjkMiktar(cjkEk[1]) : 0;
    return Math.round(n * 60 + (Number.isFinite(saniye) && saniye >= 0 ? saniye : 0));
  }
  return 0;
}
/*END*/
(function () {
  var d = document;
  function el(i) {
    return d.getElementById(i);
  }
  function yukle(k) {
    try {
      var x = JSON.parse(localStorage.getItem(k));
      return Array.isArray(x)
        ? x.filter(function (s) {
            return typeof s === "string";
          })
        : [];
    } catch (e) {
      return [];
    }
  }
  function kaydet(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  }
  var KENDI = yukle("kartOyunKendi"),
    GIZLI = yukle("kartOyunGizliV2"),
    gk = "menu",
    sk = "kendi",
    tId = 0,
    tSn = 0;
  var kartKayitlari = [],
    kartEsleri = Object.create(null),
    gizliHazir = false;
  Object.keys(GOREVLER).forEach(function (m) {
    GOREVLER[m].forEach(function (g, i) {
      kartKayitlari.push({ id: "hazir:" + g[1], mod: m, index: i, tr: g[1] });
    });
  });
  function kartKimlikleri(t) {
    return kartEsleri[t] || ["kendi:" + t];
  }
  function kartMetni(id) {
    for (var i = 0; i < kartKayitlari.length; i++) {
      var k = kartKayitlari[i];
      if (k.id === id) return GOREVLER[k.mod][k.index][1];
    }
    return id.indexOf("kendi:") === 0 ? id.slice(6) : id;
  }
  function gizliMi(t) {
    return gizliHazir
      ? kartKimlikleri(t).some(function (id) {
          return GIZLI.indexOf(id) >= 0;
        })
      : GIZLI.indexOf(t) >= 0;
  }
  function gizlileriHazirla() {
    function esle(t, id) {
      var a = kartEsleri[t] || (kartEsleri[t] = []);
      if (a.indexOf(id) < 0) a.push(id);
    }
    kartKayitlari.forEach(function (k) {
      esle(k.tr, k.id);
      Object.keys(window.KART_CEVIRILER || {}).forEach(function (dil) {
        var a = window.KART_CEVIRILER[dil][k.mod];
        if (a && typeof a[k.index] === "string") esle(a[k.index], k.id);
      });
    });
    // Resolve pre-update translated wording to the same Turkish stable card IDs.
    Object.keys(window.KART_ESKI_CEVIRILER || {}).forEach(function (lang) {
      window.KART_ESKI_CEVIRILER[lang].forEach(function (old) {
        var kayit = kartKayitlari.find(function (k) {
          return k.mod === old[0] && k.index === old[1];
        });
        if (kayit) esle(old[2], kayit.id);
      });
    });
    // Preserve hidden cards when correcting the Turkish text used by older stable IDs.
    var eskiMetin = "Partnerine sor: Seni en çok hangi anda özlüyorsun?";
    var yeniKimlik = "hazir:Partnerine sor: Beni en çok hangi anda özlüyorsun?";
    esle(eskiMetin, yeniKimlik);
    GIZLI = GIZLI.map(function (id) {
      return id === "hazir:" + eskiMetin ? yeniKimlik : id;
    });
    var yeniKayit = false;
    try {
      yeniKayit = localStorage.getItem("kartOyunGizliV2") !== null;
    } catch (e) {}
    if (!yeniKayit)
      GIZLI = yukle("kartOyunGizli").reduce(function (a, t) {
        return a.concat(kartKimlikleri(t));
      }, []);
    GIZLI = GIZLI.filter(function (x, i, a) {
      return a.indexOf(x) === i;
    });
    gizliHazir = true;
    kaydet("kartOyunGizliV2", GIZLI);
    ciz();
  }
  function yerlesik(t) {
    for (var m in GOREVLER) {
      if (
        GOREVLER[m].some(function (g) {
          return g[1] === t;
        })
      )
        return true;
    }
    return false;
  }
  function acikSay(m) {
    var a = 0;
    mevcutTurler(m).forEach(function (t) {
      if (MOD_TURLER[m][t.k]) a++;
    });
    if (KENDI.length && MOD_TURLER[m].kendi !== false) a++;
    return a;
  }
  function duzelt() {
    MODLAR.forEach(function (x) {
      if (acikSay(x.ad) === 0) {
        mevcutTurler(x.ad).forEach(function (t) {
          MOD_TURLER[x.ad][t.k] = true;
        });
      }
    });
    modTurleriKaydet();
  }
  function liste(m) {
    var l = (GOREVLER[m] || [])
      .filter(function (g) {
        return MOD_TURLER[m][g[0]] && !gizliMi(g[1]);
      })
      .map(function (g) {
        return g[1];
      });
    if (KENDI.length && MOD_TURLER[m].kendi !== false)
      KENDI.forEach(function (t) {
        if (!gizliMi(t) && l.indexOf(t) < 0) l.push(t);
      });
    return l;
  }
  window.gorevSayisi = function (m) {
    return liste(m).length;
  };
  window.yeniDeste = function () {
    desteyiHazirla(liste(mod));
  };
  var my = window.modTurleriYukle;
  window.modTurleriYukle = function () {
    my();
    var k = {};
    try {
      k = JSON.parse(localStorage.getItem("kartOyunModTurler")) || {};
    } catch (e) {}
    MODLAR.forEach(function (m) {
      MOD_TURLER[m.ad].kendi = !(k[m.ad] && k[m.ad].kendi === false);
    });
  };
  window.modTurleriYukle();
  duzelt();
  var tg = window.turGuncelle;
  window.turGuncelle = function () {
    tg();
    var b = el("tur_kendi");
    if (b) {
      var a = MOD_TURLER[mod].kendi !== false;
      b.classList.toggle("acik", a);
      if (!a) el("hepsiBtn").style.display = "block";
    }
  };
  var ts = window.turSayfasiAc;
  window.turSayfasiAc = function (ad) {
    ts(ad);
    if (KENDI.length) {
      var acikKendi = KENDI.filter(function (t) {
        return !gizliMi(t);
      }).length;
      var b = d.createElement("button"),
        i = d.createElement("span");
      b.id = "tur_kendi";
      b.className = "tur";
      i.className = "ik";
      i.textContent = "✍️";
      b.appendChild(i);
      b.appendChild(d.createTextNode("Kendi (" + acikKendi + ")"));
      b.onclick = function () {
        turDegis("kendi");
      };
      el("turGrid").appendChild(b);
    }
    turGuncelle();
  };
  window.turDegis = function (k) {
    var s = k === "kendi" ? MOD_TURLER[mod].kendi !== false : MOD_TURLER[mod][k];
    if (s && acikSay(mod) === 1) {
      el("uyari").textContent = "En az bir tür açık kalmalı.";
      return;
    }
    MOD_TURLER[mod][k] = !s;
    el("uyari").textContent = "";
    modTurleriKaydet();
    turGuncelle();
  };
  var ha = window.hepsiniAc;
  window.hepsiniAc = function () {
    MOD_TURLER[mod].kendi = true;
    ha();
  };
  /* Kartlarım ekranı */
  var st = d.createElement("style");
  st.textContent =
    ".sekmeler{display:flex;gap:6px;width:100%;max-width:340px}.sek{flex:1;width:auto;max-width:none;padding:12px 4px;font-size:.85rem;background:#2d2040;opacity:.6}.sek.acik{background:#7c3aed;opacity:1}.kitem{display:flex;gap:8px;align-items:center;justify-content:space-between;text-align:left;width:100%;max-width:340px;padding:10px 12px;border-radius:12px;background:#241836;border:1px solid #4b3a6e;font-size:.9rem}.kitem button{width:auto;flex:none;padding:8px 12px;font-size:.85rem;background:#3b2a5c}#kartListe{display:flex;flex-direction:column;gap:8px;width:100%;align-items:center}#kendiInp{width:100%;padding:14px;border-radius:12px;border:1px solid #4b3a6e;background:#2d2040;color:#fff;font-size:16px;font-family:inherit}.sure{background:#0f766e}.sure.bitti{background:#b45309}";
  d.head.appendChild(st);
  var ks = d.createElement("div");
  ks.id = "kartlar";
  ks.className = "ekran";
  ks.innerHTML =
    '<h2>🃏 Kartlarım</h2><div class="sekmeler"><button id="sekK" class="sek"></button><button id="sekG" class="sek"></button></div><div id="paneK" style="width:100%;max-width:340px;display:flex;flex-direction:column;gap:8px"><input id="kendiInp" maxlength="140" placeholder="Kendi görev kartını yaz" autocomplete="off"><p class="bilgi">İpucu: “Partnerine …” yazarsan oyun partnerin adını kendisi koyar.</p><button id="ekleKBtn">＋ Kart Ekle</button></div><p id="kartUyari" class="bilgi uyari"></p><div id="kartListe"></div><button id="geriAcBtn" class="ikincil kucuk">Hepsini geri aç</button><button id="kGeriBtn" class="ikincil">← Geri</button>';
  d.body.appendChild(ks);
  function ciz() {
    el("sekK").textContent = "✍️ Kendi (" + KENDI.length + ")";
    el("sekG").textContent = "🚫 Gizlenen (" + GIZLI.length + ")";
    el("sekK").classList.toggle("acik", sk === "kendi");
    el("sekG").classList.toggle("acik", sk === "gizli");
    el("paneK").style.display = sk === "kendi" ? "flex" : "none";
    el("geriAcBtn").style.display = sk === "gizli" && GIZLI.length ? "block" : "none";
    var L = el("kartListe"),
      A = sk === "kendi" ? KENDI : GIZLI;
    L.innerHTML = "";
    if (!A.length) {
      var p = d.createElement("p");
      p.className = "bilgi";
      p.textContent = sk === "kendi" ? "Henüz kendi kartın yok." : "Gizlenmiş kart yok.";
      L.appendChild(p);
    }
    A.forEach(function (t, i) {
      var r = d.createElement("div"),
        s = d.createElement("span"),
        b = d.createElement("button");
      r.className = "kitem";
      s.setAttribute("translate", "no");
      s.textContent = sk === "kendi" ? t : kartMetni(t);
      b.textContent = sk === "kendi" ? "✕" : "↩️ Aç";
      b.onclick = function () {
        if (sk === "kendi") {
          KENDI.splice(i, 1);
          if (!yerlesik(t))
            GIZLI = GIZLI.filter(function (x) {
              return x !== "kendi:" + t;
            });
          kaydet("kartOyunKendi", KENDI);
          kaydet("kartOyunGizliV2", GIZLI);
          duzelt();
        } else {
          GIZLI.splice(i, 1);
          kaydet("kartOyunGizliV2", GIZLI);
        }
        ciz();
      };
      r.appendChild(s);
      r.appendChild(b);
      L.appendChild(r);
    });
  }
  function ac(n) {
    gk = n;
    sk = "kendi";
    el("kartUyari").textContent = "";
    ciz();
    goster("kartlar");
  }
  el("sekK").onclick = function () {
    sk = "kendi";
    ciz();
  };
  el("sekG").onclick = function () {
    sk = "gizli";
    el("kartUyari").textContent = "";
    ciz();
  };
  el("ekleKBtn").onclick = function () {
    var inp = el("kendiInp"),
      t = inp.value.replace(/\s+/g, " ").trim(),
      u = el("kartUyari");
    if (!t) {
      u.textContent = "Önce kartı yaz.";
      return;
    }
    if (KENDI.length >= 100) {
      u.textContent = "En fazla 100 kart ekleyebilirsin.";
      return;
    }
    if (KENDI.indexOf(t) >= 0) {
      u.textContent = "Bu kart zaten var.";
      return;
    }
    KENDI.push(t);
    kaydet("kartOyunKendi", KENDI);
    inp.value = "";
    u.textContent = "Kart eklendi. Oyunda “Kendi” türünden gelir.";
    ciz();
  };
  el("geriAcBtn").onclick = function () {
    GIZLI = [];
    kaydet("kartOyunGizliV2", GIZLI);
    ciz();
  };
  el("kGeriBtn").onclick = function () {
    if (gk === "tur") turSayfasiAc(mod);
    else goster("menu");
  };
  var mb = d.createElement("button");
  mb.className = "ikincil";
  mb.textContent = "🃏 Kartlarım";
  mb.onclick = function () {
    ac("menu");
  };
  el("menu").insertBefore(mb, el("menu").getElementsByTagName("button")[0].nextSibling);
  var tb = d.createElement("button");
  tb.className = "ikincil kucuk";
  tb.textContent = "🃏 Kartlarım (kendi / gizlenen)";
  tb.onclick = function () {
    ac("tur");
  };
  el("baslaBtn").parentNode.insertBefore(tb, el("baslaBtn"));
  /* Oyun ekranı: sayaç ve gizle */
  var sb = d.createElement("button");
  sb.id = "sureBtn";
  sb.className = "sure";
  sb.style.display = "none";
  el("kart").insertAdjacentElement("afterend", sb);
  var gb = d.createElement("button");
  gb.id = "gizleBtn";
  gb.className = "ikincil kucuk";
  gb.style.display = "none";
  gb.textContent = "🚫 Bir daha gösterme";
  el("pasBtn").insertAdjacentElement("afterend", gb);
  function bic(s) {
    return s >= 60 ? Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2) : s + " sn";
  }
  var kalanMs = 0,
    bitisZamani = 0,
    sonGosterilenSn = -1;
  function sayaciDurdur() {
    clearInterval(tId);
    tId = 0;
  }
  function hazir(sn) {
    sayaciDurdur();
    tSn = sn;
    kalanMs = sn * 1000;
    sonGosterilenSn = -1;
    sb.classList.remove("bitti");
    sb.style.display = sn ? "block" : "none";
    if (sn) sb.textContent = "⏱️ " + bic(sn) + " – Başlat";
  }
  function sureDoldu() {
    sayaciDurdur();
    kalanMs = 0;
    sonGosterilenSn = 0;
    sb.textContent = "⏰ Süre doldu!";
    sb.classList.add("bitti");
  }
  function sayaciGuncelle() {
    kalanMs = Math.max(0, bitisZamani - Date.now());
    if (!kalanMs) {
      sureDoldu();
      return;
    }
    var gosterilen = Math.ceil(kalanMs / 1000);
    if (gosterilen !== sonGosterilenSn) {
      sonGosterilenSn = gosterilen;
      sb.textContent = "⏱️ " + bic(gosterilen) + " – Durdur";
    }
  }
  var gosterOnceki = window.goster;
  window.goster = function (id) {
    if (id !== "oyun") hazir(0);
    return gosterOnceki(id);
  };
  sb.onclick = function () {
    if (!tSn) return;
    if (tId) {
      kalanMs = Math.max(0, bitisZamani - Date.now());
      if (!kalanMs) {
        sureDoldu();
        return;
      }
      sayaciDurdur();
      sonGosterilenSn = -1;
      sb.textContent = "⏱️ " + bic(Math.ceil(kalanMs / 1000)) + " – Devam et";
      return;
    }
    if (!kalanMs) kalanMs = tSn * 1000;
    sonGosterilenSn = -1;
    sb.classList.remove("bitti");
    bitisZamani = Date.now() + kalanMs;
    sayaciGuncelle();
    if (kalanMs) tId = setInterval(sayaciGuncelle, 250);
  };
  var ob = window.oyunuBaslat;
  window.oyunuBaslat = function () {
    if (ob() === false) return false;
    el("cekBtn").style.display = "";
    gb.style.display = "none";
    hazir(0);
  };
  window.kartCek = function (pas, not, secimBekle) {
    if (oyunBitti) return false;
    if (sira >= deste.length) {
      oyunBitti = true;
      el("cekBtn").style.display = "none";
      el("pasBtn").style.display = "none";
      if (el("gizleBtn")) el("gizleBtn").style.display = "none";
      if (el("sureBtn")) el("sureBtn").style.display = "none";
      setTimeout(function () {
        if (typeof window.oyunuBitir === "function") window.oyunuBitir();
        else goster("ozet");
      }, 0);
      return;
    }
    var n = OYUNCULAR.length,
      m = modBul(mod),
      kart = el("kart");
    if (secimBekle) {
      // The skipped/hidden card is consumed, but the same player must choose the next type.
      hazir(0);
      ilk = true;
      sonKart = "";
      el("siraBilgi").textContent = "";
      kart.textContent = "Doğruluk mu, Cesaret mi? 👇";
      kart.classList.remove("cevir");
      el("pasBtn").style.display = "none";
      gb.style.display = "none";
      el("sayac").textContent = not || "Kart " + sira + " / " + deste.length;
      return true;
    }
    if (!pas && !ilk) {
      oyuncuIdx = (oyuncuIdx + 1) % n;
    }
    ilk = false;
    var g = deste[sira];
    sira++;
    sonKart = g;
    var pi = partnerBul(oyuncuIdx);
    window.KART_OYUNCULARI = {
      okuyan: OYUNCULAR[oyuncuIdx].ad,
      partner: OYUNCULAR[pi].ad,
      sadeceOkuyan: !!m.kural
    };
    var gs = ismeCevir(g, OYUNCULAR[pi].ad);
    if (m.kural) {
      el("siraBilgi").textContent = "Kartı okuyan: " + OYUNCULAR[oyuncuIdx].ad;
    } else {
      el("siraBilgi").textContent =
        "Sıra: " + OYUNCULAR[oyuncuIdx].ad + "  |  Partner: " + OYUNCULAR[pi].ad;
    }
    kart.classList.remove("cevir");
    void kart.offsetWidth;
    kart.textContent = gs;
    kart.classList.add("cevir");
    el("sayac").textContent = not || "Kart " + sira + " / " + deste.length;
    el("cekBtn").textContent = m.buton ? m.buton : "✅ Yaptık, Sonraki Kart";
    el("pasBtn").style.display = "block";
    gb.style.display = "block";
    hazir(sureBul(g));
  };
  gb.onclick = function () {
    var g = sonKart;
    // Never change hidden cards or the deck when the draw itself would be rejected.
    if (!g || oyunBitti || (window.reklamMolasiAktif && window.reklamMolasiAktif())) return;
    kartKimlikleri(g).forEach(function (kimlik) {
      if (GIZLI.indexOf(kimlik) < 0) GIZLI.push(kimlik);
    });
    kaydet("kartOyunGizliV2", GIZLI);
    for (var j = deste.length - 1; j >= 0; j--) {
      if (deste[j] === g) {
        deste.splice(j, 1);
        if (j < sira) sira--;
      }
    }
    kartCek(true, "Kart gizlendi. Geri açmak için Kartlarım › Gizlenen.");
  };
  ciz();
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", gizlileriHazirla);
  else gizlileriHazirla();
})();

/* Süre bitince ses ve titreşim (+ aç/kapa ayarı) */
(function () {
  var b = document.getElementById("sureBtn"),
    ctx = null,
    uyarildi = false;
  var sesAcik = true,
    titresimAcik = true;
  try {
    if (localStorage.getItem("ik_ses_v1") === "0") sesAcik = false;
    if (localStorage.getItem("ik_titresim_v1") === "0") titresimAcik = false;
  } catch (e) {}
  var menu = document.getElementById("menu");
  if (menu) {
    var satir = document.createElement("div");
    satir.style.cssText = "display:flex;gap:8px;width:100%;max-width:320px;margin:4px auto;";
    var sBtn = document.createElement("button");
    sBtn.id = "ikSesBtn";
    sBtn.type = "button";
    sBtn.className = "ikincil kucuk";
    sBtn.style.cssText = "flex:1;margin:0;";
    var tBtn = document.createElement("button");
    tBtn.id = "ikTitresimBtn";
    tBtn.type = "button";
    tBtn.className = "ikincil kucuk";
    tBtn.style.cssText = "flex:1;margin:0;";
    function guncelle() {
      sBtn.textContent = sesAcik ? "🔊 Ses: Açık" : "🔇 Ses: Kapalı";
      tBtn.textContent = titresimAcik ? "📳 Titreşim: Açık" : "📴 Titreşim: Kapalı";
    }
    sBtn.addEventListener("click", function () {
      sesAcik = !sesAcik;
      try { localStorage.setItem("ik_ses_v1", sesAcik ? "1" : "0"); } catch (e) {}
      guncelle();
    });
    tBtn.addEventListener("click", function () {
      titresimAcik = !titresimAcik;
      try { localStorage.setItem("ik_titresim_v1", titresimAcik ? "1" : "0"); } catch (e) {}
      guncelle();
    });
    guncelle();
    satir.appendChild(sBtn);
    satir.appendChild(tBtn);
    var gizBtn = document.getElementById("gizlilikPolitikasi");
    if (gizBtn && gizBtn.parentNode === menu) menu.insertBefore(satir, gizBtn);
    else menu.appendChild(satir);
  }
  if (!b) return;
  function hazirla() {
    if (!sesAcik) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC && !ctx) ctx = new AC();
      if (ctx && ctx.state === "suspended") ctx.resume();
    } catch (e) {}
  }
  function nota(f, t0, sure) {
    if (!ctx || !sesAcik) return;
    try {
      var o = ctx.createOscillator(),
        g = ctx.createGain(),
        t = ctx.currentTime + t0;
      o.type = "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.3, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + sure);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t);
      o.stop(t + sure + 0.05);
    } catch (e) {}
  }
  function bitti() {
    if (sesAcik) {
      nota(880, 0, 0.15);
      nota(1175, 0.2, 0.3);
    }
    if (titresimAcik) {
      try {
        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200]);
        }
      } catch (e) {}
    }
  }
  b.addEventListener("click", hazirla);
  // Watch the state class, not the visible text, so every interface language triggers once.
  new MutationObserver(function () {
    var doldu = b.classList.contains("bitti");
    if (doldu && !uyarildi) {
      uyarildi = true;
      bitti();
    } else if (!doldu) {
      uyarildi = false;
    }
  }).observe(b, { attributes: true, attributeFilter: ["class"] });
})();

/* Tür renkleri ve oyun özeti */
(function () {
  var d = document;
  function el(i) {
    return d.getElementById(i);
  }
  var RENK = TUR_RENKLERI;
  function turBilgi(k) {
    if (k === "kendi") return { e: "✍️", ad: "Kendi kartın" };
    for (var i = 0; i < TUR_LISTESI.length; i++) {
      if (TUR_LISTESI[i].k === k) return TUR_LISTESI[i];
    }
    return { e: "🎴", ad: "" };
  }
  function turBul(t) {
    var l = GOREVLER[mod] || [];
    for (var i = 0; i < l.length; i++) {
      if (l[i][1] === t) return l[i][0];
    }
    return "kendi";
  }
  var kart = el("kart"),
    tl = d.createElement("div");
  tl.id = "turEtiket";
  tl.style.cssText = "display:none;font-size:.85rem;font-weight:700";
  kart.insertAdjacentElement("beforebegin", tl);
  function renkSifirla() {
    kart.style.borderColor = "";
    kart.style.boxShadow = "";
    tl.style.display = "none";
  }
  function renkUygula(k) {
    var r = RENK[k] || "#7c3aed",
      b = turBilgi(k);
    kart.style.borderColor = r;
    kart.style.boxShadow = "0 0 18px " + r + "55";
    tl.style.color = r;
    tl.textContent = b.e + " " + b.ad;
    tl.style.display = "block";
  }
  var bas = 0,
    tam = 0,
    pasS = 0,
    giz = 0,
    turSay = Object.create(null),
    oyTam = Object.create(null),
    sonTur = "";
  function sifirla() {
    bas = Date.now();
    tam = 0;
    pasS = 0;
    giz = 0;
    turSay = Object.create(null);
    oyTam = Object.create(null);
    sonTur = "";
  }
  var ob = window.oyunuBaslat;
  window.oyunuBaslat = function () {
    if (ob() === false) return false;
    sifirla();
    renkSifirla();
  };
  var ek = window.kartCek;
  window.kartCek = function (pas, not, secimBekle) {
    if (oyunBitti) return false;
    var ilkMi = ilk,
      onceki = OYUNCULAR[oyuncuIdx] ? OYUNCULAR[oyuncuIdx].ad : "",
      oncekiTur = sonTur;
    var sonuc = ek(pas, not, secimBekle);
    if (sonuc === false) return false;
    if (!pas) {
      if (!ilkMi) {
        tam++;
        if (oncekiTur) {
          turSay[oncekiTur] = (turSay[oncekiTur] || 0) + 1;
        }
        oyTam[onceki] = (oyTam[onceki] || 0) + 1;
      }
    } else if (not) {
      giz++;
    } else {
      pasS++;
    }
    if (oyunBitti || secimBekle) {
      renkSifirla();
      sonTur = "";
    } else {
      sonTur = turBul(sonKart);
      renkUygula(sonTur);
    }
    return sonuc;
  };
  /* Oyun özeti */
  var oz = d.createElement("div");
  oz.id = "ozet";
  oz.className = "ekran";
  oz.innerHTML =
    '<h2>🎉 Oyun Özeti</h2><p id="ozetMod" class="bilgi"></p><div id="ozetIcerik" style="display:flex;flex-direction:column;gap:8px;width:100%;max-width:340px"></div><p id="ozetNot" class="bilgi"></p><button id="ozTekrar">🔁 Yeniden oyna</button><button id="ozMod" class="ikincil">Mod değiştir</button><button id="ozMenu" class="ikincil">Ana menü</button>';
  d.body.appendChild(oz);
  function satir(a, b) {
    var r = d.createElement("div"),
      x = d.createElement("span"),
      y = d.createElement("strong");
    r.className = "kitem";
    if (a.indexOf("👤 ") === 0) x.setAttribute("translate", "no");
    x.textContent = a;
    y.textContent = b;
    r.appendChild(x);
    r.appendChild(y);
    el("ozetIcerik").appendChild(r);
  }
  function ozetAc() {
    oyunBitti = true;
    el("ozetIcerik").innerHTML = "";
    var m = modBul(mod);
    el("ozetMod").textContent = m.ikon + " " + m.ad;
    satir("🕒 Süre", Math.max(1, Math.round((Date.now() - bas) / 60000)) + " dk");
    satir("✅ Tamamlanan", String(tam));
    satir("⏭️ Atlanan", String(pasS));
    satir("🚫 Gizlenen", String(giz));
    var en = "",
      say = 0;
    for (var k in turSay) {
      if (turSay[k] > say) {
        say = turSay[k];
        en = k;
      }
    }
    if (en) {
      var b = turBilgi(en);
      satir("🏆 En çok gelen tür", b.e + " " + b.ad + " (" + say + ")");
    }
    OYUNCULAR.forEach(function (o) {
      satir("👤 " + o.ad, (oyTam[o.ad] || 0) + " kart");
    });
    el("ozetNot").textContent = tam
      ? "Güzel oyundu! Bir sonraki oyunda görüşürüz 💜"
      : "Henüz hiç kart tamamlanmadı. “Yaptık” dediğin kartlar burada sayılır.";
    goster("ozet");
  }
  window.oyunuBitir = ozetAc;
  var bt = d.createElement("button");
  bt.className = "ikincil kucuk";
  bt.textContent = "🏁 Oyunu bitir";
  bt.onclick = function () {
    if (window.reklamMolasiAktif && window.reklamMolasiAktif()) return;
    ozetAc();
  };
  el("gizleBtn").insertAdjacentElement("afterend", bt);
  el("ozTekrar").onclick = function () {
    oyunuBaslat();
  };
  el("ozMod").onclick = function () {
    goster("modlar");
  };
  el("ozMenu").onclick = function () {
    goster("menu");
  };
})();
