<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  ctaLabel: string
  whatsappUrl: string
  badge?: string
  featured?: boolean
}>()

const { gtag } = useGtag()

function trackServiceCta() {
  gtag('event', 'service_cta_click', { event_label: props.title, link_url: props.whatsappUrl })
}
</script>

<template>
  <div
    class="bg-surface rounded-xl p-6 flex flex-col gap-4 relative"
    :class="featured ? 'border-2 border-primary' : 'border border-white/10'"
  >
    <span
      v-if="badge"
      class="absolute -top-3 left-6 bg-primary text-background text-xs font-heading font-bold px-3 py-1 rounded-full"
    >{{ badge }}</span>
    <h3 class="font-heading text-xl font-semibold text-text">{{ title }}</h3>
    <p class="text-text-muted text-sm leading-relaxed">{{ description }}</p>
    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-auto inline-flex items-center gap-1 text-primary font-semibold hover:underline"
      @click="trackServiceCta"
    >{{ ctaLabel }} &rarr;</a>
  </div>
</template>
