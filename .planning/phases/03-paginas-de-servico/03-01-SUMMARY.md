---
phase: 03-paginas-de-servico
plan: "01"
subsystem: shared-components-seo-infrastructure
tags: [components, seo, schema, faq, og-image, tailwind]
dependency_graph:
  requires: []
  provides:
    - app/constants/faq.ts (FaqItem interface, FAQS data)
    - app/components/ServiceHeroSection.vue (shared hero for service pages)
    - app/components/FaqAccordion.vue (native details/summary accordion)
    - public/og-image.jpg (1200x630 brand yellow placeholder)
    - ElectronicsRepair JSON-LD in default.vue (global schema)
    - --color-border CSS token in main.css
  affects:
    - app/layouts/default.vue (ElectronicsRepair schema added)
    - app/pages/index.vue (og:image URL fixed to absolute)
tech_stack:
  added: []
  patterns:
    - Native details/summary accordion (zero JS, SSR-safe)
    - Presentational components receive all data as props
    - ElectronicsRepair schema injected once in default.vue via useHead
    - useAppConfig() as single source of truth for NAP data in schema
    - Absolute og:image URL for WhatsApp link preview compatibility
key_files:
  created:
    - app/constants/faq.ts
    - app/components/ServiceHeroSection.vue
    - app/components/FaqAccordion.vue
    - public/og-image.jpg
  modified:
    - app/layouts/default.vue
    - app/pages/index.vue
    - app/assets/css/main.css
decisions:
  - "ElectronicsRepair (not LocalBusiness) injected ONCE in default.vue — most specific schema.org type for phone repair shop per PITFALLS.md Pitfall 9"
  - "ServiceHeroSection uses CSS gradient only (no raster image) — real store photos pending client approval"
  - "og:image uses hardcoded absolute URL https://kapaki.com.br/og-image.jpg — same placeholder until real brand assets delivered"
  - "FaqAccordion uses native details/summary — zero JS, SSR-safe, accessible by default, Tailwind open: variant handles animation"
metrics:
  duration: "~15 minutes"
  completed: "2026-04-07T01:45:10Z"
  tasks: 2
  files_changed: 7
---

# Phase 03 Plan 01: Shared Components and SEO Infrastructure Summary

Shared service page components, FAQ data, and global SEO infrastructure built. ElectronicsRepair JSON-LD schema injected globally in default.vue using useAppConfig NAP data; og:image bug in index.vue fixed to absolute URL; FaqAccordion and ServiceHeroSection created as presentational components ready for Plan 02 service pages.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Create FAQ data, ServiceHeroSection, FaqAccordion, og-image, border token | 9d0adbc | faq.ts, ServiceHeroSection.vue, FaqAccordion.vue, og-image.jpg, main.css |
| 2 | Add ElectronicsRepair schema to default.vue and fix og:image URL | 547d126 | default.vue, index.vue |

## Decisions Made

1. **ElectronicsRepair not LocalBusiness** — `ElectronicsRepair` is the most specific schema.org type for a phone repair shop, maximizing eligibility for local rich results. Documented in PITFALLS.md Pitfall 9.

2. **ServiceHeroSection uses CSS gradient only** — No raster hero image because real store photos are pending (STATE.md blocker VIS-01). When images are added later, they must use `<NuxtImg loading="eager" fetchpriority="high">`.

3. **og:image hardcoded absolute URL** — Both default.vue schema and index.vue og:image use `https://kapaki.com.br/og-image.jpg`. Required for WhatsApp link previews — relative paths break the crawler.

4. **FaqAccordion uses native details/summary** — Zero JS overhead, SSR-rendered, accessible by default, Tailwind `group-open:` variant handles chevron rotation animation.

5. **Schema injected only in default.vue** — Not repeated in individual service pages. Global schema once + per-page FAQPage is Google's recommended pattern.

## Deviations from Plan

None — plan executed exactly as written.

## Verification Results

- Build: `npm run build` completed successfully with no errors
- ElectronicsRepair schema confirmed in compiled `.vercel/output` bundle
- All acceptance criteria met:
  - faq.ts exports FaqItem and FAQS with 3 assistencia items
  - ServiceHeroSection.vue has props (title, subtitle, whatsappUrl, ctaLabel), renders h1 and WA CTA, is presentational
  - FaqAccordion.vue uses native details/summary, receives faqs: FaqItem[] prop, imports ChevronDown
  - main.css contains --color-border: #2A2A2A inside @theme block
  - public/og-image.jpg exists as valid 1200x630 JPEG
  - default.vue contains ElectronicsRepair JSON-LD with openingHoursSpecification and sameAs
  - index.vue ogImage is https://kapaki.com.br/og-image.jpg (absolute)
  - Existing default.vue template (slot, AppFooter) preserved unchanged

## Known Stubs

- `public/og-image.jpg` — Solid yellow (#F5C400) placeholder, 1200x630px. Replace with real brand photography when client provides assets.
- `app.config.ts` placeholders (whatsapp, phone, address, instagram) flow into the ElectronicsRepair schema. NAP data is intentionally placeholder until client provides real data.

## Self-Check

- [x] app/constants/faq.ts exists
- [x] app/components/ServiceHeroSection.vue exists
- [x] app/components/FaqAccordion.vue exists
- [x] public/og-image.jpg exists
- [x] ElectronicsRepair in app/layouts/default.vue
- [x] Absolute ogImage in app/pages/index.vue
- [x] --color-border in app/assets/css/main.css
- [x] Commit 9d0adbc exists
- [x] Commit 547d126 exists

## Self-Check: PASSED
