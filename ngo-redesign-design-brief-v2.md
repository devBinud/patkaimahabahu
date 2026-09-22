# NGO Website Redesign — Design & Engineering Brief (v2)
*React.js redesign — Assam flood relief & community rebuilding organization*
*Target environment: Claude Code (CLI/IDE agent)*

## 0. Instructions for the coding agent

Read this entire brief before editing any component. This is a **visual and front-end quality layer only**:

- Do NOT change existing content, copy, page structure, routing, or information architecture.
- Do NOT rename components, move sections, or rewrite JSX logic beyond what's needed to apply classes/styles.
- DO centralize every design decision below into design tokens (CSS custom properties or Tailwind theme config — detect which the project already uses and extend it, don't introduce a second system).
- DO apply performance, accessibility, and SEO practices from Sections 7–9 as you touch each component — these are part of "best to best," not optional extras.
- If a rule below conflicts with something already in the codebase (e.g. an existing font import), flag it and ask before replacing sitewide.

---

## 1. Design Direction

**Primary brand color is now River Blue** — trust, water, clarity, flowing forward. Forest green (from the logo's mountains) moves to a secondary/supporting role — grounding, growth, land. Coral remains a tightly-rationed accent for urgency (donate CTAs, appeal banners) — used in at most one or two spots per screen, never as a base color.

**Aesthetic target: sleek, not decorative.** Sleek means:
- Fewer visual elements, each doing more work.
- Thin borders (1px, low-contrast) instead of heavy shadows or boxed panels.
- Generous negative space rather than dividers/lines to separate content.
- Restrained gradients — a single soft blue gradient wash is fine on the hero; avoid gradients on buttons, cards, or text.
- Micro-interactions (subtle hover lifts, 150–200ms transitions) instead of decorative animation.
- One accent color used with intent, not color-per-section.

Reference quality bar: charity: water, UNHCR digital, Stripe's marketing site (for the "sleek SaaS-grade NGO" feel), Linear.app (for restraint and spacing discipline).

---

## 2. Color System

### 2.1 Brand core

| Token | Hex | Role |
|---|---|---|
| `--color-primary` | `#0268D7` | River Blue — primary buttons, active nav, links, key icons, brand accents |
| `--color-primary-600` | `#0260CA` | Hover/pressed state for primary |
| `--color-primary-700` | `#014A9C` | Deepest blue — dark-mode/dark-section text-on-light, header on scroll |
| `--color-primary-100` | `#E6F1FC` | Tint — subtle backgrounds, badges, selected states |
| `--color-primary-50` | `#F3F9FE` | Faintest tint — section backgrounds, hover backgrounds |

### 2.2 Secondary (from logo mountains — land/growth/rebuilding)

| Token | Hex | Role |
|---|---|---|
| `--color-secondary` | `#1F7A3D` | Used sparingly — "rebuilding progress" indicators, secondary icons, success states |
| `--color-secondary-600` | `#155C2C` | Hover state |

### 2.3 Urgency accent — ration this color

| Token | Hex | Role |
|---|---|---|
| `--color-accent` | `#E85D2B` | Donate button, urgent appeal banner, one key stat per page — **max 1–2 uses per screen** |
| `--color-accent-600` | `#C24A1F` | Hover state |

### 2.4 Neutrals — the sleek backbone

A sleek UI lives or dies on its neutrals. Use a cool-toned gray scale (slightly blue-tinted, not pure gray) so it harmonizes with the blue primary:

| Token | Hex | Role |
|---|---|---|
| `--color-ink-900` | `#0F1720` | Primary text / headings |
| `--color-ink-600` | `#48525C` | Body text |
| `--color-ink-400` | `#859099` | Muted text, placeholders, captions |
| `--color-border` | `#E4E8EC` | Hairline borders, 1px only |
| `--color-surface` | `#FFFFFF` | Cards, primary background |
| `--color-surface-alt` | `#F7F9FB` | Alternating sections |
| `--color-surface-dark` | `#0A1420` | Footer / dark hero overlay base |

### 2.5 Rule of application (60-30-10, adapted)

- **60%** neutral surfaces (white / `--color-surface-alt`)
- **30%** ink/text + River Blue used for structure (nav, links, icons, borders on focus)
- **10%** combined secondary green + accent coral for meaning-carrying moments (progress, urgency)

Accent coral is not a "brand color" for backgrounds, headers, or large fills — it is a **signal color** reserved for calls to action tied to giving/urgency.

### 2.6 Contrast

All text/background pairs must meet WCAG AA (4.5:1 body, 3:1 large text ≥24px/19px-bold). Verify `--color-primary` (#0268D7) on white passes for large text and UI components; for small body text on blue backgrounds, use white text only, never colored-on-colored.

---

## 3. Typography System

**Heading font:** `Sora` — geometric, modern, confident, pairs cleanly with a blue-led palette (reads "fintech-clean" rather than "generic charity template").
**Body font:** `Inter` — best-in-class legibility across sizes and devices.

```css
--font-heading: "Sora", "Segoe UI", system-ui, sans-serif;
--font-body: "Inter", "Segoe UI", system-ui, sans-serif;
```

### Type scale (1.25 ratio, 16px base)

| Token | Desktop | Mobile | Weight | Line-height |
|---|---|---|---|---|
| `--text-display` | 56px | 36px | 700 | 1.1 |
| `--text-h1` | 44px | 30px | 700 | 1.15 |
| `--text-h2` | 36px | 24px | 600 | 1.2 |
| `--text-h3` | 28px | 20px | 600 | 1.25 |
| `--text-h4` | 22px | 18px | 600 | 1.3 |
| `--text-body-lg` | 18px | 17px | 400 | 1.6 |
| `--text-body` | 16px | 16px | 400 | 1.65 |
| `--text-body-sm` | 14px | 14px | 400 | 1.5 |
| `--text-button` | 16px | 15px | 600 | 1 |

### Rules

- Only Sora (headings) + Inter (body) — no third font anywhere.
- Only 3 weights total: 400, 600, 700. Never 800/900 or 200/300.
- Headline should read 2–3× the body text size, per standard hierarchy convention — the scale above already enforces this.
- Paragraph max width: `65ch` — critical for readability, current biggest miss on most NGO sites.
- Heading letter-spacing: `-0.01em` to `-0.02em`. Body: `0`. All-caps labels (nav, eyebrow text): `+0.06em`.
- Never skip semantic heading levels for style — style via tokens/classes, keep `h1 → h2 → h3` order intact for SEO and screen readers.

---

## 4. Spacing, Grid & Layout

### 4.1 Spacing scale (8px base)

```
--space-1: 4px   --space-4: 16px   --space-7: 48px
--space-2: 8px   --space-5: 24px   --space-8: 64px
--space-3: 12px  --space-6: 32px   --space-9: 96px
```

### 4.2 Rhythm

- Section vertical padding: `96px` desktop / `48px` mobile.
- Container max-width: `1200px`; side padding `48px` desktop / `24px` mobile.
- Card padding: `24–32px`. Grid gutter: `24px`.
- 12-column grid desktop, 4-column mobile. Breakpoints: `<640 / 640–1024 / 1024–1440 / >1440`.

### 4.3 Layout patterns (from UX research)

- **F-pattern** for text-heavy pages (About, Programs) — key info top-left, scannable left-aligned structure.
- **Z-pattern** for landing/home sections — logo top-left → nav top-right → hero visual → CTA bottom-right.
- Never bury the primary value proposition below the fold — mission statement + primary CTA (Donate / Get Involved) must be visible on initial viewport load.
- Avoid infinite-scroll homepages that bury real content — keep the homepage to 5–7 purposeful sections max.

---

## 5. Components — sleek execution rules

- **Buttons:** 2 variants max — Primary (filled River Blue, white text) and Secondary (1.5px outline, transparent). Height `48px` desktop, `44px` mobile (meets the 48px touch-target minimum for accessibility). Radius `8px`. Hover: `translateY(-1px)` + 8% darken, `150ms ease`. Accent/Donate button is its own third variant, used only for giving-related CTAs.
- **Cards:** radius `12px`, 1px `--color-border` hairline instead of heavy shadow; only add `0 2px 12px rgba(15,23,32,0.05)` on hover for lift, not at rest — this is what makes a UI feel "sleek" vs. "boxy."
- **Icons:** one set only — `Lucide`, stroke width `1.75px`, sized consistently (20px inline, 24px standalone, 32px feature icons).
- **Images:** consistent aspect ratio per context (team photos `1:1`, story/impact photos `16:9`), radius `8–12px` matching cards. Serve as WebP/AVIF with JPEG fallback, lazy-load everything below the fold (see Section 7).
- **Navigation:** flat, familiar labels only (Home, About, Programs, Get Involved, Donate). No more than 6 top-level items; use a submenu only if the site truly has deep content. Sticky header, background transitions from transparent-on-hero to solid white + hairline border on scroll.
- **CTAs:** short, action-first copy ("Donate Now", "See Our Impact") — never vague ("Click Here", "Learn More" as the only CTA on a page). Primary CTA visually distinct via the Accent or Primary color depending on intent (giving vs. informational).
- **Popups/modals:** avoid entirely except exit-intent or post-engagement (e.g. after 60% scroll) — never on page load. Always keyboard-dismissible (`Esc`) with a visible close control.

---

## 6. Imagery & Emotional Tone

- Real photography from actual relief/rebuilding work only — no stock photos, no illustration for hero content.
- Hero: full-bleed photo with a blue-to-dark gradient overlay (`linear-gradient(180deg, rgba(2,26,58,0.15) 0%, rgba(2,26,58,0.6) 100%)`) so white text stays legible — keeps the blue brand thread running through imagery too, not just UI chrome.
- Favor images showing agency, community, and rebuilding-in-progress over "victim" framing — matches the energetic/hopeful brief.
- Pair impact stats with one line of human context ("500+ families supported"), numerals styled in `--text-display`/`--text-h1` weight using River Blue or the secondary green.

---

## 7. Performance (non-negotiable for "modern, international level")

- **Core Web Vitals targets:** LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Serve images as WebP/AVIF with proper `width`/`height` attributes (prevents layout shift) and `loading="lazy"` for anything below the fold.
- Compress and responsibly size all images before commit (target: hero images < 300KB, in-content images < 150KB).
- Minify CSS/JS in the production build (standard with Vite/CRA/Next — verify it's not disabled).
- Set far-future cache headers for static assets; use a CDN if the current host doesn't already serve one.
- Avoid loading unused font weights — only import the 3 weights specified in Section 3 (400/600/700) for each of the 2 families, not the full family.

---

## 8. Accessibility Baseline

- All interactive elements: visible focus ring — `2px solid var(--color-primary)`, `2px` offset.
- Full keyboard navigability — every link, button, and form control reachable and operable via `Tab`/`Enter`/`Space`, in logical order.
- ARIA labels on icon-only buttons and non-obvious controls.
- Alt text on every meaningful image — for relief-work photos, describe context, not just subject.
- Minimum tap target `48×48px` on mobile (per current mobile-UX standards).
- Never rely on color alone — a donation progress bar needs a numeric label; error states need an icon + text, not just red.

---

## 9. SEO & Technical Hygiene

- Correct heading hierarchy per page (`h1` once per page, then `h2`/`h3` nested logically) — do not skip levels for visual sizing (use the type tokens instead).
- Descriptive, keyword-relevant meta titles and descriptions per page.
- Clean, readable URLs (`/programs/flood-relief`, not `/page?id=42`).
- Alt text doubles as SEO signal — descriptive, not keyword-stuffed.
- Internal links between related pages (e.g. Programs → Donate, Impact → About).

---

## 10. Implementation — Tailwind token extension

```js
// tailwind.config.js — extend existing config, do not replace
theme: {
  extend: {
    colors: {
      primary: { DEFAULT: '#0268D7', 600: '#0260CA', 700: '#014A9C', 100: '#E6F1FC', 50: '#F3F9FE' },
      secondary: { DEFAULT: '#1F7A3D', 600: '#155C2C' },
      accent: { DEFAULT: '#E85D2B', 600: '#C24A1F' },
      ink: { 900: '#0F1720', 600: '#48525C', 400: '#859099' },
      border: '#E4E8EC',
      surface: { DEFAULT: '#FFFFFF', alt: '#F7F9FB', dark: '#0A1420' },
    },
    fontFamily: {
      heading: ['Sora', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
    },
    borderRadius: { card: '12px', btn: '8px' },
  },
},
```

If the project isn't on Tailwind, define the same tokens as CSS custom properties in one root stylesheet (`:root { --color-primary: #0268D7; ... }`) and reference them throughout — never hardcode hex values or px sizes directly in component files.

---

## 11. Execution Checklist (run through before calling it done)

- [ ] All hardcoded colors replaced with tokens — search codebase for stray hex values.
- [ ] Only Sora + Inter loaded, only weights 400/600/700.
- [ ] Every heading follows semantic order (no skipped levels).
- [ ] Every button uses one of the 3 defined variants — no one-off styles.
- [ ] Every image has `alt`, `width`/`height`, and `loading="lazy"` (except hero/above-fold).
- [ ] Mobile breakpoints tested at 375px, 768px, 1024px, 1440px.
- [ ] Keyboard-only pass: can reach and activate every interactive element.
- [ ] Lighthouse run: Performance, Accessibility, SEO all ≥ 90.
- [ ] No content, copy, or page structure changed from the original site.

---

*Paste this file directly into Claude Code alongside the existing component files and instruct it to apply the system incrementally, component by component, verifying against Section 11 before moving to the next.*
