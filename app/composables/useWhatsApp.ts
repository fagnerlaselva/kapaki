// composables/useWhatsApp.ts — Builds wa.me URLs with encoded pre-filled messages
// Called in pages, NEVER inside section components (they receive whatsappUrl as prop)

type ServiceKey = 'assistencia' | 'acessorios' | 'aparelhos' | 'geral'

const MESSAGES: Record<ServiceKey, string> = {
  assistencia: 'Ola! Preciso de assistencia tecnica para meu celular.',
  acessorios: 'Ola! Tenho interesse em acessorios para celular.',
  aparelhos: 'Ola! Quero saber sobre aparelhos disponiveis.',
  geral: 'Ola! Gostaria de mais informacoes sobre a Kapaki Tatui.',
}

export function useWhatsApp(service: ServiceKey = 'geral') {
  const config = useAppConfig()
  const phone = config.whatsapp as string
  const message = MESSAGES[service]
  const encoded = encodeURIComponent(message)

  return {
    whatsappUrl: `https://wa.me/${phone}?text=${encoded}`,
  }
}
