# Oyun hata incelemesi — 18 Kasım 2026

**Düzeltme güncellemesi — 18 Kasım 2026:** Aşağıdaki iki bulgu giderildi. Zaten alınmış ürün yanıtı aynı satın alma kuyruğunda sahiplik sorgusuna yönlendiriliyor. Eksik fiyat yanıtları mevcut sınırlı tekrar mekanizmasını kullanıyor; kısmi yanıt deneme bütçesini sıfırlamıyor. İlk inceleme ve tekrar adımları tarihsel kayıt olarak aşağıda korunmuştur. Android web varlıkları da güncellendi. Sürüm 1.0.11 / kod 12; mevcut AAB bu düzeltmelerle yeniden oluşturulmadı.

İncelenen proje: `C:/Users/akcak/OneDrive/Projects/Iki Kalp Bir Deste`  
Android sürümü: **1.0.11 / sürüm kodu 12**.

**Sonuç:** İki özel satın alma senaryosunda sorun tekrar üretildi. İkisi de temizlik öncesindeki GitHub yedeğinin yerel kopyasında aynı şekilde oluştu; son sadeleştirmenin getirdiği bir bozulma bulunmadı. Bu çalışma incelemedir; oyun kodlarına düzeltme uygulanmadı.

## 1. Önceden alınmış ürün yanıtında hak otomatik geri yüklenmiyor — P2

