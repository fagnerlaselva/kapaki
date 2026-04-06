# Domain Pitfalls

**Domain:** Site institucional com SEO local — loja de assistencia tecnica e acessorios para celular
**Stack:** Nuxt 3 + Tailwind CSS + TypeScript, deploy Vercel SSR
**Researched:** 2026-04-06

---

## Critical Pitfalls

Erros que causam retrabalho profundo, indexacao comprometida ou conversao zerada.

---

### Pitfall 1: Preset Vercel Errado (vercel-static em vez de vercel)

**What goes wrong:** Usar `nitro.preset: 'vercel-static'` (ou omitir o preset) faz o Nuxt gerar um site 100% estatico. O Google recebe HTML pre-renderizado apenas das rotas geradas em build time. Rotas dinamicas ou conteudo dependente de SSR nao sao indexadas corretamente.

**Why it happens:** A documentacao do Vercel mostra `vercel` e `vercel-static` como opcoes validas. Desenvolvedores confundem os dois, especialmente vindos de projetos Next.js onde "static export" e comum.

**Consequences:**
- SSR comprometido: o bot do Google recebe HTML correto no build, mas qualquer mudanca de conteudo so aparece apos novo deploy
- `useSeoMeta` e JSON-LD renderizados corretamente no HTML apenas se SSR estiver ativo — com static, a hidracao pode diferir do HTML inicial
- Schema LocalBusiness pode ser ausente no HTML entregue ao crawler se a pagina nao for gerada no build

**Prevention:**
```typescript
// nuxt.config.ts — OBRIGATORIO para este projeto
export default defineNuxtConfig({
  nitro: {
    preset: 'vercel'  // NAO 'vercel-static', NAO omitir
  }
})
```

**Detection:** Apos deploy, inspecione o HTML bruto via `curl https://seu-dominio.com` (sem JavaScript). Se o `<script type="application/ld+json">` e as meta tags estiverem presentes, SSR esta ativo. Se nao, o preset esta errado.

**Phase:** Configurar e validar no primeiro deploy (Phase 1 / setup inicial).

---

### Pitfall 2: Hydration Mismatch por Acesso a APIs do Browser no SSR

**What goes wrong:** Qualquer acesso direto a `window`, `document`, `localStorage`, ou `navigator` fora de `onMounted` causa erro de hidratacao. O HTML gerado pelo servidor difere do que o Vue tenta re-renderizar no cliente, resultando em flickering, erros no console e potencial quebra de interatividade.

**Why it happens:** FAB WhatsApp com logica de scroll (`window.scrollY`), deteccao de dispositivo (`navigator.userAgent`), ou leitura de preferencias salvas (`localStorage`) sao casos tipicos deste projeto.

**Consequences:**
- FAB WhatsApp pode sumir ou duplicar apos hidratacao
- Erros `[nuxt] [Vue warn]: Hydration node mismatch` no console
- Lighthouse penaliza CLS causado por elementos que aparecem/somem durante hidratacao

**Prevention:**
```vue
<!-- Para o FAB WhatsApp que aparece apos scroll -->
<script setup>
const isVisible = ref(false)
// CORRETO: acesso a window apenas no cliente
onMounted(() => {
  window.addEventListener('scroll', () => {
    isVisible.value = window.scrollY > 300
  })
})
</script>
```

Ou usar o componente nativo `<ClientOnly>` para isolar componentes que dependem do browser:
```vue
<ClientOnly>
  <WhatsAppFAB />
</ClientOnly>
```

**Detection:** Erro `Hydration node mismatch` no console do browser em desenvolvimento. O FAB aparece/desaparece imediatamente ao carregar a pagina.

**Phase:** Todo componente com logica de scroll/viewport (FAB WhatsApp) deve ser validado contra isso na fase de componentes.

---

### Pitfall 3: NAP Inconsistente entre Schema, Pagina e Google Business Profile

**What goes wrong:** O schema `LocalBusiness` no JSON-LD tem nome, telefone ou endereco diferentes do texto visivelmente na pagina e do Google Business Profile. O Google usa consistencia de NAP (Name, Address, Phone) como sinal de confianca para SEO local. Qualquer discrepancia penaliza o ranking local.

