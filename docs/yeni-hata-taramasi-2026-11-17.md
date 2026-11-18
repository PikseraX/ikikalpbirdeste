# Yeni hata taraması — 17 Kasım 2026

**Durum — 18 Kasım 2026:** Aşağıdaki üç bulgu giderildi. Yeni regresyon testleri, tam test zinciri ve Android derlemesi başarılı. İmzalı 1.0.11 / kod 12 paketi güncellendi. Güncel sonuçlar: [son-kontrol.md](son-kontrol.md). Aşağıdaki metin düzeltme öncesi incelemenin tarihsel kaydıdır.

İncelenen sürüm: **1.0.11 / kod 12**. Bu turda üç yeni bulgu tekrar üretildi. Oyun kaynakları ve AAB değiştirilmedi.

## 1. Başarısız satın alma onayı yeniden denenmiyor — P2

**Koşul:** Satın alma tamamlanmış ve sahiplik sorgusu başarılı, ancak Google Play'e satın alımın işlendiğini bildiren `acknowledgePurchase` çağrısı geçici hata veriyor. Native eklentinin otomatik onayı da bu geçici sorunu giderememiş olmalı.

**Gözlem:** Uygulama “Satın alma tamamlandı” mesajını gösteriyor ve hakkı açıyor. Onay hatası yakalanıp yok sayılıyor; onay için yeniden deneme planlanmıyor. Servis düzeltilip sanal saat 10 dakika ilerletildiğinde onay denemesi 1'de, `isAcknowledged` false durumunda kaldı. Uygulamaya dönüş olayı gönderilince yeni sorgu/onay çalıştı ve onay tamamlandı. Hem `tum_modlar` hem `reklam_kaldir` ürününde doğrulandı.

**Kaynak:** [satinalma.js](../www/satinalma.js), satır 160–164. Satır 161'de onay hatası boş catch ile yutuluyor; ardından `uygula` yeniden deneme durumunu temizliyor. Native eklenti de otomatik onay yanıtındaki hatayı kaydediyor, bu yol için zamanlanmış tekrar yapmıyor: `NativePurchasesPlugin.java`, satır 482–501. Elle çağrılan onay metodu satır 1481–1515'te başarısız sonucu JS'e hata olarak iletiyor.

**Etki:** Kullanıcı başarılı mesajı görürken Google Play'e verilmesi gereken onay eksik kalabiliyor. Google, satın alım onayının üç gün içinde tamamlanmasını istiyor; tamamlanmaması otomatik iade ve hakkın kaldırılması sonucunu doğurabilir. Gerçek bir iade gözlemlenmedi; burada doğrulanan hata, başarısız onayın kendi kendine tekrar denenmemesidir. [Google Play onay gereksinimi](https://developer.android.com/google/play/billing/integrate?hl=en#notify-google).

**Öneri:** Sahiplik sorgusu ile onay durumunu ayrı takip et; onayı başarısız satın alımları kaybetmeden, bilinen hakları koruyarak sınırlı ve aralıklı tekrar uygula. Geçici hatalar için onay tekrarları Google'ın önerdiği akışla da uyumludur. [Google Play hata ve yeniden deneme rehberi](https://developer.android.com/google/play/billing/errors?hl=en).

Bu, önceki düzeltmedeki `getPurchases` sorgu hatasından farklı bir API aşamasıdır.

## 2. Ürün fiyatı yükleme hatasından sonra mağaza toparlanmıyor — P3

**Tekrar üretme:**

1. Uygulama açılışındaki sahiplik kontrolü başarılı olsun.
2. Satın alımlar ekranını açarken `getProducts` çağrısında bir kez geçici hata üret.
3. Servisi düzelt; internet bağlantısının geri gelmesi ve uygulamaya dönüş olaylarını gönder.
4. Mağazada kal ve 10 dakika bekle; ardından “Satın alımlarımı geri yükle” düğmesine dokun.

**Gözlem:** Ürün sorgusu bir kez yapılmış olarak kalıyor. İki satın alma düğmesi de “Şu an alınamıyor” durumunda kapalı kalıyor. Geri yükleme de fiyatları tekrar istemiyor. Mağazadan çıkıp yeniden girince ikinci ürün sorgusu başarılı oluyor ve düğmeler açılıyor. Türkçe, İngilizce ve Japoncada doğrulandı.

**Kaynak:** [satinalma.js](../www/satinalma.js), `fiyatYukle` satır 102–116, bağlantı işleyicisi satır 31–34 ve `magazaAc` satır 118–125.

**Etki/öneri:** Geçici ağ hatası, aynı ekranda kalındığı sürece ürün satın alınamıyormuş gibi görünüyor. Fiyat sorgusuna sınırlı tekrar veya görünür bir yeniden deneme düğmesi eklenmeli; uygun bağlantı/uygulamaya dönüş olaylarında açık mağazanın fiyatları yenilenmeli.

## 3. Bazı geçerli özel kart süreleri algılanmıyor — P2

