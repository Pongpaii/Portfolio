// ============ THEME TOGGLE ============
(function () {
  const root = document.body;
  const toggleBtn = document.getElementById("theme-toggle");

  function getPreferredTheme() {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }

  applyTheme(getPreferredTheme());

  toggleBtn.addEventListener("click", function () {
    const current = root.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
})();

// ============ EXPERIENCE ACCORDION ============
(function () {
  const entries = document.querySelectorAll(".entry");

  entries.forEach(function (entry) {
    const head = entry.querySelector(".entry-head");
    const body = entry.querySelector(".entry-body");

    function setHeight() {
      if (entry.getAttribute("data-expanded") === "true") {
        body.style.maxHeight = body.scrollHeight + "px";
      } else {
        body.style.maxHeight = "0px";
      }
    }

    setHeight();

    head.addEventListener("click", function () {
      const isOpen = entry.getAttribute("data-expanded") === "true";
      entry.setAttribute("data-expanded", String(!isOpen));
      head.setAttribute("aria-expanded", String(!isOpen));
      setHeight();
    });

    // Recalculate after images load, since their height affects scrollHeight
    entry.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("load", setHeight);
    });

    window.addEventListener("resize", setHeight);
  });
})();