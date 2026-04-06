# Phase 1: Fundacao - Research

**Researched:** 2026-04-06
**Domain:** Nuxt 3 project scaffolding — SSR configuration, Tailwind v4, fonts, icons, business data centralisation, WhatsApp composable
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SETUP-01 | Projeto Nuxt 3 configurado com SSR (nitro preset: vercel), Tailwind v4 via @tailwindcss/vite, TypeScript | nuxt.config.ts pattern + @tailwindcss/vite plugin verified via official Tailwind docs |
| SETUP-02 | Paleta de cores dark theme (#111111 fundo, #F5C400 amarelo destaque) configurada no Tailwind | Tailwind v4 CSS-variable theme pattern in main.css (no tailwind.config.js needed) |
| SETUP-03 | Tipografia Poppins (headings) + Inter (body) via @nuxt/fonts com self-hosting | @nuxt/fonts 0.14.0 confirmed; font-metric fallbacks built-in for CLS prevention |
| SETUP-04 | Dados de negocio centralizados em app.config.ts (WhatsApp, endereco, horarios) com placeholders | app.config.ts + defineAppConfig() pattern documented; type-inferred by Nuxt |
| SETUP-05 | Icones via lucide-vue-next configurados | lucide-vue-next 1.0.0 confirmed; tree-shakable direct import pattern |
| WA-01 | Composable useWhatsApp que gera links wa.me com encodeURIComponent e mensagens pre-preenchidas por servico | wa.me URL format + encodeURIComponent requirement verified; composable contract defined |

</phase_requirements>

---

## Summary

Phase 1 is a pure configuration and scaffolding phase — no UI components, no pages. The output is a Nuxt 3 project that boots correctly with SSR active, serves the two fonts without CLS, applies the dark theme palette, exposes typed business constants, and provides a verified WhatsApp URL composable.

The most important decision already locked is Tailwind v4 via `@tailwindcss/vite` (not `@nuxtjs/tailwindcss`). This changes how the theme is defined: v4 uses CSS custom properties in a `.css` file, not a `tailwind.config.js`. The palette (`#111111`, `#F5C400`) is declared once in `assets/css/main.css` using the `@theme` directive. No JavaScript config file is involved.

`@nuxt/fonts` (version 0.14.0 as of 2026-04-06) is the official module and handles self-hosting automatically — it downloads Poppins and Inter at build time and injects `font-face` rules with size-adjusted fallbacks to prevent CLS. No manual font download or `@font-face` declarations needed.

**Primary recommendation:** Bootstrap the project with `npx nuxi@latest init`, install dependencies in one command, write `nuxt.config.ts`, `app.config.ts`, `assets/css/main.css`, and `composables/useWhatsApp.ts`. Verify SSR with `curl` before ending the phase.

---

## Standard Stack

### Core (verified versions as of 2026-04-06)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| nuxt | 4.4.2 | Full-stack Vue SSR framework | Locked by project constraints |
| typescript | ^5.x (bundled) | Type safety | Enabled by default in Nuxt 3 init |
| tailwindcss | 4.2.2 | Utility-first CSS | Locked — v4 is current stable |
| @tailwindcss/vite | 4.2.2 | Vite plugin that integrates Tailwind v4 | Only correct integration path for Tailwind v4 + Nuxt 3 |
| @tailwindcss/typography | 0.5.19 | `prose` classes for rich HTML content | Needed for service pages (Phase 3); install now, activate later |
| @nuxt/fonts | 0.14.0 | Self-hosted Google Fonts with CLS prevention | Official Nuxt module; builds font-metric fallbacks automatically |
| @nuxtjs/seo | 5.1.0 | All-in-one SEO toolkit (robots, sitemap, schema-org, og-image) | Installs 6 SEO modules with compatible versions; needed from Phase 3 but configured now |
| lucide-vue-next | 1.0.0 | SVG icon library | Tree-shakable; import only what is used |

> Version verification: all versions confirmed via `npm view [package] version` on 2026-04-06.

### Installation

```bash
# 1. Create project (if starting fresh)
npx nuxi@latest init kapaki-tatui --package-manager npm

# 2. Tailwind v4 via Vite (NOT @nuxtjs/tailwindcss)
npm install tailwindcss @tailwindcss/vite @tailwindcss/typography

# 3. SEO all-in-one (adds @nuxtjs/seo to modules automatically)
npx nuxi module add @nuxtjs/seo

# 4. Official fonts module
npx nuxi module add @nuxt/fonts

# 5. Image optimisation (needed Phase 3, configure now)
npx nuxi module add @nuxt/image

# 6. Icons (direct import — no Nuxt wrapper)
npm install lucide-vue-next
```

**Do NOT install:** `@nuxtjs/tailwindcss`, `@nuxtjs/google-fonts`, `nuxt-lucide-icons`

---

## Architecture Patterns

### Recommended Project Structure

```
kapaki/
  nuxt.config.ts          # SSR preset, modules, fonts, site URL, image screens
  app.config.ts           # Business data: whatsapp, phone, address, hours, instagram
  app.vue                 # Root: <NuxtLayout> + <NuxtPage> only (no WhatsAppFab yet)
  assets/
    css/
      main.css            # @import "tailwindcss"; @theme { ... }; @plugin typography
  composables/
    useWhatsApp.ts        # wa.me URL builder with encodeURIComponent
  layouts/
    default.vue           # Slot only — AppFooter added in Phase 2
  pages/
    index.vue             # Placeholder page to confirm SSR works
```

Phase 1 deliberately does NOT create section components, the footer, or page content. Those belong to Phase 2. This phase ends when `npm run dev` shows SSR-rendered HTML and the composable is tested.

### Pattern 1: Tailwind v4 Theme via CSS Custom Properties

**What:** In Tailwind v4 there is no `tailwind.config.js`. The theme (colors, fonts) is declared in the CSS file using the `@theme` directive.

**When to use:** Always with Tailwind v4.

```css
/* assets/css/main.css */
@import "tailwindcss";

@theme {
  /* Dark theme palette */
  --color-background: #111111;
  --color-primary: #F5C400;
  --color-primary-hover: #D4A800;
  --color-text: #FFFFFF;
  --color-text-muted: #A1A1AA;

  /* Typography */
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
}

@plugin "@tailwindcss/typography";
```

These CSS variables become Tailwind utility classes automatically: `bg-background`, `text-primary`, `font-heading`, `font-body`.

### Pattern 2: nuxt.config.ts with All Phase 1 Configuration

```typescript
// nuxt.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  // CRITICAL: 'vercel' enables SSR — never 'vercel-static'
  nitro: {
    preset: 'vercel',
  },

  modules: [
    '@nuxtjs/seo',
    '@nuxt/fonts',
    '@nuxt/image',
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  // @nuxt/fonts: self-hosts Inter + Poppins at build time
  fonts: {
    families: [
      { name: 'Inter', weights: [400, 500] },
      { name: 'Poppins', weights: [600, 700, 800] },
    ],
  },

  // nuxt-site-config (included in @nuxtjs/seo): canonical + sitemap base URL
  site: {
    url: 'https://kapaki.com.br', // PLACEHOLDER — replace with real domain
    name: 'Kapaki Tatui',
    description: 'Acessorios, assistencia tecnica e aparelhos em Tatui-SP',
    defaultLocale: 'pt-BR',
  },

  // @nuxt/image: declare all breakpoint widths used by <NuxtImg>
  image: {
    screens: { sm: 640, md: 768, lg: 1024, xl: 1280 },
  },

  // Link Tailwind CSS globally
  css: ['~/assets/css/main.css'],
})
```

### Pattern 3: app.config.ts for Business Constants

**What:** All real-world business data lives here. Components access it via `useAppConfig()`.

**When to use:** Any value that appears in more than one place (phone, address, hours, WhatsApp number).

```typescript
// app.config.ts
export default defineAppConfig({
  siteName: 'Kapaki Tatui',

  // WhatsApp: digits only, country code + area code, no spaces or symbols
  // Format: 55 (Brazil) + 15 (Tatui area code) + 9-digit number
  whatsapp: '5515XXXXXXXXX', // PLACEHOLDER — replace with real number

  phone: '(15) XXXX-XXXX', // PLACEHOLDER — display format for humans

  address: {
    street: 'Rua PLACEHOLDER, NNN',
    city: 'Tatui',
    state: 'SP',
    zip: 'XX.XXX-XXX',
    country: 'BR',
  },

  instagram: '@kapaki_tatui', // PLACEHOLDER — confirm real handle

  hours: 'Seg-Sex 9h-18h, Sab 9h-13h', // PLACEHOLDER — confirm with client
})
```

**Type safety:** Nuxt auto-infers types from `defineAppConfig()`. No manual interface needed.

### Pattern 4: useWhatsApp Composable

**What:** Single source of truth for all wa.me links. Called in pages, never inside section components.

**Contract:**
- Input: service key (`'assistencia' | 'acessorios' | 'aparelhos' | 'geral'`)
- Output: `{ whatsappUrl: string }` — a fully encoded `https://wa.me/...` URL

```typescript
// composables/useWhatsApp.ts

type ServiceKey = 'assistencia' | 'acessorios' | 'aparelhos' | 'geral'

const MESSAGES: Record<ServiceKey, string> = {
  assistencia: 'Ola! Preciso de assistencia tecnica para meu celular.',
  acessorios: 'Ola! Tenho interesse em acessorios para celular.',
  aparelhos: 'Ola! Quero saber sobre aparelhos disponiveis.',
  geral: 'Ola! Gostaria de mais informacoes sobre a Kapaki Tatui.',
}

export function useWhatsApp(service: ServiceKey = 'geral') {
  const config = useAppConfig()
  const phone = config.whatsapp // digits only, no spaces
  const message = MESSAGES[service]
  const encoded = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phone}?text=${encoded}`

  return { whatsappUrl }
}
```

**Critical:** `encodeURIComponent` is mandatory. Spaces and special characters in the `text` parameter break the link on some devices and WhatsApp Web without it.

### Pattern 5: Placeholder index.vue for SSR Verification

Phase 1 creates a minimal `pages/index.vue` solely to verify SSR is working. It does not contain real content.

```vue
<!-- pages/index.vue — Phase 1 placeholder only -->
<template>
  <div class="min-h-screen bg-background text-text p-8">
    <h1 class="font-heading text-4xl text-primary">Kapaki Tatui</h1>
    <p class="font-body mt-4">Fundacao configurada com sucesso.</p>
  </div>
