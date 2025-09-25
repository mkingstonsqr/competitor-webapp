import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Competitor Analysis | Square Intelligence',
  description: 'Advanced competitor analysis platform for Square - Track, analyze, and outperform your competition',
  keywords: ['competitor analysis', 'square', 'marketing intelligence', 'ad tracking'],
  authors: [{ name: 'Square Intelligence Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-black text-white`}>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
          {children}
        </div>
      </body>
    </html>
  )
}
