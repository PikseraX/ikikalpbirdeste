18 Kasım 2026 — İki Kalp Bir Deste sadeleştirme sonrası kontrol

Sürüm: 1.0.11 / kod 12. Bu çalışma kod temizliği ve dosya düzeni içindir.

Temizlik öncesi GitHub yedeği:
- https://github.com/PikseraX/ikikalpbirdeste/tree/backup/2026-11-18-before-cleanup-v1.0.11
- Commit: a8c65982da5e8c5d19c1d4a1954eecd49c30af5a
- 128 dosya, güncel kaynaklar ve önceki imzalı AAB dahil, dosya içerikleri birebir doğrulanarak kaydedildi.
- GitHub ana dalı değiştirilmedi; yedek ayrı dalda tutuluyor.

Yapılan temizlik:
- index.html içindeki temel CSS, oyun verileri, oyun akışı ve Android geri tuşu kodu www/oyun/ klasöründeki dört dosyaya ayrıldı. Betiklerin ve stillerin yüklenme sırası korundu; HTML 592 satırdan 115 satıra indi.
- Hazır/özel kartların ortak deste hazırlama kodu desteyiHazirla işlevinde toplandı.
- İki yerdeki ortak tür renkleri TUR_RENKLERI tablosunda birleştirildi; Doğruluk/Cesaret ek renkleri görünüm katmanında korundu.
- Dil seçici etiketlerindeki uzun iç içe koşul, aynı metinleri içeren bir tabloya dönüştürüldü.
- Gereksiz kart metni ilk ataması ve aynı sonucu veren tekrarlı CSS kuralları kaldırıldı.
- Servis çalışanının hiçbir işlem yapmayan fetch dinleyicisi ve kullanılmayan install parametresi kaldırıldı; kayıt, etkinleşme ve yeniden yükleme davranışı sınandı. Ağ isteklerine müdahale etmeyen servis çalışanı yaklaşımı: [Chrome rehberi](https://developer.chrome.com/docs/workbox/remove-buggy-service-workers/).
- Oyun kodları okunur bloklar halinde biçimlendirildi. README dosya sorumlulukları, yükleme sırası, Android eşitleme ve test komutlarıyla düzenlendi.
- Yerel IDE önbellekleri ve iç içe oluşmuş IDE metadata klasörü Git'in dışlama listesine eklendi.

Korunanlar:
- Türkçe kart dosyaları ve 11 çeviri kart paketi birebir aynı.
- Test betikleri, package.json, package-lock.json, Capacitor ayarları ve app/build.gradle aynı; çalışma zamanı bağımlılığı eklenmedi.
- Yerel kayıt anahtarları, eski gizli kart taşıma verileri, oyun kuralları ve satın alma/reklam koşulları korundu.
- Reklam, satın alma ve taşınan Android geri tuşu kodunun ayrıştırılmış JavaScript yapısının yalnızca biçimlendirme sırasında değişmediği doğrulandı.

Doğrulama:
- 30 JavaScript dosyası sözdizimi kontrolünden geçti.
- Mevcut altı betiklik npm test zinciri sadeleştirilmiş kopyada başarılı (çıkış 0). Uygulanan tüm web dosyaları test edilen kopyayla birebir aynı.
- 12 dilde 306 kart/dil, görev/mod tanımları, partner adları, süre değerleri ve dil seçici etiketleri eski sürümle aynı.
- 99 ekran karşılaştırmasında metinler, düğme değerleri/durumları, ekran ölçüleri ve seçili hesaplanmış CSS özellikleri eşleşti. Üç dilde üç tema ve dokuz ekran; diğer dokuz dilde menü ve oyun ekranı kontrol edildi.
- Almanca ana menü, mod seçimi ve kart ekranı görüntüleri önceki sürümle piksel düzeyinde aynı.
- Eski/yeni servis çalışanında gerçek yerel HTTP sunucusu üzerinden kayıt, etkinleşme, sayfa yenileme, yerel verinin korunması ve ağdan dosya yükleme geçti.
- npx --no-install cap sync android başarılı.
- :app:bundleRelease, :app:lintRelease ve :app:testReleaseUnitTest başarılı. Android'in mevcut örnek birim testi oyun davranışının kanıtı olarak kullanılmadı; oyun kontrolleri tarayıcı regresyon testlerine dayanıyor.
- Lint: 0 hata, 12 mevcut bakım uyarısı.
- 38 web dosyası test kopyası, ana kaynak, Android varlıkları ve imzalı AAB içinde birebir aynı.
- İmza, önceki yükleme sertifikası ve bundletool doğrulaması başarılı. Paket kimliği pikserax.ikikalpbirdeste; sürüm 1.0.11 / kod 12.

Sınırlar:
Satın alma, reklam ve Android yaşam döngüsü senaryoları kontrollü servis taklitleriyle sınandı. Gerçek ödeme, canlı reklam sunumu veya fiziksel cihaz testi yapılmadı. Ekran karşılaştırmaları test edilen durumları kapsar; tüm olası cihaz ve kullanıcı durumları için mutlak hatasızlık garantisi değildir.

Yükleme dosyası: android/app/release/app-release-v1.0.11.aab
Boyut: 7591584 bayt
SHA-256: 2e738b587869b595ace1ade41f8026a82f24844374add1a87c6a6a960254c5f2
Sürüm notları: android/app/release/surum-notlari-v1.0.11.txt (475 karakter; dil etiketleri hariç).
Sürüm kodu ve adı aynı kaldı. Play Console'a yükleme yapılmadı.

Kanıtlar ve yerel kopyalar: C:/Users/akcak/AppData/Local/Temp/ikbd-cleanup-IgjmrA
- github-backup.json, backup-plan.json: GitHub yedeği ve dosya özetleri
- cleanup-stage.json, applied-files.json: uygulanan sadeleştirme
- cleanup-tests.log: tam regresyon zinciri
- equivalence-results.json, compare-*.png: önce/sonra karşılaştırmaları
- service-worker-check.json: tarayıcı servis çalışanı kontrolü
- android-build.log, asset-verification.json, signing-summary.json: Android ve paket doğrulaması


## Satın alma düzeltmeleri — 18 Kasım 2026

- ITEM_ALREADY_OWNED yanıtında aynı işlem kuyruğunda sahiplik yeniden sorgulanır. İkinci ödeme başlatılmaz; boş veya bekleyen satın alma kayıtları hak açmaz. Sorgu hatalarında mevcut sınırlı tekrar mekanizması kullanılır.
- Eksik fiyatlar 5, 15, 30, 60, 120 saniye gecikmelerle en fazla beş kez tekrar sorgulanır. Kısmi yanıtlar bütçeyi sıfırlamaz; fiyatı gelen ürün kullanılabilir kalır.
- Kalıcı testler mevcut iki test betiğine eklendi. Düzeltme öncesinde hataları yakalayan testler düzeltme sonrasında geçti.

Doğrulanan komutlar (üçü de çıkış 0):
- `node tests/regression.cjs --native`: 4 PASS satırı.
- `node tests/purchase-summary-fixes.cjs`: 6 PASS satırı.
- `node tests/review-fixes-nov18.cjs`: 8 PASS satırı.

Bu turda tüm altı betiklik oyun taraması yeniden çalıştırılmadı; değişen satın alma kodunun reklam, onay, geri yükleme, tekrar sınırları ve oyun özeti bağlantıları kontrol edildi. Gerçek ödeme veya fiziksel cihaz testi yapılmadı.

`npx --no-install cap copy android` başarılı; 38 web dosyası kaynak ile Android varlıklarında birebir aynı. Çalışma zamanı dosyalarından yalnızca www/satinalma.js değişti. Kartlar, çeviriler ve ekran tasarımı aynı. Sürüm 1.0.11 / kod 12 korundu.

**Mevcut app-release-v1.0.11.aab yeniden üretilmedi ve bu iki düzeltmeyi içermez.** Android Studio’dan yeniden derleme güncel kaynakları kullanır. Bu kayıt, yukarıdaki eski AAB eşleşme bilgisinin sonrasındaki kaynak durumudur. GitHub veya Play Console’a yükleme yapılmadı.

Yerel yedek ve test günlükleri: C:/Users/akcak/AppData/Local/Temp/ikbd-purchase-fixes-BkILkf


## Baştan tam test — 18 Kasım 2026

**Sonuç: Bu taramada yeni hata doğrulanmadı.** Güncel kaynaklarda altı betiklik npm test zinciri başarılı; çıkış 0, 62 PASS satırı.

- 12 dil × 10 mod; toplam 3.672 otomatik kart çekimi. Dil başına 306 kart, partner adları, süreler, uzun isimler ve eski gizli kart kayıtları kontrol edildi.
- Oyun sonu, doğal/elle bitirme, tekrar oynama, özel kartlar, gizleme/geri açma, sayaç başlatma/duraklatma/devam/bitiş, üç tema ve Android geri yönlendirmesi geçti.
- Satın alma, iptal, bekleyen ödeme, sahiplik sorgusu/onay hataları, geri yükleme, iade, zaten satın alınmış ürün, kısmi fiyat yanıtı, tekrar sınırları ve işlem sıralaması geçti.
- Reklamın 15 işlem ve 5 dakika koşulları, gizlilik, reklam kaldırma koruması ve mola sırasında geri tuşu kontrolleri geçti.
- Ek tarama: Türkçe, Almanca, Geleneksel Çince; 320×480, 640×360 ve 412×892 ölçülerinde 108 ekran durumu. Reklam için 60 piksel alanla yatay taşma veya kaydırmayla da erişilemeyen düğme bulunmadı.
- 30 JavaScript dosyası ayrıştırıldı; eksik HTML dosya bağlantısı bulunmadı. 38 web dosyası Android kaynak kopyasıyla eşleşti.

Android: :app:assembleDebug, :app:lintRelease, :app:testDebugUnitTest başarılı. Lint 0 hata, 12 mevcut uyarı: ikon ölçü/konum/tekrarları, manifest sırası, eski SDK koşulu ve kullanılmayan kaynaklar. Gradle ayrıca ileri sürüm uyumluluğu için eski API uyarısı veriyor; mevcut derleme başarılı. Örnek Android birim testi, oyun mantığının doğruluğuna kanıt sayılmadı.

Derlenen test APK’sının içindeki 38 web dosyası güncel kaynaklarla birebir aynı: android/app/build/outputs/apk/debug/app-debug.apk. Bu debug paketi Play Console yayın paketi değildir.

**Sınırlar:** Otomatik oyun testleri Edge üzerinde, native satın alma/reklam/Android olayları kontrollü servis taklitleriyle çalıştı. Fiziksel cihaz, gerçek Google Play ödemesi ve canlı reklam sunumu denenmedi. Dil kontrolleri kartların teknik bütünlüğünü ve mevcut çeviri senaryolarını kapsar; tüm metinlerin ana dil konuşurunca redaksiyonu değildir.

Oyun kaynakları ve mevcut yayın AAB’si test sırasında değiştirilmedi (39 dosyanın SHA-256 özeti aynı). Sürüm 1.0.11 / kod 12. **Mevcut app-release-v1.0.11.aab son iki satın alma düzeltmesini hâlâ içermiyor; yeni yayın AAB’si oluşturulmadı.** GitHub/Play Console yüklemesi yapılmadı.

Kanıtlar: C:/Users/akcak/AppData/Local/Temp/ikbd-full-test-aO20J2
- npm-test.log, npm-result.json: tam test zinciri
- layouts.json, layout-check.cjs: 108 ekran ölçümü
- static-check.json, before-hashes.json: sözdizimi, kaynaklar ve dosya bütünlüğü
- android-checks.log, apk-verification.json: Android derleme/lint/test ve APK içeriği


## Güncel imzalı AAB — 19 Kasım 2026

Çoklu teklif düzeltildi: ilk uygun teklif gösterilir ve aynı offerToken ödeme isteğine aktarılır. Teklif tıklama anında sabitlenir; kuyrukta fiyat değişse de başka teklif gönderilmez. Geçersiz teklif halinde fiyat yenilenir; yeni ödeme için yeni kullanıcı tıklaması gerekir.

Doğrulama: regression.cjs --native, purchase-summary-fixes.cjs --purchase-edges, review-fixes-nov18.cjs --partial-prices ve purchase-offers.cjs başarılı (11 PASS grubu). Yeni teklif testleri ilk sürümde başarısız, düzeltme sonrasında başarılı. Tam oyun taraması önceki turda geçti; bu değişiklikten sonra satın alma/reklam senaryoları tekrar çalıştırıldı.

Android bundleRelease ve lintRelease başarılı. İmzalı AAB jarsigner ile doğrulandı ve önceki yükleme sertifikasıyla eşleşti. Paket içindeki 38 web dosyası güncel kaynaklarla birebir aynı.

**Önceki AAB’nin satın alma düzeltmelerini içermediği notları artık güncel dosya için geçerli değildir.** app-release-v1.0.11.aab yeniden üretildi; üç satın alma düzeltmesi de bu pakette mevcut.

Sürüm: 1.0.11 / kod 12. Dosya: C:\Users\akcak\OneDrive\Projects\Iki Kalp Bir Deste\android\app\release\app-release-v1.0.11.aab
SHA-256: 671464b6135d1c94c65eec23e9d8c5f10c3964403c5d4faf73239bc1a400a825
Boyut: 7592035 bayt.
Sürüm notları: android/app/release/surum-notlari-v1.0.11.txt
Eski AAB ve kaynak yedeği: C:/Users/akcak/AppData/Local/Temp/ikbd-offer-release-bn0Bxv/before
Gerçek ödeme/canlı reklam/fiziksel cihaz testi ve Play Console yüklemesi yapılmadı.


## Baştan oyun incelemesi ve simülasyon — 19 Kasım 2026

Sonuç: Bu incelemede yeni, tekrarlanabilir bir oyun davranışı hatası doğrulanmadı. Bu sonuç, tüm olası cihaz ve servis koşullarının hatasız olduğuna dair garanti değildir.

- Tam `npm test` zinciri: 7 test dosyası, 65 PASS grubu, çıkış kodu 0.
- Kartlar: 12 dilde 306 kartın çekilmesi, isim yerleştirme, süreli kartlar, gizlenen kartların dil değişiminde korunması ve oyun sonu kontrolleri geçti. Dil testleri teknik bütünlük ve bilinen metin hatalarını kapsar; her dil için ana dil editör incelemesi yapılmadı.
- Ek karma simülasyon: 12 dil × 10 mod = 120 oyun, toplam 3794 düğme eylemi. 1855 tamamlama, 1066 pas ve 747 gizleme; bütün oyunlar özete ulaştı, özet sayaçları işlemlerle eşleşti. Oyuncu sayıları 2–8 arasında değiştirildi.
- Ekranlar: 320×480, 640×360 ve 412×892 boyutlarında Türkçe, Almanca ve Geleneksel Çince ile toplam 108 ekran durumu; 60 px reklam alanı dahil erişilemeyen düğme veya yatay taşma bulunmadı.
- Satın alma/reklam: hak doğrulama, iptal/bekleyen ödeme, zaten sahip olunan ürün, onay ve fiyat tekrarları, eksik ürün yanıtı, offerToken eşleşmesi, seri işlem kuyruğu ve reklam/geri tuşu senaryoları geçti. Native servisler taklit edildi.
- 30 JavaScript dosyasının sözdizimi geçerli; HTML'de eksik yerel kaynak yok. 38 web dosyası Android kaynakları ve mevcut AAB ile birebir aynı.
- Android `:app:lintRelease :app:testDebugUnitTest` başarılı. Mevcut Android birim testleri gerçek cihazda oyun testinin yerine geçmez.
- Android lint: 0 hata, 14 uyarı. Manifest sıralaması (1), Gradle/bağımlılık sürümü önerileri (2), splash görsel kaynakları (3), gereksiz v24 klasör ayrımı (1), kullanılmayan olarak işaretlenen kaynaklar (7). Bunlar testlerde oyun arızası üretmedi; kullanılmayan kaynaklar dinamik/native başvurular kontrol edilmeden silinmemeli.
- Gradle ayrıca gelecekte Gradle 9 ile uyumsuz olabilecek eski özellik kullanımlarını bildiriyor; mevcut derleme başarılı.
- Oyun kaynakları, test dosyaları ve mevcut AAB denetim başındaki SHA-256 değerleriyle aynı. Bu turda yalnızca rapor eklendi.

Mevcut paket: 1.0.11 / kod 12; app-release-v1.0.11.aab.
SHA-256: 671464b6135d1c94c65eec23e9d8c5f10c3964403c5d4faf73239bc1a400a825

Sınırlar: Gerçek Google Play ödemesi, canlı AdMob sunumu, fiziksel cihaz/kamera çıkıntısı ve tüm Android WebView sürümleri bu turda test edilmedi. Güncel AAB yeniden üretilmedi veya yüklenmedi.

Kanıt klasörü: C:/Users/akcak/AppData/Local/Temp/ikbd-full-review-0uFjEF
npm-test.log, npm-result.json, mixed.cjs, mixed-results.json, layout-check.cjs, layouts.json, static.json, aab.json, android.log, before.json.
