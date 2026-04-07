// app.config.ts — Single source of truth for all business data
export default defineAppConfig({
  siteName: 'Kapaki Tatui',

  // WhatsApp: digits only, country code (55) + area code (15) + 9-digit number
  whatsapp: '5515996403032',

  phone: '(15) 99640-3032',

  address: {
    street: 'R. Onze de Agosto, 3045 - Jardim Lucila',
    city: 'Tatui',
    state: 'SP',
    zip: '18277-000',
    country: 'BR',
    reference: 'Localizado em: Coop Supermercado - XI de Agosto',
  },

  instagram: '@loja_kapaki_tatui_',

  hours: 'Seg-Sab 11h-20h, Dom 11h-14h',
})
