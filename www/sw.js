/* İsteklere müdahale etmeden service worker yaşam döngüsünü sürdürür. */
self.addEventListener("install", function () {
  self.skipWaiting();
});
self.addEventListener("activate", function (e) {
  e.waitUntil(self.clients.claim());
});
