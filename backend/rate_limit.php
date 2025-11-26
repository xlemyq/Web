<?php

declare(strict_types=1);

require_once __DIR__ . '/log.php';

class RateLimiter
{
    private const DB_PATH = __DIR__ . '/rate_limit.db';
    private const MAX_ATTEMPTS = 10;
    private const WINDOW_SECONDS = 600; // 10 minutes

    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = $this->connect();
        $this->ensureSchema();
    }

    private function connect(): PDO
    {
        $dsn = 'sqlite:' . self::DB_PATH;
        $pdo = new PDO($dsn, null, null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        $this->pdo = $pdo;
        return $pdo;
    }

    private function ensureSchema(): void
    {
        $this->pdo->exec(
            'CREATE TABLE IF NOT EXISTS rate_limits (
                identifier TEXT PRIMARY KEY,
                attempts INTEGER NOT NULL,
                first_attempt_at INTEGER NOT NULL
            )'
        );
    }

    public function isLimited(string $identifier): bool
    {
        $now = time();
        $windowStart = $now - self::WINDOW_SECONDS;

        $stmt = $this->pdo->prepare('SELECT attempts, first_attempt_at FROM rate_limits WHERE identifier = :identifier');
        $stmt->execute([':identifier' => $identifier]);
        $row = $stmt->fetch();

        if ($row === false) {
            $this->recordAttempt($identifier, $now, true);
            return false;
        }

        if ((int) $row['first_attempt_at'] < $windowStart) {
            $this->resetAttempts($identifier, $now);
            return false;
        }

        if ((int) $row['attempts'] >= self::MAX_ATTEMPTS) {
            return true;
        }

        $this->recordAttempt($identifier, $now, false);
        return false;
    }

    private function recordAttempt(string $identifier, int $timestamp, bool $isNew): void
    {
        if ($isNew) {
            $stmt = $this->pdo->prepare('INSERT INTO rate_limits (identifier, attempts, first_attempt_at) VALUES (:identifier, 1, :timestamp)');
            $stmt->execute([
                ':identifier' => $identifier,
                ':timestamp' => $timestamp,
            ]);
            return;
        }

        $stmt = $this->pdo->prepare('UPDATE rate_limits SET attempts = attempts + 1 WHERE identifier = :identifier');
        $stmt->execute([':identifier' => $identifier]);
    }

    private function resetAttempts(string $identifier, int $timestamp): void
    {
        $stmt = $this->pdo->prepare('REPLACE INTO rate_limits (identifier, attempts, first_attempt_at) VALUES (:identifier, 1, :timestamp)');
        $stmt->execute([
            ':identifier' => $identifier,
            ':timestamp' => $timestamp,
        ]);
    }
}

function get_rate_limit_identifier(): string
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown_ip';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown_agent';

    return hash('sha256', $ip . '|' . $userAgent);
}

function enforce_rate_limit(): ?array
{
    try {
        $rateLimiter = new RateLimiter();
        $identifier = get_rate_limit_identifier();

        if ($rateLimiter->isLimited($identifier)) {
            log_event('warning', 'Rate limit exceeded', ['identifier' => $identifier]);
            return [
                'status' => 429,
                'body' => [
                    'success' => false,
                    'message' => 'Osiągnięto limit prób. Spróbuj ponownie za kilka minut.',
                ],
            ];
        }
    } catch (Throwable $throwable) {
        log_exception($throwable, ['context' => 'rate_limit']);
    }

    return null;
}
