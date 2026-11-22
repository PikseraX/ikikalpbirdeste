/* Satın alma: mod kilidi ve reklam kaldırma. Eklenti: @capgo/native-purchases
   Ürün kimlikleri ilgili mağazada birebir aynı yazılmalı. */
(function () {
  var d = document;
  function el(i) {
    return d.getElementById(i);
  }
  var URUN_MOD = "tum_modlar",
    URUN_REKLAM = "reklam_kaldir";
  var iosMagazasi = window.Capacitor?.getPlatform?.() === "ios";
  var MAGAZA_URUNLERI = iosMagazasi ? [URUN_MOD] : [URUN_MOD, URUN_REKLAM];
  if (iosMagazasi) el("gizlilikPolitikasi").hidden = false;
  var KILITLI = ["Ok mu Nok mu", "İkisinden Birini Seç", "Doğruluk mu Cesaretlik mi"];

  var P = null;
  try {
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.NativePurchases) {
      P = window.Capacitor.Plugins.NativePurchases;
    }
  } catch (e) {}

  function oku(k) {
    try {
      return localStorage.getItem(k) === "1";
    } catch (e) {
      return false;
    }
  }
  function yaz(k, v) {
    try {
      localStorage.setItem(k, v ? "1" : "0");
    } catch (e) {}
  }
  var modAcik = oku("kartOyunModAcik"),
    reklamsiz = oku("kartOyunReklamsiz");
  // Ads wait for the first successful ownership query, including after reinstall.
  window.SatinalmaDurumu = { hazir: !P };
  var urunler = {},
    geriHedef = "menu",
    islemVar = false,
    kontrolHatasiGosteriliyor = false;
  var faturaKuyruk = Promise.resolve(),
    fiyatIslemi = null,
    durumIslemi = null;
  var fiyatBekliyor = false,
    fiyatTimer = 0,
    fiyatDeneme = 0;
  var durumTimer = 0,
    durumDeneme = 0,
    DURUM_GECIKMELERI = [5000, 15000, 30000, 60000, 120000];
  // Readiness keeps known rights intact; failed refreshes still need a bounded retry.
  var durumDogrulamaBekliyor = !!P;
  function durumuTekrarla() {
    if (
      !P ||
      !durumDogrulamaBekliyor ||
      durumTimer ||
      islemVar ||
      durumDeneme >= DURUM_GECIKMELERI.length
    )
      return;
    var gecikme = DURUM_GECIKMELERI[durumDeneme++];
    durumTimer = setTimeout(function () {
      durumTimer = 0;
      if (islemVar) {
        durumDeneme--;
        return;
      }
      durumKontrol().catch(function () {});
    }, gecikme);
  }
  function baglantidaDurumKontrol() {
    clearTimeout(durumTimer);
    durumTimer = 0;
    durumDeneme = 0;
    durumKontrol().catch(function () {});
    if (fiyatBekliyor) fiyatlariYenile();
  }
  // NativePurchases shares a BillingClient: serialize all native operations.
  function sirala(fn) {
    var task = faturaKuyruk.then(fn);
    faturaKuyruk = task.catch(function () {});
    return task;
  }
  function islemAyarla(v) {
    islemVar = v;
    if (v) {
      clearTimeout(durumTimer);
      durumTimer = 0;
      durumDeneme = 0;
    }
    magazaCiz();
    if (!v) {
      durumuTekrarla();
      fiyatiTekrarla();
    }
  }
  var KONTROL_HATA =
    "Satın alımlar kontrol edilemedi. İnternet bağlantını kontrol edip tekrar dene.";
  var BEKLEYEN_ODEME =
    iosMagazasi
      ? "Ödeme App Store onayı bekliyor. Onaylandıktan sonra satın alımlarını geri yükleyebilirsin."
      : "Ödeme beklemede. Google Play'deki ödeme adımlarını tamamla. Onaylandıktan sonra satın alımlarını geri yükleyebilirsin.";

  /* Mod listesinde kilit işareti */
  function kilitIsaretle() {
    var bs = d.querySelectorAll("#modListe button");
    for (var i = 0; i < bs.length; i++) {
      var sp = bs[i].querySelector("span span"),
        ad = sp ? sp.textContent : "";
      var eski = bs[i].querySelector(".kilit");
      if (eski) {
        eski.parentNode.removeChild(eski);
      }
      if (KILITLI.indexOf(ad) >= 0 && !modAcik) {
        var k = d.createElement("span");
        k.className = "kilit";
        k.textContent = "🔒";
        k.style.marginLeft = "auto";
        k.style.fontSize = "1.3rem";
        bs[i].appendChild(k);
      }
    }
  }
  var mc0 = window.modlariCiz;
  window.modlariCiz = function () {
    mc0();
    try {
      kilitIsaretle();
    } catch (e) {}
  };
  try {
    kilitIsaretle();
  } catch (e) {}

  /* Kilitli moda dokununca satın alma ekranı açılır */
  function modKilitli(ad) {
    return KILITLI.indexOf(ad) >= 0 && !modAcik;
  }
  function modaIzin(ad) {
    if (!modKilitli(ad)) return true;
    magazaAc("modlar", "🔒 " + ad + " modu kilitli. Açmak için aşağıdan satın alabilirsin.");
    return false;
  }
  var ts0 = window.turSayfasiAc;
  window.turSayfasiAc = function (ad) {
    if (!modaIzin(ad)) return false;
    return ts0(ad);
  };
  var ob0 = window.oyunuBaslat;
  window.oyunuBaslat = function () {
    if (!modaIzin(mod)) return false;
    return ob0();
  };

  /* Satın alma ekranı */
  var ek = d.createElement("div");
  ek.id = "magaza";
  ek.className = "ekran";
  ek.innerHTML =
    "<h2>🛒 Satın alımlar</h2>" +
    '<p id="magazaNot" class="bilgi"></p>' +
    '<div class="oyuncu"><strong>🔓 Tüm modların kilidi</strong><p class="bilgi">Ok mu Nok mu, İkisinden Birini Seç ve Doğruluk mu Cesaretlik mi modları açılır. Tek seferlik ödeme.</p><button id="btnMod"></button></div>' +
    (iosMagazasi ? "" : '<div class="oyuncu"><strong>🚫 Reklamları kaldır</strong><p class="bilgi">Tüm reklamlar kalıcı olarak kalkar: ekranın altındaki reklam ve oyun arasında çıkan tam ekran reklamlar. Tek seferlik ödeme.</p><button id="btnReklam"></button></div>') +
    '<p id="magazaMesaj" class="bilgi uyari"></p>' +
    '<button id="btnGeriYukle" class="ikincil kucuk">Satın alımlarımı geri yükle</button>' +
    '<button id="btnKapat" class="ikincil">← Geri</button>';
  d.body.appendChild(ek);

  function mesaj(t) {
    kontrolHatasiGosteriliyor = t === KONTROL_HATA;
    el("magazaMesaj").textContent = t;
  }

  function dugme(b, sahip, u, id) {
    b.onclick = function () {
      satinAl(id);
    };
    if (sahip) {
      b.textContent = "✅ Açık";
      b.disabled = true;
      b.style.opacity = ".7";
      return;
    }
    b.style.opacity = "";
    if (!P) {
      b.textContent = "Bu cihazda kullanılamıyor";
      b.disabled = true;
      return;
    }
    if (u === null) {
      b.textContent = "Şu an alınamıyor";
      b.disabled = true;
      return;
    }
    if (!u) {
      b.textContent = "Fiyat yükleniyor…";
      b.disabled = true;
      return;
    }
    b.textContent = "Satın al · " + u.priceString;
    b.disabled = islemVar;
  }
  function magazaCiz() {
    dugme(el("btnMod"), modAcik, urunler[URUN_MOD], URUN_MOD);
    if (!iosMagazasi) dugme(el("btnReklam"), reklamsiz, urunler[URUN_REKLAM], URUN_REKLAM);
    el("btnGeriYukle").disabled = !P || islemVar;
  }
  function magazaGorunuyor() {
    return el("magaza").classList.contains("aktif");
  }
  function fiyatiTekrarla() {
    if (
      !P ||
      !fiyatBekliyor ||
      fiyatTimer ||
      fiyatIslemi ||
      islemVar ||
      !magazaGorunuyor() ||
      fiyatDeneme >= DURUM_GECIKMELERI.length
    )
      return;
    fiyatTimer = setTimeout(function () {
      fiyatTimer = 0;
      if (islemVar || !magazaGorunuyor()) {
        fiyatDeneme--;
        return;
      }
      fiyatYukle();
    }, DURUM_GECIKMELERI[fiyatDeneme++]);
  }
  function fiyatlariYenile() {
    clearTimeout(fiyatTimer);
    fiyatTimer = 0;
    fiyatDeneme = 0;
    if (magazaGorunuyor()) return fiyatYukle();
  }
  function fiyatYukle() {
    if (!P) {
      magazaCiz();
      return;
    }
    if (islemVar) {
      fiyatBekliyor = true;
      return fiyatIslemi;
    }
    if (fiyatIslemi) return fiyatIslemi;
    clearTimeout(fiyatTimer);
    fiyatTimer = 0;
    fiyatIslemi = sirala(function () {
      return P.getProducts({ productIdentifiers: MAGAZA_URUNLERI, productType: "inapp" });
    })
      .then(function (r) {
        if (!r || !Array.isArray(r.products)) throw new Error("Invalid product response");
        var l = r.products;
        urunler[URUN_MOD] = null;
        urunler[URUN_REKLAM] = null;
        l.forEach(function (p) {
          // Keep the first eligible offer together with its displayed price and token.
          if (
            p &&
            MAGAZA_URUNLERI.includes(p.identifier) &&
            typeof p.priceString === "string" &&
            p.priceString.trim().length > 0 &&
            !urunler[p.identifier]
          ) {
            urunler[p.identifier] = p;
          }
        });
        // A partial response still needs a bounded retry for the missing product.
        fiyatBekliyor = MAGAZA_URUNLERI.some(function (id) { return !urunler[id]; });
        if (!fiyatBekliyor) fiyatDeneme = 0;
        magazaCiz();
      })
      .catch(function () {
        fiyatBekliyor = true;
        // A failed retry must not disable a product whose price was already loaded.
        MAGAZA_URUNLERI.forEach(function (id) {
          if (!urunler[id]) urunler[id] = null;
        });
        magazaCiz();
      })
      .finally(function () {
        fiyatIslemi = null;
        fiyatiTekrarla();
      });
    return fiyatIslemi;
  }
  function magazaAc(hedef, not) {
    geriHedef = hedef;
    el("magazaNot").textContent = not || "";
    if (!islemVar) mesaj("");
    magazaCiz();
    goster("magaza");
    fiyatlariYenile();
  }
  el("btnKapat").onclick = function () {
    goster(geriHedef);
  };

  /* StoreKit yalnızca doğrulanmış güncel hakları döndürür. */
  function gecerli(p) {
    if (!p) return false;
    if (iosMagazasi) {
      return p.productIdentifier === URUN_MOD && typeof p.transactionId === "string" &&
        p.transactionId.length > 0 && !p.revocationDate && !p.isUpgraded;
    }
    return p.purchaseState === "PURCHASED" || p.purchaseState === "1";
  }
  function uygula(m, a, onayBekliyor) {
    modAcik = m;
    reklamsiz = a;
    yaz("kartOyunModAcik", m);
    yaz("kartOyunReklamsiz", a);
    window.SatinalmaDurumu.hazir = true;
    durumDogrulamaBekliyor = onayBekliyor;
    // A successful ownership query does not complete a failed acknowledgement.
    if (!onayBekliyor) {
      clearTimeout(durumTimer);
      durumTimer = 0;
      durumDeneme = 0;
    }
    if (kontrolHatasiGosteriliyor) mesaj("");
    if (modKilitli(mod)) {
      oyunBitti = true;
      var aktif = d.querySelector(".ekran.aktif");
      if (aktif && ["oyun", "turEkran", "ozet"].indexOf(aktif.id) >= 0) goster("modlar");
    }
    try {
      if (window.modlariCiz) {
        window.modlariCiz();
      }
    } catch (e) {}
    try {
      if (a) {
        if (window.bannerKaldir) {
          window.bannerKaldir();
        }
      }
      if (window.bannerYenidenGoster) {
        window.bannerYenidenGoster();
      }
    } catch (e) {}
    try {
      magazaCiz();
    } catch (e) {}
    if (onayBekliyor) durumuTekrarla();
  }
  async function durumYenile() {
    if (!P) return;
    var r;
    try {
      var sorgu = { productType: "inapp" };
      if (iosMagazasi) sorgu.onlyCurrentEntitlements = true;
      r = await P.getPurchases(sorgu);
      if (!r || !Array.isArray(r.purchases)) throw new Error("Invalid purchase response");
    } catch (e) {
      durumDogrulamaBekliyor = true;
      throw e;
    }
    var m = false,
      a = false,
      onayBekliyor = false;
    for (var p of r.purchases) {
      if (!gecerli(p)) continue;
      if (p.productIdentifier === URUN_MOD) m = true;
      if (p.productIdentifier === URUN_REKLAM) a = true;
      if (p.isAcknowledged === false && p.purchaseToken) {
        try {
          await P.acknowledgePurchase({ purchaseToken: p.purchaseToken });
        } catch (e) {
          onayBekliyor = true;
        }
      }
    }
    uygula(m, a, onayBekliyor);
  }
  function durumKontrol() {
    if (islemVar) return Promise.resolve();
    clearTimeout(durumTimer);
    durumTimer = 0;
    if (!durumIslemi)
      durumIslemi = sirala(durumYenile)
        .catch(function (e) {
          durumuTekrarla();
          throw e;
        })
        .finally(function () {
          durumIslemi = null;
        });
    return durumIslemi;
  }
  function satinAl(id) {
    if (!P) {
      mesaj("Satın alma bu cihazda kullanılamıyor.");
      return;
    }
    if (islemVar || (id === URUN_MOD && modAcik) || (id === URUN_REKLAM && reklamsiz)) return;
    var seciliUrun = urunler[id],
      teklifYenilensin = false;
    if (!seciliUrun) return;
    var satinAlmaSecenekleri = { productIdentifier: id, productType: "inapp", quantity: 1 };
    if (typeof seciliUrun.offerToken === "string" && seciliUrun.offerToken.length) {
      satinAlmaSecenekleri.offerToken = seciliUrun.offerToken;
    }
    islemAyarla(true);
    mesaj(iosMagazasi ? "App Store açılıyor…" : "Google Play açılıyor…");
    return sirala(async function () {
      var zatenSahip = false;
      try {
        // Capture the displayed offer before waiting for earlier native operations.
        await P.purchaseProduct(satinAlmaSecenekleri);
      } catch (e) {
        if (!e || e.code !== "ITEM_ALREADY_OWNED") throw e;
        // Verify the existing purchase in this same queue; never start another payment.
        zatenSahip = true;
      }
      try {
        await durumYenile();
      } catch (e) {
        mesaj(KONTROL_HATA);
        return;
      }
      var ok = (id === URUN_MOD && modAcik) || (id === URUN_REKLAM && reklamsiz);
      var tamamMesaji = zatenSahip
        ? "Satın alımların geri yüklendi."
        : "Teşekkürler! Satın alma tamamlandı 💜";
      mesaj(
        ok
          ? tamamMesaji
          : "Satın alma işleniyor. Birkaç dakika sonra geri yükle düğmesine dokun."
      );
    })
      .catch(function (e) {
        var t = String((e && e.message) || e || ""),
          kod = String((e && e.code) || "");
        teklifYenilensin = kod === "ITEM_UNAVAILABLE" || t.indexOf("Offer token not found") >= 0;
        if (kod === "PURCHASE_PENDING" || /\bpending\b/i.test(t)) {
          mesaj(BEKLEYEN_ODEME);
        } else {
          mesaj(
            kod === "USER_CANCELED" || /cancel|iptal/i.test(t)
              ? "Satın alma iptal edildi."
              : "Satın alma tamamlanamadı. Daha sonra tekrar dene."
          );
        }
      })
      .finally(function () {
        islemAyarla(false);
        // Refresh an invalid offer, but require another click before any new payment.
        if (teklifYenilensin) fiyatlariYenile();
      });
  }
  el("btnGeriYukle").onclick = function () {
    if (!P) {
      mesaj("Satın alma bu cihazda kullanılamıyor.");
      return;
    }
    if (islemVar) return;
    islemAyarla(true);
    mesaj("Kontrol ediliyor…");
    return sirala(async function () {
      await P.restorePurchases();
      await durumYenile();
      mesaj(
        modAcik || reklamsiz
          ? "Satın alımların geri yüklendi."
          : "Geri yüklenecek bir satın alma bulunamadı."
      );
    })
      .catch(function (e) {
        var t = String((e && e.message) || e || ""),
          kod = String((e && e.code) || "");
        mesaj(
          kod === "USER_CANCELED" || /cancel|iptal/i.test(t)
            ? "Satın alma iptal edildi."
            : KONTROL_HATA
        );
      })
      .finally(function () {
        islemAyarla(false);
        if (fiyatBekliyor) fiyatlariYenile();
      });
  };

  /* Ana menüye Satın alımlar düğmesi */
  try {
    var menu = el("menu"),
      bs = menu.getElementsByTagName("button"),
      gb = null;
    for (var i = 0; i < bs.length; i++) {
      if (bs[i].textContent.indexOf("Geri bildirim") >= 0) {
        gb = bs[i];
        break;
      }
    }
    var mb = d.createElement("button");
    mb.className = "ikincil";
    mb.textContent = "🛒 Satın alımlar";
    mb.onclick = function () {
      magazaAc("menu", "");
    };
    if (gb) {
      menu.insertBefore(mb, gb.nextSibling);
    } else {
      menu.appendChild(mb);
    }
  } catch (e) {}

  /* Açılışta ve uygulamaya dönünce durumu yenile (iade olursa kilit geri gelir) */
  durumKontrol().catch(function () {});
  window.addEventListener("online", baglantidaDurumKontrol);
  try {
    var AP = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
    if (AP && AP.addListener) {
      var resumeDinle = AP.addListener("resume", baglantidaDurumKontrol);
      if (resumeDinle && resumeDinle.catch) resumeDinle.catch(function () {});
    }
    if (iosMagazasi && P && P.addListener) {
      P.addListener("transactionUpdated", baglantidaDurumKontrol).catch(function () {});
    }
  } catch (e) {}
})();
