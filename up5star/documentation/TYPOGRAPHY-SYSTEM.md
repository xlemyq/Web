# System typograficzny

## Fonty
- **Primary (sans)**: Montserrat 300/400/500/600/700 – nowoczesna, czytelna baza do bloków tekstu.
- **Secondary (serif)**: Playfair Display 700/900 – nagłówki premium, storytelling.
- **Monospace**: IBM Plex Mono 400 – kod, dane, etykiety techniczne.

Pliki WOFF2 hostowane lokalnie w `website/assets/fonts/` i deklarowane w `website/css/main.css` z `font-display: swap`.

## Skala typograficzna
- `--heading-xxl`: clamp(40px, 6vw, 64px) – hero
- `--heading-xl`: clamp(32px, 4vw, 48px) – sekcje główne
- `--heading-lg`: clamp(28px, 3vw, 38px) – sekcje podrzędne
- `--heading-md`: 24px – nagłówki kart
- `--heading-sm`: 20px – podtytuły
- `--text-lg`: 18px – leady
- `--text-base`: 16px – akapity
- `--text-sm`: 14px – metadane
- `--text-xs`: 12px – etykiety

## Linie bazowe
- `--line-height`: 1.6 dla akapitów
- Nagłówki stosują `font-family: var(--font-secondary)` i większe odstępy dolne (`margin-bottom: 0.5em`).

## Parowanie
- H1/H2: Playfair Display 900/700
- H3/H4: Montserrat 700/600
- Body: Montserrat 400
- Kod: IBM Plex Mono 400

## Dostępność
- Minimalny rozmiar tekstu interaktywnego: 16px
- Kontrast: tekst #f4f6fb na tle #0A0A0A (14.06:1)
- Wspierane preferencje: `prefers-reduced-motion` oraz `font-display: swap` dla szybkiego renderingu.

## Użycie
Nagłówki budują narrację premium, akapity Montserrata utrzymują czytelność długich opisów usług i case studies, a IBM Plex Mono podkreśla dane KPI oraz fragmenty kodu w artykułach technicznych.