</template>
```

This page verifies: (1) Tailwind classes resolve, (2) custom theme colors apply, (3) fonts load, (4) SSR renders HTML server-side.

### Anti-Patterns to Avoid

- **Using `@nuxtjs/tailwindcss` with Tailwind v4:** Creates PostCSS conflicts. The only correct integration is `@tailwindcss/vite` as a Vite plugin.
- **Using `tailwind.config.js` with Tailwind v4:** Not how v4 works. Theme lives in CSS via `@theme {}`.
- **Using `@nuxtjs/google-fonts` instead of `@nuxt/fonts`:** The community module lacks font-metric fallbacks, causing CLS. Use the official module.
- **`nitro.preset: 'vercel-static'`:** Disables SSR entirely. Schema JSON-LD and meta tags rendered server-side will not be in the HTML delivered to crawlers.
- **Hardcoding the WhatsApp number in components:** Single change requires touching multiple files. Always read from `useAppConfig().whatsapp`.
- **Skipping `encodeURIComponent` in WhatsApp URLs:** Links silently break on some devices. Always encode.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font self-hosting with CLS prevention | Custom `@font-face` with fallback tuning | `@nuxt/fonts` | Font-metric fallback calculation is non-trivial; module handles it automatically |
| WhatsApp URL with encoded message | Custom string concatenation per component | `useWhatsApp()` composable | Single point of change for phone number and messages; encodes consistently |
| Google Fonts CSS injection | Manual `<link>` tags in `<head>` | `@nuxt/fonts` | Manual links hit Google's servers at runtime; module converts to local self-hosted files |
| Robots.txt and sitemap generation | Manual static files in `public/` | `@nuxtjs/seo` (includes `@nuxtjs/robots` + `@nuxtjs/sitemap`) | Manual files conflict with the module; sitemap generation from Nuxt routes is automatic |
| Tailwind v4 config in JavaScript | `tailwind.config.js` with `theme.extend` | `@theme {}` block in `main.css` | v4 dropped JS config; CSS-first is the only supported path |

**Key insight:** Phase 1 is configuration, not custom code. Every listed dependency solves a problem the team would otherwise hand-roll incorrectly on first attempt.

---

## Common Pitfalls

### Pitfall 1: nitro preset 'vercel-static' instead of 'vercel'

**What goes wrong:** Site becomes a static export. Schema JSON-LD, meta tags, and canonical links are pre-rendered at build time only. Subsequent content changes are invisible to crawlers until the next deploy. `curl https://domain.com` returns an empty HTML shell with `<div id="__nuxt"></div>`.

