<script setup lang="ts">
import { Wrench } from 'lucide-vue-next'
import { FAQS } from '~/constants/faq'

const { whatsappUrl } = useWhatsApp('assistencia')
const faqs = FAQS.assistencia

useServerSeoMeta({
  title: 'Conserto de Celular em Tatui-SP | Assistencia Tecnica Kapaki',
  description: 'Reparo de celular em Tatui com garantia: troca de tela, bateria, celular molhado, desbloqueio. Atendimento rapido na R. Onze de Agosto, 3045 - Jardim Lucila. Ligue ou chame no WhatsApp!',
  ogTitle: 'Conserto de Celular em Tatui | Kapaki Assistencia Tecnica',
  ogDescription: 'Troca de tela, bateria e reparos em celular com garantia em Tatui-SP. Atendimento no mesmo dia!',
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
      title="Conserto de Celular em Tatui"
      subtitle="Assistencia tecnica especializada com garantia. Troca de tela, bateria e reparos no mesmo dia."
      :whatsapp-url="whatsappUrl"
      cta-label="Solicitar orcamento"
    />

    <section class="py-16 px-4 bg-surface">
      <div class="max-w-4xl mx-auto">
        <h2 class="font-heading text-2xl font-bold text-text mb-4">
          Servicos de Reparo de Celular em Tatui
        </h2>
        <p class="text-text-muted mb-8 max-w-2xl">
          A Kapaki e referencia em conserto de celular em Tatui e regiao. Atendemos todas as marcas — Samsung, iPhone, Motorola, Xiaomi e mais. A maioria dos reparos e feita no mesmo dia, com pecas de qualidade e garantia real.
        </p>
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

    <section class="py-16 px-4 bg-background">
      <div class="max-w-4xl mx-auto">
        <h2 class="font-heading text-2xl font-bold text-text mb-4">
          Por que escolher a Kapaki para conserto de celular?
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-text-muted text-sm leading-relaxed">
          <div>
            <h3 class="font-heading font-semibold text-text mb-2">Atendimento rapido</h3>
            <p>A maioria dos consertos e feita no mesmo dia. Troca de tela e bateria em 1 a 2 horas. Voce nao precisa ficar dias sem celular.</p>
          </div>
          <div>
            <h3 class="font-heading font-semibold text-text mb-2">Garantia em todos os servicos</h3>
            <p>Todo reparo realizado na Kapaki vem com garantia. Se houver qualquer problema, voce volta e a gente resolve sem custo adicional.</p>
          </div>
          <div>
            <h3 class="font-heading font-semibold text-text mb-2">Orcamento sem compromisso</h3>
            <p>Traga seu celular para avaliacao gratuita. Voce so paga se aprovar o orcamento. Sem surpresas, sem taxas escondidas.</p>
          </div>
          <div>
            <h3 class="font-heading font-semibold text-text mb-2">Localizacao facil em Tatui</h3>
            <p>Estamos na R. Onze de Agosto, 3045 - Jardim Lucila, dentro do Coop Supermercado. Facil de encontrar, facil de estacionar.</p>
          </div>
        </div>
      </div>
    </section>

    <FaqAccordion :faqs="faqs" />
    <CtaFinalSection :whatsapp-url="whatsappUrl" />
  </div>
</template>
