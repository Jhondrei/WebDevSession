// === Modal Utility Functions ===
function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.remove("hidden");
    el.classList.add("is-open");

    // Optional: Reset validation when opening register modal
    if (id === "register-modal" && typeof resetRegisterFormValidation === "function") {
        resetRegisterFormValidation();
    }
}

function closeModal(id) {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.add("hidden");
    el.classList.remove("is-open");
}

function switchToRegister() {
    closeModal("login-modal");
    openModal("register-modal");
}

function switchToLogin() {
    closeModal("register-modal");
    openModal("login-modal");
}

// === Modal Triggers (Run after DOM ready) ===
document.addEventListener("DOMContentLoaded", () => {
    const openLoginBtn = document.getElementById("open-login");
    const openRegisterBtn = document.getElementById("open-register");

    openLoginBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        openModal("login-modal");
    });

    openRegisterBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        openModal("register-modal");
    });

    // === Registration Form AJAX ===
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(registerForm);

            try {
                const response = await fetch(registerForm.action, {
                    method: "POST",
                    body: formData,
                });
                const data = await response.json();

                closeModal("register-modal");

                const titleEl = document.getElementById("register-response-title");
                const msgEl = document.getElementById("register-response-message");

                if (data.success) {
                    titleEl.textContent = "Success!";
                    titleEl.classList.add("text-green-600");
                    titleEl.classList.remove("text-red-600");
                    registerForm.reset();
                } else {
                    titleEl.textContent = "Error";
                    titleEl.classList.add("text-red-600");
                    titleEl.classList.remove("text-green-600");
                }

                msgEl.textContent = data.message;
                openModal("register-response-modal");
            } catch (error) {
                closeModal("register-modal");
                document.getElementById("register-response-title").textContent = "Error";
                document.getElementById("register-response-message").textContent = "Unexpected error occurred.";
                openModal("register-response-modal");
            }
        });
    }
});

// === Logout Handler ===
function logout() {
    if (!window.confirm("Are you sure you want to logout?")) return;

    $.ajax({
        url: "../backend/logout.php",
        type: "POST",
        dataType: "json",
        success: (response) => {
            if (response.success) {
                resetNavbarToGuest();
                alert("Logged out successfully!");
            }
        },
        error: () => {
            resetNavbarToGuest();
        },
    });
}

function resetNavbarToGuest() {
    document.getElementById("guest-menu")?.classList.remove("hidden");
    document.getElementById("user-menu")?.classList.add("hidden");

    const accountText = document.getElementById("account-text");
    if (accountText) accountText.textContent = "My Account";
}

window.logout = logout;
