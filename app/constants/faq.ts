export interface FaqItem {
  question: string
  answer: string
}

export const FAQS: Record<string, FaqItem[]> = {
  assistencia: [
    {
      question: 'Quanto tempo demora o conserto de celular na Kapaki?',
      answer: 'A maioria dos reparos e feita no mesmo dia. Troca de tela e bateria geralmente em 1 a 2 horas. Voce pode aguardar na loja ou buscar depois.',
    },
    {
      question: 'O conserto de celular em Tatui tem garantia?',
      answer: 'Sim. Todos os servicos de reparo na Kapaki possuem garantia. Se houver qualquer problema apos o conserto, voce volta e a gente resolve.',
    },
    {
      question: 'Preciso agendar para consertar meu celular?',
      answer: 'Nao e necessario agendar. Pode vir direto na loja na R. Onze de Agosto, 3045 (Coop Supermercado) ou chamar no WhatsApp antes para tirar duvidas.',
    },
    {
      question: 'Quais marcas de celular voces consertam em Tatui?',
      answer: 'Consertamos todas as marcas: Samsung, iPhone (Apple), Motorola, Xiaomi, LG, Asus e mais. Traga seu celular para avaliacao gratuita.',
    },
    {
      question: 'Quanto custa para trocar a tela do celular em Tatui?',
      answer: 'O valor varia conforme o modelo do celular. Entre em contato pelo WhatsApp para um orcamento rapido e sem compromisso.',
    },
  ],
  acessorios: [
    {
      question: 'Voces tem capinha para o meu modelo de celular?',
      answer: 'Trabalhamos com capinhas para todas as marcas e modelos mais vendidos: Samsung, iPhone, Motorola, Xiaomi e mais. Se nao tivermos em estoque, encomendamos rapidinho.',
    },
    {
      question: 'Qual a diferenca entre pelicula de vidro e pelicula comum?',
      answer: 'A pelicula de vidro temperado oferece maior protecao contra quedas e riscos, alem de ser mais resistente. A pelicula comum (gel) e mais fina e barata, mas protege menos. Recomendamos a de vidro.',
    },
    {
      question: 'Voces aplicam a pelicula na hora?',
      answer: 'Sim! Comprando a pelicula na Kapaki, a gente aplica na hora, sem bolhas e sem custo adicional.',
    },
  ],
  aparelhos: [
    {
      question: 'Os celulares seminovos da Kapaki tem garantia?',
      answer: 'Sim. Todos os celulares seminovos vendidos na Kapaki passam por revisao completa e tem garantia. Se der problema, e so voltar na loja.',
    },
    {
      question: 'Posso parcelar a compra do celular?',
      answer: 'Sim! Aceitamos parcelamento no cartao. Consulte condicoes diretamente na loja ou pelo WhatsApp.',
    },
    {
      question: 'Como saber se o celular seminovo e confiavel?',
      answer: 'Todos os aparelhos seminovos da Kapaki tem procedencia verificada e passam por uma revisao tecnica completa antes da venda: bateria, tela, botoes, alto-falante — tudo e testado.',
    },
    {
      question: 'Voces compram celulares usados?',
      answer: 'Consulte diretamente na loja ou pelo WhatsApp. Avaliamos seu aparelho e podemos fazer uma oferta.',
    },
  ],
}
