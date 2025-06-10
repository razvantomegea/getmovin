import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"
import TermlyCMP from './components/TermlyCMP'

export const metadata: Metadata = {
  title: 'Movin',
  description: 'Your effort counts',
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
}

const WEBSITE_UUID = '40d3e98e-5ac6-4a84-a24e-ac4cda0fa623'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="msapplication-TileColor" content="#0095ff" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="google-adsense-account" content="ca-pub-2046001366406434" />
      </head>
      <body>{children}</body>
      <Analytics />
      <TermlyCMP websiteUUID={WEBSITE_UUID} />
    </html>
  )
}
