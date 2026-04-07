import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  // CRITICAL: 'vercel' enables SSR — never 'vercel-static'
  nitro: {
    preset: 'vercel',
  },

  modules: [
    '@nuxtjs/seo',
    '@nuxt/fonts',
    '@nuxt/image',
    'nuxt-gtag',
  ],

  gtag: {
    id: process.env.NUXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX',
    // Explicit async loading to ensure gtag.js does not block page rendering
    loadingStrategy: 'async',
  },

  // Ensure lang="pt-BR" is set on <html> for Lighthouse SEO = 100
  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR',
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['~/assets/css/main.css'],

  // @nuxt/fonts: self-hosts Inter + Poppins at build time
  fonts: {
    families: [
      { name: 'Inter', weights: [400, 500] },
      { name: 'Poppins', weights: [600, 700, 800] },
    ],
  },

  // nuxt-site-config (included in @nuxtjs/seo): canonical + sitemap base URL
  site: {
    url: 'https://kapaki.com.br', // PLACEHOLDER — replace with real domain
    name: 'Kapaki Tatui',
    description: 'Acessorios, assistencia tecnica e aparelhos em Tatui-SP',
    defaultLocale: 'pt-BR',
  },

  // @nuxt/image: declare all breakpoint widths used by NuxtImg
  image: {
    screens: { sm: 640, md: 768, lg: 1024, xl: 1280 },
  },

  // nuxt-og-image: disable dynamic rendering to avoid interactive TTY prompt in non-terminal envs
  ogImage: {
    zeroRuntime: true,
  },
})