**Why it happens:** Documentation lists both presets as valid options. Developers familiar with Next.js "static export" assume static is acceptable for a small site.

**How to avoid:** Always set `nitro: { preset: 'vercel' }` explicitly. Never omit the preset.

**Warning signs:** After deploy, `curl https://domain.com | grep "application/ld+json"` returns nothing.

### Pitfall 2: Tailwind v4 CSS not loaded globally

**What goes wrong:** Tailwind utility classes appear in templates but render with no effect. No error — just unstyled page.

**Why it happens:** Developers add `@tailwindcss/vite` to `vite.plugins` but forget to add `css: ['~/assets/css/main.css']` in `nuxt.config.ts`, or forget to add `@import "tailwindcss"` at the top of `main.css`.

**How to avoid:** Confirm both: (1) `css: ['~/assets/css/main.css']` in `nuxt.config.ts`, and (2) `@import "tailwindcss";` as the first line of `main.css`.

**Warning signs:** `bg-background` class applied to `<div>` in DevTools but background is white/default.

### Pitfall 3: @nuxt/fonts not downloading at build time

**What goes wrong:** Module is installed but fonts are still fetched from `fonts.googleapis.com` at runtime, defeating the self-hosting purpose and creating privacy/performance issues.

**Why it happens:** The `families` array in `fonts` config uses font names that do not exactly match Google Fonts names, or the module is not listed in `modules[]`.

