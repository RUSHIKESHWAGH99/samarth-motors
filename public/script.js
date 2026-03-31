/**
 * Mobile menu toggle and footer year for Samarth Motors site.
 */
(function () {
    const btn = document.getElementById("menu-btn");
    const panel = document.getElementById("mobile-nav");
    const y = document.getElementById("y");
    if (y) y.textContent = String(new Date().getFullYear());

    if (!btn || !panel) return;

    function setOpen(open) {
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        panel.hidden = !open;
    }

    btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        setOpen(!open);
    });

    panel.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setOpen(false));
    });
})();