**Why it happens:** Dados reais (telefone, endereco) sao preenchidos tarde no projeto com placeholders. Na pressa, o schema e atualizado mas o texto na pagina nao, ou vice-versa. Formato do telefone (com/sem DDD, com/sem espacos) diverge entre fontes.

**Consequences:**
- Perda de relevancia no Google Maps e busca "assistencia tecnica perto de mim"
- Schema invalido detectado pelo Google Search Console
- Sem elegibilidade para rich results (business panel com horarios, telefone)

**Prevention:**
- Centralizar dados NAP em um unico arquivo de configuracao:
```typescript
// config/business.ts
export const BUSINESS = {
  name: 'Kapaki Tatui',
  phone: '+55 15 9XXXX-XXXX',   // formato unico, reutilizado em todo o site
  phoneRaw: '55159XXXXXXXX',    // para links wa.me e tel:
  address: {
    street: 'Rua X, NNN',
    city: 'Tatui',
    state: 'SP',
    zip: 'XX.XXX-XXX',
    country: 'BR'
  }
}
```
- Validar com [Google Rich Results Test](https://search.google.com/test/rich-results) antes de qualquer deploy para producao

**Detection:** Google Search Console > Melhorias > Dados estruturados — erros ou avisos de LocalBusiness. Diferenca visivel ao comparar texto da pagina com o JSON-LD inspecionado.

**Phase:** Definir `config/business.ts` no setup inicial. Preencher com dados reais antes do deploy final.

---

### Pitfall 4: og:image e canonical com URL Relativa ou de Preview do Vercel

**What goes wrong:** `useSeoMeta({ ogImage: '/og-image.jpg' })` gera uma URL relativa. Ao compartilhar no WhatsApp ou em redes sociais, o preview nao exibe imagem. O canonical `<link rel="canonical">` sem URL absoluta tambem e ignorado por crawlers.

**Why it happens:** Em desenvolvimento local, URLs relativas funcionam corretamente. O problema so aparece em producao ou em ambientes de preview do Vercel (que tem URLs como `projeto-abc123.vercel.app`), quando o og:image e o canonical precisam de URL absoluta.

**Consequences:**
- Links compartilhados no WhatsApp nao exibem preview de imagem — impacto direto na conversao quando clientes compartilham a pagina
- Google pode considerar versao de preview do Vercel como URL canonica, dividindo autoridade SEO
- Cada preview deploy do Vercel gera uma URL unica indexavel, criando duplicatas

**Prevention:**
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  site: {
    url: 'https://www.kapakitatui.com.br'  // URL de producao, absoluta
  }
})
```
```typescript
// Em cada pagina:
useSeoMeta({
  ogImage: 'https://www.kapakitatui.com.br/og-image.jpg',  // absoluta
})
useHead({
  link: [{ rel: 'canonical', href: 'https://www.kapakitatui.com.br/assistencia-tecnica' }]
})
```

Adicionar no `vercel.json` para bloquear indexacao de previews:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "has": [{ "type": "header", "key": "x-vercel-deployment-url" }],
      "headers": [{ "key": "X-Robots-Tag", "value": "noindex" }]
    }
  ]
}
```

**Detection:** Inspecionar HTML em producao procurando `<meta property="og:image">` — deve comecar com `https://`. Testar compartilhamento no WhatsApp Web antes de lancar.

**Phase:** Configurar `site.url` no setup. Validar og:image antes do lancamento publico.

---

## Moderate Pitfalls

---

### Pitfall 5: LCP Destruido por Lazy Loading na Imagem Hero

**What goes wrong:** Aplicar `loading="lazy"` ou nao especificar `fetchpriority` na imagem principal do Hero faz o browser baixar a imagem somente apos o layout inicial. O LCP (Largest Contentful Paint) explode, destruindo o score Lighthouse mobile.

**Why it happens:** `<NuxtImg>` por padrao aplica lazy loading. Desenvolvedores copiam o padrao para todas as imagens sem distinguir above-the-fold de below-the-fold.

**Consequences:** Lighthouse mobile abaixo de 90. Google penaliza sites lentos no ranking mobile — critico para publico 100% mobile deste projeto.

**Prevention:**
```vue
<!-- Hero image: NUNCA lazy, SEMPRE fetchpriority high -->
<NuxtImg
  src="/hero.webp"
  alt="Kapaki Tatui - Assistencia Tecnica"
  :width="800"
  :height="600"
  loading="eager"
  fetchpriority="high"
  format="webp"
/>

<!-- Imagens abaixo do fold: lazy esta correto -->
<NuxtImg
  src="/produto.webp"
  loading="lazy"
  fetchpriority="low"
/>
```