**How to avoid:** Font names must match exactly: `'Inter'` and `'Poppins'` (capital first letter, exact spelling as in Google Fonts). Verify the module is in `modules: ['@nuxt/fonts']`.

**Warning signs:** Network tab in DevTools shows requests to `fonts.googleapis.com` or `fonts.gstatic.com` during page load.

### Pitfall 4: WhatsApp URL with unencoded message text

**What goes wrong:** Link works in Chrome on developer's device but fails silently on WhatsApp Web, iOS, or older Android versions. The user taps the button and nothing opens, or WhatsApp opens without the pre-filled message.

**Why it happens:** Characters like `!`, `?`, spaces, and accented letters in the message break the query string when not encoded. Testing on a single device is insufficient.

**How to avoid:** Always `encodeURIComponent(message)` before appending to the URL. Test on Android Chrome, iOS Safari, and WhatsApp Web.

**Warning signs:** Message pre-fill is missing or truncated when opening WhatsApp from the link.

### Pitfall 5: app.config.ts values not accessible with correct type

**What goes wrong:** `useAppConfig()` returns `any`, making typos in property names invisible at compile time.

**Why it happens:** `defineAppConfig()` infers types automatically, but only if the file is syntactically correct TypeScript. A subtle syntax error or misuse of `as const` can break inference.

**How to avoid:** After writing `app.config.ts`, verify in a `.vue` file: `const config = useAppConfig(); config.whatsapp` should show autocompletion. If it shows `any`, the inference failed.

**Warning signs:** `config.whatsapp` autocompletes but shows type `any` in IDE.

---

## Code Examples

### Tailwind v4 Theme Declaration
```css
/* assets/css/main.css */
/* Source: https://tailwindcss.com/docs/theme */

@import "tailwindcss";

@theme {
  --color-background: #111111;
  --color-primary: #F5C400;
  --color-primary-hover: #D4A800;
  --color-surface: #1C1C1C;
  --color-text: #FFFFFF;
  --color-text-muted: #A1A1AA;
  --color-whatsapp: #25D366;

  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
}

@plugin "@tailwindcss/typography";
```

### nuxt.config.ts Minimum Valid for Phase 1
```typescript
// nuxt.config.ts
// Source: https://tailwindcss.com/docs/installation/framework-guides/nuxt
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  nitro: {
    preset: 'vercel', // SSR — never 'vercel-static'
  },

  modules: [
    '@nuxtjs/seo',
    '@nuxt/fonts',
    '@nuxt/image',
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['~/assets/css/main.css'],

  fonts: {
    families: [
      { name: 'Inter', weights: [400, 500] },
      { name: 'Poppins', weights: [600, 700, 800] },
    ],
  },

  site: {
    url: 'https://kapaki.com.br', // PLACEHOLDER
    name: 'Kapaki Tatui',
    description: 'Acessorios, assistencia tecnica e aparelhos em Tatui-SP',
    defaultLocale: 'pt-BR',
  },

  image: {
    screens: { sm: 640, md: 768, lg: 1024, xl: 1280 },
  },
})
```

