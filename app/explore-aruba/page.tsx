import type { Metadata } from 'next'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import ImageSlot from '@/components/ImageSlot'
import { explore, seo } from '@/content/seed'

const pageSeo = seo.find(s => s.key === 'explore')!

export const metadata: Metadata = {
  title: pageSeo.title,
  description: pageSeo.description,
  openGraph: { title: pageSeo.title, description: pageSeo.description, type: 'website', url: 'https://www.seravaretreats.com/explore-aruba' },
  alternates: { canonical: 'https://www.seravaretreats.com/explore-aruba' },
}

const cats = ['All', ...Array.from(new Set(explore.map(e => e.cat)))]

export default function ExploreArubaPage() {
  return (
    <div style={{ background: '#F8F6F1', color: '#292929' }}>
      <SiteNav active="explore" />

      <main id="main-content">
        <section
          aria-label="Explore Aruba header"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 28px 56px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 18 }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#7A6236' }}>Explore Aruba</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.08, color: '#263D35' }}>
            Discover the island
          </h1>
          <p style={{ margin: 0, maxWidth: 580, fontSize: 17, lineHeight: 1.7, color: '#55554F' }}>
            Eagle Beach is on your doorstep. Palm Beach, Oranjestad and the wild north coast are a short drive away.
          </p>
        </section>

        {/* Category sections */}
        {cats.filter(c => c !== 'All').map(cat => {
          const entries = explore.filter(e => e.cat === cat)
          return (
            <section key={cat} aria-label={cat} style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px 80px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#7A6236' }}>{cat}</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(38,61,53,0.1)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
                {entries.map(e => (
                  <article
                    key={e.key}
                    style={{ position: 'relative', height: 380, borderRadius: 22, overflow: 'hidden', background: '#D8CBB6' }}
                  >
                    <ImageSlot placeholder={`${e.title} (placeholder)`} />
                    <div
                      style={{
                        position: 'absolute',
                        left: 0, right: 0, bottom: 0,
                        padding: '80px 24px 24px',
                        background: 'linear-gradient(0deg, rgba(38,61,53,0.92) 0%, rgba(38,61,53,0) 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                      }}
                    >
                      <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontSize: 26, color: '#F8F6F1', fontWeight: 500 }}>
                        {e.title}
                      </h2>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#E8DDCC' }}>{e.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )
        })}
      </main>

      <SiteFooter />
    </div>
  )
}
