<script setup lang="ts">
import { FAQS } from '~/constants/faq'

const { whatsappUrl } = useWhatsApp('acessorios')
const faqs = FAQS.acessorios ?? []

useServerSeoMeta({
  title: 'Acessorios para Celular em Tatui-SP | Capinhas, Peliculas e Mais | Kapaki',
  description: 'Compre acessorios para celular em Tatui: capinhas, peliculas de vidro, carregadores, fones e cabos. Todas as marcas, preco justo e pronta entrega na R. Onze de Agosto, 3045.',
  ogTitle: 'Acessorios para Celular em Tatui | Kapaki',
  ogDescription: 'Capinhas, peliculas, carregadores e fones para todas as marcas em Tatui-SP. Preco justo e pronta entrega!',
  ogImage: 'https://kapaki.com.br/logo.png',
  twitterCard: 'summary_large_image',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }),
    },
  ],
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
      subtitle="Capinhas, peliculas, carregadores, fones e muito mais. Todas as marcas com preco justo e pronta entrega."
      :whatsapp-url="whatsappUrl"
      cta-label="Ver acessorios"
    />

    <section class="py-16 px-4 bg-surface">
      <div class="max-w-4xl mx-auto">
        <h2 class="font-heading text-2xl font-bold text-text mb-4">
          Acessorios para Celular em Tatui e Regiao
        </h2>
        <p class="text-text-muted mb-8 max-w-2xl">
          Na Kapaki voce encontra acessorios para todas as marcas de celular: Samsung, iPhone, Motorola, Xiaomi e muito mais. Tudo com preco justo e pronta entrega em nossa loja na R. Onze de Agosto, 3045 - Jardim Lucila.
        </p>
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

    <section class="py-16 px-4 bg-background">
      <div class="max-w-4xl mx-auto">
        <h2 class="font-heading text-2xl font-bold text-text mb-4">
          Por que comprar acessorios na Kapaki?
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-text-muted text-sm leading-relaxed">
          <div>
            <h3 class="font-heading font-semibold text-text mb-2">Variedade para todas as marcas</h3>
            <p>Trabalhamos com acessorios para Samsung, iPhone, Motorola, Xiaomi, LG e mais. Se voce tem um celular, a gente tem o acessorio.</p>
          </div>
          <div>
            <h3 class="font-heading font-semibold text-text mb-2">Preco justo de Tatui</h3>
            <p>Sem preco de shopping e sem frete. Compre direto na loja com o melhor custo-beneficio da regiao.</p>
          </div>
          <div>
            <h3 class="font-heading font-semibold text-text mb-2">Pronta entrega</h3>
            <p>Nao precisa esperar. Nossos acessorios estao em estoque e voce leva na hora. Se nao tiver, a gente encomenda rapidinho.</p>
          </div>
          <div>
            <h3 class="font-heading font-semibold text-text mb-2">Atendimento especializado</h3>
            <p>A equipe da Kapaki ajuda voce a escolher o acessorio certo para o seu modelo. Sem erro, sem devolucao.</p>
          </div>
        </div>
      </div>
    </section>

    <FaqAccordion :faqs="faqs" />
    <CtaFinalSection :whatsapp-url="whatsappUrl" />
  </div>
</template>
