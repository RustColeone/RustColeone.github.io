/* ============================================================
   Site behaviour. Everything here is progressive enhancement —
   the page is fully readable and navigable without it.

   Theming is handled by CSS light-dark(); this only overrides
   the resolved color-scheme and remembers the choice.
   ============================================================ */

(function () {
    "use strict";

    var STORAGE_KEY = "theme";
    var root = document.documentElement;

    /* ---------- Theme ---------- */

    function systemPrefersDark() {
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    function resolvedTheme() {
        return root.dataset.theme || (systemPrefersDark() ? "dark" : "light");
    }

    function syncThemeColor() {
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute("content", resolvedTheme() === "dark" ? "#0c0a09" : "#fafaf9");
        }
    }

    function setTheme(theme) {
        root.dataset.theme = theme;
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {
            /* Private browsing — the choice just won't survive a reload. */
        }
        syncThemeColor();
    }

    var toggle = document.querySelector(".theme-toggle");
    if (toggle) {
        toggle.addEventListener("click", function () {
            setTheme(resolvedTheme() === "dark" ? "light" : "dark");
        });
    }

    // Follow the OS while the user has expressed no explicit preference.
    if (window.matchMedia) {
        var mq = window.matchMedia("(prefers-color-scheme: dark)");
        var onSchemeChange = function () {
            if (!root.dataset.theme) syncThemeColor();
        };
        if (mq.addEventListener) mq.addEventListener("change", onSchemeChange);
        else if (mq.addListener) mq.addListener(onSchemeChange);
    }

    syncThemeColor();

    /* ---------- Active section in the nav ---------- */

    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[href^='#']"));
    var sections = navLinks
        .map(function (link) { return document.querySelector(link.getAttribute("href")); })
        .filter(Boolean);

    if (sections.length && "IntersectionObserver" in window) {
        var visible = new Set();

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) visible.add(entry.target);
                else visible.delete(entry.target);
            });

            // Highlight the topmost section currently on screen.
            var current = sections.filter(function (s) { return visible.has(s); })[0];

            navLinks.forEach(function (link) {
                var match = current && link.getAttribute("href") === "#" + current.id;
                if (match) link.setAttribute("aria-current", "true");
                else link.removeAttribute("aria-current");
            });
        }, {
            // Trigger once a section reaches the area just below the sticky nav.
            rootMargin: "-20% 0px -70% 0px"
        });

        sections.forEach(function (section) { observer.observe(section); });
    }

    /* ---------- Footer year ---------- */

    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    /* ---------- Print: expand every accordion ---------- */

    var reopened = [];

    function expandAll() {
        reopened = [];
        document.querySelectorAll("details:not([open])").forEach(function (d) {
            reopened.push(d);
            d.open = true;
        });
    }

    function restoreAll() {
        reopened.forEach(function (d) { d.open = false; });
        reopened = [];
    }

    window.addEventListener("beforeprint", expandAll);
    window.addEventListener("afterprint", restoreAll);

    if (window.matchMedia) {
        var printMq = window.matchMedia("print");
        if (printMq.addEventListener) {
            printMq.addEventListener("change", function (e) {
                if (e.matches) expandAll();
                else restoreAll();
            });
        }
    }
})();
