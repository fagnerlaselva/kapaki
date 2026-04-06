<script setup lang="ts">
interface ServiceCardData {
  key: string
  title: string
  description: string
  ctaLabel: string
  badge?: string
}

defineProps<{
  services: ServiceCardData[]
  waAssistencia: string
  waAcessorios: string
  waAparelhos: string
}>()
</script>

<template>
  <section id="servicos" class="bg-surface py-16 px-4">
    <div class="max-w-6xl mx-auto">
      <h2 class="font-heading text-3xl font-bold text-text text-center mb-4">O que voce precisa hoje?</h2>
      <p class="text-text-muted text-center mb-12">Escolha seu caminho — a Kapaki resolve.</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ServiceCard
          v-for="service in services"
          :key="service.key"
          :title="service.title"
          :description="service.description"
          :cta-label="service.ctaLabel"
          :badge="service.badge"
          :featured="service.key === 'assistencia'"
          :whatsapp-url="service.key === 'assistencia' ? waAssistencia : service.key === 'acessorios' ? waAcessorios : waAparelhos"
        />
      </div>
    </div>
  </section>
</template>