**Detection:** Lighthouse mobile — metrica LCP > 2.5s com imagem identificada como elemento LCP. DevTools > Network: imagem hero com `Initiator: parser` tardio.

**Phase:** Validar na implementacao do Hero (Phase 1 da homepage).

---

### Pitfall 6: Google Fonts Causando CLS e Render Blocking

**What goes wrong:** Carregar Poppins e Inter via `<link>` para Google Fonts sem estrategia de fallback causa CLS (layout shift) quando a fonte carrega e substitui a fonte do sistema. Tambem pode bloquear renderizacao se `display=swap` nao estiver configurado.

**Why it happens:** `@nuxtjs/google-fonts` ou `nuxt/fonts` precisam de configuracao explicita para evitar CLS. A configuracao padrao nao garante metricas de fallback otimizadas.

**Consequences:** CLS > 0.1 reprovando Core Web Vitals. Lighthouse penaliza render-blocking resources.

**Prevention:**
```typescript
// nuxt.config.ts — usando @nuxt/fonts (recomendado sobre @nuxtjs/google-fonts)
export default defineNuxtConfig({
  fonts: {
    families: [
      { name: 'Poppins', weights: [600, 700] },  // apenas pesos usados
      { name: 'Inter', weights: [400, 500] }
    ]
  }
})
```

Complementar com `@nuxtjs/fontaine` para gerar metricas de fallback automaticamente e eliminar CLS de fonte.

**Detection:** Lighthouse > Diagnostics > "Ensure text remains visible during webfont load". CLS > 0.1 com fonte como causa.

**Phase:** Configurar no setup de tipografia. Testar antes de adicionar conteudo real.

---

### Pitfall 7: Link WhatsApp com Numero Mal Formatado ou Mensagem Nao Codificada

**What goes wrong:** `https://wa.me/+55 15 9XXXX-XXXX?text=Ola preciso de assistencia!` — espacos, `+`, `-` e caracteres especiais nao codificados quebram o link em alguns dispositivos ou versoes do WhatsApp Web.

**Why it happens:** Desenvolvedores testam em um unico dispositivo onde o WhatsApp resolve a URL mesmo malformada. Em outros contextos (WhatsApp Web, iOS vs Android), o link falha silenciosamente — o usuario clica e nada acontece.

**Consequences:** Conversao zerada para usuarios cujo dispositivo nao tolera a URL malformada. Impossivel detectar sem testes em multiplos dispositivos.

**Prevention:**
```typescript
// composable/useWhatsApp.ts
export function buildWhatsAppUrl(message: string): string {
  const phone = '5515XXXXXXXXX'  // apenas digitos, com DDI, sem + ou espacos
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encoded}`
}

// Uso por pagina de servico:
const url = buildWhatsAppUrl('Ola! Quero um orcamento para troca de tela.')
```

**Detection:** Testar o link manualmente no celular Android, iPhone, e WhatsApp Web. Verificar se a mensagem pre-preenchida aparece corretamente.

**Phase:** Implementar o composable antes de criar qualquer botao WhatsApp. Testar em 3 dispositivos diferentes antes do lancamento.

---

### Pitfall 8: GA4 Inicializado no Servidor (SSR) ou Sem Consentimento

**What goes wrong:** `nuxt-gtag` com `initMode` padrao inicializa GA4 imediatamente, inclusive durante SSR. Chamadas `gtag()` no lado do servidor nao tem efeito mas podem gerar erros. Alem disso, inicializar GA4 sem consentimento do usuario e risco legal no contexto brasileiro (LGPD).

**Why it happens:** O modulo `nuxt-gtag` e facil de instalar e configurar com ID do GA4. Desenvolvedores copiam o exemplo basico sem considerar SSR e consentimento.

**Consequences:**
- Dados de analytics incorretos ou ausentes
- Risco de compliance LGPD (Lei Geral de Protecao de Dados)
- Erros silenciosos no servidor que nao afetam o usuario mas poluem logs

**Prevention:**
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  gtag: {
    id: 'G-XXXXXXXXXX',
    initMode: 'manual'  // controle expliciito de quando inicializar
  }
})
```
```typescript
// plugins/analytics.client.ts  (sufixo .client garante execucao apenas no browser)
export default defineNuxtPlugin(() => {
  const { gtag } = useGtag()
  // Inicializar apos consentimento ou imediatamente se nao houver banner de cookies
  gtag('consent', 'default', { analytics_storage: 'granted' })
  useGtag().initialize()
})
```

