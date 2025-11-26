<?php

declare(strict_types=1);

require_once __DIR__ . '/log.php';
require_once __DIR__ . '/auth/csrf.php';
require_once __DIR__ . '/rate_limit.php';

header('Content-Type: application/json; charset=utf-8');

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function load_config(): array
{
    $configPath = __DIR__ . '/../config/environments.json';
    if (!is_readable($configPath)) {
        throw new RuntimeException('Brak pliku konfiguracyjnego środowisk.');
    }

    $data = json_decode((string) file_get_contents($configPath), true, 512, JSON_THROW_ON_ERROR);
    $env = getenv('APP_ENV') ?: 'production';

    if (!isset($data[$env])) {
        throw new RuntimeException(sprintf('Nie znaleziono konfiguracji dla środowiska "%s".', $env));
    }

    return $data[$env];
}

function get_request_body(): array
{
    $rawInput = file_get_contents('php://input');
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

    if (stripos($contentType, 'application/json') !== false && $rawInput !== false && $rawInput !== '') {
        $decoded = json_decode($rawInput, true);
        if (is_array($decoded)) {
            return $decoded;
        }
    }

    return $_POST;
}

function sanitize_field(?string $value): string
{
    return trim((string) ($value ?? ''));
}

function sanitize_header_value(string $value): string
{
    return preg_replace('/[\r\n]+/', ' ', $value) ?? '';
}

function validate_payload(array $payload): array
{
    $errors = [];

    $name = sanitize_field($payload['name'] ?? '');
    $email = sanitize_field($payload['email'] ?? '');
    $subject = sanitize_field($payload['subject'] ?? '');
    $message = sanitize_field($payload['message'] ?? '');

    if ($name === '' || mb_strlen($name) < 2 || mb_strlen($name) > 100) {
        $errors['name'] = 'Imię i nazwisko musi mieć od 2 do 100 znaków.';
    }

    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Podaj poprawny adres e-mail.';
    }

    if ($subject === '' || mb_strlen($subject) < 2 || mb_strlen($subject) > 150) {
        $errors['subject'] = 'Temat musi mieć od 2 do 150 znaków.';
    }

    if ($message === '' || mb_strlen($message) < 10 || mb_strlen($message) > 5000) {
        $errors['message'] = 'Wiadomość musi mieć od 10 do 5000 znaków.';
    }

    return [$errors, compact('name', 'email', 'subject', 'message')];
}

function verify_csrf(array $payload): void
{
    $csrfToken = $payload['csrf_token'] ?? $_SERVER['HTTP_X_CSRF_TOKEN'] ?? null;
    if (!validate_csrf_token(is_string($csrfToken) ? $csrfToken : null)) {
        respond(403, [
            'success' => false,
            'message' => 'Nieprawidłowy token bezpieczeństwa. Odśwież stronę i spróbuj ponownie.',
        ]);
    }
}

function verify_recaptcha(array $payload, string $secret): void
{
    $token = $payload['recaptcha_token'] ?? '';
    if (!is_string($token) || trim($token) === '') {
        respond(400, [
            'success' => false,
            'message' => 'Brak tokenu reCAPTCHA.',
        ]);
    }

    $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
    if ($ch === false) {
        throw new RuntimeException('Nie udało się zainicjalizować klienta reCAPTCHA.');
    }

    $postData = http_build_query([
        'secret' => $secret,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? null,
    ]);

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $postData,
        CURLOPT_TIMEOUT => 10,
    ]);

    $response = curl_exec($ch);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($response === false) {
        log_event('error', 'Błąd połączenia z reCAPTCHA', ['error' => $curlError]);
        respond(503, [
            'success' => false,
            'message' => 'Nie udało się zweryfikować reCAPTCHA. Spróbuj ponownie później.',
        ]);
    }

    $decoded = json_decode($response, true);
    if (!is_array($decoded) || ($decoded['success'] ?? false) !== true || ($decoded['score'] ?? 0) < 0.5) {
        log_event('warning', 'Nieudana weryfikacja reCAPTCHA', ['response' => $decoded]);
        respond(403, [
            'success' => false,
            'message' => 'Weryfikacja reCAPTCHA nie powiodła się.',
        ]);
    }
}

function send_contact_email(array $data, array $config): bool
{
    $recipient = sanitize_header_value($config['contact_email_to'] ?? '');
    $from = sanitize_header_value($config['contact_email_from'] ?? '');
    $prefix = sanitize_header_value($config['contact_email_subject_prefix'] ?? '[UP5Star] Formularz kontaktowy');

    if ($recipient === '' || $from === '') {
        throw new RuntimeException('Brak wymaganych ustawień e-mail.');
    }

    $subject = $prefix . ' — ' . sanitize_header_value($data['subject']);

    $userAgent = substr(sanitize_header_value($_SERVER['HTTP_USER_AGENT'] ?? 'unknown'), 0, 250);
    $ip = sanitize_header_value($_SERVER['REMOTE_ADDR'] ?? 'unknown');

    $body = "Imię i nazwisko: {$data['name']}\n" .
        "E-mail: {$data['email']}\n" .
        "Temat: {$data['subject']}\n" .
        "Wiadomość:\n{$data['message']}\n\n" .
        "Adres IP: {$ip}\n" .
        "User-Agent: {$userAgent}\n" .
        'Wysłano: ' . (new DateTimeImmutable())->format('Y-m-d H:i:s P') . "\n";

    $headers = [
        'From: ' . $from,
        'Reply-To: ' . sanitize_header_value($data['email']),
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'X-Mailer: PHP/' . PHP_VERSION,
        'X-Originating-IP: ' . $ip,
        'X-User-Agent: ' . $userAgent,
    ];

    return mail($recipient, $subject, $body, implode("\r\n", $headers));
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        respond(405, [
            'success' => false,
            'message' => 'Metoda niedozwolona.',
        ]);
    }

    initialize_secure_session();

    $rateLimitResponse = enforce_rate_limit();
    if ($rateLimitResponse !== null) {
        respond($rateLimitResponse['status'], $rateLimitResponse['body']);
    }

    $payload = get_request_body();
    verify_csrf($payload);

    [$errors, $sanitized] = validate_payload($payload);
    if (!empty($errors)) {
        respond(400, [
            'success' => false,
            'message' => 'Proszę poprawić zaznaczone pola.',
            'errors' => $errors,
        ]);
    }

    $config = load_config();
    verify_recaptcha($payload, (string) $config['recaptcha_v3_secret']);

    if (!send_contact_email($sanitized, $config)) {
        log_event('error', 'Nie udało się wysłać wiadomości e-mail.', ['data' => $sanitized]);
        respond(500, [
            'success' => false,
            'message' => 'Nie udało się wysłać wiadomości. Spróbuj ponownie później.',
        ]);
    }

    log_event('info', 'Wiadomość kontaktowa wysłana.', [
        'email' => $sanitized['email'],
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
    ]);

    respond(200, [
        'success' => true,
        'message' => 'Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.',
        'csrf_token' => get_csrf_token(),
    ]);
} catch (Throwable $throwable) {
    log_exception($throwable, ['context' => 'contact_handler']);
    respond(500, [
        'success' => false,
        'message' => 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.',
    ]);
}
