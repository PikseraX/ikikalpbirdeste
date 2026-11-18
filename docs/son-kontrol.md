18 Kasım 2026 — İki Kalp Bir Deste güncel kontrol sonucu

Sürüm: 1.0.11 / kod 12. Son taramadaki üç bulgu giderildi; sürüm adı ve kodu değiştirilmedi.

Son üç düzeltme:
1. Google Play satın alma onayı (acknowledgePurchase) geçici hata verirse yeniden deneniyor. Sahiplik sorgusu başarılı olsa da bekleyen onay bilgisi ve deneme sınırı korunuyor. 5, 15, 30, 60 ve 120 saniyelik gecikmelerle en fazla beş tekrar yapılıyor. Doğrulanmış haklar açık kalıyor; onay tekrarı yeni ödeme başlatmıyor. Uygulama açılışında Google Play kayıtlarından onaysız satın alımlar yeniden sorgulanıyor.
2. Mağaza fiyatı sorgusu başarısız olduğunda mağaza açıkken sınırlı yeniden deneme yapılıyor. Bağlantı geri geldiğinde, uygulamaya dönüldüğünde ve manuel geri yüklemede fiyatlar yenileniyor. Kapalı mağaza sürekli sorgu yapmıyor; aynı anda gelen istekler birleştiriliyor. Native işlemler sırayla çalışmaya devam ediyor.
3. Özel kart süreleri için Çince tam genişlikli virgül, Almanca sıfat biçimleri, Yunanca çekimler ve İngilizce/Fransızca bir saniyelik görev ifadeleri destekleniyor. Bu işlem yalnızca süreyi çözümler; kaydedilen kart metnini değiştirmez. Sıra sayıları, negatif değerler ve ayrı görevlerin süreleri için önceki korumalar test edildi.

Korunan önceki düzeltmeler:
- Ödeme sonrası sahiplik sorgusunun sınırlı otomatik tekrarı ve bilinen hakların korunması.
- 12 dilde doğal veya manuel oyun sonunda Android geri tuşuyla ana menüye dönme; reklam molası önceliği.
- 12 dilde birleşik dakika/saniye süreleri ve çalışan 90 saniyelik özel kart sayaçları.
- Partner isimleri, 88 kartta cinsiyetten bağımsız hitaplar ve eski çevirilerle kaydedilmiş gizli kartların taşınması.
- İki satırlı başlık, kalbin boyutu/konumu, üç tema, küçük ekran yerleşimi ve azaltılmış hareket tercihi.
- Android cihaz testindeki uygulama kimliği.

Doğrulama:
- Üç yeni hata düzeltme öncesi eski kaynaklarla tekrar üretildi. Düzeltmelerden sonra hedefli testlerin tamamı geçti.
- Tam npm test zinciri başarılı (çıkış kodu 0): regression.cjs, audit-regression.cjs, four-fixes.cjs, november-fixes.cjs, purchase-summary-fixes.cjs, review-fixes-nov18.cjs.
- 12 dil × 10 mod, dil başına 306 kart, isim yerleştirme, sayaçlar, gizleme, kategori seçimi, oyun sonu, tekrar oynama, uzun metinler ve küçük ekran kontrolleri geçti.
- İki üründe başarısız onay, hakların korunması, aynı ödeme için yeni satın alma başlatılmaması, deneme sınırı, başarılı onaydan sonra durma, uygulamanın yeniden açılması, iade edilmiş satın alım ve iki ürünün yalnızca birinde onay hatası test edildi.
- Devam eden native ödeme sırasında tekrarların ertelenmesi, iptal edilen ödemenin hak açmaması ve reklamsız satın alımın onay beklerken de reklamları kapatması test edildi.
- Mağazanın zamanlanmış tekrar, online, resume ve manuel geri yükleme ile toparlanması; kapalı mağazanın sorgu yapmaması ve çakışan olayların birleştirilmesi geçti.
- Altı dilde sorunlu özel kartlar arayüzden eklendi. Partner adı, sayaç düğmesi ve 1/20/30 saniyelik sürelerin doğru zamanda bitmesi doğrulandı.
- Önceki satın alma, reklam 15 işlem/5 dakika koşulları, reklam molasında geri tuşu, başlık, tema ve çeviri kontrolleri geçti.
- npx --no-install cap sync android başarılı.
- :app:bundleRelease ve :app:lintRelease başarılı. Lint: 0 hata, 12 mevcut bakım uyarısı (manifest sırası, gereksiz SDK koşulu, kullanılmayan kaynaklar ve ikon düzeni).
- 34 web dosyası, Android kopyaları ve imzalı AAB içeriği birebir eşleşiyor.
- İmza doğrulandı; yükleme sertifikası önceki paketle aynı. bundletool doğrulaması geçti; applicationId pikserax.ikikalpbirdeste, versionCode 12, versionName 1.0.11.

