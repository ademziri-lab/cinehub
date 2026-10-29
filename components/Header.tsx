'use client'

import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const linkClass = 'hover:underline'

  return (
    <header className="bg-red-600 text-white">
      <nav className="flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between">
        <button onClick={() => router.push('/')} className="text-left text-2xl font-bold">
          CineHub
        </button>

        {status === 'loading' ? (
          <p className="text-sm">Chargement...</p>
        ) : session ? (
          <ul className="flex flex-wrap items-center gap-4 text-sm">
            <li><button onClick={() => router.push('/')} className={linkClass}>Catalogue</button></li>
            <li><button onClick={() => router.push('/movies/new')} className={linkClass}>Ajouter</button></li>
            <li><button onClick={() => router.push('/favorites')} className={linkClass}>Favoris</button></li>
            <li><button onClick={() => router.push('/profile')} className={linkClass}>Profil</button></li>
            <li className="font-bold">Bonjour, {session.user?.name}</li>
            <li>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="rounded-lg bg-white px-3 py-1 text-red-600 hover:bg-gray-100"
              >
                Déconnexion
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center gap-4 text-sm">
            <li><button onClick={() => router.push('/')} className={linkClass}>Catalogue</button></li>
            <li><button onClick={() => router.push('/login')} className={linkClass}>Connexion</button></li>
            <li><button onClick={() => router.push('/register')} className={linkClass}>Inscription</button></li>
          </ul>
        )}
      </nav>
    </header>
  )
}