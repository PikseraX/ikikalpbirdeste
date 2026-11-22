/* Mod ve görev türü tanımları; kart paketlerinden önce yüklenir. */
var TUR_LISTESI = [
  { k: "sohbet", e: "🗣️", ad: "Sohbet" },
  { k: "soru", e: "❓", ad: "Sorular" },
  { k: "itiraf", e: "❤️‍🔥", ad: "İtiraf" },
  { k: "tahmin", e: "🔮", ad: "Tahmin" },
  { k: "hareket", e: "🎭", ad: "Hareket" },
  { k: "yaratici", e: "🎨", ad: "Yaratıcı" },
  { k: "meydan", e: "⚡", ad: "Meydan" },
  { k: "yakin", e: "🤗", ad: "Yakınlık" },
  { k: "gunluk", e: "🏠", ad: "Günlük" },
  { k: "sosyal", e: "📱", ad: "Sosyal" },
  { k: "aile", e: "👪", ad: "Çevre" },
  { k: "hayat", e: "🌍", ad: "Hayat" },
  { k: "ask", e: "💞", ad: "Aşk" },
  { k: "cilgin", e: "🤪", ad: "Çılgın" }
];
var MODLAR = [
  { ad: "Romantik", ikon: "💕", aciklama: "Duygusal ve yakın anlar" },
  { ad: "Eğlenceli", ikon: "🎉", aciklama: "Oyun ve kahkaha dolu" },
  { ad: "Beni Ne Kadar Tanıyorsun", ikon: "🧠", aciklama: "Birbirinizi ne kadar bilirsiniz?" },
  { ad: "Uzak Mesafe", ikon: "✈️", aciklama: "Görüntülü konuşarak oynayın" },
  { ad: "Evde Gece", ikon: "🏡", aciklama: "Evde yapılacak keyifli şeyler" },
  { ad: "Yeni Tanışanlar", ikon: "🌱", aciklama: "Çekinmeden, hafif ve tatlı" },
  { ad: "Gelecek", ikon: "✨", aciklama: "Hayaller, planlar, hedefler" },
  {
    ad: "Ok mu Nok mu",
    ikon: "🚦",
    aciklama: "Bu durum sizce normal mi?",
    kural:
      "Birlikte sayın: 3, 2, 1! Aynı anda 👍 (OK) ya da 👎 (NOK) gösterin, sonra nedenini anlatın.",
    buton: "➡️ Sonraki Kart"
  },
  {
    ad: "İkisinden Birini Seç",
    ikon: "⚖️",
    aciklama: "Hangisini seçersin?",
    kural: "İkiniz de gizlice seçin, aynı anda söyleyin ve nedenini anlatın.",
    buton: "➡️ Sonraki Kart"
  }
];
var GOREVLER = {};
function ekle(modAd, liste) {
  if (!GOREVLER[modAd]) {
    GOREVLER[modAd] = [];
  }
  for (var i = 0; i < liste.length; i++) {
    GOREVLER[modAd].push(liste[i]);
  }
}

/* Kart görünümü ve oyun özetinin ortak tür renkleri. */
var TUR_RENKLERI = {
  "sohbet": "#38bdf8",
  "soru": "#fbbf24",
  "itiraf": "#f43f5e",
  "tahmin": "#a78bfa",
  "hareket": "#fb923c",
  "yaratici": "#34d399",
  "meydan": "#facc15",
  "yakin": "#f472b6",
  "gunluk": "#94a3b8",
  "sosyal": "#60a5fa",
  "aile": "#f59e0b",
  "hayat": "#2dd4bf",
  "ask": "#fb7185",
  "cilgin": "#c084fc",
  "kendi": "#e879f9"
};
