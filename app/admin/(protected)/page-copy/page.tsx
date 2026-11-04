'use client'

import { useState } from 'react'
import { AdminCard, AdminPageHeader, fieldStyle, labelStyle, labelTextStyle } from '../components/AdminCard'
import { pages as seedPages, property as seedProperty, contact as seedContact } from '@/content/seed'

export default function PageCopyPage() {
  const [prop, setProp] = useState(seedProperty)
  const [home, setHome] = useState(seedPages.home)
  const [about, setAbout] = useState(seedPages.about)
  const [booking, setBooking] = useState(seedPages.booking)
  const [contactData, setContact] = useState(seedContact)
  const [saved, setSaved] = useState(false)

  const field = (label: string, value: string, onChange: (v: string) => void, area = false) => (
    <label key={label} style={labelStyle}>
      <span style={labelTextStyle}>{label}</span>
      {area
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} style={{ ...fieldStyle, resize: 'vertical' }} />
        : <input value={value} onChange={e => onChange(e.target.value)} style={fieldStyle} />
      }
    </label>
  )

  return (
    <>
      <AdminPageHeader title="Page Copy" desc="Text content across all public pages." />

      <AdminCard title="Property">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: '14px 18px' }}>
          {field('Property name', prop.name, v => setProp(p => ({ ...p, name: v })))}
          {field('Tagline', prop.tagline, v => setProp(p => ({ ...p, tagline: v })))}
          {field('Short blurb (footer)', prop.blurb, v => setProp(p => ({ ...p, blurb: v })))}
        </div>
      </AdminCard>

      <AdminCard title="Contact info" desc="Shown in the footer, contact page and booking sidebar.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: '14px 18px' }}>
          {field('Email', contactData.email, v => setContact(c => ({ ...c, email: v })))}
          {field('Phone', contactData.phone, v => setContact(c => ({ ...c, phone: v })))}
          {field('WhatsApp URL', contactData.whatsapp, v => setContact(c => ({ ...c, whatsapp: v })))}
          {field('Area / Location', contactData.area, v => setContact(c => ({ ...c, area: v })))}
        </div>
      </AdminCard>

      <AdminCard title="Home page">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: '14px 18px' }}>
          {field('Hero eyebrow', home.heroEyebrow, v => setHome(h => ({ ...h, heroEyebrow: v })))}
          {field('Hero title', home.heroTitle, v => setHome(h => ({ ...h, heroTitle: v })))}
          {field('Hero subtitle', home.heroSubtitle, v => setHome(h => ({ ...h, heroSubtitle: v })))}
          {field('Hero primary CTA label', home.heroPrimary, v => setHome(h => ({ ...h, heroPrimary: v })))}
          {field('Hero secondary CTA label', home.heroSecondary, v => setHome(h => ({ ...h, heroSecondary: v })))}
          {field('Welcome title', home.welcomeTitle, v => setHome(h => ({ ...h, welcomeTitle: v })))}
          {field('Welcome body', home.welcomeBody, v => setHome(h => ({ ...h, welcomeBody: v })), true)}
          {field('CTA section title', home.ctaTitle, v => setHome(h => ({ ...h, ctaTitle: v })))}
          {field('CTA section body', home.ctaBody, v => setHome(h => ({ ...h, ctaBody: v })))}
        </div>
      </AdminCard>

      <AdminCard title="About page">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: '14px 18px' }}>
          {field('Page title', about.title, v => setAbout(a => ({ ...a, title: v })))}
          {field('Story section title', about.storyTitle, v => setAbout(a => ({ ...a, storyTitle: v })))}
          {field('Story body paragraph 1', about.storyBody1, v => setAbout(a => ({ ...a, storyBody1: v })), true)}
          {field('Story body paragraph 2', about.storyBody2, v => setAbout(a => ({ ...a, storyBody2: v })), true)}
        </div>
      </AdminCard>

      <AdminCard title="Booking page (placeholder)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: '14px 18px' }}>
          {field('Heading', booking.heading, v => setBooking(b => ({ ...b, heading: v })))}
          {field('Subheading', booking.subheading, v => setBooking(b => ({ ...b, subheading: v })))}
          {field('Message', booking.message, v => setBooking(b => ({ ...b, message: v })), true)}
          {field('Primary button label', booking.primaryLabel, v => setBooking(b => ({ ...b, primaryLabel: v })))}
          {field('Secondary button label', booking.secondaryLabel, v => setBooking(b => ({ ...b, secondaryLabel: v })))}
        </div>
      </AdminCard>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        {saved && <span style={{ display: 'flex', alignItems: 'center', fontSize: 13, color: '#5E6F58' }}>✓ Changes noted — connect a database to persist them.</span>}
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500) }} style={{ padding: '11px 22px', border: 'none', borderRadius: 10, background: '#263D35', color: '#F8F6F1', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Save changes</button>
      </div>
    </>
  )
}
