import type { Metadata } from 'next'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import ContactForm from './ContactForm'
import { contact, integrations, seo } from '@/content/seed'

const pageSeo = seo.find(s => s.key === 'contact')!

export const metadata: Metadata = {
  title: pageSeo.title,
  description: pageSeo.description,
  openGraph: { title: 'Contact Serava Retreats', description: pageSeo.description, type: 'website', url: 'https://www.seravaretreats.com/contact' },
  alternates: { canonical: 'https://www.seravaretreats.com/contact' },
}

export default function ContactPage() {
  const hasMap = Boolean(integrations.mapsEmbed)

  return (
    <div style={{ background: '#F8F6F1', color: '#292929' }}>
      <SiteNav active="contact" />

      <main id="main-content">
        <section
          aria-label="Contact header"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 28px 56px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 18 }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#7A6236' }}>Contact</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.08, color: '#263D35' }}>
            We&apos;d love to hear from you
          </h1>
          <p style={{ margin: 0, maxWidth: 560, fontSize: 17, lineHeight: 1.7, color: '#55554F' }}>
            Ask about availability, reservations or anything else about your stay.
          </p>
        </section>

        <section
          aria-label="Contact form and info"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px 96px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: 28, alignItems: 'start' }}
        >
          {/* Form */}
          <ContactForm />

          {/* Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#263D35', color: '#F8F6F1', borderRadius: 24, padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-playfair-display), serif', fontWeight: 500, fontSize: 26 }}>Get in touch</h2>
              <a href={`mailto:${contact.email}`} style={{ display: 'flex', gap: 12, alignItems: 'center', color: '#F8F6F1', textDecoration: 'none', fontSize: 15, transition: 'color .2s' }} className="hover:!text-sand">
                <Mail size={18} style={{ color: '#C5A875', flexShrink: 0 }} />
                {contact.email}
              </a>
              <span style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 15 }}>
                <Phone size={18} style={{ color: '#C5A875', flexShrink: 0 }} />
                {contact.phone}
              </span>
              <span style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 15 }}>
                <MapPin size={18} style={{ color: '#C5A875', flexShrink: 0 }} />
                {contact.area}
              </span>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, padding: '15px 24px', borderRadius: 9999, background: '#C5A875', color: '#292929', fontSize: 15, fontWeight: 700, textDecoration: 'none', transition: 'background .2s' }}
                className="hover:!bg-gold-light"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </div>
            <span style={{ fontSize: 12, color: '#55554F', padding: '0 8px' }}>
              Email, phone and WhatsApp details are placeholders.
            </span>
          </aside>
        </section>

        {/* Map */}
        <section aria-label="Location map" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px 112px' }}>
          {hasMap ? (
            <iframe
              src={integrations.mapsEmbed}
              title="Serava Retreats location map"
              loading="lazy"
              style={{ width: '100%', height: 420, border: 0, borderRadius: 24, display: 'block' }}
            />
          ) : (
            <div
              style={{
                height: 380,
                borderRadius: 24,
                background: '#E8DDCC',
                border: '1px dashed rgba(38,61,53,0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                textAlign: 'center',
                padding: 24,
              }}
            >
              <MapPin size={32} style={{ color: '#263D35' }} />
              <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontSize: 24, color: '#263D35' }}>
                Eagle Beach Area, Aruba
              </span>
              <span style={{ fontSize: 14, color: '#4A4A44', maxWidth: 420 }}>
                The map will be embedded once the public property location is confirmed.
              </span>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
