import type { Metadata } from 'next'
import Link from 'next/link'
import { Users, Waves, Dumbbell, Wifi, Car, Wind, Trees, Umbrella } from 'lucide-react'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import ImageSlot from '@/components/ImageSlot'
import { pages, categories, amenities, explore, seo } from '@/content/seed'

const pageSeo = seo.find(s => s.key === 'home')!

export const metadata: Metadata = {
  title: pageSeo.title,
  description: pageSeo.description,
  openGraph: {
    title: 'Serava Retreats | Your Private Island Escape in Aruba',
    description: 'Boutique vacation rentals near Eagle Beach: 7 studios, 3 suites and 1 private villa.',
    type: 'website',
    url: 'https://www.seravaretreats.com/',
  },
  alternates: { canonical: 'https://www.seravaretreats.com/' },
}

const iconMap: Record<string, React.ElementType> = {
  waves: Waves, dumbbell: Dumbbell, wifi: Wifi, car: Car, wind: Wind, trees: Trees, umbrella: Umbrella,
}

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Serava Retreats',
  description: 'Boutique vacation rentals near Eagle Beach, Aruba',
  url: 'https://www.seravaretreats.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Eagle Beach', addressCountry: 'AW' },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Swimming pool', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Fitness area', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Parking', value: true },
  ],
}

const p = pages.home
const homeExplore = explore.filter(e => ['eagle', 'palm', 'arashi', 'dining'].includes(e.key))

