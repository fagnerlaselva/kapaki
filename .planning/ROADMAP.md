# Roadmap: Kapaki Tatui

## Overview

Quatro fases entregam um site institucional completo de conversao para WhatsApp: fundacao tecnica com SSR e dados centralizados, homepage com todos os componentes de conversao, paginas de servico com SEO local completo, e finalizacao com analytics e validacao de lancamento.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Fundacao** - Projeto Nuxt 3 configurado com SSR, Tailwind v4, fontes, icones, dados do negocio centralizados e composables WhatsApp/SEO/scroll (completed 2026-04-06)
- [x] **Phase 2: Homepage** - Pagina principal completa com todas as secoes, FAB WhatsApp funcional e site 100% responsivo (completed 2026-04-06)
- [x] **Phase 3: Paginas de Servico** - Tres paginas de servico com H1 local, FAQ schema e SEO local completo (completed 2026-04-07)
- [ ] **Phase 4: Analytics e Lancamento** - GA4 integrado, Lighthouse >= 90, validacao SEO e deploy Vercel verificado

## Phase Details

### Phase 1: Fundacao
**Goal**: Projeto configurado com todas as decisoes de infraestrutura corretas antes de qualquer componente ser construido
**Depends on**: Nothing (first phase)
**Requirements**: SETUP-01, SETUP-02, SETUP-03, SETUP-04, SETUP-05, WA-01
**Success Criteria** (what must be TRUE):
  1. `npm run dev` executa sem erros e serve o projeto com SSR ativo (HTML renderizado no servidor, nao blank page)
  2. O preset `vercel` esta configurado em `nuxt.config.ts` e um `curl` no deploy de staging retorna HTML com meta tags (nao JS vazio)
  3. Dados do negocio (WhatsApp, endereco, horarios) existem em `app.config.ts` e um `console.log` os exibe sem hardcode espalhado no codigo
  4. `useWhatsApp('assistencia')` gera um link `wa.me` valido com mensagem pre-preenchida encodada corretamente
  5. A paleta dark (#111111 fundo, #F5C400 amarelo) e as fontes Poppins + Inter carregam sem CLS visivel
**Plans:** 2/2 plans complete
Plans:
- [x] 01-01-PLAN.md — Scaffold Nuxt 3, install deps, configure nuxt.config.ts + Tailwind v4 theme
- [x] 01-02-PLAN.md — Business data (app.config.ts), WhatsApp composable, placeholder page + SSR verification

### Phase 2: Homepage
**Goal**: Visitante chega ao site e ve a homepage completa — todas as secoes, botoes WhatsApp funcionais e FAB visivel apos scroll
**Depends on**: Phase 1
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, WA-02, WA-03, WA-04, PERF-01
**Success Criteria** (what must be TRUE):
  1. A homepage exibe Hero, Servicos (com badge "Mais procurado" em assistencia tecnica), Provas Sociais, Beneficios, CTA Final e Footer em sequencia correta
  2. Clicar em qualquer botao WhatsApp abre o aplicativo com a mensagem pre-preenchida especifica daquele servico ou secao
  3. O FAB WhatsApp nao aparece no topo da pagina, mas aparece fixo no canto inferior direito apos o usuario rolar a pagina
  4. O site e legivel e utilizavel em tela de 375px (iPhone SE), 768px (tablet) e 1280px (desktop) sem quebras de layout
**Plans:** 3/3 plans complete
Plans:
- [x] 02-01-PLAN.md — Constants data, useScrollThreshold composable, atomic sections (Hero, ProvasSociais, Beneficios, CtaFinal), WhatsAppFab + app.vue
- [x] 02-02-PLAN.md — ServiceCard, ServicosSection, AppFooter + default.vue layout update
- [x] 02-03-PLAN.md — Assemble index.vue homepage with all sections, SEO meta, smooth scroll + visual checkpoint

### Phase 3: Paginas de Servico
**Goal**: As tres paginas de servico estao no ar com conteudo unico, FAQ com schema markup e CTAs WhatsApp distintos por servico
**Depends on**: Phase 2
**Requirements**: SERV-01, SERV-02, SERV-03, SERV-04, SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, PERF-04, PERF-05
**Success Criteria** (what must be TRUE):
  1. Cada uma das tres URLs (/assistencia-tecnica, /acessorios, /aparelhos) retorna uma pagina com H1 unico contendo keyword local (ex: "Assistencia Tecnica de Celular em Tatui")
  2. O Google Rich Results Test valida schema `FAQPage` em pelo menos uma pagina de servico sem erros criticos
  3. `curl` em qualquer URL retorna `<script type="application/ld+json">` com schema `ElectronicsRepair` no HTML (SSR confirmado)
  4. O sitemap.xml e robots.txt existem e estao acessiveis em producao
  5. A og:image de cada pagina usa URL absoluta e renderiza preview correto ao colar o link no WhatsApp Web
**Plans:** 2/2 plans complete
Plans:
- [x] 03-01-PLAN.md — Shared components (ServiceHeroSection, FaqAccordion, faq.ts), og-image placeholder, ElectronicsRepair schema in default.vue, fix index.vue og:image
- [x] 03-02-PLAN.md — Three service pages (assistencia-tecnica, acessorios, aparelhos) with SEO meta, FAQ schema, sitemap/robots verification

### Phase 4: Analytics e Lancamento
**Goal**: O site esta em producao com rastreamento de conversoes ativo e pontuacoes Lighthouse validadas
**Depends on**: Phase 3
**Requirements**: ANAL-01, ANAL-02, PERF-02, PERF-03
**Success Criteria** (what must be TRUE):
  1. O Google Analytics 4 registra pageviews em tempo real sem erros no console e sem chamadas de rede para o GA originadas do servidor
  2. Clicar em um botao WhatsApp dispara um evento customizado visivel no GA4 DebugView
  3. O Lighthouse mobile da homepage retorna Performance >= 90 e SEO = 100
**Plans:** 2 plans
Plans:
- [x] 04-01-PLAN.md — Install nuxt-gtag, configure GA4 with env var, add custom event tracking to all 6 interactive components
- [ ] 04-02-PLAN.md — Lighthouse audit, performance/SEO score verification, human checkpoint for GA4 events

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Fundacao | 2/2 | Complete   | 2026-04-06 |
| 2. Homepage | 3/3 | Complete   | 2026-04-06 |
| 3. Paginas de Servico | 2/2 | Complete   | 2026-04-07 |
| 4. Analytics e Lancamento | 0/2 | Not started | - |
