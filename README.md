# a.w interior design — Studio Website

Premium Hebrew-first interior design studio. Built with Next.js 14 App Router, Tailwind CSS, RTL.

## Setup

```bash
cd studio-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Folder structure

```
studio-website/
├── app/
│   ├── (marketing)/
│   │   └── page.tsx          # Homepage — Wave 1: wordmark only
│   ├── globals.css            # Tailwind base + antialiasing
│   └── layout.tsx             # Root layout: RTL, dir="rtl" lang="he", fonts, metadata
├── components/
│   └── brand/
│       └── Wordmark.tsx       # Studio wordmark — typography, not image
├── lib/
│   ├── content/
│   │   └── home.ts            # Typed content interfaces + empty placeholders
│   └── fonts.ts               # next/font/local declarations → CSS variables
├── locales/
│   ├── he.json                # Hebrew i18n strings (Wave 2+)
│   └── en.json                # English i18n strings (Wave 2+)
├── public/
│   └── fonts/                 # Self-hosted .woff2 files
│       ├── david-libre-400.woff2
│       ├── assistant-300.woff2
│       ├── assistant-400.woff2
│       ├── cormorant-garamond-300.woff2
│       ├── cormorant-garamond-400.woff2
│       ├── inter-300.woff2
│       └── inter-400.woff2
├── next.config.mjs
├── tailwind.config.ts         # All design tokens (colors, type scale, spacing)
└── tsconfig.json              # strict: true
```

## Design tokens

Defined in `tailwind.config.ts`. Never use raw hex in components — always use token names.

| Token | Value |
|-------|-------|
| `bone` | `#F4EFE8` — page background |
| `sand` | `#EAE2D6` |
| `mushroom` | `#D6CBBB` |
| `stone` | `#B8AE9F` |
| `taupe` | `#6E6358` |
| `espresso` | `#2B2420` — primary text |
| `clay` | `#A67B5B` |
| `walnut` | `#8B6B4A` |
| `bronze` | `#7D5E3C` |

## Font stack

| CSS variable | Font | Weights | Preload |
|---|---|---|---|
| `--font-serif-he` | David Libre | 400 | yes |
| `--font-sans-he` | Assistant | 300, 400 | yes |
| `--font-latin-serif` | Cormorant Garamond | 300, 400 | no |
| `--font-latin-sans` | Inter | 300, 400 | no |

## RTL

- `<html dir="rtl" lang="he">` is hard-coded for Wave 1.
- Always use logical CSS properties: `ms-`, `me-`, `ps-`, `pe-`, `text-start`, `text-end`. Never `ml-`, `mr-`, `text-left`, `text-right`.

## Planned waves

| Wave | Scope |
|------|-------|
| 1 | Scaffold, tokens, fonts, RTL, wordmark |
| 2 | Hero section |
| 3 | Positioning strip |
| 4 | About section |
| 5 | Services section |
| 6 | Projects gallery |
| 7 | Process section |
| 8 | Testimonials |
| 9 | Final CTA + footer |
| 10 | Nav, Framer Motion animations, final polish |
