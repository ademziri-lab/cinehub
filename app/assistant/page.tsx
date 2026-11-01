'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getRecommendations } from '@/app/actions/ai'
import SubmitButton from '@/components/SubmitButton'

type Recommendation = {
  movieId: string
  title: string
  reason: string
}

export default function AssistantPage() {
  const router = useRouter()
  const [results, setResults] = useState<Recommendation[] | null>(null)
  const [error, setError] = useState('')

  async function handleSubmit(formData: FormData) {
    setError('')
    setResults(null)

    try {
      const preferences = formData.get('preferences')?.toString() ?? ''
      const recommendations = await getRecommendations(preferences)
      setResults(recommendations)
    } catch {
      setError('Impossible d’obtenir des recommandations. Vérifiez que vous êtes connecté et réessayez.')
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-2 text-2xl font-bold">Assistant IA 🤖</h1>
      <p className="mb-4 text-gray-500 dark:text-gray-400">
        Décrivez ce que vous avez envie de regarder, et l'assistant vous propose des films du catalogue.
      </p>

      <form action={handleSubmit} className="flex flex-col gap-3">
        <textarea
          name="preferences"
          required
          placeholder="Ex : un film de science-fiction qui fait réfléchir, pas trop long..."
          className="rounded-xl border p-3"
        />
        <SubmitButton label="Obtenir des recommandations" />
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {results && (
        <div className="mt-6 flex flex-col gap-3">
          {results.length === 0 ? (
            <p className="text-gray-500">Aucun film ne correspond pour le moment.</p>
          ) : (
            results.map((rec) => (
              <div
                key={rec.movieId}
                onClick={() => router.push(`/movies/${rec.movieId}`)}
                className="cursor-pointer rounded-2xl bg-white p-4 shadow hover:shadow-lg dark:bg-gray-800"
              >
                <p className="font-bold">🎬 {rec.title}</p>
                <p className="mt-1 text-sm">{rec.reason}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}