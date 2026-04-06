<script setup lang="ts">
const { whatsappUrl } = useWhatsApp('geral')
const { isVisible } = useScrollThreshold(100)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <WhatsAppFab
    v-show="isVisible"
    :whatsapp-url="whatsappUrl"
  />
</template>
