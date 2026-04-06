# Phase 3: Paginas de Servico - Research

**Researched:** 2026-04-06
**Domain:** Nuxt 3 service pages — FAQPage JSON-LD, LocalBusiness schema, @nuxt/image, @nuxtjs/seo sitemap/robots
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SERV-01 | Pagina /assistencia-tecnica com H1 unico, lista de servicos, FAQ e CTA WhatsApp | Content data file + ServiceHeroSection prop + FaqAccordion component |
| SERV-02 | Pagina /acessorios com H1 unico, produtos destacados e CTA WhatsApp | Content data file + ServiceHeroSection prop + CtaFinalSection reuse |
| SERV-03 | Pagina /aparelhos com H1 unico, diferenciais e CTA WhatsApp | Content data file + ServiceHeroSection prop + CtaFinalSection reuse |
| SERV-04 | Layout compartilhado entre paginas de servico (hero simplificado + conteudo + CTA + FAQ) | Component composition pattern — NOT a second layout file |
| SEO-01 | useServerSeoMeta com title e description unicos em todas as paginas | useServerSeoMeta per-page, already used in index.vue — same pattern |
| SEO-02 | Schema JSON-LD LocalBusiness/ElectronicsRepair global via useHead | useHead in app.vue or default.vue with JSON.stringify — verified pattern |
| SEO-03 | Schema FAQPage JSON-LD nas paginas de servico com FAQ | useHead per service page — FAQPage schema only on /assistencia-tecnica |
| SEO-04 | Sitemap e robots.txt via @nuxtjs/seo | @nuxtjs/seo already installed — zero config needed for static routes |
| SEO-05 | og:image com URL absoluta para preview correto no WhatsApp | site.url in nuxt.config.ts already set; og:image must use absolute URL |
| PERF-04 | Imagens otimizadas via @nuxt/image com lazy loading | @nuxt/image already installed; NuxtImg with loading="lazy" |
| PERF-05 | Hero image com loading="eager" e fetchpriority="high" | NuxtImg with loading="eager" fetchpriority="high" on first hero image |
</phase_requirements>

---

## Summary

Phase 3 builds on a complete Phase 2 foundation. All infrastructure is in place: `@nuxtjs/seo` installed and configured with `site.url`, `@nuxt/image` installed, `useWhatsApp` composable working, `CtaFinalSection` reusable, and `default.vue` providing the footer automatically. The work is additive — create new components and pages, inject schemas, place an og-image file.

The key technical decisions for this phase:

1. **Shared service page layout via component composition** (not a second layout file). Service pages compose a `ServiceHeroSection` + content area + `CtaFinalSection` — all wired in each page file. `default.vue` continues to wrap with footer.

2. **JSON-LD schemas via `useHead` with raw `innerHTML`** — the project already chose this approach over `nuxt-schema-org` module API. The `ElectronicsRepair` (global, in `default.vue`) and `FAQPage` (per-page in `/assistencia-tecnica`) schemas are injected as stringified JSON-LD.

3. **`FaqAccordion.vue` component needs to be created** — planned in ARCHITECTURE.md but never built in Phases 1-2. It is required for SERV-01 and SEO-03.

4. **og:image placeholder** — `public/og-image.jpg` does not yet exist. A placeholder image must be placed there; SEO-05 requires an absolute URL. The og:image on service pages should reference the same `${site.url}/og-image.jpg` until real images are provided.

**Primary recommendation:** Build in order: (1) og-image placeholder + constants/faq.ts, (2) FaqAccordion component + ServiceHeroSection component, (3) three service pages each with useServerSeoMeta + FAQPage/LocalBusiness schema, (4) inject ElectronicsRepair schema globally in default.vue, (5) verify sitemap.xml and robots.txt.

---

## Standard Stack

All modules are already installed. No new npm installs required for this phase.

### Already Installed and Active

| Module | Version | Purpose | Status |
|--------|---------|---------|--------|
| `@nuxtjs/seo` | ^5.x | Robots + sitemap + og-image + schema-org utilities | Active in nuxt.config.ts |
| `@nuxt/image` | ^1.x (v2) | NuxtImg component with Vercel CDN optimization | Active in nuxt.config.ts |
| `lucide-vue-next` | ^1.x | Icons (ChevronDown for FAQ accordion) | Already used in components |

