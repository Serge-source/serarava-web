'use client'

import { useState } from 'react'
import { AdminPageHeader, fieldStyle } from '../components/AdminCard'
import { Trash2, Plus } from 'lucide-react'
import { gallery as seedGallery, galleryCats } from '@/content/seed'
import type { GalleryItem } from '@/content/seed'

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(seedGallery)
  const [saved, setSaved] = useState(false)

  return (
    <>
      <AdminPageHeader title="Gallery" desc="Photos shown on the gallery page. Drop an image on any tile to update it." />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ color: '#6B6A65' }}>{items.length} photo{items.length !== 1 ? 's' : ''} · Replace placeholder images with real photos once available.</span>
        <button
          onClick={() => setItems(arr => [...arr, { id: `g-new-${arr.length + 1}`, cat: 'Property', caption: '' }])}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 14px', border: 'none', borderRadius: 10, background: '#263D35', color: '#F8F6F1', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
        >
          <Plus size={14} /> Add photo
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
        {items.map((g, i) => (
          <div key={g.id} style={{ background: '#FFFFFF', border: '1px solid #E4E1DA', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: 160, background: '#E8DDCC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#7A6236', fontWeight: 700 }}>
              {g.caption || 'Photo placeholder'}
            </div>
            <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input
                value={g.caption}
                onChange={e => setItems(arr => arr.map((x, j) => j === i ? { ...x, caption: e.target.value } : x))}
                aria-label="Caption"
                placeholder="Caption"
                style={fieldStyle}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <select
                  value={g.cat}
                  onChange={e => setItems(arr => arr.map((x, j) => j === i ? { ...x, cat: e.target.value } : x))}
                  aria-label="Category"
                  style={{ ...fieldStyle, flex: 1 }}
                >
                  {galleryCats.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <button
                  onClick={() => setItems(arr => arr.filter((_, j) => j !== i))}
                  aria-label="Remove photo"
                  style={{ width: 36, height: 36, flexShrink: 0, border: '1px solid #EAD9D4', borderRadius: 8, background: '#FFFFFF', color: '#A3412F', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        {saved && <span style={{ display: 'flex', alignItems: 'center', fontSize: 13, color: '#5E6F58' }}>✓ Changes noted — connect a database to persist them.</span>}
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500) }} style={{ padding: '11px 22px', border: 'none', borderRadius: 10, background: '#263D35', color: '#F8F6F1', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Save changes</button>
      </div>
    </>
  )
}
