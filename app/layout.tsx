import './globals.css'
import { Metadata } from 'next'
import { WeatherLogo } from '@/components/WeatherLogo'

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
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <link rel="shortcut icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.png" />
      </head>
      <body className="bg-gradient-to-br from-dark to-gray-900 text-white min-h-screen antialiased">
        <header className="w-full h-20 px-4 md:px-6 border-b border-white/10 backdrop-blur-md fixed top-0 z-50 bg-gradient-to-r from-weather-blue/20 via-weather-purple/20 to-weather-blue/20">
          <div className="max-w-7xl mx-auto h-full flex items-center gap-6">
            <WeatherLogo className="w-10 h-10" />
            <h1 className="text-2xl md:text-3xl font-semibold flex-1 text-center py-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-weather-blue via-white to-weather-purple animate-gradient bg-300% tracking-wide">
                Tempest Sugarhouse Weather Station
              </span>
            </h1>
            <div className="w-10" />
          </div>
        </header>
        
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  )
} 