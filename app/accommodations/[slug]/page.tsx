import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Users, BedDouble, Bath, Waves, Dumbbell, Wifi, Car, Wind, Trees, Umbrella } from 'lucide-react'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import ImageSlot from '@/components/ImageSlot'
import { categories, units, amenities, houseRules } from '@/content/seed'
import type { CategorySlug } from '@/content/seed'

const iconMap: Record<string, React.ElementType> = {
  waves: Waves, dumbbell: Dumbbell, wifi: Wifi, car: Car, wind: Wind, trees: Trees, umbrella: Umbrella,
  users: Users, 'bed-double': BedDouble, bath: Bath,
}

export async function generateStaticParams() {
  return [{ slug: 'studios' }, { slug: 'suites' }, { slug: 'villa' }]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cat = categories.find(c => c.slug === slug)
  if (!cat) return {}
  return {
    title: `${cat.name} | Aruba Vacation Rentals near Eagle Beach`,
    description: cat.description,
    openGraph: {
      title: `${cat.name} at Serava Retreats, Aruba`,
      description: cat.short,
      type: 'website',
      url: `https://www.seravaretreats.com/accommodations/${slug}`,
    },
    alternates: { canonical: `https://www.seravaretreats.com/accommodations/${slug}` },
  }
}

export default async function AccommodationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cat = categories.find(c => c.slug === (slug as CategorySlug))
  if (!cat) notFound()

  const catUnits = units.filter(u => u.category === cat.slug && u.status !== 'Hidden')
  const others = categories.filter(o => o.slug !== cat.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Accommodation',
    name: cat.name,
    description: cat.description,
    occupancy: { '@type': 'QuantitativeValue', maxValue: cat.maxGuests },
    numberOfRooms: cat.units,
    containedInPlace: {
      '@type': 'LodgingBusiness',
      name: 'Serava Retreats',
      url: 'https://www.seravaretreats.com',
    },
  }

  return (
    <div style={{ background: '#F8F6F1', color: '#292929' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav active="accommodations" />

      <main id="main-content" style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 28px 112px' }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: 8, fontSize: 13, color: '#55554F', marginBottom: 24 }}>
          <Link href="/" style={{ color: '#55554F', textDecoration: 'none' }} className="hover:!text-forest">Home</Link>
          <span>/</span>
          <Link href="/accommodations" style={{ color: '#55554F', textDecoration: 'none' }} className="hover:!text-forest">Accommodations</Link>
          <span>/</span>
          <span style={{ color: '#263D35', fontWeight: 700 }}>{cat.name}</span>
        </nav>

        {/* Photo grid */}
        <section
          aria-label="Photos"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 12, marginBottom: 56 }}
        >
          <div style={{ position: 'relative', minHeight: 480, borderRadius: 24, overflow: 'hidden', background: '#E8DDCC', gridRow: 'span 2' }}>
            <ImageSlot placeholder="Main photo (placeholder)" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['Bedroom', 'Bathroom', 'Living area', 'Outdoor space'].map(label => (
              <div key={label} style={{ position: 'relative', height: 234, borderRadius: 20, overflow: 'hidden', background: '#E8DDCC' }}>
                <ImageSlot placeholder={`${label} (placeholder)`} />
              </div>
            ))}
          </div>
        </section>

        {/* Content + sidebar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 56, alignItems: 'start' }}>
          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48, gridColumn: 'span 2', minWidth: 0 }}>
            {/* Overview */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#7A6236' }}>
                {cat.units} {cat.units > 1 ? 'units' : 'unit'}
              </span>
              <h1 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 'clamp(38px, 4.6vw, 58px)', lineHeight: 1.08, color: '#263D35' }}>
                {cat.name}
              </h1>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.75, color: '#55554F', maxWidth: 680 }}>{cat.description}</p>
            </section>

            {/* Stat cards */}
            <section
              aria-label="Key details"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}
            >
              {[
                { icon: 'users', label: 'Max occupancy', value: `Up to ${cat.maxGuests} guests` },
                { icon: 'bed-double', label: 'Bedrooms', value: cat.bedrooms },
                { icon: 'bath', label: 'Bathrooms', value: cat.bathrooms },
              ].map(({ icon, label, value }) => {
                const Icon = iconMap[icon]
                return (
                  <div key={label} style={{ background: '#FFFFFF', borderRadius: 20, padding: 22, display: 'flex', flexDirection: 'column', gap: 10, boxShadow: '0 14px 34px -28px rgba(38,61,53,0.45)' }}>
                    {Icon && <Icon size={22} style={{ color: '#82947C' }} />}
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#55554F' }}>{label}</span>
                    <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontSize: 20, color: '#263D35' }}>{value}</span>
                  </div>
                )
              })}
            </section>

            {/* Category amenities */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 30, color: '#263D35' }}>Amenities</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                {cat.amenities.map(([icon, label]) => {
                  const Icon = iconMap[icon]
                  return (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', background: '#FFFFFF', borderRadius: 16, border: '1px solid rgba(38,61,53,0.08)' }}>
                      <span style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 9999, background: '#E8DDCC', color: '#263D35', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {Icon && <Icon size={18} />}
                      </span>
                      <span style={{ fontSize: 15, fontWeight: 700, color: '#292929' }}>{label}</span>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Property facilities */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 30, color: '#263D35' }}>Property Facilities</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px 28px' }}>
                {amenities.map(a => {
                  const Icon = iconMap[a.icon]
                  return (
                    <div key={a.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      {Icon && <Icon size={18} style={{ color: '#82947C', paddingTop: 2, flexShrink: 0 }} />}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: '#292929' }}>{a.title}</span>
                        <span style={{ fontSize: 14, lineHeight: 1.55, color: '#55554F' }}>{a.text}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* House rules */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 30, color: '#263D35' }}>House Rules</h2>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2, background: '#FFFFFF', borderRadius: 20, border: '1px solid rgba(38,61,53,0.08)', overflow: 'hidden' }}>
                {houseRules.map(rule => (
                  <li
                    key={rule}
                    style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(38,61,53,0.06)', fontSize: 15, color: '#3A3A36' }}
                  >
                    <span style={{ width: 6, height: 6, flexShrink: 0, borderRadius: 9999, background: '#C5A875' }} />
                    {rule}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sticky sidebar */}
          <aside
            style={{
              position: 'sticky',
              top: 100,
              background: '#263D35',
              color: '#F8F6F1',
              borderRadius: 24,
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C5A875' }}>Reserve</span>
            <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontSize: 28, lineHeight: 1.2 }}>{cat.name}</span>
            <span style={{ fontSize: 15, lineHeight: 1.6, color: '#D6DCD4' }}>
              Up to {cat.maxGuests} guests · {cat.units} {cat.units > 1 ? 'units' : 'unit'}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {catUnits.map(u => (
                <span key={u.id} style={{ padding: '6px 12px', borderRadius: 9999, border: '1px solid rgba(248,246,241,0.22)', fontSize: 12, color: '#E8DDCC' }}>
                  {u.name}
                </span>
              ))}
            </div>
            <Link
              href="/booking"
              style={{ textAlign: 'center', padding: '16px 24px', borderRadius: 9999, background: '#C5A875', color: '#292929', fontSize: 15, fontWeight: 700, textDecoration: 'none', transition: 'background .2s' }}
              className="hover:!bg-gold-light"
            >
              Book This Accommodation
            </Link>
            <Link
              href="/contact"
              style={{ textAlign: 'center', fontSize: 14, color: '#E8DDCC', textDecoration: 'none', transition: 'color .2s' }}
              className="hover:!text-white"
            >
              Questions? Contact us
            </Link>
          </aside>
        </div>

        {/* Other accommodations */}
        <section aria-label="Other stays" style={{ marginTop: 96, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 30, color: '#263D35' }}>Other Accommodations</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 16 }}>
            {others.map(o => (
              <Link
                key={o.slug}
                href={`/accommodations/${o.slug}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 16,
                  padding: '24px 26px',
                  background: '#FFFFFF',
                  borderRadius: 20,
                  border: '1px solid rgba(38,61,53,0.08)',
                  textDecoration: 'none',
                  transition: 'border-color .2s',
                }}
                className="hover:!border-gold"
              >
                <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontSize: 22, color: '#263D35' }}>{o.name}</span>
                  <span style={{ fontSize: 14, color: '#55554F' }}>
                    {o.units} {o.units > 1 ? 'units' : 'unit'} · up to {o.maxGuests} guests
                  </span>
                </span>
                <span style={{ fontSize: 20, color: '#263D35' }}>→</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
