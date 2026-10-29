export type Movie = {
  id: string
  title: string
  poster: string
  description: string
  genre: string
  releaseYear: number
  director: string
  duration: number // en minutes
  averageRating: number
}

export const movies: Movie[] = [
  {
    id: '1',
    title: 'Inception',
    poster: 'https://placehold.co/300x450?text=Inception',
    description: 'Un voleur infiltre les rêves pour voler des secrets.',
    genre: 'Science-fiction',
    releaseYear: 2010,
    director: 'Christopher Nolan',
    duration: 148,
    averageRating: 4.7,
  },
  {
    id: '2',
    title: 'Le Roi Lion',
    poster: 'https://placehold.co/300x450?text=Le+Roi+Lion',
    description: 'Un jeune lion doit reprendre sa place de roi.',
    genre: 'Animation',
    releaseYear: 1994,
    director: 'Roger Allers',
    duration: 88,
    averageRating: 4.5,
  },
  {
    id: '3',
    title: 'Parasite',
    poster: 'https://placehold.co/300x450?text=Parasite',
    description: 'Une famille pauvre s’infiltre chez une famille riche.',
    genre: 'Thriller',
    releaseYear: 2019,
    director: 'Bong Joon-ho',
    duration: 132,
    averageRating: 4.6,
  },
]