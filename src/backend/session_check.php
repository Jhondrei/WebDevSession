<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check login status
function isLoggedIn(): bool {
    return !empty($_SESSION['logged_in']);
}

// Get current user data
function getCurrentUser(): ?array {
    return isLoggedIn() ? [
        'id'    => $_SESSION['user_id'] ?? null,
        'name'  => $_SESSION['user_name'] ?? null,
        'email' => $_SESSION['user_email'] ?? null
    ] : null;
}

// Redirect if not logged in
function requireLogin(string $redirectTo = '../pages/home.php'): void {
    if (!isLoggedIn()) {
        header("Location: $redirectTo");
        exit;
    }
}

// Redirect if already logged in
function requireGuest(string $redirectTo = '../pages/home.php'): void {
    if (isLoggedIn()) {
        header("Location: $redirectTo");
        exit;
    }
}
?>
