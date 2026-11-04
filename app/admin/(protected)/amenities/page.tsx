'use client'

import { useState } from 'react'
import { AdminCard, AdminPageHeader, fieldStyle, labelStyle, labelTextStyle } from '../components/AdminCard'
import { Trash2, Plus, ChevronUp, ChevronDown } from 'lucide-react'
import { amenities as seedAmenities } from '@/content/seed'
import type { Amenity } from '@/content/seed'

const ICON_OPTIONS = ['waves', 'dumbbell', 'wifi', 'car', 'wind', 'trees', 'umbrella', 'sun', 'coffee', 'utensils', 'tv', 'lock']

export default function AmenitiesPage() {
  const [rows, setRows] = useState<Amenity[]>(seedAmenities)
  const [saved, setSaved] = useState(false)

  function move(i: number, dir: -1 | 1) {
    setRows(arr => {
      const next = [...arr]
      ;[next[i], next[i + dir]] = [next[i + dir], next[i]]
      return next
    })
  }

  return (
    <>
      <AdminPageHeader title="Amenities" desc="Property amenities shown on the home page and accommodation detail pages." />
      <AdminCard title="Property amenities" desc="Drag to reorder. Changes shown immediately on the site once saved.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {rows.map((a, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 2fr auto', gap: 10, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1EEE7' }}>
              <select value={a.icon} onChange={e => setRows(arr => arr.map((x, j) => j === i ? { ...x, icon: e.target.value } : x))} aria-label="Icon" style={fieldStyle}>
                {ICON_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <input value={a.title} onChange={e => setRows(arr => arr.map((x, j) => j === i ? { ...x, title: e.target.value } : x))} aria-label="Title" style={fieldStyle} />
              <input value={a.text} onChange={e => setRows(arr => arr.map((x, j) => j === i ? { ...x, text: e.target.value } : x))} aria-label="Description" style={fieldStyle} />
              <span style={{ display: 'flex', gap: 4 }}>
                <button onClick={() => i > 0 && move(i, -1)} disabled={i === 0} aria-label="Move up" style={{ width: 32, height: 32, border: '1px solid #DDD9D0', borderRadius: 8, background: '#FFFFFF', cursor: 'pointer', color: '#263D35', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronUp size={13} /></button>
                <button onClick={() => i < rows.length - 1 && move(i, 1)} disabled={i === rows.length - 1} aria-label="Move down" style={{ width: 32, height: 32, border: '1px solid #DDD9D0', borderRadius: 8, background: '#FFFFFF', cursor: 'pointer', color: '#263D35', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronDown size={13} /></button>
                <button onClick={() => setRows(arr => arr.filter((_, j) => j !== i))} aria-label="Remove" style={{ width: 32, height: 32, border: '1px solid #EAD9D4', borderRadius: 8, background: '#FFFFFF', color: '#A3412F', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trash2 size={13} /></button>
              </span>
            </div>
          ))}
        </div>
        <button onClick={() => setRows(arr => [...arr, { icon: 'star', title: '', text: '' }])} style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', border: 'none', borderRadius: 10, background: '#263D35', color: '#F8F6F1', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          <Plus size={14} /> Add amenity
        </button>
      </AdminCard>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        {saved && <span style={{ display: 'flex', alignItems: 'center', fontSize: 13, color: '#5E6F58' }}>✓ Changes noted — connect a database to persist them.</span>}
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500) }} style={{ padding: '11px 22px', border: 'none', borderRadius: 10, background: '#263D35', color: '#F8F6F1', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Save changes</button>
      </div>
    </>
  )
}
