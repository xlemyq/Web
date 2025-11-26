<?php
function is_rate_limited(string $key, int $limit = 5, int $windowSeconds = 900): bool {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $cacheKey = sys_get_temp_dir() . '/up5star_' . md5($ip . $key);
    $now = time();
    $entries = [];
    if (file_exists($cacheKey)) {
        $data = file_get_contents($cacheKey);
        $entries = array_filter(explode('\n', $data), fn($ts) => ($now - (int)$ts) < $windowSeconds);
    }
    $entries[] = (string)$now;
    file_put_contents($cacheKey, implode('\n', $entries));
    return count($entries) > $limit;
}
