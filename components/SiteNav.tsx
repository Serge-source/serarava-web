'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

type NavKey = 'home' | 'accommodations' | 'amenities' | 'gallery' | 'explore' | 'about' | 'contact'

interface SiteNavProps {
  active: NavKey
}

const links: { key: NavKey; label: string; href: string }[] = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'accommodations', label: 'Accommodations', href: '/accommodations' },
  { key: 'amenities', label: 'Amenities', href: '/amenities' },
  { key: 'gallery', label: 'Gallery', href: '/gallery' },
  { key: 'explore', label: 'Explore Aruba', href: '/explore-aruba' },
  { key: 'about', label: 'About Us', href: '/about' },
  { key: 'contact', label: 'Contact', href: '/contact' },
]

export default function SiteNav({ active }: SiteNavProps) {
  const [open, setOpen] = useState(false)
  const [wide, setWide] = useState(true)

  useEffect(() => {
    const check = () => setWide(window.innerWidth >= 1120)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(248,246,241,0.94)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(38,61,53,0.1)',
        fontFamily: 'var(--font-lato), system-ui, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '14px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Serava Retreats home"
          style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, color: '#263D35', textDecoration: 'none' }}
        >
          <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontSize: 26, fontWeight: 500, letterSpacing: '0.01em' }}>
            Serava
          </span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.32em', color: '#8C7240', marginTop: 4 }}>
            RETREATS · ARUBA
          </span>
        </Link>

        {/* Desktop nav */}
        {wide && (
          <nav aria-label="Main" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {links.map(l => (
              <Link
                key={l.key}
                href={l.href}
                aria-current={l.key === active ? 'page' : undefined}
                style={{
                  padding: '10px 12px',
                  fontSize: 14,
                  fontWeight: 700,
                  color: l.key === active ? '#263D35' : '#55554F',
                  textDecoration: 'none',
                  borderBottom: `2px solid ${l.key === active ? '#C5A875' : 'transparent'}`,
                  transition: 'color .2s',
                }}
                className="hover:!text-forest"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link
            href="/booking"
            style={{
              padding: '12px 22px',
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
            Book Now
          </Link>

          {!wide && (
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              style={{
                width: 44,
                height: 44,
                border: '1px solid rgba(38,61,53,0.18)',
                borderRadius: 9999,
                background: 'transparent',
                color: '#263D35',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {!wide && open && (
        <nav
          aria-label="Mobile"
          style={{ display: 'flex', flexDirection: 'column', padding: '4px 20px 22px', gap: 2 }}
        >
          {links.map(l => (
            <Link
              key={l.key}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                padding: '15px 6px',
                fontSize: 17,
                fontFamily: 'var(--font-playfair-display), serif',
                color: '#263D35',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(38,61,53,0.1)',
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
