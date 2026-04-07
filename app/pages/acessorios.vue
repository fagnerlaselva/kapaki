<script setup lang="ts">
const { whatsappUrl } = useWhatsApp('acessorios')

useServerSeoMeta({
  title: 'Acessorios para Celular em Tatui-SP | Kapaki',
  description: 'Capinhas, peliculas, carregadores e fones em Tatui. Variedade e preco justo na Kapaki Tatui.',
  ogTitle: 'Acessorios para Celular em Tatui | Kapaki',
  ogDescription: 'Capinhas, peliculas, carregadores e fones com preco justo em Tatui-SP.',
  ogImage: 'https://kapaki.com.br/og-image.jpg',
  twitterCard: 'summary_large_image',
})

const products = [
  {
    name: 'Capinhas',
    description: 'Todas as marcas e modelos',
  },
  {
    name: 'Peliculas',
    description: 'Vidro temperado e comum',
  },
  {
    name: 'Carregadores',
    description: 'Originais e compativeis',
  },
  {
    name: 'Fones de ouvido',
    description: 'Varios modelos e marcas',
  },
  {
    name: 'Suportes veiculares',
    description: 'Para o dia a dia no carro',
  },
  {
    name: 'Cabos e adaptadores',
    description: 'USB-C, Lightning e mais',
  },
]
</script>

<template>
  <div>
    <ServiceHeroSection
      title="Acessorios para Celular em Tatui"
      subtitle="Capinhas, peliculas, carregadores, fones e muito mais com preco justo."
      :whatsapp-url="whatsappUrl"
      cta-label="Ver acessorios"
    />

    <section class="py-16 px-4 bg-surface">
      <div class="max-w-4xl mx-auto">
        <h2 class="font-heading text-2xl font-bold text-text mb-8">
          Produtos em destaque
        </h2>
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <li
            v-for="product in products"
            :key="product.name"
            class="bg-background p-5 rounded-lg border border-border text-center"
          >
            <h3 class="font-heading font-semibold text-text">
              {{ product.name }}
            </h3>
            <p class="text-text-muted text-sm mt-2">
              {{ product.description }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <CtaFinalSection :whatsapp-url="whatsappUrl" />
  </div>
</template>
