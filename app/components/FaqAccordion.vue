<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import type { FaqItem } from '~/constants/faq'

defineProps<{
  faqs: FaqItem[]
}>()
</script>

<template>
  <section class="py-16 px-4 bg-background">
    <div class="max-w-3xl mx-auto">
      <h2 class="font-heading text-2xl font-bold text-text mb-8">
        Perguntas frequentes
      </h2>
      <div class="space-y-3">
        <details
          v-for="faq in faqs"
          :key="faq.question"
          class="border border-border rounded-lg overflow-hidden group"
        >
          <summary class="flex justify-between items-center px-5 py-4 cursor-pointer font-heading font-semibold text-text list-none">
            {{ faq.question }}
            <ChevronDown class="size-5 text-text-muted transition-transform group-open:rotate-180" />
          </summary>
          <p class="px-5 pb-4 text-text-muted text-sm leading-relaxed">
            {{ faq.answer }}
          </p>
        </details>
      </div>
    </div>
  </section>
</template>
