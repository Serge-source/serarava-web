'use client'

import { useState } from 'react'
import { AdminPageHeader, fieldStyle } from '../components/AdminCard'
import { Trash2, Plus } from 'lucide-react'
import { explore as seedExplore } from '@/content/seed'
import type { ExploreEntry } from '@/content/seed'

const CAT_OPTIONS = ['Beaches', 'Dining', 'Shopping', 'Activities', 'Attractions', 'Nature']

export default function ExplorePage() {
  const [rows, setRows] = useState<ExploreEntry[]>(seedExplore)
  const [saved, setSaved] = useState(false)

  return (
    <>
      <AdminPageHeader title="Explore Aruba" desc="Guide entries shown on the Explore Aruba page, grouped by category." />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => setRows(arr => [...arr, { key: `entry-${arr.length + 1}`, cat: 'Beaches', title: '', text: '' }])}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 14px', border: 'none', borderRadius: 10, background: '#263D35', color: '#F8F6F1', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
        >
          <Plus size={14} /> Add guide entry
        </button>
      </div>

      {rows.map((e, i) => (
        <section key={e.key} style={{ background: '#FFFFFF', border: '1px solid #E4E1DA', borderRadius: 16, padding: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: 16, alignItems: 'start' }}>
          <div style={{ height: 150, borderRadius: 12, background: '#E8DDCC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#7A6236', fontWeight: 700 }}>
            Photo placeholder
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, gridColumn: 'span 2', minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <select
                value={e.cat}
                onChange={ev => setRows(arr => arr.map((x, j) => j === i ? { ...x, cat: ev.target.value } : x))}
                aria-label="Category"
                style={{ ...fieldStyle, width: 'auto' }}
              >
                {CAT_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input
                value={e.title}
                onChange={ev => setRows(arr => arr.map((x, j) => j === i ? { ...x, title: ev.target.value } : x))}
                aria-label="Title"
                placeholder="Title"
                style={{ ...fieldStyle, flex: 1, minWidth: 160, fontWeight: 700 }}
              />
              <button
                onClick={() => setRows(arr => arr.filter((_, j) => j !== i))}
                aria-label="Remove entry"
                style={{ width: 38, height: 38, border: '1px solid #EAD9D4', borderRadius: 8, background: '#FFFFFF', color: '#A3412F', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Trash2 size={14} />
              </button>
            </div>
            <textarea
              rows={2}
              value={e.text}
              onChange={ev => setRows(arr => arr.map((x, j) => j === i ? { ...x, text: ev.target.value } : x))}
              aria-label="Description"
              placeholder="Short description"
              style={{ ...fieldStyle, resize: 'vertical' }}
            />
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
