Durum — 16 Kasım 2026: Aşağıdaki dört bulgu giderildi ve tests/four-fixes.cjs ile doğrulandı. npm test bütünüyle başarılı. Android eşitlemesi ve yayın derlemesi tamamlandı; imzalı paket 1.0.11 / kod 12 olarak yenilendi. Önceki incelemenin bulguları ve tekrar üretme adımları aşağıda tarihsel kayıt olarak korunmaktadır.

Düzeltmeler:
- İlk satın alma sorgusu geçici hata verirse 5, 15, 30, 60 ve 120 saniyelik aralıklarla en fazla beş otomatik tekrar yapılır. Başarı veya satın alma akışıyla çakışma durumları test edildi; reklam kaldırma sahipliği doğrulanmadan reklam açılmaz.
- Mola sırasında geri tuşu önce molayı kapatır. Menü/tür ekranına geçiş bekleyen gösterimi iptal eder. Gerçek gösterim olmadan reklam sayacı ve beş dakikalık süre sıfırlanmaz.
- Beş dildeki sıra sayıları artık yanlış 1 saniyelik sayaç açmaz. Cümledeki sonraki gerçek süreler bulunur; 12 dilde rakamla belirtilen süreler ve açık yazılı süre ifadeleri korunur.
- Başlık iki satır olarak mevcut genişliğe sığdırılır. 12 dilde 60 ölçüm, gizli menü sonrası yeniden boyutlandırma ve kalbin boyutu/konumu doğrulandı.

Güncel AAB SHA-256: 7ac73bd1c207677beda4f43d57c6f0ded6912ba9bc34ee838714c9b79495857b

Düzeltme öncesi inceleme kaydı:

16 Kasım 2026 — Yeni hata taraması

İncelenen proje: C:\Users\akcak\OneDrive\Projects\Iki Kalp Bir Deste
Sürüm: 1.0.11 / kod 12
Bu tur yalnızca hata araması yapıldı. Oyun kaynakları, Android dosyaları ve AAB değiştirilmedi.
Mevcut AAB SHA-256: 94ea7e49d03aa3947a2fe6e72dd0e6189be03a04ca420c471a9efa3237d44978

Doğrulanan bulgular (4)

1. [P2 / Orta] İlk satın alma sorgusundaki geçici hata reklamları oturum boyunca bekletebiliyor.
Kaynak: www/satinalma.js:183 ve www/reklam.js:197.
İlk getPurchases çağrısı hata verirse SatinalmaDurumu.hazir false kalıyor. Sorgu ancak online/resume olayı veya elle geri yükleme ile yeniden yapılıyor; zamanlanmış tekrar yok.
Tekrar üretme: reklam kaldırma satın alınmamış bir kurulumda ilk sorguyu bir kez başarısız yaptım. Ardından servisi çalışır duruma getirip uygulamayı önde tutarak saati 10 dakika ilerlettim.
Sonuç: sorgu sayısı 1, reklam istekleri 0, sdk durumu satin-alim-bekliyor. Aynı oturumda resume gönderilince sorgu sayısı 2 oldu ve banner/geçiş hazırlığı başladı.
Etkisi: internet bağlıyken başlangıçta oluşan geçici servis hatasından sonra iki reklam türü de kendiliğinden toparlanmıyor.
Düzeltme yönü: ilk doğrulamayı sınırlı ve gecikmeli olarak yeniden denemek; sahiplik doğrulanmadan reklam başlatmama kuralını korumak.

2. [P2 / Orta] Android geri tuşu reklam molasının arkasındaki ekranı değiştiriyor.
Kaynak: www/index.html:578 ve www/reklam.js:160.
Geri tuşu, görünür ekranın geri düğmesini reklam örtüsü açıkken de çalıştırıyor. İki saniyelik geçiş reklamı zamanlayıcısı ekran değişince iptal olmuyor.
Tekrar üretme: ilk kartı açıp reklam sayacını 14'e getirdim; sonraki işlemi yapınca kısa mola açıldı. Mola sırasında Android backButton olayını dört kez gönderdim.
Sonuç: oyun → tür seçimi → mod seçimi → oyuncular → ana menü geçildi. 2,1 saniye sonra ana menüdeyken showInterstitial yine çağrıldı.
Etkisi: kullanıcı oyundan çıkmışken beklenmedik tam ekran reklam açılabiliyor; mola görünürken arka planda gezinme gerçekleşiyor.
Düzeltme yönü: mola/yerel reklam durumunu geri tuşu yönlendirmesine dahil etmek ve gerekiyorsa bekleyen gösterimi iptal etmek.

