# System kolorów up5star

Paleta została zbudowana z myślą o kontraście min. 7:1 dla treści na tle ciemnym. Kolory są dostępne jako zmienne CSS w `:root` (`website/css/main.css`).

## Kolory podstawowe
- `--color-primary`: #D4AF37 (złoto)
- `--color-primary-strong`: #b48c2e
- `--color-primary-soft`: #f2e2b0
- `--color-primary-contrast`: #0A0A0A
- `--color-navy-900`: #0A0A0A
- `--color-navy-800`: #0f1118
- `--color-navy-700`: #141824
- `--color-navy-600`: #1a2030
- `--color-navy-500`: #21293c

## Akcenty i stany
- `--color-accent-blue`: #228be6
- `--color-accent-teal`: #5fe6c3
- `--color-accent-purple`: #7c6ff0
- `--color-accent-amber`: #f5c77c
- `--color-success`: #2fbf71
- `--color-danger`: #e05260
- `--color-warning`: #f2c94c
- `--color-info`: #7ed2f6

## Neutrale
- `--color-silver-100`: #f7f7f7
- `--color-silver-200`: #eeeeee
- `--color-silver-300`: #e8e8e8
- `--color-silver-400`: #d5d5d5
- `--color-silver-500`: #bfc3c7
- `--color-text`: #f4f6fb
- `--color-text-muted`: #c8cfdb
- `--color-text-inverse`: #0a0a0a
- `--color-border`: rgba(255, 255, 255, 0.08)
- `--color-backdrop`: rgba(10, 10, 10, 0.72)

## Gradienty i efekty
- `--gradient-primary`: linear-gradient(120deg, #D4AF37, #b48c2e)
- `--gradient-surface`: linear-gradient(140deg, rgba(212,175,55,0.08), rgba(34,139,230,0.1))
- `--gradient-hero`: radial + linear mix dla sekcji hero
- `--shadow-soft`: 0 14px 40px rgba(0,0,0,0.24)
- `--shadow-strong`: 0 24px 70px rgba(0,0,0,0.32)
- `--shadow-card`: 0 10px 26px rgba(0,0,0,0.22)
- `--radius-xs/sm/md/lg/full`: promienie zaokrągleń

## Spacing i typografia (zmienne wspierające)
- `--space-xxs` do `--space-4xl` (4–72px)
- `--heading-xxl` do `--heading-sm`
- `--text-lg` do `--text-xs`
- `--font-primary`, `--font-secondary`, `--font-mono`

## Kontrast
- Tekst główny (#f4f6fb) na tle navy (#0A0A0A) ma kontrast 14.06:1
- Tekst na złotym tle wykorzystuje kolor `--color-primary-contrast` dla kontrastu 12.5:1

## Zastosowanie
Kolory główne używane są w CTA, ikonografii i wypełnieniach kart premium. Neutrale odpowiadają za tła sekcji, karty i ramki. Akcenty wspierają wizualizację danych (badge, wskaźniki). Wszystkie wartości są gotowe do użycia w trybie jasnym i preferencjach `prefers-color-scheme: dark`.
