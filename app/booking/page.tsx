import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import { pages, seo } from '@/content/seed'

const pageSeo = seo.find(s => s.key === 'booking')!
const p = pages.booking

export const metadata: Metadata = {
  title: pageSeo.title,
  description: pageSeo.description,
  openGraph: { title: pageSeo.title, description: pageSeo.description, type: 'website', url: 'https://www.seravaretreats.com/booking' },
  alternates: { canonical: 'https://www.seravaretreats.com/booking' },
}

export default function BookingPage() {
  return (
    <div style={{ background: '#F8F6F1', color: '#292929' }}>
      <SiteNav active={'home'} />

      <main id="main-content">
        <section
          aria-label="Booking"
          style={{
            minHeight: 'calc(100vh - 76px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '96px 28px',
            gap: 24,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#7A6236' }}>
            Eagle Beach · Aruba
          </span>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-playfair-display), serif',
              fontWeight: 500,
              fontSize: 'clamp(40px, 5vw, 64px)',
              lineHeight: 1.08,
              color: '#263D35',
              maxWidth: 640,
            }}
          >
            {p.heading}
          </h1>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: '#55554F', maxWidth: 520 }}>{p.subheading}</p>

          <div
            style={{
              maxWidth: 600,
              padding: '32px 36px',
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1px solid rgba(38,61,53,0.1)',
              boxShadow: '0 24px 50px -36px rgba(38,61,53,0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 9999,
                background: '#E8DDCC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
              }}
            >
              <span style={{ fontSize: 24 }}>🏖️</span>
            </div>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: '#55554F' }}>{p.message}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              <Link
                href="/contact"
                style={{
                  padding: '15px 28px',
                  borderRadius: 9999,
                  background: '#263D35',
                  color: '#F8F6F1',
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'background .2s',
                }}
                className="hover:!bg-forest-dark"
              >
                {p.primaryLabel}
              </Link>
              <Link
                href="/"
                style={{
                  padding: '15px 28px',
                  borderRadius: 9999,
                  border: '1px solid rgba(38,61,53,0.25)',
                  color: '#263D35',
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'background .2s, color .2s',
                }}
                className="hover:!bg-forest hover:!text-cream hover:!border-forest"
              >
                {p.secondaryLabel}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
