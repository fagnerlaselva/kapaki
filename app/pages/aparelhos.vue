<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next'
import { FAQS } from '~/constants/faq'

const { whatsappUrl } = useWhatsApp('aparelhos')
const faqs = FAQS.aparelhos ?? []

useServerSeoMeta({
  title: 'Comprar Celular em Tatui-SP | Smartphones Novos e Seminovos | Kapaki',
  description: 'Compre celular em Tatui com garantia e procedencia: smartphones novos e seminovos Samsung, iPhone, Motorola e Xiaomi. Parcelamento disponivel na R. Onze de Agosto, 3045.',
  ogTitle: 'Comprar Celular em Tatui | Kapaki Smartphones',
  ogDescription: 'Smartphones novos e seminovos com garantia em Tatui-SP. Todas as marcas, parcelamento disponivel!',
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

const differentials = [
  'Procedencia verificada',
  'Garantia em todos os aparelhos',
  'Seminovos revisados',
  'Parcelamento disponivel',
]
</script>

<template>
  <div>
    <ServiceHeroSection
      title="Comprar Celular em Tatui"
      subtitle="Smartphones novos e seminovos com garantia, procedencia verificada e parcelamento. Todas as marcas em um so lugar."
      :whatsapp-url="whatsappUrl"
      cta-label="Ver aparelhos disponiveis"
    />

    <section class="py-16 px-4 bg-surface">
      <div class="max-w-4xl mx-auto">
        <h2 class="font-heading text-2xl font-bold text-text mb-4">
          Celulares a Venda em Tatui e Regiao
        </h2>
        <p class="text-text-muted mb-8 max-w-2xl">
          Na Kapaki voce encontra smartphones das melhores marcas — Samsung, iPhone, Motorola, Xiaomi — novos e seminovos revisados. Todos com garantia e procedencia verificada. Visite nossa loja na R. Onze de Agosto, 3045 ou chame no WhatsApp para saber os modelos disponiveis.
        </p>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <li
            v-for="differential in differentials"
            :key="differential"
            class="flex items-start gap-4 bg-background p-5 rounded-lg border border-border"
          >
            <ShieldCheck class="size-5 text-primary shrink-0 mt-0.5" />
            <span class="text-text font-heading font-semibold">{{ differential }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="py-16 px-4 bg-background">
      <div class="max-w-4xl mx-auto">
        <h2 class="font-heading text-2xl font-bold text-text mb-4">
          Vantagens de comprar celular na Kapaki Tatui
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-text-muted text-sm leading-relaxed">
          <div>
            <h3 class="font-heading font-semibold text-text mb-2">Seminovos 100% revisados</h3>
            <p>Todo celular seminovo passa por uma revisao completa antes de ser colocado a venda. Bateria, tela, botoes — tudo testado e aprovado.</p>
          </div>
          <div>
            <h3 class="font-heading font-semibold text-text mb-2">Garantia real</h3>
            <p>Diferente de comprar em classificados, na Kapaki voce tem garantia. Se der qualquer problema, e so voltar na loja.</p>
          </div>
          <div>
            <h3 class="font-heading font-semibold text-text mb-2">Parcelamento no cartao</h3>
            <p>Parcele seu celular novo ou seminovo no cartao. Consulte condicoes diretamente na loja ou pelo WhatsApp.</p>
          </div>
          <div>
            <h3 class="font-heading font-semibold text-text mb-2">Atendimento presencial em Tatui</h3>
            <p>Veja o celular pessoalmente, teste antes de comprar. Estamos no Coop Supermercado da R. Onze de Agosto, 3045 - Jardim Lucila.</p>
          </div>
        </div>
      </div>
    </section>

    <FaqAccordion :faqs="faqs" />
    <CtaFinalSection :whatsapp-url="whatsappUrl" />
  </div>
</template>
