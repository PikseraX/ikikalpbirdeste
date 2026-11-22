> **Düzeltme durumu — 17 Kasım 2026:** Aşağıdaki iki bulgu giderildi. Ödeme sonrası doğrulama otomatik yeniden deneniyor; özet ekranında Android geri tuşu ana menüye dönüyor. Tam test zinciri ve Android derlemesi geçti; 1.0.11 / kod 12 paketi yenilendi. Güncel sonuç: [son-kontrol.md](son-kontrol.md). Aşağıdaki metin düzeltme öncesi denetimin tarihsel kaydıdır.

# Oynayarak inceleme — 17 Kasım 2026

İncelenen sürüm: **1.0.11 (sürüm kodu 12)**.
Proje: `C:\Users\akcak\OneDrive\Projects\Iki Kalp Bir Deste`.

Bu çalışma hata tespitidir. Uygulama kaynakları, sürüm numarası ve yükleme paketi değiştirilmedi. İki yeni bulgu aşağıda ayrıntılandırıldı.

## 1. Satın alma sonrası doğrulama hatasında otomatik yeniden deneme yok — P2

**Etki:** Başarılı ödeme sonrasındaki sahiplik sorgusu geçici hata verirse alınan modlar kilitli kalabiliyor veya reklam kaldırma hakkı uygulanmıyor. Kullanıcıya hata gösteriliyor. Hak kaybolmuyor; “Geri yükle” ile tekrar sorgulanınca uygulanıyor. Sorun, geçici hata sonrasında otomatik toparlanmanın olmaması.

**Tekrar üretme:**

1. İlk sahiplik sorgusunun başarıyla tamamlandığı, henüz satın alımı olmayan bir oturum aç.
2. “Tüm modlar” veya “Reklamları kaldır” satın alımını başlat.
3. Satın alma başarılı tamamlanırken hemen sonraki `getPurchases` sorgusunda bir kez geçici hata üret. Ödeme penceresinden dönüş olayı işlem sürerken gelirse mevcut işlem koruması bu sorguyu atlıyor.
4. Hizmeti tekrar çalışır duruma getir; uygulamayı açık ve ön planda tut.
5. Otomatik testte sanal saat 10 dakika ilerletildi: yeni sorgu yapılmadı ve ilgili hak kapalı kaldı.
6. “Geri yükle” düğmesiyle tekrar sorgula: hak başarıyla açıldı.

İki ürün için de aynı sonuç doğrulandı. Sorgu sayısı başlangıç ve başarısız ödeme sonrası kontrol ile 2'de kaldı; manuel geri yüklemeden sonra 3 oldu.

**Neden:** [satinalma.js](../www/satinalma.js), satır 169, ödeme sonrası sorgu hatasında yalnızca mesaj gösterip dönüyor. Satır 22'deki yeniden deneme koşulu, ilk sorgu daha önce başarılı olduğu için `SatinalmaDurumu.hazir === true` durumunda duruyor. Satır 176'daki işlem bitirme yolu da bu ilk açılış denemesine bağlı.

**Öneri:** Ödeme sonrası doğrulamayı da sınırlı, aralıklı ve mevcut işlem kuyruğuna bağlı yeniden deneme kapsamına al. Başarısız sorguyu “satın alım yok” sayma; bilinen hakları koru.

**Doğrulama sınırı:** Ödeme ve geçici servis hatası kontrollü native API taklidiyle üretildi; gerçek para harcanmadı. Manuel geri yükleme ve sonraki uygun yaşam döngüsü/bağlantı olayı yeniden doğrulamayı sağlayabilir. Bu bulgu kalıcı satın alım kaybı iddiası değildir.

## 2. Oyun özeti ekranında Android geri tuşu uygulamayı kapatıyor — P3

**Etki:** Özet ekranında sistem geri tuşu ana menüye dönmek yerine uygulamadan çıkıyor. Bu bir gezinme sorunudur; çökme değildir.

**Tekrar üretme:**

1. Kartları bitirerek veya “Oyunu bitir” düğmesiyle özet ekranına gel.
2. Android sistem geri tuşu olayını gönder.
3. `App.exitApp()` çağrılıyor; ekrandaki “Ana menü” düğmesinin işlemi çalışmıyor.

Türkçe, İngilizce ve Japoncada, iki bitirme yolu için toplam 6 senaryoda doğrulandı.

