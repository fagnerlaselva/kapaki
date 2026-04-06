<script setup lang="ts">
const config = useAppConfig()
const { whatsappUrl: footerWaUrl } = useWhatsApp('geral')
</script>

<template>
  <div class="min-h-screen bg-background text-text font-body">
    <slot />
    <AppFooter
      :site-name="(config.siteName as string)"
      :address="(config.address as { street: string; city: string; state: string; zip: string })"
      :phone="(config.phone as string)"
      :whatsapp-url="footerWaUrl"
      :instagram="(config.instagram as string)"
      :hours="{ weekday: 'Seg-Sex 9h-18h', saturday: 'Sab 9h-13h', sunday: 'Fechado' }"
    />
  </div>
</template>
