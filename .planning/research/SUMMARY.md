# Project Research Summary

**Project:** Kapaki Tatui — Site institucional de loja de celular
**Domain:** Local business institutional site (SEO local + conversao WhatsApp)
**Researched:** 2026-04-06
**Confidence:** HIGH

## Executive Summary

A Kapaki Tatui e uma loja fisica em Tatui-SP que vende acessorios, oferece assistencia tecnica e revende aparelhos celulares. O site nao e um e-commerce — e um canal de conversao para WhatsApp, com objetivo secundario de indexacao no Google Maps e buscas locais. Especialistas em sites de negocio local constroem esse tipo de produto com SSR obrigatorio (para SEO), schema LocalBusiness/ElectronicsRepair, e um FAB WhatsApp fixo visivel em todas as paginas. A ausencia de qualquer um desses tres elementos compromete os objetivos centrais do produto.

A abordagem recomendada e Nuxt 3 com SSR ativo no Vercel, Tailwind CSS v4 via plugin Vite (nao o modulo da comunidade), e o pacote `@nuxtjs/seo` para cobertura completa de SEO local sem configuracao individual de modulos. A arquitetura e flat e orientada a paginas — sem state management, sem e-commerce, sem features que nao contribuam diretamente para conversao via WhatsApp. O modelo de dados flui de `app.config.ts` (fonte unica de verdade para NAP — Nome, Endereco, Telefone) para composables e depois para componentes presentacionais via props.

Os riscos criticos sao conhecidos e todos preveniveis: preset SSR errado no Vercel (`vercel-static` vs `vercel`) que quebra indexacao; hydration mismatch no FAB WhatsApp se `window` for acessado fora de `onMounted`; e NAP inconsistente entre JSON-LD, pagina visivel e Google Business Profile, que penaliza ranking local. Com as mitigacoes documentadas nesta pesquisa, todos esses riscos sao eliminados no setup inicial.

---

## Key Findings

### Recommended Stack

O stack central ja estava decidido (Nuxt 3 + TypeScript + Tailwind CSS + Vercel). A pesquisa focou na selecao correta de modulos dentro desse stack. O resultado mais importante: Tailwind v4 requer integracao via `@tailwindcss/vite` como Vite plugin — o modulo da comunidade `@nuxtjs/tailwindcss` tem conflitos conhecidos com v4 (PostCSS conflict, issues abertas em fevereiro 2025). O `@nuxtjs/seo` v5 instala 6 modulos SEO de uma vez com versoes compativeis entre si, incluindo `nuxt-site-config` que centraliza a URL do site — critico para sitemap e canonical corretos no Vercel.

**Core technologies:**
- **Nuxt 3 + Vercel SSR preset:** Framework principal com SSR — obrigatorio para indexacao de SEO local; o preset deve ser `vercel`, nunca `vercel-static`
- **Tailwind CSS v4 via `@tailwindcss/vite`:** CSS utility-first; v4 e a versao atual e requer plugin Vite, nao modulo Nuxt da comunidade
- **`@nuxtjs/seo` v5:** All-in-one SEO toolkit (robots, sitemap, schema-org, og-image, canonical automatico); elimina necessidade de configurar cada modulo individualmente
- **`@nuxt/fonts`:** Auto self-hosting de fontes com fallback metrics para reduzir CLS — superior ao `@nuxtjs/google-fonts` por incluir font-metric fallbacks automaticos
- **`nuxt-gtag` v4:** Google Analytics 4 client-side com Consent Mode v2 e API tipada; requer plugin `.client.ts` para evitar inicializacao no servidor
- **`@nuxt/image` v2:** Otimizacao de imagens via CDN Vercel; critico para Lighthouse >= 90 mobile; `screens` deve ser configurado explicitamente
- **`lucide-vue-next`:** Icones tree-shakable via import direto (sem wrapper Nuxt — mais eficiente para bundle size)

### Expected Features

A pesquisa confirmou um conjunto claro de features obrigatorias para competir no segmento local e um conjunto de diferenciadores de baixo esforco que devem entrar no MVP.

