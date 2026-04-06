# Requirements: Kapaki Tatui

**Defined:** 2026-04-06
**Core Value:** Gerar leads via WhatsApp — cada pagina e CTA deve maximizar contatos iniciados no WhatsApp da loja.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Setup & Infraestrutura

- [ ] **SETUP-01**: Projeto Nuxt 3 configurado com SSR (nitro preset: vercel), Tailwind v4 via @tailwindcss/vite, TypeScript
- [ ] **SETUP-02**: Paleta de cores dark theme (#111111 fundo, #F5C400 amarelo destaque) configurada no Tailwind
- [ ] **SETUP-03**: Tipografia Poppins (headings) + Inter (body) via @nuxt/fonts com self-hosting
- [ ] **SETUP-04**: Dados de negocio centralizados em app.config.ts (WhatsApp, endereco, horarios) com placeholders
- [ ] **SETUP-05**: Icones via lucide-vue-next configurados

### WhatsApp & Conversao

- [ ] **WA-01**: Composable useWhatsApp que gera links wa.me com encodeURIComponent e mensagens pre-preenchidas por servico
- [ ] **WA-02**: Botoes WhatsApp com mensagens pre-preenchidas distintas por servico (acessorios, assistencia, aparelhos)
- [ ] **WA-03**: FAB WhatsApp fixo (bottom-right, circulo verde #25D366) que aparece apos scroll, funciona em mobile e desktop
- [ ] **WA-04**: CTA final amarelo full-width com botao WhatsApp em todas as paginas

### Homepage

- [ ] **HOME-01**: HeroSection full-width com H1, subtitulo, botao WhatsApp amarelo e botao outline "Ver servicos"
- [ ] **HOME-02**: ServicosSection com 3 cards (Acessorios, Assistencia Tecnica com badge "Mais procurado", Aparelhos)
- [ ] **HOME-03**: ProvasSociaisSection com selo "+500 clientes", 3 cards de avaliacao com 5 estrelas
- [ ] **HOME-04**: BeneficiosSection com 4 cards (Atendimento Rapido, Preco Justo, Garantia, Localizacao)
- [ ] **HOME-05**: Footer com 3 colunas (Sobre, Contato com WhatsApp e Instagram, Horarios)

### Paginas de Servico

- [ ] **SERV-01**: Pagina /assistencia-tecnica com H1 unico, lista de servicos, FAQ e CTA WhatsApp
- [ ] **SERV-02**: Pagina /acessorios com H1 unico, produtos destacados e CTA WhatsApp
- [ ] **SERV-03**: Pagina /aparelhos com H1 unico, diferenciais e CTA WhatsApp
- [ ] **SERV-04**: Layout compartilhado entre paginas de servico (hero simplificado + conteudo + CTA + FAQ)

### SEO Local

- [ ] **SEO-01**: useServerSeoMeta com title e description unicos em todas as paginas
- [ ] **SEO-02**: Schema JSON-LD LocalBusiness/ElectronicsRepair global via useHead
- [ ] **SEO-03**: Schema FAQPage JSON-LD nas paginas de servico com FAQ
- [ ] **SEO-04**: Sitemap e robots.txt via @nuxtjs/seo
- [ ] **SEO-05**: og:image com URL absoluta para preview correto no WhatsApp

### Responsividade & Performance

- [ ] **PERF-01**: Site 100% responsivo mobile-first (mobile, tablet, desktop)
- [ ] **PERF-02**: Lighthouse Performance >= 90 (mobile)
- [ ] **PERF-03**: Lighthouse SEO = 100
- [ ] **PERF-04**: Imagens otimizadas via @nuxt/image com lazy loading
- [ ] **PERF-05**: Hero image com loading="eager" e fetchpriority="high"

### Analytics

- [ ] **ANAL-01**: Google Analytics 4 integrado via nuxt-gtag (SSR-safe, plugin .client)
- [ ] **ANAL-02**: Evento customizado para cliques nos botoes WhatsApp

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Conteudo Visual

- **VIS-01**: Galeria de fotos da loja, equipe e reparos realizados
- **VIS-02**: Video depoimentos de clientes reais
- **VIS-03**: Logo e identidade visual profissional da Kapaki

### SEO Avancado

- **SEOA-01**: Google Business Profile otimizado e sincronizado com o site
- **SEOA-02**: Pagina de blog com artigos sobre cuidados com celular
- **SEOA-03**: Dados estruturados Product para aparelhos em estoque

### Conversao Avancada

- **CONV-01**: A/B testing de copy dos CTAs WhatsApp
- **CONV-02**: Tracking de conversao WhatsApp com GA4 (click-to-chat)
- **CONV-03**: Pagina de orcamento com formulario basico

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| E-commerce / carrinho | Foco e conversao via WhatsApp, nao venda online |
| Chat ao vivo (Intercom, Crisp) | Duplica canal com WhatsApp, adiciona JS pesado |
| Blog / conteudo editorial | Exige manutencao continua, incompativel com objetivo de conversao rapida |
| Login / area do cliente | Modelo de negocio nao requer (sem historico de ordens online) |
| Pop-up newsletter / email | Fricao em site de conversao rapida, publico local nao assina newsletter |
| Multi-idioma | Publico 100% local/brasileiro |
| Agendamento online | WhatsApp cobre agendamento sem complexidade de integracao |
| Pagina de precos fixos | Precos de assistencia variam por modelo/diagnostico, gera expectativa errada |
| Animacoes pesadas / WebGL | Peso de JS/GPU prejudica Lighthouse sem retorno para conversao |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SETUP-01 | Phase 1 | Pending |
| SETUP-02 | Phase 1 | Pending |
| SETUP-03 | Phase 1 | Pending |
| SETUP-04 | Phase 1 | Pending |
| SETUP-05 | Phase 1 | Pending |
| WA-01 | Phase 1 | Pending |
| WA-02 | Phase 2 | Pending |
| WA-03 | Phase 2 | Pending |
| WA-04 | Phase 2 | Pending |
| HOME-01 | Phase 2 | Pending |
| HOME-02 | Phase 2 | Pending |
| HOME-03 | Phase 2 | Pending |
| HOME-04 | Phase 2 | Pending |
| HOME-05 | Phase 2 | Pending |
| SERV-01 | Phase 3 | Pending |
| SERV-02 | Phase 3 | Pending |
| SERV-03 | Phase 3 | Pending |
| SERV-04 | Phase 3 | Pending |
| SEO-01 | Phase 3 | Pending |
| SEO-02 | Phase 3 | Pending |
| SEO-03 | Phase 3 | Pending |
| SEO-04 | Phase 3 | Pending |
| SEO-05 | Phase 3 | Pending |
| PERF-01 | Phase 2 | Pending |
| PERF-02 | Phase 4 | Pending |
| PERF-03 | Phase 4 | Pending |
| PERF-04 | Phase 3 | Pending |
| PERF-05 | Phase 3 | Pending |
| ANAL-01 | Phase 4 | Pending |
| ANAL-02 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 30 total
- Mapped to phases: 30
- Unmapped: 0

---
*Requirements defined: 2026-04-06*
*Last updated: 2026-04-06 after roadmap creation*
