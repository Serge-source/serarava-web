'use client'

import { useState } from 'react'
import { AdminCard, AdminPageHeader, fieldStyle, labelStyle, labelTextStyle } from '../components/AdminCard'
import { integrations as seedIntegrations, socials as seedSocials, contact as seedContact } from '@/content/seed'

export default function IntegrationsPage() {
  const [contact, setContact] = useState(seedContact)
  const [socials, setSocials] = useState(seedSocials)
  const [integrations, setIntegrations] = useState(seedIntegrations)
  const [saved, setSaved] = useState(false)

  const resendKey = typeof window !== 'undefined' ? '' : ''
  const hasResend = !!process.env.NEXT_PUBLIC_HAS_RESEND
  const hasDb = typeof window !== 'undefined'

  return (
    <>
      <AdminPageHeader title="Integrations" desc="Configure delivery adapters and external services." />

      <AdminCard title="Contact details" desc="Used in the footer, contact page and booking sidebar.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: '14px 18px' }}>
          {[
            { label: 'Email', key: 'email' as const },
            { label: 'Phone', key: 'phone' as const },
            { label: 'WhatsApp URL', key: 'whatsapp' as const },
          ].map(f => (
            <label key={f.key} style={labelStyle}>
              <span style={labelTextStyle}>{f.label}</span>
              <input value={contact[f.key]} onChange={e => setContact(c => ({ ...c, [f.key]: e.target.value }))} style={fieldStyle} />
            </label>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="Social links" desc="Linked from the footer social icons.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: '14px 18px' }}>
          <label style={labelStyle}>
            <span style={labelTextStyle}>Instagram URL</span>
            <input value={socials.instagram} onChange={e => setSocials(s => ({ ...s, instagram: e.target.value }))} placeholder="https://instagram.com/seravaretreats" style={fieldStyle} />
          </label>
          <label style={labelStyle}>
            <span style={labelTextStyle}>Facebook URL</span>
            <input value={socials.facebook} onChange={e => setSocials(s => ({ ...s, facebook: e.target.value }))} placeholder="https://facebook.com/seravaretreats" style={fieldStyle} />
          </label>
        </div>
      </AdminCard>

      <AdminCard title="Email delivery" desc="Set RESEND_API_KEY in your .env.local to activate Resend delivery.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ padding: '14px 16px', borderRadius: 12, background: '#FAF9F6', border: '1px solid #EEEBE5', fontSize: 13, lineHeight: 1.6, color: '#55554F' }}>
            <strong style={{ color: '#292929' }}>Resend:</strong> add <code>RESEND_API_KEY=re_...</code> and <code>NOTIFY_EMAIL=your@email.com</code> to your <code>.env.local</code> file. Contact form submissions will be forwarded to that address.
          </div>
          <label style={labelStyle}>
            <span style={labelTextStyle}>Notify email</span>
            <input
              value={integrations.notifyEmail}
              onChange={e => setIntegrations(i => ({ ...i, notifyEmail: e.target.value }))}
              type="email"
              placeholder="owner@seravaretreats.com"
              style={fieldStyle}
            />
            <span style={{ fontSize: 12, color: '#6B6A65' }}>Where contact form submissions are forwarded. Set as NOTIFY_EMAIL env var to activate.</span>
          </label>
        </div>
      </AdminCard>

      <AdminCard title="Google Maps embed" desc="Shown on the contact page when set.">
        <label style={labelStyle}>
          <span style={labelTextStyle}>Maps embed URL</span>
          <input
            value={integrations.mapsEmbed}
            onChange={e => setIntegrations(i => ({ ...i, mapsEmbed: e.target.value }))}
            placeholder="https://www.google.com/maps/embed?pb=..."
            style={fieldStyle}
          />
          <span style={{ fontSize: 12, color: '#6B6A65' }}>From Google Maps → Share → Embed a map → copy the src URL only.</span>
        </label>
      </AdminCard>

      <AdminCard title="Analytics" desc="Optional — set NEXT_PUBLIC_GA_ID to activate Google Analytics.">
        <label style={labelStyle}>
          <span style={labelTextStyle}>Google Analytics measurement ID</span>
          <input
            value={integrations.analyticsId}
            onChange={e => setIntegrations(i => ({ ...i, analyticsId: e.target.value }))}
            placeholder="G-XXXXXXXXXX"
            style={fieldStyle}
          />
        </label>
      </AdminCard>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        {saved && <span style={{ display: 'flex', alignItems: 'center', fontSize: 13, color: '#5E6F58' }}>✓ Values noted — update your .env.local to persist them.</span>}
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500) }} style={{ padding: '11px 22px', border: 'none', borderRadius: 10, background: '#263D35', color: '#F8F6F1', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Save changes</button>
      </div>
    </>
  )
}
