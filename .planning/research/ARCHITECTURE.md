# Architecture Patterns

**Project:** Kapaki Tatui — Site institucional com conversao WhatsApp
**Domain:** Local business institutional site (mobile-first, SSR, SEO local)
**Researched:** 2026-04-06
**Overall confidence:** HIGH (Nuxt 3 is stable and well-documented; patterns verified via official docs and community)

---

## Recommended Architecture

A flat, page-driven architecture with shared layout and section-level components. No state management library needed — all state is either static (site data) or local (scroll position, UI toggles). Data flows top-down from page to section components via props. Composables handle cross-cutting concerns (SEO, scroll tracking, WhatsApp URL generation).

```
nuxt.config.ts          ← SSR preset, Google Fonts, app head defaults
app.config.ts           ← Public site data (name, phone, address, hours, WhatsApp number)
app.vue                 ← Root: NuxtLayout + NuxtPage + WhatsAppFab (global)
layouts/
  default.vue           ← AppHeader (if needed) + slot + AppFooter
pages/
  index.vue             ← Landing: composable SEO + section components
  assistencia-tecnica.vue
  acessorios.vue
  aparelhos.vue
components/
  HeroSection.vue
  ServicosSection.vue
  ProvasSociaisSection.vue
  BeneficiosSection.vue
  CtaFinalSection.vue
  AppFooter.vue
  WhatsAppFab.vue
  ServiceCard.vue       ← Used inside ServicosSection
  FaqAccordion.vue      ← Used on service pages
composables/
  useWhatsApp.ts        ← Builds wa.me links with pre-filled messages per service
  usePageSeo.ts         ← Wraps useServerSeoMeta + useHead (canonical, JSON-LD)
  useScrollThreshold.ts ← SSR-safe scroll position tracker for WhatsAppFab visibility
```

---

## Component Boundaries

### Layout Layer

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `app.vue` | Root shell: mounts layout + page + global FAB | `WhatsAppFab` (always mounted), `NuxtLayout` |
| `layouts/default.vue` | Wraps every page with consistent shell (footer) | `AppFooter`, page slot |
| `AppFooter.vue` | Address, hours, social links, copyright | Reads from `app.config.ts` via `useAppConfig()` |

### Page Layer

| Page | Sections Used | SEO Strategy |
|------|--------------|--------------|
| `pages/index.vue` | Hero, Servicos, ProvasSociais, Beneficios, CtaFinal | `usePageSeo` with LocalBusiness JSON-LD |
| `pages/assistencia-tecnica.vue` | Hero (variant), Beneficios, Faq, CtaFinal | `usePageSeo` with FAQ JSON-LD + service schema |
| `pages/acessorios.vue` | Hero (variant), Beneficios, CtaFinal | `usePageSeo` with service schema |
| `pages/aparelhos.vue` | Hero (variant), Beneficios, CtaFinal | `usePageSeo` with service schema |

Pages own their SEO. Each page calls `usePageSeo()` and `useWhatsApp()` independently — no shared page state.

### Section Components

| Component | Responsibility | Receives (Props) | Emits |
|-----------|---------------|------------------|-------|
| `HeroSection.vue` | H1 headline, subheadline, primary CTA button | `title`, `subtitle`, `ctaLabel`, `whatsappUrl` | — |
| `ServicosSection.vue` | 3 service cards (assistencia has "Mais procurado" badge) | `services[]` array | — |
| `ServiceCard.vue` | Individual service: icon, name, description, CTA | `service` object, `whatsappUrl` | — |
| `ProvasSociaisSection.vue` | Testimonials / social proof items | `proofs[]` array | — |
| `BeneficiosSection.vue` | Why choose us list | `benefits[]` array | — |
| `CtaFinalSection.vue` | Final conversion block with WhatsApp CTA | `whatsappUrl`, `message` | — |
| `FaqAccordion.vue` | Expandable FAQ items (service pages only) | `faqs[]` array | — |
| `WhatsAppFab.vue` | Fixed floating button, appears after scroll threshold | `whatsappUrl` | — |

