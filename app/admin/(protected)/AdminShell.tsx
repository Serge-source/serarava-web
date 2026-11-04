'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard, BedDouble, Sparkles, Image, Compass, FileText,
  Search, Inbox, Calendar, Users, Plug, LogOut, Menu, X, ExternalLink,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  ownerOnly?: boolean
}

interface NavGroup {
  label: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={16} /> },
      { label: 'Messages', href: '/admin/messages', icon: <Inbox size={16} /> },
    ],
  },
  {
    label: 'Accommodations',
    items: [
      { label: 'Studios', href: '/admin/accommodations/studios', icon: <BedDouble size={16} /> },
      { label: 'Suites', href: '/admin/accommodations/suites', icon: <BedDouble size={16} /> },
      { label: 'Private Villa', href: '/admin/accommodations/villa', icon: <BedDouble size={16} /> },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'Amenities', href: '/admin/amenities', icon: <Sparkles size={16} /> },
      { label: 'Gallery', href: '/admin/gallery', icon: <Image size={16} /> },
      { label: 'Explore Aruba', href: '/admin/explore', icon: <Compass size={16} /> },
      { label: 'Page Copy', href: '/admin/page-copy', icon: <FileText size={16} /> },
      { label: 'SEO', href: '/admin/seo', icon: <Search size={16} /> },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Booking Page', href: '/admin/booking', icon: <Calendar size={16} /> },
      { label: 'Integrations', href: '/admin/integrations', icon: <Plug size={16} /> },
      { label: 'Users & Roles', href: '/admin/users', icon: <Users size={16} />, ownerOnly: true },
    ],
  },
]

function initials(name?: string | null) {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
}

export default function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode
  user: { name?: string | null; email?: string | null; role?: string }
}) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const role = user.role ?? 'Staff'

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  const sidebar = (
    <aside
      style={{
        width: 256,
        flex: 'none',
        background: '#FFFFFF',
        borderRight: '1px solid #E4E1DA',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        fontFamily: "'Lato', system-ui, sans-serif",
      }}
    >
      {/* Brand */}
      <div style={{ padding: '22px 22px 18px', borderBottom: '1px solid #EEEBE5' }}>
        <Link href="/admin" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, textDecoration: 'none' }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#263D35' }}>Serava</span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', color: '#7A6236', marginTop: 5 }}>ADMIN</span>
        </Link>
      </div>

      {/* Nav */}
      <nav aria-label="Admin" style={{ padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1, overflowY: 'auto' }}>
        {navGroups.map(g => (
          <div key={g.label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ padding: '4px 10px 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A8984' }}>
              {g.label}
            </span>
            {g.items
              .filter(item => !item.ownerOnly || role === 'Owner')
              .map(item => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '9px 10px',
                      borderRadius: 10,
                      background: active ? '#F1EEE7' : 'transparent',
                      color: active ? '#263D35' : '#55554F',
                      fontSize: 14,
                      fontWeight: 700,
                      textDecoration: 'none',
                      transition: 'background .15s, color .15s',
                    }}
                  >
                    <span style={{ display: 'flex', opacity: 0.9 }}>{item.icon}</span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                  </Link>
                )
              })}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div style={{ padding: '16px 18px', borderTop: '1px solid #EEEBE5', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 34, height: 34, borderRadius: 9999, background: '#263D35', color: '#F8F6F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
          {initials(user.name)}
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, flex: 1 }}>
          <span style={{ fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</span>
          <span style={{ fontSize: 12, color: '#6B6A65' }}>{role}</span>
        </span>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          title="Sign out"
          style={{ display: 'flex', padding: 6, border: 'none', background: 'none', color: '#8A8984', cursor: 'pointer', borderRadius: 8 }}
        >
          <LogOut size={15} />
        </button>
      </div>
    </aside>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F4F3EF', fontFamily: "'Lato', system-ui, sans-serif", fontSize: 14, color: '#292929' }}>
      {/* Desktop sidebar */}
      <div style={{ position: 'sticky', top: 0, height: '100vh' }} className="hidden-mobile">
        {sidebar}
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }}
          onClick={() => setMobileOpen(false)}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,30,24,0.4)' }} />
          <div style={{ position: 'relative', zIndex: 1, height: '100%' }} onClick={e => e.stopPropagation()}>
            {sidebar}
          </div>
        </div>
      )}

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(244,243,239,0.94)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #E4E1DA', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <button
            onClick={() => setMobileOpen(true)}
            style={{ display: 'flex', padding: 6, border: 'none', background: 'none', color: '#263D35', cursor: 'pointer', borderRadius: 8 }}
            aria-label="Open menu"
            className="show-mobile"
          >
            <Menu size={20} />
          </button>
          <div style={{ flex: 1 }} />
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: '1px solid #DDD9D0', borderRadius: 10, background: '#FFFFFF', color: '#292929', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
          >
            <ExternalLink size={13} />
            View site
          </a>
        </header>

        <main style={{ flex: 1, padding: 'clamp(20px, 3vw, 32px)', display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1240, width: '100%', margin: '0 auto' }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (min-width: 768px) { .hidden-mobile { display: block !important; } .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
    </div>
  )
}
