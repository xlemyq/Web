<?php

declare(strict_types=1);

/**
 * Centralized logging utility to capture application events and errors.
 */
function log_event(string $level, string $message, array $context = []): void
{
    $levels = ['emergency', 'alert', 'critical', 'error', 'warning', 'notice', 'info', 'debug'];
    if (!in_array($level, $levels, true)) {
        $level = 'info';
    }

    $logDirectory = __DIR__ . '/../logs';
    if (!is_dir($logDirectory)) {
        mkdir($logDirectory, 0775, true);
    }

    $logPath = $logDirectory . '/app.log';
    $timestamp = (new DateTimeImmutable('now', new DateTimeZone('UTC')))->format(DATE_ATOM);

    $normalizedContext = [];
    foreach ($context as $key => $value) {
        if (is_scalar($value) || $value === null) {
            $normalizedContext[$key] = $value;
        } elseif ($value instanceof Throwable) {
            $normalizedContext[$key] = [
                'type' => get_class($value),
                'message' => $value->getMessage(),
                'file' => $value->getFile(),
                'line' => $value->getLine(),
                'trace' => $value->getTraceAsString(),
            ];
        } else {
            $normalizedContext[$key] = json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        }
    }

    $payload = json_encode([
        'timestamp' => $timestamp,
        'level' => $level,
        'message' => $message,
        'context' => $normalizedContext,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    if ($payload === false) {
        $payload = sprintf('{"timestamp":"%s","level":"%s","message":"%s"}', $timestamp, $level, $message);
    }

    $logLine = $payload . PHP_EOL;
    file_put_contents($logPath, $logLine, FILE_APPEND | LOCK_EX);
}

function log_exception(Throwable $throwable, array $context = []): void
{
    $context['exception'] = $throwable;
    log_event('error', $throwable->getMessage(), $context);
}
