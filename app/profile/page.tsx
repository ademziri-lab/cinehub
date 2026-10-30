import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { User } from '@/models/User'
import { updateProfile } from '@/app/actions/auth'
import SubmitButton from '@/components/SubmitButton'
import ProfileForm from '@/components/ProfileForm'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return <p>Vous devez être connecté pour voir votre profil.</p>
  }

  await connectDB()
  const user = await User.findOne({ email: session.user.email })

  if (!user) {
    return <p>Utilisateur introuvable.</p>
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-bold">Mon profil</h1>

      <div className="mb-6 rounded-2xl bg-white p-4 shadow dark:bg-gray-800">
        <p><span className="font-bold">Nom :</span> {user.name}</p>
        <p><span className="font-bold">E-mail :</span> {user.email}</p>
        <p>
          <span className="font-bold">Membre depuis :</span>{' '}
          {user.createdAt.toLocaleDateString('fr-FR')}
        </p>
      </div>

      <h2 className="mb-2 text-lg font-bold">Modifier mon nom</h2>
      <ProfileForm name={user.name} />
    </div>
  )
}