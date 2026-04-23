# a.w interior design — Studio Website

Premium Hebrew-first RTL interior design studio for Adi Weinstein (a.w interior design). Built with Next.js 14 App Router, Tailwind CSS, Framer Motion — static SSG output, no backend at launch.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14.2 App Router, TypeScript strict |
| Styling | Tailwind CSS v3, custom design tokens |
| Animation | Framer Motion 11 |
| Forms | React Hook Form + Zod + @hookform/resolvers |
| UI primitives | Radix UI (Accordion) |
| Fonts | Self-hosted .woff2 (David Libre, Assistant, Cormorant Garamond, Inter) |
| Output | Static SSG (`output: 'export'` ready) |

## Local dev

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint         # ESLint
```

## Environment variables

Not required for local dev (form falls back to a 10% failure simulation). Required before the lead form goes live in production.

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from resend.com — sends notification email to awds.adiw@gmail.com on each lead |
| `GOOGLE_SHEETS_ID` | Spreadsheet ID of the leads sheet (source of truth) |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Full JSON of the Google service account with write access to the sheet |

## How to replace placeholder content

**Hero image** — Place `/public/hero.jpg`. Update `src` in `components/sections/Hero.tsx` with a `next/image` `<Image>` tag (add `priority`, `fill`, `objectFit="cover"`).

**Portrait** — Place `/public/brand/portrait-adi.jpg`. Update `components/sections/About.tsx` — replace the placeholder `<div>` with `<Image fill objectFit="cover" src="/brand/portrait-adi.jpg" alt={portraitAlt} />`.

**Project images** — Place `/public/projects/{project-id}.jpg` for each of the four projects (`apartment-tel-aviv`, `house-hasharon`, `apartment-herzliya`, `apartment-raanana`). Update `components/sections/SelectedProjects.tsx` and the Lightbox grid to use `<Image>` tags referencing `coverAlt` from the content.

**Services copy** — Edit `lib/content/home.ts` → `services.items`. Each item has `title`, `teaser`, `included`, `timeline`, `start`.

**Testimonials** — Edit `lib/content/home.ts` → `testimonials.items`. Array source order is render order — first item displays first.

## Wiring the lead form to production

Update `lib/leads.ts` → `submitLead()`:

1. **Google Sheets (source of truth)** — POST lead data via the service account. Sheet column order:
   `timestamp | name | phone | email | region | projectType | timeline | size | message | status`

2. **Resend (notification)** — After writing to Sheets, send a notification email to `awds.adiw@gmail.com` via the Resend API.

The form handles optimistic UI, loading state, success state, and a user-facing error message on failure (`form.errors.submitFailed`).

## Placeholder assets — required before launch

| Asset | Path | Status |
|---|---|---|
| Hero image | `/public/hero.jpg` | **Missing — mushroom placeholder shown** |
| Portrait | `/public/brand/portrait-adi.jpg` | **Missing — mushroom placeholder shown** |
| Project image — Tel Aviv | `/public/projects/apartment-tel-aviv.jpg` | **Missing — placeholder block** |
| Project image — Sharon | `/public/projects/house-hasharon.jpg` | **Missing — placeholder block** |
| Project image — Herzliya | `/public/projects/apartment-herzliya.jpg` | **Missing — placeholder block** |
| Project image — Ra'anana | `/public/projects/apartment-raanana.jpg` | **Missing — placeholder block** |
| OG image | `/public/og-image.jpg` | **Missing — dynamic fallback at `/opengraph-image` active** |

## Confirmed real contact info (no placeholders)

| Field | Value |
|---|---|
| Phone | 054-261-6415 |
| WhatsApp | wa.me/972542616415 |
| Email | awds.adiw@gmail.com |
| Instagram | [@a.w_interiordesign_](https://www.instagram.com/a.w_interiordesign_/) |

## Design tokens

| Token | Hex | Usage |
|---|---|---|
| `bone` | `#F4EFE8` | Page background |
| `sand` | `#EAE2D6` | Alternate section background |
| `mushroom` | `#D6CBBB` | Hero bg, image placeholders |
| `stone` | `#B8AE9F` | Hairlines, disabled |
| `taupe` | `#6E6358` | Secondary text |
| `espresso` | `#2B2420` | Primary text |
| `clay` | `#A67B5B` | Submit button |
| `walnut` | `#8B6B4A` | Hover, focus rings, accents |
| `bronze` | `#7D5E3C` | Reserved |

## RTL rules

- `<html dir="rtl" lang="he">` is server-rendered
- Always use logical CSS properties: `ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`, `text-end`
- Never use physical properties: `ml-`, `mr-`, `left-`, `right-`, `text-left`, `text-right`
- Phone numbers and years: wrap in `<span dir="ltr" className="tabular-nums">`

## Font stack

| Tailwind class | Font | Usage |
|---|---|---|
| `font-serif` | David Libre 400 | Hebrew headings and body |
| `font-sans` | Assistant 300/400 | Hebrew UI labels |
| `font-latin` | Cormorant Garamond 300/400 | Latin display (signature) |
| `font-latinSans` | Inter 300/400 | Latin UI (labels, handles) |
