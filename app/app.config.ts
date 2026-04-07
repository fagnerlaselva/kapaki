// app.config.ts — Single source of truth for all business data
// PLACEHOLDER values marked with X — replace with real data before launch
export default defineAppConfig({
  siteName: 'Kapaki Tatui',

  // WhatsApp: digits only, country code (55) + area code (15) + 9-digit number
  whatsapp: '5515996403032',

  phone: '(15) 99640-3032',

  address: {
    street: 'Rua PLACEHOLDER, NNN',
    city: 'Tatui',
    state: 'SP',
    zip: 'XX.XXX-XXX',
    country: 'BR',
  },

  instagram: '@loja_kapaki_tatui_',

  hours: 'Seg-Sex 9h-18h, Sab 9h-13h', // PLACEHOLDER — confirm with client
})
