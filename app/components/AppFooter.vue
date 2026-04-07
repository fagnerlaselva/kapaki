<script setup lang="ts">
import { MapPin, MessageCircle, Instagram } from 'lucide-vue-next'

const props = defineProps<{
  siteName: string
  address: { street: string; city: string; state: string; zip: string }
  phone: string
  whatsappUrl: string
  instagram: string
  hours: { weekday: string; saturday: string; sunday: string }
}>()

const { gtag } = useGtag()

function trackFooterWhatsApp() {
  gtag('event', 'whatsapp_click', { event_label: 'footer', link_url: props.whatsappUrl })
}

function trackInstagramClick() {
  gtag('event', 'instagram_click', { event_label: 'footer' })
}
</script>

<template>
  <footer class="bg-[#0A0A0A] py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <!-- Coluna 1: Sobre -->
        <div>
          <h3 class="font-heading text-lg font-bold text-text mb-4">{{ siteName }}</h3>
          <p class="text-text-muted text-sm leading-relaxed">
            Sua loja de confianca para acessorios, assistencia tecnica e celulares em Tatui e regiao.
          </p>
        </div>

        <!-- Coluna 2: Contato -->
        <div>
          <h3 class="font-heading text-lg font-bold text-text mb-4">Contato</h3>
          <ul class="space-y-3 text-sm text-text-muted">
            <li class="flex items-center gap-2">
              <MapPin class="size-4 text-primary" />
              {{ address.city }} - {{ address.state }}
            </li>
            <li class="flex items-center gap-2">
              <MessageCircle class="size-4 text-whatsapp" />
              <a
                :href="whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary transition-colors"
                @click="trackFooterWhatsApp"
              >
                WhatsApp: {{ phone }}
              </a>
            </li>
            <li class="flex items-center gap-2">
              <Instagram class="size-4 text-primary" />
              <a
                :href="'https://www.instagram.com/' + instagram.replace('@', '') + '/'"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary transition-colors"
                @click="trackInstagramClick"
              >
                {{ instagram }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Coluna 3: Horarios -->
        <div>
          <h3 class="font-heading text-lg font-bold text-text mb-4">Horarios</h3>
          <ul class="space-y-2 text-sm text-text-muted">
            <li>Segunda a Sabado: 11h as 20h</li>
            <li>Domingo: 11h as 14h</li>
          </ul>
        </div>
      </div>

      <!-- Footer bar -->
      <div class="border-t border-white/10 mt-12 pt-8 text-center text-xs text-text-muted">
        &copy; 2025 {{ siteName }}. Todos os direitos reservados.
      </div>
    </div>
  </footer>
</template>
