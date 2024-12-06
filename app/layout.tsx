import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tempest Weather | Sugarhouse Park',
  description: 'Real-time weather conditions and forecast for Sugarhouse Park, Salt Lake City. Powered by Tempest Weather System.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Tempest Weather | Sugarhouse Park',
    description: 'Real-time weather conditions and forecast for Sugarhouse Park, Salt Lake City',
    url: 'https://sugarhouse-tempest.vercel.app',
    siteName: 'Tempest Weather',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.svg" />
        <link rel="mask-icon" href="/favicon.svg" color="#FDB813" />
      </head>
      <body className="bg-gradient-to-br from-dark to-gray-900 text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
} 