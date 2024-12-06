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
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='8' fill='%23FDB813'/><path d='M16 6V2M16 30V26M6 16H2M30 16H26M8.9 8.9L6 6M26 26L23.1 23.1M8.9 23.1L6 26M26 6L23.1 8.9' stroke='%23FDB813' stroke-width='2.5' stroke-linecap='round'/></svg>" />
      </head>
      <body className="bg-gradient-to-br from-dark to-gray-900 text-white min-h-screen antialiased">
        <header className="w-full py-6 px-4 md:px-8">
          <h1 className="text-2xl md:text-3xl font-light text-center bg-clip-text text-transparent bg-gradient-to-r from-weather-blue to-weather-purple">
            Tempest Sugarhouse Weather Station
          </h1>
        </header>
        {children}
      </body>
    </html>
  )
} 