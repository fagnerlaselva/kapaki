# Feature Landscape

**Domain:** Site institucional para loja local de celular (acessorios, assistencia tecnica, venda de aparelhos)
**Context:** Kapaki Tatui — loja fisica em Tatui-SP. Objetivo principal: conversao para WhatsApp.
**Researched:** 2026-04-06

---

## Table Stakes

Features users expect when landing on a local phone repair/accessories store site.
Missing any of these = user leaves immediately or loses trust.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero section com CTA WhatsApp destacado | Primeira dobra define se o usuario fica ou sai. Publico mobile clica antes de rolar. | Low | CTA acima da dobra, copy direto: "Fale com a gente no WhatsApp" |
| Numero de WhatsApp visivel e clicavel | Expectativa universal em lojas brasileiras. Nao ter = desconfianca. | Low | Numero clicavel (tel: e wa.me) em header e footer |
| FAB (botao flutuante) WhatsApp | Padrao de mercado em sites de lojas locais brasileiras. Usuarios esperam achar facilmente em qualquer scroll. | Low | Aparece apos 300-500px de scroll, fixo no canto inferior direito |
| Lista de servicos com descricao clara | Usuario precisa confirmar que a loja faz o que ele precisa antes de entrar em contato. | Low | Assistencia tecnica, acessorios, aparelhos — 3 servicos core |
| Endereco fisico e mapa | Loja fisica: cliente quer saber se fica perto. Ausencia = rejeicao imediata em buscas "perto de mim". | Low | Embed Google Maps ou link para Maps com endereco; NAP (Nome, Endereco, Telefone) consistente |
| Horario de funcionamento | Pergunta mais frequente antes do contato. Sem isso, cliente nao sabe se vale a pena ir. | Low | Todos os dias e horarios, incluindo sabado/domingo se aplicavel |
| Site 100% responsivo (mobile-first) | 70%+ do trafego local e mobile. Site quebrado no celular = taxa de rejeicao acima de 80%. | Medium | Tailwind mobile-first garante isso nativamente |
| Velocidade de carregamento < 3s (mobile) | Cada segundo de delay reduz conversao em ~7%. 53% dos usuarios abandonam paginas com > 3s de load. | Medium | Lighthouse >= 90 mobile — imagens WebP, lazy loading, sem third-party desnecessario |
| Prova social basica (depoimentos/avaliacao) | 92% dos consumidores lem reviews antes de contatar. Ausencia gera inseguranca sobre qualidade. | Low | 3-5 depoimentos reais na homepage; estrelas/nota do Google |
| Schema markup LocalBusiness (JSON-LD) | Indexacao local no Google exige dados estruturados para aparecer no Google Maps e buscas "perto de mim". | Low | name, address, phone, openingHours, geo, serviceType |
| Meta description e H1 unicos por pagina | SEO local basico. Sem isso, Google nao diferencia as paginas de servico nas SERPs. | Low | Cada pagina de servico com keyword local no H1 (ex: "Assistencia Tecnica de Celular em Tatui") |

---

## Differentiators

