'use server'

import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { z } from 'zod'
import { connectDB } from '@/lib/db'
import { Movie } from '@/models/Movie'
import { getCurrentUser } from '@/lib/currentUser'

export async function getRecommendations(preferences: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Vous devez être connecté pour utiliser l’assistant')
  }

  if (!preferences.trim()) {
    throw new Error('Décrivez vos préférences')
  }

  await connectDB()
  const docs = await Movie.find()

  if (docs.length === 0) {
    return []
  }

  const catalogue = docs
    .map((m) => `- id: ${m._id} | ${m.title} | ${m.genre} | ${m.releaseYear} | ${m.duration} min | ${m.description}`)
    .join('\n')

  const { object } = await generateObject({
       model: google('gemini-3.8-flash'),
    maxRetries: 0,
    providerOptions: {
      google: {
        thinkingConfig: { thinkingLevel: 'low' },
      },
    },
    schema: z.object({
      recommendations: z.array(
        z.object({
          movieId: z.string(),
          title: z.string(),
          reason: z.string(),
        })
      ),
    }),
    prompt: `Tu es l'assistant de CineHub, une plateforme de films.
Voici les préférences de l'utilisateur : "${preferences}"

Voici le catalogue disponible :
${catalogue}

Choisis jusqu'à 3 films de ce catalogue qui correspondent le mieux aux préférences.
Pour chaque film, donne son id exact, son titre, et une courte justification en français.
Ne propose que des films présents dans le catalogue.`,
  })

  return object.recommendations
}