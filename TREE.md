# up5star-production – struktura katalogów i rola plików

Pełny szkielet projektu zgodnie z wymaganiami produkcyjnymi. Kolejne etapy będą uzupełniały każdy plik treścią kodu, backendem PHP, konfiguracjami PWA, testami i dokumentacją.

```
up5star-production/
├── public/                   # Pliki serwowane klientowi (HTML, CSS, JS, assets, PWA)
│   ├── index.html            # Strona główna (hero, oferta, proces, case studies, FAQ, CTA)
│   ├── o-nas.html            # Historia, zespół, wartości, podejście strategiczne
│   ├── portfolio.html        # Lista case studies z filtrami
│   ├── case-study.html       # Szablon pojedynczego case study
│   ├── blog.html             # Listing artykułów blogowych
│   ├── blog-article.html     # Szablon artykułu (schema Article, breadcrumbs)
│   ├── kalkulator-wyceny.html# Kalkulator SEO z formularzem zapytania
│   ├── kontakt.html          # Dane firmy, mapa, formularz kontaktowy
│   ├── polityka-prywatnosci.html # Pełna polityka zgodna z RODO
│   ├── regulamin.html        # Regulamin świadczenia usług i serwisu
│   ├── 404.html              # Strona błędu 404
│   ├── offline.html          # Fallback PWA dla trybu offline
│   ├── uslugi/               # Podstrony usług SEO
│   │   ├── seo-on-page.html
│   │   ├── seo-technical.html
│   │   ├── seo-off-page.html
│   │   ├── local-seo.html
│   │   └── seo-audit.html
│   ├── assets/
│   │   ├── css/
│   │   │   ├── main.css          # Design system: kolory, typografia, komponenty
│   │   │   ├── responsive.css    # Media queries, układ mobile-first
│   │   │   ├── animations.css    # Animacje i mikrointerakcje
│   │   │   ├── accessibility.css # Wysoki kontrast, focus, wsparcie screen readerów
│   │   │   └── print.css         # Styl wydruku
│   │   ├── js/
│   │   │   ├── main.js           # Entry point front-endu, nawigacja, init modułów
│   │   │   ├── form-validation.js# Walidacja formularzy
│   │   │   ├── calculator.js     # Logika kalkulatora wyceny
│   │   │   ├── cookies.js        # Zarządzanie zgodami cookies/RODO
│   │   │   ├── countup.js        # Animowane liczniki sekcji statystyk
│   │   │   └── modules/          # Moduły ES6+ do funkcji UI
│   │   │       ├── analytics.js
│   │   │       ├── scroll-effects.js
│   │   │       ├── accordion.js
│   │   │       ├── modal.js
│   │   │       └── lazyload.js
│   │   ├── images/               # Ikony, favicony, ilustracje, WebP/SVG
│   │   └── fonts/                # Zasoby fontów self-hosted
│   ├── manifest.json         # Konfiguracja PWA
│   ├── service-worker.js     # Cache, offline, strategia aktualizacji
│   ├── robots.txt            # Reguły indeksacji
│   ├── sitemap.xml           # Mapa serwisu dla wyszukiwarek
│   ├── ads.txt               # Deklaracja reklamowa (opcjonalna)
│   ├── security.txt          # Kanał zgłaszania luk bezpieczeństwa
│   └── .htaccess             # Nagłówki security, kompresja, cache, redirect HTTPS
├── backend/                  # Logika PHP 8.x dla formularzy, bezpieczeństwa
│   ├── config.php            # Ładowanie konfiguracji z ENV i plików
│   ├── contact.php           # Obsługa formularza kontaktowego (walidacja, CSRF, recaptcha)
│   ├── quote.php             # Obsługa kalkulatora wyceny, walidacja, rate-limit
│   ├── log.php               # Centralny logger aplikacyjny
│   ├── auth/
│   │   ├── csrf.php          # Generowanie i walidacja tokenów CSRF
│   │   └── recaptcha.php     # Integracja reCAPTCHA v3
│   └── utils/
│       ├── validator.php     # Funkcje walidacji danych wejściowych
│       ├── rateLimiter.php   # Prosty rate limit per IP/session
│       ├── mailer.php        # Wysyłka e-mail z bezpiecznymi nagłówkami
│       └── errorHandler.php  # Obsługa błędów, logowanie, komunikaty przyjazne użytkownikowi
├── config/
│   ├── environments.json     # Profile dev/staging/prod
│   ├── .env.example          # Wzorzec zmiennych środowiskowych (lokalnie)
│   └── app.config.json       # Ustawienia aplikacji (feature flags, integracje)
├── scripts/                  # Skrypty QA, build, deploy, test
│   ├── qa-html-validate.sh
│   ├── qa-css-validate.sh
│   ├── qa-link-check.sh
│   ├── qa-lighthouse.sh
│   ├── qa-accessibility.sh
│   ├── qa-seo-audit.sh
│   ├── deploy-production.sh
│   ├── deploy-staging.sh
│   ├── deploy-rollback.sh
│   ├── deploy-backup.sh
│   ├── build-minify-css.sh
│   ├── build-minify-js.sh
│   ├── build-optimize-images.sh
│   ├── build-generate-sitemap.sh
│   ├── test-unit.sh
│   ├── test-integration.sh
│   ├── test-e2e.sh
│   └── test-performance.sh
├── tests/
│   ├── unit/
│   │   ├── calculator.test.js
│   │   ├── validator.test.php
│   │   └── accessibility.test.js
│   ├── integration/
│   │   ├── form-flow.test.js
│   │   ├── api-contact.test.php
│   │   └── calculator-flow.test.js
│   └── e2e/
│       ├── homepage.e2e.js
│       ├── offer-to-contact.e2e.js
│       ├── quote-form.e2e.js
│       └── error-states.e2e.js
├── docs/
│   ├── README.md
│   ├── QUICK-START-GUIDE.md
│   ├── DEPLOYMENT-GUIDE.md
│   ├── ARCHITECTURE.md
│   ├── SECURITY-CHECKLIST.md
│   ├── PERFORMANCE-GUIDE.md
│   ├── API-DOCUMENTATION.md
│   ├── SEO-STRATEGY.md
│   ├── DESIGN-GUIDE.md
│   ├── TROUBLESHOOTING.md
│   ├── MAINTENANCE-PLAN.md
│   ├── CHANGELOG.md
│   ├── VERSION-HISTORY.md
│   └── COLOR-PALETTE.md
├── integrations/
│   ├── google-analytics-setup.txt
│   ├── tawk-to-setup.txt
│   ├── search-console-setup.txt
│   ├── bing-webmaster-setup.txt
│   ├── cookie-consent-config.txt
│   └── monitoring/
│       ├── sentry-config.txt
│       ├── uptime-robot-config.txt
│       └── observability-metrics.md
├── tools/
│   ├── filezilla-setup.txt
│   ├── testing-checklist.md
│   ├── useful-tools.txt
│   ├── vscode-extensions.md
│   ├── lighthouse-ci-config.json
│   ├── github-actions-workflow.yml
│   ├── docker-compose.yml
│   ├── performance-audit.md
│   └── seo-audit-template.md
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml
│   │   ├── test.yml
│   │   ├── lighthouse.yml
│   │   └── security-scan.yml
│   └── ISSUE_TEMPLATE/
│       ├── bug.md
│       └── feature.md
├── monitoring/
│   ├── sentry.md
│   ├── uptime-robot.md
│   └── grafana-prometheus.md
├── package.json              # Skrypty narzędziowe (npm) do QA/CI
├── docker-compose.yml        # Usługi pomocnicze (np. serwer dev, Playwright)
├── README.md                 # Skrót projektu w katalogu głównym
├── DEPLOYMENT-GUIDE.md       # Instrukcje wdrożenia na Zenbox
└── .gitignore
```

## Zasady kolejnych etapów
- HTML → CSS → JS → PHP → pliki techniczne → skrypty → testy → dokumentacja → integracje → CI/CD.
- Każdy plik tworzony w pełnej treści produkcyjnej, bez placeholderów.
- Jeśli output zostanie ucięty, kolejne odpowiedzi kontynuują od miejsca przerwania.
