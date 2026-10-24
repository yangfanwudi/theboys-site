/* Haste × The Boys 角色模组展示站 — 语言切换与页面小交互
   纯原生 JS，无依赖；配合 css/style.css 中的
   html[lang="en"] / html[lang="zh-CN"] 显示规则工作。 */
(function () {
  "use strict";

  var STORAGE_KEY = "theboys-lang";
  var toggleBtn = document.getElementById("lang-toggle");
  var header = document.querySelector(".site-header");

  /* 应用语言：切换 <html lang>，CSS 据此显示对应 data-lang 文本 */
  function setLang(lang) {
    var isEn = lang === "en";
    document.documentElement.setAttribute("lang", isEn ? "en" : "zh-CN");
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-pressed", isEn ? "true" : "false");
    }
    try {
      localStorage.setItem(STORAGE_KEY, isEn ? "en" : "zh");
    } catch (err) {
      /* file:// 或隐私模式下 localStorage 可能不可用，忽略即可 */
    }
  }

  /* 语言切换按钮入口（index.html 内联 onclick 调用） */
  function switchLang() {
    var current = document.documentElement.getAttribute("lang");
    setLang(current === "en" ? "zh" : "en");
  }
  window.switchLang = switchLang;

  /* 初始语言已在 <head> 内联脚本中恢复，这里只同步按钮状态 */
  if (toggleBtn) {
    toggleBtn.setAttribute(
      "aria-pressed",
      document.documentElement.getAttribute("lang") === "en" ? "true" : "false"
    );
  }

  /* 滚动后给吸顶 header 加边框 */
  function onScroll() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 8);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
