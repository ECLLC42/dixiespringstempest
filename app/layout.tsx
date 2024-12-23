import './globals.css'
import { Metadata } from 'next'
import { WeatherLogo } from '@/components/WeatherLogo'

export const metadata: Metadata = {
  title: 'TempestVue',
  description: 'Real-time weather visualization dashboard for Salt Lake City',
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
    description: 'Real-time weather conditions and forecast for Salt Lake City',
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
      <body className="bg-gradient-to-br from-gray-950 to-gray-900 text-white min-h-screen antialiased">
        <header className="w-full 
          min-h-[2.8rem] md:min-h-[3.4rem] lg:min-h-[4.2rem] 
          px-2 sm:px-4 md:px-6 lg:px-8 py-2 md:py-3
          border-b-2 border-white/10 
          backdrop-blur-md fixed top-0 z-50 
          bg-gradient-to-r from-weather-blue/30 via-weather-purple/30 to-weather-blue/30">
          <div className="max-w-9xl mx-auto h-full relative">
            <div className="h-full flex items-center justify-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 
                             font-bold text-center tracking-tight">
                <span className="weather-text-gradient bg-clip-text text-transparent 
                                bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300
                                font-extrabold">
                  TempestVue
                </span>
              </h1>
            </div>
          </div>
        </header>
        
        <main className="pt-20 sm:pt-24 md:pt-28 lg:pt-32">
          {children}
        </main>
      </body>
    </html>
  )
} 