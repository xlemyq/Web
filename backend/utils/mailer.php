<?php
function send_mail(string $to, string $subject, string $message): bool {
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/plain; charset=utf-8',
        'From: up5star <kontakt@up5star.pl>',
        'Reply-To: kontakt@up5star.pl',
    ];
    return mail($to, $subject, $message, implode("\r\n", $headers));
}
