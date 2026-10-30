import MovieCard from '@/components/MovieCard'
import { connectDB } from '@/lib/db'
import { Movie } from '@/models/Movie'
import { getCurrentUser } from '@/lib/currentUser'

export default async function FavoritesPage() {
  const user = await getCurrentUser()

  if (!user) {
    return <p>Vous devez être connecté pour voir vos favoris.</p>
  }

  await connectDB()
  const docs = await Movie.find({ _id: { $in: user.favorites ?? [] } })

  const movies = docs.map((doc) => ({
    id: doc._id.toString(),
    title: doc.title,
    poster: doc.poster,
    description: doc.description,
    genre: doc.genre,
    releaseYear: doc.releaseYear,
    director: doc.director,
    duration: doc.duration,
    averageRating: doc.averageRating,
  }))

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Mes favoris</h1>

      {movies.length === 0 ? (
        <p className="text-gray-500">Vous n'avez pas encore de films favoris.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}