Features que separam a Kapaki da concorrencia local. Nao obrigatorias, mas geram vantagem competitiva real.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Mensagens pre-preenchidas por servico (wa.me link) | Reduz friccao drasticamente — usuario ja envia contexto ("Quero orcamento para troca de tela"). Concorrentes usam numero puro sem contexto. | Low | Links `wa.me/55XXXXXXXXXXX?text=Ola,%20quero...` distintos por servico/CTA |
| Badge "Mais procurado" na assistencia tecnica | Orienta o usuario indeciso e destaca o servico de maior margem/volume. Tecnica classica de anchoring. | Low | Badge visual no card de assistencia tecnica |
| Paginas de servico dedicadas com FAQ + schema | FAQ com schema FAQPage melhora ranking no Google e captura featured snippets para perguntas como "quanto custa trocar tela de celular em Tatui". | Medium | Uma pagina por servico com 5-8 perguntas reais de clientes |
| Copy orientado a dor/beneficio (nao apenas lista de servicos) | Sites de concorrentes locais usam copy generico ("oferecemos servicos de qualidade"). Copy especifico converte mais. | Low | Substituir "Fazemos assistencia tecnica" por "Troca de tela em ate 1 hora — saia com o celular novo" |
| Galeria ou prova visual do trabalho | Video depoimento converte 80% mais que texto. Fotos da loja e dos reparos aumentam confianca antes do contato. | Medium | Fotos da loja, da equipe, de aparelhos sendo reparados. Videos curtos se disponivel. |
| Secao "Por que a Kapaki?" com diferenciais concretos | Responde a objecao silenciosa "Por que voce e nao o concorrente?". Precisa de razoes especificas, nao genericas. | Low | Ex: "Garantia de 90 dias em todos os reparos", "Orcamento sem compromisso", "Pecas originais" |
| Links para Instagram (@loja_kapaki_tatui_) | Prova social continua — feed ativo sinaliza que a loja esta operando e tem vida. Conecta visitante ao canal de conteudo. | Low | Link no footer e hero; icone na navbar |
| Sinalizacao de urgencia/velocidade do servico | "Troca de tela em ate X horas" ou "Atendimento hoje" gera acao imediata. Diferencia de lojas que nao comunicam prazo. | Low | Apenas se for realidade operacional da loja |

---

## Anti-Features

Features para deliberadamente NAO construir em v1 (e possivelmente nunca).

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| E-commerce / carrinho de compras | Aumenta complexidade (pagamentos, estoque, logistica) sem ganho claro — a loja opera via WhatsApp e balcao fisico. | CTA WhatsApp com mensagem pre-preenchida ("Quero comprar [produto]") |
| Chat ao vivo no site (Intercom, Crisp, Zendesk) | Duplica canal com WhatsApp, adiciona peso ao bundle JS, cria obrigacao de monitoramento extra. | WhatsApp e o unico canal — concentrar esforco ali |
| Blog / conteudo editorial | Conteudo de qualidade exige manutencao continua. SEO de conteudo e estrategia de longo prazo incompativel com o prazo e objetivo de conversao imediata. | FAQ schema nas paginas de servico captura long-tail sem custo de manutencao |
| Login / area do cliente | Modelo de negocio nao tem necessidade (sem historico de ordens online, sem assinatura). | Nada — o acompanhamento de reparo acontece via WhatsApp direto |
| Pop-up de newsletter / email capture | Fricao adicional em um site de conversao rapida. Publico local nao tem habito de assinar newsletter de loja de bairro. | Botao WhatsApp proeminente substitui qualquer captura de lead |
| Animacoes pesadas / paralaxe / WebGL | Cada efeito decorativo adiciona peso de JS/GPU e prejudica Lighthouse. Site de loja local nao e portfolio de design. | Animacoes CSS leves e funcionais (transicoes, hover states) |
| Multi-lingua | Publico 100% local/brasileiro. Esforco de traducao sem retorno. | — |
| Sistema de agendamento online | Complexidade de integracao (calendarios, confirmacoes, lembretes) sem necessidade clara — agendamento ocorre naturalmente via WhatsApp. | Link WhatsApp com mensagem "Quero agendar um horario" |
| Pagina de precos fixa | Precos de assistencia tecnica variam por modelo, marca e diagnostico. Precos fixos geram expectativas erradas e cancelamentos. | "Orcamento gratuito via WhatsApp" como CTA — transforma a variavel em vantagem |

---

## Feature Dependencies

```
LocalBusiness schema JSON-LD
  → exige: NAP consistente (Nome, Endereco, Telefone) definido como constante no projeto

FAQ schema (FAQPage)
  → exige: paginas de servico dedicadas (/assistencia-tecnica, /acessorios, /aparelhos)
  → exige: H1 e meta description unicos por pagina

FAB WhatsApp
  → exige: numero de WhatsApp real definido
  → depende de: logica de scroll (aparece apos scroll)
  → compartilha: numero e logica de link com botoes inline

Mensagens pre-preenchidas por servico
  → exige: definicao do numero WhatsApp
  → exige: copy das mensagens por servico (texto do text= URL-encoded)

Prova social (depoimentos)
  → exige: depoimentos reais coletados com o cliente da loja

Galeria visual
  → exige: fotos reais da loja / equipe / reparos (ativos reais, nao stock photos)

Google Analytics 4
  → exige: GA4 Measurement ID real do cliente
  → pode medir: cliques nos botoes WhatsApp (evento customizado)
```