Kartlarım ekranından aşağıdaki metinlerle özel kartlar eklendi, yalnızca “Kendi” türü seçilip oyun başlatıldı. Kartlarda partner adı doğru yerleşti ancak süre 0 hesaplandı ve sayaç düğmesi görünmedi. Her örnek için çalışan bir karşılaştırma kartı da denendi.

| Dil | Algılanmayan ifade | Beklenen süre | Çalışan karşılaştırma |
| --- | --- | --- | --- |
| Basitleştirilmiş Çince | `请抱住{partner}，30秒后松开。` | 30 saniye | Virgülden sonra boşluk eklemek |
| Geleneksel Çince | `請擁抱{partner}，30秒後放開。` | 30 saniye | Virgülden sonra boşluk eklemek |
| Almanca | `20-sekündige Rede` | 20 saniye | `20 Sekunden` |
| Yunanca | `20 δευτερολέπτων` | 20 saniye | `20 δευτερόλεπτα` |
| İngilizce | `Hug {partner} for a second and smile.` | 1 saniye | `for 1 second and smile` |
| Fransızca | `Regarde {partner} pendant une seconde en souriant.` | 1 saniye | `pendant 1 seconde en souriant` |

**Kaynak:** [ozellikler.js](../www/ozellikler.js), `sureBul`: birim biçimleri satır 30–31, sıra sayısını süreden ayıran koşul satır 35–42, CJK sayı sınırı satır 69.

**Neden:** Çince tam genişlikli virgül normalleştirilince sayı öncesinde yasaklanan virgüle dönüşüyor. Almanca sıfat biçimi ve Yunanca çekimli birim biçimi tanınmıyor. İngilizce/Fransızca bir saniyelik sürelerin devamındaki bazı ifadeler sıra sayısı sanılıyor.

**Kapsam/öneri:** Bu bulgu kullanıcıların eklediği özel kartlarla ilgilidir. Hazır kartlarda ayrı süre eşlemesi bulunuyor; ham metni tanımayan parser sonuçları hazır kartlarda sayaç kaybı olarak sayılmadı. Parser, bu geçerli örnekleri kabul ederken “ikinci soru” gibi sıra sayılarını, negatif değerleri ve ayrı görev cümlelerini ayırmaya devam etmeli.

## Diğer kontroller ve sınırlar

- 4 dil × 3 ekran boyutu × 7 ekran = **84 yerleşim kontrolü** geçti. Boyutlar: 320×480, 360×640, 740×360; oyuncu ekranında 8 oyuncu ve uzun isimler kullanıldı. Başlık erişimi, yatay taşma ve son düğmeye ulaşma kontrol edildi.
- 11 çeviri paketinin her birinde **306 kart** bulundu. Süre ifadeleri Türkçe asıllarıyla karşılaştırıldı. Yazıyla verilen sayılar gibi ham parser sınırlamaları, tek başına çeviri hatası sayılmadı.
- 6 dilde bozuk/çalışan örnek çiftiyle toplam **12 özel kart arayüz denemesi** yapıldı.
- İki satın alma ürününde onay hata senaryosu; üç dilde fiyat hata senaryosu denendi. Bu denemelerde JavaScript çalışma zamanı hatası oluşmadı.
- AdMob 8.3.0 paketinin önbellekteki orijinal arşiv bütünlüğü kilit dosyasıyla doğrulandı; 10 Android Java kaynağı kurulu kopyayla aynı çıktı. Kaybolabilecek yerel paket değişikliği bulunmadı.
- Ödeme ve native yaşam döngüsü olayları kontrollü taklitlerle sınandı; gerçek ödeme, iade veya canlı reklam işlemi yapılmadı. Fiziksel Android cihazında ayrıca test yapılmadı.
- Son düzeltmede çalıştırılan geniş test paketi bu taramada yeniden bütünüyle çalıştırılmadı; burada yeni sınır koşullarına odaklanıldı.
- Onay hatasını yutan kod, fiyat yükleme işlevi ve özel kart parser'ı son iki düzeltmeden önce de aynıydı. Bu üç bulgu son iki düzeltme sırasında eklenmedi.
- Tarama öncesi/sonrası **34 web dosyası** aynı. AAB SHA-256 değişmedi: `df06a240916a2c7220e646574fbf2d1754e6157abedcaa1f434c898794c9cb0a`.

## Kanıtlar

Geçici test dizini: `C:/Users/akcak/AppData/Local/Temp/ikbd-new-audit-Uhs9Zn`.

- `results.json`: onay, fiyat ve 84 yerleşim denemesi
- `custom-timer-results.json`: 6 dilde arayüz sonuçları
- `custom-timer-bad-zh-TW.png`, `custom-timer-good-zh-TW.png`: aynı Çince kartta boşluk farkıyla sayaç görünürlüğü
- `prices-after-recovery.png`: servis düzeldikten sonra kapalı kalan satın alma düğmeleri
- `duration-language-check.json`: ham süre metni incelemesi; buradaki her fark uygulama hatası değildir
- `admob-package-comparison.json`: paket kaynak karşılaştırması
- `source-verification.json`: kaynak ve AAB bütünlüğü
