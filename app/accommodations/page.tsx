'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Users } from 'lucide-react'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import ImageSlot from '@/components/ImageSlot'
import { categories } from '@/content/seed'

type Filter = 'all' | 'studios' | 'suites' | 'villa'

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All Accommodations' },
  { key: 'studios', label: 'Studios' },
  { key: 'suites', label: 'Suites' },
  { key: 'villa', label: 'Private Villa' },
]

export default function AccommodationsPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const shown = categories.filter(c => filter === 'all' || c.slug === filter)

  return (
    <div style={{ background: '#F8F6F1', color: '#292929' }}>
      <SiteNav active="accommodations" />

      <main id="main-content">
        <section
          aria-label="Accommodations header"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 28px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 18 }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#7A6236' }}>
            Stay With Us
          </span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.08, color: '#263D35' }}>
            Accommodations
          </h1>
          <p style={{ margin: 0, maxWidth: 580, fontSize: 17, lineHeight: 1.7, color: '#55554F' }}>
            Eleven air-conditioned accommodations near Eagle Beach, each with access to the shared pool, fitness area and tropical outdoor spaces.
          </p>
        </section>

        <section aria-label="Accommodation listing" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px 112px' }}>
          <div
            role="tablist"
            aria-label="Filter accommodations"
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 48 }}
          >
            {filters.map(f => (
              <button
                key={f.key}
                role="tab"
                aria-selected={f.key === filter}
                onClick={() => setFilter(f.key)}
                style={{
                  padding: '12px 22px',
                  borderRadius: 9999,
                  border: `1px solid ${f.key === filter ? '#263D35' : 'rgba(38,61,53,0.25)'}`,
                  background: f.key === filter ? '#263D35' : 'transparent',
                  color: f.key === filter ? '#F8F6F1' : '#263D35',
                  fontFamily: 'inherit',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all .2s',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {shown.map(c => (
              <article
                key={c.slug}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 24,
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
                  boxShadow: '0 24px 50px -36px rgba(38,61,53,0.45)',
                }}
              >
                <div style={{ position: 'relative', minHeight: 360, background: '#E8DDCC' }}>
                  <ImageSlot placeholder={`${c.photo} (placeholder)`} />
                </div>
                <div style={{ padding: '44px 40px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A6236' }}>
                    {c.units} {c.units > 1 ? 'units' : 'unit'}
                  </span>
                  <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 34, color: '#263D35' }}>
                    {c.name}
                  </h2>
                  <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: '#55554F' }}>{c.short}</p>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700, color: '#263D35' }}>
                    <Users size={18} style={{ color: '#82947C' }} />
                    Maximum {c.maxGuests} guests {c.units > 1 ? 'per unit' : ''}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {c.amenities.map(([, name]) => (
                      <span
                        key={name}
                        style={{ padding: '7px 14px', borderRadius: 9999, background: '#F8F6F1', border: '1px solid rgba(38,61,53,0.12)', fontSize: 13, color: '#4A4A44' }}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 'auto', paddingTop: 10 }}>
                    <Link
                      href={`/accommodations/${c.slug}`}
                      style={{ padding: '14px 26px', borderRadius: 9999, background: '#263D35', color: '#F8F6F1', fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'background .2s' }}
                      className="hover:!bg-forest-dark"
                    >
                      View Details
                    </Link>
                    <Link
                      href="/booking"
                      style={{ padding: '14px 26px', borderRadius: 9999, border: '1px solid #263D35', color: '#263D35', fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'background .2s, color .2s' }}
                      className="hover:!bg-forest hover:!text-cream"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