### Already Available (No Install)

| API | Where | Use in Phase 3 |
|-----|-------|----------------|
| `useServerSeoMeta()` | Nuxt built-in | title/description/og:* per service page |
| `useHead()` | Nuxt built-in | JSON-LD script injection |
| `useAppConfig()` | Nuxt built-in | Business data for LocalBusiness schema |
| `useWhatsApp()` | `~/composables/useWhatsApp.ts` | Service-specific WA URLs |
| `CtaFinalSection` | `~/components/CtaFinalSection.vue` | Reused on all service pages |

### Not Needed — Alternatives Considered

| Instead of | Could Use | Why Not |
|------------|-----------|---------|
| Raw `useHead` JSON-LD | `nuxt-schema-org` defineLocalBusiness() | Already installed but raw useHead is the simpler, chosen approach; avoids learning a new API for 4 static schemas |
| Static og-image file | `nuxt-og-image` dynamic generation | `ogImage.zeroRuntime: true` already set — dynamic generation disabled to avoid TTY issues; static file is sufficient |

---

## Architecture Patterns

### Recommended Project Structure (additions for Phase 3)

```
app/
├── components/
│   ├── FaqAccordion.vue        # NEW — accordion for FAQ items with schema-ready data
│   └── ServiceHeroSection.vue  # NEW — simplified hero for service pages
├── constants/
│   └── faq.ts                  # NEW — FAQ content per service key
├── pages/
│   ├── assistencia-tecnica.vue # NEW — full service page with FAQPage schema
│   ├── acessorios.vue          # NEW — service page (no FAQ)
│   └── aparelhos.vue           # NEW — service page (no FAQ)
public/
└── og-image.jpg                # NEW — placeholder image (800x630px minimum)
```

### Pattern 1: Service Page Composition (SERV-04)

**What:** Each service page is a Nuxt page file that composes:
- `ServiceHeroSection` (new — simplified hero with H1 + subtitle + CTA)
- A content section (inline `<section>` with service-specific list/cards)
- `CtaFinalSection` (existing reusable component)
- `FaqAccordion` (new — only on /assistencia-tecnica)

**When to use:** All three service pages follow this exact structure. No second layout file needed — `default.vue` already provides the footer shell.

**ServiceHeroSection props:**
```typescript
// app/components/ServiceHeroSection.vue
defineProps<{
  title: string        // H1 text — unique per page, contains city keyword
  subtitle: string     // Supporting text
  whatsappUrl: string  // Service-specific WA link
  ctaLabel: string     // Button label
}>()
```

**Service page assembly pattern (assistencia-tecnica.vue):**
```vue
<script setup lang="ts">
const { whatsappUrl } = useWhatsApp('assistencia')
const { faqs } = useFaqData('assistencia')  // or import from constants

useServerSeoMeta({
  title: 'Assistencia Tecnica de Celular em Tatui-SP | Kapaki',
  description: 'Conserto de celular em Tatui com agilidade e garantia...',
  ogTitle: 'Assistencia Tecnica — Kapaki Tatui',
  ogDescription: '...',
  ogImage: 'https://kapaki.com.br/og-image.jpg',  // absolute URL
  twitterCard: 'summary_large_image',
})

// FAQPage schema — only on this page
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer }
      }))
    })
  }]
})
</script>

<template>
  <div>
    <ServiceHeroSection
      title="Assistencia Tecnica de Celular em Tatui"
      subtitle="Troca de tela, bateria e consertos em geral com garantia."
      :whatsapp-url="whatsappUrl"
      cta-label="Solicitar orcamento"
    />
    <!-- inline content section: lista de servicos -->
    <section class="py-16 px-4 bg-surface">
      <div class="max-w-4xl mx-auto">
        <!-- service list -->
      </div>
    </section>
    <FaqAccordion :faqs="faqs" />
    <CtaFinalSection :whatsapp-url="whatsappUrl" />
  </div>
</template>
```

### Pattern 2: ElectronicsRepair Schema — Global in default.vue (SEO-02)

