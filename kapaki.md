# PRD — Site Kapaki Tatuí
**Versão:** 1.0  
**Data:** Abril 2025  
**Stack:** Nuxt 3 + Tailwind CSS + TypeScript  
**Deploy:** Vercel  

---

## 1. Visão Geral

Site institucional + conversão para a **Kapaki Tatuí**, loja física localizada em Tatuí-SP com três frentes de negócio: acessórios para celular, assistência técnica e venda de aparelhos. O objetivo principal é transformar visitantes em contatos de WhatsApp e intenção de compra.

---

## 2. Objetivos de Negócio

| Prioridade | Objetivo | Métrica |
|---|---|---|
| 🥇 Alta | Gerar leads via WhatsApp (assistência técnica) | Cliques no botão WhatsApp |
| 🥇 Alta | Gerar intenção de compra (aparelhos) | Tempo na página + cliques |
| 🥈 Média | Visibilidade local no Google (SEO) | Ranking para palavras-chave alvo |
| 🥉 Baixa | Vendas diretas de acessórios | Mensagens recebidas sobre acessórios |

---

## 3. Público-Alvo

- Moradores de Tatuí e região que precisam de conserto de celular
- Pessoas procurando acessórios (capinha, película, carregador)
- Quem quer comprar celular novo ou seminovo com garantia
- Faixa etária: 18–45 anos, mobile-first

---

## 4. Stack Técnica

```
Framework:     Nuxt 3 (SSR — obrigatório para SEO)
Estilo:        Tailwind CSS
Linguagem:     TypeScript
Deploy:        Vercel (preset: vercel — não vercel-static)
Fontes:        Google Fonts (Inter ou Poppins)
Ícones:        Lucide Icons ou Heroicons
Analytics:     GA4 (via gtag)
```

---

## 5. Paleta de Cores

```css
--color-primary:    #F5C400;   /* Amarelo principal — CTAs, destaques */
--color-dark:       #111111;   /* Fundo principal */
--color-surface:    #1A1A1A;   /* Cards, seções alternadas */
--color-border:     #2A2A2A;   /* Bordas sutis */
--color-white:      #FFFFFF;   /* Texto principal sobre fundo escuro */
--color-muted:      #9CA3AF;   /* Texto secundário */
--color-success:    #22C55E;   /* WhatsApp green */
```

---

## 6. Tipografia

```
Heading:   Poppins (700, 600)
Body:      Inter (400, 500)
```

---

## 7. Estrutura de Rotas

```
/                    → Página principal (landing)
/assistencia-tecnica → Página de serviço (SEO local)
/acessorios          → Página de serviço (SEO local)
/aparelhos           → Página de serviço (SEO local)
```

> Cada página de serviço deve ter meta tags, H1 e copy únicas para SEO local.

---

## 8. Componentes — Página Principal (`/`)

### 8.1 `HeroSection`

**Layout:** Full-width, fundo preto, texto à esquerda, imagem/mockup tech à direita (mobile: empilhado)

**Conteúdo:**
```
H1:         "Seu celular merece o melhor. Você também."
Subtítulo:  "Acessórios, consertos e celulares — tudo em um só lugar, aqui em Tatuí."
Botão 1:    "📲 Falar no WhatsApp"  → amarelo, link WhatsApp
Botão 2:    "Ver serviços"          → outline branco, ancora #servicos
```

**WhatsApp link:**
```
https://wa.me/5515XXXXXXXXX?text=Ol%C3%A1%2C+Kapaki%21+Vim+pelo+site+e+quero+saber+mais.
```

**Visual:** SVG ou imagem de smartphone moderno. Pode usar gradiente amarelo sutil ao fundo do hero.

---

### 8.2 `ServicosSection` (id="servicos")

