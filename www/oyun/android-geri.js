/* Android geri tuşu: reklam önceliği ve ekranlar arası gezinme. */
(function () {
  var C = window.Capacitor;
  if (!C || !C.Plugins || !C.Plugins.App) return;
  C.Plugins.App.addListener("backButton", function () {
    if (window.reklamGeriTusunuIsle && window.reklamGeriTusunuIsle()) return;
    var ekran = document.querySelector(".ekran.aktif");
    if (ekran && ekran.id === "ozet") {
      document.getElementById("ozMenu").click();
      return;
    }
    var b = Array.prototype.slice.call(document.querySelectorAll("button")).filter(function (x) {
      return x.offsetParent !== null && x.textContent.trim().indexOf("\u2190") === 0;
    })[0];
    if (b) {
      b.click();
    } else {
      C.Plugins.App.exitApp();
    }
  });
})();