**What:** Inject `ElectronicsRepair` (subtype of `LocalBusiness`) once globally via `useHead` in `default.vue`. This makes the schema present on every page including service pages.

**Why `default.vue` not `app.vue`:** `app.vue` already has WhatsAppFab logic. Keeping schema in `default.vue` keeps layout concerns together. Both are equivalent SSR-wise for `useHead`.

**Why `ElectronicsRepair` not `LocalBusiness`:** As documented in PITFALLS.md Pitfall 9 — `ElectronicsRepair` is the most specific schema.org type for a phone repair shop and maximizes eligibility for local rich results.

```typescript
// app/layouts/default.vue — add to existing <script setup>
const config = useAppConfig()

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ElectronicsRepair',
      name: config.siteName,
      description: 'Assistencia tecnica para celulares, acessorios e venda de aparelhos em Tatui-SP',
      url: 'https://kapaki.com.br',   // placeholder — matches site.url
      telephone: config.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: (config.address as any).street,
        addressLocality: (config.address as any).city,
        addressRegion: (config.address as any).state,
        postalCode: (config.address as any).zip,
        addressCountry: 'BR',
      },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '13:00' },
      ],
      image: 'https://kapaki.com.br/og-image.jpg',
      priceRange: '$$',
      sameAs: [`https://www.instagram.com/${(config.instagram as string).replace('@', '')}/`],
    })
  }]
})
```

### Pattern 3: FAQPage JSON-LD — Per-Page in Script Setup (SEO-03)

**What:** FAQPage schema is injected only on `/assistencia-tecnica`. The other two pages (`/acessorios`, `/aparelhos`) do NOT have FAQ sections per kapaki.md spec.

**Data source:** `app/constants/faq.ts` — a typed constant file with FAQ content, used both by the `FaqAccordion` component (rendering) and the `useHead` schema (SEO).

```typescript
// app/constants/faq.ts
export interface FaqItem {
  question: string
  answer: string
}

export const FAQS: Record<string, FaqItem[]> = {
  assistencia: [
    {
      question: 'Quanto tempo demora o conserto?',
      answer: 'A maioria dos reparos e feita no mesmo dia. Troca de tela e bateria geralmente em 1-2 horas.',
    },
    {
      question: 'Tem garantia no servico?',
      answer: 'Sim. Todos os nossos servicos possuem garantia.',
    },
    {
      question: 'Preciso agendar?',
      answer: 'Nao e necessario. Pode vir direto na loja ou chamar no WhatsApp antes.',
    },
  ],
}
```

### Pattern 4: og:image Absolute URL (SEO-05)

**What:** Every service page must set `ogImage` as an absolute URL, not a relative path.

**Why:** `site.url` in `nuxt.config.ts` is `https://kapaki.com.br` (placeholder). The `ogImage` meta tag value must be the full URL. Relative paths break WhatsApp link previews.

**Correct pattern:**
```typescript
useServerSeoMeta({
  ogImage: 'https://kapaki.com.br/og-image.jpg',  // absolute — NOT '/og-image.jpg'
})
```

**Note:** `index.vue` currently uses `ogImage: '/og-image.jpg'` (relative) — this is a pre-existing bug that should be fixed in this phase while adding SEO to service pages. Fix it by making it absolute.

**The `public/og-image.jpg` file does not exist yet** — a placeholder must be created (minimum 800x630px). For now, any generic placeholder image works since real brand assets are pending.

### Pattern 5: NuxtImg for Hero Image (PERF-04, PERF-05)

**What:** Service page hero images use `<NuxtImg>` with `loading="eager"` and `fetchpriority="high"`. Below-fold images use `loading="lazy"`.

**@nuxt/image already configured** in `nuxt.config.ts` with `screens: { sm: 640, md: 768, lg: 1024, xl: 1280 }`. No extra config needed.

```vue
<!-- ServiceHeroSection — above the fold, must be eager -->
<NuxtImg
  src="/hero-service.webp"
  alt="Kapaki Tatui — Assistencia Tecnica"
  width="800"
  height="400"
  loading="eager"
  fetchpriority="high"
  format="webp"
  class="w-full object-cover"
/>

<!-- Below-fold product images — lazy is correct -->
<NuxtImg
  src="/produto.webp"
  loading="lazy"
  fetchpriority="low"
  format="webp"
/>
```

