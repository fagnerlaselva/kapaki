<!-- GSD:project-start source:PROJECT.md -->
## Project

**Kapaki Tatui**

Site institucional + conversao para a Kapaki Tatui, loja fisica em Tatui-SP com tres frentes de negocio: acessorios para celular, assistencia tecnica e venda de aparelhos. O objetivo principal e transformar visitantes em contatos de WhatsApp e intencao de compra. Publico mobile-first, 18-45 anos, moradores de Tatui e regiao.

**Core Value:** Gerar leads via WhatsApp — cada pagina, cada CTA e cada decisao de design deve maximizar o numero de visitantes que iniciam uma conversa no WhatsApp da loja.

### Constraints

- **Stack**: Nuxt 3 + Tailwind CSS + TypeScript — definido, sem negociacao
- **Deploy**: Vercel com SSR (preset: vercel, NAO vercel-static)
- **SEO**: SSR obrigatorio para indexacao local no Google
- **Performance**: Lighthouse >= 90 mobile
- **Fontes**: Google Fonts (Inter + Poppins) com display=swap
- **Icones**: Lucide Icons ou Heroicons
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Framework (decided, no debate)
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Nuxt 3 | ^3.x latest | Full-stack Vue framework | SSR obrigatorio para indexacao de SEO local no Google. SPA nao indexa bem. |
| TypeScript | ^5.x | Type safety | Definido no projeto. Pega erros de props erradas em componentes de WhatsApp/schema. |
| Vite | bundled com Nuxt | Build tool | Bundled com Nuxt 3, sem configuracao extra. HMR rapido no desenvolvimento. |
### CSS Framework (decided, no debate)
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | v4.x | Utility-first CSS | Definido no projeto. v4 e a versao atual (lancada Jan 2025), mais rapida e sem arquivo config JS. |
| @tailwindcss/vite | latest | Plugin Vite para Tailwind v4 | Tailwind v4 integra via Vite plugin diretamente, NAO via @nuxtjs/tailwindcss (que tem problemas de compatibilidade com v4). |
| @tailwindcss/typography | latest | Classes prose para conteudo rico | Util para paginas de servico com conteudo HTML. Compativel com v4 via `@plugin` no CSS. |
### SEO — Nucleo (priority 1)
| Module | Version | Purpose | Why |
|--------|---------|---------|-----|
| `@nuxtjs/seo` | ^5.x | All-in-one SEO toolkit | Instala 6 modulos de uma vez: robots, sitemap, schema-org, og-image, link-checker, seo-utils. Versao 5.1.0 publicada 2 dias atras. Zero config para casos basicos. |
- `@nuxtjs/robots` ^6.x — gera `/robots.txt`, injeta meta robots e header X-Robots-Tag
- `@nuxtjs/sitemap` ^8.x — XML sitemap automatico baseado nas rotas do Nuxt
- `nuxt-schema-org` ^6.x — JSON-LD no `<body>`, suporte nativo a `LocalBusiness`, `FAQPage`, `WebPage`
- `nuxt-og-image` ^6.x — OG image gerenciada server-side (util para compartilhamento no WhatsApp)
- `nuxt-seo-utils` ^8.x — utilitarios como breadcrumb schema e canonical automatico
- `nuxt-site-config` ^4.x — configuracao central do site (url, nome, idioma)
### Fontes
| Module | Version | Purpose | Why |
|--------|---------|---------|-----|
| `@nuxt/fonts` | ^1.x | Auto self-hosting de fontes Google | Modulo oficial Nuxt. Baixa fontes (Inter + Poppins) em build time, serve localmente, adiciona font-metric fallbacks para reduzir CLS. NAO faz requisicao ao Google em runtime = melhor privacidade e performance. |
### Analytics
| Module | Version | Purpose | Why |
|--------|---------|---------|-----|
| `nuxt-gtag` | ^4.x (4.1.0 atual) | Google Analytics 4 via gtag.js | Zero dependencias externas, carrega client-side, suporta Google Consent Mode v2, SSR-safe. API tipada via `useGtag()`. Publicado ~dezembro 2025. |
### Imagens
| Module | Version | Purpose | Why |
|--------|---------|---------|-----|
| `@nuxt/image` | ^1.x (v2 estavel) | Otimizacao de imagens | Modulo oficial. No Vercel, usa automaticamente o CDN da Vercel para resize/optimize on demand. Gera `<img>` com `srcset`, `loading="lazy"`, formato WebP automatico. Critico para Lighthouse >= 90 mobile. |
### Icones
| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| `lucide-vue-next` | ^1.x (1.0.0 atual) | Icones SVG | Tree-shakable — apenas os icones importados entram no bundle. Versao 1.0.0 publicada recentemente. Nao usar modulo Nuxt wrapper (`nuxt-lucide-icons`) — o import direto e mais eficiente para bundle size. |
## Alternatives Considered
| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| CSS Framework | Tailwind CSS v4 via `@tailwindcss/vite` | `@nuxtjs/tailwindcss` com Tailwind v4 | Problemas de compatibilidade confirmados (PostCSS conflict) |
| CSS Framework | Tailwind CSS v4 | Tailwind CSS v3 | v4 e a versao atual; v3 seria divida tecnica imediata |
| SEO | `@nuxtjs/seo` (bundle) | Modulos individuais | Bundle garante versoes compativeis; adiciona site-config gratis |
| Fontes | `@nuxt/fonts` (oficial) | `@nuxtjs/google-fonts` | Sem fallback metrics no `@nuxtjs/google-fonts`; `@nuxt/fonts` e o padrao atual |
| Analytics | `nuxt-gtag` | `@nuxtjs/gtm` | GTM e overkill; `nuxt-gtag` e mais leve e direto |
| Analytics | `nuxt-gtag` | Script manual via `useHead` | `nuxt-gtag` adiciona SSR safety, Consent Mode v2, e API tipada sem esforco |
| Icones | `lucide-vue-next` (direto) | `nuxt-lucide-icons` (wrapper) | Import direto e mais eficiente; wrapper adiciona auto-import desnecessario |
| WhatsApp FAB | Componente Vue puro | Plugin de terceiro | Botao simples nao precisa de lib; `<LazyWhatsAppFab>` com lazy hydration e suficiente |
## Installation
# Core (Nuxt ja cria com o boilerplate)
# Tailwind CSS v4 via Vite (NAO usar @nuxtjs/tailwindcss)
# SEO all-in-one
# Fontes oficiais
# Analytics
# Imagens
# Icones (import direto, sem modulo wrapper)
## Confidence Assessment
| Area | Confidence | Notes |
|------|------------|-------|
| Core framework (Nuxt 3 + TypeScript) | HIGH | Definido no projeto; ecossistema maduro |
| Tailwind v4 via @tailwindcss/vite | HIGH | Documentacao oficial Tailwind; multiplos artigos confirmam essa e a abordagem correta em 2025 |
| @nuxtjs/seo v5 | HIGH | NPM mostra v5.1.0; site oficial confirma modulos incluidos |
| @nuxt/fonts | MEDIUM | Modulo oficial Nuxt, mas versao (0.7.x vs 1.x) nao foi verificada no npm com precisao |
| nuxt-gtag v4.1.0 | HIGH | NPM confirma versao e data de publicacao |
| @nuxt/image v2 | HIGH | Nuxt blog confirma v2 estavel; documentacao Vercel provider verificada |
| lucide-vue-next v1.0.0 | HIGH | NPM confirma versao 1.0.0 publicada recentemente |
| @tailwindcss/typography com v4 | HIGH | Documentacao oficial confirma suporte via `@plugin` no CSS |
## Sources
- [Nuxt SEO — All-in-one Technical SEO Toolkit](https://nuxtseo.com/)
- [Install Nuxt SEO](https://nuxtseo.com/docs/nuxt-seo/getting-started/installation)
- [Nuxt SEO v5 Release Notes](https://nuxtseo.com/docs/nuxt-seo/releases/v5)
- [nuxt-schema-org — LocalBusiness](https://nuxtseo.com/docs/schema-org/getting-started/introduction)
- [UnHead — LocalBusiness Schema API](https://unhead.unjs.io/docs/schema-org/api/schema/local-business)
- [@nuxt/fonts — Providers](https://fonts.nuxt.com/get-started/providers)
- [nuxt-gtag — npm](https://www.npmjs.com/package/nuxt-gtag)
- [nuxt-gtag — GitHub](https://github.com/johannschopplich/nuxt-gtag)
- [@nuxt/image — Vercel Provider](https://image.nuxt.com/providers/vercel)
- [Nuxt Image v2 blog post](https://nuxt.com/blog/nuxt-image-v2)
- [Install Tailwind CSS with Nuxt — Tailwind official docs](https://tailwindcss.com/docs/installation/framework-guides/nuxt)
- [Installing Tailwind CSS v4 on Nuxt 3](https://masteringnuxt.com/blog/installing-tailwind-css-v4-on-nuxt-3)
- [Integrating Tailwind CSS v4 with Vue and Nuxt](https://felixastner.com/articles/integrating-tailwind-css-v4-with-vue-and-nuxt-and-differences-from-v3)
- [@tailwindcss/typography — GitHub](https://github.com/tailwindlabs/tailwindcss-typography)
- [lucide-vue-next — npm](https://www.npmjs.com/package/lucide-vue-next)
- [Nuxt on Vercel — official docs](https://vercel.com/docs/frameworks/nuxt)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
