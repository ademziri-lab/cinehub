import MovieCard from '@/components/MovieCard'
import { connectDB } from '@/lib/db'
import { Movie } from '@/models/Movie'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams

  await connectDB()

  const filter = q ? { title: { $regex: q, $options: 'i' } } : {}
  const docs = await Movie.find(filter)

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
      <h1 className="mb-4 text-2xl font-bold">Catalogue</h1>

      <form className="mb-4 flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Rechercher un film..."
          className="w-full rounded-xl border p-3"
        />
        <button className="rounded-xl bg-red-600 px-4 font-bold text-white hover:bg-red-700">
          Rechercher
        </button>
      </form>

      {movies.length === 0 ? (
        <p className="text-gray-500">Aucun film trouvé.</p>
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