### useWhatsApp Composable (Full)
```typescript
// composables/useWhatsApp.ts

type ServiceKey = 'assistencia' | 'acessorios' | 'aparelhos' | 'geral'

const MESSAGES: Record<ServiceKey, string> = {
  assistencia: 'Ola! Preciso de assistencia tecnica para meu celular.',
  acessorios: 'Ola! Tenho interesse em acessorios para celular.',
  aparelhos: 'Ola! Quero saber sobre aparelhos disponiveis.',
  geral: 'Ola! Gostaria de mais informacoes sobre a Kapaki Tatui.',
}

export function useWhatsApp(service: ServiceKey = 'geral') {
  const config = useAppConfig()
  const phone = config.whatsapp as string
  const message = MESSAGES[service]
  const encoded = encodeURIComponent(message)

  return {
    whatsappUrl: `https://wa.me/${phone}?text=${encoded}`,
  }
}
```

### lucide-vue-next Usage (Direct Import Pattern)
```vue
<!-- Any component — import only what is used; tree-shaking removes the rest -->
<script setup lang="ts">
import { Phone, MapPin, Clock, Wrench, Package, Smartphone } from 'lucide-vue-next'
</script>

<template>
  <Phone class="size-5 text-primary" />
  <MapPin class="size-5 text-primary" />
</template>
```

### SSR Verification After Setup
```bash
# After 'npm run dev' is running:
curl -s http://localhost:3000 | grep -o '<title>[^<]*</title>'
# Expected: <title>Kapaki Tatui</title>

curl -s http://localhost:3000 | grep 'font-family'
# Should show Poppins/Inter in injected styles

# After Vercel deploy:
curl -s https://your-preview.vercel.app | grep 'application/ld+json'
# Must return something — if empty, preset is wrong
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` with `theme.extend` | `@theme {}` block in CSS | Tailwind v4 (Jan 2025) | No JS config file needed; variables are real CSS custom properties |
| `@nuxtjs/tailwindcss` module | `@tailwindcss/vite` as Vite plugin | Tailwind v4 (Jan 2025) | Community module has PostCSS conflicts with v4 |
| `@nuxtjs/google-fonts` | `@nuxt/fonts` (official) | Nuxt 2024-2025 | Official module adds font-metric fallbacks for CLS; community module does not |
| Separate SEO modules | `@nuxtjs/seo` v5 bundle | Early 2025 | Six modules installed together with version-compatible guarantees |

**Deprecated/outdated:**
- `@nuxtjs/tailwindcss` with Tailwind v4: Known conflicts, do not use
- `tailwind.config.js` for v4 projects: Replaced by CSS-first `@theme`
- `@nuxtjs/google-fonts`: Superseded by `@nuxt/fonts` for new projects

---

## Open Questions

1. **Real WhatsApp number and business data**
   - What we know: Placeholders are expected; client has not provided final NAP data
   - What's unclear: Whether the number uses +55 15 9... (9-digit) or 8-digit format
   - Recommendation: Use explicit placeholder string `'5515XXXXXXXXX'` that clearly needs replacement; add a comment in `app.config.ts` documenting the format expected

2. **Production domain**
   - What we know: Domain is pending; `https://kapaki.com.br` used as placeholder in `site.url`
   - What's unclear: Whether the domain will be `.com.br` or another TLD
   - Recommendation: The placeholder must be in `site.url` in `nuxt.config.ts` from day one (it drives sitemap and canonical). Update as soon as real domain is confirmed. Phase 3 validation depends on this.

3. **Whether the Nuxt project already exists or must be initialised**
   - What we know: The repo has only `CLAUDE.md`, `README.md`, `kapaki.md` — no `package.json`, no `nuxt.config.ts`
   - What's unclear: Whether to run `nuxi init` (creates new project) or add Nuxt to existing directory
   - Recommendation: Run `npx nuxi@latest init . --package-manager npm` in the repo root to scaffold into the existing directory; this creates `package.json`, `nuxt.config.ts`, `app.vue`, and base structure