**Layout:** 3 cards em grid (desktop: 3 colunas, mobile: 1 coluna)  
**Fundo:** `--color-surface` (#1A1A1A)

**Título da seção:** `"O que você precisa hoje?"`  
**Subtítulo:** `"Escolha seu caminho — a Kapaki resolve."`

#### Card 1 — Acessórios
```
Ícone:    📱 (ou smartphone icon)
Título:   "Acessórios para Celular"
Texto:    "Capinhas, películas, carregadores, fones e muito mais. Proteção e estilo no melhor preço de Tatuí."
CTA:      "Ver acessórios →"
Link WA:  ?text=Olá!+Quero+ver+os+acessórios+disponíveis+na+Kapaki.
```

#### Card 2 — Assistência Técnica (DESTAQUE — card maior ou com borda amarela)
```
Ícone:    🪛 (ou wrench icon)
Badge:    "Mais procurado"  (pill amarelo)
Título:   "Assistência Técnica Especializada"
Texto:    "Tela quebrada, bateria viciada, celular molhado? A gente resolve rápido, com garantia e sem enrolação."
CTA:      "Solicitar orçamento →"
Link WA:  ?text=Olá!+Preciso+de+assistência+técnica+para+meu+celular.+Podem+me+ajudar?
```

#### Card 3 — Aparelhos
```
Ícone:    📲 (ou device-mobile icon)
Título:   "Venda de Aparelhos"
Texto:    "Smartphones novos e seminovos com procedência e garantia. Encontre o modelo ideal para o seu bolso."
CTA:      "Ver aparelhos →"
Link WA:  ?text=Olá!+Quero+saber+sobre+os+celulares+disponíveis+na+Kapaki.
```

---

### 8.3 `ProvasSociaisSection`

**Fundo:** preto (`--color-dark`)

**Título:** `"Quem veio, aprovou"`  
**Subtítulo:** `"Centenas de clientes atendidos em Tatuí e região."`

**Selo de destaque (centralizado acima dos cards):**
```
✅ +500 clientes atendidos em Tatuí
```

**3 cards de avaliação (5 estrelas cada):**

```
Card 1:
  Nome:   "Ana Paula M."
  Local:  "Tatuí-SP"
  Texto:  "Troquei a tela do meu iPhone aqui e ficou perfeito. 
           Rápido, preço justo e com garantia. Recomendo demais!"

Card 2:
  Nome:   "Carlos H."
  Local:  "Tatuí-SP"
  Texto:  "Comprei minha capinha e uma película, me atenderam super bem. 
           Preço bom e variedade grande. Já virou minha loja favorita!"

Card 3:
  Nome:   "Fernanda L."
  Local:  "Tatuí-SP"
  Texto:  "Levei meu celular molhado sem esperança e eles salvaram tudo. 
           Profissionalismo de outro nível!"
```

**Componente estrelas:** renderizar 5 estrelas amarelas (⭐ ou SVG)

---

### 8.4 `BeneficiosSection`

**Layout:** 4 cards em grid (desktop: 4 cols, mobile: 2 cols)  
**Fundo:** `--color-surface`

**Título:** `"Por que escolher a Kapaki?"`

```
Benefício 1:
  Ícone:  ⚡ (Zap)
  Título: "Atendimento Rápido"
  Texto:  "Sem fila, sem enrolação. Seu problema resolvido no menor tempo possível."

Benefício 2:
  Ícone:  💛 (DollarSign ou Tag)
  Título: "Preço Justo"
  Texto:  "Sem surpresas. Orçamento transparente antes de qualquer serviço."

Benefício 3:
  Ícone:  🛡️ (Shield)
  Título: "Garantia em Tudo"
  Texto:  "Serviços e produtos com garantia real. Sua tranquilidade é nossa prioridade."

Benefício 4:
  Ícone:  📍 (MapPin)
  Título: "No Coração de Tatuí"
  Texto:  "Loja física, fácil de encontrar. Venha pessoalmente ou fale pelo WhatsApp."
```

---

### 8.5 `CtaFinalSection`

**Fundo:** amarelo (`--color-primary`) com texto preto  
**Layout:** centralizado, full-width

```
Título:    "Precisa de ajuda agora?"
Subtítulo: "Fale com um especialista da Kapaki. Atendimento imediato pelo WhatsApp."
Botão:     "📲 Chamar no WhatsApp agora"  → fundo preto, texto branco
Texto:     "Respondemos em instantes • Seg a Sáb • Tatuí-SP"
```

**WhatsApp link:**
```
https://wa.me/5515XXXXXXXXX?text=Olá%2C+Kapaki%21+Preciso+de+ajuda+e+vim+pelo+site.
```

---

### 8.6 `Footer`

**Layout:** 3 colunas (desktop), empilhado (mobile)  
**Fundo:** #0A0A0A (quase preto)

```
Coluna 1 — Sobre:
  Logo + nome "Kapaki Tatuí"
  Texto: "Sua loja de confiança para acessórios, assistência técnica
          e celulares em Tatuí e região."

Coluna 2 — Contato:
  📍 Tatuí - SP
  📲 WhatsApp: (15) 9XXXX-XXXX  [link clicável]
  📷 @loja_kapaki_tatui_  [link Instagram]

Coluna 3 — Horários:
  Segunda a Sexta: 9h às 18h
  Sábado: 9h às 13h
  Domingo: Fechado

Rodapé final:
  © 2025 Kapaki Tatuí. Todos os direitos reservados.
```

---

### 8.7 `WhatsAppFab` (Floating Action Button)

**Posição:** fixed, bottom-right, z-index alto  
**Visual:** círculo verde (`#25D366`) com ícone WhatsApp branco  
**Comportamento:** aparece após 2s ou scroll de 100px  
**Tooltip:** `"Fale com a Kapaki agora"`  
**Link:**
```
https://wa.me/5515XXXXXXXXX?text=Olá!+Vim+pelo+site+da+Kapaki+e+quero+saber+mais.
```

---

## 9. Páginas de Serviço (SEO Local)

Cada página segue o mesmo layout base: Hero simplificado + conteúdo específico + CTA WhatsApp + seção de dúvidas frequentes (FAQ schema).

### `/assistencia-tecnica`

```
Meta Title:       "Assistência Técnica de Celular em Tatuí-SP | Kapaki"
Meta Description: "Conserto de celular em Tatuí com agilidade e garantia. Troca de tela, bateria, manutenção geral. Fale agora com a Kapaki!"
H1:               "Assistência Técnica de Celular em Tatuí"

Serviços listados:
  - Troca de tela
  - Troca de bateria
  - Recuperação de celular molhado
  - Manutenção geral
  - Desbloqueio

FAQ:
  Q: Quanto tempo demora o conserto?
  A: A maioria dos reparos é feita no mesmo dia. Tela e bateria geralmente em 1-2 horas.

  Q: Tem garantia no serviço?
  A: Sim. Todos os nossos serviços possuem garantia.

  Q: Preciso agendar?
  A: Não é necessário. Pode vir direto na loja ou chamar no WhatsApp antes.
```

### `/acessorios`

```
Meta Title:       "Acessórios para Celular em Tatuí-SP | Kapaki"
Meta Description: "Capinhas, películas, carregadores e fones em Tatuí. Variedade e preço justo na Kapaki Tatuí."
H1:               "Acessórios para Celular em Tatuí"

Produtos destacados:
  - Capinhas (todas as marcas)
  - Películas (vidro e comum)
  - Carregadores (originais e compatíveis)
  - Fones de ouvido
  - Suportes veiculares
  - Cabos e adaptadores
```

### `/aparelhos`

```
Meta Title:       "Celulares Novos e Seminovos em Tatuí-SP | Kapaki"
Meta Description: "Compre seu smartphone com segurança em Tatuí. Aparelhos com garantia e procedência na Kapaki."
H1:               "Celulares Novos e Seminovos em Tatuí"

Diferenciais:
  - Procedência verificada
  - Garantia em todos os aparelhos
  - Seminovos revisados
  - Parcelamento disponível
```

---

## 10. SEO Técnico

### `useHead` / `useSeoMeta` — Página Principal

```typescript
useSeoMeta({
  title: 'Kapaki Tatuí | Acessórios, Assistência Técnica e Celulares em Tatuí-SP',
  description: 'A Kapaki é a loja de confiança em Tatuí para acessórios para celular, assistência técnica especializada e smartphones novos e seminovos. Atendimento rápido e preço justo.',
  ogTitle: 'Kapaki Tatuí | Sua loja de celulares em Tatuí-SP',
  ogDescription: 'Acessórios, assistência técnica e celulares em Tatuí. Fale agora no WhatsApp.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
})
```

### Schema LocalBusiness (JSON-LD)

Inserir via `useHead` no `app.vue` ou `layouts/default.vue`:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Kapaki Tatuí",
  "description": "Loja de acessórios para celular, assistência técnica e venda de smartphones em Tatuí-SP",
  "url": "https://kapaki.com.br",
  "telephone": "+5515XXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[ENDEREÇO]",
    "addressLocality": "Tatuí",
    "addressRegion": "SP",
    "postalCode": "18270-000",
    "addressCountry": "BR"
  },
  "openingHours": [
    "Mo-Fr 09:00-18:00",
    "Sa 09:00-13:00"
  ],
  "image": "https://kapaki.com.br/og-image.jpg",
  "priceRange": "$$",
  "sameAs": [
    "https://www.instagram.com/loja_kapaki_tatui_/"
  ]
}
```

---

## 11. Variáveis de Ambiente / Configuração

Criar arquivo `.env` com:

```env
NUXT_PUBLIC_WHATSAPP_NUMBER=5515XXXXXXXXX
NUXT_PUBLIC_INSTAGRAM=loja_kapaki_tatui_
NUXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Usar `useRuntimeConfig()` para acessar nos componentes.

