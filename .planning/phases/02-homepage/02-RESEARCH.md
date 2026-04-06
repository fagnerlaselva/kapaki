# Phase 2: Homepage - Research

**Researched:** 2026-04-06
**Domain:** Nuxt 3 presentational components, Tailwind v4 responsive patterns, WhatsApp FAB with scroll detection
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HOME-01 | HeroSection full-width com H1, subtitulo, botao WhatsApp amarelo e botao outline "Ver servicos" | Section component pattern; anchor scroll to #servicos |
| HOME-02 | ServicosSection com 3 cards (Acessorios, Assistencia Tecnica com badge "Mais procurado", Aparelhos) | ServiceCard sub-component; badge pattern; WA props per service |
| HOME-03 | ProvasSociaisSection com selo "+500 clientes", 3 cards de avaliacao com 5 estrelas | Star rating via SVG/Lucide; static testimonial data in constants/ |
| HOME-04 | BeneficiosSection com 4 cards (Atendimento Rapido, Preco Justo, Garantia, Localizacao) | 4-col desktop / 2-col mobile grid; Lucide icons per benefit |
| HOME-05 | Footer com 3 colunas (Sobre, Contato com WhatsApp e Instagram, Horarios) | useAppConfig() in page, data passed as props; 3-col desktop / stacked mobile |
| WA-02 | Botoes WhatsApp com mensagens pre-preenchidas distintas por servico | useWhatsApp(service) already built; pass whatsappUrl as prop to each section |
| WA-03 | FAB WhatsApp fixo (bottom-right, circulo verde #25D366) que aparece apos scroll | useScrollThreshold composable; onMounted guard; v-show not v-if |
| WA-04 | CTA final amarelo full-width com botao WhatsApp | CtaFinalSection with bg-primary, text-background, whatsappUrl prop |
| PERF-01 | Site 100% responsivo mobile-first (mobile, tablet, desktop) | Tailwind v4 sm:/md:/lg: breakpoints; 375px / 768px / 1280px breakpoints |
</phase_requirements>

---

## Summary

Phase 2 builds the complete homepage by replacing the Phase 1 placeholder `app/pages/index.vue` with a fully assembled page that orchestrates six section components, a footer, and the WhatsApp FAB. All infrastructure from Phase 1 is in place and ready: the `useWhatsApp` composable is built and tested, Tailwind v4 CSS tokens are defined, the Nuxt 4 `app/` directory convention is established, and the default layout exists. No new dependencies need to be installed.

The technical challenge is exclusively in component authoring: creating eight new Vue SFCs that are presentational (all data via props), SSR-safe (no bare `window` access), and mobile-first responsive. The scroll-triggered FAB is the only interactive element that requires client-side guarding. All copy, colors, icons, and layout specs are fully defined in `kapaki.md`.

The build order follows the dependency graph documented in ARCHITECTURE.md: atomic sections first (Hero, Beneficios, CtaFinal, ProvasSociais), then composite (ServiceCard then ServicosSection, AppFooter), then the FAB + app.vue update, and finally the assembled index.vue page. The content data (services, testimonials, benefits) goes into `app/constants/` to keep the page component thin.

**Primary recommendation:** Build atomic section components first in any order, then assemble them in index.vue. Keep useScrollThreshold composable creation adjacent to WhatsAppFab to avoid testing FAB without its dependency.

---

## Standard Stack

All dependencies are already installed. No new packages needed for this phase.

### Core (already installed)
| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| nuxt | 4.4.2 | Framework + auto-imports | Already in place; auto-imports all components and composables |
| tailwindcss | 4.2.2 | Styling | CSS tokens already defined in main.css; use `bg-background`, `text-primary`, `bg-surface`, `text-whatsapp` |
| lucide-vue-next | 1.0.0 | Icons | Tree-shakable SVG icons; import individually in each component script |
| @nuxt/image | 2.0.0 | Image optimization | For hero image if used; screens already configured in nuxt.config.ts |

### Tailwind v4 Color Tokens Available
These are defined in `app/assets/css/main.css` and ready to use as utility classes:

| CSS Variable | Tailwind Class | Value | Use |
|--------------|---------------|-------|-----|
| `--color-background` | `bg-background` | #111111 | Page background, Hero bg |
| `--color-primary` | `bg-primary`, `text-primary` | #F5C400 | CTA buttons, stars, badges |
| `--color-primary-hover` | `hover:bg-primary-hover` | #D4A800 | Button hover state |
| `--color-surface` | `bg-surface` | #1C1C1C | Card backgrounds, alternating sections |
| `--color-text` | `text-text` | #FFFFFF | Primary text |
| `--color-text-muted` | `text-text-muted` | #A1A1AA | Secondary text, captions |
| `--color-whatsapp` | `bg-whatsapp`, `text-whatsapp` | #25D366 | FAB circle, WhatsApp accents |

**Note:** The PRD uses `#1A1A1A` for surface and `#0A0A0A` for footer. The established token is `#1C1C1C`. Use `bg-surface` for cards/sections and add `bg-[#0A0A0A]` inline for the footer's darker shade (Tailwind v4 supports arbitrary values directly).

### Lucide Icons to Import
Per kapaki.md section specs:

| Section | Icon | Import |
|---------|------|--------|
| HeroSection | MessageCircle or Phone | `import { MessageCircle } from 'lucide-vue-next'` |
| ServicosSection — Acessorios | Smartphone | `import { Smartphone } from 'lucide-vue-next'` |
| ServicosSection — Assistencia | Wrench | `import { Wrench } from 'lucide-vue-next'` |
| ServicosSection — Aparelhos | TabletSmartphone | `import { TabletSmartphone } from 'lucide-vue-next'` |
| BeneficiosSection | Zap, Tag, Shield, MapPin | Individual imports per component or parent |
| Footer | MapPin, MessageCircle, Instagram | Individual imports |
| WhatsAppFab | MessageCircle | `import { MessageCircle } from 'lucide-vue-next'` |

---

## Architecture Patterns

### Component File Locations (Nuxt 4 app/ convention)

All new files go under `app/`:

```
app/
  app.vue                        <- MODIFY: add WhatsAppFab + useScrollThreshold
  layouts/
    default.vue                  <- MODIFY: add <AppFooter> before </div>
  pages/
    index.vue                    <- REPLACE: full homepage with all sections
  components/
    HeroSection.vue              <- CREATE
    ServicosSection.vue          <- CREATE
    ServiceCard.vue              <- CREATE (used by ServicosSection)
    ProvasSociaisSection.vue     <- CREATE
    BeneficiosSection.vue        <- CREATE
    CtaFinalSection.vue          <- CREATE
    AppFooter.vue                <- CREATE
    WhatsAppFab.vue              <- CREATE
  composables/
    useWhatsApp.ts               <- EXISTS (do not modify)
    useScrollThreshold.ts        <- CREATE
  constants/
    services.ts                  <- CREATE (service card data)
    testimonials.ts              <- CREATE (testimonial data)
    benefits.ts                  <- CREATE (benefits data)
```

### Pattern 1: Presentational Section Components

**What:** All section components receive all data via props. No composable calls, no `useAppConfig()` inside sections.

**Why:** Enforced by ARCHITECTURE.md decision. Makes components testable and reusable.

**Section component template:**
```vue
<!-- components/BeneficiosSection.vue -->
<script setup lang="ts">
import { Zap, Tag, Shield, MapPin } from 'lucide-vue-next'

interface Benefit {
  icon: 'zap' | 'tag' | 'shield' | 'mappin'
  title: string
  text: string
}

defineProps<{
  benefits: Benefit[]
}>()
</script>

<template>
  <section class="bg-surface py-16 px-4">
    <div class="max-w-5xl mx-auto">
      <h2 class="font-heading text-3xl font-bold text-text text-center mb-12">
        Por que escolher a Kapaki?
      </h2>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="benefit in benefits" :key="benefit.title" class="text-center">
          <!-- icon switch + title + text -->
        </div>
      </div>
    </div>
  </section>
</template>
```

### Pattern 2: Page Assembles Data and Passes Down

**What:** `pages/index.vue` calls `useWhatsApp()` for each service, reads constants, and passes everything as props.

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
import { SERVICES } from '~/constants/services'
import { TESTIMONIALS } from '~/constants/testimonials'
import { BENEFITS } from '~/constants/benefits'

const { whatsappUrl: waHero } = useWhatsApp('geral')
const { whatsappUrl: waAssistencia } = useWhatsApp('assistencia')
const { whatsappUrl: waAcessorios } = useWhatsApp('acessorios')
const { whatsappUrl: waAparelhos } = useWhatsApp('aparelhos')
const { whatsappUrl: waCta } = useWhatsApp('geral')
</script>

<template>
  <HeroSection :whatsapp-url="waHero" />
  <ServicosSection
    :services="SERVICES"
    :wa-assistencia="waAssistencia"
    :wa-acessorios="waAcessorios"
    :wa-aparelhos="waAparelhos"
  />
  <ProvasSociaisSection :testimonials="TESTIMONIALS" />
  <BeneficiosSection :benefits="BENEFITS" />
  <CtaFinalSection :whatsapp-url="waCta" />
</template>
```

### Pattern 3: useScrollThreshold — SSR-Safe Scroll Composable

**What:** Returns a reactive `isVisible` ref that becomes `true` after scrolling past a pixel threshold. The `window.addEventListener` is only attached inside `onMounted` to avoid SSR crash.

**Critical detail:** Use `v-show` on WhatsAppFab (not `v-if`). `v-show` keeps the DOM element and only toggles `display`, preventing hydration mismatches between server (isVisible=false renders element as hidden) and client.

```typescript
// app/composables/useScrollThreshold.ts
export function useScrollThreshold(px: number = 300) {
  const isVisible = ref(false)

  onMounted(() => {
    const handler = () => {
      isVisible.value = window.scrollY > px
    }
    window.addEventListener('scroll', handler, { passive: true })
    // Clean up on component unmount
    onUnmounted(() => window.removeEventListener('scroll', handler))
  })

  return { isVisible }
}
```

**Passive event listener:** Always add `{ passive: true }` to scroll listeners. This signals to the browser that the handler never calls `preventDefault()`, allowing it to skip waiting for the handler before scrolling. Measurable FPS improvement on mobile.

### Pattern 4: WhatsAppFab in app.vue

**What:** The FAB is mounted once globally in `app.vue`, outside the layout slot. It uses the general WhatsApp URL.

```vue
<!-- app/app.vue -->
<script setup lang="ts">
const { whatsappUrl } = useWhatsApp('geral')
const { isVisible } = useScrollThreshold(100)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <WhatsAppFab
    v-show="isVisible"
    :whatsapp-url="whatsappUrl"
  />
</template>
```

**Why app.vue and not a page:** The FAB must persist across page navigations (Phase 3 service pages also need it). Mounting once in app.vue is the correct pattern.

### Pattern 5: Constants Files for Static Data

**What:** Section content (services, testimonials, benefits) lives in `app/constants/` as typed TypeScript objects, not inline in pages or components.

```typescript
// app/constants/services.ts
export interface ServiceItem {
  key: 'assistencia' | 'acessorios' | 'aparelhos'
  icon: string
  title: string
  description: string
  ctaLabel: string
  badge?: string
}

export const SERVICES: ServiceItem[] = [
  {
    key: 'acessorios',
    icon: 'smartphone',
    title: 'Acessorios para Celular',
    description: 'Capinhas, peliculas, carregadores, fones e muito mais. Protecao e estilo no melhor preco de Tatui.',
    ctaLabel: 'Ver acessorios',
  },
  {
    key: 'assistencia',
    icon: 'wrench',
    title: 'Assistencia Tecnica Especializada',
    description: 'Tela quebrada, bateria viciada, celular molhado? A gente resolve rapido, com garantia e sem enrolacao.',
    ctaLabel: 'Solicitar orcamento',
    badge: 'Mais procurado',
  },
  {
    key: 'aparelhos',
    icon: 'tablet-smartphone',
    title: 'Venda de Aparelhos',
    description: 'Smartphones novos e seminovos com procedencia e garantia. Encontre o modelo ideal para o seu bolso.',
    ctaLabel: 'Ver aparelhos',
  },
]
```

### Pattern 6: AppFooter in default.vue, Not index.vue

**What:** The footer is added to `layouts/default.vue` (inside the wrapping div, after `<slot />`). This ensures it appears on all pages (homepage and future service pages) automatically.

```vue
<!-- app/layouts/default.vue -->
<template>
  <div class="min-h-screen bg-background text-text font-body">
    <slot />
    <AppFooter
      :site-name="config.siteName"
      :address="config.address"
      :phone="config.phone"
      :whatsapp="config.whatsapp"
      :instagram="config.instagram"
      :hours="config.hours"
    />
  </div>
</template>
```

**But:** AppFooter needs data. The default layout must call `useAppConfig()` to assemble footer props. This is the one exception to "no composables in layout/section" — the layout layer is above the page layer and legitimately orchestrates global data.

### Pattern 7: Smooth Scroll for "Ver servicos" Button

**What:** The "Ver servicos" button in HeroSection anchors to `#servicos` on the same page. Use a native `<a href="#servicos">` — no JavaScript needed. Add `scroll-behavior: smooth` via CSS.

```css
/* In app/assets/css/main.css — add after @theme block */
html {
  scroll-behavior: smooth;
}
```

The ServicosSection template root element must have `id="servicos"`:
```vue
<section id="servicos" class="bg-surface py-16 px-4">
```

### Anti-Patterns to Avoid

- **`v-if` on WhatsAppFab:** Causes hydration mismatch (server renders nothing, client renders element). Use `v-show` instead.
- **`window.scrollY` in composable body:** Crashes SSR. Always inside `onMounted`.
- **Hardcoding WhatsApp messages in components:** Messages must come from `useWhatsApp()` which reads from the centralized `MESSAGES` map. Never duplicate message strings.
- **Building star rating with Unicode ⭐:** Use five SVG star elements or Lucide's `Star` icon with `fill="currentColor"`. Unicode stars are not accessible and render inconsistently across OS.
- **Dynamic Tailwind class construction:** `\`text-${color}-500\`` is purged in production. Use full static class names.
- **Calling `useWhatsApp()` inside section components:** Violates the presentational component contract. Only pages and layout-level components call composables.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll position tracking | Custom reactive scroll store | `useScrollThreshold` composable with `{ passive: true }` | Passive listener + onUnmounted cleanup required for correctness |
| WhatsApp URL generation | Inline template literal | `useWhatsApp(service)` (already built) | encodeURIComponent handling, phone number centralized |
| Responsive grid | Manual flexbox with JS | Tailwind `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` | Zero runtime cost, breakpoints match project conventions |
| Star rating display | Loop with Unicode | Static 5x `<Star class="fill-primary text-primary" />` with `aria-label` | Accessible, consistent rendering, correct color via CSS |
| Smooth scroll | JS `scrollIntoView()` | Native `<a href="#servicos">` + CSS `scroll-behavior: smooth` | Zero JS, native browser support is universal |
| Icon mapping | `v-if` chain per icon name string | Dedicated icon component per benefit card, or computed icon map | Simpler, tree-shakable, no dynamic component overhead |

---

## Common Pitfalls

### Pitfall 1: Hydration Mismatch on WhatsAppFab

**What goes wrong:** If `v-if` is used on WhatsAppFab or if `isVisible` is not initialized to `false` server-side, the server renders the FAB hidden while client renders it visible (or vice versa), causing a hydration error and a visible layout flash.

**How to avoid:** Initialize `isVisible` as `ref(false)`. Use `v-show` (not `v-if`). The element is always in the DOM; only `display` toggles. SSR renders `display: none`, client scroll handler updates it after `onMounted`.

**Warning signs:** Vue hydration warning in console: `[nuxt] [Vue warn]: Hydration node mismatch`. FAB flashes on page load.

### Pitfall 2: Missing onUnmounted Cleanup for Scroll Listener

**What goes wrong:** `window.addEventListener('scroll', handler)` in `onMounted` without a matching `removeEventListener` in `onUnmounted` creates a memory leak. On page navigation (Phase 3), the old listener from app.vue stays active and creates duplicate calls.

**How to avoid:** Always pair with `onUnmounted(() => window.removeEventListener('scroll', handler))`. The handler function must be the same reference (capture it as a `const` before `addEventListener`).

### Pitfall 3: ServicosSection WhatsApp URLs Not Per-Service

**What goes wrong:** Passing a single generic `whatsappUrl` to ServicosSection and using it for all three cards violates WA-02 (distinct pre-filled messages per service). The "Solicitar orcamento" button for assistencia should open a different message than the acessorios button.

**How to avoid:** Pass three separate `whatsappUrl` props to ServicosSection (one per service key), or pass a `whatsappUrls` object. The page assembles all three URLs by calling `useWhatsApp()` three times.

### Pitfall 4: Tailwind v4 `bg-surface` Token Not Matching PRD Exactly

**What goes wrong:** The PRD specifies `#1A1A1A` for card/section backgrounds. The established CSS token is `#1C1C1C`. Using arbitrary values like `bg-[#1A1A1A]` creates inconsistency with the token system.

**How to avoid:** Use `bg-surface` (the established token). The 2-point hex difference is imperceptible. Do not introduce arbitrary color values that bypass the token system. The PRD is a design reference; the established tokens are the source of truth.

### Pitfall 5: AppFooter Data Access Pattern

**What goes wrong:** If AppFooter directly calls `useAppConfig()` internally, it violates the "dumb component" pattern. But if it's placed in `default.vue` without the layout calling `useAppConfig()`, there's no data source.

**How to avoid:** `default.vue` calls `useAppConfig()` and passes footer data as props. AppFooter is a presentational component that receives address, phone, instagram, and hours as props. The layout layer is explicitly allowed to call composables — it is an orchestrator, not a section component.

### Pitfall 6: Section Order in DOM Does Not Match Visual Order

**What goes wrong:** If sections are assembled in wrong order in index.vue, the visual hierarchy of the page breaks. The canonical order per kapaki.md is: Hero → Servicos → ProvasSociais → Beneficios → CtaFinal → Footer (in layout).

**How to avoid:** Follow the order from kapaki.md section 8 precisely. The footer is in the layout, not in index.vue.

---

## Code Examples

### WhatsApp Button Component Pattern (inside any section)

```vue
<!-- Used inside HeroSection, ServiceCard, CtaFinalSection -->
<a
  :href="whatsappUrl"
  target="_blank"
  rel="noopener noreferrer"
  class="inline-flex items-center gap-2 bg-primary text-background font-heading font-semibold px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors"
>
  <MessageCircle class="size-5" />
  Falar no WhatsApp
</a>
```

### "Ver servicos" Outline Button Pattern

```vue
<a
  href="#servicos"
  class="inline-flex items-center gap-2 border border-text text-text font-heading font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
>
  Ver servicos
</a>
```

### Star Rating (5 stars, accessible)

```vue
<!-- ProvasSociaisSection or ReviewCard -->
<script setup>
import { Star } from 'lucide-vue-next'
</script>

<div class="flex gap-1" aria-label="Avaliacao 5 de 5 estrelas">
  <Star
    v-for="i in 5"
    :key="i"
    class="size-4 fill-primary text-primary"
  />
</div>
```

### WhatsAppFab Component

```vue
<!-- app/components/WhatsAppFab.vue -->
<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'

defineProps<{
  whatsappUrl: string
}>()
</script>

<template>
  <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-6 right-6 z-50 size-14 rounded-full bg-whatsapp text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    aria-label="Fale com a Kapaki agora pelo WhatsApp"
    title="Fale com a Kapaki agora"
  >
    <MessageCircle class="size-7" />
  </a>
</template>
```

### ServiceCard with Badge

```vue
<!-- app/components/ServiceCard.vue -->
<script setup lang="ts">
defineProps<{
  title: string
  description: string
  ctaLabel: string
  whatsappUrl: string
  badge?: string
  featured?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'bg-surface rounded-xl p-6 flex flex-col gap-4 relative',
      featured ? 'border-2 border-primary' : 'border border-white/10'
    ]"
  >
    <span
      v-if="badge"
      class="absolute -top-3 left-6 bg-primary text-background text-xs font-heading font-bold px-3 py-1 rounded-full"
    >
      {{ badge }}
    </span>
    <!-- icon slot, title, description -->
    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-auto inline-flex items-center gap-1 text-primary font-semibold hover:underline"
    >
      {{ ctaLabel }} →
    </a>
  </div>
</template>
```

### Responsive Grid Patterns (Tailwind v4)

```html
<!-- BeneficiosSection: 2 cols mobile, 4 cols desktop -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-6">

<!-- ServicosSection: 1 col mobile, 3 cols desktop -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">

<!-- Footer: stacked mobile, 3 cols desktop -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-12">

<!-- ProvasSociais: 1 col mobile, 3 cols desktop -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
```

### Content Width Container (consistent across sections)

```html
<!-- Use this wrapper in every section for consistent max-width + padding -->
<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
```

---

## Copy Reference (from kapaki.md)

All copy is locked in kapaki.md. Key values for constants files:

### HeroSection copy
- H1: "Seu celular merece o melhor. Voce tambem."
- Subtitle: "Acessorios, consertos e celulares — tudo em um so lugar, aqui em Tatui."
- Button 1: "Falar no WhatsApp" (WA message: geral)
- Button 2: "Ver servicos" (anchor #servicos)

### ServicosSection copy
- Section title: "O que voce precisa hoje?"
- Section subtitle: "Escolha seu caminho — a Kapaki resolve."
- Card 1: Acessorios, CTA "Ver acessorios", WA: acessorios
- Card 2: Assistencia Tecnica, badge "Mais procurado", CTA "Solicitar orcamento", WA: assistencia
- Card 3: Aparelhos, CTA "Ver aparelhos", WA: aparelhos

### ProvasSociaisSection copy
- Title: "Quem veio, aprovou"
- Subtitle: "Centenas de clientes atendidos em Tatui e regiao."
- Seal: "+500 clientes atendidos em Tatui"
- 3 reviewers: Ana Paula M., Carlos H., Fernanda L. (all Tatui-SP, all 5 stars)

### BeneficiosSection copy
- Title: "Por que escolher a Kapaki?"
- 4 cards: Atendimento Rapido (Zap), Preco Justo (Tag), Garantia em Tudo (Shield), No Coracao de Tatui (MapPin)

### CtaFinalSection copy
- Title: "Precisa de ajuda agora?"
- Subtitle: "Fale com um especialista da Kapaki. Atendimento imediato pelo WhatsApp."
- Button: "Chamar no WhatsApp agora"
- Small text: "Respondemos em instantes - Seg a Sab - Tatui-SP"
- Background: bg-primary, text-background (yellow section with black text)
- Button style: bg-background text-text (inverted)

### AppFooter copy
- Col 1 "Sobre": Logo/name + "Sua loja de confianca para acessorios, assistencia tecnica e celulares em Tatui e regiao."
- Col 2 "Contato": Address city (Tatui-SP), WhatsApp link, Instagram link
- Col 3 "Horarios": Seg-Sex 9h-18h, Sab 9h-13h, Dom Fechado
- Footer bar: "© 2025 Kapaki Tatui. Todos os direitos reservados."
- Background: bg-[#0A0A0A]

### WhatsAppFab behavior
- Appears after 100px scroll (per kapaki.md section 8.7)
- Background: bg-whatsapp (#25D366)
- WA message: geral ("Ola! Vim pelo site da Kapaki e quero saber mais.")
- Tooltip: "Fale com a Kapaki agora"

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| `window.addEventListener` without passive | `{ passive: true }` option | Better scroll FPS on mobile |
| `v-if` for FAB visibility toggle | `v-show` for FAB | Avoids hydration mismatch |
| `@nuxtjs/tailwindcss` | `@tailwindcss/vite` Vite plugin | Already established; no tailwind.config.js |
| CSS `scroll-behavior: smooth` as JS | Native CSS `html { scroll-behavior: smooth }` | Zero JS cost |

---

## Open Questions

1. **Hero visual/image**
   - What we know: PRD says "SVG ou imagem de smartphone moderno" with a possible yellow gradient
   - What's unclear: No actual image asset exists. Phase 1 had no images.
   - Recommendation: Use a CSS/gradient visual for hero background (no image needed for v1). Avoids PERF-05 concerns for a non-existent asset. A simple radial gradient or solid #111111 with yellow accent works. Defer actual photo to when client provides assets.

2. **"Ver servicos" button: anchor or router-link**
   - What we know: The button links to `#servicos` on the same page (index.vue)
   - What's unclear: On service pages (Phase 3), this button concept may need different behavior
   - Recommendation: Native `<a href="#servicos">` for Phase 2. Service pages don't have a #servicos section — this is homepage-only. No router-link needed.

3. **Footer in layout vs index.vue**
   - What we know: ARCHITECTURE.md specifies footer in default.vue; service pages also need a footer
   - Recommendation: Confirmed — footer in `layouts/default.vue`. This is the correct pattern and makes Phase 3 service pages automatically have a footer.

---

## Build Order for Phase 2

Follow ARCHITECTURE.md dependency graph. Recommended plan structure:

**Plan 1 — Foundation components + composable (no cross-dependencies)**
- `useScrollThreshold.ts` (new composable)
- `HeroSection.vue`
- `CtaFinalSection.vue`
- `WhatsAppFab.vue`
- `app/app.vue` update (add WhatsAppFab)
- `app/constants/services.ts`, `testimonials.ts`, `benefits.ts`

**Plan 2 — Section components + layout**
- `ServiceCard.vue`
- `ServicosSection.vue`
- `ProvasSociaisSection.vue`
- `BeneficiosSection.vue`
- `AppFooter.vue`
- `layouts/default.vue` update (add AppFooter)

**Plan 3 — Page assembly + SEO meta**
- `pages/index.vue` (full homepage, replaces placeholder)
- `useServerSeoMeta` for homepage title/description
- Smoke test: all sections visible, FAB appears on scroll, all WA links distinct

---

## Sources

### Primary (HIGH confidence)
- `kapaki.md` (project root) — all copy, layout specs, colors, component specs
- `app/composables/useWhatsApp.ts` — confirmed API: `useWhatsApp(service)` returns `{ whatsappUrl: string }`
- `app/assets/css/main.css` — confirmed CSS token names (bg-background, text-primary, etc.)
- `.planning/research/ARCHITECTURE.md` — established patterns (dumb components, props-down, no Pinia)
- `.planning/research/PITFALLS.md` — pitfall 2 (hydration mismatch with window), pitfall 7 (WA URL encoding)
- `.planning/phases/01-fundacao/01-02-SUMMARY.md` — established patterns (useWhatsApp in pages only, Nuxt 4 app/ convention)

### Secondary (MEDIUM confidence)
- MDN Web Docs: `addEventListener` passive option — standard browser behavior, universally supported
- Vue 3 docs: `v-show` vs `v-if` behavior for SSR hydration — documented behavior
- Nuxt 3 docs: `onMounted` SSR guard pattern — established project pattern per PITFALLS.md

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependencies; all tokens and imports verified in existing files
- Architecture: HIGH — follows established ARCHITECTURE.md patterns with direct code evidence from Phase 1
- Pitfalls: HIGH — derived from project's own PITFALLS.md and established decisions from Phase 1 deviations
- Copy/content: HIGH — sourced directly from kapaki.md PRD

**Research date:** 2026-04-06
**Valid until:** 2026-05-06 (stable stack, no volatile dependencies)
