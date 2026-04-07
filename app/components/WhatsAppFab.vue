<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'

const props = defineProps<{
  whatsappUrl: string
}>()

const { gtag } = useGtag()

function trackFabClick() {
  gtag('event', 'whatsapp_click', { event_label: 'fab', link_url: props.whatsappUrl })
}
</script>

<template>
  <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-6 right-6 z-50 size-14 rounded-full bg-whatsapp text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    aria-label="Fale com a Kapaki agora pelo WhatsApp"
    title="Fale com a Kapaki agora"
    @click="trackFabClick"
  >
    <MessageCircle class="size-7" />
  </a>
</template>
