Durum — 17 Kasım 2026: Aşağıdaki dört bulgu düzeltildi. Birleşik süreler 12 dilde 90 saniye olarak doğrulandı; beş dilde 88 kartın hitabı düzenlendi ve eski gizleme tercihleri korundu; üç tema tüm ekranlarda uygulanıyor; Android cihaz testinin paket adı düzeltildi. npm test dört dosyayla tamamen geçti. Android bundleRelease, lintRelease ve cihaz testi Java derlemesi başarılı. Lint: 0 hata, 12 mevcut uyarı. Fiziksel cihaz üzerinde cihaz testi çalıştırılmadı.

İmzalı yükleme paketi aynı sürüm numarasıyla yenilendi: 1.0.11 / kod 12.
AAB SHA-256: cb3f118fa7ed8644a09a7e6d3693c8c2b65519079dde19a05263e4b4cfc820b0

Aşağıdaki bölüm düzeltme öncesindeki inceleme kaydıdır.

---

16 Kasım 2026 — Baştan oyun kontrolü

İncelenen proje: C:\Users\akcak\OneDrive\Projects\Iki Kalp Bir Deste
Sürüm: 1.0.11 / sürüm kodu 12.
Bu incelemede oyun kaynakları, Android uygulama kaynakları ve yükleme paketi değiştirilmedi. Bu rapor eklendi.
Sonuç: 3 kullanıcıya yansıyan sorun ve 1 Android test dosyası hatası doğrulandı. Koşulan senaryolarda yeni bir çökme veya oyun sonuna ulaşmayı engelleyen hata görülmedi.

**1. [P2] Özel kartta birleşik süre eksik hesaplanıyor.**

Tekrar üretme: Kartlarım ekranında “Partnerine 1 dakika 30 saniye sarıl.” kartını ekle. Romantik modunda yalnızca Kendi türünü açık bırak, oyunu başlat ve kartı çek.
Beklenen: 1:30 (90 saniye).
Görülen: “Hasan’a 1 dakika 30 saniye sarıl.” yazmasına rağmen sayaç “1:00 – Başlat” gösteriyor.
Aynı sorun İngilizce “Hug {partner} for 1 minute 30 seconds.” ve Japonca “{partner}と1分30秒ハグする。” kartlarında da tekrarlandı.
Neden: sureBul ilk bulduğu süreyi hemen döndürüyor; bitişik dakika ve saniye bileşenlerini toplamıyor.
Kaynak: [ozellikler.js:46](<C:/Users/akcak/OneDrive/Projects/Iki Kalp Bir Deste/www/ozellikler.js:46>) ve aynı dosyanın 56. satırındaki Japonca/Çince dalı.
Kapsam: Bu örnekler kullanıcı tarafından eklenen kartlar. Hazır 306 kartın süre testleri geçti.
Düzeltme yönü: Tek süreyi oluşturan bitişik birimleri toplamak; farklı görev cümlelerindeki süreleri yanlışlıkla birleştirmemek.

**2. [P3] Bazı çeviriler kadın oyuncuya erkek çekimiyle hitap ediyor.**

