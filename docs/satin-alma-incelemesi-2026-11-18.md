# Satın alma incelemesi — 18 Kasım 2026

Güncel kaynaklar ve kurulu @capgo/native-purchases 8.9.6 Android uygulaması incelendi. Gerçek Google Play ödemesi yapılmadı. Oyun kodları, eklenti kaynakları ve AAB değiştirilmedi.

**Sonuç:** Önceden düzeltilen iki sorun güncel kaynaklarda giderilmiş durumda. Ek incelemede çoklu fiyat teklifi için koşullu bir tutarsızlık doğrulandı. Mevcut Play Console ürünlerinin çoklu teklif kullanıp kullanmadığı bu incelemede doğrulanmadı.

## 1. Çoklu teklifin fiyatı gösteriliyor ancak teklif kimliği ödemeye aktarılmıyor — P2, koşullu

Aynı ürün için birden fazla satın alma seçeneği/indirim teklifi döndüğünde satinalma.js:255 her kayıtla önceki ürünü üzerine yazar. Son teklifin priceString değeri düğmede gösterilir. satinalma.js:383 satın alma isteğine yalnızca productIdentifier, productType ve quantity ekler; seçilen offerToken gönderilmez.

Kurulu Android eklentisi her teklif için aynı ürün kimliğiyle ayrı kayıt üretir (NativePurchasesPlugin.java:1168, ProductPayloadMapper.java:47). Ödeme sırasında offerToken varsa eşleşen teklifi seçer; yoksa varsayılan teklife veya uygun dalda ilk teklife döner (NativePurchasesPlugin.java:719, 843–863). Bu nedenle ekranda görünen son teklif ile ödemeye seçilen teklif aynı olmak zorunda değildir.

Tekrar üretim: Her iki ürün için tek teklif ve iki teklif durumları ayrı çalıştırıldı. İlk teklif €4.99 / base-offer; ikinci teklif €1.99 / promo-offer. Çoklu durumda düğmede €1.99 göründü, fakat yakalanan purchaseProduct isteğinde offerToken bulunmadı. Tek teklif kontrolü de çalıştı. Bu fiyatlar yalnızca test verisidir; gerçek ürün fiyatları değildir.

Etki: Çoklu teklif kullanılıyorsa oyuncu oyun içinde gördüğünden farklı bir fiyatı Google Play ödeme ekranında görebilir veya teklif seçimi nedeniyle ödeme başlatılamayabilir. Bu çalışma gerçek ödeme tutarını veya fazla/çift ücret alındığını doğrulamıyor.

Düzeltme yönü: Görüntülenen teklif bilinçli seçilmeli ve aynı kaydın offerToken değeri satın alma çağrısına aktarılmalı. Teklif geçersizleşirse ürünler yenilenmeli; farklı fiyatlı teklife sessiz geçiş yapılmamalı. Google da satın alma akışı oluştururken teklif belirtecini geçirir: [resmi entegrasyon rehberi](https://developer.android.com/google/play/billing/integrate#launch).

## 2. Yerel yayın paketi güncel satın alma kodunu içermiyor

android/app/release/app-release-v1.0.11.aab içindeki base/assets/public/satinalma.js okundu. ITEM_ALREADY_OWNED işlemesi ve eksik ürün fiyatı için tekrar düzeltmesi bu pakette bulunmuyor. Güncel www ve Android kaynaklarında mevcutlar. Bu AAB yüklenirse bu iki düzeltme yayınlanmış olmaz. Play Console’daki mevcut kurulumun durumu bu yerel dosya incelemesinden çıkarılamaz.

## Geçen kontroller ve sınırlar

- Bu tur node tests/regression.cjs --native çalıştı, çıkış 0: satın alma/geri yükleme/onay sıralaması, iptal, bekleyen ödeme, hakların korunması, gizlilik, reklam kaldırma ve reklam koşulları geçti.
- Bir önceki tam taramadaki 62 PASS sonucu ve son iki düzeltmenin özel testleri mevcut; bu incelemede aynı tam zincir yeniden çalıştırılmadı.
- Kurulu Google Billing 9.1.0 kodunun hata bildirim yolu incelendi. Normal ödeme başlatma hatalarını dinleyiciye ilettiği görüldüğünden, dönüş değerinin yalnızca loglanması tek başına doğrulanmış bir kilitlenme hatası olarak raporlanmadı.
- Native geri yüklemenin asenkron tamamlanması da incelendi; fiziksel cihazda bir çökme doğrulanmadı ve olasılık kesin hata olarak listelenmedi.
- Sonuçlar yerel kaynak, eklenti incelemesi ve kontrollü tarayıcı testlerine dayanır. Canlı ürün ayarları, gerçek ödeme, banka tahsilatı ve fiziksel Android cihazı doğrulanmadı.

Kanıtlar: C:/Users/akcak/AppData/Local/Temp/ikbd-billing-audit-UYecJo
- offer-audit.cjs, offer-results.json: dört fiyat/teklif senaryosu ve yakalanan ödeme parametreleri
- bundle-check.json: AAB içindeki düzeltmelerin kontrolü
- before.json: kaynak ve AAB bütünlük özetleri
- billing-bytecode.txt: kurulu SDK hata yolu incelemesi


**19 Kasım 2026 düzeltmesi:** Çoklu teklif/fiyat eşleşmesi giderildi ve imzalı 1.0.11 / kod 12 AAB yeniden üretildi. Bu rapordaki eski paket durumu tarihsel kayıttır. Güncel doğrulama: docs/son-kontrol.md son bölümü.
