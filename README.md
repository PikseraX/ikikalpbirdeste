# İki Kalp Bir Deste

Oyun kaynakları www/ klasöründedir. Dil çevirilerini, kartları, tasarımı ve oyun kodunu burada düzenleyin.

- Tarayıcıda açmak için www/index.html dosyasını kullanın. Kökteki index.html bu sayfaya yönlendirir.
- Android Studio projesi android/ klasöründedir.
- Web dosyaları değiştikten sonra proje kökünde npx cap sync android çalıştırın.
- android/app/src/main/assets/public/, Android uygulamasına paketlenen web kopyasıdır. Capacitor tarafından oluşturulur.
- node_modules/, Android projesinin de kullandığı Capacitor eklentilerini içerir.
- Kökteki gizlilik.html, gizlilik politikası sayfasıdır.

## Doğrulama

- `npm test`: 12 dilde 10 oyun modu, küçük ekran yerleşimi, özel kartlar ve kontrollü reklam/satın alma senaryolarını test eder. Geciken satın alma kontrolü, iade sonrası yeniden oynama, kart türünün tükenmesi, 12 dilde özel kart sayaçları, uzun isimler, azaltılmış hareket tercihi ve gizlenen kartların geri açılması da sınanır. Gerçek reklam isteği veya ödeme yapılmaz.
- Testler bu bilgisayardaki Codex Playwright paketini ve Edge'i kullanır. Başka bilgisayarlarda `PLAYWRIGHT_MODULE` ve `EDGE_PATH` ortam değişkenleriyle yolları belirtebilirsiniz.
- Yalnızca reklam/satın alma senaryoları: `node tests/regression.cjs --native` (native eklentiler simüle edilir).

`node tests/four-fixes.cjs`, başlangıç sorgusunun otomatik tekrarlanmasını, reklam molasında geri tuşunu, özel kartlardaki sıra/süre ayrımını ve 12 dilde iki satırlı başlığı denetler. Özel kartlarda karmaşık cümleler için süreyi `30 saniye` / `30 seconds` gibi rakamla yazmak en açık biçimdir.

`node tests/november-fixes.cjs`, 12 dilde birleşik dakika/saniye sürelerini, tema arka planlarını, cinsiyetten bağımsız kart hitaplarını ve eski çevirilerle kaydedilmiş 88 gizli kart tercihinin korunmasını denetler. Örneğin `1 dakika 30 saniye`, `1 minute and 30 seconds` ve `1分30秒` 90 saniyelik sayaç açar. Ayrı görev cümlelerindeki süreler birleştirilmez.

Dil paketlerindeki `KART_ESKI_CEVIRILER` yalnızca eski gizleme kayıtlarını güncel kart kimliklerine taşımak içindir; bu metinler oyun destesine eklenmez.

## Reklam gizlilik akışı

Reklam kodu `www/reklam.js` içindedir. Açılışta önce Google Play satın alma durumu doğrulanır. İlk kontrol başarısız olursa reklam başlatılmaz. Kontrol 5, 15, 30, 60 ve 120 saniyelik gecikmelerle en fazla beş kez otomatik tekrarlanır; başarıyla tamamlanınca bekleyen denemeler iptal edilir. Bağlantı geri geldiğinde veya uygulamaya dönüldüğünde yeniden kontrol edilir. Ardından Google UMP onay bilgisi yenilenir, gerekiyorsa form gösterilir ve `canRequestAds` olumlu olmadan reklam istenmez. Google gerekli gördüğünde ana menüde **Gizlilik seçenekleri** görünür.

Canlı form için AdMob > Gizlilik ve mesajlaşma bölümünde ilgili uygulamaya bağlı mesajın oluşturulup yayımlanmış olması gerekir. Bu panel ayarı kod değişikliğiyle otomatik yapılmaz. Uygulamanın AdMob incelemesi ve reklam sunum durumu ayrıca tamamlanmalıdır.

Bu kaynak değişiklikleri eski sürümlerin AAB dosyalarını değiştirmez. Yeni yayın paketi gerektiğinde sürüm kodu artırılıp yeniden oluşturulmalıdır.


`node tests/purchase-summary-fixes.cjs`, ödeme sonrası sahiplik sorgusunun otomatik toparlanmasını, deneme sınırını, işlem sıralamasını ve 12 dilde oyun özetinden Android geri tuşuyla ana menüye dönülmesini denetler.

Ödeme sonrası sahiplik sorgusu veya Google Play satın alma onayı (`acknowledgePurchase`) geçici hata verirse 5, 15, 30, 60 ve 120 saniyelik gecikmelerle en fazla beş yeniden deneme yapılır. Başarılı sahiplik sorgusu, başarısız onayın deneme sayacını sıfırlamaz. Doğrulanmış haklar onay hatası yüzünden silinmez; onay tekrarı yeni ödeme başlatmaz. Uygulama yeniden açıldığında Google Play kayıtlarından onaysız satın alımlar tekrar kontrol edilir. Başarılı doğrulama ve onay, bekleyen denemeleri durdurur.


`node tests/review-fixes-nov18.cjs`, iki ürünün satın alma onayını, hakların korunmasını, sınırlı yeniden denemeyi, uygulamanın yeniden açılmasını ve açık mağazanın bağlantı sonrasında toparlanmasını denetler. Ayrıca Çince (iki yazı sistemi), Almanca, Yunanca, İngilizce ve Fransızca özel kartlardaki yeni süre biçimleri ile 1, 20 ve 30 saniyelik sayaçlar sınanır.

Fiyat sorgusu geçici hata verirse mağaza açıkken aynı sınırlı gecikmelerle yeniden denenir. Bağlantı geri geldiğinde, uygulamaya dönüldüğünde veya “Satın alımlarımı geri yükle” kullanıldığında başarısız fiyat sorgusu yenilenir. Mağaza kapalıyken otomatik fiyat sorgusu yapılmaz; çakışan istekler birleştirilir ve native satın alma işlemleri sırayla çalışır.