**Note:** For Phase 3, if real hero images are not yet available, the `ServiceHeroSection` can use a CSS gradient background (dark + yellow) without a raster image. This avoids the need for an actual image file while still being functional. If an image IS used, it must be eager.

### Pattern 6: FaqAccordion Component

**What:** Presentational accordion component, receives `faqs: FaqItem[]` as prop. Uses native `<details>/<summary>` HTML or a Vue `ref(null)` open state toggle. Presentational — no composable calls inside.

**Recommended approach:** Use `<details>/<summary>` HTML elements. They are accessible by default, zero JS for open/close, and work without hydration. Styling via Tailwind `open:` variant (Tailwind v4 supports this).

```vue
<!-- app/components/FaqAccordion.vue -->
<script setup lang="ts">
import type { FaqItem } from '~/constants/faq'
defineProps<{ faqs: FaqItem[] }>()
</script>

<template>
  <section class="py-16 px-4 bg-background">
    <div class="max-w-3xl mx-auto">
      <h2 class="font-heading text-2xl font-bold text-text mb-8">
        Perguntas frequentes
      </h2>
      <div class="space-y-3">
        <details
          v-for="faq in faqs"
          :key="faq.question"
          class="border border-border rounded-lg overflow-hidden group"
        >
          <summary class="flex justify-between items-center px-5 py-4 cursor-pointer font-heading font-semibold text-text list-none">
            {{ faq.question }}
            <ChevronDown class="size-5 text-muted transition-transform group-open:rotate-180" />
          </summary>
          <p class="px-5 pb-4 text-muted text-sm leading-relaxed">
            {{ faq.answer }}
          </p>
        </details>
      </div>
    </div>
  </section>
</template>
```

### Pattern 7: Sitemap and robots.txt — Zero Config (SEO-04)

**What:** `@nuxtjs/seo` is already installed. For static routes (`/`, `/assistencia-tecnica`, `/acessorios`, `/aparelhos`), the sitemap module auto-discovers them from Nuxt's route list. No manual sitemap configuration is needed.

**Verification:** After dev server starts, `http://localhost:3000/sitemap.xml` should return an XML sitemap with all 4 routes. `http://localhost:3000/robots.txt` should return an allow-all file.

**Warning — PITFALL 11:** The `public/_robots.txt` file exists but starts with `_` (underscore). The `@nuxtjs/robots` module (part of `@nuxtjs/seo`) generates `/robots.txt` dynamically via the server. The `_robots.txt` file in `public/` is the template that the module reads — this is intentional. Do NOT create a separate `public/robots.txt` or it will conflict.

**Sitemap module config (nuxt.config.ts) — no changes needed.** The `site.url` is already set to `https://kapaki.com.br`, which the sitemap module uses as the base URL for all entries.

```
// Result accessible at /sitemap.xml:
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://kapaki.com.br/</loc></url>
  <url><loc>https://kapaki.com.br/assistencia-tecnica</loc></url>
  <url><loc>https://kapaki.com.br/acessorios</loc></url>
  <url><loc>https://kapaki.com.br/aparelhos</loc></url>
</urlset>
```

### Anti-Patterns to Avoid

- **Second layout file for service pages:** Do NOT create `layouts/service.vue`. Service pages share the same `default.vue` shell. Composition of `ServiceHeroSection` + content + `CtaFinalSection` inside the page is sufficient for SERV-04.

- **Calling composables inside FaqAccordion or ServiceHeroSection:** Both must be strictly presentational. `useWhatsApp` and `useAppConfig` are called in the page file only.

- **Relative ogImage URL:** `ogImage: '/og-image.jpg'` is wrong. Always use the full absolute URL `https://kapaki.com.br/og-image.jpg`.

- **Multiple ElectronicsRepair schemas:** Inject the global schema ONCE in `default.vue`. Do not also inject it in each service page — duplicated schemas confuse crawlers.

