<script setup lang="ts">
import { Zap, Tag, Shield, MapPin } from 'lucide-vue-next'
import type { Benefit } from '~/constants/benefits'

defineProps<{
  benefits: Benefit[]
}>()

const iconMap = {
  zap: Zap,
  tag: Tag,
  shield: Shield,
  mappin: MapPin,
}
</script>

<template>
  <section class="bg-surface py-16 px-4">
    <div class="max-w-5xl mx-auto">
      <h2 class="font-heading text-3xl font-bold text-text text-center mb-12">
        Por que escolher a Kapaki?
      </h2>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="benefit in benefits"
          :key="benefit.icon"
          class="text-center"
        >
          <component
            :is="iconMap[benefit.icon]"
            class="size-8 text-primary mx-auto mb-4"
          />
          <h3 class="font-heading font-semibold text-text mb-2">{{ benefit.title }}</h3>
          <p class="text-sm text-text-muted">{{ benefit.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
