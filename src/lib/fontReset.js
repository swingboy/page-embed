! function (e) {
  var t = e.document,
    n = t.documentElement,
    i = e.devicePixelRatio || 1,
    a = "orientationchange" in e ? "orientationchange" : "resize",
    d = function () {
      var e = n.getBoundingClientRect().width || 1366;
      (1 == i || 1920 < e) && (e = 1920), n.style.fontSize = e / 19.2 + "px"
    };
  n.setAttribute("data-dpr", i), t.addEventListener && (e.addEventListener(a, d, !1), "complete" === t.readyState || t.addEventListener("DOMContentLoaded", function () {
    setTimeout(d)
  }, !1))
}(window)
