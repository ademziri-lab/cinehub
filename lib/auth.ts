import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import { User } from '@/models/User'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Identifiants',
      credentials: {
        email: { label: 'E-mail', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        await connectDB()
        const user = await User.findOne({ email: credentials.email })

        if (!user) {
          return null
        }

        const passwordOk = await bcrypt.compare(credentials.password, user.password)

        if (!passwordOk) {
          return null
        }

        return { id: user._id.toString(), name: user.name, email: user.email }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
}