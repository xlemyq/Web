<?php
require_once __DIR__ . '/utils/validator.php';
require_once __DIR__ . '/utils/rateLimiter.php';
require_once __DIR__ . '/utils/mailer.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Metoda niedozwolona']);
    exit;
}

if (is_rate_limited('contact')) {
    http_response_code(429);
    echo json_encode(['status' => 'error', 'message' => 'Zbyt wiele prób, spróbuj ponownie później']);
    exit;
}

$data = [
    'name' => sanitize_string($_POST['name'] ?? ''),
    'email' => sanitize_string($_POST['email'] ?? ''),
    'company' => sanitize_string($_POST['company'] ?? ''),
    'message' => sanitize_string($_POST['message'] ?? ''),
];

$errors = validate_required($data, ['name', 'email', 'message']);
if (!validate_email($data['email'])) {
    $errors[] = 'Nieprawidłowy adres e-mail.';
}

if ($errors) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => implode(' ', $errors)]);
    exit;
}

$body = "Nowe zapytanie z formularza kontaktowego:\n".
        "Imię i nazwisko: {$data['name']}\n".
        "Email: {$data['email']}\n".
        "Firma: {$data['company']}\n".
        "Wiadomość: {$data['message']}\n".
        "IP: " . ($_SERVER['REMOTE_ADDR'] ?? '');

if (send_mail('kontakt@up5star.pl', 'Nowe zapytanie kontaktowe', $body)) {
    echo json_encode(['status' => 'success', 'message' => 'Dziękujemy! Wracamy w ciągu 24h.']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Nie udało się wysłać wiadomości.']);
}
