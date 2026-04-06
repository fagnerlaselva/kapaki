---
phase: 02-homepage
plan: 02
subsystem: components
tags: [vue, components, footer, services, whatsapp, layout]
dependency_graph:
  requires: [app/composables/useWhatsApp.ts, app.config.ts, app/assets/css/main.css]
  provides: [app/components/ServiceCard.vue, app/components/ServicosSection.vue, app/components/AppFooter.vue, app/layouts/default.vue]
  affects: [app/pages/index.vue]
tech_stack:
  added: []
  patterns: [presentational-components, prop-drilling, layout-orchestration]
key_files:
  created:
    - app/components/ServiceCard.vue
    - app/components/ServicosSection.vue
    - app/components/AppFooter.vue
  modified:
    - app/layouts/default.vue
decisions:
  - "ServiceCard is purely presentational — no composable calls inside, whatsappUrl comes from parent"
  - "ServicosSection maps 3 distinct WA URLs per service key to satisfy WA-02 requirement"
  - "AppFooter receives all data as props; default.vue is the orchestrator calling useAppConfig and useWhatsApp"
  - "Footer background uses bg-[#0A0A0A] arbitrary value (darker than bg-surface #1C1C1C) per kapaki.md spec"
metrics:
  duration: "2 minutes"
  completed_date: "2026-04-06"
  tasks_completed: 2
  files_changed: 4
---

# Phase 02 Plan 02: ServicosSection, ServiceCard, and AppFooter Summary

**One-liner:** Presentational ServiceCard/ServicosSection with 3 distinct WhatsApp URLs per service, plus AppFooter with 3-column layout mounted globally via default.vue using useAppConfig.

## Objective

Create the composite section components (ServicosSection + ServiceCard sub-component) and AppFooter, then integrate the footer globally into the default layout.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create ServiceCard and ServicosSection components | da61660 | app/components/ServiceCard.vue, app/components/ServicosSection.vue |
| 2 | Create AppFooter component and update default.vue | 431185a | app/components/AppFooter.vue, app/layouts/default.vue |

## What Was Built

### ServiceCard.vue
- Presentational card component with props: `title`, `description`, `ctaLabel`, `whatsappUrl`, `badge?`, `featured?`
- Conditional yellow border (`border-2 border-primary`) when `featured` is true
- Badge rendered with `v-if="badge"`, positioned absolute above the card top edge with `bg-primary text-background` pill styling
- CTA link uses `target="_blank" rel="noopener noreferrer"` for security

### ServicosSection.vue
- Root `<section id="servicos">` provides anchor target for HeroSection's "Ver servicos" button
- Title: "O que voce precisa hoje?" — Subtitle: "Escolha seu caminho — a Kapaki resolve."
- Accepts 3 separate WA URL props (`waAssistencia`, `waAcessorios`, `waAparelhos`) to satisfy WA-02 (distinct pre-filled messages per service)
- Maps correct URL to each ServiceCard via ternary on `service.key`
- Responsive grid: `grid-cols-1 md:grid-cols-3`

### AppFooter.vue
- 3-column presentational footer: Sobre / Contato / Horarios
- Background: `bg-[#0A0A0A]` (darker than surface, per kapaki.md section 8.6)
- Column 2 uses `MapPin`, `MessageCircle`, `Instagram` icons from lucide-vue-next
- Instagram link constructed dynamically: strips `@` from handle, builds full Instagram URL
- Copyright bar with `border-t border-white/10` separator

### default.vue (updated)
- Mounts AppFooter after `<slot />` — footer now appears on every page
- Calls `useAppConfig()` to get business data and `useWhatsApp('geral')` for footer WA link
- Passes all footer data as props (layout is the sole orchestrator)

## Verification

- `npx nuxt build` completed successfully — "Build complete!"
- All acceptance criteria verified via grep checks
- `id="servicos"` anchor present for HeroSection link
- `Mais procurado` badge mechanism present via `badge` prop on ServiceCard
- `bg-[#0A0A0A]` footer bg confirmed (not bg-surface or bg-background)
- AppFooter mounted in default.vue — visible on all pages

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

- `app.config.ts` has placeholder WhatsApp number `5515XXXXXXXXX` — this flows to footer WhatsApp link and all service WA URLs. Intentional placeholder pending real client data (tracked in STATE.md blockers).
- `app.config.ts` has placeholder phone `(15) XXXX-XXXX` — displayed in footer Contato column.
- `app.config.ts` instagram `@kapaki_tatui` — to be confirmed with client. The footer renders this handle and constructs the Instagram URL from it.

These stubs are intentional and pre-existing from Phase 1. They do not block Plan 02's goal (components render correctly with placeholder data). Real values to be filled before launch.

## Self-Check: PASSED

- app/components/ServiceCard.vue: FOUND
- app/components/ServicosSection.vue: FOUND
- app/components/AppFooter.vue: FOUND
- app/layouts/default.vue: FOUND (modified)
- Commit da61660: FOUND
- Commit 431185a: FOUND
