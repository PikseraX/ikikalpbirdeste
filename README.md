# İki Kalp Bir Deste

Oyunun düzenlenecek kaynakları `www/` klasöründedir. Tarayıcıda `www/index.html` açılır; kökteki `index.html` bu sayfaya yönlendirir. Android Studio projesi `android/` klasörüdür.

## Dosya düzeni

| Dosya / klasör | Sorumluluk |
| --- | --- |
| `www/index.html` | Ekranların HTML yapısı ve dosyaların yüklenme sırası |
| `www/oyun/veriler.js` | Modlar, görev türleri ve ortak tür renkleri |
| `www/oyun/akis.js` | Oyuncular, kategori seçimi, deste hazırlama, kart çekme ve geri bildirim |
| `www/oyun/android-geri.js` | Android geri tuşu ve reklam sırasındaki gezinme koruması |
| `www/oyun/temel.css` | Ekran, düğme ve form alanlarının temel yerleşimi |
| `www/tema.css`, `www/gorunum.js` | Temalar, avatarlar, başlık, kart görünümü ve alt düğme çubuğu |
| `www/ozellikler.js` | Özel/gizli kartlar, süre algılama, sayaçlar ve oyun özeti |
| `www/kartlar/` | Türkçe kartlar ve Doğruluk/Cesaret akışı |
| `www/dil-kartlar-*.js` | Diğer dillerin kart çevirileri |
| `www/dil.js` | Arayüz çevirileri, dil seçimi ve partner adı şablonları |
| `www/satinalma.js` | Google Play ürünleri, sahiplik kontrolü, onay ve geri yükleme |
| `www/reklam.js` | Reklam gizlilik onayı, banner ve geçiş reklamı |
| `www/sw.js` | Tarayıcı servis çalışanının yaşam döngüsü |
| `tests/` | Oyun, dil, yerleşim, reklam ve satın alma testleri |
| `docs/son-kontrol.md` | Son doğrulama sonucu ve yükleme paketi bilgileri |
| `gizlilik.html` | Gizlilik politikası |

JavaScript dosyaları klasik betik olarak sırayla yüklenir. `oyun/veriler.js` kartlardan önce, `oyun/akis.js` kartlardan sonra çalışır. Özellik, görünüm, dil, satın alma ve reklam katmanlarının sırası `index.html` içinde korunmalıdır.

Hazır ve özel kartlar aynı `desteyiHazirla` işlevini kullanır. Ortak renkler `TUR_RENKLERI` içindedir. Biçimlendirme iki boşlukla yapılır; tek satıra sıkıştırılmış işlevler yerine okunur bloklar kullanılır.

## Android dosyalarını güncelleme

Web kaynaklarını düzenledikten sonra proje kökünde:

```powershell
npm ci
npx cap sync android
```

`android/app/src/main/assets/public/` kaynakların Android'e paketlenen kopyasıdır ve Capacitor tarafından oluşturulur. `node_modules/` Android projesinin kullandığı eklentileri de içerir. Temiz bir proje klasöründe Android Studio ile derleme yapmadan önce yukarıdaki iki komutu çalıştırın.

AAB çıktıları `android/app/release/` altındadır. Web kaynağını değiştirmek mevcut AAB dosyasını otomatik güncellemez; kaynaklar eşitlendikten sonra yayın paketi yeniden derlenip imzalanır.

## Expo EAS üzerinden Android çıktısı

EAS Build mevcut Capacitor Android projesini derler. Bağımlılıkların kurulumundan sonra `www/` dosyaları Android projesine kopyalanır ve Capacitor eklentileri eşitlenir.

```powershell
eas build --platform android --profile preview
eas build --platform android --profile production
```

`preview` cihazda denemek için debug APK üretir. `production` Google Play için AAB üretir ve bu bilgisayardaki `credentials.json` üzerinden mevcut yükleme anahtarını kullanır. EAS CLI imzalama bilgilerini derleme için ayrı olarak iletir. Bu dosyalar proje arşivine dahil edilmez.

## Expo EAS üzerinden App Store çıktısı

iOS projesi `ios/App/App.xcodeproj` altında yer alır. EAS, Swift Package Manager kullanan `App` şemasını Xcode ile derler ve `www/` dosyalarını Capacitor ile pakete ekler.

