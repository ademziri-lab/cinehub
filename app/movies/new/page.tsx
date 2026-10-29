import { createMovie } from '@/app/actions/movie'
import SubmitButton from '@/components/SubmitButton'

export default function NewMoviePage() {
  const inputClass = 'w-full rounded-xl border p-3'

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-bold">Ajouter un film</h1>

      <form action={createMovie} className="flex flex-col gap-3">
        <input name="title" placeholder="Titre" required className={inputClass} />
        
        <textarea name="description" placeholder="Description" required className={inputClass} />
        <input name="genre" placeholder="Genre" required className={inputClass} />
        <input name="releaseYear" type="number" placeholder="Année de sortie" required className={inputClass} />
        <input name="director" placeholder="Réalisateur" required className={inputClass} />
        <input name="duration" type="number" placeholder="Durée (minutes)" required className={inputClass} />

        <SubmitButton label="Ajouter" />
      </form>
    </div>
  )
}