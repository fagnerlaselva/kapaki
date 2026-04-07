# Kapaki Tatui

## What This Is

Site institucional de conversao para a Kapaki Tatui, loja fisica em Tatui-SP. Quatro paginas (homepage + 3 servicos), 8 CTAs WhatsApp com mensagens pre-preenchidas, SEO local com schema ElectronicsRepair/FAQPage, GA4 com tracking de todos os botoes. Stack: Nuxt 3 + Tailwind v4 + TypeScript, SSR na Vercel.

## Core Value

Gerar leads via WhatsApp — cada pagina, cada CTA e cada decisao de design deve maximizar o numero de visitantes que iniciam uma conversa no WhatsApp da loja.

## Requirements

### Validated

- ✓ Projeto Nuxt 3 com SSR (Vercel preset), Tailwind v4, TypeScript — v1.0
- ✓ Paleta dark (#111111/#F5C400) configurada no Tailwind — v1.0
- ✓ Tipografia Poppins + Inter via @nuxt/fonts com self-hosting — v1.0
- ✓ Dados de negocio centralizados em app.config.ts — v1.0
- ✓ Icones via lucide-vue-next — v1.0
- ✓ Composable useWhatsApp com encodeURIComponent — v1.0
- ✓ Homepage completa (Hero, Servicos, Provas Sociais, Beneficios, CTA Final, Footer) — v1.0
- ✓ Botoes WhatsApp com mensagens pre-preenchidas por servico — v1.0
- ✓ FAB WhatsApp fixo com scroll detection — v1.0
- ✓ CTA final amarelo full-width — v1.0
- ✓ Site responsivo mobile-first — v1.0
- ✓ 3 paginas de servico com copy e SEO unicos — v1.0
- ✓ SEO local: useServerSeoMeta, schema ElectronicsRepair JSON-LD — v1.0
- ✓ H1 e meta description unicos por pagina — v1.0
- ✓ FAQ com schema FAQPage na assistencia tecnica — v1.0
- ✓ Google Analytics 4 via nuxt-gtag (SSR-safe) — v1.0
- ✓ Eventos customizados GA4 em todos os botoes — v1.0

### Active

(None — v1.0 complete. Define next milestone for new requirements.)

### Out of Scope

- E-commerce / carrinho de compras — foco e conversao via WhatsApp, nao venda online
- Blog / conteudo editorial — v1 focado em conversao direta
- Login / area do cliente — nao ha necessidade para o modelo de negocio atual
- Chat ao vivo no site — WhatsApp e o canal unico de atendimento
- Multi-idioma — publico 100% brasileiro e local

## Context

Shipped v1.0 com ~900 LOC TypeScript/Vue.
Stack: Nuxt 3 (v4.4.2), Tailwind v4, @nuxtjs/seo v5, @nuxt/fonts, nuxt-gtag, lucide-vue-next.
4 paginas, 8 componentes, 8 eventos GA4, schema ElectronicsRepair + FAQPage.
Instagram: @loja_kapaki_tatui_
Dados pendentes para lancamento: telefone, endereco, horarios, GA4 ID, dominio.

## Constraints

- **Stack**: Nuxt 3 + Tailwind CSS + TypeScript
- **Deploy**: Vercel com SSR (preset: vercel)
- **SEO**: SSR obrigatorio para indexacao local no Google
- **Performance**: Lighthouse >= 90 mobile
- **Fontes**: Google Fonts (Inter + Poppins) self-hosted via @nuxt/fonts

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Nuxt 3 com SSR | SEO local exige server-side rendering | ✓ Good |
| WhatsApp como unico canal | Simplicidade, loja ja usa WhatsApp | ✓ Good |
| Dark theme com amarelo | Identidade visual da marca | ✓ Good |
| Sem e-commerce | Foco em leads, nao em transacao online | ✓ Good |
| Tailwind v4 via @tailwindcss/vite | @nuxtjs/tailwindcss tem conflitos com v4 | ✓ Good |
| useServerSeoMeta (nao useSeoMeta) | Reduz JS no client, meta tags sao estaticas | ✓ Good |
| ElectronicsRepair (nao LocalBusiness) | Schema mais especifico, melhor ranking local | ✓ Good |
| og:image URL absoluta | Necessario para preview no WhatsApp | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition:**
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone:**
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-07 after v1.0 milestone*