- **FAQPage schema on acessorios/aparelhos:** Only `/assistencia-tecnica` has FAQ content per the PRD (kapaki.md section 9). Do not add `FAQPage` schema to the other two pages.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap XML | Manual `/public/sitemap.xml` file | `@nuxtjs/sitemap` (included in `@nuxtjs/seo`) | Static file gets stale; module auto-updates when routes change |
| robots.txt | Manual `public/robots.txt` | `@nuxtjs/robots` (included in `@nuxtjs/seo`) | Module template already exists as `public/_robots.txt`; writing a new file causes conflict |
| Image resize/WebP | Manual image conversion | `<NuxtImg>` with Vercel provider | Vercel CDN resizes and converts format on-demand; `srcset` generated automatically |
| JSON-LD validation | Manual schema inspection | Google Rich Results Test | Validates schema structure and finds errors the human eye misses |
| FAQ accordion JS | Custom Vue reactive open/close | Native `<details>/<summary>` | Zero JS, SSR-rendered, accessible by default, Tailwind `open:` variant handles styling |

---

## Common Pitfalls

### Pitfall 1: og:image Relative URL Breaks WhatsApp Preview

**What goes wrong:** `ogImage: '/og-image.jpg'` — when the link is pasted into WhatsApp Web, no preview image appears.

**Why it happens:** WhatsApp's link preview bot fetches the og:image URL as-is. A relative URL has no host to resolve against.

**How to avoid:** Always use the full absolute URL: `'https://kapaki.com.br/og-image.jpg'`. The `site.url` in `nuxt.config.ts` is `https://kapaki.com.br` — concatenate or hardcode it.

**Warning signs:** Pasting page URL into WhatsApp Web and seeing no image preview.

**Note:** `index.vue` currently has this bug (`ogImage: '/og-image.jpg'`). Fix it in this phase.

### Pitfall 2: ElectronicsRepair Schema Missing geo Coordinates

**What goes wrong:** The schema is valid but incomplete — Google may not display the local business panel if `geo` coordinates are absent.

**Why it happens:** Coordinates are pending client data (documented in STATE.md blockers). The placeholder schema omits `geo`.

**How to avoid:** Add `geo` as a commented placeholder so the planner knows to fill it:

```json
"geo": {
  "@type": "GeoCoordinates",
  "latitude": "PLACEHOLDER",
  "longitude": "PLACEHOLDER"
}
```

**Warning signs:** Google Search Console shows LocalBusiness schema without geo coordinates warning.

### Pitfall 3: public/og-image.jpg Missing Causes 404 on ogImage

**What goes wrong:** All service pages reference `https://kapaki.com.br/og-image.jpg` but the file does not exist in `public/`. WhatsApp preview shows broken image.