Reklam, ödeme ve Android sistem olayları otomatik testlerde kontrollü servis taklitleriyle çalıştırıldı; gerçek ödeme, iade veya canlı reklam sunumu denenmedi. Bu turda fiziksel cihaz testi yapılmadı. Süre algılama belirli dil kalıplarını destekler; olası tüm serbest metin ifadeleri için genel bir dil çözümleyicisi değildir.

Yayın dosyası: android/app/release/app-release-v1.0.11.aab
Boyut: 7586073 bayt
SHA-256: 252f0b2e5f8d71cfa600ddda221c9bc697e21930c863b11917d6e74220326dc9
Sürüm notları: android/app/release/surum-notlari-v1.0.11.txt (422 karakter; tr-TR etiketleri hariç).
Sürüm kodu ve adı değiştirilmedi. Play Console'a yükleme yapılmadı.

Son düzeltmeler öncesi rapor: docs/yeni-hata-taramasi-2026-11-17.md
Önceki düzeltmelerin tarihsel kayıtları: docs/oynayarak-inceleme-2026-11-17.md, docs/bastan-test-2026-11-16.md, docs/yeni-hata-taramasi-2026-11-16.md
Bu düzeltmenin yedeği, test ve derleme çıktıları: C:/Users/akcak/AppData/Local/Temp/ikbd-nov18-fixes-E6Pzg1
Önceki iki düzeltmenin yedeği: C:/Users/akcak/AppData/Local/Temp/ikbd-purchase-summary-fixes-zipj4x


Yayın öncesi son kontrol — 18 Kasım 2026

Sonuç: Bu kontrollerde yeni hata tespit edilmedi. Oyun kaynakları ve imzalı AAB değiştirilmedi; yukarıdaki SHA-256 değeri aynı kaldı.
- Tam altı betiklik npm test zinciri bu kez imzalı AAB'den çıkarılan oyun dosyaları üzerinde çalıştırıldı; çıkış kodu 0. Paket 36 web dosyası içeriyor (34 kaynak dosyası ve Capacitor'ın iki yardımcı dosyası).
- 12 dil, 306 kart/dil, 10 mod, partner isimleri, sayaçlar, oyun sonu, gizleme, satın alma, reklam ve hata sonrası toparlanma senaryoları geçti.
- Android :app:bundleRelease, :app:lintRelease ve :app:testReleaseUnitTest başarılı. Mevcut tek örnek birim testi geçti; oyun davranışı doğrulaması tarayıcı regresyon testlerine dayanıyor. Lint: 0 hata, 12 mevcut bakım uyarısı.
- İmza bilgileri hariç imzalı paket ve güncel Android derlemesindeki 571 dosyanın içerikleri aynı. 34 kaynak web dosyası Android kopyası ve AAB ile aynı.
- İmza ve önceki yükleme sertifikası eşleşmesi tekrar doğrulandı; bundletool validate başarılı.
- Paket kimliği pikserax.ikikalpbirdeste; versionCode 12, versionName 1.0.11, minSdk 24, targetSdk 36. Paket debug/testOnly olarak işaretli değil.
- Native AdMob, App ve NativePurchases eklenti kayıtları mevcut. Normal reklam modu ve sağlanan canlı reklam kimlikleri pakette doğru.
- 320×640 görünümde İngilizce/Geleneksel Çince ana menü ve Almanca mod seçimi görsel olarak kontrol edildi. İki satırlı başlık ve kalp doğru; kaydırma sonrası dil seçimi ve oyunculara dönüş düğmesi 50 px reklam alanının üzerinde erişilebilir.
- Sürüm notları 422 karakter ve tr-TR biçiminde.

Satın alma/reklam senaryoları servis taklitleriyle sınandı; gerçek ödeme, iade, canlı AdMob sunumu ve fiziksel Android cihazı bu doğrulamaya dahil değil.
Son kontrol çıktıları ve ekran görüntüleri: C:/Users/akcak/AppData/Local/Temp/ikbd-final-check-l5aoVk
