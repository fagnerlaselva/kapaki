<script setup lang="ts">
import { SERVICES } from '~/constants/services'
import { TESTIMONIALS } from '~/constants/testimonials'
import { BENEFITS } from '~/constants/benefits'

// SEO meta — runs server-side only, zero client JS (per ARCHITECTURE.md Pattern 1)
useServerSeoMeta({
  title: 'Kapaki Tatui | Loja de Celulares, Acessorios e Consertos em Tatui-SP',
  description: 'Loja de celulares em Tatui-SP: conserto de celular com garantia, capinhas, peliculas, carregadores e smartphones novos e seminovos. Atendimento rapido na R. Onze de Agosto, 3045. Fale no WhatsApp!',
  ogTitle: 'Kapaki Tatui | Loja de Celulares e Consertos em Tatui-SP',
  ogDescription: 'Conserto de celular, acessorios e smartphones em Tatui e regiao. Atendimento rapido com garantia. Fale no WhatsApp!',
  ogImage: 'https://kapaki.com.br/og-image.jpg',
  twitterCard: 'summary_large_image',
})

// WhatsApp URLs — one per service + one for hero/CTA (geral)
const { whatsappUrl: waHero } = useWhatsApp('geral')
const { whatsappUrl: waAssistencia } = useWhatsApp('assistencia')
const { whatsappUrl: waAcessorios } = useWhatsApp('acessorios')
const { whatsappUrl: waAparelhos } = useWhatsApp('aparelhos')
const { whatsappUrl: waCta } = useWhatsApp('geral')
</script>

<template>
  <div>
    <HeroSection :whatsapp-url="waHero" />
    <ServicosSection
      :services="SERVICES"
      :wa-assistencia="waAssistencia"
      :wa-acessorios="waAcessorios"
      :wa-aparelhos="waAparelhos"
    />
    <ProvasSociaisSection :testimonials="TESTIMONIALS" />
    <BeneficiosSection :benefits="BENEFITS" />
    <CtaFinalSection :whatsapp-url="waCta" />
  </div>
</template>
