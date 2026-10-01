# IronForge — demo paketa Start

Demo web stranica izmišljene teretane **IronForge** i ujedno predložak za paket **Start** (Apex Edge Technologies).
Vite + React + TypeScript, prerenderirani statični HTML (radi bez servera na Vercelu i Cloudflare Pages).

## Naredbe

```bash
npm install        # instalira ovisnosti (zaključane verzije iz package-lock.json)
npm run dev        # razvojni server na http://localhost:5173
npm run build      # produkcijski build → mapa dist/
npm run preview    # pregled builda na http://localhost:4173
npm run lint       # oxlint
npm run images     # preuzme/pretvori fotografije u WebP (scripts/images.mjs)
```

Potreban je Node.js 20.19+ (preporuka 22, vidi `.node-version`).

## Objava (deploy)

| | Build naredba | Izlazna mapa |
|---|---|---|
| **Vercel** | `npm run build` | `dist` |
| **Cloudflare Pages** | `npm run build` | `dist` |

- **Vercel:** postavke su već u `vercel.json` (framework, build naredba, izlazna mapa, `cleanUrls`, cache za `/assets`). Dovoljno je spojiti repozitorij.
- **Cloudflare Pages:** Framework preset *None* (ili *Vite*), Build command `npm run build`, Build output directory `dist`. Verziju Nodea čita iz `.node-version`, a cache zaglavlja iz `public/_headers`.
- Stranica `/politika-privatnosti` i stranica `404.html` rade na oba hostinga bez dodatnih pravila.

## Novi klijent — što mijenjaš

Za novog klijenta u pravilu mijenjaš samo **dvije datoteke**:

### `src/content.ts` — sav sadržaj
- `DEMO_MODE` → `false` (makne demo traku, oznaku „(demo)” uz recenzije i „Demo paketa Start” iz naslova; forma počinje slati).
- `FORM_ENDPOINT` → npr. `'https://formsubmit.co/ajax/info@klijent.hr'` (vidi dolje).
- `site` → naziv, tekst logotipa i `url` produkcijske domene (bez `/` na kraju).
- `seo` → naslov, opis, OG slika, `noindex: false` da tražilice indeksiraju stranicu.
- `sections` → `false` sakriva sekciju (statistika, o nama, programi, cijene, galerija, recenzije, poziv na akciju). Linkovi na skrivenu sekciju sami vode na kontakt.
- Tekstovi sekcija: `hero`, `stats`, `about`, `programs`, `pricing`, `gallery`, `testimonials`, `cta`, `contact`, `footer`.
- `hours` (radno vrijeme), `social` (ikona se prikaže samo ako je URL upisan), `contact` (adresa, telefon, e-mail).
- `legal` → podaci za Politiku privatnosti; zamijeni sve oznake `[PODACI KLIJENTA: …]`.
- Slike: putanje, `width` i `height` (dimenzije ispiše `npm run images`).

### `src/theme.css` — boje i fontovi
- Boje u `:root` (`--gold`, `--dark`, `--text` …). Za boje koje imaju i `-rgb` inačicu upiši istu boju u RGB obliku.
- Fontovi: `npm i @fontsource/<font>`, zamijeni `@import`/`@font-face` na vrhu i varijable `--font-display` i `--font-body`.

### Ostalo po potrebi
- Fotografije: u `scripts/images.mjs` upiši Pexels ID ili lokalnu datoteku (npr. `images-src/hero.jpg`) i pokreni `npm run images`.
- `public/og-image.jpg` (1200 × 630), `public/favicon.svg`, `public/favicon-32x32.png`, `public/apple-touch-icon.png`.

## Kontakt forma (FormSubmit)

1. `DEMO_MODE = false`, `FORM_ENDPOINT = 'https://formsubmit.co/ajax/info@klijent.hr'`.
2. Pošalji prvu poruku s objavljene stranice — FormSubmit klijentu pošalje e-mail za aktivaciju; nakon klika na „Activate” poruke stižu.
3. Po želji zamijeni e-mail u `FORM_ENDPOINT` nasumičnim aliasom koji FormSubmit pošalje (skriva adresu).

Forma ima stanje slanja, poruku o uspjehu i grešci (najave čitačima ekrana preko `aria-live`) i honeypot polje protiv spama. Dok je `DEMO_MODE` uključen, ništa se ne šalje.

## Struktura

```
index.html, politika-privatnosti.html, 404.html   HTML predlošci (sadržaj se prerenderira pri buildu)
src/content.ts          sav sadržaj + DEMO_MODE, FORM_ENDPOINT, prekidači sekcija
src/theme.css           boje i fontovi
src/styles.css          raspored i izgled komponenti
src/components/         po jedna komponenta za svaku sekciju
src/pages/              Politika privatnosti i 404
src/head.ts             title, meta, Open Graph, Twitter, JSON-LD (ExerciseGym)
src/entry-server.tsx    renderiranje stranica pri buildu
scripts/prerender.mjs   upisuje prerenderirani HTML i <head> u dist/
scripts/images.mjs      preuzimanje i pretvaranje fotografija u WebP
public/                 slike, ikone, og-image.jpg, robots.txt, _headers
vercel.json             postavke za Vercel
```

## Izvori fotografija

Sve fotografije su s [Pexelsa](https://www.pexels.com/license/) (besplatne za komercijalnu upotrebu), pretvorene u WebP.

| Datoteka | Izvor |
|---|---|
| `hero-*.webp`, `og-image.jpg` | https://www.pexels.com/photo/1552242/ |
| `about-main.webp` | https://www.pexels.com/photo/1229356/ |
| `about-accent.webp` | https://www.pexels.com/photo/416778/ |
| `program-powerlifting.webp` | https://www.pexels.com/photo/1552106/ |
| `program-hiit.webp` | https://www.pexels.com/photo/703012/ |
| `program-yoga.webp` | https://www.pexels.com/photo/4056535/ |
| `program-boxing.webp` | https://www.pexels.com/photo/5750952/ |
| `program-bodybuilding.webp` | https://www.pexels.com/photo/1431282/ |
| `gallery-1.webp` | https://www.pexels.com/photo/2261477/ |
| `gallery-2.webp` | https://www.pexels.com/photo/1552103/ |
| `gallery-3.webp` | https://www.pexels.com/photo/4164761/ |
| `gallery-4.webp` | https://www.pexels.com/photo/1547248/ |
| `gallery-5.webp` | https://www.pexels.com/photo/2247179/ |
| `cta.webp` | https://www.pexels.com/photo/841130/ |

## Napomena

Politika privatnosti je predložak, a ne pravni savjet. Prije objave za pravog klijenta popuni sve oznake `[PODACI KLIJENTA]` i daj tekst na provjeru.
