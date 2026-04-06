<script setup lang="ts">
import { Star, CheckCircle } from 'lucide-vue-next'
import type { Testimonial } from '~/constants/testimonials'

defineProps<{
  testimonials: Testimonial[]
}>()
</script>

<template>
  <section class="bg-background py-16 px-4">
    <div class="max-w-5xl mx-auto">
      <h2 class="font-heading text-3xl font-bold text-text text-center mb-4">
        Quem veio, aprovou
      </h2>
      <p class="text-text-muted text-center mb-8">
        Centenas de clientes atendidos em Tatui e regiao.
      </p>

      <div class="flex justify-center mb-10">
        <span class="inline-flex items-center gap-2 bg-surface text-primary font-heading font-semibold px-4 py-2 rounded-full text-sm">
          <CheckCircle class="size-4" />
          +500 clientes atendidos em Tatui
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="bg-surface rounded-xl p-6"
        >
          <div class="flex gap-1" :aria-label="`Avaliacao ${testimonial.rating} de 5 estrelas`">
            <Star
              v-for="i in testimonial.rating"
              :key="i"
              class="size-4 fill-primary text-primary"
            />
          </div>
          <p class="text-text mt-4 mb-4">{{ testimonial.text }}</p>
          <p class="font-heading font-semibold text-text">{{ testimonial.name }}</p>
          <p class="text-sm text-text-muted">{{ testimonial.location }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
