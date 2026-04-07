<script setup lang="ts">
import { Wrench } from 'lucide-vue-next'
import { FAQS } from '~/constants/faq'

const { whatsappUrl } = useWhatsApp('assistencia')
const faqs = FAQS.assistencia

useServerSeoMeta({
  title: 'Assistencia Tecnica de Celular em Tatui-SP | Kapaki',
  description: 'Conserto de celular em Tatui com agilidade e garantia. Troca de tela, bateria, manutencao geral. Fale agora com a Kapaki!',
  ogTitle: 'Assistencia Tecnica de Celular em Tatui | Kapaki',
  ogDescription: 'Troca de tela, bateria e consertos com garantia em Tatui-SP.',
  ogImage: 'https://kapaki.com.br/og-image.jpg',
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

const services = [
  'Troca de tela',
  'Troca de bateria',
  'Recuperacao de celular molhado',
  'Manutencao geral',
  'Desbloqueio',
]
</script>

<template>
  <div>
    <ServiceHeroSection
      title="Assistencia Tecnica de Celular em Tatui"
      subtitle="Troca de tela, bateria e consertos em geral com garantia."
      :whatsapp-url="whatsappUrl"
      cta-label="Solicitar orcamento"
    />

    <section class="py-16 px-4 bg-surface">
      <div class="max-w-4xl mx-auto">
        <h2 class="font-heading text-2xl font-bold text-text mb-8">
          Nossos servicos
        </h2>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <li
            v-for="service in services"
            :key="service"
            class="flex items-center gap-3 bg-background p-4 rounded-lg border border-border"
          >
            <Wrench class="size-5 text-primary shrink-0" />
            <span class="text-text font-heading font-semibold">{{ service }}</span>
          </li>
        </ul>
      </div>
    </section>

    <FaqAccordion :faqs="faqs" />
    <CtaFinalSection :whatsapp-url="whatsappUrl" />
  </div>
</template>
