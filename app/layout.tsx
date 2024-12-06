import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gradient-to-br from-dark to-gray-900 text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
} 