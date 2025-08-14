import React from 'react'

import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const { categories, heroImage, title, price, meta } = product

  const formattedPrice =
    typeof price === 'number'
      ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price)
      : undefined

  return (
    <div className="container py-16">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Left Column - Product Info */}
        <div className="space-y-6">
          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="text-sm uppercase tracking-wider text-muted-foreground">
              {categories.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category
                  const titleToUse = categoryTitle || 'Untitled category'
                  const isLast = index === categories.length - 1
                  return (
                    <React.Fragment key={index}>
                      {titleToUse}
                      {!isLast && <React.Fragment>, </React.Fragment>}
                    </React.Fragment>
                  )
                }
                return null
              })}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">{title}</h1>

          {/* Price */}
          {formattedPrice && (
            <div className="text-3xl lg:text-4xl font-semibold text-primary">{formattedPrice}</div>
          )}

          {/* Description */}
          {meta?.description && (
            <div className="text-lg text-muted-foreground leading-relaxed">{meta.description}</div>
          )}
        </div>

        {/* Right Column - Product Image */}
        <div className="order-first lg:order-last">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            {heroImage && typeof heroImage !== 'string' ? (
              <Media
                resource={heroImage}
                className="w-full h-full"
                imgClassName="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No image available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