**How to avoid:** Create a placeholder `public/og-image.jpg` in Phase 3. Minimum 800x630px. A solid colored rectangle (brand yellow #F5C400 with text) is acceptable as a placeholder.

**Warning signs:** HTTP 404 when fetching `https://kapaki.com.br/og-image.jpg` directly.

### Pitfall 4: FaqAccordion Breaks SSR with window/document Access

**What goes wrong:** Using JavaScript-driven accordion (adding click listeners outside `onMounted`) causes SSR hydration mismatch.

**How to avoid:** Use native `<details>/<summary>` elements. They are stateful via browser without any JavaScript — zero hydration risk.

### Pitfall 5: Duplicate JSON-LD Scripts per Route

**What goes wrong:** Both `default.vue` (ElectronicsRepair) and `assistencia-tecnica.vue` (FAQPage) inject `<script type="application/ld+json">`. If ElectronicsRepair is ALSO injected per service page, there are 2 ElectronicsRepair scripts on the page — validators flag this.

**How to avoid:** Inject ElectronicsRepair ONLY in `default.vue`. Inject FAQPage ONLY in the assistencia-tecnica page. The two schemas on the same page are valid — one global + one page-specific is Google's recommended pattern.

### Pitfall 6: H1 Without City Keyword Misses Local SEO

**What goes wrong:** H1 `"Assistencia Tecnica de Celular"` (no city) vs `"Assistencia Tecnica de Celular em Tatui"` — the second ranks for local queries.

**How to avoid:** Every service page H1 must include `"em Tatui"` or `"em Tatui-SP"`. Follow kapaki.md section 9 exact H1 strings.

---

## Code Examples

Verified patterns from existing codebase and official sources:

### useServerSeoMeta — Service Page Pattern

```typescript
// Source: existing index.vue + Nuxt docs (https://nuxt.com/docs/api/composables/use-seo-meta)
// app/pages/assistencia-tecnica.vue
useServerSeoMeta({
  title: 'Assistencia Tecnica de Celular em Tatui-SP | Kapaki',
  description: 'Conserto de celular em Tatui com agilidade e garantia. Troca de tela, bateria, manutencao geral. Fale agora com a Kapaki!',
  ogTitle: 'Assistencia Tecnica de Celular em Tatui | Kapaki',
  ogDescription: 'Troca de tela, bateria e consertos com garantia em Tatui-SP.',
  ogImage: 'https://kapaki.com.br/og-image.jpg',  // MUST be absolute
  twitterCard: 'summary_large_image',
})
```

### FAQPage JSON-LD

```typescript
// Source: schema.org FAQPage spec + ARCHITECTURE.md Pattern 2
// app/pages/assistencia-tecnica.vue
const faqs = FAQS.assistencia

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }),
  }],
})
```

### ElectronicsRepair Schema in default.vue

```typescript
// Source: PITFALLS.md Pitfall 9 + schema.org ElectronicsRepair
// app/layouts/default.vue — added to existing script setup
const config = useAppConfig()
const addr = config.address as { street: string; city: string; state: string; zip: string }

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ElectronicsRepair',
      name: config.siteName as string,
      description: 'Assistencia tecnica para celulares, acessorios e aparelhos em Tatui-SP',
      url: 'https://kapaki.com.br',
      telephone: config.phone as string,
      address: {
        '@type': 'PostalAddress',
        streetAddress: addr.street,
        addressLocality: addr.city,
        addressRegion: addr.state,
        postalCode: addr.zip,
        addressCountry: 'BR',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday'],
          opens: '09:00',
          closes: '13:00',
        },
      ],
      image: 'https://kapaki.com.br/og-image.jpg',
      priceRange: '$$',
      sameAs: [
        `https://www.instagram.com/${(config.instagram as string).replace('@', '')}/`,
      ],
    }),
  }],
})
```

### NuxtImg Hero (eager) vs Below-Fold (lazy)

```vue
<!-- Source: PITFALLS.md Pitfall 5 + @nuxt/image docs -->
<!-- Above the fold — ServiceHeroSection -->
<NuxtImg
  src="/hero-assistencia.webp"
  alt="Assistencia Tecnica de Celular em Tatui — Kapaki"
  width="800"
  height="400"
  loading="eager"
  fetchpriority="high"
  format="webp"
  class="w-full h-full object-cover"
/>

<!-- Below the fold — content section icons or thumbnails -->
<NuxtImg
  src="/icone-servico.webp"
  loading="lazy"
  fetchpriority="low"
  width="64"
  height="64"
  format="webp"
/>
```

### FaqAccordion with details/summary

```vue
<!-- Source: MDN details element + Tailwind v4 open: variant -->
<details class="border border-border rounded-lg group">
  <summary class="flex justify-between items-center px-5 py-4 cursor-pointer list-none font-heading font-semibold">
    {{ faq.question }}
    <ChevronDown class="size-5 text-muted transition-transform group-open:rotate-180" />
  </summary>
  <p class="px-5 pb-4 text-muted text-sm leading-relaxed">
    {{ faq.answer }}
  </p>
</details>
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| `useSeoMeta()` for all pages | `useServerSeoMeta()` for static pages | Eliminates SEO meta from client JS bundle |
| `LocalBusiness` schema type | `ElectronicsRepair` (specific subtype) | Better local rich result eligibility |
| Manual `public/sitemap.xml` | `@nuxtjs/sitemap` auto-generated | Auto-updates when routes change |
| JavaScript accordion components | Native `<details>/<summary>` | Zero JS overhead, SSR-safe |
| Relative og:image paths | Absolute URL via site.url | Required for WhatsApp link previews |

---

## What Does Not Yet Exist (Phase 3 must create)

