import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tempest Weather | Sugarhouse Park',
  description: 'Real-time weather conditions and forecast for Sugarhouse Park, Salt Lake City. Powered by Tempest Weather System.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
        <link rel="shortcut icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.png" />
      </head>
      <body className="bg-gradient-to-br from-dark to-gray-900 text-white min-h-screen antialiased">
        <header className="w-full py-3 px-3 md:px-4">
          <h1 className="text-lg md:text-xl font-light text-center bg-clip-text text-transparent bg-gradient-to-r from-weather-blue to-weather-purple">
            Tempest Sugarhouse Weather Station
          </h1>
        </header>
        {children}
      </body>
    </html>
  )
} 