**Must have (table stakes):**
- Hero section com CTA WhatsApp acima da dobra — primeira dobra define retencao
- FAB (botao flutuante) WhatsApp fixo — padrao de mercado em sites de lojas locais brasileiras
- Numero de WhatsApp clicavel no header e footer — expectativa universal
- Lista de servicos com descricao clara (assistencia, acessorios, aparelhos)
- Endereco fisico + embed Google Maps + horario de funcionamento
- Schema markup `ElectronicsRepair` (JSON-LD) — base do SEO local no Google Maps
- Meta description e H1 unicos por pagina com keyword local (ex: "Assistencia Tecnica de Celular em Tatui")
- Site responsivo mobile-first com Lighthouse >= 90 mobile
- Prova social basica (3-5 depoimentos)

**Should have (competitive):**
- Mensagens pre-preenchidas distintas por servico via wa.me links — reduz friccao dramaticamente
- Paginas dedicadas por servico com FAQ + schema FAQPage — captura long-tail SEO sem blog
- Badge "Mais procurado" em assistencia tecnica — anchoring classico
- Secao "Por que a Kapaki?" com diferenciais concretos
- Links para Instagram no footer e hero

**Defer (v2+):**
- Galeria visual/video — depende de ativos reais (fotos, videos) que podem atrasar o projeto
- E-commerce, chat ao vivo, blog, agendamento online, area do cliente — anti-features para esse modelo de negocio

### Architecture Approach

A arquitetura recomendada e flat e orientada a paginas, sem state management library. `app.config.ts` e a fonte unica de verdade para dados do negocio (NAP: nome, telefone, endereco, WhatsApp, horarios). Composables (`useWhatsApp`, `usePageSeo`, `useScrollThreshold`) isolam logica cross-cutting. Componentes de secao sao presentacionais puros — recebem todos os dados via props e nao chamam composables diretamente. O fluxo de dados e estritamente top-down: `app.config.ts` → paginas → secoes.

**Major components:**
1. `app.config.ts` — Fonte unica de verdade para NAP e dados do negocio (reutilizados em schema, footer, CTAs)
2. Composables (`useWhatsApp`, `usePageSeo`, `useScrollThreshold`) — Logica reutilizavel isolada do template
3. Pages (`index`, `assistencia-tecnica`, `acessorios`, `aparelhos`) — Orquestradores: montam dados e passam para secoes
4. Section components (`HeroSection`, `ServicosSection`, `WhatsAppFab`, etc.) — Presentacionais puros, testados isoladamente
5. `constants/` — Conteudo estativo por dominio (`services.ts`, `faq.ts`, `testimonials.ts`, `benefits.ts`)

### Critical Pitfalls

1. **Preset Vercel errado (`vercel-static` em vez de `vercel`)** — Configurar `nitro: { preset: 'vercel' }` no setup inicial e validar com `curl` no primeiro deploy; HTML bruto deve conter `<script type="application/ld+json">` e meta tags
2. **Hydration mismatch no FAB WhatsApp** — Qualquer acesso a `window`/`document` fora de `onMounted` causa erro de hidratacao; usar `useScrollThreshold` que guarda `window.addEventListener` em `onMounted`
3. **NAP inconsistente (Nome, Endereco, Telefone)** — Centralizar em `app.config.ts` e reutilizar em todo o site; usar `ElectronicsRepair` (nao `LocalBusiness` generico) para maior elegibilidade a rich results
4. **og:image e canonical com URL relativa** — Configurar `site.url` absoluta em `nuxt.config.ts`; bloquear preview URLs do Vercel com `X-Robots-Tag: noindex`
5. **LCP destruido por lazy loading na imagem hero** — Hero image deve ter `loading="eager" fetchpriority="high"`; somente imagens below-the-fold recebem `loading="lazy"`

---

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Fundacao e Configuracao
**Rationale:** Todas as decisoes de configuracao com impacto em SEO e hydration devem ser tomadas antes de qualquer componente ser construido. Erros de preset, site URL e NAP descobertos tarde causam retrabalho profundo.
**Delivers:** Projeto Nuxt 3 configurado com todos os modulos, `app.config.ts` com dados reais do negocio, `nuxt.config.ts` com preset correto, `vercel.json` com noindex para previews, e estrutura de diretorios finalizada
**Addresses:** Hero section (pre-requisito), schema (pre-requisito), WhatsApp FAB (pre-requisito)
**Avoids:** Pitfall 1 (preset errado), Pitfall 3 (NAP inconsistente), Pitfall 4 (URLs relativas)