Section components are **dumb presentational components** — they receive all data as props and render. No API calls, no composable calls inside them. The parent page is responsible for assembling data and passing it down.

---

## Data Flow

```
app.config.ts
  └─ useAppConfig()
       ├─ AppFooter (address, hours, phone)
       └─ pages/* (phone number for WhatsApp URL assembly)

pages/index.vue
  ├─ usePageSeo({ title, description, schema }) → injects <head> server-side
  ├─ useWhatsApp(service?) → whatsappUrl string
  └─ props down to →
       HeroSection (whatsappUrl, title, subtitle)
       ServicosSection (services[], whatsappUrls{})
       ProvasSociaisSection (proofs[])
       BeneficiosSection (benefits[])
       CtaFinalSection (whatsappUrl)

app.vue
  ├─ useScrollThreshold(200) → isVisible: Ref<boolean>
  └─ WhatsAppFab (whatsappUrl, v-show="isVisible")
```

**Key rule:** Data flows downward only. No child-to-parent event bus. No Pinia. No global reactive store. `app.config.ts` is the single source of truth for site-wide constants (phone, address, business name).

---

## Composable Contracts

### `useWhatsApp(service?: string): { whatsappUrl: string }`

Builds `https://wa.me/55XXXXXXXXXXX?text=...` URLs. `service` parameter selects a pre-written message template (e.g., `'assistencia'`, `'acessorios'`, `'aparelhos'`, or `undefined` for generic). Phone number comes from `useAppConfig().whatsapp`. Returns a plain string (not reactive — computed once per call).

### `usePageSeo(options: PageSeoOptions): void`

Calls `useServerSeoMeta()` (SSR-only, no client JS overhead) for title, description, og:*, and `useHead()` for canonical link and JSON-LD `<script type="application/ld+json">`. The `PageSeoOptions` type includes `title`, `description`, `canonicalPath`, and `schema` (raw JSON-LD object). Each page passes its own unique schema — index gets `LocalBusiness`, service pages get `Service` + optionally `FAQPage`.

### `useScrollThreshold(px: number): { isVisible: Ref<boolean> }`

SSR-safe wrapper around a `window.addEventListener('scroll', ...)` — the listener is only attached `onMounted` (client-side only). Returns a reactive `isVisible` ref. Used exclusively by `WhatsAppFab` in `app.vue`. This avoids the Nuxt 3 SSR/window conflict documented in community reports.

---

## Patterns to Follow

### Pattern 1: `useServerSeoMeta` over `useSeoMeta` for static content

**What:** Use `useServerSeoMeta()` instead of `useSeoMeta()` for all meta tags that don't change after page load.

**Why:** SEO meta for this site is fully static (no user-dependent content). `useServerSeoMeta` runs only on the server, reducing client JS bundle. Confirmed pattern in Nuxt official docs and community.

**When:** All pages in this project — all meta is known at render time.

```typescript
// pages/assistencia-tecnica.vue
useServerSeoMeta({
  title: 'Assistencia Tecnica para Celular em Tatui | Kapaki',
  description: 'Troca de tela, bateria e mais...',
  ogTitle: 'Assistencia Tecnica — Kapaki Tatui',
  ogDescription: '...',
})
```

### Pattern 2: JSON-LD injected via `useHead` script tag

**What:** Inject LocalBusiness and FAQPage JSON-LD as a raw script tag via `useHead()`.

**Why:** Nuxt Schema.org module (nuxt-schema-org) is the cleanest approach but adds a dependency. For this project's scope (4 pages, static data), injecting raw JSON-LD via `useHead` is simpler and has zero extra bundle cost. The schema renders server-side in the SSR response — search engines read it without JS execution.

```typescript
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Kapaki Tatui',
      // ...
    })
  }]
})
```

### Pattern 3: `app.config.ts` for site constants

**What:** Store phone number, WhatsApp number, address, business name, hours, and Instagram handle in `app.config.ts` — not scattered across components or hardcoded in copy.

