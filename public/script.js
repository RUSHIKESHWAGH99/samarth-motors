/**
 * Mobile menu (drawer + backdrop), footer year, and FAQ accordions for Samarth Motors.
 */
(function () {
    const btn = document.getElementById("menu-btn");
    const panel = document.getElementById("mobile-nav");
    const backdrop = document.getElementById("mobile-nav-backdrop");
    const y = document.getElementById("y");
    if (y) y.textContent = String(new Date().getFullYear());

    function syncSiteTopHeight() {
        const siteTop = document.querySelector(".site-top");
        if (!siteTop) return;
        const h = siteTop.getBoundingClientRect().height;
        document.documentElement.style.setProperty("--site-top-h", `${Math.round(h)}px`);
    }

    syncSiteTopHeight();
    requestAnimationFrame(syncSiteTopHeight);
    window.addEventListener("resize", syncSiteTopHeight);
    window.addEventListener("load", syncSiteTopHeight);

    if (btn && panel) {
        function isMenuOpen() {
            return panel.classList.contains("is-open");
        }

        function setOpen(open) {
            btn.setAttribute("aria-expanded", open ? "true" : "false");
            btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
            panel.classList.toggle("is-open", open);
            panel.setAttribute("aria-hidden", open ? "false" : "true");
            if (open) {
                panel.removeAttribute("inert");
            } else {
                panel.setAttribute("inert", "");
            }
            if (backdrop) {
                backdrop.classList.toggle("is-open", open);
                backdrop.setAttribute("aria-hidden", open ? "false" : "true");
            }
            document.body.classList.toggle("mobile-menu-open", open);
            syncSiteTopHeight();
        }

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen(!isMenuOpen());
        });

        panel.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setOpen(false));
        });

        if (backdrop) {
            backdrop.addEventListener("click", () => setOpen(false));
        }

        document.addEventListener("click", (e) => {
            const t = e.target;
            if (!(t instanceof Node)) return;
            if (!isMenuOpen()) return;
            if (btn.contains(t) || panel.contains(t)) return;
            setOpen(false);
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && isMenuOpen()) {
                setOpen(false);
            }
        });

        const desktopNavMq = window.matchMedia("(min-width: 1100px)");
        function closeMenuIfDesktop() {
            if (desktopNavMq.matches && isMenuOpen()) {
                setOpen(false);
            }
        }
        desktopNavMq.addEventListener("change", closeMenuIfDesktop);
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
