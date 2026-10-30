'use server'

import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import { User } from '@/models/User'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate'

export async function register(formData: FormData) {
  await connectDB()

  const name = formData.get('name')?.toString()
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!name || !email || !password) {
    throw new Error('Tous les champs sont requis')
  }

  if (password.length < 6) {
    throw new Error('Le mot de passe doit contenir au moins 6 caractères')
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new Error('Cet e-mail est déjà utilisé')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await User.create({ name, email, password: hashedPassword })

  console.log('Nouvel utilisateur inscrit :', email)

  redirect('/login')
}

export async function updateProfile(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error('Vous devez être connecté')
  }

  const name = formData.get('name')?.toString()

  if (!name) {
    throw new Error('Le nom est requis')
  }

  await connectDB()
  await User.findOneAndUpdate({ email: session.user.email }, { name })

  console.log('Profil modifié :', session.user.email)

    revalidatePath('/profile')
}