**Why:** These values appear in multiple places (Footer, FAB WhatsApp URL, JSON-LD schema, CTA sections). Centralizing in `app.config.ts` makes future updates (e.g., phone number change) a single-file edit. Values are type-inferred automatically by Nuxt.

```typescript
// app.config.ts
export default defineAppConfig({
  siteName: 'Kapaki Tatui',
  whatsapp: '5515XXXXXXXXX', // with country + area code, no spaces
  phone: '(15) XXXX-XXXX',
  address: {
    street: '...',
    city: 'Tatui',
    state: 'SP',
    zip: 'XX.XXX-XXX',
  },
  instagram: '@loja_kapaki_tatui_',
  hours: 'Seg-Sex 9h-18h, Sab 9h-13h',
})
```

### Pattern 4: Section components are pure presentational

**What:** No composable calls or `useAppConfig()` inside section components. All data is passed as props.

**Why:** Makes components independently testable and reusable. The page layer owns assembly; sections own rendering. This also keeps section components simple enough to write quickly and avoids hidden coupling.

### Pattern 5: Auto-import everything — no explicit imports needed

**What:** Nuxt 3 auto-imports all components from `components/`, all composables from `composables/`, and all utils from `utils/`. Never write explicit `import` statements for these.

**Why:** Standard Nuxt 3 behavior. Reduces boilerplate. Components are named by their file path automatically (e.g., `components/ServiceCard.vue` → `<ServiceCard />`).

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Pinia / Vuex for this project

**What:** Installing a state management library for site data.

**Why bad:** This site has no dynamic server state, no authentication, no cart, no user session. State management overhead adds complexity with zero benefit. `app.config.ts` + composables cover all needs.

**Instead:** `app.config.ts` for constants, `useScrollThreshold` for the one piece of UI state, props for all component data.

### Anti-Pattern 2: Calling `useAppConfig()` inside section components

**What:** Having `ServicosSection.vue` or `CtaFinalSection.vue` pull data directly from `useAppConfig()`.

**Why bad:** Creates hidden coupling. Components become harder to reason about and impossible to use outside Nuxt context. Violates the "dumb component" contract.

**Instead:** Page assembles data from `useAppConfig()` and `useWhatsApp()`, then passes to sections as props.

### Anti-Pattern 3: Using `useSeoMeta` (reactive) when `useServerSeoMeta` suffices

**What:** Default to `useSeoMeta()` across all pages.

**Why bad:** `useSeoMeta` runs on both server and client, adding unnecessary JavaScript for meta that never changes after page load. Hurts Lighthouse performance score.

**Instead:** `useServerSeoMeta()` for all static meta. Reserve `useSeoMeta()` only if meta must react to client-side state (not applicable here).

### Anti-Pattern 4: `window` access in composables without `onMounted` guard

**What:** Accessing `window.scrollY` or `window.addEventListener` directly in composable body.

**Why bad:** Nuxt 3 executes composables during SSR where `window` is undefined. Crashes server rendering.

**Instead:** Wrap all `window` access in `onMounted()` or check `if (process.client)`.

### Anti-Pattern 5: Embedding full copy text as static props in pages

**What:** Writing all CTA text, section titles, and testimonials inline in page component `<script>` blocks.

**Why bad:** Hard to update, easy to introduce inconsistencies across pages, makes pages long and noisy.

**Instead:** Extract per-page content into a `content/` directory or a dedicated `constants/pages.ts` file per page. Pages import and pass data to sections. This keeps page components thin orchestrators.

---

## Build Order (Component Dependencies)

Components and composables must be built in this order to avoid blocking dependencies:

