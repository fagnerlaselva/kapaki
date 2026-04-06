<script setup lang="ts">
import { SERVICES } from '~/constants/services'
import { TESTIMONIALS } from '~/constants/testimonials'
import { BENEFITS } from '~/constants/benefits'

// SEO meta — runs server-side only, zero client JS (per ARCHITECTURE.md Pattern 1)
useServerSeoMeta({
  title: 'Kapaki Tatui | Acessorios, Assistencia Tecnica e Celulares em Tatui-SP',
  description: 'A Kapaki e a loja de confianca em Tatui para acessorios para celular, assistencia tecnica especializada e smartphones novos e seminovos. Atendimento rapido e preco justo.',
  ogTitle: 'Kapaki Tatui | Sua loja de celulares em Tatui-SP',
  ogDescription: 'Acessorios, assistencia tecnica e celulares em Tatui. Fale agora no WhatsApp.',
  ogImage: '/og-image.jpg',
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
