import type { Metadata, Viewport } from 'next'
import { Unbounded, Manrope } from 'next/font/google'
import './globals.css'
import { site } from '@/lib/site'

const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['700', '800'],
  variable: '--font-unbounded',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: [
    'фулфилмент',
    'фулфилмент для маркетплейсов',
    'фулфилмент Москва',
    'Wildberries',
    'Ozon',
    'Яндекс Маркет',
    'маркировка',
    'упаковка',
    'отгрузка на склад',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: '/og/og-image.svg',
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: ['/og/og-image.svg'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#4A1A8C',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  )
}
