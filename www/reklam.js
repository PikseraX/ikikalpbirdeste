(function(){
  var C = window.Capacitor;
  if(!C || !C.Plugins || !C.Plugins.AdMob){ console.info('AdMob: native plugin unavailable'); return; }
  var A = C.Plugins.AdMob;
  var TEST = false;
  var BANNER_ID = TEST ? 'ca-app-pub-3940256099942544/6300978111' : 'ca-app-pub-5635814061302700/9316614558';
  var hazir = false, gosteriliyor = false, baslatiliyor = false;
  var baslatDeneme = 0, baslatTimer = 0, bannerDeneme = 0, bannerTimer = 0, tTimer = 0;
  var tani = window.ReklamTani = {sdk:'bekliyor', banner:'bekliyor', gecis:'bekliyor', sonHata:null};
  function reklamHatasi(asama, e){
    tani.sonHata = {asama:asama, kod:e && e.code, mesaj:String((e && e.message) || e || ''), zaman:Date.now()};
    console.warn('AdMob ' + asama, JSON.stringify(tani.sonHata));
  }

  // Refresh UMP each launch. Never infer ad eligibility from our local storage.
  var izinHazir = false, izinli = false, izinFormuTamam = false, izinIslemi = null, gizlilikAcik = false, izinSurumu = 0;
  var gizlilikBtn = document.createElement('button');
  gizlilikBtn.id = 'gizlilikBtn'; gizlilikBtn.className = 'ikincil kucuk';
  gizlilikBtn.textContent = 'Gizlilik seçenekleri'; gizlilikBtn.style.display = 'none';
  var gizlilikMesaj = document.createElement('p');
  gizlilikMesaj.id = 'reklamGizlilikMesaj'; gizlilikMesaj.className = 'bilgi uyari'; gizlilikMesaj.style.display = 'none';
  document.getElementById('menu').appendChild(gizlilikBtn);
  document.getElementById('menu').appendChild(gizlilikMesaj);
  function satinAlimHazir(){ return !!window.SatinalmaDurumu && window.SatinalmaDurumu.hazir; }
  function reklamIzinli(){ return satinAlimHazir() && izinHazir && izinli && !gizlilikAcik && !reklamsizMi(); }
  function izinUygula(info){
    izinHazir = true; izinli = !!info && info.canRequestAds === true;
    tani.onay = izinli ? 'uygun' : 'bekliyor';
    gizlilikBtn.style.display = info && info.privacyOptionsRequirementStatus === 'REQUIRED' ? '' : 'none';
    if(!izinli) reklamDurdur();
  }
  function izinKontrol(){
    if(izinIslemi) return izinIslemi;
    if(izinHazir && (reklamsizMi() || izinFormuTamam)) return Promise.resolve(izinli);
    gizlilikBtn.disabled = true;
    izinIslemi = Promise.resolve().then(function(){ return A.requestConsentInfo({}); }).then(function(info){
      if(reklamsizMi()) return info;
      // The installed plugin uses loadAndShowConsentFormIfRequired internally.
      return A.showConsentForm().then(function(result){ izinFormuTamam = true; return result; });
    }).then(function(info){ izinUygula(info); return izinli; }).catch(function(e){
      izinHazir = false; izinli = false; izinFormuTamam = false; tani.onay = 'hata'; reklamDurdur();
      throw e;
    }).finally(function(){ izinIslemi = null; gizlilikBtn.disabled = gizlilikAcik; });
    return izinIslemi;
  }
  function reklamDurdur(){
    izinSurumu++;
    clearTimeout(bannerTimer); bannerTimer = 0; clearTimeout(tTimer); tTimer = 0;
    tHazir = false;
    if(!tGorundu){ clearTimeout(tMolaTimer); tMolaTimer = 0; clearTimeout(tZamanAsimi); molaKapat(); tBekliyor = false; }
    if(window.bannerKaldir) window.bannerKaldir();
  }
  gizlilikBtn.onclick = function(){
    if(gizlilikAcik || izinIslemi || tBekliyor) return;
    gizlilikAcik = true; gizlilikBtn.disabled = true;
    gizlilikMesaj.textContent = ''; gizlilikMesaj.style.display = 'none';
    izinHazir = false; izinli = false; izinFormuTamam = false; reklamDurdur();
    return Promise.resolve().then(function(){ return A.showPrivacyOptionsForm(); })
      .then(function(){ return izinKontrol(); })
      .catch(function(e){
        reklamHatasi('gizlilik', e);
        gizlilikMesaj.textContent = window.DIL ? window.DIL.cevir('Gizlilik ayarları açılamadı. Bağlantını kontrol edip tekrar dene.') : 'Gizlilik ayarları açılamadı. Bağlantını kontrol edip tekrar dene.';
        gizlilikMesaj.style.display = '';
      }).finally(function(){
        gizlilikAcik = false; gizlilikBtn.disabled = false;
        if(izinHazir) reklamBaslat();
      });
  };

  function reklamsizMi(){ try{ return localStorage.getItem('kartOyunReklamsiz') === '1'; }catch(e){ return false; } }
  A.addListener('bannerAdSizeChanged', function(s){
    var h = Math.max(0, Number(s.height) || 0) + 'px';
    document.documentElement.style.setProperty('--banner-height', h);
    var st = document.getElementById('reklamStil');
    if(!st){ st = document.createElement('style'); st.id = 'reklamStil'; document.head.appendChild(st); }
    st.textContent = '#altBar{bottom:' + h + ' !important}';
  });
  function bannerGoster(){
    if(!hazir || gosteriliyor || !reklamIzinli()){ return; }
    clearTimeout(bannerTimer); bannerTimer = 0;
    gosteriliyor = true; tani.banner = 'yukleniyor';
    try{ Promise.resolve(A.showBanner({ adId: BANNER_ID, adSize: 'ADAPTIVE_BANNER', position: 'BOTTOM_CENTER', margin: 0, isTesting: TEST })).catch(bannerHata); }
    catch(e){ bannerHata(e); }
  }
  function bannerHata(e){
    gosteriliyor = false; tani.banner = 'hata'; reklamHatasi('banner', e);
    if(!bannerTimer && reklamIzinli() && bannerDeneme < 5){
      bannerDeneme++; bannerTimer = setTimeout(function(){ bannerTimer = 0; bannerGoster(); }, 60000);
    }
  }
  reklamDinle('bannerAdFailedToLoad', bannerHata);
  reklamDinle('bannerAdLoaded', function(){
    if(!reklamIzinli()){window.bannerKaldir();return;}
    clearTimeout(bannerTimer); bannerTimer = 0; bannerDeneme = 0;
    gosteriliyor = true; tani.banner = 'yuklendi';
  });
  window.bannerYenidenGoster = bannerGoster;
  window.bannerKaldir = function(){
    clearTimeout(bannerTimer); bannerTimer = 0; clearTimeout(tTimer); tTimer = 0;
    gosteriliyor = false; tani.banner = reklamsizMi() ? 'reklamsiz' : 'kapali';
    try{ var r = A.removeBanner(); if(r && r.catch){ r.catch(function(){}); } }catch(e){}
    document.documentElement.style.setProperty('--banner-height', '0px');
    var st = document.getElementById('reklamStil');
    if(st){ st.textContent = ''; }
  };
  /* Tam ekran reklam: her 15 kartta bir (Yaptik, Pas Gec ve Gizle dahil), onunda kisa mola mesaji */
  var ARALIK = 15, MIN_ARALIK_MS = 5 * 60 * 1000, MOLA_MS = 2000, DENEME_MAX = 5;
  var INTERSTITIAL_ID = TEST ? 'ca-app-pub-3940256099942544/1033173712' : 'ca-app-pub-5635814061302700/8867612287';
  var tHazir = false, tHazirlaniyor = false, tDeneme = 0;
  var tBekliyor = false, tGorundu = false, tZamanAsimi = 0, tMolaTimer = 0, molaKapat = function(){};
  function molaIptal(){
    if(!tMolaTimer) return false;
    clearTimeout(tMolaTimer); tMolaTimer = 0;
    molaKapat(); tBekliyor = false; tGorundu = false;
    // Keep the prepared ad and count: only a native Showed event consumes them.
    return true;
  }
  window.reklamGeriTusunuIsle = function(){
    if(!tBekliyor) return false;
    molaIptal();
    // Once showInterstitial has started, the SDK handles dismissing its own screen.
    return true;
  };
  var oncekiGoster = window.goster;
  window.goster = function(id){
    if(id !== 'oyun' && id !== 'ozet') molaIptal();
    return oncekiGoster(id);
  };
  function sayacOku(){ try{ return parseInt(localStorage.getItem('kartOyunReklamSayac'), 10) || 0; }catch(e){ return 0; } }
  function sayacYaz(n){ try{ localStorage.setItem('kartOyunReklamSayac', String(n)); }catch(e){} }
  function sonReklamZamaniOku(){ try{ return parseInt(localStorage.getItem('kartOyunSonGecisReklamZamani'), 10) || 0; }catch(e){ return 0; } }
  function reklamAraligiDolduMu(){ return Date.now() - sonReklamZamaniOku() >= MIN_ARALIK_MS; }
  function sonReklamZamaniYaz(){ try{ localStorage.setItem('kartOyunSonGecisReklamZamani', String(Date.now())); }catch(e){} }
  function tHazirla(){
    if(tHazirlaniyor || tHazir || tBekliyor || !reklamIzinli() || !hazir){ return; }
    clearTimeout(tTimer); tTimer = 0;
    tHazirlaniyor = true; tani.gecis = 'yukleniyor';
    var surum = izinSurumu;
    var p;
    try{ p = A.prepareInterstitial({ adId: INTERSTITIAL_ID, isTesting: TEST }); }catch(e){ tYuklemeHata(e); return; }
    Promise.resolve(p).then(function(){
      tHazirlaniyor = false;
      if(surum !== izinSurumu || !reklamIzinli()){tHazir = false; if(reklamIzinli())tHazirla(); return;}
      tHazir = true; tDeneme = 0; tani.gecis = 'hazir';
    }).catch(tYuklemeHata);
  }
  function tYuklemeHata(e){
    tHazir = false; tHazirlaniyor = false; tani.gecis = 'hata'; reklamHatasi('gecis-yukleme', e);
    if(!tTimer && reklamIzinli() && tDeneme < DENEME_MAX){
      tDeneme++; tTimer = setTimeout(function(){ tTimer = 0; tHazirla(); }, 60000);
    }
  }
  function tSonlandir(){
    clearTimeout(tMolaTimer); tMolaTimer = 0;
    clearTimeout(tZamanAsimi);
    molaKapat(); tBekliyor = false; tHazir = false;
    setTimeout(tHazirla, 1000);
  }
  function reklamDinle(ad, fn){
    try{ var p = A.addListener(ad, fn); if(p && p.catch) p.catch(function(){}); }catch(e){}
  }
  reklamDinle('interstitialAdShowed', function(){
    if(!tBekliyor || tGorundu) return;
    tGorundu = true; clearTimeout(tZamanAsimi);
    sayacYaz(0); sonReklamZamaniYaz(); molaKapat();
  });
  reklamDinle('interstitialAdDismissed', tSonlandir);
  reklamDinle('interstitialAdFailedToShow', tSonlandir);
  function molaEkrani(){
    var o = document.createElement('div');
    o.style.cssText = 'position:fixed;left:0;top:0;right:0;bottom:0;z-index:1000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:var(--bg,#1a1025);color:#fff;text-align:center;padding:24px';
    var ikon=document.createElement('div');ikon.style.fontSize='3.2rem';ikon.textContent='💜';
    var baslik=document.createElement('div');baslik.style.cssText='font-size:1.6rem;font-weight:700';baslik.textContent=window.DIL?window.DIL.cevir('Kısa bir mola'):'Kısa bir mola';
    var aciklama=document.createElement('div');aciklama.style.cssText='font-size:.95rem;opacity:.75';aciklama.textContent=window.DIL?window.DIL.cevir('Birazdan kaldığımız yerden devam ediyoruz'):'Birazdan kaldığımız yerden devam ediyoruz';
    o.appendChild(ikon);o.appendChild(baslik);o.appendChild(aciklama);
    document.body.appendChild(o);
    return o;
  }
  function tGoster(){
    if(tBekliyor || !reklamIzinli()) return;
    tBekliyor = true; tGorundu = false;
    var o = molaEkrani();
    molaKapat = function(){ if(o.parentNode) o.parentNode.removeChild(o); };
    tMolaTimer = setTimeout(function(){
      tMolaTimer = 0;
      if(!reklamIzinli() || !tHazir){ tSonlandir(); return; }
      tHazir = false;
      // Only the native Showed event consumes the count and starts the cooldown.
      tZamanAsimi = setTimeout(tSonlandir, 15000);
      try{ Promise.resolve(A.showInterstitial()).catch(tSonlandir); }
      catch(e){ tSonlandir(); }
    }, MOLA_MS);
  }
  var kc0 = window.kartCek;
  window.kartCek = function(pas, not, secimBekle){
    if(tBekliyor) return false;
    var bittiMi = typeof oyunBitti !== 'undefined' && oyunBitti;
    var ilkMi = (typeof ilk !== 'undefined') ? ilk : false;
    var r = kc0(pas, not, secimBekle);
    if(r === false) return false;
    try{
      if(!bittiMi && !ilkMi && !reklamsizMi()){
        var n = sayacOku() + 1;
        sayacYaz(n);
        if(n >= ARALIK && tHazir && reklamIzinli() && reklamAraligiDolduMu()){ tGoster(); }
      }
    }catch(e){}
    return r;
  };
  function baslatHata(e){
    baslatiliyor = false; hazir = false; tani.sdk = 'hata'; reklamHatasi('baslatma', e);
    if(!baslatTimer && baslatDeneme < DENEME_MAX){
      baslatDeneme++; baslatTimer = setTimeout(function(){ baslatTimer = 0; reklamBaslat(); }, 60000);
    }
  }
  function reklamBaslat(){
    if(!satinAlimHazir()){tani.sdk = 'satin-alim-bekliyor';return;}
    if(baslatiliyor || gizlilikAcik) return;
    clearTimeout(baslatTimer); baslatTimer = 0; baslatiliyor = true;
    izinKontrol().then(function(){
      if(!reklamIzinli()){baslatiliyor=false;tani.sdk=reklamsizMi()?'reklamsiz':'onay-bekliyor';return;}
      if(hazir){baslatiliyor=false;bannerGoster();tHazirla();return;}
      tani.sdk='baslatiliyor';
      return A.initialize({}).then(function(){
        baslatiliyor=false;hazir=true;baslatDeneme=0;tani.sdk='hazir';
        bannerGoster();tHazirla();
      });
    }).catch(baslatHata);
  }
  function baglantiYenilendi(){
    baslatDeneme = 0; bannerDeneme = 0; tDeneme = 0; reklamBaslat();
  }
  window.bannerYenidenGoster = reklamBaslat;
  window.addEventListener('online', baglantiYenilendi);
  if(C.Plugins.App){
    try{ var ap = C.Plugins.App.addListener('resume', baglantiYenilendi); if(ap && ap.catch) ap.catch(function(){}); }catch(e){}
  }
  reklamBaslat();
})();
