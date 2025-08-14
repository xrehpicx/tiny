import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer, Site } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const siteData: Site = await getCachedGlobal('site', 1)()

  const navItems = footerData?.navItems || []
  const showContactInfo = footerData?.showContactInfo ?? true
  const copyright = footerData?.copyright || '© 2025 TinyLeaf Co. All rights reserved.'

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Company Info */}
          <div className="space-y-4">
            <Link className="flex items-center" href="/">
              <Logo variant="dark" />
            </Link>
            {siteData?.description && (
              <p className="text-sm text-gray-300 max-w-md leading-relaxed">
                {siteData.description}
              </p>
            )}
            {siteData?.tagline && (
              <p className="text-xs text-gray-400 italic">{siteData.tagline}</p>
            )}
          </div>

          {/* Contact Info */}
          {showContactInfo && siteData?.contact && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white">Contact Us</h3>
              <div className="space-y-2 text-sm text-gray-300">
                {siteData.contact.person && (
                  <p>
                    <span className="text-gray-400">Contact Person:</span> {siteData.contact.person}
                  </p>
                )}
                {siteData.contact.phone && (
                  <p>
                    <span className="text-gray-400">Phone:</span>{' '}
                    <a
                      href={`tel:${siteData.contact.phone}`}
                      className="hover:text-white transition-colors"
                    >
                      {siteData.contact.phone}
                    </a>
                  </p>
                )}
                {siteData.contact.email && (
                  <p>
                    <span className="text-gray-400">Email:</span>{' '}
                    <a
                      href={`mailto:${siteData.contact.email}`}
                      className="hover:text-white transition-colors"
                    >
                      {siteData.contact.email}
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-400">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
