# Milestones

## v1.0 MVP Kapaki Tatui (Shipped: 2026-04-07)

**Phases completed:** 4 phases, 9 plans, 14 tasks

**Key accomplishments:**

- Nuxt 3 project bootstrapped with SSR (nitro preset vercel), Tailwind v4 via @tailwindcss/vite with dark palette (#111111/#F5C400), and self-hosted Poppins+Inter fonts via @nuxt/fonts
- app.config.ts + useWhatsApp composable + Nuxt 4 placeholder page with dark theme, Lucide icons, and encoded wa.me URLs verified via production build
- One-liner:
- One-liner:
- Complete homepage wiring all 5 sections (Hero, Servicos, ProvasSociais, Beneficios, CtaFinal) with 4 service-specific WhatsApp URLs, SSR SEO meta, and smooth scroll CSS
- Three local-SEO service pages with unique H1s, useServerSeoMeta, WhatsApp CTAs, and FAQPage JSON-LD schema (assistencia-tecnica only) targeting Tatui-SP keywords
- nuxt-gtag module wired with NUXT_PUBLIC_GA_ID env var and 8 custom events across 6 components tracking all WhatsApp CTAs, Ver Servicos, and Instagram footer link
- gtag async loading + explicit lang="pt-BR" added to nuxt.config.ts; production build clean with htmlAttrs confirmed in SSR renderer; Lighthouse code audit passed all checkable items

---
