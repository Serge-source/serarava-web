import { auth } from '@/auth'
import Link from 'next/link'
import { BedDouble, Sparkles, Image, Compass, FileText, Search, Inbox, Calendar, Plug, Users } from 'lucide-react'

const checklist = [
  { label: 'Contact details', hint: 'Phone, email and WhatsApp', href: '/admin/integrations' },
  { label: 'Accommodation details', hint: 'Bedrooms, bathrooms, check-in times', href: '/admin/accommodations/studios' },
  { label: 'Property amenities', hint: 'Review and confirm the amenity list', href: '/admin/amenities' },
  { label: 'Gallery photos', hint: 'Replace placeholder images with real photos', href: '/admin/gallery' },
  { label: 'Page copy', hint: 'Hero text, About story, CTA copy', href: '/admin/page-copy' },
  { label: 'SEO titles & descriptions', hint: 'Confirm meta content for all pages', href: '/admin/seo' },
  { label: 'Email delivery', hint: 'Connect Resend or SMTP so contact forms arrive', href: '/admin/integrations' },
]

const futureModules = [
  { icon: <Calendar size={18} />, label: 'Availability calendar' },
  { icon: <BedDouble size={18} />, label: 'Reservation management' },
  { icon: <FileText size={18} />, label: 'Invoicing' },
  { icon: <Users size={18} />, label: 'Guest records' },
  { icon: <Plug size={18} />, label: 'Channel manager' },
  { icon: <Sparkles size={18} />, label: 'Reviews & ratings' },
]

export default async function AdminDashboard() {
  const session = await auth()
  const role = (session?.user as { role?: string })?.role ?? 'Staff'

  const statCards = [
    { label: 'Accommodations', value: '11', sub: '7 studios · 3 suites · 1 villa', href: '/admin/accommodations/studios' },
    { label: 'Gallery photos', value: '12', sub: 'Placeholder images', href: '/admin/gallery' },
    { label: 'Explore entries', value: '7', sub: 'Beaches, dining, activities', href: '/admin/explore' },
    { label: 'Messages', value: '0', sub: 'No messages yet', href: '/admin/messages' },
  ]

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#263D35' }}>Dashboard</h1>
        <span style={{ fontSize: 13, color: '#6B6A65' }}>Signed in as {role}</span>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 14 }}>
        {statCards.map(s => (
          <Link key={s.href} href={s.href} style={{ textDecoration: 'none', background: '#FFFFFF', border: '1px solid #E4E1DA', borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6A65' }}>{s.label}</span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: '#263D35', lineHeight: 1 }}>{s.value}</span>
            <span style={{ fontSize: 13, color: '#6B6A65' }}>{s.sub}</span>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 20, alignItems: 'start' }}>
        {/* Launch checklist */}
        <section style={{ background: '#FFFFFF', border: '1px solid #E4E1DA', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '18px 20px', borderBottom: '1px solid #EEEBE5', fontSize: 15, fontWeight: 700, color: '#263D35' }}>
            Launch checklist
          </div>
          {checklist.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 20px', borderBottom: '1px solid #F1EEE7' }}>
              <span style={{ width: 22, height: 22, flexShrink: 0, borderRadius: 9999, border: '2px solid #DDD9D0', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#8A8984' }}>
                {i + 1}
              </span>
              <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontWeight: 700, color: '#292929' }}>{c.label}</span>
                <span style={{ fontSize: 12, color: '#6B6A65' }}>{c.hint}</span>
              </span>
              <Link href={c.href} style={{ padding: '6px 10px', border: '1px solid #DDD9D0', borderRadius: 8, background: '#FFFFFF', fontSize: 12, fontWeight: 700, color: '#263D35', textDecoration: 'none' }}>
                Open
              </Link>
            </div>
          ))}
        </section>

        {/* Quick links */}
        <section style={{ background: '#FFFFFF', border: '1px solid #E4E1DA', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '18px 20px', borderBottom: '1px solid #EEEBE5', fontSize: 15, fontWeight: 700, color: '#263D35' }}>
            Quick access
          </div>
          {[
            { label: 'Messages / Inbox', icon: <Inbox size={15} />, href: '/admin/messages' },
            { label: 'Gallery', icon: <Image size={15} />, href: '/admin/gallery' },
            { label: 'Amenities', icon: <Sparkles size={15} />, href: '/admin/amenities' },
            { label: 'Explore Aruba', icon: <Compass size={15} />, href: '/admin/explore' },
            { label: 'Page Copy', icon: <FileText size={15} />, href: '/admin/page-copy' },
            { label: 'SEO', icon: <Search size={15} />, href: '/admin/seo' },
            { label: 'Integrations', icon: <Plug size={15} />, href: '/admin/integrations' },
            ...(role === 'Owner' ? [{ label: 'Users & Roles', icon: <Users size={15} />, href: '/admin/users' }] : []),
          ].map(l => (
            <Link key={l.href} href={l.href} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: '1px solid #F1EEE7', textDecoration: 'none', color: '#292929', fontSize: 14, fontWeight: 700 }}>
              <span style={{ color: '#82947C' }}>{l.icon}</span>
              {l.label}
            </Link>
          ))}
        </section>
      </div>

      {/* Coming later */}
      <section style={{ background: '#FFFFFF', border: '1px solid #E4E1DA', borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#263D35' }}>Coming later</span>
          <span style={{ fontSize: 12, color: '#6B6A65' }}>Planned modules for the reservation and property management phase</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 10 }}>
          {futureModules.map(m => (
            <div key={m.label} style={{ padding: 14, border: '1px dashed #D6D2C8', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 6, background: '#FAF9F6' }}>
              <span style={{ color: '#8A8984' }}>{m.icon}</span>
              <span style={{ fontWeight: 700, color: '#55554F' }}>{m.label}</span>
              <span style={{ alignSelf: 'flex-start', padding: '2px 8px', borderRadius: 9999, background: '#F3ECDD', color: '#6B5530', fontSize: 11, fontWeight: 700 }}>Coming soon</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
