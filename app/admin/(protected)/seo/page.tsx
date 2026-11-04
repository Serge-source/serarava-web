'use client'

import { useState } from 'react'
import { AdminPageHeader, fieldStyle, labelStyle, labelTextStyle } from '../components/AdminCard'
import { seo as seedSeo } from '@/content/seed'
import type { SeoEntry } from '@/content/seed'

function charColor(len: number, min: number, max: number) {
  if (len < min) return '#A3412F'
  if (len > max) return '#A3412F'
  return '#5E6F58'
}

export default function SeoPage() {
  const [rows, setRows] = useState<SeoEntry[]>(seedSeo)
  const [saved, setSaved] = useState(false)

  return (
    <>
      <AdminPageHeader title="SEO" desc="Page titles and meta descriptions for all public routes." />

      {rows.map((s, i) => (
        <section key={s.key} style={{ background: '#FFFFFF', border: '1px solid #E4E1DA', borderRadius: 16, padding: '18px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <span style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#263D35' }}>
                {s.route === '/' ? 'Home' : s.route.replace('/','').replace(/-/g,' ').replace(/^./,c=>c.toUpperCase())}
              </span>
              <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 12, color: '#6B6A65' }}>{s.route}</span>
            </span>

            <label style={labelStyle}>
              <span style={{ display: 'flex', justifyContent: 'space-between', ...labelTextStyle as object }}>
                Page title
                <span style={{ fontWeight: 400, color: charColor(s.title.length, 30, 60) }}>{s.title.length}/60</span>
              </span>
              <input
                value={s.title}
                onChange={e => setRows(arr => arr.map((x, j) => j === i ? { ...x, title: e.target.value } : x))}
                style={fieldStyle}
              />
            </label>

            <label style={labelStyle}>
              <span style={{ display: 'flex', justifyContent: 'space-between', ...labelTextStyle as object }}>
                Meta description
                <span style={{ fontWeight: 400, color: charColor(s.description.length, 100, 160) }}>{s.description.length}/160</span>
              </span>
              <textarea
                rows={2}
                value={s.description}
                onChange={e => setRows(arr => arr.map((x, j) => j === i ? { ...x, description: e.target.value } : x))}
                style={{ ...fieldStyle, resize: 'vertical' }}
              />
            </label>
          </div>

          {/* Search preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 16, borderRadius: 12, background: '#FAF9F6', border: '1px solid #EEEBE5', alignSelf: 'start' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8A8984' }}>Search preview</span>
            <span style={{ fontSize: 12, color: '#5E6F58' }}>seravaretreats.com{s.route}</span>
            <span style={{ fontSize: 17, color: '#1a0dab', lineHeight: 1.3 }}>{s.title || '—'}</span>
            <span style={{ fontSize: 13, color: '#55554F', lineHeight: 1.5 }}>{s.description || '—'}</span>
          </div>
        </section>
      ))}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        {saved && <span style={{ display: 'flex', alignItems: 'center', fontSize: 13, color: '#5E6F58' }}>✓ Changes noted — connect a database to persist them.</span>}
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500) }} style={{ padding: '11px 22px', border: 'none', borderRadius: 10, background: '#263D35', color: '#F8F6F1', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Save changes</button>
      </div>
    </>
  )
}
