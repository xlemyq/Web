# Web

Strona internetowa up5Star.pl

## Backend API

### `/backend/contact.php`
- Obsługuje formularz kontaktowy z walidacją pól, CSRF, reCAPTCHA v3 oraz limitem zapytań opartym o SQLite (IP + User-Agent).
- Wysyła powiadomienia e-mail z nagłówkami anty-spoofing oraz pełnym logowaniem zdarzeń do `logs/app.log`.
- Odpowiada w formacie JSON z jednoznacznymi kodami HTTP i komunikatami użytkownika.

### Konfiguracja
- Klucze reCAPTCHA i ustawienia poczty definiuje `config/environments.json`. Wyboru środowiska dokonuje zmienna `APP_ENV` (domyślnie `production`).
- Wymagane uprawnienia zapisu dla katalogów `logs/` i `backend/` (plik `rate_limit.db`).

### Bezpieczeństwo
- CSRF: token generowany i przechowywany w sesji. Klient powinien wysyłać go w polu `csrf_token` lub nagłówku `X-CSRF-Token`.
- Rate limiting: maksymalnie 10 prób w ciągu 10 minut dla unikalnego identyfikatora IP + User-Agent.
- reCAPTCHA: wymagane przekazanie `recaptcha_token` wygenerowanego po stronie frontendu (v3).
