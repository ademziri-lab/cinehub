'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  async function handleSubmit(formData: FormData) {
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })

    if (result?.error) {
      setError('E-mail ou mot de passe incorrect')
    } else {
      router.push('/')
    }
  }

  const inputClass = 'w-full rounded-xl border p-3'

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-bold">Connexion</h1>

      <form action={handleSubmit} className="flex flex-col gap-3">
        <input name="email" type="email" placeholder="E-mail" required className={inputClass} />
        <input name="password" type="password" placeholder="Mot de passe" required className={inputClass} />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button className="rounded-xl bg-red-600 p-3 font-bold text-white hover:bg-red-700">
          Se connecter
        </button>
      </form>

      <p className="mt-4 text-sm">
        Pas encore de compte ?{' '}
        <button onClick={() => router.push('/register')} className="text-red-600 hover:underline">
          S'inscrire
        </button>
      </p>
    </div>
  )
}