```powershell
eas build --platform ios --profile production
```

İlk imzalı IPA için EAS'te Apple Developer takımını seçin ve `pikserax.ikikalpbirdeste` için dağıtım sertifikasını ve App Store provisioning profilini yapılandırın. iOS sürüm numarası `1.0.12`, ilk derleme numarası `1` olarak Xcode projesinde tutulur.

iOS sürümü reklamsızdır. App Store Connect'te `tum_modlar` ürününü tüketilemeyen uygulama içi satın alma olarak oluşturun ve ilk iOS sürümüyle birlikte incelemeye ekleyin. TestFlight'ta satın alma ve geri yükleme akışını doğrulayın. App Store Connect'e `www/gizlilik.html` sayfasının herkese açık HTTPS adresini girin. Gizlilik politikası iOS ana menüsünden de erişilebilir.

## Doğrulama

`npm test` aşağıdaki yedi testi sırayla çalıştırır. Gerçek ödeme veya reklam isteği gönderilmez; native servisler kontrollü taklitlerle sınanır.

| Test | Kapsam |
| --- | --- |
| `tests/regression.cjs` | 12 dil, 10 mod, 306 kart/dil, partner isimleri, küçük ekranlar, reklam ve satın alma |
| `tests/audit-regression.cjs` | Süreler, iade sonrası erişim, oyun sonu, uzun isimler, gizli kartlar |
| `tests/four-fixes.cjs` | Sahiplik sorgusu tekrarı, reklam molasında geri, sıra/süre ayrımı, iki satırlı başlık |
| `tests/november-fixes.cjs` | Birleşik dakika/saniye, üç tema, hitaplar ve eski gizli kart kayıtları |
| `tests/purchase-summary-fixes.cjs` | Ödeme sonrası toparlanma, deneme sınırı ve oyun özetinde geri tuşu |
| `tests/purchase-offers.cjs` | Teklif/fiyat eşleşmesi, geçersiz teklif ve kuyrukta fiyat değişimi |
| `tests/review-fixes-nov18.cjs` | Satın alma onayı, fiyatların toparlanması ve altı dilde özel süre ifadeleri |

Yalnızca temel reklam/satın alma testleri: `node tests/regression.cjs --native`.

Testler bu bilgisayardaki Codex Playwright paketini ve Edge'i kullanır. Temel test yardımcısı için `PLAYWRIGHT_MODULE` ve `EDGE_PATH` değişkenleri desteklenir; ek test betiklerindeki Edge yolu da farklı bilgisayarda uyarlanmalıdır.

## Kayıtlar ve uyumluluk

`KART_ESKI_CEVIRILER` eski gizli kart kayıtlarını güncel kart kimliklerine taşır; içindeki metinler tekrar oynanabilir kart olarak eklenmez. Bu veri ve yerel kayıtların anahtarları korunmalıdır.

Özel kartlarda `1 dakika 30 saniye`, `1 minute and 30 seconds` ve `1分30秒` gibi birleşik süreler desteklenir. Ayrı görev cümlelerinin süreleri birleştirilmez. Serbest metinler için en açık yazım `30 saniye` / `30 seconds` gibi rakamlı ifadelerdir.

## Satın alma ve reklam

Google Play sahiplik sorgusu veya satın alma onayı geçici hata verirse 5, 15, 30, 60 ve 120 saniyelik gecikmelerle en fazla beş tekrar yapılır. Doğrulanmış haklar korunur; onay tekrarı yeni ödeme başlatmaz. Uygulama açılışı, bağlantının geri gelmesi ve uygulamaya dönüş yeniden kontrol sağlar. Native işlemler sırayla çalışır. Google Play `ITEM_ALREADY_OWNED` yanıtı verirse aynı kuyrukta sahiplik yeniden doğrulanır; ikinci ödeme başlatılmaz. Hak yalnızca doğrulanmış satın alma kaydıyla açılır.

Fiyat yüklenemezse veya ürünlerden birinin fiyatı eksik gelirse açık mağazada sınırlı tekrar yapılır. Kısmi yanıtlar tekrar sayacını sıfırlamaz. Bağlantı, uygulamaya dönüş ve manuel geri yükleme fiyatları yenileyebilir. Kapalı mağaza otomatik fiyat sorgusu yapmaz.

