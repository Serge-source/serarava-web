import type { Metadata } from 'next'
import Link from 'next/link'
import { Waves, Dumbbell, Wifi, Car, Wind, Trees, Umbrella } from 'lucide-react'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import ImageSlot from '@/components/ImageSlot'
import { amenities, seo } from '@/content/seed'

const pageSeo = seo.find(s => s.key === 'amenities')!

export const metadata: Metadata = {
  title: pageSeo.title,
  description: pageSeo.description,
  openGraph: { title: 'Amenities at Serava Retreats, Aruba', description: pageSeo.description, type: 'website', url: 'https://www.seravaretreats.com/amenities' },
  alternates: { canonical: 'https://www.seravaretreats.com/amenities' },
}

const iconMap: Record<string, React.ElementType> = {
  waves: Waves, dumbbell: Dumbbell, wifi: Wifi, car: Car, wind: Wind, trees: Trees, umbrella: Umbrella,
}

const features = [
  {
    icon: 'waves',
    title: 'Shared Swimming Pool',
    body: 'Cool off between beach visits in our shared pool, framed by sun loungers and tropical planting.',
    placeholder: 'Swimming pool (placeholder)',
    reverse: false,
  },
  {
    icon: 'dumbbell',
    title: 'Small Fitness Area',
    body: 'A compact fitness space for guests who want to keep up their routine while on holiday.',
    placeholder: 'Fitness area (placeholder)',
    reverse: true,
  },
  {
    icon: 'trees',
    title: 'Outdoor Relaxation Areas',
    body: 'Shaded garden corners and open-air seating for reading, afternoon naps and warm Caribbean evenings.',
    placeholder: 'Tropical outdoor spaces (placeholder)',
    reverse: false,
  },
]

export default function AmenitiesPage() {
  return (
    <div style={{ background: '#F8F6F1', color: '#292929' }}>
      <SiteNav active="amenities" />

      <main id="main-content">
        <section
          aria-label="Amenities header"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 28px 72px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 18 }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#7A6236' }}>Amenities</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.08, color: '#263D35' }}>
            Made for slow island days
          </h1>
          <p style={{ margin: 0, maxWidth: 580, fontSize: 17, lineHeight: 1.7, color: '#55554F' }}>
            Shared spaces to swim, stretch and rest, all within the property and close to Eagle Beach.
          </p>
        </section>

        {features.map(f => {
          const Icon = iconMap[f.icon]
          const image = (
            <div style={{ position: 'relative', height: 480, borderRadius: 24, overflow: 'hidden', background: '#E8DDCC', boxShadow: '0 30px 60px -36px rgba(38,61,53,0.45)' }}>
              <ImageSlot placeholder={f.placeholder} />
            </div>
          )
          const text = (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <span style={{ width: 54, height: 54, borderRadius: 9999, background: '#E8DDCC', color: '#263D35', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {Icon && <Icon size={24} />}
              </span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 'clamp(30px, 3.4vw, 42px)', color: '#263D35' }}>
                {f.title}
              </h2>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.75, color: '#55554F' }}>{f.body}</p>
            </div>
          )
          return (
            <section
              key={f.title}
              aria-label={f.title}
              style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px 96px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 56, alignItems: 'center' }}
            >
              {f.reverse ? <>{text}{image}</> : <>{image}{text}</>}
            </section>
          )
        })}

        {/* Quick-reference grid */}
        <section aria-label="All amenities" style={{ background: '#FFFFFF', borderTop: '1px solid rgba(38,61,53,0.08)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 28px 96px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', textAlign: 'center', marginBottom: 48 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#7A6236' }}>All Amenities</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 'clamp(30px, 4vw, 44px)', color: '#263D35' }}>
                Everything included with your stay
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 18 }}>
              {amenities.map(a => {
                const Icon = iconMap[a.icon]
                return (
                  <div key={a.title} style={{ background: '#F8F6F1', borderRadius: 20, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 16, border: '1px solid rgba(38,61,53,0.08)' }}>
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
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Book" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 28px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 'clamp(32px, 4vw, 48px)', color: '#263D35' }}>
            Ready to unwind at Serava?
          </h2>
          <p style={{ margin: 0, fontSize: 16, color: '#55554F', maxWidth: 480, lineHeight: 1.7 }}>
            Explore our studios, suites and private villa and find the right stay for your trip.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Link href="/accommodations" style={{ padding: '14px 26px', borderRadius: 9999, background: '#263D35', color: '#F8F6F1', fontSize: 15, fontWeight: 700, textDecoration: 'none', transition: 'background .2s' }} className="hover:!bg-forest-dark">
              View Accommodations
            </Link>
            <Link href="/booking" style={{ padding: '14px 26px', borderRadius: 9999, border: '1px solid #263D35', color: '#263D35', fontSize: 15, fontWeight: 700, textDecoration: 'none', transition: 'background .2s, color .2s' }} className="hover:!bg-forest hover:!text-cream">
              Book Now
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
