<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'

const props = defineProps<{
  whatsappUrl: string
}>()

const { gtag } = useGtag()

function trackWhatsApp() {
  gtag('event', 'whatsapp_click', { event_label: 'hero_cta', link_url: props.whatsappUrl })
}

function trackVerServicos() {
  gtag('event', 'ver_servicos_click', { event_label: 'hero_anchor' })
}
</script>

<template>
  <section class="bg-background py-20 lg:py-32 px-4">
    <div class="max-w-6xl mx-auto">
      <h1 class="font-heading text-4xl lg:text-6xl font-bold text-text mb-6">
        Loja de Celulares em Tatui: Acessorios, Consertos e Aparelhos
      </h1>
      <p class="text-lg lg:text-xl text-text-muted mb-8 max-w-2xl">
        A Kapaki e a loja referencia em Tatui e regiao para acessorios, assistencia tecnica e smartphones. Atendimento rapido, preco justo e garantia em tudo.
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 bg-primary text-background font-heading font-semibold px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors"
          @click="trackWhatsApp"
        >
          <MessageCircle class="size-5" />
          Falar no WhatsApp
        </a>
        <a
          href="#servicos"
          class="inline-flex items-center gap-2 border border-text text-text font-heading font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
          @click="trackVerServicos"
        >
          Ver servicos
        </a>
      </div>
    </div>
  </section>
</template>