Reklamlar önce sahiplik kontrolünü, sonra Google UMP gizlilik akışını bekler. `canRequestAds` olumlu olmadan reklam istenmez. Google gerekli görürse ana menüde **Gizlilik seçenekleri** açılır. Geçiş reklamlarında 15 işlem ve gösterimler arasında 5 dakika koşulları vardır.

Canlı gizlilik mesajının AdMob panelinden yayımlanması, uygulama incelemesi ve reklam sunum durumu ayrıca yönetilir.

## Temizlik öncesi yedek

[18 Kasım 2026 GitHub yedeği](https://github.com/PikseraX/ikikalpbirdeste/tree/backup/2026-11-18-before-cleanup-v1.0.11) kaynakları ve doğrulanmış 1.0.11 / kod 12 AAB dosyasını içerir.

Yedek commit: `a8c65982da5e8c5d19c1d4a1954eecd49c30af5a`.

## Sürüm notu biçimi

Kullanıcı tercihi: Bundan sonraki tüm güncellemelerde mevcut sürüm notu dosyasını Play Console’a doğrudan yapıştırılabilir çok dilli biçimde güncelle. Dil sırası: `tr-TR`, `de-DE`, `es-ES`, `fr-FR`, `it-IT`, `ja-JP`, `pt-BR`, `ru-RU`, `zh-CN`. Her dilin metnini kendi açılış/kapanış etiketi içine yaz (ör. `<tr-TR>…</tr-TR>`); ters eğik çizgi ve yer tutucu ekleme. Her dilin açıklamasını en fazla 500 karakterde tut, aynı değişiklikleri doğal ve oyuncuya yönelik ifadelerle çevir. Henüz yayımlanmamış sürümün notları yalnızca son düzeltmeyi değil, o sürümde biriken değişikliklerin genelini kapsamalı.

## Sürüm yükseltme ve yükleme takibi

19 Kasım 2026: Kullanıcı 1.0.11 / versionCode 12 sürümünü yüklediğini bildirdi. Bu sürüm yüklenmiş temel sürümdür; yükleme onayı mağazada yayımlandığı anlamına gelmez.

Bir sonraki geliştirme/yükleme sürümü 1.0.12 / versionCode 13 olarak hazırlanacak. Bu tercih kaydı sırasında Gradle sürümü veya mevcut AAB değiştirilmedi.

Kural: Kullanıcı mevcut hazırlanan sürüm için “yükledim” demeden sürüm adı ve sürüm kodunu tekrar artırma. O zamana kadar tüm düzeltmeleri aynı hazırlanan sürümde biriktir ve o sürümün çok dilli sürüm notunu güncelle. Her düzeltme, test veya AAB üretimi yeni sürüm numarası gerektirmez. Kullanıcı yüklediğini onayladığında yüklenen sürümü bu kayıtta güncelle; sonraki geliştirmede bir üst sürüme geç. Yüklenmiş sürümün notlarını sonraki sürümün değişiklikleriyle karıştırma.

Sürüm notlarını güncelleme kuralı: Her düzenlemeden sonra, yalnızca hazırlanmakta olan yeni sürümün `android/app/release/surum-notlari-v<SÜRÜM>.txt` dosyasını güncelle. Kullanıcının yüklediğini bildirdiği sürümün notlarını değiştirme. Yeni sürüm dosyası henüz yoksa ilk düzenlemede oluştur. Açıklamalar o sürümde biriken değişiklikleri kısa ve oyuncuya yönelik biçimde özetlemeli; her seferinde dokuz dilin tamamını (`tr-TR`, `de-DE`, `es-ES`, `fr-FR`, `it-IT`, `ja-JP`, `pt-BR`, `ru-RU`, `zh-CN`) birlikte güncelle. Etiket düzenini ve dil başına en fazla 500 karakter sınırını koru. Kullanıcı “yükledim” diyene kadar aynı sürüm numarasında kal. Sırf sürüm yönetimi tercihi kaydedildi diye oyuncuya yönelik yeni değişiklik notu veya AAB oluşturma.
