export interface Benefit {
  icon: 'zap' | 'tag' | 'shield' | 'mappin'
  title: string
  text: string
}

export const BENEFITS: Benefit[] = [
  {
    icon: 'zap',
    title: 'Atendimento Rapido',
    text: 'Sem fila, sem enrolacao. Seu problema resolvido no menor tempo possivel.',
  },
  {
    icon: 'tag',
    title: 'Preco Justo',
    text: 'Sem surpresas. Orcamento transparente antes de qualquer servico.',
  },
  {
    icon: 'shield',
    title: 'Garantia em Tudo',
    text: 'Servicos e produtos com garantia real. Sua tranquilidade e nossa prioridade.',
  },
  {
    icon: 'mappin',
    title: 'No Coracao de Tatui',
    text: 'Loja fisica, facil de encontrar. Venha pessoalmente ou fale pelo WhatsApp.',
  },
]
