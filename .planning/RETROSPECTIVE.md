# Retrospective

Living retrospective — updated per milestone.

## Milestone: v1.0 — MVP Kapaki Tatui

**Shipped:** 2026-04-07
**Phases:** 4 | **Plans:** 9 | **Tasks:** ~20

### What Was Built
- Nuxt 3 project with SSR, Tailwind v4, self-hosted fonts
- Homepage with 5 sections + WhatsApp FAB + Footer
- 3 service pages with local SEO (ElectronicsRepair + FAQPage schemas)
- GA4 with custom events tracking all 8 interactive elements
- ~900 LOC TypeScript/Vue

### What Worked
- PRD-first approach: kapaki.md had all copy, colors, layouts pre-defined — zero ambiguity
- Coarse granularity (4 phases) kept overhead low while maintaining structure
- Parallel execution in Wave 1 of Phase 2 saved time (02-01 + 02-02 simultaneously)
- Research agents caught critical issues early (Tailwind v4 via @tailwindcss/vite, not @nuxtjs/tailwindcss)

### What Was Inefficient
- Nuxt 4 directory convention (app/ folder) required auto-fix in Phase 1 — could have been caught in research
- og:image relative URL bug in index.vue had to be fixed in Phase 3 — should have been caught in Phase 2
- Lighthouse audit blocked by WSL2 (no Chrome) — had to defer to manual post-deploy

### Patterns Established
- Presentational components (props only, no composable calls inside)
- Page-level composable calls (useWhatsApp, useServerSeoMeta)
- app.config.ts as single source of truth for business data
- useHead for JSON-LD schema injection

### Key Lessons
- For local business sites, ElectronicsRepair schema is better than generic LocalBusiness
- useServerSeoMeta > useSeoMeta for static meta (reduces client JS)
- Tailwind v4 uses @theme {} in CSS, not tailwind.config.js
- WhatsApp links need encodeURIComponent for special characters

## Cross-Milestone Trends

| Metric | v1.0 |
|--------|------|
| Phases | 4 |
| Plans | 9 |
| Rework cycles | 1 (og:image fix) |
| Research accuracy | High |
