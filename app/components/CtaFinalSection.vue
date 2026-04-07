<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'

const props = defineProps<{
  whatsappUrl: string
}>()

const { gtag } = useGtag()

function trackCtaWhatsApp() {
  gtag('event', 'whatsapp_click', { event_label: 'cta_final', link_url: props.whatsappUrl })
}
</script>

<template>
  <section class="bg-primary py-16 px-4">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="font-heading text-3xl font-bold text-background text-center mb-4">
        Precisa de ajuda agora?
      </h2>
      <p class="text-background/80 text-center mb-8 max-w-xl mx-auto">
        Fale com um especialista da Kapaki. Atendimento imediato pelo WhatsApp.
      </p>
      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 bg-background text-text font-heading font-semibold px-8 py-4 rounded-lg hover:bg-background/90 transition-colors"
        @click="trackCtaWhatsApp"
      >
        <MessageCircle class="size-5" />
        Chamar no WhatsApp agora
      </a>
      <p class="text-sm text-background/60 text-center mt-4">
        Respondemos em instantes - Seg a Sab - Tatui-SP
      </p>
    </div>
  </section>
</template>