3. [P3 / Düşük] Süre olmayan “ikinci” ifadeleri 1 saniyelik özel kart sayacı oluşturuyor.
Kaynak: www/ozellikler.js:32.
Yeni süre algılayıcısı sayı/ünite yanında a, un, une, um gibi sözcükleri de bir olarak kabul ediyor. Second/seconde/secondo/segundo sözcükleri sıra sayısı olarak kullanıldığında da eşleşiyor.
Gerçek özel kart akışında eklenen örnek: Ask {partner} a second question.
Sonuç: kart “Ask Hasan a second question.” olarak gösterildi; süre belirtilmemesine rağmen “⏱️ 1 sec – Start” düğmesi çıktı.
Ayrıca şu beş dilde 1 saniye sonucu doğrulandı:
- en: Ask {partner} a second question.
- fr: Pose une seconde question à {partner}.
- it: Fai un secondo tentativo.
- es: Haz un segundo intento.
- pt: Planeje um segundo encontro com {partner}.
Düzeltme yönü: sıra sayısı ile süre birimini ayırmak; belirsiz yazıyla sayı eşleşmelerini daraltırken gerçek süre desteğini korumak.

4. [P3 / Düşük] Ana menü başlığı dar ekranlarda iki yerine üç satıra düşüyor.
Kaynak: www/tema.css:51 ve www/index.html:59.
Başlıktaki br iki parça arasında kırılım sağlıyor; fakat sabit 2.2rem yazı boyutuyla parçaların kendi içinde tekrar satıra bölünmesi engellenmiyor.
Ölçülen sonuçlar:
- 320 piksel genişlik: Almanca, Fransızca, İtalyanca, İspanyolca, Portekizce başlıklar 3 satır.
- 360 piksel genişlik: Fransızca ve İtalyanca başlıklar 3 satır.
- 390 piksel genişlik: 12 dilin başlıkları 2 satır.
Etkisi: istenen iki satırlı başlık düzeni küçük telefonlarda korunmuyor.
Düzeltme yönü: başlık boyutunu satırların kullanılabilir genişliğine uydurmak; yalnızca nowrap ekleyerek yatay taşma oluşturmamak.

Geçen kontroller:
- Mevcut reklam/satın alma testleri: satın alma kuyruğu, bekleyen ödeme, sahipliği koruma, onay akışı, gizlilik değişiklikleri, yükleme/gösterim hataları, 15 işlem + 5 dakika sınırı.
- 2, 3 ve 8 oyuncuyla 10 modda 30 tur / 759 karışık kart çekme, pas ve gizleme işlemi. Oyuncu sırası, seçilen partner, tamamlanan/atlanan/gizlenen sayıları ve kişi bazında özetler beklenen değerlerle eşleşti.
- 12 dilde menü, oyuncular, modlar, mağaza ve geri bildirim ekranları kontrol edildi. Avatar sırasının yatay kaydırılması kasıtlı olduğundan hata sayılmadı.
- Başlık düzeni 320, 360 ve 390 piksel genişliklerde ayrı ayrı ölçüldü.
- Yeni tarayıcı denemelerinde JavaScript çalışma zamanı hatası oluşmadı.

Sınırlar:
Reklamlar ve satın alma servisleri taklit edilerek kontrollü hata/geri tuşu senaryoları çalıştırıldı. Gerçek ödeme yapılmadı ve canlı reklam istenmedi. Bu sonuçlar gerçek cihazda Google servislerinin veya AdMob hesabının durumunu doğrulamaz. Bir hata taraması tüm olası hataların bulunmuş olduğunu garanti etmez.
