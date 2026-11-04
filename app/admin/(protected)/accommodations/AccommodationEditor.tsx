'use client'

import { useState } from 'react'
import { AdminCard, fieldStyle, labelStyle, labelTextStyle } from '../components/AdminCard'
import { Trash2, Plus } from 'lucide-react'
import type { Category, Unit } from '@/content/seed'

interface Props {
  category: Category
  units: Unit[]
  houseRules: string[]
}

export default function AccommodationEditor({ category, units: initUnits, houseRules: initRules }: Props) {
  const [cat, setCat] = useState(category)
  const [units, setUnits] = useState(initUnits)
  const [rules, setRules] = useState(initRules)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    // In Phase 3 with DB: POST to /api/admin/accommodations
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const statusColors: Record<string, string> = {
    Active: '#E6ECE3',
    Inactive: '#F3ECDD',
    Hidden: '#EEEBE5',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Core details */}
      <AdminCard title="Category details" desc="Name, copy and guest capacity shown on the accommodation pages.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: '16px 18px' }}>
          {[
            { label: 'Category name', key: 'name' as const },
            { label: 'Short description', key: 'short' as const },
            { label: 'Bedrooms', key: 'bedrooms' as const },
            { label: 'Bathrooms', key: 'bathrooms' as const },
          ].map(f => (
            <label key={f.key} style={labelStyle}>
              <span style={labelTextStyle}>{f.label}</span>
              <input
                value={cat[f.key] as string}
                onChange={e => setCat(c => ({ ...c, [f.key]: e.target.value }))}
                style={fieldStyle}
              />
            </label>
          ))}
          <label style={{ ...labelStyle, gridColumn: 'span 2' }}>
            <span style={labelTextStyle}>Full description</span>
            <textarea
              rows={4}
              value={cat.description}
              onChange={e => setCat(c => ({ ...c, description: e.target.value }))}
              style={{ ...fieldStyle, resize: 'vertical' }}
            />
          </label>
        </div>
      </AdminCard>

      {/* Units table */}
      <AdminCard title="Units" desc={`${units.length} unit${units.length !== 1 ? 's' : ''} in this category.`}>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 540 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.7fr 1fr 44px', gap: 12, padding: '8px 0 10px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6A65' }}>
              <span>Unit name</span><span>Max guests</span><span>Status</span><span />
            </div>
            {units.map((u, i) => (
              <div key={u.id} style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.7fr 1fr 44px', gap: 12, alignItems: 'center', padding: '8px 0', borderTop: '1px solid #F1EEE7' }}>
                <input value={u.name} onChange={e => setUnits(arr => arr.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} aria-label="Unit name" style={fieldStyle} />
                <input type="number" min={1} value={u.maxGuests} onChange={e => setUnits(arr => arr.map((x, j) => j === i ? { ...x, maxGuests: Number(e.target.value) } : x))} aria-label="Max guests" style={fieldStyle} />
                <select value={u.status} onChange={e => setUnits(arr => arr.map((x, j) => j === i ? { ...x, status: e.target.value as Unit['status'] } : x))} aria-label="Status" style={{ ...fieldStyle, background: statusColors[u.status] ?? '#FFFFFF' }}>
                  <option>Active</option><option>Inactive</option><option>Hidden</option>
                </select>
                <button onClick={() => setUnits(arr => arr.filter((_, j) => j !== i))} aria-label="Remove unit" style={{ width: 36, height: 36, border: '1px solid #EAD9D4', borderRadius: 8, background: '#FFFFFF', color: '#A3412F', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => setUnits(arr => [...arr, { id: `${cat.slug}-${arr.length + 1}`, category: cat.slug, name: `${cat.name.replace('Serava ', '')} ${arr.length + 1}`, maxGuests: cat.maxGuests, status: 'Active' }])}
          style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', border: '1px solid #DDD9D0', borderRadius: 10, background: '#FFFFFF', color: '#263D35', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
        >
          <Plus size={14} /> Add unit
        </button>
      </AdminCard>

      {/* House rules */}
      <AdminCard title="House rules" desc="Shared across all accommodation detail pages.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {rules.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <input value={r} onChange={e => setRules(arr => arr.map((x, j) => j === i ? e.target.value : x))} aria-label="House rule" style={{ ...fieldStyle, flex: 1 }} />
              <button onClick={() => setRules(arr => arr.filter((_, j) => j !== i))} aria-label="Remove rule" style={{ width: 36, height: 36, flexShrink: 0, border: '1px solid #EAD9D4', borderRadius: 8, background: '#FFFFFF', color: '#A3412F', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => setRules(arr => [...arr, ''])} style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', border: '1px solid #DDD9D0', borderRadius: 10, background: '#FFFFFF', color: '#263D35', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          <Plus size={14} /> Add rule
        </button>
      </AdminCard>

      {/* Save bar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        {saved && <span style={{ display: 'flex', alignItems: 'center', fontSize: 13, color: '#5E6F58' }}>✓ Changes noted — connect a database to persist them.</span>}
        <button onClick={handleSave} style={{ padding: '11px 22px', border: 'none', borderRadius: 10, background: '#263D35', color: '#F8F6F1', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          Save changes
        </button>
      </div>
    </div>
  )
}