**Neden:** [index.html](../www/index.html), satır 578–584, geri işlemini görünür düğme metninin başındaki “←” işaretine göre seçiyor; böyle bir düğme yoksa doğrudan çıkış çağırıyor. [ozellikler.js](../www/ozellikler.js), satır 330'daki özet düğmeleri bu işareti taşımıyor. Kurulu Android App eklentisindeki çıkış işlemi Activity'yi sonlandırıyor.

**Öneri:** Geri davranışını açık ekran kimliğine göre tanımla. Özette ana menüye veya mod seçimine dön; mevcut reklam geri tuşu korumasını koru.

**Doğrulama sınırı:** Sistem geri olayı otomatik tarayıcı testinde native köprü taklidiyle gönderildi; çıkış çağrısı sayıldı ve Android eklentisinin uygulaması koddan kontrol edildi. Bu çalışmada fiziksel Android cihazında ayrıca yürütülmedi.

## Başarılı kontroller

- Tam `npm test` zinciri geçti: `regression.cjs`, `audit-regression.cjs`, `four-fixes.cjs`, `november-fixes.cjs`.
- 10 modun her biri 2, 3 ve 8 oyuncuyla tamamlandı: **30 tam oyun, 918 kart**.
- Karışık oyunlarda 464 kart tamamlandı, 292 kart pas geçildi, 162 kart gizlendi. Sıra, oyuncu istatistikleri ve oyun sonu toplamları doğrulandı; JavaScript çalışma zamanı hatası kaydedilmedi.
- 12 dilde, dil başına 306 hazır kart; kişi adı yerleştirmeleri, sayaçlar, modlar ve özet akışları test edildi.
- Kart gizleme/geri getirme, özel kartlar, doğruluk/cesaret seçimleri, tekrar oynama, uzun yazılar/isimler, dar ekranlar ve reklam alanı senaryoları geçti.
- Satın alma iptali/bekleyen ödeme, işlem sıralaması, ilk açılışta sahiplik sorgusu tekrarları, iade sonrası mod kilidi ve reklam kaldırma koruması testleri geçti.
- Reklamların 15 işlem ve 5 dakika koşulları, izin akışı ve reklam öncesi geri tuşu davranışı kontrollü servis taklitleriyle test edildi.
- Son düzeltmelerin testleri geçti: 12 dilde bileşik süreler, gerçekten 90 saniye sayan sayaçlar, üç temada sekiz ekran, cinsiyetten bağımsız ifadeler ve 88 eski gizli kart kaydının taşınması.
- `gradlew.bat :app:lintRelease --offline --no-daemon` başarılı: **0 hata, 12 uyarı**. Uyarılar manifest sırası, gereksiz SDK koşulu, kullanılmayan kaynaklar ve uygulama simgesi kaynak düzeni/boyutlarıyla ilgili. Bu kontrol cihaz üstünde çalışma testi değildir.
- Native Purchases 8.9.6 Android Java kaynakları, kilit dosyasındaki bütünlüğü doğrulanan orijinal npm paketiyle karşılaştırıldı; fark bulunmadı.

Dil testleri kart sayıları, ad yerleştirme, sayaç ve kullanıcı arayüzü davranışını doğrular; her cümlenin ana dil düzeyinde dilbilimsel onayı anlamına gelmez. Canlı AdMob reklam sunumu, gerçek Google Play ödeme işlemi ve tüm fiziksel cihaz kombinasyonları bu testin kapsamı dışındadır.

## Dosya bütünlüğü

- Tarama başındaki ve sonundaki 34 web kaynak dosyasının SHA-256 değerleri aynı.
- 34 web kaynak dosyası Android `assets/public` kopyalarıyla eşleşiyor.
- Yukarıdaki iki bulgunun ilgili satın alma dosyası ve geri tuşu işleyicisi, son dört düzeltme öncesindeki yedekle aynı. Bu iki davranış son düzeltmeler sırasında eklenmemiş.
- Mevcut paket: `android/app/release/app-release-v1.0.11.aab`
- Paket SHA-256: `cb3f118fa7ed8644a09a7e6d3693c8c2b65519079dde19a05263e4b4cfc820b0`

## Test kanıtları

Geçici test dizini: `C:\Users\akcak\AppData\Local\Temp\ikbd-play-audit-nov17-TrMkUj`.

- `npm-test.log`: tüm test zincirinin çıktısı
- `mixed-play.json`: 30 oyun ve kart/istatistik sonuçları
- `boundary-results.json`: iki bulgunun tekrar üretme sonuçları
- `summary-back.png`: özet ekranı görüntüsü
- `dependency-comparison.json`: native satın alma paketi karşılaştırması
- `lint.log`: Android denetimi çıktısı
- `source-verification.json`: kaynak ve paket bütünlüğü
