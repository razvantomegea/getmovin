import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"
import TermlyCMP from './components/TermlyCMP'

export const metadata: Metadata = {
  metadataBase: new URL('https://getmovin.ai'),
  title: {
    default: 'Movin - Your effort counts',
    template: `%s | Movin`,
  },
  description: 'Transform your daily movement into rewards. Our move-to-earn app built on Base rewards you with crypto tokens for every step you take. Track your fitness, calories, and weight loss progress while earning rewards for staying active.',
  keywords: [
    'fitness',
    'calorie tracking',
    'weight loss',
    'move to earn',
    'rewards',
    'crypto rewards',
    'step counter',
    'activity tracker',
    'health',
    'wellness',
    'exercise',
    'Base blockchain',
    'getmovin',
    'Movin app'
  ],
  openGraph: {
    title: 'Movin - Your effort counts',
    description: 'Transform your daily movement into rewards. Our move-to-earn app built on Base rewards you with crypto tokens for every step you take. Track your fitness, calories, and weight loss progress while earning rewards for staying active.',
    url: 'https://getmovin.ai',
    siteName: 'Movin',
    images: [
      {
        url: 'https://getmovin.ai/images/splash-dark.png',
        width: 1200,
        height: 630,
        alt: 'Movin App on a phone',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movin - Your effort counts',
    description: 'Transform your daily movement into rewards. Our move-to-earn app built on Base rewards you with crypto tokens for every step you take. Track your fitness, calories, and weight loss progress while earning rewards for staying active.',
    images: ['https://getmovin.ai/images/splash-dark.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/favicon/site.webmanifest',
      },
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#0095ff',
      },
    ],
  },
  themeColor: '#ffffff',
  other: {
    'msapplication-TileColor': '#0095ff',
    'google-adsense-account': 'ca-pub-2046001366406434',
  }
}

const WEBSITE_UUID = '40d3e98e-5ac6-4a84-a24e-ac4cda0fa623'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://getmovin.ai/",
            "name": "Movin",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://getmovin.ai/",
              "query-input": "required name=search_term_string"
            }
          })}}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Movin",
            "url": "https://getmovin.ai/",
            "logo": "https://getmovin.ai/images/logo.png"
          })}}
        />
        {children}
      </body>
      <Analytics />
      <TermlyCMP websiteUUID={WEBSITE_UUID} />
    </html>
  )
}
