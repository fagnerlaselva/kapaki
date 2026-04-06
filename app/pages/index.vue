<!-- pages/index.vue — Phase 1 placeholder. Replaced with real homepage in Phase 2. -->
<script setup lang="ts">
import { Phone } from 'lucide-vue-next'

// Verify useWhatsApp composable works (auto-imported by Nuxt)
const { whatsappUrl } = useWhatsApp('assistencia')

// Verify useAppConfig works
const config = useAppConfig()
</script>

<template>
  <div class="p-8">
    <h1 class="font-heading text-4xl font-bold text-primary mb-4">
      Kapaki Tatui
    </h1>
    <p class="font-body text-lg text-text-muted mb-6">
      Fundacao configurada com sucesso.
    </p>

    <!-- Verify Lucide icons render (SETUP-05) -->
    <div class="flex items-center gap-2 text-primary mb-4">
      <Phone class="size-5" />
      <span class="text-text">{{ config.phone }}</span>
    </div>

    <!-- Verify WhatsApp composable (WA-01) -->
    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-block bg-primary text-background font-heading font-semibold px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors"
    >
      Falar no WhatsApp
    </a>

    <!-- Debug info (remove in Phase 2) -->
    <pre class="mt-8 text-xs text-text-muted bg-surface p-4 rounded">
WhatsApp URL: {{ whatsappUrl }}
Site: {{ config.siteName }}
Phone: {{ config.phone }}
Hours: {{ config.hours }}
    </pre>
  </div>
</template>
