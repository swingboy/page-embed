!function(e) {
  function dugeIsPC() {
    let userAgentInfo = navigator.userAgent;
    let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    let flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
    }
    return flag;
  }
  window.isPc = dugeIsPC();

  var t = e.document,
    n = t.documentElement,
    i = e.devicePixelRatio || 1,
    a = "orientationchange" in e ? "orientationchange" : "resize",
    d = function() {
      var e = n.getBoundingClientRect().width || 375;
      var designWidth = 1920, rem2px =  10;
      n.style.fontSize = e / designWidth;

    };
  n.setAttribute("data-dpr", i), t.addEventListener && (e.addEventListener(a, d, !1), "complete" === t.readyState || t.addEventListener("DOMContentLoaded", function() {
    setTimeout(d)
  }, !1))
}(window)
