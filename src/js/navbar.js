    (function () {
        var toggle = document.getElementById("nav-toggle");
        var menu = document.getElementById("nav-menu");
        var shopToggle = document.getElementById("shop-toggle");
        var shopDropdown = document.getElementById("shop-dropdown");
        var accountToggles = document.querySelectorAll("#account-toggle");
        var userDropdown = document.getElementById("user-dropdown");
        var guestDropdown = document.getElementById("guest-dropdown");
        if (!toggle || !menu) return;
        function openMenu() {
            menu.classList.remove("hidden");
            menu.classList.add("flex");
            document.body.style.overflow = "hidden";
            toggle.setAttribute("aria-expanded", "true");
        }
        function closeMenu() {
            menu.classList.add("hidden");
            menu.classList.remove("flex");
            document.body.style.overflow = "";
            toggle.setAttribute("aria-expanded", "false");
        }
        toggle.addEventListener("click", function () {
            var isHidden = menu.classList.contains("hidden");
            isHidden ? openMenu() : closeMenu();
        });
        // Mobile: toggle dropdowns on click instead of hover
        function isMobile() {
            return window.innerWidth < 768;
        }
        function toggleDropdown(dropdownEl, triggerEl) {
            if (!dropdownEl) return;
            var isOpen = dropdownEl.classList.contains("opacity-100");
            if (isOpen) {
                dropdownEl.classList.remove("opacity-100", "visible");
                dropdownEl.classList.add("opacity-0", "invisible");
                if (triggerEl) triggerEl.setAttribute("aria-expanded", "false");
            } else {
                dropdownEl.classList.remove("opacity-0", "invisible");
                dropdownEl.classList.add("opacity-100", "visible");
                if (triggerEl) triggerEl.setAttribute("aria-expanded", "true");
            }
        }
        if (shopToggle && shopDropdown) {
            shopToggle.addEventListener("click", function (e) {
                if (isMobile()) {
                    e.preventDefault();
                    toggleDropdown(shopDropdown, shopToggle);
                }
            });
        }
        if (accountToggles && (userDropdown || guestDropdown)) {
            accountToggles.forEach(function (btn) {
                btn.addEventListener("click", function (e) {
                    if (!isMobile()) return;
                    e.preventDefault();
                    var dd = userDropdown || guestDropdown;
                    toggleDropdown(dd, btn);
                });
            });
        }
        menu.addEventListener("click", function (e) {
            var target = e.target;
            if (window.innerWidth >= 768) return;
            if (target.tagName === "A") closeMenu();
        });
        // Ensure proper state on resize across breakpoints
        window.addEventListener("resize", function () {
            if (window.innerWidth >= 768) {
                menu.classList.remove("hidden");
                menu.classList.remove("flex");
                toggle.setAttribute("aria-expanded", "false");
                [shopDropdown, userDropdown, guestDropdown].forEach(function (dd) {
                    if (!dd) return;
                    dd.classList.remove("opacity-100", "visible");
                    dd.classList.add("opacity-0", "invisible");
                });
            } else {
                // collapsed by default on mobile
                if (!menu.classList.contains("hidden")) closeMenu();
            }
        });
    })();