### Phase 2: Composables e Contratos de Dados
**Rationale:** Composables sao pre-requisitos para todos os componentes. `useWhatsApp` deve existir antes do primeiro botao ser construido; `usePageSeo` antes de qualquer pagina; `useScrollThreshold` antes do FAB.
**Delivers:** `useWhatsApp.ts` com `encodeURIComponent` correto, `usePageSeo.ts` com `useServerSeoMeta`, `useScrollThreshold.ts` SSR-safe; constantes de conteudo em `constants/`
**Avoids:** Pitfall 2 (hydration mismatch), Pitfall 7 (URL WhatsApp malformada)

### Phase 3: Layout Base e Componentes Atomicos
**Rationale:** Componentes presentacionais sem inter-dependencias podem ser construidos em paralelo apos os composables estarem prontos. `layouts/default.vue` e `AppFooter.vue` desbloqueiam a montagem das paginas.
**Delivers:** `layouts/default.vue`, `AppFooter.vue` (com NAP de `app.config.ts`), `HeroSection`, `BeneficiosSection`, `CtaFinalSection`, `ProvasSociaisSection`, `FaqAccordion`
**Avoids:** Pitfall 5 (hero image com lazy loading — configurar `loading="eager"` aqui), Pitfall 6 (CLS de fonte)

### Phase 4: Homepage e WhatsApp FAB
**Rationale:** A homepage e a pagina de maior impacto (conversao e SEO). O FAB WhatsApp beneficia todas as paginas e deve estar funcional o mais cedo possivel.
**Delivers:** `pages/index.vue` com todas as secoes, schema `ElectronicsRepair` JSON-LD, `WhatsAppFab.vue` com scroll threshold; Lighthouse >= 90 mobile validado
**Avoids:** Pitfall 2 (FAB hydration), Pitfall 3 (schema com tipo generico), Pitfall 9 (ElectronicsRepair vs LocalBusiness)

### Phase 5: Paginas de Servico com FAQ e Schema
**Rationale:** Paginas de servico com FAQ schema sao o principal diferenciador de SEO (featured snippets para "quanto custa trocar tela em Tatui"). Dependem de conteudo real de FAQ que pode chegar durante o projeto.
**Delivers:** `pages/assistencia-tecnica.vue`, `pages/acessorios.vue`, `pages/aparelhos.vue` — cada uma com H1 local, meta description unica, schema `FAQPage`, e CTAs com mensagens pre-preenchidas distintas
**Implements:** `ServiceCard`, `ServicosSection`, `FaqAccordion`

### Phase 6: Analytics, SEO Final e Lancamento
**Rationale:** Analytics e validacao de SEO sao os ultimos passos antes do go-live. Requerem dados reais (GA4 ID do cliente) e testes em producao.
**Delivers:** `nuxt-gtag` configurado com plugin `.client.ts`, validacao via Google Rich Results Test, teste de compartilhamento og:image no WhatsApp Web, sitemap e robots.txt verificados
**Avoids:** Pitfall 4 (og:image relativa — validar em staging), Pitfall 8 (GA4 no servidor), Pitfall 11 (robots.txt conflito)

### Phase Ordering Rationale

- Configuracao antes de componentes: erros de preset SSR e URL absoluta descobertos tarde exigem mudancas em todos os arquivos do projeto
- Composables antes de templates: `useWhatsApp` com `encodeURIComponent` deve existir antes do primeiro botao; construir botoes sem o composable leva a URLs duplicadas e malformadas
- Componentes atomicos antes de compostos: `ServiceCard` antes de `ServicosSection`, secoes antes de paginas — segue o build order documentado na ARCHITECTURE.md
- Homepage antes de paginas de servico: valida o padrao completo (schema + SEO + FAB) antes de replicar para as 3 paginas de servico

### Research Flags

Phases com padrao bem documentado (sem necessidade de pesquisa adicional):
- **Phase 1:** Configuracao Nuxt + Vercel esta completamente documentada nas docs oficiais
- **Phase 2:** Composables simples com contratos definidos na ARCHITECTURE.md
- **Phase 3:** Componentes presentacionais Tailwind — padrao estabelecido
- **Phase 4:** SSR + schema JSON-LD via `useHead` — documentado e verificado