---

## Validation Architecture

### Test Framework

Phase 1 is infrastructure/configuration only. There are no business logic units testable with automated tests at this stage. The validation is observational and command-based.

| Property | Value |
|----------|-------|
| Framework | None — Phase 1 has no unit-testable code; validation is CLI + browser |
| Config file | N/A |
| Quick run command | `npm run dev` (verify no boot errors) |
| Full suite command | `curl -s http://localhost:3000 \| grep 'Kapaki'` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | Notes |
|--------|----------|-----------|-------------------|-------|
| SETUP-01 | SSR renders HTML server-side | smoke | `curl -s http://localhost:3000 \| grep '</html>'` | Must return full HTML, not blank |
| SETUP-01 | nitro preset is 'vercel' | config check | `grep "preset: 'vercel'" nuxt.config.ts` | Literal string check |
| SETUP-02 | Dark theme colors in CSS output | smoke | `curl -s http://localhost:3000 \| grep '#111111'` | Color in `<style>` injected by Nuxt |
| SETUP-03 | Fonts declared in CSS | smoke | `curl -s http://localhost:3000 \| grep 'Poppins'` | Should appear in `<style>` or `<link>` |
| SETUP-04 | app.config.ts accessible | manual | `console.log(useAppConfig())` in placeholder page | Visual inspection in browser console |
| SETUP-05 | lucide-vue-next importable | manual | Import `Phone` icon in placeholder page; verify render | Visual inspection |
| WA-01 | useWhatsApp returns valid wa.me URL | manual | Call `useWhatsApp('assistencia')` and log result | URL must start with `https://wa.me/5515` and contain encoded text |

### Wave 0 Gaps

No automated test framework is needed for Phase 1. All validations are smoke tests via `curl` and manual browser inspection. No test files to create.

---

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS — Install with Nuxt (official)](https://tailwindcss.com/docs/installation/framework-guides/nuxt) — @tailwindcss/vite integration pattern
- [Tailwind CSS v4 — Theme configuration](https://tailwindcss.com/docs/theme) — @theme CSS directive
- [Nuxt SEO — Installation](https://nuxtseo.com/docs/nuxt-seo/getting-started/installation) — @nuxtjs/seo v5 confirmed
- [@nuxt/fonts — Getting started](https://fonts.nuxt.com/get-started/providers) — self-hosting pattern
- [Nuxt on Vercel — official docs](https://vercel.com/docs/frameworks/nuxt) — preset: 'vercel' requirement
- [Nuxt 3 — app.config.ts](https://nuxt.com/docs/guide/directory-structure/app-config) — defineAppConfig pattern
- npm registry: nuxt@4.4.2, tailwindcss@4.2.2, @tailwindcss/vite@4.2.2, @nuxt/fonts@0.14.0, lucide-vue-next@1.0.0, @nuxtjs/seo@5.1.0, @tailwindcss/typography@0.5.19 — version verification 2026-04-06

### Secondary (MEDIUM confidence)
- [Installing Tailwind CSS v4 on Nuxt 3](https://masteringnuxt.com/blog/installing-tailwind-css-v4-on-nuxt-3) — confirmed @tailwindcss/vite pattern, no @nuxtjs/tailwindcss
- [Integrating Tailwind CSS v4 with Vue and Nuxt](https://felixastner.com/articles/integrating-tailwind-css-v4-with-vue-and-nuxt-and-differences-from-v3) — v4 CSS-first theme confirmed

### Tertiary (LOW confidence — informational only)
- [wa.me link format — BusinessChat Help](https://help.businesschat.io/en/articles/6517838-how-to-build-a-whatsapp-click-to-chat-url-wa-me) — wa.me URL structure with encoded text parameter

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all package versions verified via npm registry on 2026-04-06
- Architecture: HIGH — patterns from official Nuxt docs; app.config.ts and composable contracts match project research
- Pitfalls: HIGH — verified against official Tailwind v4 migration notes, Nuxt docs, and Vercel deployment docs
- Validation: HIGH — smoke tests are simple curl commands; no framework-specific risk

**Research date:** 2026-04-06
**Valid until:** 2026-05-06 (Tailwind v4 and Nuxt 4.x are stable; @nuxt/fonts minor versions may update)