```
Phase 1 — Foundation (no deps, build first)
  app.config.ts                  ← No deps
  useWhatsApp.ts                 ← Depends on app.config.ts
  usePageSeo.ts                  ← No component deps
  useScrollThreshold.ts          ← No component deps
  layouts/default.vue            ← No section deps
  AppFooter.vue                  ← Depends on app.config.ts via useAppConfig

Phase 2 — Atomic Section Components (no inter-component deps)
  HeroSection.vue                ← Props only
  BeneficiosSection.vue          ← Props only
  CtaFinalSection.vue            ← Props only + whatsappUrl prop
  ProvasSociaisSection.vue       ← Props only
  FaqAccordion.vue               ← Props only

Phase 3 — Composite Section Components (depends on Phase 2)
  ServiceCard.vue                ← Props only (but conceptually part of ServicosSection)
  ServicosSection.vue            ← Depends on ServiceCard

Phase 4 — Global UI (depends on composables)
  WhatsAppFab.vue                ← Depends on useScrollThreshold + whatsappUrl prop
  app.vue                        ← Assembles layout + WhatsAppFab

Phase 5 — Pages (depends on all above)
  pages/index.vue                ← All sections + both composables
  pages/assistencia-tecnica.vue  ← Hero + Beneficios + FaqAccordion + CtaFinal
  pages/acessorios.vue           ← Hero + Beneficios + CtaFinal
  pages/aparelhos.vue            ← Hero + Beneficios + CtaFinal
```

**Practical implication for phased development:** Build foundation + AppFooter first (Phase 1), then all atomic sections simultaneously (Phase 2 — no order dependency within phase), then assemble pages (Phase 5). WhatsAppFab can be added to app.vue early but tested properly only after scroll composable is in place.

---

## Scalability Considerations

This is a 4-page institutional site — scalability is not a primary concern. However, these considerations apply:

| Concern | Current Scale (v1) | If Site Grows |
|---------|-------------------|---------------|
| Copy management | Inline in page files or `constants/` | Move to Nuxt Content module with Markdown |
| Service pages | 3 manual pages | Generate from `content/services/*.md` with dynamic routes |
| Analytics | GA4 via `gtag` in `nuxt.config.ts` | Nuxt scripts module for better perf isolation |
| Images | Static assets in `public/` | Nuxt Image module for optimization |
| More business units | Duplicate pages | Nuxt Layers for multi-location structure |

---

## Directory Structure (Final)

```
kapaki/
  app.config.ts
  nuxt.config.ts
  app.vue
  layouts/
    default.vue
  pages/
    index.vue
    assistencia-tecnica.vue
    acessorios.vue
    aparelhos.vue
  components/
    HeroSection.vue
    ServicosSection.vue
    ServiceCard.vue
    ProvasSociaisSection.vue
    BeneficiosSection.vue
    CtaFinalSection.vue
    FaqAccordion.vue
    AppFooter.vue
    WhatsAppFab.vue
  composables/
    useWhatsApp.ts
    usePageSeo.ts
    useScrollThreshold.ts
  constants/
    services.ts        ← Service names, descriptions, icons
    testimonials.ts    ← Prova social data
    benefits.ts        ← Beneficios content
    faq.ts             ← FAQ content per service
  public/
    favicon.ico
    og-image.jpg
  assets/
    css/
      main.css         ← Tailwind directives + CSS custom properties
```

---

## Sources

- Nuxt 3 Directory Structure (official): https://nuxt.com/docs/3.x/directory-structure
- Nuxt 3 SEO and Meta (official): https://nuxt.com/docs/3.x/getting-started/seo-meta
- useSeoMeta composable (official): https://nuxt.com/docs/3.x/api/composables/use-seo-meta
- app.config.ts vs nuxt.config.ts patterns: https://masteringnuxt.com/blog/configuration-in-nuxt-3-runtimeConfig-vs-appConfig
- VueUse useWindowScroll: https://vueuse.org/core/usewindowscroll/
- Scroll event in Nuxt 3 SSR caveats: https://www.mbaraa.com/blog/a-rant-about-the-scroll-event-in-nuxt-3
- Nuxt 3 component auto-import: https://nuxt.com/docs/3.x/directory-structure/components
- LocalBusiness JSON-LD via Unhead: https://unhead.unjs.io/docs/schema-org/api/schema/local-business
- Nuxt Schema.org module: https://nuxtseo.com/docs/schema-org/getting-started/introduction
- Designing with Tailwind and Nuxt 3 (DEV): https://dev.to/hexshift/designing-with-tailwind-and-nuxt-3-scalable-patterns-for-vue-devs-cc1
