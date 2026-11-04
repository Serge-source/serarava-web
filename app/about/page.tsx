import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import ImageSlot from '@/components/ImageSlot'
import { pages, seo } from '@/content/seed'

const pageSeo = seo.find(s => s.key === 'about')!
const p = pages.about

export const metadata: Metadata = {
  title: pageSeo.title,
  description: pageSeo.description,
  openGraph: { title: pageSeo.title, description: pageSeo.description, type: 'website', url: 'https://www.seravaretreats.com/about' },
  alternates: { canonical: 'https://www.seravaretreats.com/about' },
}

export default function AboutPage() {
  return (
    <div style={{ background: '#F8F6F1', color: '#292929' }}>
      <SiteNav active="about" />

      <main id="main-content">
        {/* Header */}
        <section
          aria-label="About header"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 28px 72px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 18 }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#7A6236' }}>About Us</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.08, color: '#263D35' }}>
            {p.title}
          </h1>
        </section>

        {/* Story */}
        <section
          aria-label="Our story"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px 96px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 56, alignItems: 'center' }}
        >
          <div style={{ position: 'relative', height: 520, borderRadius: 24, overflow: 'hidden', background: '#E8DDCC', boxShadow: '0 30px 60px -36px rgba(38,61,53,0.45)' }}>
            <ImageSlot placeholder="Serava Retreats property (placeholder)" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#7A6236' }}>Our Story</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 'clamp(28px, 3.4vw, 40px)', lineHeight: 1.15, color: '#263D35' }}>
              {p.storyTitle}
            </h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.75, color: '#55554F' }}>{p.storyBody1}</p>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.75, color: '#55554F' }}>{p.storyBody2}</p>
          </div>
        </section>

        {/* Stats strip */}
        <section aria-label="Property stats" style={{ background: '#263D35' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, textAlign: 'center' }}>
            {[
              { n: '7', label: 'Studios', sub: 'for couples & solo travellers' },
              { n: '3', label: 'Suites', sub: 'for families up to 4' },
              { n: '1', label: 'Private Villa', sub: 'for groups up to 10' },
              { n: '11', label: 'Accommodations', sub: 'in total' },
            ].map(({ n, label, sub }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontSize: 56, fontWeight: 500, color: '#F8F6F1', lineHeight: 1 }}>{n}</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#C5A875' }}>{label}</span>
                <span style={{ fontSize: 13, color: '#D6DCD4' }}>{sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Get in touch" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 28px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 'clamp(32px, 4vw, 48px)', color: '#263D35' }}>
            Come and stay with us
          </h2>
          <p style={{ margin: 0, fontSize: 16, color: '#55554F', maxWidth: 480, lineHeight: 1.7 }}>
            We&apos;d love to have you at Serava. Get in touch about availability for your dates.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Link href="/accommodations" style={{ padding: '14px 26px', borderRadius: 9999, background: '#263D35', color: '#F8F6F1', fontSize: 15, fontWeight: 700, textDecoration: 'none', transition: 'background .2s' }} className="hover:!bg-forest-dark">
              See Accommodations
            </Link>
            <Link href="/contact" style={{ padding: '14px 26px', borderRadius: 9999, border: '1px solid #263D35', color: '#263D35', fontSize: 15, fontWeight: 700, textDecoration: 'none', transition: 'background .2s, color .2s' }} className="hover:!bg-forest hover:!text-cream">
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
