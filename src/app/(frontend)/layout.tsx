import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body data-theme="light">
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: {
    default: 'Tiny Leaf Co. - Handcrafted Home Décor Planters & Accessories',
    template: '%s | Tiny Leaf Co.',
  },
  description: 'Discover artistic terracotta and waterproof planters by Tiny Leaf Co. Handcrafted decorative planters with animal, spiritual, and cartoon themes. Perfect for enhancing your home with meaningful and beautiful plant accessories.',
  keywords: 'planters, home decor, terracotta, handcrafted, artistic, symbolic, Buddha pot, elephant planter, spiritual decor, waterproof planters, handmade, creative design, home accessories',
  authors: [{ name: 'Tiny Leaf Co.' }],
  creator: 'Tiny Leaf Co.',
  publisher: 'Tiny Leaf Co.',
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph({
    title: 'Tiny Leaf Co. - Handcrafted Home Décor Planters & Accessories',
    description: 'Discover artistic terracotta and waterproof planters. Handcrafted decorative planters with animal, spiritual, and cartoon themes.',
    siteName: 'Tiny Leaf Co.',
    images: [
      {
        url: '/tiny-wordmark.png',
        alt: 'Tiny Leaf Co. - Handcrafted Planters',
      },
    ],
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'Tiny Leaf Co. - Handcrafted Home Décor Planters',
    description: 'Discover artistic terracotta and waterproof planters. Handcrafted decorative planters with unique themes.',
    creator: '@tinyleaf',
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
}
