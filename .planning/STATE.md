---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: unknown
stopped_at: Completed 04-analytics-e-lancamento-02-PLAN.md
last_updated: "2026-04-07T13:13:22.926Z"
progress:
  total_phases: 4
  completed_phases: 4
  total_plans: 9
  completed_plans: 9
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-06)

**Core value:** Gerar leads via WhatsApp — cada pagina e CTA deve maximizar contatos iniciados no WhatsApp da loja.
**Current focus:** Phase 04 — analytics-e-lancamento

## Current Position

Phase: 04
Plan: Not started

## Performance Metrics

**Velocity:**

- Total plans completed: 0
- Average duration: —
- Total execution time: 0 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| - | - | - | - |

**Recent Trend:**

- Last 5 plans: —
- Trend: —

*Updated after each plan completion*
| Phase 01-fundacao P01 | 5 | 3 tasks | 6 files |
| Phase 01-fundacao P02 | 8 | 3 tasks | 7 files |
| Phase 02-homepage P02 | 2 | 2 tasks | 4 files |
| Phase 02-homepage P01 | 1 | 3 tasks | 10 files |
| Phase 02-homepage P03 | 8 | 2 tasks | 2 files |
| Phase 03-paginas-de-servico P01 | 15 | 2 tasks | 7 files |
| Phase 03-paginas-de-servico P02 | 3 | 2 tasks | 3 files |
| Phase 04-analytics-e-lancamento P01 | 4 | 2 tasks | 8 files |
| Phase 04-analytics-e-lancamento P02 | 8 | 2 tasks | 1 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Setup: Tailwind v4 via `@tailwindcss/vite` (nao `@nuxtjs/tailwindcss` — conflitos conhecidos com v4)
- Setup: `@nuxtjs/seo` v5 instala 6 modulos SEO de uma vez com versoes compativeis
- Setup: `@nuxt/fonts` preferido sobre `@nuxtjs/google-fonts` (inclui font-metric fallbacks para CLS)
- Setup: Preset nitro deve ser `vercel`, nunca `vercel-static` — SSR exigido para SEO local
- [Phase 01-fundacao]: Tailwind v4 via @tailwindcss/vite (not @nuxtjs/tailwindcss) — PostCSS conflicts with v4 confirmed
- [Phase 01-fundacao]: No tailwind.config.js — Tailwind v4 CSS-first @theme directive in main.css
- [Phase 01-fundacao]: nitro.preset: 'vercel' mandatory for SSR — 'vercel-static' breaks schema JSON-LD and server-side meta tags
- [Phase 01-fundacao]: Nuxt 4 uses app/ directory convention — ~/assets resolves to app/assets not project root
- [Phase 01-fundacao]: ogImage.zeroRuntime: true prevents nuxt-og-image TTY crash in CI/non-terminal environments
- [Phase 01-fundacao]: useWhatsApp composable called in pages only — section components receive whatsappUrl as prop
- [Phase 02-homepage]: ServiceCard/ServicosSection are presentational — whatsappUrl comes as prop, 3 distinct URLs per service key (WA-02)
- [Phase 02-homepage]: AppFooter receives all data as props; default.vue orchestrates useAppConfig and useWhatsApp('geral')
- [Phase 02-homepage]: Footer background: bg-[#0A0A0A] arbitrary Tailwind value (darker than bg-surface #1C1C1C) per kapaki.md spec
- [Phase 02-homepage]: All section components are strictly presentational — useWhatsApp and useAppConfig called at page level only, sections receive whatsappUrl as prop
- [Phase 02-homepage]: v-show (not v-if) on WhatsAppFab in app.vue prevents SSR hydration mismatch — server renders display:none, client toggles
- [Phase 02-homepage]: useServerSeoMeta (not useSeoMeta) ensures SEO meta runs server-side only, reducing client JS bundle
- [Phase 02-homepage]: Page assembles all useWhatsApp URLs and passes to presentational section components as props — no composable calls inside components
- [Phase 03-paginas-de-servico]: ElectronicsRepair (not LocalBusiness) injected once in default.vue — most specific schema.org type for phone repair shop
- [Phase 03-paginas-de-servico]: FaqAccordion uses native details/summary — zero JS, SSR-safe, accessible by default
- [Phase 03-paginas-de-servico]: og:image uses hardcoded absolute URL https://kapaki.com.br/og-image.jpg for WhatsApp preview compatibility
- [Phase 03-paginas-de-servico]: FAQPage JSON-LD schema only on /assistencia-tecnica — the only page with FAQ content per kapaki.md
- [Phase 03-paginas-de-servico]: Service page pattern: useWhatsApp(serviceKey) at page level, props passed to presentational components (ServiceHeroSection, CtaFinalSection)
- [Phase 04-analytics-e-lancamento]: nuxt-gtag auto init mode used (not manual) — project does not require LGPD cookie consent banner per PRD scope
- [Phase 04-analytics-e-lancamento]: useGtag() composable auto-imported by nuxt-gtag — no explicit import needed; props pattern used so tracking functions access prop values
- [Phase 04-analytics-e-lancamento]: gtag loadingStrategy set to 'async' (non-blocking GA script load, faster than defer default)
- [Phase 04-analytics-e-lancamento]: html lang='pt-BR' added explicitly via app.head.htmlAttrs in nuxt.config.ts to guarantee Lighthouse SEO = 100

### Pending Todos

None yet.

### Blockers/Concerns

- Numero WhatsApp e dados NAP reais pendentes com o cliente (usar placeholders ate receber)
- GA4 Measurement ID pendente (bloqueia Phase 4)
- Dominio de producao pendente (URL absoluta necessaria desde Phase 1 para canonical e og:image)
- Coordenadas geograficas da loja pendentes para schema ElectronicsRepair

## Session Continuity

Last session: 2026-04-07T12:50:27.895Z
Stopped at: Completed 04-analytics-e-lancamento-02-PLAN.md
Resume file: None
