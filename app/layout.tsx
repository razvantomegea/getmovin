import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import TermlyCMP from './components/TermlyCMP';
import { Toaster } from '@/components/ui/toaster';

export const viewport = {
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: {
    default: 'Movin – Your Effort Counts | Track Your Lifestyle in < 1 Minute',
    template: '%s | Movin',
  },
  description:
    'Transform every step, meal, and workout into crypto rewards—now in under 1 minute. Movin uses AI to track your meals, activities, and generate personalized meal & workout plans in less than 60 seconds. Start earning MVN tokens for your healthy habits today!',
  keywords: [
    'getmovinai',
    'movin app',
    'track lifestyle 1 minute',
    'AI meal tracker',
    'AI workout planner',
    'AI lifestyle tracking',
    'quick meal log',
    'log workout 60 seconds',
    'move to earn',
    'fitness rewards',
    'mvn tokens',
    'crypto fitness',
    'meal planner AI',
    'nutrition tracking',
    'step tracker',
    'ad-free fitness',
    'premium fitness app',
    'freemium',
    'getmovinchallenge',
  ],
  openGraph: {
    title: 'Movin – Your Effort Counts | Track Your Lifestyle in < 1 Minute',
    description:
      'AI-powered quick tracking: meals, workouts, and lifestyle in under 60 seconds—earn crypto rewards with Movin.',
    url: 'https://getmovin.ai',
    siteName: 'Movin',
    images: [
      {
        url: 'https://getmovin.ai/images/splash-dark.png',
        width: 1200,
        height: 630,
        alt: 'Movin App Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movin – Your Effort Counts | Track Your Lifestyle in < 1 Minute',
    description:
      'Log meals, workouts, and activities in under 60 seconds with AI—earn MVN crypto rewards for your healthy habits.',
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
    apple: [{ url: '/favicon/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' }],
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
  other: {
    'msapplication-TileColor': '#0095ff',
    'google-adsense-account': 'ca-pub-2046001366406434',
  },
};

const WEBSITE_UUID = '40d3e98e-5ac6-4a84-a24e-ac4cda0fa623';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="subject"
          content="Fitness, Calorie Tracking, Nutrition Tracking, Weight Loss, Rewards, Move to Earn"
        />
        <meta name="topic" content="Fitness and Rewards App" />
        <meta name="rating" content="General" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              url: 'https://getmovin.ai/',
              name: 'Movin',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://getmovin.ai/',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Movin',
              url: 'https://getmovin.ai/',
              logo: 'https://getmovin.ai/images/logo.png',
            }),
          }}
        />
        {children}
        <Toaster />
      </body>
      <Analytics />
      <TermlyCMP websiteUUID={WEBSITE_UUID} />
    </html>
  );
}
