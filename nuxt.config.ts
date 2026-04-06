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
  ],

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
})