**Detection:** DevTools > Network: verificar se `gtag/js` e carregado apenas no cliente. Verificar se eventos aparecem no GA4 DebugView.

**Phase:** Configurar junto com o setup do projeto. Validar rastreamento antes do lancamento.

---

### Pitfall 9: Schema JSON-LD com Tipo Generico LocalBusiness

**What goes wrong:** Usar `@type: "LocalBusiness"` quando existe um tipo mais especifico disponivel reduz a elegibilidade para rich results. Para assistencia tecnica de celulares, o tipo correto e `ElectronicsRepair` (subtype de `LocalBusiness`).

**Why it happens:** Tutoriais genericos ensinam `LocalBusiness` como padrao. Desenvolvedores nao pesquisam o schema.org para encontrar tipos mais especificos.

**Consequences:** Menor destaque nos resultados de busca local. Google pode nao exibir o business panel com horarios e telefone clicavel.

**Prevention:**
```json
{
  "@context": "https://schema.org",
  "@type": "ElectronicsRepair",
  "name": "Kapaki Tatui",
  "description": "Assistencia tecnica para celulares, acessorios e venda de aparelhos em Tatui-SP",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua X, NNN",
    "addressLocality": "Tatui",
    "addressRegion": "SP",
    "postalCode": "XX.XXX-XXX",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-23.XXXXXX",
    "longitude": "-47.XXXXXX"
  },
  "telephone": "+55-15-9XXXX-XXXX",
  "url": "https://www.kapakitatui.com.br",
  "openingHoursSpecification": [...],
  "sameAs": ["https://www.instagram.com/loja_kapaki_tatui_"]
}
```

**Detection:** [Google Rich Results Test](https://search.google.com/test/rich-results) — verificar se o tipo detectado e o mais especifico possivel. Schema.org validator para verificar propriedades obrigatorias.

**Phase:** Implementar schema na fase de SEO. Testar antes do primeiro deploy de producao.

---

## Minor Pitfalls

---

### Pitfall 10: Prefetch Links Acumulando no HTML do Nuxt

**What goes wrong:** O Nuxt 3 gera automaticamente tags `<link rel="prefetch">` para cada import dinamico. Em projetos com varios componentes, isso acumula dezenas de tags no `<head>`, causando requisicoes desnecessarias e impactando o score Lighthouse.

**Prevention:**
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  experimental: {
    // Desabilitar prefetch automatico se Lighthouse indicar problema
    renderJsonPayloads: true
  }
})
```

Ou usar `nuxt-vitalizer` que remove automaticamente prefetch links que nao sao necessarios na pagina atual.

**Detection:** Inspecionar `<head>` em producao — mais de 10 tags `<link rel="prefetch">` e sinal de problema.

---

### Pitfall 11: robots.txt na Pasta Public Conflitando com o Modulo

**What goes wrong:** Ter um arquivo `public/robots.txt` manual ao mesmo tempo que usar `@nuxtjs/robots` gera conflito. O arquivo manual tem precedencia e ignora a configuracao do modulo, podendo bloquear indexacao acidentalmente.

**Prevention:** Se usar `@nuxtjs/robots` (recomendado), nao criar `public/robots.txt`. Toda configuracao vai em `nuxt.config.ts`:
```typescript
export default defineNuxtConfig({
  robots: {
    allow: '/',
    sitemap: 'https://www.kapakitatui.com.br/sitemap.xml'
  }
})
```

**Detection:** Acessar `/robots.txt` em producao e verificar se o conteudo bate com a configuracao do modulo.

---

### Pitfall 12: Tailwind CSS Purgando Classes de Dark Mode

**What goes wrong:** Classes `dark:` usadas dinamicamente (via strings JavaScript) podem ser purgadas pelo Tailwind CSS em producao se o JIT nao as detectar como usadas. O site perde estilizacao no dark mode apos o build.

**Why it happens:** Este projeto usa dark mode fixo (background `#111111`), mas classes como `dark:bg-gray-900` construidas dinamicamente em strings nao sao detectadas pelo scanner do Tailwind.