---

## MVP Recommendation

O MVP que maximiza conversao com minimo de complexidade:

**Priorizar:**
1. FAB WhatsApp fixo — impacto imediato em todas as paginas, menor esforco
2. Hero com CTA WhatsApp + mensagem pre-preenchida — primeira impressao e conversao imediata
3. Cards de servicos com CTAs distintos por servico — contexto para o cliente antes de contatar
4. Endereco + horario + mapa — remocao de friccao para visita presencial
5. LocalBusiness schema JSON-LD — base do SEO local, sem isso o Google nao indexa corretamente
6. 3 paginas de servico com FAQ schema — captura SEO de long-tail sem blog

**Diferenciadores de baixo esforco para incluir no MVP:**
- Badge "Mais procurado" em assistencia tecnica (1 linha de CSS)
- Mensagens pre-preenchidas distintas por CTA (1 variavel por botao)
- Links Instagram no footer

**Diferenciadores para defer:**
- Galeria visual/video — depende de ativos reais da loja (fotos/videos) que podem atrasar o projeto
- Prova social com fotos — mesmo problema; depoimentos em texto simples desbloqueiam antes

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Table stakes | HIGH | Consistente com documentacao de SEO local do Google, pesquisa de CRO 2025, e analise de concorrentes brasileiros do segmento |
| WhatsApp conversion patterns | HIGH | wa.me links pre-preenchidos sao documentados pelo proprio WhatsApp; floating button e padrao amplamente adotado |
| Anti-features | HIGH | Decisoes validadas pelo PROJECT.md do cliente e confirmadas por analise de complexidade vs. retorno |
| Differentiators | MEDIUM | Baseado em CRO best practices gerais + analise de sites do segmento; A/B testing nao e possivel em v1 |
| Feature dependencies | HIGH | Derivadas de analise tecnica do stack (Nuxt 3 + SSR) e requisitos de negocio |

---

## Sources

- [WhatsApp Click-to-Chat Documentation](https://faq.whatsapp.com/5913398998672934) — oficial, mecanismo wa.me pre-filled
- [Google Developers — LocalBusiness Structured Data](https://developers.google.com/search/docs/appearance/structured-data/local-business) — oficial, schema markup
- [Local SEO — Google Business Profile Tips](https://support.google.com/business/answer/7091) — oficial, fatores de ranking local
- [18 Best Cell Phone Repair Websites — CyberOptik](https://www.cyberoptik.net/blog/best-mobile-phone-repair-websites/) — analise de melhores sites do segmento
- [5 Trust Signals That Boost Conversion — Crazy Egg](https://www.crazyegg.com/blog/trust-signals/) — sinais de confianca e impacto em conversao
- [Social Proof Impact on Conversions 2026 — Genesys Growth](https://genesysgrowth.com/blog/social-proof-conversion-stats-for-marketing-leaders) — estatisticas de prova social
- [Mobile Site Speed & Conversions — RoastWeb](https://www.roastweb.com/blog/mobile-conversion-rate-optimization-site-speed) — impacto de velocidade em conversao mobile
- [Website Speed Crisis 2025 — SiteQwality](https://siteqwality.com/blog/website-speed-crisis-2025/) — benchmarks de velocidade e taxa de abandono
- [How to Add Floating WhatsApp Button — Elfsight](https://elfsight.com/blog/how-to-embed-floating-whatsapp-button-to-website/) — implementacao de FAB WhatsApp
- [SEO Local para Pequenos Negócios — AutoMarketing](https://automarketing.digital/blog/seo-local-pequenos-negocios-guia-auto-marketing) — praticas de SEO local para mercado brasileiro
- [Schema Local Business — Anderson Melo SEO](https://andersonmeloseo.com.br/blog/schema-local-business/) — implementacao em contexto brasileiro
- [Conversion Rate Optimization Best Practices 2025 — OneNine](https://onenine.com/conversion-rate-optimization-best-practices/) — CRO geral com foco em 2025
