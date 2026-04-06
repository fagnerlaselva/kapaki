export interface ServiceItem {
  key: 'assistencia' | 'acessorios' | 'aparelhos'
  icon: string
  title: string
  description: string
  ctaLabel: string
  badge?: string
}

export const SERVICES: ServiceItem[] = [
  {
    key: 'acessorios',
    icon: 'smartphone',
    title: 'Acessorios para Celular',
    description: 'Capinhas, peliculas, carregadores, fones e muito mais. Protecao e estilo no melhor preco de Tatui.',
    ctaLabel: 'Ver acessorios',
  },
  {
    key: 'assistencia',
    icon: 'wrench',
    title: 'Assistencia Tecnica Especializada',
    description: 'Tela quebrada, bateria viciada, celular molhado? A gente resolve rapido, com garantia e sem enrolacao.',
    ctaLabel: 'Solicitar orcamento',
    badge: 'Mais procurado',
  },
  {
    key: 'aparelhos',
    icon: 'tablet-smartphone',
    title: 'Venda de Aparelhos',
    description: 'Smartphones novos e seminovos com procedencia e garantia. Encontre o modelo ideal para o seu bolso.',
    ctaLabel: 'Ver aparelhos',
  },
]
