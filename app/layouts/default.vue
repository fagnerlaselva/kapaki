<script setup lang="ts">
const config = useAppConfig()
const { whatsappUrl: footerWaUrl } = useWhatsApp('geral')

const addr = (config.address ?? { street: '', city: 'Tatui', state: 'SP', zip: '' }) as { street: string; city: string; state: string; zip: string }

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ElectronicsRepair',
      name: config.siteName as string,
      description: 'Assistencia tecnica para celulares, acessorios e aparelhos em Tatui-SP',
      url: 'https://kapaki.com.br',
      telephone: config.phone as string,
      address: {
        '@type': 'PostalAddress',
        streetAddress: addr.street,
        addressLocality: addr.city,
        addressRegion: addr.state,
        postalCode: addr.zip,
        addressCountry: 'BR',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday'],
          opens: '09:00',
          closes: '13:00',
        },
      ],
      image: 'https://kapaki.com.br/og-image.jpg',
      priceRange: '$$',
      sameAs: [
        `https://www.instagram.com/${(config.instagram as string).replace('@', '')}/`,
      ],
      // geo coordinates pending — add when client provides lat/lng
    }),
  }],
})
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