Phases que podem precisar de validacao durante execucao:
- **Phase 5:** FAQ schema `FAQPage` combinado com `ElectronicsRepair` no mesmo JSON-LD — testar no Rich Results Test antes de finalizar; combinacao de tipos pode ter restricoes de elegibilidade
- **Phase 6:** Google Consent Mode v2 com `nuxt-gtag initMode: 'manual'` — comportamento LGPD depende de decisao do cliente sobre banner de cookies

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Core stack definido; selecao de modulos verificada em docs oficiais e NPM |
| Features | HIGH | Table stakes consistentes com documentacao Google SEO Local e analise de segmento; anti-features validadas pelo modelo de negocio |
| Architecture | HIGH | Nuxt 3 estavel e bem documentado; padroes verificados em docs oficiais e comunidade |
| Pitfalls | HIGH | Maioria dos pitfalls vem de docs oficiais (Vercel, Nuxt, Google); alguns de community reports de alta credibilidade |

**Overall confidence:** HIGH

### Gaps to Address

- **Numero WhatsApp e dados NAP reais:** `app.config.ts` e schema JSON-LD usam placeholders. O projeto nao pode ir para producao sem esses dados — obtidos com o cliente antes da Phase 1
- **GA4 Measurement ID:** `nuxt-gtag` requer ID real do cliente. Phase 6 e bloqueada ate esse dado estar disponivel
- **Fotos e videos reais:** Galeria visual e depoimentos com foto dependem de ativos do cliente. Recomendado coletar em paralelo com o desenvolvimento para nao bloquear o lancamento
- **Dominio de producao:** URL absoluta (`site.url`) e necessaria desde a Phase 1 para canonical e og:image corretos
- **Coordenadas geograficas para schema:** `geo.latitude` e `geo.longitude` no schema `ElectronicsRepair` requerem coordenadas reais da loja

---

## Sources

### Primary (HIGH confidence)
- [Nuxt SEO — nuxtseo.com](https://nuxtseo.com/) — modulos, LocalBusiness schema, canonical
- [Tailwind CSS — Install with Nuxt](https://tailwindcss.com/docs/installation/framework-guides/nuxt) — integracao v4 via Vite plugin
- [Nuxt on Vercel — Vercel Docs](https://vercel.com/docs/frameworks/nuxt) — preset SSR, image provider
- [Google Search Central — LocalBusiness Structured Data](https://developers.google.com/search/docs/appearance/structured-data/local-business) — schema markup, ElectronicsRepair
- [Nuxt 3 Official Docs](https://nuxt.com/docs/3.x) — SSR, composables, auto-import, hydration
- [nuxt-gtag — NPM](https://www.npmjs.com/package/nuxt-gtag) — versao, Consent Mode v2
- [@nuxt/image — Vercel Provider](https://image.nuxt.com/providers/vercel) — configuracao screens

### Secondary (MEDIUM confidence)
- [Integrating Tailwind CSS v4 with Vue and Nuxt](https://felixastner.com/articles/integrating-tailwind-css-v4-with-vue-and-nuxt-and-differences-from-v3) — confirmacao de problemas com @nuxtjs/tailwindcss
- [Installing Tailwind CSS v4 on Nuxt 3](https://masteringnuxt.com/blog/installing-tailwind-css-v4-on-nuxt-3) — abordagem via Vite plugin
- [Local SEO para Pequenos Negocios — AutoMarketing](https://automarketing.digital/blog/seo-local-pequenos-negocios-guia-auto-marketing) — contexto brasileiro
- [Schema Local Business — Anderson Melo SEO](https://andersonmeloseo.com.br/blog/schema-local-business/) — implementacao brasileira
- [Social Proof Impact on Conversions 2026 — Genesys Growth](https://genesysgrowth.com/blog/social-proof-conversion-stats-for-marketing-leaders) — estatisticas de prova social
- [Nuxt SSR Pitfalls — InfiniteJS](https://infinitejs.com/posts/nuxt-ssr-pitfalls-avoidance/) — hydration patterns

### Tertiary (LOW confidence)
- Nenhuma fonte de baixa confianca foi utilizada como base para decisoes criticas

---

*Research completed: 2026-04-06*
*Ready for roadmap: yes*
