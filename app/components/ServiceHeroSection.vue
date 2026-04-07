<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'

const props = defineProps<{
  title: string
  subtitle: string
  whatsappUrl: string
  ctaLabel: string
}>()

const { gtag } = useGtag()

function trackServiceHeroCta() {
  gtag('event', 'whatsapp_click', { event_label: 'service_hero', link_url: props.whatsappUrl })
}
</script>

<template>
  <section class="bg-background py-20 lg:py-28 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="font-heading text-3xl lg:text-5xl font-bold text-text mb-4">
        {{ title }}
      </h1>
      <p class="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
        {{ subtitle }}
      </p>
      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 bg-primary text-background font-heading font-semibold px-8 py-4 rounded-lg hover:bg-primary-hover transition-colors"
        @click="trackServiceHeroCta"
      >
        <MessageCircle class="size-5" />
        {{ ctaLabel }}
      </a>
    </div>
  </section>
</template>
