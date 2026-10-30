'use server'

import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import { Review } from '@/models/Review'
import { getCurrentUser } from '@/lib/currentUser'
import { Movie } from '@/models/Movie'

export async function addReview(formData: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Vous devez être connecté pour laisser un avis')
  }

  await connectDB()

  const movieId = formData.get('movieId')?.toString()
  const rating = Number(formData.get('rating'))
  const comment = formData.get('comment')?.toString()

  if (!movieId || !comment || rating < 1 || rating > 5) {
    throw new Error('Note (1 à 5) et commentaire requis')
  }

  const existingReview = await Review.findOne({ movie: movieId, user: user._id })

  if (existingReview) {
    throw new Error('Vous avez déjà donné votre avis sur ce film')
  }

  await Review.create({
    movie: movieId,
    user: user._id,
    userName: user.name,
    rating,
    comment,
  })
    const reviews = await Review.find({ movie: movieId })
  const total = reviews.reduce((sum, r) => sum + r.rating, 0)
  const average = Math.round((total / reviews.length) * 10) / 10

  await Movie.findByIdAndUpdate(movieId, { averageRating: average })

  console.log('Nouvel avis de', user.name)

  redirect(`/movies/${movieId}`)
}