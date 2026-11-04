'use client'

import { useState } from 'react'
import { AdminCard } from '../components/AdminCard'
import { Trash2 } from 'lucide-react'

interface User { id: string; name: string; email: string; role: string; status: string }

const statusColors: Record<string, { bg: string; fg: string }> = {
  Active: { bg: '#E6ECE3', fg: '#2E5D36' },
  Invited: { bg: '#F3ECDD', fg: '#6B5530' },
  Suspended: { bg: '#F6E3DE', fg: '#A3412F' },
}

const PERM_ROWS = [
  { label: 'Dashboard & messages', o: '✓', m: '✓', s: '✓' },
  { label: 'Accommodations & units', o: '✓', m: '✓', s: 'View only' },
  { label: 'Amenities & gallery', o: '✓', m: '✓', s: 'View only' },
  { label: 'Page copy & SEO', o: '✓', m: '✓', s: '—' },
  { label: 'Integrations', o: '✓', m: '—', s: '—' },
  { label: 'Users & roles', o: '✓', m: '—', s: '—' },
]

export default function UsersClient({ users: initUsers }: { users: User[] }) {
  const [users, setUsers] = useState(initUsers)
  const [inv, setInv] = useState({ name: '', email: '', role: 'Staff' })
  const [saved, setSaved] = useState(false)

  function handleInvite(e: React.FormEvent) {
    e.preventDefault()
    if (!inv.name || !inv.email) return
    setUsers(arr => [...arr, { id: `inv-${Date.now()}`, ...inv, status: 'Invited' }])
    setInv({ name: '', email: '', role: 'Staff' })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const f: React.CSSProperties = { padding: '9px 12px', border: '1px solid #DDD9D0', borderRadius: 8, fontSize: 14, background: '#FFFFFF', fontFamily: 'inherit' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <AdminCard title="Team members">
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 640 }}>
            {users.map(u => {
              const sc = statusColors[u.status] ?? { bg: '#EEEBE5', fg: '#292929' }
              const isOwner = u.role === 'Owner'
              return (
                <div key={u.id} style={{ display: 'grid', gridTemplateColumns: '40px 1.4fr 1.6fr 140px 100px 44px', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F1EEE7' }}>
                  <span style={{ width: 36, height: 36, borderRadius: 9999, background: '#E8DDCC', color: '#263D35', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                    {u.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
                  </span>
                  <span style={{ fontWeight: 700 }}>{u.name}</span>
                  <span style={{ color: '#55554F', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.email}</span>
                  <select
                    value={u.role}
                    onChange={e => setUsers(arr => arr.map(x => x.id === u.id ? { ...x, role: e.target.value } : x))}
                    disabled={isOwner}
                    aria-label="Role"
                    style={{ ...f, opacity: isOwner ? 0.6 : 1 }}
                  >
                    <option>Owner</option><option>Manager</option><option>Staff</option>
                  </select>
                  <span style={{ justifySelf: 'start', padding: '3px 9px', borderRadius: 9999, background: sc.bg, color: sc.fg, fontSize: 11, fontWeight: 700 }}>
                    {u.status}
                  </span>
                  {!isOwner && (
                    <button onClick={() => setUsers(arr => arr.filter(x => x.id !== u.id))} aria-label="Remove user" style={{ width: 36, height: 36, border: '1px solid #EAD9D4', borderRadius: 8, background: '#FFFFFF', color: '#A3412F', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Invite form */}
        <form onSubmit={handleInvite} style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #EEEBE5', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end', background: '#FAF9F6', padding: 16, borderRadius: 10 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 150 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Name</span>
            <input value={inv.name} onChange={e => setInv(i => ({ ...i, name: e.target.value }))} required style={f} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1.4, minWidth: 200 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Email</span>
            <input type="email" value={inv.email} onChange={e => setInv(i => ({ ...i, email: e.target.value }))} required style={f} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 130 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Role</span>
            <select value={inv.role} onChange={e => setInv(i => ({ ...i, role: e.target.value }))} style={f}>
              <option>Manager</option><option>Staff</option>
            </select>
          </label>
          <button type="submit" style={{ padding: '10px 16px', border: 'none', borderRadius: 10, background: '#263D35', color: '#F8F6F1', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Add member
          </button>
        </form>
        {saved && <p style={{ margin: '8px 0 0', fontSize: 13, color: '#5E6F58' }}>✓ Member added — connect a database to persist team changes.</p>}
      </AdminCard>

      {/* Role permissions table */}
      <AdminCard title="Role permissions">
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 480 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '8px 0 10px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6A65' }}>
              <span>Area</span><span>Owner</span><span>Manager</span><span>Staff</span>
            </div>
            {PERM_ROWS.map(p => (
              <div key={p.label} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '10px 0', borderTop: '1px solid #F1EEE7', fontSize: 14 }}>
                <span style={{ fontWeight: 700 }}>{p.label}</span>
                <span style={{ color: p.o === '✓' ? '#5E6F58' : '#A3412F' }}>{p.o}</span>
                <span style={{ color: p.m === '✓' ? '#5E6F58' : '#A3412F' }}>{p.m}</span>
                <span style={{ color: p.s === '✓' ? '#5E6F58' : '#8A8984' }}>{p.s}</span>
              </div>
            ))}
          </div>
        </div>
      </AdminCard>
    </div>
  )
}
