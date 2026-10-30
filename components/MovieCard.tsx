'use client'

import { useRouter } from 'next/navigation'
import type { Movie } from '@/lib/movies'

export default function MovieCard({ movie }: { movie: Movie }) {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/movies/${movie.id}`)}
      className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg dark:bg-gray-800"
    >
      <img src={movie.poster} alt={movie.title} className="w-full" />

      <div className="p-3">
        <h2 className="font-bold">{movie.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {movie.genre} · {movie.releaseYear}
        </p>
        <p className="mt-1 text-sm">⭐ {movie.averageRating}</p>
      </div>
    </div>
  )
}