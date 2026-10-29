import mongoose from 'mongoose'
import { connectDB } from '@/lib/db'
import { Movie } from '@/models/Movie'
import { updateMovie } from '@/app/actions/movie'
import SubmitButton from '@/components/SubmitButton'

export default async function EditMoviePage({
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

  const inputClass = 'w-full rounded-xl border p-3'

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-bold">Modifier le film</h1>

      <form action={updateMovie} className="flex flex-col gap-3">
        <input type="hidden" name="id" value={id} />

        <input name="title" defaultValue={movie.title} required className={inputClass} />
        <textarea name="description" defaultValue={movie.description} required className={inputClass} />
        <input name="genre" defaultValue={movie.genre} required className={inputClass} />
        <input name="releaseYear" type="number" defaultValue={movie.releaseYear} required className={inputClass} />
        <input name="director" defaultValue={movie.director} required className={inputClass} />
        <input name="duration" type="number" defaultValue={movie.duration} required className={inputClass} />

        <SubmitButton label="Modifier" />
      </form>
    </div>
  )
}