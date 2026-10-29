import mongoose from 'mongoose'
import { connectDB } from '@/lib/db'
import { Movie } from '@/models/Movie'
import MovieActions from '@/components/MovieActions'

export default async function MovieDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!mongoose.isValidObjectId(id)) {
    return <p>Film introuvable.</p>
  }

  await connectDB()
  const movie = await Movie.findById(id)

  if (!movie) {
    return <p>Film introuvable.</p>
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full rounded-2xl md:w-64"
      />

      <div>
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <p className="mt-1 text-gray-500">
          {movie.genre} · {movie.releaseYear} · {movie.duration} min
        </p>
        <p className="mt-1">Réalisateur : {movie.director}</p>
        <p className="mt-1">⭐ {movie.averageRating}</p>
        <MovieActions id={id} />
        <p className="mt-4">{movie.description}</p>
      </div>
    </div>
  )
}