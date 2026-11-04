import Link from 'next/link'
import { MapPin, Phone, Mail, Camera, Share2, MessageCircle } from 'lucide-react'
import { property, contact, socials } from '@/content/seed'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Accommodations', href: '/accommodations' },
  { label: 'Amenities', href: '/amenities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Explore Aruba', href: '/explore-aruba' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Book Now', href: '/booking' },
]

export default function SiteFooter() {
  const year = 2026

  return (
    <footer style={{ background: '#263D35', color: '#F8F6F1', fontFamily: 'var(--font-lato), system-ui, sans-serif' }}>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '72px 28px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: 44,
        }}
      >
        {/* Brand + social */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Link href="/" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, color: '#F8F6F1', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontSize: 28, fontWeight: 500 }}>Serava</span>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.32em', color: '#C5A875', marginTop: 5 }}>RETREATS · ARUBA</span>
          </Link>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: '#D6DCD4', maxWidth: 280 }}>{property.blurb}</p>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { href: socials.instagram || '#', label: 'Instagram', Icon: Camera },
              { href: socials.facebook || '#', label: 'Facebook', Icon: Share2 },
              { href: contact.whatsapp || '#', label: 'WhatsApp', Icon: MessageCircle },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 9999,
                  border: '1px solid rgba(248,246,241,0.25)',
                  color: '#F8F6F1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background .2s, border-color .2s',
                }}
                className="hover:!bg-gold hover:!border-gold hover:!text-ink"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Nav links */}
        <nav aria-label="Footer" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C5A875' }}>
            Explore
          </span>
          {footerLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              style={{ fontSize: 14, color: '#D6DCD4', textDecoration: 'none', transition: 'color .2s' }}
              className="hover:!text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C5A875' }}>
            Contact
          </span>
          <span style={{ display: 'flex', gap: 10, fontSize: 14, color: '#D6DCD4', alignItems: 'center' }}>
            <MapPin size={16} style={{ color: '#C5A875', flexShrink: 0 }} />
            {contact.area}
          </span>
          <span style={{ display: 'flex', gap: 10, fontSize: 14, color: '#D6DCD4', alignItems: 'center' }}>
            <Phone size={16} style={{ color: '#C5A875', flexShrink: 0 }} />
            {contact.phone}
          </span>
          <a
            href={`mailto:${contact.email}`}
            style={{ display: 'flex', gap: 10, fontSize: 14, color: '#D6DCD4', textDecoration: 'none', alignItems: 'center', transition: 'color .2s' }}
            className="hover:!text-white"
          >
            <Mail size={16} style={{ color: '#C5A875', flexShrink: 0 }} />
            {contact.email}
          </a>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C5A875' }}>
            Plan Your Stay
          </span>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#D6DCD4' }}>
            Questions about availability? We&apos;re happy to help.
          </p>
          <Link
            href="/booking"
            style={{
              padding: '13px 24px',
              borderRadius: 9999,
              background: '#C5A875',
              color: '#292929',
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'background .2s',
            }}
            className="hover:!bg-gold-light"
          >
            Book Your Stay
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '22px 28px 30px',
          borderTop: '1px solid rgba(248,246,241,0.14)',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          fontSize: 13,
          color: '#B9C3BB',
        }}
      >
        <span>© {year} Serava Retreats. All rights reserved.</span>
        <span style={{ display: 'flex', gap: 24 }}>
          <a href="#" style={{ color: '#B9C3BB', textDecoration: 'none', transition: 'color .2s' }} className="hover:!text-white">
            Privacy Policy
          </a>
          <a href="#" style={{ color: '#B9C3BB', textDecoration: 'none', transition: 'color .2s' }} className="hover:!text-white">
            Terms &amp; Conditions
          </a>
        </span>
      </div>
    </footer>
  )
}
