import type { Post, Product, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'
import { ProductArchive } from '@/components/ProductArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    relationTo = 'posts',
  } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []
  let products: Product[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const collection = relationTo || 'posts'
    const fetched = await payload.find({
      collection,
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    if (collection === 'products') {
      products = fetched.docs as unknown as Product[]
    } else {
      posts = fetched.docs as unknown as Post[]
    }
  } else {
    if (selectedDocs?.length) {
      const selectedPosts = selectedDocs
        .filter((doc) => doc.relationTo === 'posts')
        .map((doc) => (typeof doc.value === 'object' ? (doc.value as Post) : undefined))
        .filter(Boolean) as Post[]

      const selectedProducts = selectedDocs
        .filter((doc) => doc.relationTo === 'products')
        .map((doc) => (typeof doc.value === 'object' ? (doc.value as Product) : undefined))
        .filter(Boolean) as Product[]

      posts = selectedPosts
      products = selectedProducts
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      {relationTo === 'products' ? (
        <ProductArchive products={products} />
      ) : (
        <CollectionArchive posts={posts} />
      )}
    </div>
  )
}
