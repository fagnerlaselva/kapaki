export interface FaqItem {
  question: string
  answer: string
}

export const FAQS: Record<string, FaqItem[]> = {
  assistencia: [
    {
      question: 'Quanto tempo demora o conserto?',
      answer: 'A maioria dos reparos e feita no mesmo dia. Tela e bateria geralmente em 1-2 horas.',
    },
    {
      question: 'Tem garantia no servico?',
      answer: 'Sim. Todos os nossos servicos possuem garantia.',
    },
    {
      question: 'Preciso agendar?',
      answer: 'Nao e necessario. Pode vir direto na loja ou chamar no WhatsApp antes.',
    },
  ],
}
