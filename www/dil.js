/* Dil seçimi ve arayüz metinleri. Kart desteleri locale kart paketlerinde tutulur. */
(function () {
  "use strict";
  var d = document;
  var DILLER = [
    { kod: "tr", ad: "Türkçe", aktif: true },
    { kod: "en", ad: "English", aktif: true },
    { kod: "de", ad: "Deutsch", aktif: true },
    { kod: "fr", ad: "Français", aktif: true },
    { kod: "it", ad: "Italiano", aktif: true },
    { kod: "es", ad: "Español", aktif: true },
    { kod: "pt", ad: "Português", aktif: true },
    { kod: "ru", ad: "Русский", aktif: true },
    { kod: "ja", ad: "日本語", aktif: true },
    { kod: "el", ad: "Ελληνικά", aktif: true },
    { kod: "zh-CN", ad: "简体中文", aktif: true },
    { kod: "zh-TW", ad: "繁體中文", aktif: true }
  ];
  var UI = {
    en: {
      "Kart çek, görevi yap, birlikte eğlen.":
        "Draw a card, do the challenge, and have fun together.",
      "Oyuna Başla": "Start Game",
      "💬 Geri bildirim": "💬 Feedback",
      "Geri bildirim": "Feedback",
      "Kimler oynuyor?": "Who’s playing?",
      "＋ Yeni oyuncu ekle": "＋ Add player",
      "Devam Et": "Continue",
      "← Geri": "← Back",
      "Bir mod seç": "Choose a mode",
      "← Oyunculara dön": "← Back to players",
      "İstemediğin türü kapat. Her kartta Pas Geç de var.":
        "Turn off any categories you don’t want. Every card can be skipped.",
      "🎴 Başla": "🎴 Start",
      "← Mod seçimine dön": "← Back to modes",
      "Hazır olunca kart çek 👇": "Draw a card when you’re ready 👇",
      "🎴 Kart Çek": "🎴 Draw Card",
      "← Türleri değiştir": "← Change categories",
      "Mod değiştir": "Change mode",
      "Öneri": "Suggestion",
      "Hata": "Bug",
      "Kart önerisi": "Card idea",
      "Beğendim": "I like it",
      "Önerini ya da bulduğun hatayı yaz. E-posta uygulaman hazır bir mesajla açılır, sen gönderirsin.":
        "Share an idea or report a bug. Your email app will open with a draft for you to send.",
      "Mesajını yaz…": "Write your message…",
      "📨 Gönder": "📨 Send",
      "Hepsini aç": "Enable all",
      "✅ Yaptık, Sonraki Kart": "✅ Done, Next Card",
      "Kart ": "Card ",
      " / ": " / ",
      "Tema": "Theme",
      "Cinsiyet seç": "Select gender",
      "Kadın": "Woman",
      "Erkek": "Man",
      "Belirtmek istemiyorum": "Prefer not to say",
      "Partner cinsiyeti": "Partner gender",
      "Her ikisi": "Any",
      "Partneri": "Partner",
      "Rastgele": "Random",
      "Sohbet": "Conversation",
      "Sorular": "Questions",
      "İtiraf": "Confession",
      "Tahmin": "Guessing",
      "Hareket": "Acting",
      "Yaratıcı": "Creative",
      "Meydan": "Challenge",
      "Yakınlık": "Connection",
      "Günlük": "Everyday life",
      "Sosyal": "Social media",
      "Çevre": "Family & friends",
      "Hayat": "Life",
      "Aşk": "Love",
      "Çılgın": "Wild",
      "Romantik": "Romantic",
      "Eğlenceli": "Fun",
      "Beni Ne Kadar Tanıyorsun": "How Well Do You Know Me",
      "Uzak Mesafe": "Long Distance",
      "Evde Gece": "Night In",
      "Yeni Tanışanlar": "Getting to Know You",
      "Gelecek": "Future",
      "Ok mu Nok mu": "Green or Red Flag?",
      "İkisinden Birini Seç": "This or That",
      "Duygusal ve yakın anlar": "Heartfelt moments together",
      "Oyun ve kahkaha dolu": "Games and laughs",
      "Birbirinizi ne kadar bilirsiniz?": "How well do you know each other?",
      "Görüntülü konuşarak oynayın": "Play over a video call",
      "Evde yapılacak keyifli şeyler": "Fun things to do at home",
      "Çekinmeden, hafif ve tatlı": "Easygoing, light, and sweet",
      "Hayaller, planlar, hedefler": "Dreams, plans, and goals",
      "Bu durum sizce normal mi?": "Would you consider this okay?",
      "Hangisini seçersin?": "Which would you choose?",
      "Kartı okuyan: ": "Reading the card: ",
      "Sıra: ": "Turn: ",
      "  |  Partner: ": "  |  Partner: ",
      "Cinsiyet seç.": "Select a gender.",
      "adını yaz.": "enter a name.",
      ". İsimleri ayırt edilebilir yap.": ". Use distinct names.",
      " için seçtiğin partner cinsiyetinde (":
        " has no eligible partner with the selected gender (",
      ") başka oyuncu yok. Partner cinsiyetini değiştir.": "). Change the partner gender.",
      "Seçili türlerde görev yok. Bir tür aç.":
        "There are no cards in the selected categories. Enable a category.",
      "Kodun başındaki e-posta adresi henüz değiştirilmemiş.":
        "The feedback email address has not been configured yet.",
      "İki Kalp Bir Deste geri bildirim": "Two Hearts, One Deck feedback",
      "Dürüst ol ya da cesaretini göster": "Be honest or show your courage",
      "Birlikte sayın: 3, 2, 1! Aynı anda 👍 (OK) ya da 👎 (NOK) gösterin, sonra nedenini anlatın.":
        "Count down together: 3, 2, 1! Show 👍 (OK) or 👎 (Not OK) at the same time, then explain why.",
      "İkiniz de gizlice seçin, aynı anda söyleyin ve nedenini anlatın.":
        "Choose secretly, reveal your answers at the same time, and explain why.",
      "Sıradaki oyuncu kendisi seçer. Aynı seçeneği arka arkaya 3 kez seçemezsin.":
        "The next player chooses. You can’t pick the same option three times in a row.",
      "Bu seçenekte gösterilecek kart kalmadı. Türleri değiştirebilir ya da gizlenen kartları geri açabilirsin.":
        "There are no more cards for this choice. Change categories or restore hidden cards.",
      "⏭️ Pas Geç": "⏭️ Skip",
      "Güzel oyundu! Bir sonraki oyunda görüşürüz 💜":
        "That was a lovely game! See you next time 💜",
      "Henüz hiç kart tamamlanmadı. “Yaptık” dediğin kartlar burada sayılır.":
        "No cards completed yet. Cards marked as done will be counted here.",
      "🎴 Kartlarım": "🎴 My Cards",
      "🃏 Kartlarım": "🃏 My Cards",
      "🃏 Kartlarım (kendi / gizlenen)": "🃏 My Cards (custom / hidden)",
      "✍️ Kendi kartın": "✍️ Custom card",
      "🚫 Bir daha gösterme": "🚫 Hide this card",
      "✍️ Kendi": "✍️ Custom",
      "Hepsini geri aç": "Restore all",
      "Kendi görev kartını yaz": "Write your own challenge card",
      "＋ Kart Ekle": "＋ Add Card",
      "Önce kartı yaz.": "Write a card first.",
      "Bu kart zaten var.": "This card already exists.",
      "Kart eklendi. Oyunda “Kendi” türünden gelir.":
        "Card added. It will appear under Custom in the game.",
      "En fazla 100 kart ekleyebilirsin.": "You can add up to 100 cards.",
      "Doğruluk": "Truth",
      "Cesaret": "Dare",
      " arka arkaya 2 kez Doğruluk seçti, bu sefer Cesaret.":
        " picked Truth twice in a row; choose Dare this time.",
      " arka arkaya 2 kez Cesaret seçti, bu sefer Doğruluk.":
        " picked Dare twice in a row; choose Truth this time.",
      "Doğruluk mu Cesaretlik mi": "Truth or Dare",
      "Doğruluk mu, Cesaret mi?": "Truth or Dare?",
      "Ana menü": "Main Menu",
      "🎉 Oyun Özeti": "🎉 Game Summary",
      "🏁 Oyunu bitir": "🏁 End Game",
      "🔁 Yeniden oyna": "🔁 Play Again",
      "okuyor": "is reading",
      "Tur değiştir": "Change mode",
      "İpucu: “Partnerine …” yazarsan oyun partnerin adını kendisi koyar.":
        "Tip: If you write “Tell your partner…”, the game will insert your partner’s name.",
      "↩️ Aç": "↩️ Restore",
      " – Başlat": " – Start",
      " – Durdur": " – Stop",
      "Süre doldu!": "Time’s up!",
      " sn": " sec",
      " dakika": " min",
      "En fazla ": "Up to ",
      " kart ekleyebilirsin.": " cards can be added.",
      " için cinsiyet seç.": ": select a gender.",
      " — Doğruluk mu, Cesaret mi?": " — Truth or Dare?",
      "Sıradaki:": "Next:",
      "🎨 Tema": "🎨 Theme",
      "Bu mod için hangi görev türleri gelsin?": "Choose the challenge categories for this mode.",
      "Bu oyunda": "In this game",
      "Kartı gizlendi.": "Card hidden.",
      "Kısa bir mola": "A short break",
      "Birazdan kaldığımız yerden devam ediyoruz": "We’ll continue in a moment",
      "Başlat": "Start",
      "Durdur": "Stop",
      "Görev": "Challenge",
      " görev": " challenges",
      "Yaptık": "Done",
      "Sonraki Kart": "Next Card",
      "İstemediğin türü kapat.": "Turn off any categories you don’t want.",
      " oyuncunun adı": " player’s name",
      "Kart Ekle": "Add Card",
      "Önce mesajını yaz.": "Write your message first.",
      "İsimleri ayırt edilebilir yap.": "Use distinct names.",
      "Aynı isim iki kez kullanılmış: ": "This name appears twice: ",
      "Gizlenmiş kart yok.": "No hidden cards.",
      "Henüz kendi kartın yok.": "No custom cards yet.",
      "Kart gizlendi. Geri açmak için Kartlarım › Gizlenen.":
        "Card hidden. Restore it from My Cards › Hidden.",
      "🎯 Doğruluk mu Cesaretlik mi": "🎯 Truth or Dare",
      "🧠 Beni Ne Kadar Tanıyorsun": "🧠 How Well Do You Know Me",
      "🌱 Yeni Tanışanlar": "🌱 Getting to Know You",
      "🏡 Evde Gece": "🏡 Night In",
      "✈️ Uzak Mesafe": "✈️ Long Distance",
      "💕 Romantik": "💕 Romantic",
      "🎉 Eğlenceli": "🎉 Fun",
      "✨ Gelecek": "✨ Future",
      "⚖️ İkisinden Birini Seç": "⚖️ This or That",
      "🚦 Ok mu Nok mu": "🚦 Green or Red Flag?",
      "💬 Öneri": "💬 Suggestion",
      "🐞 Hata": "🐞 Bug",
      "🃏 Kart önerisi": "🃏 Card idea",
      "❤️ Beğendim": "❤️ I like it",
      "🕒 Süre": "🕒 Duration",
      "✅ Tamamlanan": "✅ Completed",
      "⏭️ Atlanan": "⏭️ Skipped",
      "🚫 Gizlenen": "🚫 Hidden",
      "🏆 En çok gelen tür": "🏆 Most common category",
      " dk": " min",
      " kart": " cards",
      "Kartı okuyan": "Reading the card",
      "En az bir tür açık kalmalı.": "At least one category must stay enabled.",
      "Gösterilecek kart kalmadı.": "No cards left to show.",
      "Geri açmak için Kartlarım": "Restore it from My Cards",
      "Bu seçenekte gösterilecek kart kalmadı.": "There are no more cards for this choice.",
      "Bir tür aç.": "Enable a category.",
      "Partner cinsiyetini değiştir.": "Change the partner gender.",
      "Birlikte eğlen.": "Have fun together.",
      "Kendi kartın": "Custom card",
      "Satın alımlar": "Purchases",
      "🔓 Tüm modların kilidi": "🔓 Unlock all modes",
      "Ok mu Nok mu, İkisinden Birini Seç ve Doğruluk mu Cesaretlik mi modları açılır. Tek seferlik ödeme.":
        "Unlock Green or Red Flag, This or That, and Truth or Dare. One-time purchase.",
      "🚫 Reklamları kaldır": "🚫 Remove ads",
      "Tüm reklamlar kalıcı olarak kalkar: ekranın altındaki reklam ve oyun arasında çıkan tam ekran reklamlar. Tek seferlik ödeme.":
        "Permanently remove all ads, including the bottom banner and full-screen ads between games. One-time purchase.",
      "Satın alımlarımı geri yükle": "Restore purchases",
      "✅ Açık": "✅ Unlocked",
      "Bu cihazda kullanılamıyor": "Not available on this device",
      "Satın alma bu cihazda kullanılamıyor.": "Purchases aren’t available on this device.",
      "Şu an alınamıyor": "Currently unavailable",
      "Fiyat yükleniyor…": "Loading price…",
      "Satın al · ": "Buy · ",
      "Satın alma": "Purchase",
      "Satın alma işlemi": "Purchase",
      " modu kilitli. Açmak için aşağıdan satın alabilirsin.":
        " mode is locked. You can unlock it below.",
      "Teşekkürler! Satın alma tamamlandı 💜": "Thank you! Purchase complete 💜",
      "Satın alma işleniyor. Birkaç dakika sonra geri yükle düğmesine dokun.":
        "Your purchase is processing. Tap Restore Purchases in a few minutes.",
      "Google Play açılıyor…": "Opening Google Play…",
      "Satın alma iptal edildi.": "Purchase canceled.",
      "Satın alma tamamlanamadı. Daha sonra tekrar dene.":
        "The purchase couldn’t be completed. Please try again later.",
      "Kontrol ediliyor…": "Checking…",
      "Satın alımların geri yüklendi.": "Purchases restored.",
      "Geri yüklenecek bir satın alma bulunamadı.": "No purchases were found to restore.",
      "🛒 Satın alımlar": "🛒 Purchases"
    },
    de: {
      "Kart çek, görevi yap, birlikte eğlen.":
        "Zieh eine Karte, löse die Aufgabe und habt gemeinsam Spaß.",
      "Oyuna Başla": "Spiel starten",
      "💬 Geri bildirim": "💬 Feedback",
      "Geri bildirim": "Feedback",
      "Kimler oynuyor?": "Wer spielt mit?",
      "＋ Yeni oyuncu ekle": "＋ Person hinzufügen",
      "Devam Et": "Weiter",
      "← Geri": "← Zurück",
      "Bir mod seç": "Wählt einen Modus",
      "← Oyunculara dön": "← Zurück zu den Personen",
      "Bu mod için hangi görev türleri gelsin?":
        "Welche Aufgabenarten sollen in diesem Modus erscheinen?",
      "İstemediğin türü kapat. Her kartta Pas Geç de var.":
        "Deaktiviere unerwünschte Kategorien. Jede Karte kann übersprungen werden.",
      "Hepsini aç": "Alle aktivieren",
      "🎴 Başla": "🎴 Start",
      "← Mod seçimine dön": "← Zurück zur Modusauswahl",
      "Hazır olunca kart çek 👇": "Zieh eine Karte, wenn du bereit bist 👇",
      "🎴 Kart Çek": "🎴 Karte ziehen",
      "⏭️ Pas Geç": "⏭️ Überspringen",
      "← Türleri değiştir": "← Kategorien ändern",
      "Mod değiştir": "Modus ändern",
      "Öneri": "Vorschlag",
      "Hata": "Fehler",
      "Kart önerisi": "Kartenvorschlag",
      "Beğendim": "Gefällt mir",
      "Önerini ya da bulduğun hatayı yaz. E-posta uygulaman hazır bir mesajla açılır, sen gönderirsin.":
        "Teile eine Idee oder melde einen Fehler. Deine E-Mail-App öffnet einen Entwurf, den du selbst senden kannst.",
      "Mesajını yaz…": "Schreib deine Nachricht …",
      "📨 Gönder": "📨 Senden",
      "Önce mesajını yaz.": "Schreib zuerst eine Nachricht.",
      "En az bir tür açık kalmalı.": "Mindestens eine Kategorie muss aktiviert bleiben.",
      "✅ Yaptık, Sonraki Kart": "✅ Erledigt, nächste Karte",
      "Kart ": "Karte ",
      "Tema": "Design",
      "Cinsiyet seç": "Geschlecht auswählen",
      "Kadın": "Frau",
      "Erkek": "Mann",
      "Belirtmek istemiyorum": "Keine Angabe",
      "Partner cinsiyeti": "Geschlecht der Partnerperson",
      "Her ikisi": "Alle",
      "Partneri": "Partnerperson",
      "Rastgele": "Zufällig",
      "Sohbet": "Gespräch",
      "Sorular": "Fragen",
      "İtiraf": "Geständnis",
      "Tahmin": "Raten",
      "Hareket": "Pantomime",
      "Yaratıcı": "Kreativ",
      "Meydan": "Herausforderung",
      "Yakınlık": "Nähe",
      "Günlük": "Alltag",
      "Sosyal": "Soziale Medien",
      "Çevre": "Familie und Freunde",
      "Hayat": "Leben",
      "Aşk": "Liebe",
      "Çılgın": "Verrückt",
      "Romantik": "Romantisch",
      "Eğlenceli": "Spaß",
      "Beni Ne Kadar Tanıyorsun": "Wie gut kennst du mich?",
      "Uzak Mesafe": "Fernbeziehung",
      "Evde Gece": "Gemütlicher Abend zu Hause",
      "Yeni Tanışanlar": "Erstes Kennenlernen",
      "Gelecek": "Zukunft",
      "Ok mu Nok mu": "Okay oder No-Go?",
      "İkisinden Birini Seç": "Entweder oder",
      "Duygusal ve yakın anlar": "Gefühlvolle und vertraute Momente",
      "Oyun ve kahkaha dolu": "Spiele und gemeinsames Lachen",
      "Birbirinizi ne kadar bilirsiniz?": "Wie gut kennt ihr euch?",
      "Görüntülü konuşarak oynayın": "Spielt per Videoanruf",
      "Evde yapılacak keyifli şeyler": "Schöne Dinge für zu Hause",
      "Çekinmeden, hafif ve tatlı": "Unkompliziert, locker und lieb",
      "Hayaller, planlar, hedefler": "Träume, Pläne und Ziele",
      "Bu durum sizce normal mi?": "Findet ihr dieses Verhalten in Ordnung?",
      "Hangisini seçersin?": "Wofür entscheidest du dich?",
      "Kartı okuyan: ": "Liest vor: ",
      "Sıra: ": "Am Zug: ",
      "  |  Partner: ": "  |  Partnerperson: ",
      "Cinsiyet seç.": "Wähle ein Geschlecht.",
      "adını yaz.": "Gib einen Namen ein.",
      ". İsimleri ayırt edilebilir yap.": ". Verwendet unterschiedliche Namen.",
      " için seçtiğin partner cinsiyetinde (":
        " hat keine passende Partnerperson mit dem gewählten Geschlecht (",
      ") başka oyuncu yok. Partner cinsiyetini değiştir.":
        "). Ändere die Auswahl für das Partnergeschlecht.",
      "Seçili türlerde görev yok. Bir tür aç.":
        "In den ausgewählten Kategorien gibt es keine Karten. Aktiviere eine Kategorie.",
      "Kodun başındaki e-posta adresi henüz değiştirilmemiş.":
        "Die Feedback-E-Mail-Adresse wurde noch nicht eingerichtet.",
      "İki Kalp Bir Deste geri bildirim": "Feedback zu Zwei Herzen, ein Kartendeck",
      "Dürüst ol ya da cesaretini göster": "Sei ehrlich oder zeig Mut",
      "Birlikte sayın: 3, 2, 1! Aynı anda 👍 (OK) ya da 👎 (NOK) gösterin, sonra nedenini anlatın.":
        "Zählt gemeinsam herunter: 3, 2, 1! Zeigt gleichzeitig 👍 (Okay) oder 👎 (No-Go) und erklärt danach warum.",
      "İkiniz de gizlice seçin, aynı anda söyleyin ve nedenini anlatın.":
        "Wählt heimlich, sagt es gleichzeitig und erklärt eure Entscheidung.",
      "Sıradaki oyuncu kendisi seçer. Aynı seçeneği arka arkaya 3 kez seçemezsin.":
        "Die nächste Person wählt. Dieselbe Option darf nicht dreimal hintereinander gewählt werden.",
      "Bu seçenekte gösterilecek kart kalmadı. Türleri değiştirebilir ya da gizlenen kartları geri açabilirsin.":
        "Für diese Auswahl gibt es keine Karten mehr. Ändere die Kategorien oder stelle ausgeblendete Karten wieder her.",
      "Güzel oyundu! Bir sonraki oyunda görüşürüz 💜":
        "Das war ein schönes Spiel! Bis zum nächsten Mal 💜",
      "Henüz hiç kart tamamlanmadı. “Yaptık” dediğin kartlar burada sayılır.":
        "Noch keine Karte abgeschlossen. Als erledigt markierte Karten werden hier gezählt.",
      "🎴 Kartlarım": "🎴 Meine Karten",
      "🃏 Kartlarım": "🃏 Meine Karten",
      "🃏 Kartlarım (kendi / gizlenen)": "🃏 Meine Karten (eigene / ausgeblendete)",
      "✍️ Kendi kartın": "✍️ Eigene Karte",
      "🚫 Bir daha gösterme": "🚫 Diese Karte nicht mehr zeigen",
      "✍️ Kendi": "✍️ Eigene",
      "🚫 Gizlenen": "🚫 Ausgeblendet",
      "Hepsini geri aç": "Alle wiederherstellen",
      "Henüz kendi kartın yok.": "Du hast noch keine eigenen Karten.",
      "Gizlenmiş kart yok.": "Keine Karten ausgeblendet.",
      "Kendi görev kartını yaz": "Schreib deine eigene Aufgabenkarte",
      "＋ Kart Ekle": "＋ Karte hinzufügen",
      "Önce kartı yaz.": "Schreib zuerst eine Karte.",
      "Bu kart zaten var.": "Diese Karte gibt es bereits.",
      "Kart eklendi. Oyunda “Kendi” türünden gelir.":
        "Karte hinzugefügt. Sie erscheint im Spiel unter „Eigene“.",
      "En fazla 100 kart ekleyebilirsin.": "Du kannst höchstens 100 Karten hinzufügen.",
      "Doğruluk": "Wahrheit",
      "Cesaret": "Pflicht",
      "Sıradaki:": "Als Nächstes:",
      " arka arkaya 2 kez Doğruluk seçti, bu sefer Cesaret.":
        " hat zweimal hintereinander Wahrheit gewählt. Diesmal ist Pflicht dran.",
      " arka arkaya 2 kez Cesaret seçti, bu sefer Doğruluk.":
        " hat zweimal hintereinander Pflicht gewählt. Diesmal ist Wahrheit dran.",
      "Doğruluk mu Cesaretlik mi": "Wahrheit oder Pflicht",
      "Doğruluk mu, Cesaret mi?": "Wahrheit oder Pflicht?",
      "Ana menü": "Hauptmenü",
      "🎉 Oyun Özeti": "🎉 Spielübersicht",
      "🏁 Oyunu bitir": "🏁 Spiel beenden",
      "🔁 Yeniden oyna": "🔁 Noch einmal spielen",
      "okuyor": "liest vor",
      "İpucu: “Partnerine …” yazarsan oyun partnerin adını kendisi koyar.":
        "Tipp: Bei „Sag deiner Partnerperson …“ setzt das Spiel den Namen automatisch ein.",
      "↩️ Aç": "↩️ Wiederherstellen",
      " – Başlat": " – Starten",
      " – Durdur": " – Anhalten",
      "Süre doldu!": "Zeit abgelaufen!",
      " sn": " Sek.",
      " dakika": " Min.",
      " kart": " Karten",
      " oyuncunun adı": " Name der Person",
      "Aynı isim iki kez kullanılmış: ": "Dieser Name wurde zweimal verwendet: ",
      "İsimleri ayırt edilebilir yap.": "Verwendet unterschiedliche Namen.",
      "🕒 Süre": "🕒 Dauer",
      "✅ Tamamlanan": "✅ Erledigt",
      "⏭️ Atlanan": "⏭️ Übersprungen",
      "🏆 En çok gelen tür": "🏆 Häufigste Kategorie",
      "Gösterilecek kart kalmadı.": "Keine Karten mehr vorhanden.",
      "Geri açmak için Kartlarım": "Stelle sie unter „Meine Karten“ wieder her",
      "Bu seçenekte gösterilecek kart kalmadı.": "Für diese Auswahl gibt es keine Karten mehr.",
      "Bir tür aç.": "Aktiviere eine Kategorie.",
      "Kartı okuyan": "Liest vor",
      "Kendi kartın": "Eigene Karte",
      "Satın alımlar": "Käufe",
      "🛒 Satın alımlar": "🛒 Käufe",
      "🔓 Tüm modların kilidi": "🔓 Alle Modi freischalten",
      "Ok mu Nok mu, İkisinden Birini Seç ve Doğruluk mu Cesaretlik mi modları açılır. Tek seferlik ödeme.":
        "Schaltet die Modi „Okay oder No-Go?“, „Entweder oder“ und „Wahrheit oder Pflicht“ frei. Einmalige Zahlung.",
      "🚫 Reklamları kaldır": "🚫 Werbung entfernen",
      "Tüm reklamlar kalıcı olarak kalkar: ekranın altındaki reklam ve oyun arasında çıkan tam ekran reklamlar. Tek seferlik ödeme.":
        "Entfernt dauerhaft alle Werbung: das Banner unten und die Vollbildanzeigen zwischen den Spielen. Einmalige Zahlung.",
      "Satın alımlarımı geri yükle": "Käufe wiederherstellen",
      "✅ Açık": "✅ Freigeschaltet",
      "Bu cihazda kullanılamıyor": "Auf diesem Gerät nicht verfügbar",
      "Satın alma bu cihazda kullanılamıyor.": "Käufe sind auf diesem Gerät nicht verfügbar.",
      "Şu an alınamıyor": "Derzeit nicht verfügbar",
      "Fiyat yükleniyor…": "Preis wird geladen …",
      "Satın al · ": "Kaufen · ",
      " modu kilitli. Açmak için aşağıdan satın alabilirsin.":
        " ist gesperrt. Du kannst ihn unten freischalten.",
      "Teşekkürler! Satın alma tamamlandı 💜": "Danke! Kauf abgeschlossen 💜",
      "Satın alma işleniyor. Birkaç dakika sonra geri yükle düğmesine dokun.":
        "Dein Kauf wird verarbeitet. Tippe in ein paar Minuten auf „Käufe wiederherstellen“.",
      "Google Play açılıyor…": "Google Play wird geöffnet …",
      "Satın alma iptal edildi.": "Kauf abgebrochen.",
      "Satın alma tamamlanamadı. Daha sonra tekrar dene.":
        "Der Kauf konnte nicht abgeschlossen werden. Versuch es später erneut.",
      "Kontrol ediliyor…": "Wird überprüft …",
      "Satın alımların geri yüklendi.": "Käufe wiederhergestellt.",
      "Geri yüklenecek bir satın alma bulunamadı.": "Keine Käufe zum Wiederherstellen gefunden.",
      "🌐 Dil": "🌐 Sprache",
      "Birlikte eğlen.": "Habt gemeinsam Spaß."
    },
    fr: {
      "Kart çek, görevi yap, birlikte eğlen.":
        "Tirez une carte, relevez le défi et amusez-vous ensemble.",
      "Oyuna Başla": "Commencer",
      "💬 Geri bildirim": "💬 Commentaires",
      "Geri bildirim": "Commentaires",
      "Kimler oynuyor?": "Qui joue ?",
      "＋ Yeni oyuncu ekle": "＋ Ajouter une personne",
      "Devam Et": "Continuer",
      "← Geri": "← Retour",
      "Bir mod seç": "Choisissez un mode",
      "← Oyunculara dön": "← Retour aux personnes",
      "Bu mod için hangi görev türleri gelsin?":
        "Quelles catégories de défis souhaitez-vous dans ce mode ?",
      "İstemediğin türü kapat. Her kartta Pas Geç de var.":
        "Désactivez les catégories qui ne vous conviennent pas. Chaque carte peut être passée.",
      "Hepsini aç": "Tout activer",
      "🎴 Başla": "🎴 Commencer",
      "← Mod seçimine dön": "← Retour aux modes",
      "Hazır olunca kart çek 👇": "Tirez une carte pour commencer 👇",
      "🎴 Kart Çek": "🎴 Tirer une carte",
      "⏭️ Pas Geç": "⏭️ Passer",
      "← Türleri değiştir": "← Changer de catégories",
      "Mod değiştir": "Changer de mode",
      "Öneri": "Suggestion",
      "Hata": "Bugue",
      "Kart önerisi": "Idée de carte",
      "Beğendim": "J’aime",
      "Önerini ya da bulduğun hatayı yaz. E-posta uygulaman hazır bir mesajla açılır, sen gönderirsin.":
        "Partagez une idée ou signalez un problème. Votre application de messagerie ouvrira un brouillon à envoyer.",
      "Mesajını yaz…": "Écrivez votre message…",
      "📨 Gönder": "📨 Envoyer",
      "Önce mesajını yaz.": "Écrivez d’abord votre message.",
      "En az bir tür açık kalmalı.": "Au moins une catégorie doit rester activée.",
      "✅ Yaptık, Sonraki Kart": "✅ Fait, carte suivante",
      "Kart ": "Carte ",
      "Tema": "Thème",
      "Cinsiyet seç": "Choisissez un genre",
      "Kadın": "Femme",
      "Erkek": "Homme",
      "Belirtmek istemiyorum": "Je préfère ne pas le préciser",
      "Partner cinsiyeti": "Genre du ou de la partenaire",
      "Her ikisi": "Tous",
      "Partneri": "Partenaire",
      "Rastgele": "Au hasard",
      "Sohbet": "Discussion",
      "Sorular": "Questions",
      "İtiraf": "Confession",
      "Tahmin": "Deviner",
      "Hareket": "Mime",
      "Yaratıcı": "Créativité",
      "Meydan": "Défi",
      "Yakınlık": "Complicité",
      "Günlük": "Vie quotidienne",
      "Sosyal": "Réseaux sociaux",
      "Çevre": "Famille et amis",
      "Hayat": "Vie",
      "Aşk": "Amour",
      "Çılgın": "Délire",
      "Romantik": "Romantique",
      "Eğlenceli": "Amusant",
      "Beni Ne Kadar Tanıyorsun": "À quel point me connais-tu ?",
      "Uzak Mesafe": "Relation à distance",
      "Evde Gece": "Soirée à la maison",
      "Yeni Tanışanlar": "Faire connaissance",
      "Gelecek": "Avenir",
      "Ok mu Nok mu": "Acceptable ou pas ?",
      "İkisinden Birini Seç": "Tu préfères ?",
      "Duygusal ve yakın anlar": "Des moments tendres et complices",
      "Oyun ve kahkaha dolu": "Des jeux et des fous rires",
      "Birbirinizi ne kadar bilirsiniz?": "À quel point vous connaissez-vous ?",
      "Görüntülü konuşarak oynayın": "Jouez en appel vidéo",
      "Evde yapılacak keyifli şeyler": "De bons moments à la maison",
      "Çekinmeden, hafif ve tatlı": "Simple, léger et sympa",
      "Hayaller, planlar, hedefler": "Rêves, projets et objectifs",
      "Bu durum sizce normal mi?": "Trouvez-vous cette situation normale ?",
      "Hangisini seçersin?": "Que choisis-tu ?",
      "Kartı okuyan: ": "Lecture de la carte : ",
      "Sıra: ": "Au tour de : ",
      "  |  Partner: ": "  |  Partenaire : ",
      "Cinsiyet seç.": "Choisissez un genre.",
      "adını yaz.": "Saisissez un prénom.",
      "Aynı isim iki kez kullanılmış: ": "Ce prénom a été utilisé deux fois : ",
      ". İsimleri ayırt edilebilir yap.": ". Utilisez des prénoms distincts.",
      " için seçtiğin partner cinsiyetinde (":
        " n’a pas de partenaire correspondant au genre choisi (",
      ") başka oyuncu yok. Partner cinsiyetini değiştir.":
        "). Modifiez le genre souhaité pour le ou la partenaire.",
      "Seçili türlerde görev yok. Bir tür aç.":
        "Aucune carte dans les catégories choisies. Activez une catégorie.",
      "Kodun başındaki e-posta adresi henüz değiştirilmemiş.":
        "L’adresse e-mail de commentaires n’a pas encore été configurée.",
      "İki Kalp Bir Deste geri bildirim": "Commentaires sur Deux cœurs, un jeu de cartes",
      "Dürüst ol ya da cesaretini göster": "Sois sincère ou montre ton courage",
      "Birlikte sayın: 3, 2, 1! Aynı anda 👍 (OK) ya da 👎 (NOK) gösterin, sonra nedenini anlatın.":
        "Comptez ensemble : 3, 2, 1 ! Montrez en même temps 👍 (oui) ou 👎 (non), puis expliquez pourquoi.",
      "İkiniz de gizlice seçin, aynı anda söyleyin ve nedenini anlatın.":
        "Choisissez en secret, révélez votre réponse en même temps et expliquez votre choix.",
      "Sıradaki oyuncu kendisi seçer. Aynı seçeneği arka arkaya 3 kez seçemezsin.":
        "La personne suivante choisit. La même option ne peut pas être choisie trois fois de suite.",
      "Bu seçenekte gösterilecek kart kalmadı. Türleri değiştirebilir ya da gizlenen kartları geri açabilirsin.":
        "Il n’y a plus de cartes pour ce choix. Changez de catégorie ou restaurez les cartes masquées.",
      "Güzel oyundu! Bir sonraki oyunda görüşürüz 💜": "C’était un beau moment ! À la prochaine 💜",
      "Henüz hiç kart tamamlanmadı. “Yaptık” dediğin kartlar burada sayılır.":
        "Aucune carte terminée pour le moment. Les cartes marquées comme faites seront comptées ici.",
      "🎴 Kartlarım": "🎴 Mes cartes",
      "🃏 Kartlarım": "🃏 Mes cartes",
      "🃏 Kartlarım (kendi / gizlenen)": "🃏 Mes cartes (personnelles / masquées)",
      "✍️ Kendi kartın": "✍️ Carte personnelle",
      "🚫 Bir daha gösterme": "🚫 Ne plus afficher cette carte",
      "✍️ Kendi": "✍️ Personnelles",
      "🚫 Gizlenen": "🚫 Masquées",
      "Hepsini geri aç": "Tout restaurer",
      "Henüz kendi kartın yok.": "Vous n’avez pas encore de carte personnelle.",
      "Gizlenmiş kart yok.": "Aucune carte masquée.",
      "Kendi görev kartını yaz": "Écrivez votre propre défi",
      "＋ Kart Ekle": "＋ Ajouter une carte",
      "Önce kartı yaz.": "Écrivez d’abord une carte.",
      "Bu kart zaten var.": "Cette carte existe déjà.",
      "Kart eklendi. Oyunda “Kendi” türünden gelir.":
        "Carte ajoutée. Elle apparaîtra dans la catégorie « Personnelles ».",
      "En fazla 100 kart ekleyebilirsin.": "Vous pouvez ajouter jusqu’à 100 cartes.",
      "Doğruluk": "Vérité",
      "Cesaret": "Action",
      "Sıradaki:": "À suivre :",
      " arka arkaya 2 kez Doğruluk seçti, bu sefer Cesaret.":
        " a choisi Vérité deux fois de suite ; cette fois, c’est Action.",
      " arka arkaya 2 kez Cesaret seçti, bu sefer Doğruluk.":
        " a choisi Action deux fois de suite ; cette fois, c’est Vérité.",
      "Doğruluk mu Cesaretlik mi": "Action ou vérité",
      "Doğruluk mu, Cesaret mi?": "Action ou vérité ?",
      "Ana menü": "Menu principal",
      "🎉 Oyun Özeti": "🎉 Résumé de la partie",
      "🏁 Oyunu bitir": "🏁 Terminer la partie",
      "🔁 Yeniden oyna": "🔁 Rejouer",
      "okuyor": "lit la carte",
      "İpucu: “Partnerine …” yazarsan oyun partnerin adını kendisi koyar.":
        "Astuce : écrivez « Dis à ton ou ta partenaire… » et le jeu insérera son prénom.",
      "↩️ Aç": "↩️ Restaurer",
      " – Başlat": " – Démarrer",
      " – Durdur": " – Arrêter",
      "Süre doldu!": "Temps écoulé !",
      " sn": " s",
      " dakika": " min",
      " kart": " cartes",
      " oyuncunun adı": " Prénom de la personne",
      "🕒 Süre": "🕒 Durée",
      "✅ Tamamlanan": "✅ Terminées",
      "⏭️ Atlanan": "⏭️ Passées",
      "🏆 En çok gelen tür": "🏆 Catégorie la plus fréquente",
      "Gösterilecek kart kalmadı.": "Il n’y a plus de cartes à afficher.",
      "Geri açmak için Kartlarım": "Restaurez-la dans Mes cartes",
      "Bir tür aç.": "Activez une catégorie.",
      "Kartı okuyan": "Lit la carte",
      "Birlikte eğlen.": "Amusez-vous ensemble.",
      "Kendi kartın": "Carte personnelle",
      "Satın alımlar": "Achats",
      "🛒 Satın alımlar": "🛒 Achats",
      "🔓 Tüm modların kilidi": "🔓 Débloquer tous les modes",
      "Ok mu Nok mu, İkisinden Birini Seç ve Doğruluk mu Cesaretlik mi modları açılır. Tek seferlik ödeme.":
        "Débloque les modes « Acceptable ou pas ? », « Tu préfères ? » et « Action ou vérité ». Paiement unique.",
      "🚫 Reklamları kaldır": "🚫 Supprimer les publicités",
      "Tüm reklamlar kalıcı olarak kalkar: ekranın altındaki reklam ve oyun arasında çıkan tam ekran reklamlar. Tek seferlik ödeme.":
        "Supprime définitivement toutes les publicités, la bannière en bas et les annonces plein écran entre les parties. Paiement unique.",
      "Satın alımlarımı geri yükle": "Restaurer les achats",
      "✅ Açık": "✅ Débloqué",
      "Bu cihazda kullanılamıyor": "Indisponible sur cet appareil",
      "Satın alma bu cihazda kullanılamıyor.":
        "Les achats ne sont pas disponibles sur cet appareil.",
      "Şu an alınamıyor": "Indisponible pour le moment",
      "Fiyat yükleniyor…": "Chargement du prix…",
      "Satın al · ": "Acheter · ",
      " modu kilitli. Açmak için aşağıdan satın alabilirsin.":
        " est verrouillé. Vous pouvez le débloquer ci-dessous.",
      "Teşekkürler! Satın alma tamamlandı 💜": "Merci ! Achat effectué 💜",
      "Satın alma işleniyor. Birkaç dakika sonra geri yükle düğmesine dokun.":
        "Votre achat est en cours. Touchez « Restaurer les achats » dans quelques minutes.",
      "Google Play açılıyor…": "Ouverture de Google Play…",
      "Satın alma iptal edildi.": "Achat annulé.",
      "Satın alma tamamlanamadı. Daha sonra tekrar dene.":
        "L’achat n’a pas abouti. Réessayez plus tard.",
      "Kontrol ediliyor…": "Vérification…",
      "Satın alımların geri yüklendi.": "Achats restaurés.",
      "Geri yüklenecek bir satın alma bulunamadı.": "Aucun achat à restaurer n’a été trouvé.",
      "🌐 Dil": "🌐 Langue"
    },
    it: {
      "Kart çek, görevi yap, birlikte eğlen.":
        "Pesca una carta, completa la sfida e divertitevi insieme.",
      "Oyuna Başla": "Inizia a giocare",
      "💬 Geri bildirim": "💬 Feedback",
      "Geri bildirim": "Feedback",
      "Kimler oynuyor?": "Chi gioca?",
      "＋ Yeni oyuncu ekle": "＋ Aggiungi una persona",
      "Devam Et": "Continua",
      "← Geri": "← Indietro",
      "Bir mod seç": "Scegli una modalità",
      "← Oyunculara dön": "← Torna alle persone",
      "Bu mod için hangi görev türleri gelsin?":
        "Quali categorie di sfide vuoi in questa modalità?",
      "İstemediğin türü kapat. Her kartta Pas Geç de var.":
        "Disattiva le categorie che non vuoi. Puoi saltare ogni carta.",
      "Hepsini aç": "Attiva tutte",
      "🎴 Başla": "🎴 Inizia",
      "← Mod seçimine dön": "← Torna alle modalità",
      "Hazır olunca kart çek 👇": "Pesca una carta quando sei pronto 👇",
      "🎴 Kart Çek": "🎴 Pesca una carta",
      "⏭️ Pas Geç": "⏭️ Salta",
      "← Türleri değiştir": "← Cambia categorie",
      "Mod değiştir": "Cambia modalità",
      "Öneri": "Suggerimento",
      "Hata": "Errore",
      "Kart önerisi": "Idea per una carta",
      "Beğendim": "Mi piace",
      "Önerini ya da bulduğun hatayı yaz. E-posta uygulaman hazır bir mesajla açılır, sen gönderirsin.":
        "Condividi un'idea o segnala un problema. Si aprirà un messaggio nella tua app e-mail, pronto da inviare.",
      "Mesajını yaz…": "Scrivi il tuo messaggio…",
      "📨 Gönder": "📨 Invia",
      "Önce mesajını yaz.": "Scrivi prima il messaggio.",
      "En az bir tür açık kalmalı.": "Almeno una categoria deve restare attiva.",
      "✅ Yaptık, Sonraki Kart": "✅ Fatto, prossima carta",
      "Kart ": "Carta ",
      "Tema": "Tema",
      "Cinsiyet seç": "Scegli il genere",
      "Kadın": "Donna",
      "Erkek": "Uomo",
      "Belirtmek istemiyorum": "Preferisco non indicarlo",
      "Partner cinsiyeti": "Genere della persona partner",
      "Her ikisi": "Tutti",
      "Partneri": "Persona partner",
      "Rastgele": "Casuale",
      "Sohbet": "Conversazione",
      "Sorular": "Domande",
      "İtiraf": "Confessione",
      "Tahmin": "Indovinare",
      "Hareket": "Mimo",
      "Yaratıcı": "Creatività",
      "Meydan": "Sfida",
      "Yakınlık": "Intimità",
      "Günlük": "Vita quotidiana",
      "Sosyal": "Social",
      "Çevre": "Famiglia e amici",
      "Hayat": "Vita",
      "Aşk": "Amore",
      "Çılgın": "Pazzesco",
      "Romantik": "Romantica",
      "Eğlenceli": "Divertente",
      "Beni Ne Kadar Tanıyorsun": "Quanto mi conosci?",
      "Uzak Mesafe": "A distanza",
      "Evde Gece": "Serata a casa",
      "Yeni Tanışanlar": "Per conoscersi",
      "Gelecek": "Futuro",
      "Ok mu Nok mu": "Va bene o no?",
      "İkisinden Birini Seç": "Questo o quello",
      "Duygusal ve yakın anlar": "Momenti teneri e speciali",
      "Oyun ve kahkaha dolu": "Giochi e risate",
      "Birbirinizi ne kadar bilirsiniz?": "Quanto vi conoscete?",
      "Görüntülü konuşarak oynayın": "Giocate in videochiamata",
      "Evde yapılacak keyifli şeyler": "Idee divertenti da fare a casa",
      "Çekinmeden, hafif ve tatlı": "Semplice, leggero e dolce",
      "Hayaller, planlar, hedefler": "Sogni, progetti e obiettivi",
      "Bu durum sizce normal mi?": "Secondo voi è una cosa normale?",
      "Hangisini seçersin?": "Cosa sceglieresti?",
      "Kartı okuyan: ": "Legge la carta: ",
      "Sıra: ": "Turno di: ",
      "  |  Partner: ": "  |  Persona partner: ",
      "Cinsiyet seç.": "Scegli un genere.",
      "adını yaz.": "Inserisci un nome.",
      "Aynı isim iki kez kullanılmış: ": "Questo nome è stato inserito due volte: ",
      ". İsimleri ayırt edilebilir yap.": ". Usa nomi diversi.",
      " için seçtiğin partner cinsiyetinde (":
        " non ha una persona partner compatibile con il genere scelto (",
      ") başka oyuncu yok. Partner cinsiyetini değiştir.":
        "). Cambia il genere preferito per la persona partner.",
      "Seçili türlerde görev yok. Bir tür aç.":
        "Non ci sono carte nelle categorie selezionate. Attiva una categoria.",
      "Kodun başındaki e-posta adresi henüz değiştirilmemiş.":
        "L'indirizzo e-mail per il feedback non è ancora stato configurato.",
      "İki Kalp Bir Deste geri bildirim": "Feedback su Due cuori, un mazzo",
      "Dürüst ol ya da cesaretini göster": "Sii sincero o mostra il tuo coraggio",
      "Birlikte sayın: 3, 2, 1! Aynı anda 👍 (OK) ya da 👎 (NOK) gösterin, sonra nedenini anlatın.":
        "Contate insieme: 3, 2, 1! Mostrate nello stesso momento 👍 (va bene) oppure 👎 (non va bene), poi spiegate perché.",
      "İkiniz de gizlice seçin, aynı anda söyleyin ve nedenini anlatın.":
        "Scegliete di nascosto, rivelate la risposta nello stesso momento e spiegate il motivo.",
      "Sıradaki oyuncu kendisi seçer. Aynı seçeneği arka arkaya 3 kez seçemezsin.":
        "La persona successiva sceglie. Non puoi scegliere la stessa opzione per tre turni di fila.",
      "Bu seçenekte gösterilecek kart kalmadı. Türleri değiştirebilir ya da gizlenen kartları geri açabilirsin.":
        "Non ci sono altre carte per questa scelta. Cambia categoria o ripristina le carte nascoste.",
      "Güzel oyundu! Bir sonraki oyunda görüşürüz 💜": "È stato bello giocare! Alla prossima 💜",
      "Henüz hiç kart tamamlanmadı. “Yaptık” dediğin kartlar burada sayılır.":
        "Non hai ancora completato carte. Qui verranno conteggiate quelle segnate come fatte.",
      "🎴 Kartlarım": "🎴 Le mie carte",
      "🃏 Kartlarım": "🃏 Le mie carte",
      "🃏 Kartlarım (kendi / gizlenen)": "🃏 Le mie carte (personali / nascoste)",
      "✍️ Kendi kartın": "✍️ Carta personale",
      "🚫 Bir daha gösterme": "🚫 Non mostrare più questa carta",
      "✍️ Kendi": "✍️ Personali",
      "🚫 Gizlenen": "🚫 Nascoste",
      "Hepsini geri aç": "Ripristina tutte",
      "Henüz kendi kartın yok.": "Non hai ancora carte personali.",
      "Gizlenmiş kart yok.": "Non ci sono carte nascoste.",
      "Kendi görev kartını yaz": "Scrivi una tua carta sfida",
      "＋ Kart Ekle": "＋ Aggiungi carta",
      "Önce kartı yaz.": "Scrivi prima una carta.",
      "Bu kart zaten var.": "Questa carta esiste già.",
      "Kart eklendi. Oyunda “Kendi” türünden gelir.":
        "Carta aggiunta. Apparirà nella categoria «Personali».",
      "En fazla 100 kart ekleyebilirsin.": "Puoi aggiungere fino a 100 carte.",
      "Doğruluk": "Verità",
      "Cesaret": "Obbligo",
      "Sıradaki:": "Prossimo turno:",
      " arka arkaya 2 kez Doğruluk seçti, bu sefer Cesaret.":
        " ha scelto Verità due volte di fila; stavolta tocca a Obbligo.",
      " arka arkaya 2 kez Cesaret seçti, bu sefer Doğruluk.":
        " ha scelto Obbligo due volte di fila; stavolta tocca a Verità.",
      "Doğruluk mu Cesaretlik mi": "Obbligo o verità",
      "Doğruluk mu, Cesaret mi?": "Obbligo o verità?",
      "Ana menü": "Menu principale",
      "🎉 Oyun Özeti": "🎉 Riepilogo della partita",
      "🏁 Oyunu bitir": "🏁 Termina la partita",
      "🔁 Yeniden oyna": "🔁 Gioca di nuovo",
      "okuyor": "sta leggendo",
      "İpucu: “Partnerine …” yazarsan oyun partnerin adını kendisi koyar.":
        "Suggerimento: scrivi «Di' alla persona che gioca con te…» e il gioco inserirà il suo nome.",
      "↩️ Aç": "↩️ Ripristina",
      " – Başlat": " – Avvia",
      " – Durdur": " – Ferma",
      "Süre doldu!": "Tempo scaduto!",
      " sn": " sec",
      " dakika": " min",
      " kart": " carte",
      " oyuncunun adı": " Nome della persona",
      "🕒 Süre": "🕒 Durata",
      "✅ Tamamlanan": "✅ Completate",
      "⏭️ Atlanan": "⏭️ Saltate",
      "🏆 En çok gelen tür": "🏆 Categoria più frequente",
      "Gösterilecek kart kalmadı.": "Non ci sono più carte da mostrare.",
      "Geri açmak için Kartlarım": "Ripristinala da Le mie carte",
      "Bir tür aç.": "Attiva una categoria.",
      "Kartı okuyan": "Legge la carta",
      "Birlikte eğlen.": "Divertitevi insieme.",
      "Kendi kartın": "Carta personale",
      "Satın alımlar": "Acquisti",
      "🛒 Satın alımlar": "🛒 Acquisti",
      "🔓 Tüm modların kilidi": "🔓 Sblocca tutte le modalità",
      "Ok mu Nok mu, İkisinden Birini Seç ve Doğruluk mu Cesaretlik mi modları açılır. Tek seferlik ödeme.":
        "Sblocca Va bene o no?, Questo o quello e Obbligo o verità. Pagamento una tantum.",
      "🚫 Reklamları kaldır": "🚫 Rimuovi le pubblicità",
      "Tüm reklamlar kalıcı olarak kalkar: ekranın altındaki reklam ve oyun arasında çıkan tam ekran reklamlar. Tek seferlik ödeme.":
        "Rimuove definitivamente tutte le pubblicità: il banner in basso e gli annunci a schermo intero tra una partita e l'altra. Pagamento una tantum.",
      "Satın alımlarımı geri yükle": "Ripristina gli acquisti",
      "✅ Açık": "✅ Sbloccato",
      "Bu cihazda kullanılamıyor": "Non disponibile su questo dispositivo",
      "Satın alma bu cihazda kullanılamıyor.":
        "Gli acquisti non sono disponibili su questo dispositivo.",
      "Şu an alınamıyor": "Non disponibile al momento",
      "Fiyat yükleniyor…": "Caricamento del prezzo…",
      "Satın al · ": "Acquista · ",
      " modu kilitli. Açmak için aşağıdan satın alabilirsin.":
        " è bloccata. Puoi sbloccarla qui sotto.",
      "Teşekkürler! Satın alma tamamlandı 💜": "Grazie! Acquisto completato 💜",
      "Satın alma işleniyor. Birkaç dakika sonra geri yükle düğmesine dokun.":
        "L'acquisto è in elaborazione. Tocca «Ripristina gli acquisti» tra qualche minuto.",
      "Google Play açılıyor…": "Apertura di Google Play…",
      "Satın alma iptal edildi.": "Acquisto annullato.",
      "Satın alma tamamlanamadı. Daha sonra tekrar dene.":
        "Impossibile completare l'acquisto. Riprova più tardi.",
      "Kontrol ediliyor…": "Verifica in corso…",
      "Satın alımların geri yüklendi.": "Acquisti ripristinati.",
      "Geri yüklenecek bir satın alma bulunamadı.": "Non ci sono acquisti da ripristinare.",
      "🌐 Dil": "🌐 Lingua"
    },
    es: {
      "Kart çek, görevi yap, birlikte eğlen.":
        "Saca una tarjeta, cumple el reto y diviértanse juntos.",
      "Oyuna Başla": "Empezar a jugar",
      "💬 Geri bildirim": "💬 Comentarios",
      "Geri bildirim": "Comentarios",
      "Kimler oynuyor?": "¿Quiénes juegan?",
      "＋ Yeni oyuncu ekle": "＋ Añadir persona",
      "Devam Et": "Continuar",
      "← Geri": "← Atrás",
      "Bir mod seç": "Elijan un modo",
      "← Oyunculara dön": "← Volver a las personas",
      "Bu mod için hangi görev türleri gelsin?": "¿Qué categorías de retos quieres en este modo?",
      "İstemediğin türü kapat. Her kartta Pas Geç de var.":
        "Desactiva las categorías que no quieras. Puedes pasar cualquier tarjeta.",
      "Hepsini aç": "Activar todas",
      "🎴 Başla": "🎴 Empezar",
      "← Mod seçimine dön": "← Volver a los modos",
      "Hazır olunca kart çek 👇": "Saca una tarjeta cuando estés listo 👇",
      "🎴 Kart Çek": "🎴 Sacar tarjeta",
      "⏭️ Pas Geç": "⏭️ Pasar",
      "← Türleri değiştir": "← Cambiar categorías",
      "Mod değiştir": "Cambiar modo",
      "Öneri": "Sugerencia",
      "Hata": "Error",
      "Kart önerisi": "Idea para una tarjeta",
      "Beğendim": "Me gusta",
      "Önerini ya da bulduğun hatayı yaz. E-posta uygulaman hazır bir mesajla açılır, sen gönderirsin.":
        "Comparte una idea o informa de un error. Se abrirá un borrador en tu aplicación de correo para que lo envíes.",
      "Mesajını yaz…": "Escribe tu mensaje…",
      "📨 Gönder": "📨 Enviar",
      "Önce mesajını yaz.": "Escribe primero tu mensaje.",
      "En az bir tür açık kalmalı.": "Debe quedar al menos una categoría activa.",
      "✅ Yaptık, Sonraki Kart": "✅ Hecho, siguiente tarjeta",
      "Kart ": "Tarjeta ",
      "Tema": "Tema",
      "Cinsiyet seç": "Elige el género",
      "Kadın": "Mujer",
      "Erkek": "Hombre",
      "Belirtmek istemiyorum": "Prefiero no decirlo",
      "Partner cinsiyeti": "Género de la pareja",
      "Her ikisi": "Cualquiera",
      "Partneri": "Pareja",
      "Rastgele": "Al azar",
      "Sohbet": "Conversación",
      "Sorular": "Preguntas",
      "İtiraf": "Confesión",
      "Tahmin": "Adivinar",
      "Hareket": "Actuación",
      "Yaratıcı": "Creatividad",
      "Meydan": "Reto",
      "Yakınlık": "Cercanía",
      "Günlük": "Vida cotidiana",
      "Sosyal": "Redes sociales",
      "Çevre": "Familia y amistades",
      "Hayat": "Vida",
      "Aşk": "Amor",
      "Çılgın": "Alocado",
      "Romantik": "Romántico",
      "Eğlenceli": "Diversión",
      "Beni Ne Kadar Tanıyorsun": "¿Cuánto me conoces?",
      "Uzak Mesafe": "A distancia",
      "Evde Gece": "Noche en casa",
      "Yeni Tanışanlar": "Para conocerse",
      "Gelecek": "Futuro",
      "Ok mu Nok mu": "¿Está bien o no?",
      "İkisinden Birini Seç": "¿Esto o aquello?",
      "Duygusal ve yakın anlar": "Momentos emotivos y cercanos",
      "Oyun ve kahkaha dolu": "Juegos y muchas risas",
      "Birbirinizi ne kadar bilirsiniz?": "¿Cuánto se conocen?",
      "Görüntülü konuşarak oynayın": "Jueguen por videollamada",
      "Evde yapılacak keyifli şeyler": "Planes divertidos para casa",
      "Çekinmeden, hafif ve tatlı": "Sin presión, ligero y agradable",
      "Hayaller, planlar, hedefler": "Sueños, planes y metas",
      "Bu durum sizce normal mi?": "¿Les parece normal esta situación?",
      "Hangisini seçersin?": "¿Cuál elegirías?",
      "Kartı okuyan: ": "Lee la tarjeta: ",
      "Sıra: ": "Turno de: ",
      "  |  Partner: ": "  |  Pareja: ",
      "Cinsiyet seç.": "Elige un género.",
      "adını yaz.": "Escribe un nombre.",
      "Aynı isim iki kez kullanılmış: ": "Este nombre se ha usado dos veces: ",
      ". İsimleri ayırt edilebilir yap.": ". Usen nombres distintos.",
      " için seçtiğin partner cinsiyetinde (":
        " no tiene una pareja compatible con el género elegido (",
      ") başka oyuncu yok. Partner cinsiyetini değiştir.":
        "). Cambia el género preferido para la pareja.",
      "Seçili türlerde görev yok. Bir tür aç.":
        "No hay tarjetas en las categorías seleccionadas. Activa una categoría.",
      "Kodun başındaki e-posta adresi henüz değiştirilmemiş.":
        "Aún no se ha configurado la dirección de correo para comentarios.",
      "İki Kalp Bir Deste geri bildirim": "Comentarios sobre Dos corazones, una baraja",
      "Dürüst ol ya da cesaretini göster": "Sé sincero o demuestra tu valor",
      "Birlikte sayın: 3, 2, 1! Aynı anda 👍 (OK) ya da 👎 (NOK) gösterin, sonra nedenini anlatın.":
        "Cuenten juntos: 3, 2, 1. Muestren a la vez 👍 (bien) o 👎 (no) y luego expliquen por qué.",
      "İkiniz de gizlice seçin, aynı anda söyleyin ve nedenini anlatın.":
        "Elijan en secreto, revelen su respuesta al mismo tiempo y expliquen por qué.",
      "Sıradaki oyuncu kendisi seçer. Aynı seçeneği arka arkaya 3 kez seçemezsin.":
        "La siguiente persona elige. No se puede escoger la misma opción tres veces seguidas.",
      "Bu seçenekte gösterilecek kart kalmadı. Türleri değiştirebilir ya da gizlenen kartları geri açabilirsin.":
        "No quedan tarjetas para esta opción. Cambia las categorías o restaura las tarjetas ocultas.",
      "Güzel oyundu! Bir sonraki oyunda görüşürüz 💜":
        "¡Qué buen juego! Nos vemos en la próxima 💜",
      "Henüz hiç kart tamamlanmadı. “Yaptık” dediğin kartlar burada sayılır.":
        "Aún no se ha completado ninguna tarjeta. Aquí se cuentan las que marques como hechas.",
      "🎴 Kartlarım": "🎴 Mis tarjetas",
      "🃏 Kartlarım": "🃏 Mis tarjetas",
      "🃏 Kartlarım (kendi / gizlenen)": "🃏 Mis tarjetas (propias / ocultas)",
      "✍️ Kendi kartın": "✍️ Tarjeta propia",
      "🚫 Bir daha gösterme": "🚫 No volver a mostrar",
      "✍️ Kendi": "✍️ Propias",
      "🚫 Gizlenen": "🚫 Ocultas",
      "Hepsini geri aç": "Restaurar todas",
      "Henüz kendi kartın yok.": "Aún no tienes tarjetas propias.",
      "Gizlenmiş kart yok.": "No hay tarjetas ocultas.",
      "Kendi görev kartını yaz": "Escribe tu propio reto",
      "＋ Kart Ekle": "＋ Añadir tarjeta",
      "Önce kartı yaz.": "Escribe una tarjeta primero.",
      "Bu kart zaten var.": "Esta tarjeta ya existe.",
      "Kart eklendi. Oyunda “Kendi” türünden gelir.":
        "Tarjeta añadida. Aparecerá en la categoría «Propias».",
      "En fazla 100 kart ekleyebilirsin.": "Puedes añadir hasta 100 tarjetas.",
      "Doğruluk": "Verdad",
      "Cesaret": "Reto",
      "Sıradaki:": "Siguiente:",
      " arka arkaya 2 kez Doğruluk seçti, bu sefer Cesaret.":
        " eligió Verdad dos veces seguidas; ahora toca Reto.",
      " arka arkaya 2 kez Cesaret seçti, bu sefer Doğruluk.":
        " eligió Reto dos veces seguidas; ahora toca Verdad.",
      "Doğruluk mu Cesaretlik mi": "¿Verdad o reto?",
      "Doğruluk mu, Cesaret mi?": "¿Verdad o reto?",
      "Ana menü": "Menú principal",
      "🎉 Oyun Özeti": "🎉 Resumen del juego",
      "🏁 Oyunu bitir": "🏁 Terminar juego",
      "🔁 Yeniden oyna": "🔁 Jugar de nuevo",
      "okuyor": "está leyendo",
      "İpucu: “Partnerine …” yazarsan oyun partnerin adını kendisi koyar.":
        "Consejo: escribe «Dile a tu pareja…» y el juego añadirá su nombre.",
      "↩️ Aç": "↩️ Restaurar",
      " – Başlat": " – Iniciar",
      " – Durdur": " – Detener",
      "Süre doldu!": "¡Se acabó el tiempo!",
      " sn": " s",
      " dakika": " min",
      " kart": " tarjetas",
      " oyuncunun adı": " Nombre de la persona",
      "🕒 Süre": "🕒 Duración",
      "✅ Tamamlanan": "✅ Completadas",
      "⏭️ Atlanan": "⏭️ Omitidas",
      "🏆 En çok gelen tür": "🏆 Categoría más frecuente",
      "Gösterilecek kart kalmadı.": "No quedan tarjetas para mostrar.",
      "Geri açmak için Kartlarım": "Restáurala desde Mis tarjetas",
      "Bir tür aç.": "Activa una categoría.",
      "Kartı okuyan": "Lee la tarjeta",
      "Birlikte eğlen.": "Diviértanse juntos.",
      "Kendi kartın": "Tarjeta propia",
      "Satın alımlar": "Compras",
      "🛒 Satın alımlar": "🛒 Compras",
      "🔓 Tüm modların kilidi": "🔓 Desbloquear todos los modos",
      "Ok mu Nok mu, İkisinden Birini Seç ve Doğruluk mu Cesaretlik mi modları açılır. Tek seferlik ödeme.":
        "Desbloquea ¿Está bien o no?, ¿Esto o aquello? y ¿Verdad o reto? Pago único.",
      "🚫 Reklamları kaldır": "🚫 Quitar anuncios",
      "Tüm reklamlar kalıcı olarak kalkar: ekranın altındaki reklam ve oyun arasında çıkan tam ekran reklamlar. Tek seferlik ödeme.":
        "Elimina para siempre todos los anuncios: el banner inferior y los anuncios a pantalla completa entre partidas. Pago único.",
      "Satın alımlarımı geri yükle": "Restaurar compras",
      "✅ Açık": "✅ Desbloqueado",
      "Bu cihazda kullanılamıyor": "No disponible en este dispositivo",
      "Satın alma bu cihazda kullanılamıyor.":
        "Las compras no están disponibles en este dispositivo.",
      "Şu an alınamıyor": "No disponible ahora",
      "Fiyat yükleniyor…": "Cargando precio…",
      "Satın al · ": "Comprar · ",
      " modu kilitli. Açmak için aşağıdan satın alabilirsin.":
        " está bloqueado. Puedes desbloquearlo abajo.",
      "Teşekkürler! Satın alma tamamlandı 💜": "¡Gracias! Compra completada 💜",
      "Satın alma işleniyor. Birkaç dakika sonra geri yükle düğmesine dokun.":
        "Tu compra se está procesando. Toca «Restaurar compras» dentro de unos minutos.",
      "Google Play açılıyor…": "Abriendo Google Play…",
      "Satın alma iptal edildi.": "Compra cancelada.",
      "Satın alma tamamlanamadı. Daha sonra tekrar dene.":
        "No se pudo completar la compra. Inténtalo de nuevo más tarde.",
      "Kontrol ediliyor…": "Comprobando…",
      "Satın alımların geri yüklendi.": "Compras restauradas.",
      "Geri yüklenecek bir satın alma bulunamadı.": "No se encontraron compras para restaurar.",
      "🌐 Dil": "🌐 Idioma"
    },
    pt: {
      "Kart çek, görevi yap, birlikte eğlen.":
        "Puxe uma carta, cumpra o desafio e divirtam-se juntos.",
      "Oyuna Başla": "Começar a jogar",
      "💬 Geri bildirim": "💬 Feedback",
      "Geri bildirim": "Feedback",
      "Kimler oynuyor?": "Quem vai jogar?",
      "＋ Yeni oyuncu ekle": "＋ Adicionar pessoa",
      "Devam Et": "Continuar",
      "← Geri": "← Voltar",
      "Bir mod seç": "Escolham um modo",
      "← Oyunculara dön": "← Voltar às pessoas",
      "Bu mod için hangi görev türleri gelsin?":
        "Quais categorias de desafios você quer neste modo?",
      "İstemediğin türü kapat. Her kartta Pas Geç de var.":
        "Desative as categorias que não quiser. Você pode pular qualquer carta.",
      "Hepsini aç": "Ativar todas",
      "🎴 Başla": "🎴 Começar",
      "← Mod seçimine dön": "← Voltar aos modos",
      "Hazır olunca kart çek 👇": "Puxe uma carta quando estiver pronto 👇",
      "🎴 Kart Çek": "🎴 Puxar carta",
      "⏭️ Pas Geç": "⏭️ Pular",
      "← Türleri değiştir": "← Mudar categorias",
      "Mod değiştir": "Mudar modo",
      "Öneri": "Sugestão",
      "Hata": "Erro",
      "Kart önerisi": "Ideia de carta",
      "Beğendim": "Gostei",
      "Önerini ya da bulduğun hatayı yaz. E-posta uygulaman hazır bir mesajla açılır, sen gönderirsin.":
        "Compartilhe uma ideia ou relate um erro. Seu app de e-mail abrirá um rascunho para você enviar.",
      "Mesajını yaz…": "Escreva sua mensagem…",
      "📨 Gönder": "📨 Enviar",
      "Önce mesajını yaz.": "Escreva sua mensagem primeiro.",
      "En az bir tür açık kalmalı.": "Pelo menos uma categoria precisa continuar ativa.",
      "✅ Yaptık, Sonraki Kart": "✅ Feito, próxima carta",
      "Kart ": "Carta ",
      "Tema": "Tema",
      "Cinsiyet seç": "Escolha o gênero",
      "Kadın": "Mulher",
      "Erkek": "Homem",
      "Belirtmek istemiyorum": "Prefiro não informar",
      "Partner cinsiyeti": "Gênero da pessoa parceira",
      "Her ikisi": "Qualquer",
      "Partneri": "Pessoa parceira",
      "Rastgele": "Aleatório",
      "Sohbet": "Conversa",
      "Sorular": "Perguntas",
      "İtiraf": "Confissão",
      "Tahmin": "Adivinhação",
      "Hareket": "Mímica",
      "Yaratıcı": "Criatividade",
      "Meydan": "Desafio",
      "Yakınlık": "Conexão",
      "Günlük": "Dia a dia",
      "Sosyal": "Redes sociais",
      "Çevre": "Família e amigos",
      "Hayat": "Vida",
      "Aşk": "Amor",
      "Çılgın": "Malucas",
      "Romantik": "Romântico",
      "Eğlenceli": "Diversão",
      "Beni Ne Kadar Tanıyorsun": "Quanto você me conhece?",
      "Uzak Mesafe": "À distância",
      "Evde Gece": "Noite em casa",
      "Yeni Tanışanlar": "Para se conhecerem",
      "Gelecek": "Futuro",
      "Ok mu Nok mu": "Tudo bem ou não?",
      "İkisinden Birini Seç": "Isso ou aquilo",
      "Duygusal ve yakın anlar": "Momentos carinhosos e próximos",
      "Oyun ve kahkaha dolu": "Jogos e muitas risadas",
      "Birbirinizi ne kadar bilirsiniz?": "Quanto vocês se conhecem?",
      "Görüntülü konuşarak oynayın": "Joguem por videochamada",
      "Evde yapılacak keyifli şeyler": "Ideias divertidas para fazer em casa",
      "Çekinmeden, hafif ve tatlı": "Sem pressão, leve e descontraído",
      "Hayaller, planlar, hedefler": "Sonhos, planos e objetivos",
      "Bu durum sizce normal mi?": "Vocês acham essa situação normal?",
      "Hangisini seçersin?": "Qual você escolheria?",
      "Kartı okuyan: ": "Lê a carta: ",
      "Sıra: ": "Vez de: ",
      "  |  Partner: ": "  |  Pessoa parceira: ",
      "Cinsiyet seç.": "Escolha um gênero.",
      "adını yaz.": "Digite um nome.",
      "Aynı isim iki kez kullanılmış: ": "Este nome foi usado duas vezes: ",
      ". İsimleri ayırt edilebilir yap.": ". Usem nomes diferentes.",
      " için seçtiğin partner cinsiyetinde (":
        " não tem uma pessoa parceira compatível com o gênero escolhido (",
      ") başka oyuncu yok. Partner cinsiyetini değiştir.":
        "). Mude a preferência de gênero da pessoa parceira.",
      "Seçili türlerde görev yok. Bir tür aç.":
        "Não há cartas nas categorias selecionadas. Ative uma categoria.",
      "Kodun başındaki e-posta adresi henüz değiştirilmemiş.":
        "O endereço de e-mail para feedback ainda não foi configurado.",
      "İki Kalp Bir Deste geri bildirim": "Feedback sobre Dois corações, um baralho",
      "Dürüst ol ya da cesaretini göster": "Seja sincero ou mostre sua coragem",
      "Birlikte sayın: 3, 2, 1! Aynı anda 👍 (OK) ya da 👎 (NOK) gösterin, sonra nedenini anlatın.":
        "Contem juntos: 3, 2, 1! Mostrem ao mesmo tempo 👍 (tudo bem) ou 👎 (não) e expliquem o motivo.",
      "İkiniz de gizlice seçin, aynı anda söyleyin ve nedenini anlatın.":
        "Escolham em segredo, revelem ao mesmo tempo e expliquem o motivo.",
      "Sıradaki oyuncu kendisi seçer. Aynı seçeneği arka arkaya 3 kez seçemezsin.":
        "A próxima pessoa escolhe. Não dá para escolher a mesma opção três vezes seguidas.",
      "Bu seçenekte gösterilecek kart kalmadı. Türleri değiştirebilir ya da gizlenen kartları geri açabilirsin.":
        "Não há mais cartas para esta opção. Mude as categorias ou restaure as cartas ocultas.",
      "Güzel oyundu! Bir sonraki oyunda görüşürüz 💜": "Foi muito bom jogar! Até a próxima 💜",
      "Henüz hiç kart tamamlanmadı. “Yaptık” dediğin kartlar burada sayılır.":
        "Nenhuma carta concluída ainda. As cartas marcadas como feitas serão contadas aqui.",
      "🎴 Kartlarım": "🎴 Minhas cartas",
      "🃏 Kartlarım": "🃏 Minhas cartas",
      "🃏 Kartlarım (kendi / gizlenen)": "🃏 Minhas cartas (personalizadas / ocultas)",
      "✍️ Kendi kartın": "✍️ Carta personalizada",
      "🚫 Bir daha gösterme": "🚫 Não mostrar novamente",
      "✍️ Kendi": "✍️ Personalizadas",
      "🚫 Gizlenen": "🚫 Ocultas",
      "Hepsini geri aç": "Restaurar todas",
      "Henüz kendi kartın yok.": "Você ainda não tem cartas personalizadas.",
      "Gizlenmiş kart yok.": "Não há cartas ocultas.",
      "Kendi görev kartını yaz": "Escreva seu próprio desafio",
      "＋ Kart Ekle": "＋ Adicionar carta",
      "Önce kartı yaz.": "Escreva uma carta primeiro.",
      "Bu kart zaten var.": "Esta carta já existe.",
      "Kart eklendi. Oyunda “Kendi” türünden gelir.":
        "Carta adicionada. Ela aparecerá na categoria «Personalizadas».",
      "En fazla 100 kart ekleyebilirsin.": "Você pode adicionar até 100 cartas.",
      "Doğruluk": "Verdade",
      "Cesaret": "Desafio",
      "Sıradaki:": "Próxima pessoa:",
      " arka arkaya 2 kez Doğruluk seçti, bu sefer Cesaret.":
        " escolheu Verdade duas vezes seguidas; agora é a vez de Desafio.",
      " arka arkaya 2 kez Cesaret seçti, bu sefer Doğruluk.":
        " escolheu Desafio duas vezes seguidas; agora é a vez de Verdade.",
      "Doğruluk mu Cesaretlik mi": "Verdade ou desafio",
      "Doğruluk mu, Cesaret mi?": "Verdade ou desafio?",
      "Ana menü": "Menu principal",
      "🎉 Oyun Özeti": "🎉 Resumo do jogo",
      "🏁 Oyunu bitir": "🏁 Encerrar jogo",
      "🔁 Yeniden oyna": "🔁 Jogar novamente",
      "okuyor": "está lendo",
      "İpucu: “Partnerine …” yazarsan oyun partnerin adını kendisi koyar.":
        "Dica: escreva «Diga à sua pessoa parceira…» e o jogo vai inserir o nome dela.",
      "↩️ Aç": "↩️ Restaurar",
      " – Başlat": " – Iniciar",
      " – Durdur": " – Parar",
      "Süre doldu!": "O tempo acabou!",
      " sn": " s",
      " dakika": " min",
      " kart": " cartas",
      " oyuncunun adı": " Nome da pessoa",
      "🕒 Süre": "🕒 Duração",
      "✅ Tamamlanan": "✅ Concluídas",
      "⏭️ Atlanan": "⏭️ Puladas",
      "🏆 En çok gelen tür": "🏆 Categoria mais frequente",
      "Gösterilecek kart kalmadı.": "Não há mais cartas para mostrar.",
      "Geri açmak için Kartlarım": "Restaure em Minhas cartas",
      "Bir tür aç.": "Ative uma categoria.",
      "Kartı okuyan": "Lê a carta",
      "Birlikte eğlen.": "Divirtam-se juntos.",
      "Kendi kartın": "Carta personalizada",
      "Satın alımlar": "Compras",
      "🛒 Satın alımlar": "🛒 Compras",
      "🔓 Tüm modların kilidi": "🔓 Desbloquear todos os modos",
      "Ok mu Nok mu, İkisinden Birini Seç ve Doğruluk mu Cesaretlik mi modları açılır. Tek seferlik ödeme.":
        "Desbloqueia Tudo bem ou não?, Isso ou aquilo e Verdade ou desafio. Pagamento único.",
      "🚫 Reklamları kaldır": "🚫 Remover anúncios",
      "Tüm reklamlar kalıcı olarak kalkar: ekranın altındaki reklam ve oyun arasında çıkan tam ekran reklamlar. Tek seferlik ödeme.":
        "Remove permanentemente todos os anúncios: o banner inferior e os anúncios em tela cheia entre as partidas. Pagamento único.",
      "Satın alımlarımı geri yükle": "Restaurar compras",
      "✅ Açık": "✅ Desbloqueado",
      "Bu cihazda kullanılamıyor": "Indisponível neste dispositivo",
      "Satın alma bu cihazda kullanılamıyor.": "Compras indisponíveis neste dispositivo.",
      "Şu an alınamıyor": "Indisponível no momento",
      "Fiyat yükleniyor…": "Carregando preço…",
      "Satın al · ": "Comprar · ",
      " modu kilitli. Açmak için aşağıdan satın alabilirsin.":
        " está bloqueado. Você pode desbloqueá-lo abaixo.",
      "Teşekkürler! Satın alma tamamlandı 💜": "Obrigado! Compra concluída 💜",
      "Satın alma işleniyor. Birkaç dakika sonra geri yükle düğmesine dokun.":
        "Sua compra está sendo processada. Toque em «Restaurar compras» daqui a alguns minutos.",
      "Google Play açılıyor…": "Abrindo o Google Play…",
      "Satın alma iptal edildi.": "Compra cancelada.",
      "Satın alma tamamlanamadı. Daha sonra tekrar dene.":
        "Não foi possível concluir a compra. Tente novamente mais tarde.",
      "Kontrol ediliyor…": "Verificando…",
      "Satın alımların geri yüklendi.": "Compras restauradas.",
      "Geri yüklenecek bir satın alma bulunamadı.": "Nenhuma compra para restaurar foi encontrada.",
      "🌐 Dil": "🌐 Idioma"
    },
    ru: {
      "Kart çek, görevi yap, birlikte eğlen.": "Тяни карту, выполняй задание и веселитесь вместе.",
      "Oyuna Başla": "Начать игру",
      "💬 Geri bildirim": "💬 Отзыв",
      "Geri bildirim": "Отзыв",
      "Kimler oynuyor?": "Кто играет?",
      "＋ Yeni oyuncu ekle": "＋ Добавить участника",
      "Devam Et": "Продолжить",
      "← Geri": "← Назад",
      "Bir mod seç": "Выберите режим",
      "← Oyunculara dön": "← К участникам",
      "Bu mod için hangi görev türleri gelsin?":
        "Какие категории заданий показывать в этом режиме?",
      "İstemediğin türü kapat. Her kartta Pas Geç de var.":
        "Отключите ненужные категории. Любую карту можно пропустить.",
      "Hepsini aç": "Включить все",
      "🎴 Başla": "🎴 Начать",
      "← Mod seçimine dön": "← К выбору режима",
      "Hazır olunca kart çek 👇": "Когда будете готовы, тяните карту 👇",
      "🎴 Kart Çek": "🎴 Тянуть карту",
      "⏭️ Pas Geç": "⏭️ Пропустить",
      "← Türleri değiştir": "← Изменить категории",
      "Mod değiştir": "Сменить режим",
      "Öneri": "Предложение",
      "Hata": "Ошибка",
      "Kart önerisi": "Идея для карты",
      "Beğendim": "Нравится",
      "Önerini ya da bulduğun hatayı yaz. E-posta uygulaman hazır bir mesajla açılır, sen gönderirsin.":
        "Поделитесь идеей или сообщите об ошибке. Откроется черновик письма, который можно отправить.",
      "Mesajını yaz…": "Напишите сообщение…",
      "📨 Gönder": "📨 Отправить",
      "Önce mesajını yaz.": "Сначала напишите сообщение.",
      "En az bir tür açık kalmalı.": "Нужно оставить включённой хотя бы одну категорию.",
      "✅ Yaptık, Sonraki Kart": "✅ Готово, следующая карта",
      "Kart ": "Карта ",
      "Tema": "Тема",
      "Cinsiyet seç": "Выберите пол",
      "Kadın": "Женщина",
      "Erkek": "Мужчина",
      "Belirtmek istemiyorum": "Не хочу указывать",
      "Partner cinsiyeti": "Пол партнёра",
      "Her ikisi": "Любой",
      "Partneri": "Партнёр",
      "Rastgele": "Случайно",
      "Sohbet": "Разговор",
      "Sorular": "Вопросы",
      "İtiraf": "Признание",
      "Tahmin": "Угадай",
      "Hareket": "Изобрази",
      "Yaratıcı": "Творчество",
      "Meydan": "Испытание",
      "Yakınlık": "Близость",
      "Günlük": "Повседневное",
      "Sosyal": "Соцсети",
      "Çevre": "Семья и друзья",
      "Hayat": "Жизнь",
      "Aşk": "Любовь",
      "Çılgın": "Безумное",
      "Romantik": "Романтика",
      "Eğlenceli": "Веселье",
      "Beni Ne Kadar Tanıyorsun": "Насколько хорошо ты меня знаешь?",
      "Uzak Mesafe": "На расстоянии",
      "Evde Gece": "Вечер дома",
      "Yeni Tanışanlar": "Знакомство",
      "Gelecek": "Будущее",
      "Ok mu Nok mu": "Нормально или нет?",
      "İkisinden Birini Seç": "Выбери одно",
      "Duygusal ve yakın anlar": "Тёплые и близкие моменты",
      "Oyun ve kahkaha dolu": "Игры и смех",
      "Birbirinizi ne kadar bilirsiniz?": "Насколько хорошо вы знаете друг друга?",
      "Görüntülü konuşarak oynayın": "Играйте по видеосвязи",
      "Evde yapılacak keyifli şeyler": "Чем приятно заняться дома",
      "Çekinmeden, hafif ve tatlı": "Легко, непринуждённо и мило",
      "Hayaller, planlar, hedefler": "Мечты, планы и цели",
      "Bu durum sizce normal mi?": "Как вы считаете, это нормально?",
      "Hangisini seçersin?": "Что бы ты выбрал?",
      "Kartı okuyan: ": "Читает карту: ",
      "Sıra: ": "Ход: ",
      "  |  Partner: ": "  |  Партнёр: ",
      "Cinsiyet seç.": "Выберите пол.",
      "adını yaz.": "введите имя.",
      "Aynı isim iki kez kullanılmış: ": "Это имя введено дважды: ",
      ". İsimleri ayırt edilebilir yap.": ". Используйте разные имена.",
      " için seçtiğin partner cinsiyetinde (": " не подходит партнёр выбранного пола (",
      ") başka oyuncu yok. Partner cinsiyetini değiştir.":
        "). Измените предпочтение по полу партнёра.",
      "Seçili türlerde görev yok. Bir tür aç.":
        "В выбранных категориях нет заданий. Включите категорию.",
      "Kodun başındaki e-posta adresi henüz değiştirilmemiş.":
        "Адрес электронной почты для отзывов ещё не настроен.",
      "İki Kalp Bir Deste geri bildirim": "Отзыв об игре «Два сердца — одна колода»",
      "Dürüst ol ya da cesaretini göster": "Будь честным или прояви смелость",
      "Birlikte sayın: 3, 2, 1! Aynı anda 👍 (OK) ya da 👎 (NOK) gösterin, sonra nedenini anlatın.":
        "Считайте вместе: 3, 2, 1! Одновременно покажите 👍 (нормально) или 👎 (неприемлемо), а затем объясните почему.",
      "İkiniz de gizlice seçin, aynı anda söyleyin ve nedenini anlatın.":
        "Выберите тайно, назовите ответ одновременно и объясните свой выбор.",
      "Sıradaki oyuncu kendisi seçer. Aynı seçeneği arka arkaya 3 kez seçemezsin.":
        "Следующий игрок выбирает сам. Нельзя выбирать один вариант три раза подряд.",
      "Bu seçenekte gösterilecek kart kalmadı. Türleri değiştirebilir ya da gizlenen kartları geri açabilirsin.":
        "Для этого варианта карты закончились. Измените категории или восстановите скрытые карты.",
      "Güzel oyundu! Bir sonraki oyunda görüşürüz 💜": "Это была отличная игра! До встречи 💜",
      "Henüz hiç kart tamamlanmadı. “Yaptık” dediğin kartlar burada sayılır.":
        "Пока ни одна карта не выполнена. Здесь будут отмечены карты, которые вы выполнили.",
      "🎴 Kartlarım": "🎴 Мои карты",
      "🃏 Kartlarım": "🃏 Мои карты",
      "🃏 Kartlarım (kendi / gizlenen)": "🃏 Мои карты (свои / скрытые)",
      "✍️ Kendi kartın": "✍️ Своя карта",
      "🚫 Bir daha gösterme": "🚫 Больше не показывать",
      "✍️ Kendi": "✍️ Свои",
      "🚫 Gizlenen": "🚫 Скрытые",
      "Hepsini geri aç": "Восстановить все",
      "Henüz kendi kartın yok.": "У вас пока нет своих карт.",
      "Gizlenmiş kart yok.": "Скрытых карт нет.",
      "Kendi görev kartını yaz": "Напишите своё задание",
      "＋ Kart Ekle": "＋ Добавить карту",
      "Önce kartı yaz.": "Сначала напишите задание.",
      "Bu kart zaten var.": "Такая карта уже есть.",
      "Kart eklendi. Oyunda “Kendi” türünden gelir.":
        "Карта добавлена. Она появится в категории «Свои».",
      "En fazla 100 kart ekleyebilirsin.": "Можно добавить не больше 100 карт.",
      "Doğruluk": "Правда",
      "Cesaret": "Действие",
      "Sıradaki:": "Следующий:",
      " arka arkaya 2 kez Doğruluk seçti, bu sefer Cesaret.":
        " два раза подряд выбрал «Правду»; теперь очередь «Действия».",
      " arka arkaya 2 kez Cesaret seçti, bu sefer Doğruluk.":
        " два раза подряд выбрал «Действие»; теперь очередь «Правды».",
      "Doğruluk mu Cesaretlik mi": "Правда или действие",
      "Doğruluk mu, Cesaret mi?": "Правда или действие?",
      "Ana menü": "Главное меню",
      "🎉 Oyun Özeti": "🎉 Итоги игры",
      "🏁 Oyunu bitir": "🏁 Завершить игру",
      "🔁 Yeniden oyna": "🔁 Играть снова",
      "okuyor": "читает",
      "İpucu: “Partnerine …” yazarsan oyun partnerin adını kendisi koyar.":
        "Совет: напишите «Скажи партнёру…», и игра сама подставит его имя.",
      "↩️ Aç": "↩️ Восстановить",
      " – Başlat": " – Запустить",
      " – Durdur": " – Остановить",
      "Süre doldu!": "Время вышло!",
      " sn": " сек.",
      " dakika": " мин.",
      " kart": " карт",
      " oyuncunun adı": " Имя участника",
      "🕒 Süre": "🕒 Длительность",
      "✅ Tamamlanan": "✅ Выполнено",
      "⏭️ Atlanan": "⏭️ Пропущено",
      "🏆 En çok gelen tür": "🏆 Частая категория",
      "Gösterilecek kart kalmadı.": "Карты закончились.",
      "Geri açmak için Kartlarım": "Восстановите её в разделе «Мои карты»",
      "Bir tür aç.": "Включите категорию.",
      "Kartı okuyan": "Читает карту",
      "Birlikte eğlen.": "Веселитесь вместе.",
      "Kendi kartın": "Своя карта",
      "Satın alımlar": "Покупки",
      "🛒 Satın alımlar": "🛒 Покупки",
      "🔓 Tüm modların kilidi": "🔓 Разблокировать все режимы",
      "Ok mu Nok mu, İkisinden Birini Seç ve Doğruluk mu Cesaretlik mi modları açılır. Tek seferlik ödeme.":
        "Открывает режимы «Нормально или нет?», «Выбери одно» и «Правда или действие». Разовый платёж.",
      "🚫 Reklamları kaldır": "🚫 Убрать рекламу",
      "Tüm reklamlar kalıcı olarak kalkar: ekranın altındaki reklam ve oyun arasında çıkan tam ekran reklamlar. Tek seferlik ödeme.":
        "Навсегда убирает всю рекламу: нижний баннер и полноэкранные объявления между играми. Разовый платёж.",
      "Satın alımlarımı geri yükle": "Восстановить покупки",
      "✅ Açık": "✅ Открыто",
      "Bu cihazda kullanılamıyor": "Недоступно на этом устройстве",
      "Satın alma bu cihazda kullanılamıyor.": "Покупки недоступны на этом устройстве.",
      "Şu an alınamıyor": "Сейчас недоступно",
      "Fiyat yükleniyor…": "Загрузка цены…",
      "Satın al · ": "Купить · ",
      " modu kilitli. Açmak için aşağıdan satın alabilirsin.":
        " заблокирован. Его можно открыть ниже.",
      "Teşekkürler! Satın alma tamamlandı 💜": "Спасибо! Покупка завершена 💜",
      "Satın alma işleniyor. Birkaç dakika sonra geri yükle düğmesine dokun.":
        "Покупка обрабатывается. Через несколько минут нажмите «Восстановить покупки».",
      "Google Play açılıyor…": "Открываем Google Play…",
      "Satın alma iptal edildi.": "Покупка отменена.",
      "Satın alma tamamlanamadı. Daha sonra tekrar dene.":
        "Не удалось завершить покупку. Попробуйте позже.",
      "Kontrol ediliyor…": "Проверка…",
      "Satın alımların geri yüklendi.": "Покупки восстановлены.",
      "Geri yüklenecek bir satın alma bulunamadı.": "Покупок для восстановления не найдено.",
      "🌐 Dil": "🌐 Язык"
    },
    ja: {
      "Kart çek, görevi yap, birlikte eğlen.": "カードを引いて、お題に挑戦して、一緒に楽しもう。",
      "Oyuna Başla": "ゲーム開始",
      "💬 Geri bildirim": "💬 フィードバック",
      "Geri bildirim": "フィードバック",
      "Kimler oynuyor?": "参加者は？",
      "＋ Yeni oyuncu ekle": "＋ 参加者を追加",
      "Devam Et": "次へ",
      "← Geri": "← 戻る",
      "Bir mod seç": "モードを選択",
      "← Oyunculara dön": "← 参加者に戻る",
      "Bu mod için hangi görev türleri gelsin?": "このモードで出すお題の種類を選んでね。",
      "İstemediğin türü kapat. Her kartta Pas Geç de var.":
        "出したくない種類はオフにできます。どのカードもパスできます。",
      "Hepsini aç": "すべてオン",
      "🎴 Başla": "🎴 スタート",
      "← Mod seçimine dön": "← モード選択に戻る",
      "Hazır olunca kart çek 👇": "準備ができたらカードを引いてね 👇",
      "🎴 Kart Çek": "🎴 カードを引く",
      "⏭️ Pas Geç": "⏭️ パス",
      "← Türleri değiştir": "← お題の種類を変更",
      "Mod değiştir": "モードを変更",
      "Öneri": "提案",
      "Hata": "不具合",
      "Kart önerisi": "カードのアイデア",
      "Beğendim": "気に入った",
      "Önerini ya da bulduğun hatayı yaz. E-posta uygulaman hazır bir mesajla açılır, sen gönderirsin.":
        "アイデアや不具合を送ってください。メールアプリに下書きが開くので、送信してください。",
      "Mesajını yaz…": "メッセージを入力…",
      "📨 Gönder": "📨 送信",
      "Önce mesajını yaz.": "先にメッセージを入力してください。",
      "En az bir tür açık kalmalı.": "少なくとも1種類はオンにしてください。",
      "✅ Yaptık, Sonraki Kart": "✅ 完了、次のカード",
      "Kart ": "カード ",
      "Tema": "テーマ",
      "Cinsiyet seç": "性別を選択",
      "Kadın": "女性",
      "Erkek": "男性",
      "Belirtmek istemiyorum": "回答しない",
      "Partner cinsiyeti": "パートナーの性別",
      "Her ikisi": "すべて",
      "Partneri": "パートナー",
      "Rastgele": "ランダム",
      "Sohbet": "会話",
      "Sorular": "質問",
      "İtiraf": "告白",
      "Tahmin": "予想",
      "Hareket": "ジェスチャー",
      "Yaratıcı": "創作",
      "Meydan": "チャレンジ",
      "Yakınlık": "親密さ",
      "Günlük": "日常",
      "Sosyal": "SNS",
      "Çevre": "家族・友人",
      "Hayat": "人生",
      "Aşk": "恋愛",
      "Çılgın": "ハチャメチャ",
      "Romantik": "ロマンチック",
      "Eğlenceli": "お楽しみ",
      "Beni Ne Kadar Tanıyorsun": "私のこと、どれくらい知ってる？",
      "Uzak Mesafe": "遠距離",
      "Evde Gece": "おうちナイト",
      "Yeni Tanışanlar": "知り合ったばかり",
      "Gelecek": "未来",
      "Ok mu Nok mu": "あり？なし？",
      "İkisinden Birini Seç": "どっちを選ぶ？",
      "Duygusal ve yakın anlar": "心が通う親密な時間",
      "Oyun ve kahkaha dolu": "ゲームと笑いがいっぱい",
      "Birbirinizi ne kadar bilirsiniz?": "お互いのこと、どれくらい知ってる？",
      "Görüntülü konuşarak oynayın": "ビデオ通話で遊んでね",
      "Evde yapılacak keyifli şeyler": "家で楽しめること",
      "Çekinmeden, hafif ve tatlı": "気軽で、やさしく、楽しく",
      "Hayaller, planlar, hedefler": "夢、計画、目標",
      "Bu durum sizce normal mi?": "この状況、あり？なし？",
      "Hangisini seçersin?": "どっちを選ぶ？",
      "Kartı okuyan: ": "カードを読む人：",
      "Sıra: ": "順番：",
      "  |  Partner: ": "  |  パートナー：",
      "Cinsiyet seç.": "性別を選択してください。",
      "adını yaz.": "名前を入力してください。",
      "Aynı isim iki kez kullanılmış: ": "同じ名前が2回使われています：",
      ". İsimleri ayırt edilebilir yap.": "。区別できる名前にしてください。",
      " için seçtiğin partner cinsiyetinde (": " は、選んだ性別のパートナー候補がいません（",
      ") başka oyuncu yok. Partner cinsiyetini değiştir.":
        "）。パートナーの性別を変更してください。",
      "Seçili türlerde görev yok. Bir tür aç.":
        "選択した種類にカードがありません。種類を1つオンにしてください。",
      "Kodun başındaki e-posta adresi henüz değiştirilmemiş.":
        "フィードバック用メールアドレスがまだ設定されていません。",
      "İki Kalp Bir Deste geri bildirim": "「ふたつの心、ひと組のカード」へのフィードバック",
      "Dürüst ol ya da cesaretini göster": "正直に答えるか、勇気を見せよう",
      "Birlikte sayın: 3, 2, 1! Aynı anda 👍 (OK) ya da 👎 (NOK) gösterin, sonra nedenini anlatın.":
        "一緒に3、2、1と数えて！同時に👍（あり）か👎（なし）を出して、理由を話そう。",
      "İkiniz de gizlice seçin, aynı anda söyleyin ve nedenini anlatın.":
        "内緒で選び、同時に答えを言って、理由を話そう。",
      "Sıradaki oyuncu kendisi seçer. Aynı seçeneği arka arkaya 3 kez seçemezsin.":
        "次の人が選びます。同じ選択肢を3回連続では選べません。",
      "Bu seçenekte gösterilecek kart kalmadı. Türleri değiştirebilir ya da gizlenen kartları geri açabilirsin.":
        "この選択肢のカードはありません。種類を変更するか、非表示のカードを戻してください。",
      "Güzel oyundu! Bir sonraki oyunda görüşürüz 💜": "楽しかったね！また次のゲームで 💜",
      "Henüz hiç kart tamamlanmadı. “Yaptık” dediğin kartlar burada sayılır.":
        "まだ完了したカードはありません。「完了」を押したカードがここに表示されます。",
      "🎴 Kartlarım": "🎴 マイカード",
      "🃏 Kartlarım": "🃏 マイカード",
      "🃏 Kartlarım (kendi / gizlenen)": "🃏 マイカード（自作 / 非表示）",
      "✍️ Kendi kartın": "✍️ 自作カード",
      "🚫 Bir daha gösterme": "🚫 このカードを表示しない",
      "✍️ Kendi": "✍️ 自作",
      "🚫 Gizlenen": "🚫 非表示",
      "Hepsini geri aç": "すべて戻す",
      "Henüz kendi kartın yok.": "自作カードはまだありません。",
      "Gizlenmiş kart yok.": "非表示のカードはありません。",
      "Kendi görev kartını yaz": "自分のお題カードを書く",
      "＋ Kart Ekle": "＋ カードを追加",
      "Önce kartı yaz.": "先にカードを入力してください。",
      "Bu kart zaten var.": "このカードはすでにあります。",
      "Kart eklendi. Oyunda “Kendi” türünden gelir.":
        "カードを追加しました。「自作」カテゴリに表示されます。",
      "En fazla 100 kart ekleyebilirsin.": "カードは最大100枚まで追加できます。",
      "Doğruluk": "真実",
      "Cesaret": "挑戦",
      "Sıradaki:": "次の人：",
      " arka arkaya 2 kez Doğruluk seçti, bu sefer Cesaret.":
        " は「真実」を2回続けて選びました。今回は「挑戦」です。",
      " arka arkaya 2 kez Cesaret seçti, bu sefer Doğruluk.":
        " は「挑戦」を2回続けて選びました。今回は「真実」です。",
      "Doğruluk mu Cesaretlik mi": "真実か挑戦か",
      "Doğruluk mu, Cesaret mi?": "真実か挑戦、どっち？",
      "Ana menü": "メインメニュー",
      "🎉 Oyun Özeti": "🎉 ゲームのまとめ",
      "🏁 Oyunu bitir": "🏁 ゲームを終了",
      "🔁 Yeniden oyna": "🔁 もう一度遊ぶ",
      "okuyor": "読んでいます",
      "İpucu: “Partnerine …” yazarsan oyun partnerin adını kendisi koyar.":
        "ヒント：「パートナーに…と言って」と書くと、ゲームが名前を入れます。",
      "↩️ Aç": "↩️ 戻す",
      " – Başlat": " – 開始",
      " – Durdur": " – 停止",
      "Süre doldu!": "時間切れ！",
      " sn": "秒",
      " dakika": "分",
      " kart": "枚",
      " oyuncunun adı": "参加者の名前",
      "🕒 Süre": "🕒 時間",
      "✅ Tamamlanan": "✅ 完了",
      "⏭️ Atlanan": "⏭️ パス",
      "🏆 En çok gelen tür": "🏆 最多カテゴリ",
      "Gösterilecek kart kalmadı.": "表示できるカードはありません。",
      "Geri açmak için Kartlarım": "マイカードから戻してください",
      "Bir tür aç.": "カテゴリをオンにしてください。",
      "Kartı okuyan": "カードを読む人",
      "Birlikte eğlen.": "一緒に楽しもう。",
      "Kendi kartın": "自作カード",
      "Satın alımlar": "購入",
      "🛒 Satın alımlar": "🛒 購入",
      "🔓 Tüm modların kilidi": "🔓 すべてのモードを解放",
      "Ok mu Nok mu, İkisinden Birini Seç ve Doğruluk mu Cesaretlik mi modları açılır. Tek seferlik ödeme.":
        "「あり？なし？」「どっちを選ぶ？」「真実か挑戦か」のモードを解放します。お支払いは一度だけです。",
      "🚫 Reklamları kaldır": "🚫 広告を削除",
      "Tüm reklamlar kalıcı olarak kalkar: ekranın altındaki reklam ve oyun arasında çıkan tam ekran reklamlar. Tek seferlik ödeme.":
        "画面下のバナー広告やゲーム間の全画面広告を永久に削除します。お支払いは一度だけです。",
      "Satın alımlarımı geri yükle": "購入を復元",
      "✅ Açık": "✅ 解放済み",
      "Bu cihazda kullanılamıyor": "この端末では利用できません",
      "Satın alma bu cihazda kullanılamıyor.": "この端末では購入できません。",
      "Şu an alınamıyor": "現在購入できません",
      "Fiyat yükleniyor…": "価格を読み込み中…",
      "Satın al · ": "購入 · ",
      " modu kilitli. Açmak için aşağıdan satın alabilirsin.":
        "モードはロック中です。下から購入して解放できます。",
      "Teşekkürler! Satın alma tamamlandı 💜": "ありがとうございます！購入が完了しました 💜",
      "Satın alma işleniyor. Birkaç dakika sonra geri yükle düğmesine dokun.":
        "購入を処理中です。数分後に「購入を復元」を押してください。",
      "Google Play açılıyor…": "Google Playを開いています…",
      "Satın alma iptal edildi.": "購入をキャンセルしました。",
      "Satın alma tamamlanamadı. Daha sonra tekrar dene.":
        "購入を完了できませんでした。しばらくしてからもう一度お試しください。",
      "Kontrol ediliyor…": "確認中…",
      "Satın alımların geri yüklendi.": "購入を復元しました。",
      "Geri yüklenecek bir satın alma bulunamadı.": "復元できる購入が見つかりませんでした。",
      "🌐 Dil": "🌐 言語"
    },
    el: {
      "Kart çek, görevi yap, birlikte eğlen.":
        "Τράβηξε μια κάρτα, κάνε την πρόκληση και διασκεδάστε μαζί.",
      "Oyuna Başla": "Έναρξη παιχνιδιού",
      "💬 Geri bildirim": "💬 Σχόλια",
      "Geri bildirim": "Σχόλια",
      "Kimler oynuyor?": "Ποιοι παίζουν;",
      "＋ Yeni oyuncu ekle": "＋ Προσθήκη ατόμου",
      "Devam Et": "Συνέχεια",
      "← Geri": "← Πίσω",
      "Bir mod seç": "Επιλέξτε λειτουργία",
      "← Oyunculara dön": "← Πίσω στους παίκτες",
      "Bu mod için hangi görev türleri gelsin?":
        "Ποιες κατηγορίες προκλήσεων θέλετε σε αυτή τη λειτουργία;",
      "İstemediğin türü kapat. Her kartta Pas Geç de var.":
        "Απενεργοποιήστε τις κατηγορίες που δεν θέλετε. Μπορείτε να προσπεράσετε κάθε κάρτα.",
      "Hepsini aç": "Ενεργοποίηση όλων",
      "🎴 Başla": "🎴 Έναρξη",
      "← Mod seçimine dön": "← Πίσω στις λειτουργίες",
      "Hazır olunca kart çek 👇": "Τράβηξε κάρτα όταν είσαι έτοιμος 👇",
      "🎴 Kart Çek": "🎴 Τράβηξε κάρτα",
      "⏭️ Pas Geç": "⏭️ Παράλειψη",
      "← Türleri değiştir": "← Αλλαγή κατηγοριών",
      "Mod değiştir": "Αλλαγή λειτουργίας",
      "Öneri": "Πρόταση",
      "Hata": "Σφάλμα",
      "Kart önerisi": "Ιδέα για κάρτα",
      "Beğendim": "Μου αρέσει",
      "Önerini ya da bulduğun hatayı yaz. E-posta uygulaman hazır bir mesajla açılır, sen gönderirsin.":
        "Μοιραστείτε μια ιδέα ή αναφέρετε ένα πρόβλημα. Θα ανοίξει έτοιμο μήνυμα στην εφαρμογή email σας για να το στείλετε.",
      "Mesajını yaz…": "Γράψε το μήνυμά σου…",
      "📨 Gönder": "📨 Αποστολή",
      "Önce mesajını yaz.": "Γράψε πρώτα το μήνυμά σου.",
      "En az bir tür açık kalmalı.": "Πρέπει να παραμείνει ενεργή τουλάχιστον μία κατηγορία.",
      "✅ Yaptık, Sonraki Kart": "✅ Έγινε, επόμενη κάρτα",
      "Kart ": "Κάρτα ",
      "Tema": "Θέμα",
      "Cinsiyet seç": "Επιλέξτε φύλο",
      "Kadın": "Γυναίκα",
      "Erkek": "Άνδρας",
      "Belirtmek istemiyorum": "Προτιμώ να μην απαντήσω",
      "Partner cinsiyeti": "Φύλο συντρόφου",
      "Her ikisi": "Όλα",
      "Partneri": "Σύντροφος",
      "Rastgele": "Τυχαία",
      "Sohbet": "Συζήτηση",
      "Sorular": "Ερωτήσεις",
      "İtiraf": "Εξομολόγηση",
      "Tahmin": "Μαντεψιά",
      "Hareket": "Παντομίμα",
      "Yaratıcı": "Δημιουργικότητα",
      "Meydan": "Πρόκληση",
      "Yakınlık": "Οικειότητα",
      "Günlük": "Καθημερινότητα",
      "Sosyal": "Κοινωνικά δίκτυα",
      "Çevre": "Οικογένεια και φίλοι",
      "Hayat": "Ζωή",
      "Aşk": "Αγάπη",
      "Çılgın": "Τρελό",
      "Romantik": "Ρομαντικό",
      "Eğlenceli": "Διασκέδαση",
      "Beni Ne Kadar Tanıyorsun": "Πόσο καλά με ξέρεις;",
      "Uzak Mesafe": "Εξ αποστάσεως",
      "Evde Gece": "Βραδιά στο σπίτι",
      "Yeni Tanışanlar": "Γνωριμία",
      "Gelecek": "Μέλλον",
      "Ok mu Nok mu": "Εντάξει ή όχι;",
      "İkisinden Birini Seç": "Αυτό ή εκείνο",
      "Duygusal ve yakın anlar": "Τρυφερές και κοντινές στιγμές",
      "Oyun ve kahkaha dolu": "Παιχνίδι και γέλιο",
      "Birbirinizi ne kadar bilirsiniz?": "Πόσο καλά γνωρίζεστε;",
      "Görüntülü konuşarak oynayın": "Παίξτε με βιντεοκλήση",
      "Evde yapılacak keyifli şeyler": "Ωραίες δραστηριότητες στο σπίτι",
      "Çekinmeden, hafif ve tatlı": "Χαλαρό, ανάλαφρο και γλυκό",
      "Hayaller, planlar, hedefler": "Όνειρα, σχέδια και στόχοι",
      "Bu durum sizce normal mi?": "Σας φαίνεται φυσιολογική αυτή η κατάσταση;",
      "Hangisini seçersin?": "Τι θα διάλεγες;",
      "Kartı okuyan: ": "Διαβάζει την κάρτα: ",
      "Sıra: ": "Σειρά: ",
      "  |  Partner: ": "  |  Σύντροφος: ",
      "Cinsiyet seç.": "Επίλεξε φύλο.",
      "adını yaz.": "γράψε όνομα.",
      "Aynı isim iki kez kullanılmış: ": "Το ίδιο όνομα χρησιμοποιήθηκε δύο φορές: ",
      ". İsimleri ayırt edilebilir yap.": ". Χρησιμοποιήστε διαφορετικά ονόματα.",
      " için seçtiğin partner cinsiyetinde (":
        " δεν υπάρχει διαθέσιμος σύντροφος με το επιλεγμένο φύλο (",
      ") başka oyuncu yok. Partner cinsiyetini değiştir.":
        "). Άλλαξε την προτίμηση φύλου για τον σύντροφο.",
      "Seçili türlerde görev yok. Bir tür aç.":
        "Δεν υπάρχουν κάρτες στις επιλεγμένες κατηγορίες. Ενεργοποιήστε μία κατηγορία.",
      "Kodun başındaki e-posta adresi henüz değiştirilmemiş.":
        "Η διεύθυνση email για σχόλια δεν έχει ρυθμιστεί ακόμη.",
      "İki Kalp Bir Deste geri bildirim": "Σχόλια για το «Δύο καρδιές, μία τράπουλα»",
      "Dürüst ol ya da cesaretini göster": "Πες την αλήθεια ή δείξε θάρρος",
      "Birlikte sayın: 3, 2, 1! Aynı anda 👍 (OK) ya da 👎 (NOK) gösterin, sonra nedenini anlatın.":
        "Μετρήστε μαζί: 3, 2, 1! Δείξτε ταυτόχρονα 👍 (εντάξει) ή 👎 (όχι) και εξηγήστε γιατί.",
      "İkiniz de gizlice seçin, aynı anda söyleyin ve nedenini anlatın.":
        "Επιλέξτε κρυφά, αποκαλύψτε την απάντησή σας ταυτόχρονα και εξηγήστε γιατί.",
      "Sıradaki oyuncu kendisi seçer. Aynı seçeneği arka arkaya 3 kez seçemezsin.":
        "Ο επόμενος παίκτης επιλέγει. Δεν μπορείς να διαλέξεις την ίδια επιλογή τρεις φορές στη σειρά.",
      "Bu seçenekte gösterilecek kart kalmadı. Türleri değiştirebilir ya da gizlenen kartları geri açabilirsin.":
        "Δεν υπάρχουν άλλες κάρτες για αυτή την επιλογή. Άλλαξε κατηγορίες ή επανάφερε τις κρυφές κάρτες.",
      "Güzel oyundu! Bir sonraki oyunda görüşürüz 💜":
        "Ήταν πολύ ωραίο παιχνίδι! Τα λέμε την επόμενη φορά 💜",
      "Henüz hiç kart tamamlanmadı. “Yaptık” dediğin kartlar burada sayılır.":
        "Δεν έχει ολοκληρωθεί καμία κάρτα ακόμη. Εδώ θα μετρηθούν όσες σημειώσεις ως ολοκληρωμένες.",
      "🎴 Kartlarım": "🎴 Οι κάρτες μου",
      "🃏 Kartlarım": "🃏 Οι κάρτες μου",
      "🃏 Kartlarım (kendi / gizlenen)": "🃏 Οι κάρτες μου (δικές μου / κρυφές)",
      "✍️ Kendi kartın": "✍️ Δική μου κάρτα",
      "🚫 Bir daha gösterme": "🚫 Να μην εμφανιστεί ξανά",
      "✍️ Kendi": "✍️ Δικές μου",
      "🚫 Gizlenen": "🚫 Κρυφές",
      "Hepsini geri aç": "Επαναφορά όλων",
      "Henüz kendi kartın yok.": "Δεν έχεις δικές σου κάρτες ακόμη.",
      "Gizlenmiş kart yok.": "Δεν υπάρχουν κρυφές κάρτες.",
      "Kendi görev kartını yaz": "Γράψε τη δική σου κάρτα πρόκλησης",
      "＋ Kart Ekle": "＋ Προσθήκη κάρτας",
      "Önce kartı yaz.": "Γράψε πρώτα μια κάρτα.",
      "Bu kart zaten var.": "Αυτή η κάρτα υπάρχει ήδη.",
      "Kart eklendi. Oyunda “Kendi” türünden gelir.":
        "Η κάρτα προστέθηκε. Θα εμφανίζεται στην κατηγορία «Δικές μου».",
      "En fazla 100 kart ekleyebilirsin.": "Μπορείς να προσθέσεις έως 100 κάρτες.",
      "Doğruluk": "Αλήθεια",
      "Cesaret": "Θάρρος",
      "Sıradaki:": "Επόμενος:",
      " arka arkaya 2 kez Doğruluk seçti, bu sefer Cesaret.":
        " διάλεξε «Αλήθεια» δύο φορές στη σειρά· τώρα είναι η σειρά για «Θάρρος».",
      " arka arkaya 2 kez Cesaret seçti, bu sefer Doğruluk.":
        " διάλεξε «Θάρρος» δύο φορές στη σειρά· τώρα είναι η σειρά για «Αλήθεια».",
      "Doğruluk mu Cesaretlik mi": "Αλήθεια ή θάρρος",
      "Doğruluk mu, Cesaret mi?": "Αλήθεια ή θάρρος;",
      "Ana menü": "Κεντρικό μενού",
      "🎉 Oyun Özeti": "🎉 Σύνοψη παιχνιδιού",
      "🏁 Oyunu bitir": "🏁 Τέλος παιχνιδιού",
      "🔁 Yeniden oyna": "🔁 Παίξε ξανά",
      "okuyor": "διαβάζει",
      "İpucu: “Partnerine …” yazarsan oyun partnerin adını kendisi koyar.":
        "Συμβουλή: γράψε «Πες στον σύντροφό σου…» και το παιχνίδι θα βάλει αυτόματα το όνομά του.",
      "↩️ Aç": "↩️ Επαναφορά",
      " – Başlat": " – Έναρξη",
      " – Durdur": " – Παύση",
      "Süre doldu!": "Τέλος χρόνου!",
      " sn": " δευτ.",
      " dakika": " λεπ.",
      " kart": " κάρτες",
      " oyuncunun adı": " Όνομα παίκτη",
      "🕒 Süre": "🕒 Διάρκεια",
      "✅ Tamamlanan": "✅ Ολοκληρώθηκαν",
      "⏭️ Atlanan": "⏭️ Παραλείφθηκαν",
      "🏆 En çok gelen tür": "🏆 Συχνότερη κατηγορία",
      "Gösterilecek kart kalmadı.": "Δεν υπάρχουν άλλες κάρτες.",
      "Geri açmak için Kartlarım": "Επανάφερέ την από τις Κάρτες μου",
      "Bir tür aç.": "Ενεργοποίησε μια κατηγορία.",
      "Kartı okuyan": "Διαβάζει την κάρτα",
      "Birlikte eğlen.": "Διασκεδάστε μαζί.",
      "Kendi kartın": "Δική μου κάρτα",
      "Satın alımlar": "Αγορές",
      "🛒 Satın alımlar": "🛒 Αγορές",
      "🔓 Tüm modların kilidi": "🔓 Ξεκλείδωμα όλων των λειτουργιών",
      "Ok mu Nok mu, İkisinden Birini Seç ve Doğruluk mu Cesaretlik mi modları açılır. Tek seferlik ödeme.":
        "Ξεκλειδώνει τις λειτουργίες «Εντάξει ή όχι;», «Αυτό ή εκείνο» και «Αλήθεια ή θάρρος». Εφάπαξ πληρωμή.",
      "🚫 Reklamları kaldır": "🚫 Αφαίρεση διαφημίσεων",
      "Tüm reklamlar kalıcı olarak kalkar: ekranın altındaki reklam ve oyun arasında çıkan tam ekran reklamlar. Tek seferlik ödeme.":
        "Αφαιρεί οριστικά όλες τις διαφημίσεις: το κάτω banner και τις διαφημίσεις πλήρους οθόνης ανάμεσα στα παιχνίδια. Εφάπαξ πληρωμή.",
      "Satın alımlarımı geri yükle": "Επαναφορά αγορών",
      "✅ Açık": "✅ Ξεκλειδωμένο",
      "Bu cihazda kullanılamıyor": "Μη διαθέσιμο σε αυτή τη συσκευή",
      "Satın alma bu cihazda kullanılamıyor.": "Οι αγορές δεν είναι διαθέσιμες σε αυτή τη συσκευή.",
      "Şu an alınamıyor": "Μη διαθέσιμο αυτή τη στιγμή",
      "Fiyat yükleniyor…": "Φόρτωση τιμής…",
      "Satın al · ": "Αγορά · ",
      " modu kilitli. Açmak için aşağıdan satın alabilirsin.":
        " είναι κλειδωμένη. Μπορείς να την ξεκλειδώσεις παρακάτω.",
      "Teşekkürler! Satın alma tamamlandı 💜": "Ευχαριστούμε! Η αγορά ολοκληρώθηκε 💜",
      "Satın alma işleniyor. Birkaç dakika sonra geri yükle düğmesine dokun.":
        "Η αγορά ολοκληρώνεται. Πάτησε «Επαναφορά αγορών» σε λίγα λεπτά.",
      "Google Play açılıyor…": "Άνοιγμα Google Play…",
      "Satın alma iptal edildi.": "Η αγορά ακυρώθηκε.",
      "Satın alma tamamlanamadı. Daha sonra tekrar dene.":
        "Δεν ήταν δυνατή η ολοκλήρωση της αγοράς. Δοκίμασε ξανά αργότερα.",
      "Kontrol ediliyor…": "Έλεγχος…",
      "Satın alımların geri yüklendi.": "Οι αγορές επαναφέρθηκαν.",
      "Geri yüklenecek bir satın alma bulunamadı.": "Δεν βρέθηκαν αγορές για επαναφορά.",
      "🌐 Dil": "🌐 Γλώσσα"
    },
    "zh-CN": {
      "Kart çek, görevi yap, birlikte eğlen.": "抽张卡，完成挑战，一起享受游戏。",
      "Oyuna Başla": "开始游戏",
      "💬 Geri bildirim": "💬 反馈",
      "Geri bildirim": "反馈",
      "Kimler oynuyor?": "谁来玩？",
      "＋ Yeni oyuncu ekle": "＋ 添加玩家",
      "Devam Et": "继续",
      "← Geri": "← 返回",
      "Bir mod seç": "选择模式",
      "← Oyunculara dön": "← 返回玩家",
      "Bu mod için hangi görev türleri gelsin?": "选择此模式中要出现的挑战类型。",
      "İstemediğin türü kapat. Her kartta Pas Geç de var.": "关闭不想玩的类型。每张卡都可以跳过。",
      "Hepsini aç": "全部开启",
      "🎴 Başla": "🎴 开始",
      "← Mod seçimine dön": "← 返回模式选择",
      "Hazır olunca kart çek 👇": "准备好后抽一张卡 👇",
      "🎴 Kart Çek": "🎴 抽卡",
      "⏭️ Pas Geç": "⏭️ 跳过",
      "← Türleri değiştir": "← 更改类型",
      "Mod değiştir": "更改模式",
      "Öneri": "建议",
      "Hata": "错误",
      "Kart önerisi": "卡片建议",
      "Beğendim": "喜欢",
      "Önerini ya da bulduğun hatayı yaz. E-posta uygulaman hazır bir mesajla açılır, sen gönderirsin.":
        "分享建议或报告问题。邮件应用会打开一封写好的草稿，你可以发送。",
      "Mesajını yaz…": "输入消息…",
      "📨 Gönder": "📨 发送",
      "Önce mesajını yaz.": "请先输入消息。",
      "En az bir tür açık kalmalı.": "至少保留一个类型开启。",
      "✅ Yaptık, Sonraki Kart": "✅ 完成，下一张",
      "Kart ": "卡片 ",
      "Tema": "主题",
      "Cinsiyet seç": "选择性别",
      "Kadın": "女性",
      "Erkek": "男性",
      "Belirtmek istemiyorum": "不愿透露",
      "Partner cinsiyeti": "伴侣性别",
      "Her ikisi": "不限",
      "Partneri": "伴侣",
      "Rastgele": "随机",
      "Sohbet": "聊天",
      "Sorular": "问题",
      "İtiraf": "坦白",
      "Tahmin": "猜测",
      "Hareket": "表演",
      "Yaratıcı": "创意",
      "Meydan": "挑战",
      "Yakınlık": "亲密",
      "Günlük": "日常",
      "Sosyal": "社交媒体",
      "Çevre": "家人朋友",
      "Hayat": "生活",
      "Aşk": "爱情",
      "Çılgın": "疯狂",
      "Romantik": "浪漫",
      "Eğlenceli": "欢乐",
      "Beni Ne Kadar Tanıyorsun": "你有多了解我？",
      "Uzak Mesafe": "异地",
      "Evde Gece": "居家之夜",
      "Yeni Tanışanlar": "初次认识",
      "Gelecek": "未来",
      "Ok mu Nok mu": "可以还是不行？",
      "İkisinden Birini Seç": "二选一",
      "Duygusal ve yakın anlar": "温暖亲密的时刻",
      "Oyun ve kahkaha dolu": "游戏与欢笑",
      "Birbirinizi ne kadar bilirsiniz?": "你们有多了解彼此？",
      "Görüntülü konuşarak oynayın": "通过视频通话一起玩",
      "Evde yapılacak keyifli şeyler": "在家也能做的有趣活动",
      "Çekinmeden, hafif ve tatlı": "轻松、自然又甜蜜",
      "Hayaller, planlar, hedefler": "梦想、计划与目标",
      "Bu durum sizce normal mi?": "你们觉得这种情况正常吗？",
      "Hangisini seçersin?": "你会选哪个？",
      "Kartı okuyan: ": "读卡人：",
      "Sıra: ": "轮到：",
      "  |  Partner: ": "  |  伴侣：",
      "Cinsiyet seç.": "请选择性别。",
      "adını yaz.": "请输入姓名。",
      "Aynı isim iki kez kullanılmış: ": "这个名字重复了：",
      ". İsimleri ayırt edilebilir yap.": "。请使用不同的名字。",
      " için seçtiğin partner cinsiyetinde (": "没有符合所选伴侣性别的玩家（",
      ") başka oyuncu yok. Partner cinsiyetini değiştir.": "）。请更改伴侣性别偏好。",
      "Seçili türlerde görev yok. Bir tür aç.": "所选类型没有卡片。请开启一个类型。",
      "Kodun başındaki e-posta adresi henüz değiştirilmemiş.": "反馈邮箱尚未设置。",
      "İki Kalp Bir Deste geri bildirim": "《两颗心，一副牌》反馈",
      "Dürüst ol ya da cesaretini göster": "说实话，或展现勇气",
      "Birlikte sayın: 3, 2, 1! Aynı anda 👍 (OK) ya da 👎 (NOK) gösterin, sonra nedenini anlatın.":
        "一起倒数：3、2、1！同时举 👍（可以）或 👎（不行），然后解释原因。",
      "İkiniz de gizlice seçin, aynı anda söyleyin ve nedenini anlatın.":
        "各自悄悄选择，同时公布答案并说明理由。",
      "Sıradaki oyuncu kendisi seçer. Aynı seçeneği arka arkaya 3 kez seçemezsin.":
        "下一位玩家自行选择。同一选项不能连续选三次。",
      "Bu seçenekte gösterilecek kart kalmadı. Türleri değiştirebilir ya da gizlenen kartları geri açabilirsin.":
        "这个选项没有卡片了。请更改类型或恢复隐藏的卡片。",
      "Güzel oyundu! Bir sonraki oyunda görüşürüz 💜": "玩得很开心！下次再见 💜",
      "Henüz hiç kart tamamlanmadı. “Yaptık” dediğin kartlar burada sayılır.":
        "还没有完成的卡片。标记为“完成”的卡片会显示在这里。",
      "🎴 Kartlarım": "🎴 我的卡片",
      "🃏 Kartlarım": "🃏 我的卡片",
      "🃏 Kartlarım (kendi / gizlenen)": "🃏 我的卡片（自定义 / 隐藏）",
      "✍️ Kendi kartın": "✍️ 自定义卡片",
      "🚫 Bir daha gösterme": "🚫 不再显示此卡",
      "✍️ Kendi": "✍️ 自定义",
      "🚫 Gizlenen": "🚫 隐藏",
      "Hepsini geri aç": "全部恢复",
      "Henüz kendi kartın yok.": "还没有自定义卡片。",
      "Gizlenmiş kart yok.": "没有隐藏的卡片。",
      "Kendi görev kartını yaz": "编写自己的挑战卡",
      "＋ Kart Ekle": "＋ 添加卡片",
      "Önce kartı yaz.": "请先写一张卡片。",
      "Bu kart zaten var.": "这张卡片已存在。",
      "Kart eklendi. Oyunda “Kendi” türünden gelir.": "卡片已添加，会出现在“自定义”类型中。",
      "En fazla 100 kart ekleyebilirsin.": "最多可添加100张卡片。",
      "Doğruluk": "真心话",
      "Cesaret": "挑战",
      "Sıradaki:": "下一位：",
      " arka arkaya 2 kez Doğruluk seçti, bu sefer Cesaret.":
        "连续两次选择了真心话，这次请选择挑战。",
      " arka arkaya 2 kez Cesaret seçti, bu sefer Doğruluk.":
        "连续两次选择了挑战，这次请选择真心话。",
      "Doğruluk mu Cesaretlik mi": "真心话还是挑战",
      "Doğruluk mu, Cesaret mi?": "真心话还是挑战？",
      "Ana menü": "主菜单",
      "🎉 Oyun Özeti": "🎉 游戏总结",
      "🏁 Oyunu bitir": "🏁 结束游戏",
      "🔁 Yeniden oyna": "🔁 再玩一次",
      "okuyor": "正在读卡",
      "İpucu: “Partnerine …” yazarsan oyun partnerin adını kendisi koyar.":
        "提示：写“告诉你的伴侣……”，游戏会自动填入对方的名字。",
      "↩️ Aç": "↩️ 恢复",
      " – Başlat": " – 开始",
      " – Durdur": " – 停止",
      "Süre doldu!": "时间到！",
      " sn": "秒",
      " dakika": "分钟",
      " kart": "张卡片",
      " oyuncunun adı": "玩家姓名",
      "🕒 Süre": "🕒 时长",
      "✅ Tamamlanan": "✅ 已完成",
      "⏭️ Atlanan": "⏭️ 已跳过",
      "🏆 En çok gelen tür": "🏆 最常见类型",
      "Gösterilecek kart kalmadı.": "没有更多卡片了。",
      "Geri açmak için Kartlarım": "请在“我的卡片”中恢复",
      "Bir tür aç.": "请开启一个类型。",
      "Kartı okuyan": "读卡人",
      "Birlikte eğlen.": "一起享受游戏。",
      "Kendi kartın": "自定义卡片",
      "Satın alımlar": "购买",
      "🛒 Satın alımlar": "🛒 购买",
      "🔓 Tüm modların kilidi": "🔓 解锁所有模式",
      "Ok mu Nok mu, İkisinden Birini Seç ve Doğruluk mu Cesaretlik mi modları açılır. Tek seferlik ödeme.":
        "解锁“可以还是不行？”“二选一”和“真心话还是挑战”模式。一次性付款。",
      "🚫 Reklamları kaldır": "🚫 移除广告",
      "Tüm reklamlar kalıcı olarak kalkar: ekranın altındaki reklam ve oyun arasında çıkan tam ekran reklamlar. Tek seferlik ödeme.":
        "永久移除所有广告，包括底部横幅和游戏间的全屏广告。一次性付款。",
      "Satın alımlarımı geri yükle": "恢复购买",
      "✅ Açık": "✅ 已解锁",
      "Bu cihazda kullanılamıyor": "此设备上不可用",
      "Satın alma bu cihazda kullanılamıyor.": "此设备无法购买。",
      "Şu an alınamıyor": "目前无法购买",
      "Fiyat yükleniyor…": "正在加载价格…",
      "Satın al · ": "购买 · ",
      " modu kilitli. Açmak için aşağıdan satın alabilirsin.": "模式已锁定。可在下方购买解锁。",
      "Teşekkürler! Satın alma tamamlandı 💜": "谢谢！购买已完成 💜",
      "Satın alma işleniyor. Birkaç dakika sonra geri yükle düğmesine dokun.":
        "正在处理购买。几分钟后请点“恢复购买”。",
      "Google Play açılıyor…": "正在打开 Google Play…",
      "Satın alma iptal edildi.": "已取消购买。",
      "Satın alma tamamlanamadı. Daha sonra tekrar dene.": "购买未能完成，请稍后重试。",
      "Kontrol ediliyor…": "正在检查…",
      "Satın alımların geri yüklendi.": "已恢复购买。",
      "Geri yüklenecek bir satın alma bulunamadı.": "没有找到可恢复的购买。",
      "🌐 Dil": "🌐 语言"
    }
  };
  var molaMetinleri = {
    en: ["A short break", "We’ll continue in a moment"],
    de: ["Kurze Pause", "Gleich geht es weiter"],
    fr: ["Petite pause", "Nous reprenons dans un instant"],
    it: ["Breve pausa", "Riprenderemo tra poco"],
    es: ["Breve pausa", "Continuaremos en un momento"],
    pt: ["Pausa rápida", "Voltamos dentro de instantes"],
    ru: ["Короткий перерыв", "Скоро продолжим"],
    ja: ["少し休憩", "まもなく再開します"],
    el: ["Μικρό διάλειμμα", "Συνεχίζουμε σε λίγο"],
    "zh-CN": ["短暂休息", "我们马上继续"]
  };
  Object.keys(molaMetinleri).forEach(function (kod) {
    UI[kod]["Kısa bir mola"] = molaMetinleri[kod][0];
    UI[kod]["Birazdan kaldığımız yerden devam ediyoruz"] = molaMetinleri[kod][1];
  });
  if (window.UI_ZH_TW) {
    UI["zh-TW"] = window.UI_ZH_TW;
  } else if (window.CHINESE_TO_TRADITIONAL && UI["zh-CN"]) {
    UI["zh-TW"] = {};
    Object.keys(UI["zh-CN"]).forEach(function (k) {
      UI["zh-TW"][k] = window.CHINESE_TO_TRADITIONAL(UI["zh-CN"][k]);
    });
  }
  var kontrolHataMetinleri = {
    en: "Purchases could not be checked. Check your internet connection and try again.",
    de: "Käufe konnten nicht überprüft werden. Prüfe deine Internetverbindung und versuche es erneut.",
    fr: "Impossible de vérifier les achats. Vérifie ta connexion Internet et réessaie.",
    it: "Impossibile verificare gli acquisti. Controlla la connessione Internet e riprova.",
    es: "No se pudieron comprobar las compras. Revisa tu conexión a Internet e inténtalo de nuevo.",
    pt: "Não foi possível verificar as compras. Verifica a tua ligação à Internet e tenta novamente.",
    ru: "Не удалось проверить покупки. Проверь подключение к интернету и попробуй ещё раз.",
    ja: "購入情報を確認できませんでした。インターネット接続を確認して、もう一度お試しください。",
    el: "Δεν ήταν δυνατός ο έλεγχος των αγορών. Έλεγξε τη σύνδεσή σου στο διαδίκτυο και δοκίμασε ξανά.",
    "zh-CN": "无法核查购买记录。请检查网络连接后重试。",
    "zh-TW": "無法查詢購買紀錄。請檢查網路連線後再試一次。"
  };
  Object.keys(kontrolHataMetinleri).forEach(function (kod) {
    UI[kod]["Satın alımlar kontrol edilemedi. İnternet bağlantını kontrol edip tekrar dene."] =
      kontrolHataMetinleri[kod];
  });
  var bekleyenOdemeMetinleri = {
    "en": "Payment pending. Complete the payment steps in Google Play. Once confirmed, you can restore your purchases.",
    "de": "Die Zahlung steht noch aus. Schließe die Zahlung bei Google Play ab. Nach der Bestätigung kannst du deine Käufe wiederherstellen.",
    "fr": "Paiement en attente. Termine les étapes de paiement dans Google Play. Une fois le paiement confirmé, tu pourras restaurer tes achats.",
    "it": "Pagamento in sospeso. Completa i passaggi di pagamento in Google Play. Dopo la conferma potrai ripristinare i tuoi acquisti.",
    "es": "Pago pendiente. Completa los pasos de pago en Google Play. Una vez confirmado, podrás restaurar tus compras.",
    "pt": "Pagamento pendente. Conclua o pagamento no Google Play. Após a confirmação, você poderá restaurar suas compras.",
    "ru": "Платёж ожидает подтверждения. Заверши оплату в Google Play. После подтверждения ты сможешь восстановить покупки.",
    "ja": "お支払いは保留中です。Google Playで支払い手続きを完了してください。確認後、購入を復元できます。",
    "el": "Η πληρωμή εκκρεμεί. Ολοκλήρωσε τα βήματα πληρωμής στο Google Play. Μετά την επιβεβαίωση, μπορείς να επαναφέρεις τις αγορές σου.",
    "zh-CN": "付款待完成。请在 Google Play 中完成付款步骤。确认后即可恢复购买。",
    "zh-TW": "付款尚未完成。請在 Google Play 中完成付款步驟。確認後即可恢復購買。"
  };
  Object.keys(bekleyenOdemeMetinleri).forEach(function (kod) {
    UI[kod][
      "Ödeme beklemede. Google Play'deki ödeme adımlarını tamamla. Onaylandıktan sonra satın alımlarını geri yükleyebilirsin."
    ] = bekleyenOdemeMetinleri[kod];
  });
  // iOS store messages and the iOS privacy-policy button.
  var iosMagazaMetinleri = {
    "en": [
      "Opening the App Store…",
      "Payment is awaiting App Store approval. Once it’s approved, you can restore your purchases.",
      "Privacy Policy"
    ],
    "de": [
      "App Store wird geöffnet …",
      "Die Zahlung wartet auf die Bestätigung durch den App Store. Danach kannst du deine Käufe wiederherstellen.",
      "Datenschutzerklärung"
    ],
    "fr": [
      "Ouverture de l’App Store…",
      "Le paiement attend l’approbation de l’App Store. Une fois approuvé, tu pourras restaurer tes achats.",
      "Politique de confidentialité"
    ],
    "it": [
      "Apertura dell’App Store…",
      "Il pagamento è in attesa di approvazione dall’App Store. Dopo l’approvazione potrai ripristinare i tuoi acquisti.",
      "Informativa sulla privacy"
    ],
    "es": [
      "Abriendo App Store…",
      "El pago está pendiente de aprobación en App Store. Cuando se apruebe, podrás restaurar tus compras.",
      "Política de privacidad"
    ],
    "pt": [
      "Abrindo a App Store…",
      "O pagamento aguarda aprovação da App Store. Após a aprovação, você poderá restaurar suas compras.",
      "Política de privacidade"
    ],
    "ru": [
      "Открываем App Store…",
      "Платёж ожидает подтверждения в App Store. После подтверждения ты сможешь восстановить покупки.",
      "Политика конфиденциальности"
    ],
    "ja": [
      "App Storeを開いています…",
      "お支払いはApp Storeの承認待ちです。承認後、購入を復元できます。",
      "プライバシーポリシー"
    ],
    "el": [
      "Άνοιγμα του App Store…",
      "Η πληρωμή περιμένει έγκριση από το App Store. Μετά την έγκριση, μπορείς να επαναφέρεις τις αγορές σου.",
      "Πολιτική απορρήτου"
    ],
    "zh-CN": ["正在打开 App Store…", "付款正在等待 App Store 批准。批准后即可恢复购买。", "隐私政策"],
    "zh-TW": ["正在開啟 App Store…", "付款正在等待 App Store 核准。核准後即可恢復購買。", "隱私權政策"]
  };
  Object.keys(iosMagazaMetinleri).forEach(function (kod) {
    var a = iosMagazaMetinleri[kod];
    UI[kod]["App Store açılıyor…"] = a[0];
    UI[kod][
      "Ödeme App Store onayı bekliyor. Onaylandıktan sonra satın alımlarını geri yükleyebilirsin."
    ] = a[1];
    UI[kod]["Gizlilik politikası / Privacy Policy"] = a[2];
  });
  var kapaliKartMetinleri = {
    en: "Tap to draw",
    de: "Tippen, um eine Karte zu ziehen",
    fr: "Touche pour piocher",
    it: "Tocca per pescare",
    es: "Toca para sacar una carta",
    pt: "Toca para tirar uma carta",
    ru: "Нажми, чтобы вытянуть карту",
    ja: "タップしてカードを引く",
    el: "Πάτησε για να τραβήξεις κάρτα",
    "zh-CN": "轻触抽牌",
    "zh-TW": "輕觸抽牌"
  };
  Object.keys(kapaliKartMetinleri).forEach(function (kod) {
    UI[kod]["Çekmek için dokun"] = kapaliKartMetinleri[kod];
  });
  var sayacDevamMetinleri = {
    en: "Resume",
    de: "Fortsetzen",
    fr: "Reprendre",
    it: "Riprendi",
    es: "Reanudar",
    pt: "Retomar",
    ru: "Продолжить",
    ja: "再開",
    el: "Συνέχεια",
    "zh-CN": "继续",
    "zh-TW": "繼續"
  };
  Object.keys(sayacDevamMetinleri).forEach(function (kod) {
    UI[kod][" – Devam et"] = " – " + sayacDevamMetinleri[kod];
  });
  var OYUN_ADI = {
    en: ["Two Hearts,", "One Deck"],
    de: ["Zwei Herzen,", "ein Kartendeck"],
    fr: ["Deux cœurs,", "un jeu de cartes"],
    it: ["Due cuori,", "un mazzo di carte"],
    es: ["Dos corazones,", "una baraja"],
    pt: ["Dois corações,", "um baralho"],
    ru: ["Два сердца,", "одна колода"],
    ja: ["ふたつの心、", "ひと組のカード"],
    el: ["Δύο καρδιές,", "μία τράπουλα"],
    "zh-CN": ["两颗心，", "一副牌"],
    "zh-TW": ["兩顆心，", "一副牌"]
  };
  Object.keys(OYUN_ADI).forEach(function (kod) {
    UI[kod]["İki Kalp Bir Deste"] = OYUN_ADI[kod].join(" ");
  });
  var EKRAN_EKLERI = {
    "en": [
      "Next Card",
      "Mode",
      "Privacy options",
      "Privacy settings could not be opened. Check your connection and try again."
    ],
    "de": [
      "Nächste Karte",
      "Modus",
      "Datenschutzoptionen",
      "Die Datenschutzeinstellungen konnten nicht geöffnet werden. Prüfe deine Verbindung und versuche es erneut."
    ],
    "fr": [
      "Carte suivante",
      "Mode",
      "Options de confidentialité",
      "Impossible d’ouvrir les paramètres de confidentialité. Vérifie ta connexion et réessaie."
    ],
    "it": [
      "Carta successiva",
      "Modalità",
      "Opzioni sulla privacy",
      "Impossibile aprire le impostazioni sulla privacy. Controlla la connessione e riprova."
    ],
    "es": [
      "Siguiente tarjeta",
      "Modo",
      "Opciones de privacidad",
      "No se pudo abrir la configuración de privacidad. Revisa tu conexión e inténtalo de nuevo."
    ],
    "pt": [
      "Próxima carta",
      "Modo",
      "Opções de privacidade",
      "Não foi possível abrir as configurações de privacidade. Verifique sua conexão e tente novamente."
    ],
    "ru": [
      "Следующая карточка",
      "Режим",
      "Настройки конфиденциальности",
      "Не удалось открыть настройки конфиденциальности. Проверь подключение и попробуй ещё раз."
    ],
    "ja": [
      "次のカード",
      "モード",
      "プライバシー設定",
      "プライバシー設定を開けませんでした。接続を確認して、もう一度お試しください。"
    ],
    "el": [
      "Επόμενη κάρτα",
      "Λειτουργία",
      "Επιλογές απορρήτου",
      "Δεν ήταν δυνατό το άνοιγμα των ρυθμίσεων απορρήτου. Έλεγξε τη σύνδεσή σου και δοκίμασε ξανά."
    ],
    "zh-CN": ["下一张卡片", "模式", "隐私选项", "无法打开隐私设置。请检查网络连接后重试。"],
    "zh-TW": ["下一張卡片", "模式", "隱私選項", "無法開啟隱私設定。請檢查網路連線後再試一次。"]
  };
  Object.keys(EKRAN_EKLERI).forEach(function (k) {
    var a = EKRAN_EKLERI[k];
    UI[k]["➡️ Sonraki Kart"] = "➡️ " + a[0];
    UI[k]["Mod"] = a[1];
    UI[k]["Gizlilik seçenekleri"] = a[2];
    UI[k]["Gizlilik ayarları açılamadı. Bağlantını kontrol edip tekrar dene."] = a[3];
    UI[k]["Doğruluk mu, Cesaret mi? 👇"] = UI[k]["Doğruluk mu, Cesaret mi?"] + " 👇";
  });
  var dil = "tr";
  try {
    dil = localStorage.getItem("kartOyunDili") || "tr";
  } catch (e) {}
  if (
    !DILLER.some(function (x) {
      return x.kod === dil && x.aktif;
    })
  )
    dil = "tr";
  var satir1 = d.getElementById("oyunAdiSatir1"),
    satir2 = d.getElementById("oyunAdiSatir2");
  if (OYUN_ADI[dil]) {
    if (satir1) satir1.textContent = OYUN_ADI[dil][0];
    if (satir2) satir2.textContent = OYUN_ADI[dil][1];
  }
  // Display templates keep stored card text unchanged for hidden-card migration and timers.

  function kartIsimSablonu(k, t, isimli) {
    // Reciprocal references ("each other") and pronouns for objects are not player names.
    if (!isimli) {
      var acik = {
        en: /your partner/i,
        de: /Gegenüber/i,
        fr: /ton ou ta partenaire|son ou sa partenaire/i,
        it: /la persona che gioca con te/i,
        es: /tu pareja/i,
        pt: /sua pessoa parceira/i,
        ru: /партн[её]р/i,
        ja: /相手|パートナー|もう一人/,
        "zh-CN": /伴侣/,
        "zh-TW": /伴侶/,
        el: /το ταίρι σου|στο ταίρι σου/
      };
      if (!acik[k] || !acik[k].test(t)) return t;
    }
    var kurallar = {
      en: [[/your partner/gi, "{partner}"]],
      de: [
        [/deines Gegenübers|des Gegenübers/gi, "von {partner}"],
        [/deinem Gegenüber|dem Gegenüber|dein Gegenüber|das Gegenüber/gi, "{partner}"]
      ],
      fr: [
        [
          /ton ou ta partenaire|son ou sa partenaire|cette personne|l['’]autre personne|l['’]autre/gi,
          "{partner}"
        ],
        [/(Demande|Dis|Lis|Écris|Fais|Parle)-lui/gi, "$1 à {partner}"],
        [/qu['’]elle/gi, "que {partner}"],
        [/\belle\b/gi, "{partner}"],
        [/(Laisse|laisse)-la/g, "$1 {partner}"]
      ],
      it: [
        [/della persona che gioca con te/gi, "di {partner}"],
        [/alla persona che gioca con te/gi, "a {partner}"],
        [/la persona che gioca con te/gi, "{partner}"],
        [/dell['’]altra persona/gi, "di {partner}"],
        [/all['’]altra persona/gi, "a {partner}"],
        [/dall['’]altra persona/gi, "da {partner}"],
        [/nell['’]altra persona/gi, "in {partner}"],
        [/sull['’]altra persona/gi, "su {partner}"],
        [/l['’]altra persona|questa persona/gi, "{partner}"],
        [/\bDille\b/g, "Di’ a {partner}"],
        [/\bDalle\b/g, "Dai a {partner}"],
        [/Chiedi:/g, "Chiedi a {partner}:"],
        [/il o la partner/gi, "{partner}"],
        [/\blei\b/gi, "{partner}"]
      ],
      es: [
        [/tu pareja/gi, "{partner}"],
        [/Pregúntale:/g, "Pregúntale a {partner}:"]
      ],
      pt: [
        [/à (?:sua )?pessoa parceira/gi, "a {partner}"],
        [/da (?:sua )?pessoa parceira/gi, "de {partner}"],
        [/na (?:sua )?pessoa parceira/gi, "em {partner}"],
        [/pela (?:sua )?pessoa parceira/gi, "por {partner}"],
        [/(?:sua|a) pessoa parceira|essa pessoa/gi, "{partner}"],
        [/da outra pessoa/gi, "de {partner}"],
        [/na outra pessoa/gi, "em {partner}"],
        [/à outra pessoa/gi, "a {partner}"],
        [/a outra pessoa/gi, "{partner}"],
        [/Pergunte:/g, "Pergunte a {partner}:"],
        [/\bdela\b/gi, "de {partner}"],
        [/\bnela\b/gi, "em {partner}"],
        [/\bpara ela\b/gi, "para {partner}"],
        [/\bcom ela\b/gi, "com {partner}"],
        [/\bela\b/gi, "{partner}"]
      ],
      ja: [[/相手|パートナー|もう一人/g, "{partner}"]],
      "zh-CN": [[/你的伴侣|伴侣|对方/g, "{partner}"]],
      "zh-TW": [[/你的伴侶|伴侶|對方/g, "{partner}"]],
      el: [
        [/στο ταίρι σου|στον σύντροφό σου/g, "στο άτομο «{partner}»"],
        [/του συντρόφου σου|του άλλου|του\/της/g, "του ατόμου «{partner}»"],
        [/το ταίρι σου|τον σύντροφό σου|τον\/την/g, "το άτομο «{partner}»"],
        [/Ρώτησε:/g, "Ρώτησε το άτομο «{partner}»:"]
      ]
    };
    (kurallar[k] || []).forEach(function (r) {
      t = t.replace(r[0], r[1]);
    });
    if (k === "ru")
      t = t.replace(/партн[её]р(?:ом|у|а|е)?(?![а-яё])/gi, function (m) {
        var forms = {
            "партнёр": "игрок",
            "партнёра": "игрока",
            "партнёру": "игроку",
            "партнёром": "игроком",
            "партнёре": "игроке"
          },
          w = forms[m.toLowerCase().replace("партнер", "партнёр")];
        if (!w) return m;
        if (m[0] !== m[0].toLowerCase()) w = w[0].toUpperCase() + w.slice(1);
        return w + " «{partner}»";
      });
    if (k === "ru") t = t.replace(/Спроси:/g, "Спроси игрока «{partner}»:");
    return t;
  }

  // Zero-based card indices follow the existing locale packs.
  var KART_ISIM_DUZELTMELERI = {
    "en": {
      "Romantik": {
        "4": "Describe your most romantic memory with {partner} in detail.",
        "17": "Confess how nervous you were on your first date with {partner}.",
        "20": "Confess how long you thought about it before saying ‘I love you’ to {partner} for the first time.",
        "25": "Make a three-song playlist to listen to with {partner} and explain your choices."
      },
      "Eğlenceli": {
        "19": "Make up a short song lyric with {partner} using three words, then sing it together."
      },
      "Uzak Mesafe": {
        "17": "Write and read a mini itinerary for your next meetup with {partner}."
      },
      "Gelecek": {
        "24": "Confess a dream about your future with {partner} that you’ve never shared."
      },
      "Doğruluk mu Cesaretlik mi": {
        "3": "What moment in your relationship with {partner} made you happiest?",
        "19": "What’s the first image that comes to mind when you picture growing old with {partner}?"
      }
    },
    "de": {
      "Romantik": {
        "1": "Erzähl {partner}, was du beim ersten Treffen gedacht hast.",
        "2": "Erzähl {partner}, was dich heute am glücklichsten gemacht hat.",
        "4": "Erzähl ausführlich von deinem romantischsten gemeinsamen Moment mit {partner}.",
        "6": "Erzähl {partner}, wann du zum ersten Mal sagen wolltest: „Schön, dass es dich gibt.“",
        "17": "Gesteh, wie aufgeregt du bei deinem ersten Date mit {partner} warst.",
        "20": "Gesteh, wie lange du überlegt hast, bevor du zum ersten Mal „Ich liebe dich“ zu {partner} gesagt hast.",
        "25": "Stell eine Playlist mit drei Liedern zum gemeinsamen Hören mit {partner} zusammen und erklär deine Auswahl.",
        "27": "Spiele mit {partner} eine romantische Filmszene eine Minute lang nach."
      },
      "Eğlenceli": {
        "19": "Erfinde mit {partner} aus drei Wörtern einen kurzen Songtext und singt ihn zusammen."
      },
      "Beni Ne Kadar Tanıyorsun": {
        "25": "Erzähl, was du von {partner} gelernt hast und was dich daran am meisten überrascht hat.",
        "28": "Erstelle für {partner} eine „Lern mich kennen“-Karte: drei Lieblingssachen und eine schräge Angewohnheit."
      },
      "Uzak Mesafe": {
        "3": "Erzähl {partner} von etwas Schönem, das du gerade sehen kannst.",
        "16": "Bereite für heute Abend eine kleine Überraschungsnachricht für {partner} vor und schick sie ab.",
        "17": "Schreib einen kleinen Plan für dein nächstes Treffen mit {partner} und lies ihn vor."
      },
      "Gelecek": {
        "24": "Gesteh einen Traum über deine gemeinsame Zukunft mit {partner}, den du noch nie erzählt hast."
      },
      "Ok mu Nok mu": {
        "0": "{partner} schaut beim Essen aufs Handy.",
        "1": "{partner} nimmt den letzten Bissen, ohne zu fragen.",
        "3": "{partner} möchte jeden Morgen zur gleichen Zeit aufstehen.",
        "4": "{partner} hält etwas geheim, um dich zu überraschen.",
        "8": "{partner} leiht sich deine Sachen aus, ohne zu fragen.",
        "9": "{partner} folgt einer früheren Beziehungsperson in sozialen Medien.",
        "10": "Vor jedem Foto {partner} fragen, ob du es posten darfst.",
        "12": "{partner} likt deine Story nicht sofort.",
        "14": "{partner} likt Fotos anderer Leute in sozialen Medien.",
        "17": "{partner} antwortet stundenlang nicht auf deine Nachricht.",
        "18": "{partner} möchte jedes Wochenende mit der Familie essen.",
        "20": "{partner} ist mit dem eigenen besten Freund oder der eigenen besten Freundin sehr vertraut.",
        "21": "Die Familie von {partner} äußert sich zu eurer Beziehung.",
        "23": "{partner} ist mit Freunden bis spät in die Nacht unterwegs.",
        "24": "{partner} wartet lange, bevor du den eigenen Freundeskreis kennenlernst."
      },
      "Doğruluk mu Cesaretlik mi": {
        "3": "Welcher Moment in deiner Beziehung mit {partner} hat dich am glücklichsten gemacht?",
        "6": "Hast du etwas für {partner} getan, ohne es zu erwähnen?",
        "23": "Zeichne ein Herz und schenke es {partner}.",
        "30": "Zeig dein liebstes gemeinsames Foto mit {partner} auf deinem Handy und erzähl seine Geschichte.",
        "35": "Wenn {partner} einverstanden ist, gib {partner} einen kleinen Kuss auf die Wange.",
        "36": "Spiele mit {partner} eine Filmszene eine Minute lang nach."
      }
    },
    "ja": {
      "Romantik": {
        "1": "{partner}に初めて会ったときに何を思ったか話して。",
        "4": "{partner}とのいちばんロマンチックな思い出を詳しく話して。",
        "6": "初めて{partner}に「いてくれてよかった」と伝えたいと思ったときのことを話して。",
        "17": "{partner}との初デートでどれだけ緊張していたか打ち明けて。",
        "20": "初めて{partner}に「愛してる」と言うまでどれだけ考えたか打ち明けて。",
        "24": "{partner}のために4行の詩を書いて、声に出して読んで。",
        "25": "{partner}と聴く3曲のプレイリストを作り、選んだ理由を話して。",
        "27": "{partner}とロマンチックな映画のワンシーンを1分間演じて。",
        "28": "いちばん優しい声で{partner}に子守歌を口ずさんで。"
      },
      "Eğlenceli": {
        "19": "{partner}と3つの言葉を使って短い歌詞を作り、一緒に歌って。"
      },
      "Beni Ne Kadar Tanıyorsun": {
        "28": "{partner}に渡す「私を知って」カードを作って：好きなもの3つと変わった習慣1つ。"
      },
      "Uzak Mesafe": {
        "12": "{partner}にいちばんメッセージを送りたかったのに送らなかったときを打ち明けて。",
        "16": "今夜、{partner}への小さなサプライズメッセージを用意して送って。",
        "17": "次に{partner}に会うときのミニ予定を書いて、読み上げて。"
      },
      "Gelecek": {
        "24": "{partner}との将来について、まだ話していない夢を打ち明けて。"
      },
      "Ok mu Nok mu": {
        "0": "{partner}が食事中にスマホを見る。",
        "1": "{partner}が聞かずに最後のひと口を食べる。",
        "3": "{partner}が毎朝同じ時間に起きたがる。",
        "4": "{partner}があなたを驚かせるために何かを隠しておく。",
        "8": "{partner}があなたの物を断りなく借りる。",
        "9": "{partner}が元恋人をSNSでフォローする。",
        "12": "{partner}があなたのストーリーにすぐ「いいね」しない。",
        "14": "{partner}がSNSで他の人の写真に「いいね」する。",
        "17": "{partner}があなたのメッセージに何時間も返信しない。",
        "18": "{partner}が毎週末、家族と食事をしたがる。",
        "20": "{partner}が自分の親友ととても親しい。",
        "23": "{partner}が友人と夜遅くまで外出する。",
        "24": "{partner}が自分の友人をあなたに紹介するまで長く待つ。"
      },
      "Doğruluk mu Cesaretlik mi": {
        "3": "{partner}との関係でいちばん幸せだった瞬間は？",
        "16": "{partner}と一緒に過ごした中でいちばん素敵な日は？",
        "19": "{partner}と一緒に年を重ねる姿を想像したとき、最初に浮かぶ光景は？",
        "30": "スマホにある{partner}とのお気に入りのツーショットを見せて、その写真の話をして。",
        "36": "{partner}と映画のワンシーンを1分間演じて。"
      }
    },
    "zh-CN": {
      "Romantik": {
        "1": "说说你初次见到{partner}时的想法。",
        "3": "对{partner}说一句此刻想到的暖心话。",
        "4": "详细讲讲你和{partner}最浪漫的一段回忆。",
        "17": "坦白你和{partner}第一次约会时有多紧张。",
        "20": "坦白你第一次对{partner}说“我爱你”之前想了多久。",
        "25": "制作一份三首歌的歌单，留着和{partner}一起听，并说说选择理由。",
        "27": "和{partner}一起演一段浪漫电影场景，持续一分钟。"
      },
      "Eğlenceli": {
        "19": "和{partner}用三个词一起编一段歌词，然后唱出来。"
      },
      "Beni Ne Kadar Tanıyorsun": {
        "28": "给{partner}制作一张“认识我”卡片：写三样最爱和一个奇怪习惯。"
      },
      "Uzak Mesafe": {
        "17": "写一个下次和{partner}见面的小计划并读出来。"
      },
      "Gelecek": {
        "24": "坦白一个关于你和{partner}共同未来、从未分享过的梦想。"
      },
      "Ok mu Nok mu": {
        "0": "{partner}吃饭时看手机。",
        "1": "{partner}不问一声就吃掉最后一口。",
        "3": "{partner}每天早上都想在同一时间起床。",
        "4": "{partner}为了给你准备惊喜而隐瞒一件事。",
        "8": "{partner}不问一声就借用你的东西。",
        "9": "{partner}在社交媒体上关注前任。",
        "12": "{partner}没有马上给你的动态点赞。",
        "14": "{partner}给社交媒体上其他人的照片点赞。",
        "17": "{partner}好几个小时不回复你的消息。",
        "18": "{partner}每个周末都想和家人吃饭。",
        "20": "{partner}与自己最好的朋友非常亲密。",
        "23": "{partner}和朋友在外面待到很晚。",
        "24": "{partner}很久之后才把自己的朋友介绍给你。"
      },
      "Doğruluk mu Cesaretlik mi": {
        "3": "你和{partner}的关系中，哪个时刻让你最幸福？",
        "16": "你和{partner}一起度过的最美好的一天是哪天？",
        "19": "想象你和{partner}一起变老时，脑海里最先出现的画面是什么？",
        "30": "在手机上展示你最喜欢的一张与{partner}的合照，并讲讲背后的故事。",
        "36": "和{partner}一起演一段电影场景，持续一分钟。"
      }
    },
    "zh-TW": {
      "Romantik": {
        "1": "說說你初次見到{partner}時的想法。",
        "3": "對{partner}說一句此刻想到的暖心話。",
        "4": "詳細講講你和{partner}最浪漫的一段回憶。",
        "17": "坦白你和{partner}第一次約會時有多緊張。",
        "20": "坦白你第一次對{partner}說「我愛你」之前想了多久。",
        "25": "製作一份三首歌的歌單，留著和{partner}一起聽，並說說選擇理由。",
        "27": "和{partner}一起演一段浪漫電影場景，持續一分鐘。"
      },
      "Eğlenceli": {
        "19": "和{partner}用三個詞一起編一段歌詞，然後唱出來。"
      },
      "Beni Ne Kadar Tanıyorsun": {
        "28": "給{partner}製作一張「認識我」卡片：寫三樣最愛和一個奇怪習慣。"
      },
      "Uzak Mesafe": {
        "17": "寫一個下次和{partner}見面的小計畫並讀出來。"
      },
      "Gelecek": {
        "24": "坦白一個關於你和{partner}共同未來、從未分享過的夢想。"
      },
      "Ok mu Nok mu": {
        "0": "{partner}吃飯時看手機。",
        "1": "{partner}不問一聲就吃掉最後一口。",
        "3": "{partner}每天早上都想在同一時間起床。",
        "4": "{partner}為了給你準備驚喜而隱瞞一件事。",
        "8": "{partner}不問一聲就借用你的東西。",
        "9": "{partner}在社群媒體上關注前任。",
        "12": "{partner}沒有馬上給你的動態按讚。",
        "14": "{partner}在社群媒體上給其他人的照片按讚。",
        "17": "{partner}好幾個小時不回覆你的訊息。",
        "18": "{partner}每個週末都想和家人吃飯。",
        "20": "{partner}與自己最好的朋友非常親密。",
        "23": "{partner}和朋友在外面待到很晚。",
        "24": "{partner}很久之後才把自己的朋友介紹給你。"
      },
      "Doğruluk mu Cesaretlik mi": {
        "3": "你和{partner}的關係中，哪個時刻讓你最幸福？",
        "16": "你和{partner}一起度過的最美好的一天是哪天？",
        "19": "想像你和{partner}一起變老時，腦海裡最先出現的畫面是什麼？",
        "30": "在手機上展示你最喜歡的一張與{partner}的合照，並講講背後的故事。",
        "36": "和{partner}一起演一段電影場景，持續一分鐘。"
      }
    },
    "fr": {
      "Romantik": {
        "1": "Raconte à {partner} ce que tu as pensé lors de votre première rencontre.",
        "2": "Dis à {partner} ce qui t’a apporté le plus de joie aujourd’hui.",
        "4": "Raconte en détail ton souvenir le plus romantique avec {partner}.",
        "6": "Raconte quand tu as voulu dire à {partner} pour la première fois : « Quel bonheur que tu sois là. »",
        "9": "Prends {partner} dans tes bras pendant 20 secondes.",
        "11": "Dépose un petit baiser sur le front ou la joue de {partner}.",
        "16": "Demande à {partner} : Quel petit geste de ma part te fait le plus plaisir ?",
        "17": "Avoue à quel point tu étais nerveux ou nerveuse lors de ton premier rendez-vous avec {partner}.",
        "20": "Avoue combien de temps tu as réfléchi avant de dire « Je t’aime » à {partner} pour la première fois.",
        "25": "Crée une playlist de trois chansons à écouter avec {partner} et explique tes choix.",
        "27": "Joue une scène de film romantique avec {partner} pendant une minute.",
        "31": "Ferme les yeux et décris le visage de {partner}, puis rouvre les yeux et comparez."
      },
      "Eğlenceli": {
        "19": "Invente avec {partner} des paroles de chanson avec trois mots, puis chantez-les."
      },
      "Beni Ne Kadar Tanıyorsun": {
        "1": "Devine la couleur, la chanson et le film préférés de {partner}. Combien de bonnes réponses as-tu ?",
        "3": "Devine la plus grande peur de {partner}.",
        "5": "Devine la destination de vacances préférée de {partner}.",
        "6": "Devine l’humeur de {partner} aujourd’hui en un mot.",
        "7": "Devine la saison préférée de {partner} et pourquoi.",
        "11": "Devine ce qui faisait le plus peur à {partner} pendant l’enfance.",
        "13": "Devine le dessert préféré de {partner}, puis demande si tu as trouvé.",
        "27": "Crée la fiche d’identité de {partner} : prénom, plat préféré et chanson préférée. Laisse {partner} vérifier.",
        "28": "Prépare pour {partner} une carte « Apprends à me connaître » avec trois favoris et une habitude étrange."
      },
      "Uzak Mesafe": {
        "12": "Avoue le moment où tu as eu le plus envie d’écrire à {partner} sans finalement le faire.",
        "16": "Prépare et envoie à {partner} un petit message surprise pour ce soir.",
        "17": "Écris un mini-programme pour tes prochaines retrouvailles avec {partner} et lis-le."
      },
      "Gelecek": {
        "24": "Avoue un rêve concernant ton avenir avec {partner} que tu n’as jamais raconté."
      },
      "Ok mu Nok mu": {
        "0": "{partner} regarde son téléphone en mangeant.",
        "1": "{partner} prend la dernière bouchée sans demander.",
        "3": "{partner} veut se lever à la même heure chaque matin.",
        "4": "{partner} cache quelque chose pour te préparer une surprise.",
        "8": "{partner} emprunte tes affaires sans demander.",
        "9": "{partner} suit son ex sur les réseaux sociaux.",
        "10": "Demander à {partner} avant de publier chaque photo.",
        "12": "{partner} n’aime pas tout de suite ta story.",
        "14": "{partner} aime les photos d’autres personnes sur les réseaux sociaux.",
        "17": "{partner} met des heures à répondre à ton message.",
        "18": "{partner} veut dîner en famille chaque week-end.",
        "20": "{partner} est très proche de son meilleur ami ou de sa meilleure amie.",
        "23": "{partner} reste dehors tard avec ses amis.",
        "24": "{partner} attend longtemps avant de te présenter ses amis."
      },
      "Doğruluk mu Cesaretlik mi": {
        "3": "Quel moment de ta relation avec {partner} t’a apporté le plus de bonheur ?",
        "9": "Qu’aimerais-tu faire avec {partner} que vous n’avez pas encore fait ?",
        "10": "Qu’est-ce qui t’inquiète le plus et comment {partner} peut t’aider ?",
        "16": "Quel a été le plus beau jour passé avec {partner} ?",
        "26": "Invente pour {partner} un poème de quatre vers rempli de compliments et lis-le.",
        "28": "Prends {partner} dans tes bras pendant 20 secondes.",
        "29": "Prends la main de {partner} et dis-lui trois choses gentilles.",
        "30": "Montre sur ton téléphone ta photo préférée avec {partner} et raconte son histoire.",
        "34": "Écris un mot avec ton doigt sur le dos de {partner} et demande-lui de le deviner.",
        "36": "Joue une scène de film avec {partner} pendant une minute.",
        "38": "Fais cinq compliments différents à {partner} sans te répéter."
      },
      "Yeni Tanışanlar": {
        "7": "Demande à {partner} : Quel endroit aimerais-tu visiter pour la première fois ?"
      }
    },
    "it": {
      "Romantik": {
        "0": "Di’ a {partner} tre cose che ami di questa persona.",
        "1": "Racconta a {partner} cosa hai pensato al vostro primo incontro.",
        "4": "Racconta nei dettagli il tuo ricordo più romantico con {partner}.",
        "6": "Racconta quando hai pensato per la prima volta di dire a {partner}: «Sono felice che tu ci sia».",
        "10": "Prendi le mani di {partner} e ringrazia per tre cose.",
        "17": "Confessa quanta emozione hai provato al tuo primo appuntamento con {partner}.",
        "18": "Confessa una tua dolce abitudine che non hai mai raccontato a {partner}.",
        "20": "Confessa quanto ci hai pensato prima di dire «Ti amo» a {partner} per la prima volta.",
        "22": "Leggi a {partner} una lettera d’amore divertente e romantica di due frasi.",
        "23": "Disegna un piccolo cuore o un biglietto d’amore per {partner} in un minuto.",
        "24": "Scrivi una poesia di quattro versi per {partner} e leggila ad alta voce.",
        "25": "Prepara una playlist di tre canzoni da ascoltare con {partner} e spiega le tue scelte.",
        "26": "Invita {partner} a ballare un lento e ballate insieme per una canzone.",
        "27": "Recita con {partner} una scena romantica di un film per un minuto.",
        "28": "Canticchia una ninna nanna per {partner} con la tua voce più dolce.",
        "29": "Fai a {partner} più complimenti possibile in 30 secondi.",
        "31": "Chiudi gli occhi e descrivi il viso di {partner}, poi riapri gli occhi e confrontatevi."
      },
      "Eğlenceli": {
        "19": "Inventa con {partner} un breve testo di canzone usando tre parole e cantatelo insieme.",
        "29": "Confessa qualcosa che facevi durante l'infanzia e che ancora oggi ti fa ridere."
      },
      "Beni Ne Kadar Tanıyorsun": {
        "0": "Indovina il piatto preferito di {partner} e poi chiedi se hai indovinato.",
        "1": "Indovina il colore, la canzone e il film preferiti di {partner}. Quanti ne hai azzeccati?",
        "2": "Indovina quale lavoro sognava di fare {partner} durante l’infanzia.",
        "3": "Indovina la paura più grande di {partner}.",
        "4": "Indovina cosa farebbe {partner} se per un giorno potesse fare qualsiasi cosa.",
        "5": "Indovina la meta di vacanza preferita di {partner}.",
        "6": "Indovina l’umore di {partner} oggi in una parola.",
        "7": "Indovina la stagione preferita di {partner} e il motivo.",
        "8": "Indovina quale cantante ascolta più spesso {partner} sul telefono.",
        "9": "Indovina qual è la prima cosa che fa {partner} appena si sveglia.",
        "10": "Indovina il momento in cui {partner} sorride di più.",
        "11": "Indovina cosa spaventava di più {partner} durante l’infanzia.",
        "12": "Indovina quale serie o film potrebbe guardare {partner} senza stancarsi.",
        "13": "Indovina il dolce preferito di {partner} e chiedi se hai indovinato.",
        "28": "Prepara per {partner} una carta «Conoscimi»: tre cose preferite e un’abitudine strana."
      },
      "Uzak Mesafe": {
        "3": "Racconta a {partner} una cosa bella che vedi da dove ti trovi.",
        "12": "Confessa quando hai avuto più voglia di scrivere a {partner}, ma poi non l’hai fatto.",
        "15": "Scrivi un messaggio a {partner} su un foglio e mostralo alla videocamera.",
        "16": "Prepara e invia un piccolo messaggio a sorpresa a {partner} per stasera.",
        "17": "Scrivi e leggi un mini-programma per il tuo prossimo incontro con {partner}."
      },
      "Evde Gece": {
        "18": "Fai un massaggio alle spalle a {partner} per un minuto, poi scambiatevi.",
        "21": "Fai un massaggio alle mani a {partner} per un minuto, poi scambiatevi.",
        "29": "Confessa il piccolo piacere che ti concedi più spesso quando hai la casa tutta per te."
      },
      "Gelecek": {
        "3": "Racconta come vorresti trascorrere una giornata in età avanzata.",
        "24": "Confessa un sogno sul tuo futuro con {partner} che non hai mai raccontato."
      },
      "Ok mu Nok mu": {
        "0": "{partner} guarda il telefono mentre mangia.",
        "1": "{partner} prende l’ultimo boccone senza chiedere.",
        "3": "{partner} vuole svegliarsi alla stessa ora ogni mattina.",
        "4": "{partner} nasconde qualcosa per prepararti una sorpresa.",
        "7": "Sentire l'obbligo di mandarsi il buongiorno ogni giorno.",
        "8": "{partner} prende in prestito le tue cose senza chiedere.",
        "9": "{partner} segue il proprio ex sui social.",
        "12": "{partner} non mette subito mi piace alla tua storia.",
        "14": "{partner} mette mi piace alle foto di altre persone sui social.",
        "17": "{partner} impiega ore a rispondere al tuo messaggio.",
        "18": "{partner} vuole cenare con la famiglia ogni fine settimana.",
        "20": "{partner} ha molta confidenza con il proprio migliore amico o la propria migliore amica.",
        "23": "{partner} fa tardi fuori con gli amici.",
        "24": "{partner} aspetta molto prima di presentarti i propri amici."
      },
      "Doğruluk mu Cesaretlik mi": {
        "2": "C’è una cosa carina che non hai mai detto a {partner} ma vorresti dire? Dilla ora.",
        "3": "Qual è stato il momento più felice della tua relazione con {partner}?",
        "7": "Se volessi fare una sorpresa a {partner} un giorno, cosa faresti?",
        "16": "Qual è stato il giorno più bello passato con {partner}?",
        "17": "Qual è la prima cosa che ti ha detto {partner} e che non dimenticherai mai?",
        "19": "Qual è la prima immagine che ti viene in mente quando immagini di invecchiare con {partner}?",
        "26": "Inventa per {partner} una poesia di quattro versi con complimenti e leggila ad alta voce.",
        "29": "Prendi la mano di {partner} e di’ tre cose belle.",
        "30": "Mostra sul telefono la tua foto preferita con {partner} e raccontane la storia.",
        "34": "Scrivi una parola sulla schiena di {partner} con un dito e lascia che {partner} la indovini.",
        "35": "Se {partner} è d’accordo, dai a {partner} un piccolo bacio sulla guancia.",
        "36": "Recita insieme a {partner} una scena di un film per un minuto.",
        "38": "Fai cinque complimenti diversi a {partner} senza ripeterti."
      },
      "Yeni Tanışanlar": {
        "1": "Racconta il tuo gioco preferito durante l'infanzia.",
        "7": "Chiedi a {partner}: Quale luogo vorresti visitare per la prima volta?",
        "27": "Descrivi {partner} con tre emoji e chiedi se ci hai preso."
      },
      "İkisinden Birini Seç": {
        "1": "Alzarsi presto o fare le ore piccole?"
      }
    },
    "pt": {
      "Romantik": {
        "1": "Conte a {partner} o que você pensou quando vocês se conheceram.",
        "3": "Diga a {partner} algo bonito que vier à sua cabeça.",
        "4": "Conte em detalhes sua lembrança mais romântica com {partner}.",
        "6": "Conte quando você quis dizer a {partner} pela primeira vez: «Que bom que você existe».",
        "17": "Confesse quanto nervosismo sentiu no seu primeiro encontro com {partner}.",
        "20": "Confesse quanto tempo pensou antes de dizer «eu te amo» a {partner} pela primeira vez.",
        "23": "Desenhe um coraçãozinho ou um bilhete carinhoso para {partner} em um minuto.",
        "24": "Escreva um poema de quatro versos para {partner} e leia em voz alta.",
        "25": "Monte uma playlist com três músicas para ouvir com {partner} e explique suas escolhas.",
        "27": "Encene com {partner} uma cena romântica de filme por um minuto.",
        "28": "Cantarole uma canção de ninar para {partner} com sua voz mais doce.",
        "29": "Faça o máximo de elogios que conseguir a {partner} em 30 segundos."
      },
      "Eğlenceli": {
        "19": "Invente com {partner} uma letra curta usando três palavras e cantem juntos."
      },
      "Beni Ne Kadar Tanıyorsun": {
        "21": "Diga três fatos verdadeiros e um falso sobre {partner} e peça que {partner} descubra o falso.",
        "22": "Diga o máximo de fatos verdadeiros sobre {partner} em 30 segundos e peça que {partner} confirme.",
        "25": "Conte a coisa mais surpreendente que aprendeu com {partner}.",
        "27": "Faça uma ficha para {partner}: nome, comida favorita e música favorita. Peça que {partner} confira.",
        "28": "Faça para {partner} um cartão «Me conheça» com três coisas favoritas e um hábito peculiar."
      },
      "Uzak Mesafe": {
        "3": "Conte a {partner} uma coisa bonita que você consegue ver daí.",
        "12": "Confesse quando mais quis mandar uma mensagem a {partner}, mas acabou não mandando.",
        "15": "Escreva uma mensagem a {partner} em um papel e mostre para a câmera.",
        "16": "Prepare e envie uma pequena mensagem surpresa a {partner} para esta noite.",
        "17": "Escreva e leia um mini roteiro para o seu próximo encontro com {partner}."
      },
      "Gelecek": {
        "24": "Confesse um sonho sobre seu futuro com {partner} que nunca compartilhou."
      },
      "Ok mu Nok mu": {
        "0": "{partner} olha o celular enquanto come.",
        "1": "{partner} come o último pedaço sem perguntar.",
        "3": "{partner} quer acordar no mesmo horário todas as manhãs.",
        "4": "{partner} esconde algo para preparar uma surpresa para você.",
        "7": "Sentir a obrigação de mandar bom-dia todo dia.",
        "8": "{partner} pega suas coisas emprestadas sem pedir.",
        "9": "{partner} segue o ex nas redes sociais.",
        "10": "Perguntar a {partner} antes de publicar cada foto.",
        "12": "{partner} não curte seu story imediatamente.",
        "14": "{partner} curte fotos de outras pessoas nas redes sociais.",
        "17": "{partner} leva horas para responder à sua mensagem.",
        "18": "{partner} quer jantar com a família todo fim de semana.",
        "20": "{partner} tem muita intimidade com seu melhor amigo ou sua melhor amiga.",
        "23": "{partner} fica na rua até tarde com os amigos.",
        "24": "{partner} demora muito para apresentar os próprios amigos a você."
      },
      "Doğruluk mu Cesaretlik mi": {
        "3": "Qual foi o momento mais feliz do seu relacionamento com {partner}?",
        "16": "Qual foi o dia mais bonito que você passou com {partner}?",
        "19": "Qual é a primeira imagem que vem à sua cabeça quando imagina envelhecer com {partner}?",
        "21": "Diga «bom dia» a {partner} de três maneiras diferentes.",
        "26": "Invente um poema de quatro versos com elogios para {partner} e leia em voz alta.",
        "30": "Mostre no celular sua foto favorita com {partner} e conte a história dessa foto.",
        "34": "Escreva uma palavra nas costas de {partner} com o dedo e peça que adivinhe.",
        "36": "Represente com {partner} uma cena de filme por um minuto.",
        "38": "Faça cinco elogios diferentes a {partner} sem se repetir."
      },
      "Evde Gece": {
        "29": "Confesse o pequeno prazer de que mais gosta quando tem a casa só para você."
      },
      "Yeni Tanışanlar": {
        "17": "Confesse o que mais despertou sua empolgação em um primeiro encontro."
      }
    },
    "ru": {
      "Romantik": {
        "1": "Расскажи игроку «{partner}» о своих мыслях при вашей первой встрече.",
        "4": "Подробно расскажи о самом романтичном воспоминании, связанном с игроком «{partner}».",
        "5": "Расскажи, чем игроку «{partner}» удалось удивить тебя больше всего.",
        "6": "Расскажи, когда тебе впервые захотелось сказать игроку «{partner}»: «Как хорошо, что ты есть».",
        "13": "Спроси игрока «{partner}»: Когда к тебе впервые пришло понимание, что ты любишь меня?",
        "14": "Спроси игрока «{partner}»: Какой день из нашей жизни тебе хотелось бы пережить снова?",
        "17": "Признайся, насколько сильным было твоё волнение на первом свидании с игроком «{partner}».",
        "18": "Признайся в милой привычке, о которой игрок «{partner}» ещё не знает.",
        "19": "Признайся, когда тебе впервые стало не хватать игрока «{partner}».",
        "20": "Признайся, сколько времени ушло на раздумья, прежде чем впервые сказать игроку «{partner}»: «Я тебя люблю».",
        "21": "Признайся, что в игроке «{partner}» в первую очередь привлекло твоё внимание.",
        "25": "Составь плейлист из трёх песен, чтобы слушать их с игроком «{partner}», и объясни свой выбор.",
        "27": "Вместе с игроком «{partner}» изобразите романтическую сцену из фильма в течение минуты."
      },
      "Eğlenceli": {
        "7": "Игра «Зеркало»: синхронно повторяй движения игрока «{partner}» 30 секунд.",
        "19": "Вместе с игроком «{partner}» придумайте короткий текст песни из трёх слов и спойте его.",
        "22": "Ответьте вместе: телепортация или путешествие во времени? Объясните почему.",
        "23": "Спроси игрока «{partner}»: Что ты сделаешь в первую очередь, если на день станешь невидимкой?",
        "25": "Ответьте вместе: Какую профессию вы хотели бы попробовать на один день?",
        "26": "Спроси игрока «{partner}»: Что станет твоей первой покупкой в случае выигрыша в лотерею?",
        "28": "Признайся в необычном сочетании еды, которое тебе нравится, но о котором никто ещё не знает.",
        "29": "Признайся в детском поступке, который до сих пор вызывает у тебя смех."
      },
      "Beni Ne Kadar Tanıyorsun": {
        "0": "Угадай любимое блюдо игрока «{partner}», а затем спроси, верен ли твой ответ.",
        "2": "Угадай, какая профессия была детской мечтой игрока «{partner}».",
        "4": "Угадай, на что игрок «{partner}» потратит день, если сможет заниматься чем угодно.",
        "11": "Угадай самый большой детский страх игрока «{partner}».",
        "12": "Угадай сериал или фильм, который игроку «{partner}» не надоест пересматривать.",
        "13": "Угадай любимый десерт игрока «{partner}», а затем спроси, верен ли твой ответ.",
        "16": "Спроси игрока «{partner}»: Какие три слова ты выберешь, чтобы описать меня?",
        "21": "Назови три правдивых и один ложный факт об игроке «{partner}». Предложи найти ложный.",
        "23": "Признайся, какое твоё представление об игроке «{partner}» оказалось ошибочным.",
        "24": "Признайся, что за последнее время больше всего удивило тебя в игроке «{partner}».",
        "25": "Расскажи игроку «{partner}» о самом неожиданном уроке, полученном благодаря вашему общению.",
        "27": "Составь анкету игрока «{partner}»: имя, любимое блюдо и любимая песня. Предложи проверить её.",
        "28": "Сделай для игрока «{partner}» карточку «Узнай меня»: три любимых вещи и одна необычная привычка.",
        "29": "За 20 секунд представь игрока «{partner}» человеку, для которого это будет первое знакомство."
      },
      "Uzak Mesafe": {
        "7": "Спроси игрока «{partner}»: В какой момент сегодня у тебя появилась мысль обо мне?",
        "10": "Признайся, когда тебе сильнее всего не хватало игрока «{partner}».",
        "11": "Признайся в своём самом странном поступке за время вашей разлуки.",
        "12": "Признайся, когда желание написать игроку «{partner}» было особенно сильным, но сообщение так и осталось неотправленным.",
        "17": "Напиши и прочитай мини-план для следующей встречи с игроком «{partner}»."
      },
      "Gelecek": {
        "0": "Расскажи, где тебе хочется жить через пять лет.",
        "1": "Расскажи о первом большом путешествии, в которое тебе хочется отправиться вместе.",
        "3": "Расскажи, как тебе хочется проводить день в старшем возрасте.",
        "5": "Назови три вещи, которые тебе хочется сделать вместе в следующем году.",
        "8": "Спроси игрока «{partner}»: Чему новому тебе хочется научиться вместе?",
        "24": "Признайся в мечте о совместном будущем с игроком «{partner}», которую ты пока держишь в секрете."
      },
      "Ok mu Nok mu": {
        "0": "Игрок «{partner}» смотрит в телефон во время еды.",
        "1": "Игрок «{partner}» съедает последний кусочек, не спросив.",
        "3": "Игрок «{partner}» хочет просыпаться каждое утро в одно и то же время.",
        "4": "Игрок «{partner}» скрывает что-то, чтобы подготовить тебе сюрприз.",
        "8": "Игрок «{partner}» берёт твои вещи, не спросив.",
        "9": "Игрок «{partner}» подписывается на бывшего или бывшую в соцсетях.",
        "12": "Игрок «{partner}» не сразу ставит лайк твоей истории.",
        "14": "Игрок «{partner}» ставит лайки фотографиям других людей в соцсетях.",
        "17": "Игрок «{partner}» часами не отвечает на твоё сообщение.",
        "18": "Игрок «{partner}» хочет ужинать с семьёй каждые выходные.",
        "20": "У игрока «{partner}» очень близкие отношения со своим лучшим другом или лучшей подругой.",
        "23": "Игрок «{partner}» засиживается допоздна с друзьями.",
        "24": "Игрок «{partner}» долго ждёт, прежде чем познакомить тебя со своими друзьями."
      },
      "Doğruluk mu Cesaretlik mi": {
        "0": "Честно расскажи о своих чувствах при первой встрече с игроком «{partner}».",
        "2": "Есть ли что-то хорошее, что тебе хочется сказать игроку «{partner}» впервые? Скажи.",
        "3": "Какой момент в отношениях с игроком «{partner}» принёс тебе больше всего счастья?",
        "4": "Вспомни и расскажи о первом моменте, когда благодаря игроку «{partner}» на твоём лице появилась улыбка.",
        "6": "Есть ли что-то, что тебе довелось сделать для игрока «{partner}», но о чём ты до сих пор молчишь?",
        "7": "Какой сюрприз тебе хочется однажды устроить игроку «{partner}»?",
        "9": "Что тебе хочется сделать с игроком «{partner}», но вы пока ещё не пробовали?",
        "11": "Расскажи, когда у тебя впервые появилось доверие к игроку «{partner}».",
        "12": "Чему самому важному тебе удалось научиться благодаря игроку «{partner}»?",
        "13": "Какой твой самый неловкий поступок теперь вызывает у тебя смех?",
        "14": "Приходилось ли тебе немного ревновать из-за игрока «{partner}»? Расскажи об этом мягко.",
        "16": "Какой день, проведённый с игроком «{partner}», был самым прекрасным?",
        "19": "Какой образ первым приходит тебе в голову, когда представляешь, как стареешь вместе с игроком «{partner}»?",
        "23": "Нарисуй сердечко для игрока «{partner}» и вручи свой рисунок в подарок.",
        "30": "Покажи на телефоне любимую совместную фотографию с игроком «{partner}» и расскажи её историю.",
        "34": "Напиши слово пальцем на спине игрока «{partner}» и предложи угадать его.",
        "36": "Вместе с игроком «{partner}» изобразите сцену из фильма в течение минуты."
      },
      "Yeni Tanışanlar": {
        "3": "Представь поездку в другой город на один день. Куда тебе хочется отправиться?",
        "7": "Спроси игрока «{partner}»: В каком месте тебе ещё не довелось побывать, но очень хочется?",
        "9": "Спроси игрока «{partner}»: Какую суперспособность ты выберешь?",
        "10": "Спроси игрока «{partner}»: Какую песню тебе хочется послушать прямо сейчас?",
        "12": "Спроси игрока «{partner}»: Есть ли блюдо, которое тебе ещё не довелось попробовать, но хочется?",
        "13": "Спроси игрока «{partner}»: Как тебе хочется провести свободный день?",
        "15": "Спроси игрока «{partner}»: Какому навыку тебе хочется научиться?",
        "18": "Признайся в необычном увлечении, которое ты пока держишь в секрете.",
        "27": "Опиши игрока «{partner}» тремя эмодзи и спроси, насколько точным получилось описание."
      },
      "İkisinden Birini Seç": {
        "19": "Уметь летать или иметь способность становиться невидимкой?"
      }
    },
    "el": {
      "Romantik": {
        "1": "Πες στο άτομο «{partner}» τι σκέφτηκες όταν συναντηθήκατε για πρώτη φορά.",
        "2": "Πες στο άτομο «{partner}» τι σου έδωσε τη μεγαλύτερη χαρά σήμερα.",
        "3": "Πες στο άτομο «{partner}» κάτι όμορφο που σου έρχεται αυθόρμητα στο μυαλό.",
        "4": "Περιέγραψε με λεπτομέρειες την πιο ρομαντική σου ανάμνηση με το άτομο «{partner}».",
        "6": "Πες πότε θέλησες πρώτη φορά να πεις στο άτομο «{partner}»: «Χαίρομαι που υπάρχεις».",
        "10": "Κράτησε και τα δύο χέρια του ατόμου «{partner}» και πες ευχαριστώ για τρία πράγματα.",
        "11": "Δώσε ένα μικρό φιλί στο μέτωπο ή στο μάγουλο του ατόμου «{partner}».",
        "16": "Ρώτησε το άτομο «{partner}»: Ποια μικρή μου κίνηση σου δίνει τη μεγαλύτερη χαρά;",
        "17": "Παραδέξου πόσο αγχώθηκες στο πρώτο σου ραντεβού με το άτομο «{partner}».",
        "20": "Παραδέξου πόσο σκέφτηκες πριν πεις πρώτη φορά «Σ’ αγαπώ» στο άτομο «{partner}».",
        "23": "Ζωγράφισε σε ένα λεπτό μια μικρή καρδιά ή ένα σημείωμα αγάπης για το άτομο «{partner}».",
        "24": "Γράψε ένα ποίημα τεσσάρων στίχων για το άτομο «{partner}» και διάβασέ το δυνατά.",
        "25": "Φτιάξε μια λίστα με τρία τραγούδια για να ακούσεις μαζί με το άτομο «{partner}» και εξήγησε τις επιλογές σου.",
        "27": "Μαζί με το άτομο «{partner}», παίξτε μια ρομαντική σκηνή από ταινία για ένα λεπτό.",
        "28": "Σιγοτραγούδησε ένα νανούρισμα στο άτομο «{partner}» με την πιο γλυκιά σου φωνή.",
        "29": "Κάνε όσο περισσότερα κομπλιμέντα μπορείς στο άτομο «{partner}» σε 30 δευτερόλεπτα.",
        "31": "Κλείσε τα μάτια και περιέγραψε το πρόσωπο του ατόμου «{partner}». Μετά ανοίξτε τα μάτια και συγκρίνετε."
      },
      "Eğlenceli": {
        "19": "Μαζί με το άτομο «{partner}», επινοήστε έναν σύντομο στίχο με τρεις λέξεις και τραγουδήστε τον.",
        "23": "Ρώτησε το άτομο «{partner}»: Αν μπορούσες να μη σε βλέπει κανείς για μία μέρα, τι θα έκανες πρώτα;",
        "29": "Παραδέξου κάτι που έκανες ως παιδί και σε κάνει ακόμα να γελάς."
      },
      "Beni Ne Kadar Tanıyorsun": {
        "2": "Μάντεψε ποιο επάγγελμα ονειρευόταν το άτομο «{partner}» όταν ήταν παιδί.",
        "8": "Μάντεψε ποιον τραγουδιστή ακούει πιο συχνά το άτομο «{partner}» στο κινητό.",
        "11": "Μάντεψε τι φοβόταν περισσότερο το άτομο «{partner}» όταν ήταν παιδί.",
        "12": "Μάντεψε ποια σειρά ή ταινία θα μπορούσε να βλέπει ξανά και ξανά το άτομο «{partner}».",
        "28": "Φτιάξε για το άτομο «{partner}» μια κάρτα «Γνώρισέ με» με τρία αγαπημένα και μία παράξενη συνήθεια."
      },
      "Uzak Mesafe": {
        "12": "Παραδέξου πότε ήθελες πιο πολύ να στείλεις μήνυμα στο άτομο «{partner}», αλλά δεν το έκανες.",
        "15": "Γράψε ένα μήνυμα για το άτομο «{partner}» σε χαρτί και δείξ’ το στην κάμερα.",
        "16": "Ετοίμασε και στείλε ένα μικρό μήνυμα-έκπληξη στο άτομο «{partner}» για απόψε.",
        "17": "Γράψε και διάβασε ένα μικρό πρόγραμμα για την επόμενη συνάντησή σου με το άτομο «{partner}»."
      },
      "Gelecek": {
        "24": "Παραδέξου ένα όνειρο για το κοινό σου μέλλον με το άτομο «{partner}» που δεν έχεις μοιραστεί."
      },
      "Ok mu Nok mu": {
        "0": "Το άτομο «{partner}» κοιτάζει το κινητό την ώρα του φαγητού.",
        "1": "Το άτομο «{partner}» τρώει την τελευταία μπουκιά χωρίς να ρωτήσει.",
        "3": "Το άτομο «{partner}» θέλει να ξυπνά την ίδια ώρα κάθε πρωί.",
        "4": "Το άτομο «{partner}» κρύβει κάτι για να σου ετοιμάσει έκπληξη.",
        "8": "Το άτομο «{partner}» δανείζεται τα πράγματά σου χωρίς να ρωτήσει.",
        "9": "Το άτομο «{partner}» ακολουθεί έναν ή μία πρώην στα social media.",
        "10": "Να ρωτάς το άτομο «{partner}» πριν δημοσιεύσεις κάθε φωτογραφία.",
        "12": "Το άτομο «{partner}» δεν κάνει αμέσως like στο story σου.",
        "14": "Το άτομο «{partner}» κάνει like στις φωτογραφίες άλλων στα social media.",
        "17": "Το άτομο «{partner}» αργεί ώρες να απαντήσει στο μήνυμά σου.",
        "18": "Το άτομο «{partner}» θέλει να τρώει με την οικογένεια κάθε Σαββατοκύριακο.",
        "19": "Να πηγαίνεις διακοπές με φίλους χωρίς το άτομο «{partner}».",
        "20": "Το άτομο «{partner}» έχει πολύ στενή σχέση με τον καλύτερο φίλο ή την καλύτερη φίλη του.",
        "22": "Να περνάς τα γενέθλιά σου με φίλους αντί με το άτομο «{partner}».",
        "23": "Το άτομο «{partner}» μένει έξω μέχρι αργά με φίλους.",
        "24": "Το άτομο «{partner}» περιμένει πολύ πριν σου γνωρίσει τους φίλους του.",
        "26": "Να ακυρώνεις τελευταία στιγμή σχέδια με φίλους για το άτομο «{partner}»."
      },
      "Doğruluk mu Cesaretlik mi": {
        "3": "Ποια στιγμή της σχέσης σου με το άτομο «{partner}» σου έδωσε τη μεγαλύτερη χαρά;",
        "16": "Ποια ήταν η ομορφότερη μέρα που πέρασες με το άτομο «{partner}»;",
        "19": "Ποια είναι η πρώτη εικόνα που σου έρχεται όταν φαντάζεσαι να γερνάς μαζί με το άτομο «{partner}»;",
        "26": "Επινόησε ένα τετράστιχο με κομπλιμέντα για το άτομο «{partner}» και διάβασέ το.",
        "30": "Δείξε στο κινητό την αγαπημένη σου φωτογραφία μαζί με το άτομο «{partner}» και πες την ιστορία της.",
        "34": "Γράψε μια λέξη στην πλάτη του ατόμου «{partner}» με το δάχτυλο και ζήτησε να τη μαντέψει.",
        "36": "Μαζί με το άτομο «{partner}», παίξτε μια σκηνή από ταινία για ένα λεπτό.",
        "38": "Κάνε πέντε διαφορετικά κομπλιμέντα στο άτομο «{partner}» χωρίς να επαναληφθείς."
      },
      "Evde Gece": {
        "29": "Παραδέξου τη μικρή απόλαυση που χαίρεσαι περισσότερο όταν έχεις το σπίτι όλο δικό σου."
      },
      "İkisinden Birini Seç": {
        "19": "Να πετάς ή να έχεις τη δύναμη να μη σε βλέπει κανείς;"
      }
    },
    "es": {
      "Romantik": {
        "0": "Dile a {partner} tres cosas que te encantan de esa persona.",
        "1": "Cuéntale a {partner} qué pensaste cuando se conocieron por primera vez.",
        "3": "Dile a {partner} algo bonito que te salga del corazón.",
        "4": "Cuenta con detalle cuál ha sido tu momento más romántico con {partner}.",
        "6": "Cuenta cuándo quisiste decirle a {partner} por primera vez: «Me alegra mucho que estés aquí».",
        "11": "Dale a {partner} un pequeño beso en la frente o en la mejilla.",
        "17": "Confiesa cuánto te emocionaste en tu primera cita con {partner}.",
        "20": "Confiesa cuánto pensaste antes de decirle «te quiero» a {partner} por primera vez.",
        "25": "Prepara una lista de tres canciones para escuchar con {partner} y explica por qué las elegiste.",
        "27": "Representa con {partner} una escena romántica de película durante un minuto.",
        "28": "Tararea una canción de cuna para {partner} con tu voz más dulce."
      },
      "Eğlenceli": {
        "19": "Inventa con {partner} una letra corta con tres palabras y cántenla juntos.",
        "29": "Confiesa algo que hacías en la infancia y que todavía te hace reír."
      },
      "Beni Ne Kadar Tanıyorsun": {
        "1": "Adivina el color, la canción y la película favoritos de {partner}. ¿Cuántos acertaste?",
        "2": "Adivina qué profesión soñaba tener {partner} durante su infancia.",
        "3": "Adivina cuál es el mayor miedo de {partner}.",
        "5": "Adivina cuál es el destino de vacaciones favorito de {partner}.",
        "7": "Adivina cuál es la estación favorita de {partner} y por qué.",
        "9": "Adivina qué es lo primero que hace {partner} al despertarse.",
        "11": "Adivina qué era lo que más miedo le daba a {partner} en la infancia.",
        "12": "Adivina qué serie o película podría ver {partner} una y otra vez sin aburrirse.",
        "13": "Adivina cuál es el postre favorito de {partner} y pregúntale si acertaste.",
        "25": "Cuéntale a {partner} lo más sorprendente que has aprendido de {partner}.",
        "28": "Prepara para {partner} una tarjeta «Conóceme» con tres cosas favoritas y una costumbre peculiar."
      },
      "Uzak Mesafe": {
        "3": "Cuéntale a {partner} algo bonito que puedas ver desde donde estás.",
        "12": "Confiesa cuándo quisiste escribirle más a {partner}, pero al final no lo hiciste.",
        "15": "Escríbele un mensaje a {partner} en un papel y muéstralo a la cámara.",
        "16": "Prepara y envía un pequeño mensaje sorpresa a {partner} para esta noche.",
        "17": "Escribe y lee un mini plan para tu próximo encuentro con {partner}."
      },
      "Gelecek": {
        "24": "Confiesa un sueño sobre tu futuro con {partner} que nunca hayas compartido."
      },
      "Ok mu Nok mu": {
        "0": "{partner} mira el teléfono mientras come.",
        "1": "{partner} se come el último bocado sin preguntar.",
        "3": "{partner} quiere despertarse a la misma hora todas las mañanas.",
        "4": "{partner} esconde algo para prepararte una sorpresa.",
        "8": "{partner} toma prestadas tus cosas sin pedir permiso.",
        "9": "{partner} sigue a su ex en redes sociales.",
        "12": "{partner} no le da «me gusta» a tu historia inmediatamente.",
        "14": "{partner} da «me gusta» en redes a fotos de otras personas.",
        "17": "{partner} tarda horas en responder a tu mensaje.",
        "18": "{partner} quiere cenar con la familia todos los fines de semana.",
        "19": "Irte de vacaciones con amistades sin {partner}.",
        "20": "{partner} tiene mucha confianza con su mejor amigo o su mejor amiga.",
        "22": "Pasar tu cumpleaños con amistades en vez de con {partner}.",
        "23": "{partner} se queda fuera hasta tarde con amistades.",
        "24": "{partner} tarda mucho en presentarte a sus amistades."
      },
      "Doğruluk mu Cesaretlik mi": {
        "3": "¿Cuál ha sido el momento más feliz de tu relación con {partner}?",
        "16": "¿Cuál ha sido el día más bonito que has pasado con {partner}?",
        "19": "¿Qué imagen se te viene primero a la mente cuando imaginas que envejeces junto a {partner}?",
        "30": "Muestra en tu teléfono tu foto favorita con {partner} y cuenta su historia.",
        "36": "Representa junto a {partner} una escena de película durante un minuto."
      },
      "Yeni Tanışanlar": {
        "1": "Cuenta cuál era tu juego favorito en la infancia."
      }
    }
  };
  function kartlariCevir() {
    var packs = window.KART_CEVIRILER || {},
      pack = packs[dil];
    if (!pack || !window.GOREVLER) return;
    window.KART_SURELER = window.KART_SURELER || {};
    window.KART_ISIM_SABLONLARI = Object.create(null);
    var isimDuzeltmeleri = KART_ISIM_DUZELTMELERI[dil] || {};
    Object.keys(pack).forEach(function (mod) {
      var src = GOREVLER[mod],
        dst = pack[mod];
      if (!src || !Array.isArray(dst) || src.length !== dst.length) return;
      for (var i = 0; i < src.length; i++) {
        if (typeof window.sureBul === "function") {
          var sure = window.sureBul(src[i][1]);
          if (sure > 0) window.KART_SURELER[dst[i]] = sure;
        }
        var duzeltme = isimDuzeltmeleri[mod] || {};
        window.KART_ISIM_SABLONLARI[dst[i]] = Object.prototype.hasOwnProperty.call(duzeltme, i)
          ? duzeltme[i]
          : kartIsimSablonu(dil, dst[i], /[Pp]artner/.test(src[i][1]));
        src[i][1] = dst[i];
      }
    });
  }
  kartlariCevir();
  var DIL_EK = {
    "en": [
      "Enter player {n}’s name.",
      "Select a gender for {name}.",
      "challenges",
      "min",
      ["card", "cards"],
      ["Purple", "Night", "Pink"],
      "Tip: Write {partner} in your card to insert your partner’s name."
    ],
    "de": [
      "Gib den Namen von Person {n} ein.",
      "Wähle ein Geschlecht für {name}.",
      "Aufgaben",
      "Min.",
      ["Karte", "Karten"],
      ["Lila", "Nacht", "Rosa"],
      "Tipp: Schreibe {partner} in deine Karte, um den Namen der Partnerperson einzufügen."
    ],
    "fr": [
      "Saisis le prénom du joueur {n}.",
      "Choisis un genre pour {name}.",
      "défis",
      "min",
      ["carte", "cartes"],
      ["Violet", "Nuit", "Rose"],
      "Astuce : écris {partner} dans ta carte pour insérer le prénom de ton partenaire."
    ],
    "it": [
      "Inserisci il nome del giocatore {n}.",
      "Seleziona un genere per {name}.",
      "sfide",
      "min",
      ["carta", "carte"],
      ["Viola", "Notte", "Rosa"],
      "Suggerimento: scrivi {partner} nella carta per inserire il nome del partner."
    ],
    "es": [
      "Escribe el nombre del jugador {n}.",
      "Selecciona un género para {name}.",
      "retos",
      "min",
      ["tarjeta", "tarjetas"],
      ["Morado", "Noche", "Rosa"],
      "Consejo: escribe {partner} en tu tarjeta para insertar el nombre de tu pareja."
    ],
    "pt": [
      "Escreva o nome do jogador {n}.",
      "Selecione um gênero para {name}.",
      "desafios",
      "min",
      ["carta", "cartas"],
      ["Roxo", "Noite", "Rosa"],
      "Dica: escreva {partner} no cartão para inserir o nome da pessoa parceira."
    ],
    "ru": [
      "Введи имя игрока {n}.",
      "Выбери пол для игрока {name}.",
      "заданий",
      "мин.",
      ["карта", "карт", "карты"],
      ["Фиолетовая", "Ночная", "Розовая"],
      "Подсказка: напиши {partner} на карточке, чтобы вставить имя партнёра."
    ],
    "ja": [
      "プレイヤー{n}の名前を入力してください。",
      "{name}の性別を選択してください。",
      "お題",
      "分",
      ["枚", "枚"],
      ["紫", "夜", "ピンク"],
      "ヒント：カードに {partner} と書くと、パートナーの名前が入ります。"
    ],
    "el": [
      "Γράψε το όνομα του παίκτη {n}.",
      "Επίλεξε φύλο για τον παίκτη {name}.",
      "προκλήσεις",
      "λεπτά",
      ["κάρτα", "κάρτες"],
      ["Μωβ", "Νύχτα", "Ροζ"],
      "Συμβουλή: γράψε {partner} στην κάρτα για να μπει το όνομα του συντρόφου σου."
    ],
    "zh-CN": [
      "请输入玩家{n}的姓名。",
      "请选择{name}的性别。",
      "任务",
      "分钟",
      ["张卡片", "张卡片"],
      ["紫色", "夜间", "粉色"],
      "提示：在卡片中写入 {partner}，游戏会填入伴侣的名字。"
    ],
    "zh-TW": [
      "請輸入玩家{n}的姓名。",
      "請選擇{name}的性別。",
      "任務",
      "分鐘",
      ["張卡片", "張卡片"],
      ["紫色", "夜間", "粉色"],
      "提示：在卡片中寫入 {partner}，遊戲會填入伴侶的名字。"
    ]
  };
  Object.keys(DIL_EK).forEach(function (k) {
    UI[k]["İpucu: “Partnerine …” yazarsan oyun partnerin adını kendisi koyar."] = DIL_EK[k][6];
    UI[k]["Kendi"] = UI[k]["✍️ Kendi"].replace("✍️ ", "");
  });

  var DIL_TAMAMLAYICI = {
    "en": [
      "Card hidden. Restore it from My Cards › Hidden.",
      "No cards left to show. Restore hidden cards or choose another category.",
      "player"
    ],
    "de": [
      "Karte ausgeblendet. Stelle sie unter Meine Karten › Ausgeblendet wieder her.",
      "Keine Karten mehr. Stelle ausgeblendete Karten wieder her oder wähle eine andere Kategorie.",
      "Person"
    ],
    "fr": [
      "Carte masquée. Restaure-la dans Mes cartes › Masquées.",
      "Il ne reste aucune carte. Restaure des cartes masquées ou choisis une autre catégorie.",
      "joueur"
    ],
    "it": [
      "Carta nascosta. Ripristinala da Le mie carte › Nascoste.",
      "Non ci sono più carte. Ripristina quelle nascoste o scegli un’altra categoria.",
      "giocatore"
    ],
    "es": [
      "Tarjeta oculta. Recupérala en Mis tarjetas › Ocultas.",
      "No quedan tarjetas. Recupera las ocultas o elige otra categoría.",
      "jugador"
    ],
    "pt": [
      "Cartão oculto. Restaure-o em Meus cartões › Ocultos.",
      "Não há mais cartões. Restaure os ocultos ou escolha outra categoria.",
      "jogador"
    ],
    "ru": [
      "Карточка скрыта. Восстанови её в разделе Мои карточки › Скрытые.",
      "Карточек больше нет. Восстанови скрытые карточки или выбери другую категорию.",
      "игрок"
    ],
    "ja": [
      "カードを非表示にしました。マイカードの非表示タブから戻せます。",
      "カードがありません。非表示のカードを戻すか、別のカテゴリを選んでください。",
      "プレイヤー"
    ],
    "el": [
      "Η κάρτα κρύφτηκε. Επαναφέρετέ την από τις Κάρτες μου › Κρυφές.",
      "Δεν υπάρχουν άλλες κάρτες. Επαναφέρετε κρυφές κάρτες ή επιλέξτε άλλη κατηγορία.",
      "παίκτης"
    ],
    "zh-CN": [
      "卡片已隐藏。可在“我的卡片”的“隐藏”标签中恢复。",
      "没有更多卡片了。请恢复隐藏的卡片或选择其他类型。",
      "玩家"
    ],
    "zh-TW": [
      "卡片已隱藏。可在「我的卡片」的「隱藏」分頁中恢復。",
      "沒有更多卡片了。請恢復隱藏的卡片或選擇其他類型。",
      "玩家"
    ]
  };
  Object.keys(DIL_TAMAMLAYICI).forEach(function (k) {
    var a = DIL_TAMAMLAYICI[k];
    UI[k]["Kart gizlendi. Geri açmak için Kartlarım › Gizlenen."] = a[0];
    UI[k][
      "Gösterilecek kart kalmadı. Gizlenen kartları geri açabilir ya da başka tür seçebilirsin."
    ] = a[1];
  });
  var SON_CEVIRI = new WeakMap();
  function doldur(t, values) {
    return t.replace(/\{(\w+)\}/g, function (all, k) {
      return Object.prototype.hasOwnProperty.call(values, k) ? values[k] : all;
    });
  }
  function soz(s) {
    if (dil === "tr") return s;
    var u = UI[dil] || {},
      x = DIL_EK[dil],
      m;
    function tam(k) {
      return Object.prototype.hasOwnProperty.call(u, k) ? u[k] : k;
    }
    if (Object.prototype.hasOwnProperty.call(u, s)) return u[s];
    if (s.indexOf("\n") >= 0) return s.split("\n").map(soz).join("\n");
    if ((m = s.match(/^(\d+)\. oyuncunun adını yaz\.$/))) return doldur(x[0], { n: m[1] });
    if ((m = s.match(/^(.+) için cinsiyet seç\.$/))) return doldur(x[1], { name: m[1] });
    if ((m = s.match(/^(\d+)\. oyuncu$/))) return m[1] + ". " + DIL_TAMAMLAYICI[dil][2];
    if ((m = s.match(/^(\d+)\. oyuncunun adı$/))) return m[1] + ". " + tam(" oyuncunun adı").trim();
    if ((m = s.match(/^🎴 Başla \((\d+) görev\)$/))) {
      var forms = {
        en: ["challenge", "challenges"],
        de: ["Aufgabe", "Aufgaben"],
        fr: ["défi", "défis"],
        it: ["sfida", "sfide"],
        es: ["reto", "retos"],
        pt: ["desafio", "desafios"],
        ru: ["задание", "заданий", "задания"],
        el: ["πρόκληση", "προκλήσεις"]
      }[dil];
      var plural = new Intl.PluralRules(dil).select(Number(m[1]));
      var label = forms
        ? plural === "one"
          ? forms[0]
          : plural === "few" && forms[2]
            ? forms[2]
            : forms[1]
        : x[2];
      return tam("🎴 Başla") + " (" + m[1] + " " + label + ")";
    }
    if ((m = s.match(/^(\d+) dk$/)))
      return m[1] + " " + (dil === "el" && m[1] === "1" ? "λεπτό" : x[3]);
    if ((m = s.match(/^(\d+) kart$/))) {
      var n = Number(m[1]),
        plural = new Intl.PluralRules(dil).select(n),
        form = plural === "one" ? x[4][0] : plural === "few" && x[4][2] ? x[4][2] : x[4][1];
      return m[1] + (/^(ja|zh-)/.test(dil) ? "" : " ") + form;
    }
    if ((m = s.match(/^Tema: (mor|gece|pembe)$/)))
      return tam("Tema") + ": " + x[5][["mor", "gece", "pembe"].indexOf(m[1])];
    if ((m = s.match(/^Sıra: (.+)  \|  Partner: (.+)$/)))
      return tam("Sıra: ") + m[1] + tam("  |  Partner: ") + m[2];
    if ((m = s.match(/^Kartı okuyan: (.+)$/))) return tam("Kartı okuyan: ") + m[1];
    if ((m = s.match(/^(Sıra: |Sıradaki: )(.+) — Doğruluk mu, Cesaret mi\?$/)))
      return (
        (m[1] === "Sıra: " ? tam("Sıra: ") : tam("Sıradaki:") + " ") +
        m[2] +
        " — " +
        tam("Doğruluk mu, Cesaret mi?")
      );
    if (
      (m = s.match(
        /^(.+)( arka arkaya 2 kez (?:Doğruluk|Cesaret) seçti, bu sefer (?:Doğruluk|Cesaret)\.)$/
      ))
    )
      return m[1] + tam(m[2]);
    if ((m = s.match(/^Aynı isim iki kez kullanılmış: (.+)\. İsimleri ayırt edilebilir yap\.$/)))
      return (
        tam("Aynı isim iki kez kullanılmış: ") + m[1] + tam(". İsimleri ayırt edilebilir yap.")
      );
    if (
      (m = s.match(
        /^(.+) için seçtiğin partner cinsiyetinde \((.+)\) başka oyuncu yok\. Partner cinsiyetini değiştir\.$/
      ))
    )
      return (
        m[1] +
        tam(" için seçtiğin partner cinsiyetinde (") +
        tam(m[2]) +
        tam(") başka oyuncu yok. Partner cinsiyetini değiştir.")
      );
    if ((m = s.match(/^Kart (\d+) \/ (\d+)$/))) return tam("Kart ") + m[1] + " / " + m[2];
    if ((m = s.match(/^⏱️ (\d+(?::\d+)?)( sn)?( – (?:Başlat|Durdur|Devam et))$/)))
      return "⏱️ " + m[1] + (m[2] ? tam(" sn") : "") + tam(m[3]);
    if ((m = s.match(/^Satın al · (.+)$/))) return tam("Satın al · ") + m[1];
    if ((m = s.match(/^🔒 (.+)( modu kilitli\. Açmak için aşağıdan satın alabilirsin\.)$/)))
      return "🔒 " + tam(m[1]) + tam(m[2]);
    if ((m = s.match(/^🎲 Rastgele \((.+)\)$/)))
      return "🎲 " + tam("Rastgele") + " (" + tam(m[1]) + ")";
    if ((m = s.match(/^(.+) \((\d+)\)$/))) return soz(m[1]) + " (" + m[2] + ")";
    // Translate an exact label following an icon; never replace parts of words.
    if ((m = s.match(/^([^\p{L}\p{N}]+)(.+)$/u)) && Object.prototype.hasOwnProperty.call(u, m[2]))
      return m[1] + u[m[2]];
    return s;
  }
  function korumali(n) {
    var e = n.nodeType === 1 ? n : n.parentElement;
    return (
      !e ||
      !!e.closest('[translate="no"],script,style') ||
      (!!e.closest("#kart") && typeof sonKart !== "undefined" && !!sonKart)
    );
  }
  function dugumCevir(n) {
    if (korumali(n) || SON_CEVIRI.get(n) === n.nodeValue) return;
    var v = n.nodeValue.trim(),
      y = soz(v);
    if (v && v !== y) {
      n.nodeValue = n.nodeValue.replace(v, function () {
        return y;
      });
      SON_CEVIRI.set(n, n.nodeValue);
    }
  }
  function metinleriCevir(kok) {
    if (dil === "tr" || korumali(kok)) return;
    var w = d.createTreeWalker(kok || d.body, NodeFilter.SHOW_TEXT),
      n;
    while ((n = w.nextNode())) dugumCevir(n);
    var attrs = ["placeholder", "title", "aria-label"],
      elements = [kok].concat(Array.from(kok.querySelectorAll("*")));
    elements.forEach(function (e) {
      if (korumali(e)) return;
      attrs.forEach(function (a) {
        if (e.hasAttribute(a)) {
          var v = e.getAttribute(a),
            y = soz(v);
          if (y !== v) e.setAttribute(a, y);
        }
      });
    });
  }

  var DIL_ETIKETLERI = {
    "tr": "🌐 Dil",
    "en": "🌐 Language",
    "de": "🌐 Sprache",
    "fr": "🌐 Langue",
    "it": "🌐 Lingua",
    "es": "🌐 Idioma",
    "pt": "🌐 Idioma",
    "ru": "🌐 Язык",
    "ja": "🌐 言語",
    "el": "🌐 Γλώσσα",
    "zh-CN": "🌐 语言",
    "zh-TW": "🌐 語言"
  };
  function seciciOlustur() {
    var wrap = d.createElement("label");
    wrap.id = "dilSecim";
    wrap.className = "dil-secim";
    var ad = d.createElement("span");
    ad.textContent = DIL_ETIKETLERI[dil] || DIL_ETIKETLERI.en;
    var sel = d.createElement("select");
    sel.setAttribute("aria-label", ad.textContent);
    DILLER.forEach(function (x) {
      var o = d.createElement("option");
      o.value = x.kod;
      o.textContent = x.ad + (x.aktif ? "" : dil === "tr" ? " (yakında)" : " (coming soon)");
      o.disabled = !x.aktif;
      o.selected = x.kod === dil;
      sel.appendChild(o);
    });
    sel.onchange = function () {
      try {
        localStorage.setItem("kartOyunDili", sel.value);
      } catch (e) {}
      location.reload();
    };
    wrap.appendChild(ad);
    wrap.appendChild(sel);
    return wrap;
  }
  function init() {
    d.documentElement.lang = dil;
    d.title = soz("İki Kalp Bir Deste");
    var st = d.createElement("style");
    st.textContent =
      "#dilSecim{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;max-width:340px;padding:10px 12px;border:1px solid #4b3a6e;border-radius:14px;background:#241836;color:#fff;font-size:.9rem}#dilSecim select{flex:1;min-width:0;padding:9px;border-radius:10px;border:1px solid #4b3a6e;background:#2d2040;color:#fff;font:inherit}";
    d.head.appendChild(st);
    var menu = d.getElementById("menu");
    if (menu) menu.appendChild(seciciOlustur());
    metinleriCevir(d.body);
    if (dil !== "tr")
      new MutationObserver(function (ms) {
        ms.forEach(function (m) {
          m.addedNodes.forEach(function (n) {
            if (n.nodeType === 1) metinleriCevir(n);
            else if (n.nodeType === 3) {
              dugumCevir(n);
            }
          });
        });
      }).observe(d.body, { childList: true, subtree: true });
  }
  window.DIL = { kod: dil, diller: DILLER, cevir: soz };
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", init);
  else init();
})();