Tekrar üretme: İlk oyuncu Ece / Kadın, ikinci oyuncu Hasan / Erkek olarak kaydedildi. Aşağıdaki hazır kartlar Ece'nin sırasında gösterildi. Kart dizisinin ilgili özgün elemanı tek kartlık deste yapılarak rastgele sıra testten çıkarıldı; metin değiştirilmedi.
Doğrulanan örnekler (kart sıra numaraları 1'den başlar):
- İtalyanca, Romantik 18: “Confessa quanto eri emozionato al tuo primo appuntamento con Hasan.” Buradaki “emozionato” erkek biçimi.
- Portekizce, Romantik 18: “Confesse o quanto ficou nervoso no seu primeiro encontro com Hasan.” Buradaki “nervoso” erkek biçimi.
- Rusça, Romantik 18: “Признайся, как сильно ты волновался на первом свидании с игроком «Hasan».” Buradaki “волновался” kartı okuyan oyuncuyu erkek olarak ifade ediyor.
- Yunanca, Eğlenceli 30: “Παραδέξου κάτι που έκανες μικρός και σε κάνει ακόμα να γελάς.” Buradaki “μικρός” erkek biçimi.
- İspanyolca, Eğlenceli 30: “Confiesa algo que hacías de niño y que todavía te hace reír.” Kadın okuyucu için de “de niño” kalıyor.

Bu bulgu partner adının kaybolması değil; örneklerde Hasan adı doğru yerleştiriliyor. Sorun kartı okuyan oyuncuya hitap eden fiil/sıfatların çekimi. Bu liste doğrulanan örneklerdir, etkilenen bütün kartların sayımı değildir.
Kaynaklar: [dil.js:1128](<C:/Users/akcak/OneDrive/Projects/Iki Kalp Bir Deste/www/dil.js:1128>), aynı dosyada 1215 ve 1276; [Yunanca:49](<C:/Users/akcak/OneDrive/Projects/Iki Kalp Bir Deste/www/dil-kartlar-el.js:49>); [İspanyolca:57](<C:/Users/akcak/OneDrive/Projects/Iki Kalp Bir Deste/www/dil-kartlar-es.js:57>).
Düzeltme yönü: İlgili cümleleri cinsiyet belirtmeyen doğal ifadelerle yeniden yazmak. Hem dil paketleri hem ad yerleştirme şablonları birlikte ele alınmalı.

**3. [P3] Gece ve Pembe temada menü dışındaki arka plan mor kalıyor.**

Tekrar üretme: Menüde Gece veya Pembe temayı seç, Oyuna Başla ile oyuncular ekranına geç.
Görülen: Düğmeler ve oyuncu kutuları seçilen temaya uyuyor; ekranın genel arka planı değişmiyor.
Ölçüm: Gece temasında --bg #0b1220, Pembe temasında #2a1020 olduğu halde body arka planı iki durumda da rgb(26,16,37), yani #1a1025.
Neden: tema.css'ten sonra gelen satır içi body stili background:#1a1025 değerini yeniden tanımlıyor.
Kaynak: [index.html:20](<C:/Users/akcak/OneDrive/Projects/Iki Kalp Bir Deste/www/index.html:20>) ve [tema.css:5](<C:/Users/akcak/OneDrive/Projects/Iki Kalp Bir Deste/www/tema.css:5>).
Düzeltme yönü: Genel arka planı --bg değişkeninden almak.

**4. [P3 / Test altyapısı] Android cihaz testinin beklediği paket adı yanlış.**

ExampleInstrumentedTest, appContext.getPackageName() değerinin com.getcapacitor.app olmasını bekliyor. Uygulamanın applicationId değeri pikserax.ikikalpbirdeste.
Bu test cihazda çalıştırıldığında uygulama doğru kurulmuş olsa da paket adı doğrulaması başarısız olur. Kullanıcının oyun çalışmasını veya AAB üretimini etkilemez.
Kaynak: [ExampleInstrumentedTest.java:24](<C:/Users/akcak/OneDrive/Projects/Iki Kalp Bir Deste/android/app/src/androidTest/java/com/getcapacitor/myapp/ExampleInstrumentedTest.java:24>) ve [build.gradle:7](<C:/Users/akcak/OneDrive/Projects/Iki Kalp Bir Deste/android/app/build.gradle:7>).
Doğrulama: Kaynaklarda iki sabit karşılaştırıldı. Bu tur cihaz üzerinde connectedAndroidTest çalıştırılmadı.

**Tamamlanan kontroller**

- npm test: Başarılı; tests/regression.cjs, tests/audit-regression.cjs ve tests/four-fixes.cjs.
- 12 dil × 10 mod; 12 dilde 306'şar hazır kart çekimi (3.672 kart), partner adları, kart gizleme/geri açma, kategori seçimi, oyun sonu ve yeniden başlatma.
- Her dilde 56 hazır süreli kart; özel kart süreleri, duraklatma/devam, süre bitişi, ekrandan ayrılınca durdurma.
- Ek olarak 12 dilde süre bitişinde bir titreşim isteği ve iki ses notası; yeniden başlatıldığında yeniden uyarı, menüye geçildiğinde yeni uyarı olmaması.
- Gerçek arayüz işlemleriyle oyuncu adları/cinsiyetleri, partner filtresi, seçilen partner, avatar, tema tercihi ve özel kart kayıtlarının yeniden yükleme/dil değişimi sonrası korunması. Seçilen partner silindiğinde geçerli oyuncuya dönüş.
- 11 yabancı dilde 306'şar kart: eksik/boş kart, Türkçe kaynakla aynı kalmış tam kart veya bozuk Unicode karakteri bulunmadı. Otomatik süre ayrıştırıcısının okuyabildiği hazır kartlarda zaman eşleşmezliği çıkmadı. Bu kontrol tüm çevirilerin dilbilgisel olarak kusursuz olduğu anlamına gelmez; 2. bulgudaki hitap hataları ayrıca saptandı.
- Küçük ekranlar, uzun oyuncu adları, reklam alanı, Doğruluk/Cesaret seçim çubuğu, azaltılmış hareket, 12 dilde toplam 60 başlık genişliği kontrolü.
- Satın alma/geri yükleme/iptal/bekleyen ödeme/iade; sahiplik sorgusu başarısızlığı ve otomatik tekrar; reklam kaldırma; onay/gizlilik; 15 işlem ve 5 dakika koşulu; reklam yükleme hataları; mola sırasında geri tuşu.
- Android :app:lintRelease --offline --no-daemon: BUILD SUCCESSFUL. 0 hata, 12 uyarı: 7 kullanılmayan kaynak, 3 ikon kaynağı, 1 manifest sırası, 1 ObsoleteSdkInt. Gradle deprecation/flatDir bildirimleri de mevcut.
- JavaScript dosyaları ve satır içi script sözdizimi: hata yok.
- www içindeki 34 dosya Android assets/public kopyalarıyla birebir aynı.
- Mevcut AAB değişmedi: android/app/release/app-release-v1.0.11.aab; 7.558.251 bayt.
- AAB SHA-256: 7ac73bd1c207677beda4f43d57c6f0ded6912ba9bc34ee838714c9b79495857b.

**Test ortamı ve kanıtlar**

Tarayıcı kontrolleri Edge/Playwright ile yapıldı. Android satın alma ve reklam servisleri kontrollü taklitlerle sınandı; gerçek ödeme, gerçek reklam doluluğu veya fiziksel cihazdaki Google Play işlemi yapılmadı. Ses/titreşim için cihaz donanımı yerine ilgili API çağrıları sayıldı.

Ek test sonuçları ve ekran görüntüleri:
C:\Users\akcak\AppData\Local\Temp\ikbd-fresh-audit-ghZKFU
- results.json: tema, birleşik süre ve 12 dilde ses/titreşim.
- persistence-locales.json: kayıt ve dil paketi kontrolleri.
- gender-wording.json: kadın okuyucu için beş dilde görülen gerçek kart metinleri.
- source-checks.json: dosya eşitliği, AAB özeti ve test paketi uyuşmazlığı.
- night-theme-players.png, compound-duration-tr.png, female-reader-italian.png.
- rendered-*.json: dil başına ham ve oyuncu adı yerleştirilmiş 306 kart metni.

Tam test çıktısı: C:\Users\akcak\AppData\Local\Temp\ikbd-fresh-audit-npm-20261116.log
Android denetimi: C:\Users\akcak\AppData\Local\Temp\ikbd-fresh-audit-lint-20261116.log
