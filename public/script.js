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
            return btn.getAttribute("aria-expanded") === "true";
        }

        let closeFallbackTimer = 0;
        /** True after pointerup handled toggle; blocks duplicate synthetic click (touch/pen). */
        let suppressNextMenuBtnClick = false;
        /** Invalidates pending close timers / transitionend from a previous setOpen. */
        let menuOpEpoch = 0;

        function setOpen(open) {
            window.clearTimeout(closeFallbackTimer);
            closeFallbackTimer = 0;
            const opEpoch = ++menuOpEpoch;

            btn.setAttribute("aria-expanded", open ? "true" : "false");
            btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
            panel.setAttribute("aria-hidden", open ? "false" : "true");

            if (backdrop) {
                backdrop.classList.toggle("is-open", open);
                backdrop.setAttribute("aria-hidden", open ? "false" : "true");
            }
            document.body.classList.toggle("mobile-menu-open", open);
            syncSiteTopHeight();

            if (open) {
                panel.removeAttribute("hidden");
                panel.removeAttribute("inert");
                panel.classList.remove("is-open");
                requestAnimationFrame(() => {
                    void panel.offsetWidth;
                    panel.classList.add("is-open");
                });
                return;
            }

            if (panel.hasAttribute("hidden")) {
                return;
            }

            panel.setAttribute("inert", "");
            panel.classList.remove("is-open");

            function finalizeClose() {
                if (opEpoch !== menuOpEpoch) return;
                panel.setAttribute("hidden", "");
            }

            function onTransitionEnd(ev) {
                if (opEpoch !== menuOpEpoch) return;
                if (ev.propertyName !== "transform") return;
                panel.removeEventListener("transitionend", onTransitionEnd);
                window.clearTimeout(closeFallbackTimer);
                finalizeClose();
            }

            panel.addEventListener("transitionend", onTransitionEnd);
            closeFallbackTimer = window.setTimeout(() => {
                panel.removeEventListener("transitionend", onTransitionEnd);
                if (opEpoch !== menuOpEpoch) return;
                finalizeClose();
            }, 360);
        }

        setOpen(false);
        window.addEventListener("pageshow", (ev) => {
            if (ev.persisted) {
                setOpen(false);
            }
        });

        function mobileTouchMenuNow() {
            try {
                return (
                    navigator.maxTouchPoints > 0 &&
                    window.matchMedia("(max-width: 1099px)").matches
                );
            } catch {
                return false;
            }
        }

        btn.addEventListener(
            "touchend",
            (e) => {
                if (!mobileTouchMenuNow()) return;
                if (!btn.contains(e.target)) return;
                e.preventDefault();
                e.stopPropagation();
                setOpen(!isMenuOpen());
            },
            { passive: false, capture: true }
        );

        btn.addEventListener(
            "pointerup",
            (e) => {
                if (mobileTouchMenuNow()) return;
                if (e.pointerType === "mouse" && e.button !== 0) return;
                suppressNextMenuBtnClick = true;
                e.preventDefault();
                e.stopPropagation();
                setOpen(!isMenuOpen());
            },
            true
        );

        btn.addEventListener("click", (e) => {
            if (suppressNextMenuBtnClick) {
                suppressNextMenuBtnClick = false;
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            if (mobileTouchMenuNow() && e.detail > 0) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
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