export default function HomePage() {
  return (
    <div style={{ background: '#F8F6F1', color: '#292929' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <SiteNav active="home" />

      <main id="main-content">
        {/* Hero */}
        <section
          aria-label="Hero"
          style={{
            position: 'relative',
            minHeight: 'clamp(560px, 88vh, 860px)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: '#E8DDCC' }}>
            <ImageSlot placeholder="Full-width tropical resort photo (placeholder)" />
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'linear-gradient(90deg, rgba(38,61,53,0.82) 0%, rgba(38,61,53,0.45) 55%, rgba(38,61,53,0.08) 100%)',
            }}
          />
          <div style={{ position: 'relative', maxWidth: 1280, width: '100%', margin: '0 auto', padding: '96px 28px' }}>
            <div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#E8DDCC' }}>
                {p.heroEyebrow}
              </span>
              <h1
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-playfair-display), serif',
                  fontWeight: 500,
                  fontSize: 'clamp(42px, 6vw, 76px)',
                  lineHeight: 1.05,
                  color: '#F8F6F1',
                }}
              >
                {p.heroTitle}
              </h1>
              <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: '#F8F6F1', maxWidth: 520 }}>
                {p.heroSubtitle}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Link
                  href="/accommodations"
                  style={{
                    padding: '16px 28px',
                    borderRadius: 9999,
                    background: '#C5A875',
                    color: '#292929',
                    fontWeight: 700,
                    fontSize: 15,
                    textDecoration: 'none',
                    transition: 'background .2s',
                  }}
                  className="hover:!bg-gold-light"
                >
                  {p.heroPrimary}
                </Link>
                <Link
                  href="/booking"
                  style={{
                    padding: '16px 28px',
                    borderRadius: 9999,
                    border: '1px solid rgba(248,246,241,0.7)',
                    color: '#F8F6F1',
                    fontWeight: 700,
                    fontSize: 15,
                    textDecoration: 'none',
                    transition: 'background .2s',
                  }}
                  className="hover:!bg-white/[0.14]"
                >
                  {p.heroSecondary}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Welcome */}
        <section
          aria-label="Welcome"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '112px 28px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: 64,
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#7A6236' }}>
              Welcome to Serava
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-playfair-display), serif',
                fontWeight: 500,
                fontSize: 'clamp(34px, 4vw, 50px)',
                lineHeight: 1.12,
                color: '#263D35',
              }}
            >
              {p.welcomeTitle}
            </h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.75, color: '#55554F' }}>{p.welcomeBody}</p>
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', paddingTop: 8 }}>
              {[{ n: '7', label: 'Studios' }, { n: '3', label: 'Suites' }, { n: '1', label: 'Private Villa' }].map(({ n, label }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontSize: 40, color: '#263D35' }}>{n}</span>
                  <span style={{ fontSize: 13, color: '#55554F', letterSpacing: '0.06em' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              position: 'relative',
              height: 520,
              borderRadius: 24,
              overflow: 'hidden',
              background: '#E8DDCC',
              boxShadow: '0 30px 60px -36px rgba(38,61,53,0.45)',
            }}
          >
            <ImageSlot placeholder="Garden and pool photo (placeholder)" />
          </div>
        </section>

        {/* Accommodations */}
        <section
          aria-label="Our Accommodations"
          style={{ background: '#FFFFFF', borderTop: '1px solid rgba(38,61,53,0.08)', borderBottom: '1px solid rgba(38,61,53,0.08)' }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '104px 28px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, marginBottom: 52 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#7A6236' }}>
                Stay With Us
              </span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 'clamp(34px, 4vw, 50px)', lineHeight: 1.12, color: '#263D35' }}>
                Our Accommodations
              </h2>
              <p style={{ margin: 0, maxWidth: 540, fontSize: 16, lineHeight: 1.7, color: '#55554F' }}>
                Three ways to stay, from studios for two to a villa for the whole family.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 28 }}>
              {categories.map(c => (
                <article
                  key={c.slug}
                  style={{
                    background: '#F8F6F1',
                    borderRadius: 22,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 20px 44px -30px rgba(38,61,53,0.4)',
                    transition: 'transform .3s',
                  }}
                  className="hover:!-translate-y-1"
                >
                  <div style={{ position: 'relative', height: 280, background: '#E8DDCC' }}>
                    <ImageSlot placeholder={`${c.photo} (placeholder)`} />
                    <span
                      style={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        padding: '7px 14px',
                        borderRadius: 9999,
                        background: 'rgba(248,246,241,0.94)',
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#263D35',
                        pointerEvents: 'none',
                      }}
                    >
                      {c.units} {c.units > 1 ? 'units' : 'unit'}
                    </span>
                  </div>
                  <div style={{ padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 26, color: '#263D35' }}>
                      {c.name}
                    </h3>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#55554F' }}>{c.short}</p>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700, color: '#263D35' }}>
                      <Users size={17} style={{ color: '#82947C' }} />
                      Up to {c.maxGuests} guests {c.units > 1 ? 'each' : ''}
                    </span>
                    <div style={{ marginTop: 'auto', paddingTop: 10 }}>
                      <Link
                        href={`/accommodations/${c.slug}`}
                        style={{
                          display: 'inline-flex',
                          padding: '13px 24px',
                          borderRadius: 9999,
                          background: '#263D35',
                          color: '#F8F6F1',
                          fontSize: 14,
                          fontWeight: 700,
                          textDecoration: 'none',
                          transition: 'background .2s',
                        }}
                        className="hover:!bg-forest-dark"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section aria-label="Amenities" style={{ maxWidth: 1280, margin: '0 auto', padding: '104px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#7A6236' }}>
                Amenities
              </span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 'clamp(34px, 4vw, 50px)', lineHeight: 1.12, color: '#263D35' }}>
                Everything you need to unwind
              </h2>
            </div>
            <Link
              href="/amenities"
              style={{ padding: '13px 24px', borderRadius: 9999, border: '1px solid #263D35', color: '#263D35', fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'background .2s, color .2s' }}
              className="hover:!bg-forest hover:!text-cream"
            >
              See All Amenities
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 18 }}>
            {amenities.map(a => {
              const Icon = iconMap[a.icon]
              return (
                <div
                  key={a.title}
                  style={{ background: '#FFFFFF', borderRadius: 20, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 16, boxShadow: '0 14px 34px -28px rgba(38,61,53,0.45)' }}
                >
                  <span style={{ width: 50, height: 50, borderRadius: 9999, background: '#E8DDCC', color: '#263D35', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {Icon && <Icon size={22} />}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#263D35' }}>{a.title}</span>
                    <span style={{ fontSize: 14, lineHeight: 1.6, color: '#55554F' }}>{a.text}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Explore Aruba */}
        <section aria-label="Explore Aruba" style={{ background: '#E8DDCC' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '104px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#6B5530' }}>
                  Explore Aruba
                </span>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 'clamp(34px, 4vw, 50px)', lineHeight: 1.12, color: '#263D35' }}>
                  Beaches, dining and island life
                </h2>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: '#4A4A44' }}>
                  Eagle Beach is on your doorstep, with Palm Beach, Oranjestad and the island&apos;s wild north coast a short drive away.
                </p>
              </div>
              <Link
                href="/explore-aruba"
                style={{ padding: '13px 24px', borderRadius: 9999, background: '#263D35', color: '#F8F6F1', fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'background .2s' }}
                className="hover:!bg-forest-dark"
              >
                Explore the Island
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 20 }}>
              {homeExplore.map(e => (
                <Link
                  key={e.key}
                  href="/explore-aruba"
                  style={{ position: 'relative', display: 'block', height: 380, borderRadius: 22, overflow: 'hidden', background: '#D8CBB6', textDecoration: 'none' }}
                >
                  <ImageSlot placeholder={`${e.title} (placeholder)`} />
                  <div
                    style={{
                      position: 'absolute',
                      left: 0, right: 0, bottom: 0,
                      padding: '70px 22px 22px',
                      pointerEvents: 'none',
                      background: 'linear-gradient(0deg, rgba(38,61,53,0.92) 0%, rgba(38,61,53,0) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                    }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E8DDCC' }}>{e.cat}</span>
                    <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontSize: 24, color: '#F8F6F1' }}>{e.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Book your stay" style={{ position: 'relative', overflow: 'hidden', background: '#263D35' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <ImageSlot placeholder="Sunset beach photo (placeholder)" />
          </div>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'rgba(38,61,53,0.78)' }} />
          <div
            style={{
              position: 'relative',
              maxWidth: 760,
              margin: '0 auto',
              padding: '120px 28px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 22,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C5A875' }}>
              Eagle Beach · Aruba
            </span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.1, color: '#F8F6F1' }}>
              {p.ctaTitle}
            </h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#E8DDCC', maxWidth: 520 }}>{p.ctaBody}</p>
            <Link
              href="/booking"
              style={{ padding: '16px 30px', borderRadius: 9999, background: '#C5A875', color: '#292929', fontWeight: 700, fontSize: 15, textDecoration: 'none', transition: 'background .2s' }}
              className="hover:!bg-gold-light"
            >
              Book Your Stay
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