---

## 12. Estrutura de Arquivos Sugerida

```
kapaki/
├── app.vue
├── nuxt.config.ts
├── .env
├── assets/
│   └── css/
│       └── main.css
├── components/
│   ├── HeroSection.vue
│   ├── ServicosSection.vue
│   ├── ProvasSociaisSection.vue
│   ├── BeneficiosSection.vue
│   ├── CtaFinalSection.vue
│   ├── AppFooter.vue
│   └── WhatsAppFab.vue
├── pages/
│   ├── index.vue
│   ├── assistencia-tecnica.vue
│   ├── acessorios.vue
│   └── aparelhos.vue
└── public/
    ├── favicon.ico
    └── og-image.jpg
```

---

## 13. `nuxt.config.ts` Base

```typescript
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@600;700&display=swap'
        }
      ]
    }
  },
  nitro: {
    preset: 'vercel'
  }
})
```

---

## 14. Checklist de Entrega (Definition of Done)

### Funcional
- [ ] Todas as seções da página principal renderizando corretamente
- [ ] Botões WhatsApp com mensagens pré-preenchidas corretas por serviço
- [ ] FAB WhatsApp fixo funcionando em mobile e desktop
- [ ] Todas as 3 páginas de serviço criadas com copy e SEO únicos
- [ ] Site responsivo (mobile, tablet, desktop)

### SEO
- [ ] `useSeoMeta` configurado em todas as páginas
- [ ] Schema LocalBusiness inserido
- [ ] H1 único por página
- [ ] Meta description única por página
- [ ] Sitemap gerado (via `@nuxtjs/sitemap` ou manual)

### Performance
- [ ] Lighthouse Performance ≥ 90 (mobile)
- [ ] Lighthouse SEO = 100
- [ ] Imagens com lazy loading
- [ ] Fontes com `display=swap`

### Deploy
- [ ] Build sem erros (`nuxt build`)
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] Deploy realizado e URL funcionando

---

## 15. O que está faltando (preencher antes de codar)

| Item | Status |
|---|---|
| Número de WhatsApp real | ⚠️ Pendente |
| Endereço completo da loja | ⚠️ Pendente |
| Horário de funcionamento real | ⚠️ Pendente |
| Foto/logo da loja | ⚠️ Pendente |
| Domínio escolhido | ⚠️ Pendente |
| GA4 ID | ⚠️ Pendente |

---

*PRD gerado para uso com Claude no VSCode — Kapaki Tatuí v1.0*
