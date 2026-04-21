export interface ConceptSection {
  id: string
  paragraphs: string[]
  title: string
}

export const CONCEPT_SECTIONS: readonly ConceptSection[] = [
  {
    id: 'sobre-memento-mori',
    title: 'Memento Mori',
    paragraphs: [
      'Memento mori é um lembrete filosófico de que a vida termina. A proposta não é cultivar morbidez, mas viver com mais lucidez, presença e critério diante do que realmente importa.',
      'Nesta aplicação, essa ideia ganha forma visual: o tempo deixa de ser abstração e passa a ser visto em semanas. O que já foi vivido aparece preenchido; o que permanece aberto exige responsabilidade.',
    ],
  },
  {
    id: 'sobre-sete-idades',
    title: 'As 7 idades do homem',
    paragraphs: [
      'A formulação mais conhecida das sete idades do homem aparece em Shakespeare, em As You Like It. Nela, a vida é apresentada como uma sequência de papéis: infante, estudante, amante, soldado, juiz, pantalão e segunda infância.',
      'Aqui, essa tradição funciona como um mapa simbólico, não como ciência da vida. Os marcadores a cada 7 anos transformam a grade em capítulos contemplativos, ajudando a perceber mudanças de papel, exigência, perda e maturidade ao longo do tempo.',
    ],
  },
] as const
