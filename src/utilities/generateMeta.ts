import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { getCachedGlobal } from './getGlobals'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const siteData = await getCachedGlobal('site', 1)()
  const siteName = siteData?.title || 'Tiny Leaf Co.'
  const siteDescription = siteData?.description || 'Handcrafted, artistic, and symbolic home décor planters and accessories'
  const keywords = siteData?.meta?.keywords || 'planters, home decor, terracotta, handcrafted, artistic, symbolic'

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? `${doc.meta.title} | ${siteName}`
    : siteName

  const description = doc?.meta?.description || siteDescription

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteData?.meta?.author || siteName }],
    creator: siteName,
    publisher: siteName,
    openGraph: mergeOpenGraph({
      title,
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
              alt: title,
            },
          ]
        : undefined,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
      siteName,
    }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: siteData?.social?.twitter || '@tinyleaf',
    },
  }
}
