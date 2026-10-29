import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: 'CineHub',
  description: 'Plateforme communautaire de découverte de films',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
            <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
        <Providers>
          <Header />

          <main className="flex-1 p-4 md:p-6">{children}</main>

          <footer className="p-4 text-center text-sm text-gray-500">
            © 2026 CineHub
          </footer>
        </Providers>
      </body>
    </html>
  )
}