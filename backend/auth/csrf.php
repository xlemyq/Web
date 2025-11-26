<?php

declare(strict_types=1);

/**
 * Secure session bootstrap and CSRF token utilities.
 */
function initialize_secure_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $secure = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'domain' => '',
        'secure' => $secure,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);

    session_name('UP5STARSESSID');
    session_start();
}

function get_csrf_token(): string
{
    initialize_secure_session();

    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    return (string) $_SESSION['csrf_token'];
}

function validate_csrf_token(?string $token): bool
{
    initialize_secure_session();
    return is_string($token) && hash_equals((string) ($_SESSION['csrf_token'] ?? ''), $token);
}
