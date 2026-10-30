'use server'

import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import { User } from '@/models/User'
import { getCurrentUser } from '@/lib/currentUser'

export async function toggleFavorite(formData: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Vous devez être connecté')
  }

  const movieId = formData.get('movieId')?.toString()

  if (!movieId) {
    throw new Error('Film manquant')
  }

  await connectDB()

  const isFavorite = user.favorites.some(
    (fav: { toString: () => string }) => fav.toString() === movieId
  )

  if (isFavorite) {
    await User.findByIdAndUpdate(user._id, { $pull: { favorites: movieId } })
  } else {
    await User.findByIdAndUpdate(user._id, { $addToSet: { favorites: movieId } })
  }

  redirect(`/movies/${movieId}`)
}