<?php
function sanitize_string(string $value): string {
    return htmlspecialchars(trim($value), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function validate_email(string $email): bool {
    return (bool) filter_var($email, FILTER_VALIDATE_EMAIL);
}

function validate_required(array $data, array $fields): array {
    $errors = [];
    foreach ($fields as $field) {
        if (empty($data[$field]) || trim($data[$field]) === '') {
            $errors[] = "Pole {$field} jest wymagane.";
        }
    }
    return $errors;
}
