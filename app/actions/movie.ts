'use server'

import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import { Movie } from '@/models/Movie'
import { getCurrentUser } from '@/lib/currentUser'

export async function createMovie(formData: FormData) {
  await connectDB()

  const title = formData.get('title')?.toString()
  const poster = `https://placehold.co/300x450?text=${encodeURIComponent(title ?? '')}`
  const description = formData.get('description')?.toString()
  const genre = formData.get('genre')?.toString()
  const releaseYear = Number(formData.get('releaseYear'))
  const director = formData.get('director')?.toString()
  const duration = Number(formData.get('duration'))

  if (!title || !poster || !description || !genre || !director || !releaseYear || !duration) {
    throw new Error('Tous les champs sont requis')
  }

    const user = await getCurrentUser()

  if (!user) {
    throw new Error('Vous devez être connecté pour ajouter un film')
  }


    await Movie.create({ title, poster, description, genre, releaseYear, director, duration, owner: user._id })

  

  console.log('Nouveau film ajouté :', title)

  redirect('/')
}

export async function updateMovie(formData: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Vous devez être connecté')
  }

  await connectDB()

  const id = formData.get('id')?.toString()
  const title = formData.get('title')?.toString()
  const description = formData.get('description')?.toString()
  const genre = formData.get('genre')?.toString()
  const releaseYear = Number(formData.get('releaseYear'))
  const director = formData.get('director')?.toString()
  const duration = Number(formData.get('duration'))

  if (!id || !title || !description || !genre || !director || !releaseYear || !duration) {
    throw new Error('Tous les champs sont requis')
  }

  const movie = await Movie.findById(id)

  if (!movie) {
    throw new Error('Film introuvable')
  }

  if (movie.owner.toString() !== user._id.toString()) {
    throw new Error('Vous ne pouvez modifier que vos propres films')
  }

  const poster = `https://placehold.co/300x450?text=${encodeURIComponent(title)}`

  await Movie.findByIdAndUpdate(id, { title, poster, description, genre, releaseYear, director, duration })

  console.log('Film modifié :', title)

  redirect(`/movies/${id}`)
}

export async function deleteMovie(id: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Vous devez être connecté')
  }

  await connectDB()

  const movie = await Movie.findById(id)

  if (!movie) {
    throw new Error('Film introuvable')
  }

  if (movie.owner.toString() !== user._id.toString()) {
    throw new Error('Vous ne pouvez supprimer que vos propres films')
  }

  await Movie.findByIdAndDelete(id)

  console.log('Film supprimé :', id)

  redirect('/')
}