<?php
$env = getenv('APP_ENV') ?: 'production';
$configFile = __DIR__ . '/../config/environments.json';
$configData = json_decode(file_get_contents($configFile), true);
$app = $configData[$env] ?? $configData['production'];
return $app;
