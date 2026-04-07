<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next'

const { whatsappUrl } = useWhatsApp('aparelhos')

useServerSeoMeta({
  title: 'Celulares Novos e Seminovos em Tatui-SP | Kapaki',
  description: 'Compre seu smartphone com seguranca em Tatui. Aparelhos com garantia e procedencia na Kapaki.',
  ogTitle: 'Celulares Novos e Seminovos em Tatui | Kapaki',
  ogDescription: 'Smartphones com garantia e procedencia em Tatui-SP.',
  ogImage: 'https://kapaki.com.br/og-image.jpg',
  twitterCard: 'summary_large_image',
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
      title="Celulares Novos e Seminovos em Tatui"
      subtitle="Smartphones com procedencia verificada e garantia."
      :whatsapp-url="whatsappUrl"
      cta-label="Ver aparelhos"
    />

    <section class="py-16 px-4 bg-surface">
      <div class="max-w-4xl mx-auto">
        <h2 class="font-heading text-2xl font-bold text-text mb-8">
          Por que comprar na Kapaki?
        </h2>
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

    <CtaFinalSection :whatsapp-url="whatsappUrl" />
  </div>
</template>
