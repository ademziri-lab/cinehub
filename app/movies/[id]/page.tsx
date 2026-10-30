import mongoose from 'mongoose'
import { connectDB } from '@/lib/db'
import { Movie } from '@/models/Movie'
import MovieActions from '@/components/MovieActions'
import { getCurrentUser } from '@/lib/currentUser'
import { Review } from '@/models/Review'
import ReviewForm from '@/components/ReviewForm'
import { toggleFavorite } from '@/app/actions/favorite'
import SubmitButton from '@/components/SubmitButton'

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
      const user = await getCurrentUser()
  const isOwner = user && movie.owner?.toString() === user._id.toString()

  const alreadyReviewed = user
    ? await Review.findOne({ movie: id, user: user._id })
    : null

      const isFavorite = user?.favorites.some(
    (fav: { toString: () => string }) => fav.toString() === id
  )
  const reviews = await Review.find({ movie: id }).sort({ createdAt: -1 })

  return (
    <div>
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
        {isOwner && <MovieActions id={id} />}
                {user && (
          <form action={toggleFavorite} className="mt-4">
            <input type="hidden" name="movieId" value={id} />
            <SubmitButton
              label={isFavorite ? '💔 Retirer des favoris' : '❤️ Ajouter aux favoris'}
            />
          </form>
        )}
        <p className="mt-4">{movie.description}</p>
      </div>
    </div>
     <section className="mt-8 max-w-xl">
        <h2 className="mb-3 text-xl font-bold">Avis</h2>

        {!user ? (
          <p className="text-gray-500">Connectez-vous pour laisser un avis.</p>
        ) : alreadyReviewed ? (
          <p className="text-gray-500">Vous avez déjà donné votre avis sur ce film.</p>
        ) : (
          <ReviewForm movieId={id} />
        )}

        <div className="mt-6 flex flex-col gap-3">
          {reviews.length === 0 ? (
            <p className="text-gray-500">Aucun avis pour le moment.</p>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id.toString()}
                className="rounded-2xl bg-white p-4 shadow dark:bg-gray-800"
              >
                <p className="font-bold">
                  {review.userName} · {'⭐'.repeat(review.rating)}
                </p>
                <p className="mt-1">{review.comment}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {review.createdAt.toLocaleDateString('fr-FR')}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
      </div>
  )
}