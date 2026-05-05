import type { Metadata } from 'next'
import { Geist, Geist_Mono, Source_Serif_4 } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import AccessDeniedBanner from '@/components/campusx/access-denied-banner'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans', weight: ['100','200','300','400','500','600','700','800','900'] })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['100','200','300','400','500','600','700','800','900'] })
const sourceSerif4 = Source_Serif_4({ subsets: ['latin'], variable: '--font-serif', weight: ['200','300','400','500','600','700','800','900'] })

export const metadata: Metadata = {
  title: 'CampusX - IITP Student Marketplace',
  description: 'The trusted marketplace for IITP students. Buy, Rent, or Sell with fellow students.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${sourceSerif4.variable} bg-gray-950`}>
      <body className="font-sans antialiased bg-gray-950">
        <Suspense>
          <AccessDeniedBanner />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