Koşul: İlk sahiplik sorgusu eski/eksik bir sonuçla ürünü göstermiyor. Kullanıcı satın almaya dokunduğunda Google Play `ITEM_ALREADY_OWNED` yanıtı veriyor. Bu hata için sahipliği yeniden sorgulama gereği [Google Play'in resmi hata rehberinde](https://developer.android.com/google/play/billing/errors#item_already_owned) açıklanıyor.

Tekrar üretim:
1. İlk sahiplik sorgusu başarılı, ancak boş liste dönecek şekilde oturumu aç.
2. Mağazada “Tüm modların kilidi” satın alma düğmesine dokun.
3. Native yanıtını, kurulu eklentinin kullandığı `{ message: "Purchase is not purchased", code: "ITEM_ALREADY_OWNED" }` ile sonuçlandır. Sonraki sahiplik sorgusunun alınmış ürünü döndürmesini sağla.
4. Beş dakikalık süreyi ilerlet.

Gözlenen: “Satın alma tamamlanamadı. Daha sonra tekrar dene.” mesajı çıkıyor. Sahiplik sorgusu sayısı 1'de kalıyor, mod hakkı kapalı kalıyor ve satın alma düğmesi hâlâ açık. “Satın alımlarımı geri yükle” seçilince ikinci sorgu yapılıyor ve hak açılıyor.

Etki: Önceden ödeme yapmış oyuncu satın aldığı modlara erişemeyebilir; elle geri yükleme gerekir. Bu test çift ödeme veya kalıcı hak kaybı göstermiyor.

Kaynak: [satinalma.js:394](<C:/Users/akcak/OneDrive/Projects/Iki Kalp Bir Deste/www/satinalma.js:394>). Hata yolu bekleyen ödeme ve iptali ayırıyor; “zaten satın alınmış” yanıtında sahiplik sorgusunu tetiklemiyor.

Düzeltme yönü: Bu yanıtı ayrı ele alıp mevcut seri işlem kuyruğunda sahipliği yeniden sorgula. Sorgu geçici hata verirse var olan sınırlı tekrar mekanizmasını kullan; yeni ödeme başlatma.

## 2. Kısmi fiyat yanıtında eksik ürün yeniden yüklenmiyor — P3

Koşul: İki ürün istenmesine rağmen ilk yanıt yalnızca bir ürünü içeriyor; sonraki sorgu iki ürünü de döndürebiliyor. Google Play'in [ürün sorgusu sonucu](https://developer.android.com/reference/com/android/billingclient/api/QueryProductDetailsResult) alınan ve alınamayan ürünleri ayrı döndürebilir. Kurulu NativePurchases eklentisi boş olmayan ürün listesini başarılı yanıt olarak uygulamaya iletiyor.

Tekrar üretim:
1. Sahiplik kontrolü başarılı bir oturumda mağazayı aç.
2. İlk ürün yanıtında yalnızca `tum_modlar` döndür; sonraki sorguda `reklam_kaldir` da mevcut olsun.
3. Beş dakika ilerlet; bağlantı geri geldi ve uygulamaya dönüldü olaylarını gönder; elle satın alımları geri yükle.
4. Mağazayı kapatıp yeniden aç.

Gözlenen: İlk üç adımda fiyat sorgusu sayısı 1'de kalıyor; “Reklamları kaldır” düğmesi “Şu an alınamıyor” yazısıyla kapalı. Mağaza yeniden açılınca ikinci fiyat sorgusu yapılıyor ve düğme çalışıyor.

Etki: Geçici eksik ürün yanıtından sonra oyuncu ilgili ürünü mağazayı yeniden açana kadar satın alamıyor. Mevcut satın alma hakları etkilenmiyor.

Kaynak: [satinalma.js:249](<C:/Users/akcak/OneDrive/Projects/Iki Kalp Bir Deste/www/satinalma.js:249>). Dönen dizinin varlığı kontrol ediliyor; istenen ürünlerden biri eksik olsa da `fiyatBekliyor = false` atanıyor. Tamamen hata veren fiyat sorgularının toparlanması mevcut testlerde başarılı; bu bulgu kısmi yanıtla sınırlı.

Düzeltme yönü: Eksik ürünleri izleyip uygun bir sınırlı yeniden sorgulama veya açık yenileme yolu sun. Geçerli fiyatı gelen ürünü kullanılabilir tut.

## Başarılı kontroller

- Mevcut altı betiklik `npm test` zinciri tamamlandı, çıkış kodu **0**; 58 PASS satırı.
- 12 dil, 10 mod, dil başına 306 gerçek kart çekimi; partner adı, süre, özel/gizli kart ve eski kayıtların taşınması kontrolleri geçti.
- Oyun sonu, doğal/elle bitirme, Android geri tuşu, satın alma onayı/geri yükleme/iptal/bekleyen ödeme ve hata sonrası tekrar testleri geçti.
- Reklamın 15 işlem ve 5 dakika koşulu, molada geri tuşu, gizlilik ve reklam kaldırma koruması testleri geçti.
- Ek kontrolde 12 dilde sayaç bitiş metni doğru, süre bitişinde titreşim çağrısı tam bir kez yapıldı.
- Türkçe, Almanca ve Geleneksel Çince; 320×480, 640×360 ve 412×892 ölçülerinde toplam **108 ekran durumu** kontrol edildi. 60 piksel reklam alanıyla yatay taşma veya kaydırmayla da erişilemeyen düğme bulunmadı. İlk otomatik kaydırma ölçümündeki alt çubuk örtüşmeleri, kullanıcı kaydırmasıyla erişim sınanarak elendi.

## Sınırlar ve bütünlük

Tarayıcı testleri Edge üzerinde çalıştı. Satın alma, reklam, titreşim ve Android olayları kontrollü native servis taklitleriyle doğrulandı; gerçek Google Play ödemesi, canlı reklam veya fiziksel telefon testi yapılmadı. Dil kontrolleri mevcut otomatik senaryoları kapsar; tüm cümlelerin ana dil konuşuru tarafından redaksiyonu değildir.

38 web dosyası ve mevcut AAB, inceleme başlangıcındaki SHA-256 değerleriyle aynı. Sürüm kodu/adı değiştirilmedi. Yeni paket üretilmedi, GitHub veya Play Console'a yükleme yapılmadı.

AAB SHA-256: `2e738b587869b595ace1ade41f8026a82f24844374add1a87c6a6a960254c5f2`.

Kanıt klasörü: `C:/Users/akcak/AppData/Local/Temp/ikbd-audit-after-cleanup-IM1GDH`
- `npm-test.log`: tam test zinciri
- `targeted-audit.cjs`, `targeted-results.json`: kısmi fiyat yanıtı, önce/sonra karşılaştırması ve 12 dilde süre bitişi
- `layout-reachability.cjs`, `owned-results.json`, `edge-results.json`: zaten satın alınmış ürün ve ekran erişimi
- `partial-price-current.png`, `partial-price-before.png`: fiyat sorununun ekran görüntüleri
- `before-hashes.json`, `integrity.json`: dosya bütünlüğü


Düzeltme doğrulaması: satın alma/reklam regresyonu ve güncellenen iki test betiği başarılı (çıkış 0). Yeni testler her iki ürünü, geçici sorgu hatasını, boş/bekleyen kayıtları, eşzamanlı işlemleri, eksik/boş fiyat yanıtlarını ve tekrar sınırlarını kapsar. Ayrıntılar: docs/son-kontrol.md son güncellemesi.
