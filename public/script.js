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
            if (open) {
                panel.removeAttribute("hidden");
            } else {
                panel.setAttribute("hidden", "");
            }
        }

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const open = btn.getAttribute("aria-expanded") === "true";
            setOpen(!open);
        });

        panel.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setOpen(false));
        });

        document.addEventListener("click", (e) => {
            const t = e.target;
            if (!(t instanceof Node)) return;
            if (panel.hasAttribute("hidden")) return;
            if (btn.contains(t) || panel.contains(t)) return;
            setOpen(false);
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && !panel.hasAttribute("hidden")) {
                setOpen(false);
            }
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
