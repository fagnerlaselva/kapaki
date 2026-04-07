---
phase: 04-analytics-e-lancamento
plan: 01
subsystem: analytics
tags: [nuxt-gtag, google-analytics-4, ga4, event-tracking, gtag]

# Dependency graph
requires:
  - phase: 02-homepage
    provides: HeroSection, ServiceCard, CtaFinalSection, WhatsAppFab, AppFooter components
  - phase: 03-paginas-de-servico
    provides: ServiceHeroSection component and service pages

provides:
  - nuxt-gtag module configured with NUXT_PUBLIC_GA_ID env var
  - GA4 pageview tracking via gtag.js (client-side only, SSR-safe)
  - 8 distinct custom event tracking interactions across 6 components
  - whatsapp_click event: hero_cta, cta_final, fab, service_hero, footer labels
  - ver_servicos_click event: hero_anchor label
  - service_cta_click event: card title as dynamic event_label
  - instagram_click event: footer label

affects: [04-02-deploy, future analytics dashboards]

# Tech tracking
tech-stack:
  added: [nuxt-gtag@latest]
  patterns:
    - "useGtag() composable auto-imported by nuxt-gtag — no explicit import needed in components"
    - "All components use const props = defineProps<{...}>() pattern to access prop values in tracking functions"
    - "gtag('event', name, params) called in @click handlers without @click.prevent — navigation preserved"
    - "NUXT_PUBLIC_GA_ID env var pattern for GA4 Measurement ID injection"

key-files:
  created:
    - .env.example
  modified:
    - nuxt.config.ts
    - app/components/HeroSection.vue
    - app/components/ServiceCard.vue
    - app/components/CtaFinalSection.vue
    - app/components/WhatsAppFab.vue
    - app/components/ServiceHeroSection.vue
    - app/components/AppFooter.vue

key-decisions:
  - "nuxt-gtag auto init mode used (not manual) — project does not require LGPD cookie consent banner per PRD scope"
  - "No separate .client.ts plugin created — nuxt-gtag handles client-only loading internally"
  - "useGtag() composable is auto-imported by nuxt-gtag — components do not need explicit import statements"
  - "props pattern (const props = defineProps) used in all components so tracking functions can access prop values"

patterns-established:
  - "GA4 tracking pattern: destructure gtag from useGtag(), define named tracking function, bind with @click on <a>"
  - "event_label naming: component location identifier (hero_cta, cta_final, fab, service_hero, footer, hero_anchor)"
  - "Dynamic event_label: ServiceCard uses props.title for per-card distinguishability in GA4 reports"

requirements-completed: [ANAL-01, ANAL-02]

# Metrics
duration: 4min
completed: 2026-04-06
---

# Phase 04 Plan 01: GA4 Analytics Integration Summary

**nuxt-gtag module wired with NUXT_PUBLIC_GA_ID env var and 8 custom events across 6 components tracking all WhatsApp CTAs, Ver Servicos, and Instagram footer link**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-06T05:54:22Z
- **Completed:** 2026-04-06T05:58:32Z
- **Tasks:** 2
- **Files modified:** 7 (+ 1 created)

## Accomplishments

- nuxt-gtag installed and configured with `NUXT_PUBLIC_GA_ID` fallback to placeholder `G-XXXXXXXXXX`
- All 6 interactive components now fire GA4 custom events on click using the `useGtag()` auto-imported composable
- 4 distinct event names cover all conversion touchpoints: `whatsapp_click`, `ver_servicos_click`, `service_cta_click`, `instagram_click`
- Build passes with zero errors; no SSR-breaking code — nuxt-gtag handles client-only loading internally

## Task Commits

Each task was committed atomically:

1. **Task 1: Install nuxt-gtag and configure with env var** - `81ce861` (feat)
2. **Task 2: Add GA4 custom event tracking to ALL interactive buttons** - `015d37f` (feat)

## Files Created/Modified

- `nuxt.config.ts` - Added nuxt-gtag to modules array and gtag config block with NUXT_PUBLIC_GA_ID
- `.env.example` - Created to document NUXT_PUBLIC_GA_ID env var requirement
- `app/components/HeroSection.vue` - whatsapp_click (hero_cta) + ver_servicos_click (hero_anchor)
- `app/components/ServiceCard.vue` - service_cta_click with props.title as dynamic event_label
- `app/components/CtaFinalSection.vue` - whatsapp_click (cta_final)
- `app/components/WhatsAppFab.vue` - whatsapp_click (fab)
- `app/components/ServiceHeroSection.vue` - whatsapp_click (service_hero)
- `app/components/AppFooter.vue` - whatsapp_click (footer) + instagram_click (footer)

## Decisions Made

- Used `auto` initMode (default) — no LGPD cookie consent banner required per PRD scope
- No separate `.client.ts` plugin — nuxt-gtag handles SSR safety internally, client-only load guaranteed
- `useGtag()` is auto-imported by nuxt-gtag — no explicit import statements needed in components
- Changed all `defineProps<{...}>()` calls to `const props = defineProps<{...}>()` so tracking functions can reference prop values directly

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. Build passed on first attempt after all 6 components were updated.

## User Setup Required

**GA4 Measurement ID must be configured before analytics data appears.**

To activate tracking:

1. Create a GA4 property at https://analytics.google.com → Admin → Create Property
2. Set up a Web Data Stream for kapaki.com.br
3. Copy the Measurement ID (format: `G-XXXXXXXXXX`)
4. Add to Vercel environment variables: `NUXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
5. Redeploy — pageviews and custom events will appear in GA4 Real-Time reports within minutes

## Known Stubs

- `gtag.id` defaults to `G-XXXXXXXXXX` placeholder — harmless in production since the real ID will be set via env var; events fire to the real GA4 property once `NUXT_PUBLIC_GA_ID` is configured

## Next Phase Readiness

- GA4 integration complete — all conversion events instrumented
- Phase 04-02 (deploy to Vercel) is unblocked
- Real GA4 Measurement ID from client is the only remaining dependency for live analytics

---
*Phase: 04-analytics-e-lancamento*
*Completed: 2026-04-06*
