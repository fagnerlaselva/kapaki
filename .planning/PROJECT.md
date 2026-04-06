# Kapaki Tatui

## What This Is

Site institucional + conversao para a Kapaki Tatui, loja fisica em Tatui-SP com tres frentes de negocio: acessorios para celular, assistencia tecnica e venda de aparelhos. O objetivo principal e transformar visitantes em contatos de WhatsApp e intencao de compra. Publico mobile-first, 18-45 anos, moradores de Tatui e regiao.

## Core Value

Gerar leads via WhatsApp — cada pagina, cada CTA e cada decisao de design deve maximizar o numero de visitantes que iniciam uma conversa no WhatsApp da loja.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Pagina principal com todas as secoes (Hero, Servicos, Provas Sociais, Beneficios, CTA Final, Footer)
- [ ] Botoes WhatsApp com mensagens pre-preenchidas por servico
- [ ] FAB WhatsApp fixo (aparece apos scroll, funciona em mobile e desktop)
- [ ] 3 paginas de servico com copy e SEO unicos (/assistencia-tecnica, /acessorios, /aparelhos)
- [ ] Site 100% responsivo (mobile, tablet, desktop)
- [ ] SEO local: useSeoMeta em todas as paginas, schema LocalBusiness JSON-LD
- [ ] H1 e meta description unicos por pagina
- [ ] FAQ com schema markup nas paginas de servico
- [ ] Paleta dark (fundo #111111) com amarelo #F5C400 como cor de destaque
- [ ] Tipografia: Poppins (headings) + Inter (body)
- [ ] Lighthouse Performance >= 90 (mobile), SEO = 100
- [ ] Google Analytics 4 via gtag
- [ ] Deploy na Vercel com SSR (preset: vercel)

### Out of Scope

- E-commerce / carrinho de compras — foco e conversao via WhatsApp, nao venda online
- Blog / conteudo editorial — v1 focado em conversao direta
- Login / area do cliente — nao ha necessidade para o modelo de negocio atual
- Chat ao vivo no site — WhatsApp e o canal unico de atendimento
- Multi-idioma — publico 100% brasileiro e local

## Context

- Loja fisica em Tatui-SP, ja opera no dia a dia. O site e para captar mais clientes.
- Tres frentes: acessorios (capinhas, peliculas, etc.), assistencia tecnica (troca de tela, bateria, etc.), venda de aparelhos (novos e seminovos).
- Assistencia tecnica e o servico mais procurado — merece destaque visual (card maior, badge "Mais procurado").
- Dados reais (telefone, endereco, horarios, logo, dominio, GA4 ID) ainda pendentes — usar placeholders.
- Instagram: @loja_kapaki_tatui_
- Copy de todas as secoes ja definida no PRD.

## Constraints

- **Stack**: Nuxt 3 + Tailwind CSS + TypeScript — definido, sem negociacao
- **Deploy**: Vercel com SSR (preset: vercel, NAO vercel-static)
- **SEO**: SSR obrigatorio para indexacao local no Google
- **Performance**: Lighthouse >= 90 mobile
- **Fontes**: Google Fonts (Inter + Poppins) com display=swap
- **Icones**: Lucide Icons ou Heroicons

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Nuxt 3 com SSR | SEO local exige server-side rendering para indexacao | — Pending |
| WhatsApp como unico canal | Simplicidade, sem custo de integracao, loja ja usa WhatsApp | — Pending |
| Dark theme com amarelo | Identidade visual da marca ja estabelecida | — Pending |
| Sem e-commerce | Foco em leads, nao em transacao online | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-06 after initialization*
