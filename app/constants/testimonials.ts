export interface Testimonial {
  name: string
  location: string
  text: string
  rating: number
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Ana Paula M.',
    location: 'Tatui-SP',
    text: 'Troquei a tela do meu iPhone aqui e ficou perfeito. Rapido, preco justo e com garantia. Recomendo demais!',
    rating: 5,
  },
  {
    name: 'Carlos H.',
    location: 'Tatui-SP',
    text: 'Comprei minha capinha e uma pelicula, me atenderam super bem. Preco bom e variedade grande. Ja virou minha loja favorita!',
    rating: 5,
  },
  {
    name: 'Fernanda L.',
    location: 'Tatui-SP',
    text: 'Levei meu celular molhado sem esperanca e eles salvaram tudo. Profissionalismo de outro nivel!',
    rating: 5,
  },
]
