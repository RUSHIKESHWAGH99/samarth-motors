/**
 * Mobile menu, footer year, and FAQ accordions for Samarth Motors.
 */
(function () {
    const btn = document.getElementById("menu-btn");
    const panel = document.getElementById("mobile-nav");
    const y = document.getElementById("y");
    if (y) y.textContent = String(new Date().getFullYear());

    if (btn && panel) {
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
    }

    document.querySelectorAll(".faq-q").forEach((question) => {
        question.addEventListener("click", () => {
            const expanded = question.getAttribute("aria-expanded") === "true";
            const panelId = question.getAttribute("aria-controls");
            const answer = panelId ? document.getElementById(panelId) : null;
            if (!answer) return;

            question.setAttribute("aria-expanded", expanded ? "false" : "true");
            answer.hidden = expanded;
        });
    });
})();