This is the critical inventory of gaps:

| Missing | Required By | Notes |
|---------|-------------|-------|
| `app/pages/assistencia-tecnica.vue` | SERV-01 | Full page with FAQ |
| `app/pages/acessorios.vue` | SERV-02 | No FAQ |
| `app/pages/aparelhos.vue` | SERV-03 | No FAQ |
| `app/components/FaqAccordion.vue` | SERV-01, SEO-03 | Presentational, details/summary approach |
| `app/components/ServiceHeroSection.vue` | SERV-04 | Simplified hero, distinct from HeroSection |
| `app/constants/faq.ts` | SERV-01, SEO-03 | FaqItem interface + FAQS.assistencia array |
| `public/og-image.jpg` | SEO-05 | Placeholder image, min 800x630px |
| ElectronicsRepair schema in `default.vue` | SEO-02 | Add useHead call to existing layout |
| Fix ogImage in `index.vue` to absolute URL | SEO-05 | Currently uses relative `/og-image.jpg` |

---

## Open Questions

1. **Real og-image asset**
   - What we know: `public/og-image.jpg` does not exist; all pages reference it
   - What's unclear: No brand assets have been provided by client yet
   - Recommendation: Create a simple programmatic placeholder (solid yellow rectangle with business name text, 800x630px) to unblock Phase 3. Replace in Phase 4 or when client provides brand assets.

2. **ServiceHeroSection — image or gradient?**
   - What we know: Real photos of the store/services are pending (STATE.md blockers — VIS-01 is v2)
   - What's unclear: Whether Phase 3 should use a placeholder image or a pure CSS/gradient hero
   - Recommendation: Use a dark gradient hero (no raster image) for service pages in Phase 3. This avoids a missing image file dependency and still satisfies PERF-05 (the requirement applies when an image IS used). If no image, there is no LCP image element — body text becomes LCP instead, which is acceptable at this stage.

3. **H1 city keyword format**
   - What we know: kapaki.md uses "Assistencia Tecnica de Celular em Tatui" (no hyphen in city name in H1)
   - What's unclear: Meta title uses "Tatui-SP" with hyphen
   - Recommendation: Follow kapaki.md exactly — H1 uses "em Tatui", meta title uses "em Tatui-SP | Kapaki"

---

## Sources

### Primary (HIGH confidence)
- Existing codebase: `app/pages/index.vue`, `app/composables/useWhatsApp.ts`, `app/layouts/default.vue`, `nuxt.config.ts`, `app.config.ts` — direct inspection
- kapaki.md section 9 — exact copy and H1 strings for each service page
- kapaki.md section 10 — LocalBusiness schema structure (adapted to ElectronicsRepair per PITFALLS.md)
- `.planning/research/ARCHITECTURE.md` Patterns 1-5 — composable and schema patterns
- `.planning/research/PITFALLS.md` Pitfall 3-5, 9, 11 — og:image URL, schema type, robots conflict

### Secondary (MEDIUM confidence)
- `.planning/research/STACK.md` — @nuxt/image Vercel provider, @nuxtjs/seo module list
- Nuxt 3 official docs — useServerSeoMeta, useHead, auto-imports (https://nuxt.com/docs/api/composables/use-seo-meta)
- schema.org FAQPage specification — mainEntity Question/Answer structure
- schema.org ElectronicsRepair — confirms it is a valid subtype of LocalBusiness

### Tertiary (LOW confidence)
- None — all key findings are backed by either official docs or direct codebase inspection.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all modules already installed and configured
- Architecture: HIGH — patterns established in Phases 1-2 and documented in ARCHITECTURE.md; service pages follow exact same conventions
- Pitfalls: HIGH — pitfalls sourced from existing PITFALLS.md research and direct code inspection (og:image bug in index.vue found)
- Schema patterns: HIGH — useHead JSON.stringify approach confirmed in ARCHITECTURE.md Pattern 2; ElectronicsRepair type confirmed in PITFALLS.md Pitfall 9

**Research date:** 2026-04-06
**Valid until:** 2026-05-06 (stable Nuxt 3 ecosystem; @nuxtjs/seo v5 is recent but API is stable)
