---
phase: 02-homepage
plan: "01"
subsystem: components
tags: [vue, components, composable, constants, whatsapp-fab, hero, social-proof, benefits, cta]
dependency_graph:
  requires: []
  provides:
    - app/composables/useScrollThreshold.ts
    - app/constants/services.ts
    - app/constants/testimonials.ts
    - app/constants/benefits.ts
    - app/components/HeroSection.vue
    - app/components/CtaFinalSection.vue
    - app/components/BeneficiosSection.vue
    - app/components/ProvasSociaisSection.vue
    - app/components/WhatsAppFab.vue
  affects:
    - app/app.vue
tech_stack:
  added: []
  patterns:
    - Presentational components (props-only, no composable calls inside)
    - SSR-safe scroll composable using onMounted guard
    - Passive scroll listener with onUnmounted cleanup
    - v-show (not v-if) for FAB to prevent hydration mismatch
    - Dynamic Lucide icon rendering via component :is with icon map object
key_files:
  created:
    - app/composables/useScrollThreshold.ts
    - app/constants/services.ts
    - app/constants/testimonials.ts
    - app/constants/benefits.ts
    - app/components/HeroSection.vue
    - app/components/CtaFinalSection.vue
    - app/components/BeneficiosSection.vue
    - app/components/ProvasSociaisSection.vue
    - app/components/WhatsAppFab.vue
  modified:
    - app/app.vue
decisions:
  - "All 5 section components are strictly presentational — useWhatsApp and useAppConfig are only called at page level, sections receive whatsappUrl as prop"
  - "useScrollThreshold wraps window.addEventListener in onMounted to prevent SSR crash; uses passive:true for scroll performance"
  - "WhatsAppFab uses v-show not v-if in app.vue to avoid SSR hydration mismatch (server renders display:none, client toggles)"
  - "Dynamic icon rendering in BeneficiosSection uses { zap: Zap, tag: Tag, shield: Shield, mappin: MapPin } object with <component :is>"
metrics:
  duration: "1 minute"
  completed: "2026-04-06T12:42:05Z"
  tasks_completed: 3
  files_created: 9
  files_modified: 1
---

# Phase 02 Plan 01: Section Components and Data Files Summary

**One-liner:** 9-file atomic foundation — 4 typed constants/composable + 5 presentational Vue sections + globally mounted WhatsAppFab with SSR-safe 100px scroll detection.

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Constants data files and useScrollThreshold composable | 33f6191 | app/constants/services.ts, testimonials.ts, benefits.ts, app/composables/useScrollThreshold.ts |
| 2 | HeroSection, CtaFinalSection, BeneficiosSection, ProvasSociaisSection, WhatsAppFab | 1a56419 | 5 Vue SFC components |
| 3 | Update app.vue to mount WhatsAppFab globally | a418a54 | app/app.vue |

## Artifacts Created

### Constants

- **`app/constants/services.ts`** — `SERVICES` array with 3 service cards (acessorios, assistencia with `badge: 'Mais procurado'`, aparelhos). `ServiceItem` interface exported.
- **`app/constants/testimonials.ts`** — `TESTIMONIALS` array with 3 items: Ana Paula M., Carlos H., Fernanda L. All rating: 5. `Testimonial` interface exported.
- **`app/constants/benefits.ts`** — `BENEFITS` array with 4 items (icons: zap, tag, shield, mappin). `Benefit` interface exported.

### Composable

- **`app/composables/useScrollThreshold.ts`** — Returns `{ isVisible: Ref<boolean> }`. SSR-safe: `window.addEventListener` inside `onMounted`. Uses `{ passive: true }` for scroll performance. `onUnmounted` cleanup prevents memory leaks.

### Components

- **`app/components/HeroSection.vue`** — H1 "Seu celular merece o melhor. Voce tambem.", subtitle, WhatsApp CTA (bg-primary), "Ver servicos" anchor link (#servicos). Props: `whatsappUrl`. MessageCircle icon.
- **`app/components/ProvasSociaisSection.vue`** — "+500 clientes atendidos em Tatui" CheckCircle seal, 3 testimonial cards with Lucide Star icons (fill-primary), aria-label on star container. Props: `testimonials: Testimonial[]`.
- **`app/components/BeneficiosSection.vue`** — "Por que escolher a Kapaki?", 4 benefit cards in `grid-cols-2 lg:grid-cols-4`. Dynamic icon via `<component :is="iconMap[benefit.icon]">`. Props: `benefits: Benefit[]`.
- **`app/components/CtaFinalSection.vue`** — bg-primary (yellow) section, "Precisa de ajuda agora?", inverted button (bg-background text-text), "Respondemos em instantes" small text. Props: `whatsappUrl`.
- **`app/components/WhatsAppFab.vue`** — Fixed bottom-right (bottom-6 right-6 z-50), bg-whatsapp circle, aria-label for accessibility, MessageCircle icon. Props: `whatsappUrl`.

### Updated

- **`app/app.vue`** — Calls `useWhatsApp('geral')` and `useScrollThreshold(100)`. WhatsAppFab mounted outside NuxtLayout with `v-show="isVisible"` (persists across all page navigations).

## Decisions Made

1. **Props-only components** — All 5 sections are strictly presentational. Composable calls (`useWhatsApp`, `useAppConfig`) only happen at page level. This keeps components testable, reusable, and follows the architecture decision from Phase 1.

2. **SSR-safe scroll composable** — `window` access is gated behind `onMounted`. This prevents Nuxt SSR crash when building. Passive listener improves scroll performance on mobile.

3. **v-show vs v-if for FAB** — `v-show` renders the element server-side with `display:none`. `v-if` would cause hydration mismatch because server omits the element entirely. This is the correct pattern for conditionally visible elements that depend on client-side state.

4. **Dynamic icon map in BeneficiosSection** — Using a plain object `{ zap: Zap, ... }` with `<component :is>` is more efficient than a switch statement and keeps Lucide icons tree-shakable.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all components receive real data from props. No hardcoded empty values or placeholders in rendering paths.

## Self-Check: PASSED

Files exist:
- FOUND: app/composables/useScrollThreshold.ts
- FOUND: app/constants/services.ts
- FOUND: app/constants/testimonials.ts
- FOUND: app/constants/benefits.ts
- FOUND: app/components/HeroSection.vue
- FOUND: app/components/CtaFinalSection.vue
- FOUND: app/components/BeneficiosSection.vue
- FOUND: app/components/ProvasSociaisSection.vue
- FOUND: app/components/WhatsAppFab.vue
- FOUND: app/app.vue (modified)

Commits exist:
- FOUND: 33f6191 (Task 1)
- FOUND: 1a56419 (Task 2)
- FOUND: a418a54 (Task 3)
