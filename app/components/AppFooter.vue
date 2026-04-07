<script setup lang="ts">
import { MapPin, MessageCircle, Instagram, Facebook, Clock, ExternalLink } from 'lucide-vue-next'

const props = defineProps<{
  siteName: string
  address: { street: string; city: string; state: string; zip: string; reference?: string }
  phone: string
  whatsappUrl: string
  instagram: string
  facebook: string
  googleMapsUrl: string
  hours: { weekday: string; sunday: string }
}>()

const { gtag } = useGtag()

function trackFooterWhatsApp() {
  gtag('event', 'whatsapp_click', { event_label: 'footer', link_url: props.whatsappUrl })
}

function trackInstagramClick() {
  gtag('event', 'instagram_click', { event_label: 'footer' })
}

function trackFacebookClick() {
  gtag('event', 'facebook_click', { event_label: 'footer' })
}

function trackMapsClick() {
  gtag('event', 'maps_click', { event_label: 'footer' })
}
</script>

<template>
  <footer class="bg-[#0A0A0A] py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <!-- Coluna 1: Sobre + Logo -->
        <div>
          <img
            src="/logo.png"
            alt="Kapaki Tatui"
            width="160"
            height="80"
            class="mb-4 h-16 w-auto"
            loading="lazy"
          />
          <p class="text-text-muted text-sm leading-relaxed">
            Sua loja de confianca para acessorios, assistencia tecnica e celulares em Tatui e regiao.
          </p>
        </div>

        <!-- Coluna 2: Servicos -->
        <div>
          <h3 class="font-heading text-lg font-bold text-text mb-4">Servicos</h3>
          <ul class="space-y-3 text-sm">
            <li>
              <NuxtLink to="/assistencia-tecnica" class="text-text-muted hover:text-primary transition-colors">
                Assistencia Tecnica
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/acessorios" class="text-text-muted hover:text-primary transition-colors">
                Acessorios
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/aparelhos" class="text-text-muted hover:text-primary transition-colors">
                Aparelhos
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Coluna 3: Contato -->
        <div>
          <h3 class="font-heading text-lg font-bold text-text mb-4">Contato</h3>
          <ul class="space-y-3 text-sm text-text-muted">
            <li class="flex items-start gap-2">
              <MapPin class="size-4 text-primary mt-0.5 shrink-0" />
              <a
                :href="googleMapsUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary transition-colors"
                @click="trackMapsClick"
              >
                {{ address.street }}, {{ address.city }} - {{ address.state }}
                <span v-if="address.reference" class="block text-xs text-text-muted/70 mt-1">
                  {{ address.reference }}
                </span>
              </a>
            </li>
            <li class="flex items-center gap-2">
              <MessageCircle class="size-4 text-whatsapp shrink-0" />
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
              <Instagram class="size-4 text-primary shrink-0" />
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
            <li class="flex items-center gap-2">
              <Facebook class="size-4 text-primary shrink-0" />
              <a
                :href="facebook"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary transition-colors"
                @click="trackFacebookClick"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>

        <!-- Coluna 4: Horarios -->
        <div>
          <h3 class="font-heading text-lg font-bold text-text mb-4">Horarios</h3>
          <ul class="space-y-2 text-sm text-text-muted">
            <li class="flex items-center gap-2">
              <Clock class="size-4 text-primary shrink-0" />
              Segunda a Sabado: 11h as 20h
            </li>
            <li class="flex items-center gap-2">
              <Clock class="size-4 text-primary shrink-0" />
              Domingo: 11h as 14h
            </li>
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
