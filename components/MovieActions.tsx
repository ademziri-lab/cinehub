'use client'

import { useRouter } from 'next/navigation'
import { deleteMovie } from '@/app/actions/movie'

export default function MovieActions({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    const ok = window.confirm('Voulez-vous vraiment supprimer ce film ?')

    if (ok) {
      await deleteMovie(id)
    }
  }

  return (
    <div className="mt-4 flex gap-2">
      <button
        onClick={() => router.push(`/movies/${id}/edit`)}
        className="rounded-xl bg-gray-800 px-4 py-2 text-white hover:bg-gray-900"
      >
        Modifier
      </button>

      <button
        onClick={handleDelete}
        className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Supprimer
      </button>
    </div>
  )
}