**Prevention:** Evitar construcao dinamica de classes Tailwind. Prefira classes completas e estaticas:
```typescript
// ERRADO — Tailwind nao detecta
const bgClass = `dark:bg-${color}-900`

// CORRETO — Tailwind detecta no scan
const bgClass = isDark ? 'bg-gray-900' : 'bg-white'
```

**Detection:** Build de producao + inspecionar elemento que deveria ter a classe — se a classe nao aparecer no CSS gerado, foi purgada.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Setup inicial / nuxt.config.ts | Preset `vercel-static` em vez de `vercel` | Verificar preset no primeiro deploy |
| Componente FAB WhatsApp | Hydration mismatch com `window.scrollY` | Usar `onMounted` ou `<ClientOnly>` |
| Hero section | `loading="lazy"` na imagem principal | `loading="eager" fetchpriority="high"` |
| Tipografia (Poppins + Inter) | CLS por fallback de fonte sem metricas | Configurar `@nuxt/fonts` + fontaine |
| Schema LocalBusiness JSON-LD | Tipo generico, NAP inconsistente | Centralizar NAP, usar `ElectronicsRepair` |
| Botoes WhatsApp | URL malformada com caracteres nao codificados | Composable com `encodeURIComponent` |
| og:image / canonical | URLs relativas | Configurar `site.url` absoluta |
| GA4 / analytics | Inicializacao no servidor, sem consentimento | Plugin `.client.ts` com `initMode: 'manual'` |
| Deploy preview Vercel | Preview URLs indexadas pelo Google | Header `X-Robots-Tag: noindex` em previews |
| robots.txt | Conflito entre arquivo manual e modulo | Escolher um: arquivo ou modulo, nao os dois |

---

## Sources

- [Nuxt SSR Pitfalls and Avoidance — InfiniteJS](https://infinitejs.com/posts/nuxt-ssr-pitfalls-avoidance/) — MEDIUM confidence (via WebSearch)
- [Nuxt Best Practices: Hydration — Nuxt Docs v3](https://nuxt.com/docs/3.x/guide/best-practices/hydration) — HIGH confidence (oficial)
- [Nuxt on Vercel — Vercel Docs](https://vercel.com/docs/frameworks/full-stack/nuxt) — HIGH confidence (oficial)
- [nuxt-gtag — Nuxt Modules](https://nuxt.com/modules/gtag) — HIGH confidence (oficial)
- [Google Analytics — Nuxt Scripts](https://scripts.nuxt.com/scripts/analytics/google-analytics) — HIGH confidence (oficial)
- [Local Business Structured Data — Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/local-business) — HIGH confidence (oficial)
- [JSON-LD Structured Data in Nuxt — NuxtSEO](https://nuxtseo.com/learn-seo/nuxt/mastering-meta/schema-org) — MEDIUM confidence
- [Canonical URL — Nuxt SEO Utils](https://nuxtseo.com/docs/seo-utils/guides/canonical-url) — MEDIUM confidence
- [Nuxt Image: LCP Discussion — GitHub](https://github.com/nuxt/image/discussions/563) — MEDIUM confidence
- [Improving Performance with Fontaine — DEV Community](https://dev.to/jacobandrewsky/improving-performance-of-nuxt-with-fontaine-5dim) — MEDIUM confidence
- [nuxt-vitalizer — Nuxt Modules](https://nuxt.com/modules/vitalizer) — HIGH confidence (oficial)
- [wa.me Link Format — BusinessChat Help](https://help.businesschat.io/en/articles/6517838-how-to-build-a-whatsapp-click-to-chat-url-wa-me) — MEDIUM confidence
- [Config using Robots.txt — Nuxt Robots](https://nuxtseo.com/docs/robots/guides/robots-txt) — HIGH confidence (oficial)
- [Install Nuxt Sitemap — Nuxt SEO](https://nuxtseo.com/docs/sitemap/getting-started/installation) — HIGH confidence (oficial)
- [Nuxt 3 Performance Best Practices — Nuxt Docs v3](https://nuxt.com/docs/3.x/guide/best-practices/performance) — HIGH confidence (oficial)
