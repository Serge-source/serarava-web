import type { Metadata } from 'next'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import GalleryGrid from './GalleryGrid'
import { seo } from '@/content/seed'

const pageSeo = seo.find(s => s.key === 'gallery')!

export const metadata: Metadata = {
  title: pageSeo.title,
  description: pageSeo.description,
  openGraph: { title: 'Serava Retreats Gallery', description: pageSeo.description, type: 'website', url: 'https://www.seravaretreats.com/gallery' },
  alternates: { canonical: 'https://www.seravaretreats.com/gallery' },
}

export default function GalleryPage() {
  return (
    <div style={{ background: '#F8F6F1', color: '#292929' }}>
      <SiteNav active="gallery" />

      <main id="main-content">
        <section
          aria-label="Gallery header"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 28px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 18 }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#7A6236' }}>Gallery</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.08, color: '#263D35' }}>
            A look around Serava
          </h1>
          <p style={{ margin: 0, maxWidth: 560, fontSize: 15, lineHeight: 1.7, color: '#55554F' }}>
            Representative placeholder images are shown until property photography is available.
          </p>
        </section>

        <GalleryGrid />
      </main>

      <SiteFooter />
    </div>
  )
}
