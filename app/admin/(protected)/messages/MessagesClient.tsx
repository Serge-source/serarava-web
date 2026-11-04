'use client'

import { useState } from 'react'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: Date
}

function timeAgo(d: Date) {
  const diff = (Date.now() - new Date(d).getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const SAMPLE: Message[] = [
  { id: 's1', name: 'Anna de Vries', email: 'anna@example.com', subject: 'Villa availability in March', message: 'Hello, we are a family of eight looking at the Private Villa for the second week of March. Is it available?', read: false, createdAt: new Date(Date.now() - 86400000) },
  { id: 's2', name: 'Marcus Lee', email: 'marcus@example.com', subject: 'Studio for two', message: 'Hi, do your studios have a kitchenette? We are planning a 5-night stay in June.', read: true, createdAt: new Date(Date.now() - 3 * 86400000) },
]

export default function MessagesClient({ messages }: { messages: Message[] }) {
  const display = messages.length > 0 ? messages : SAMPLE
  const isSample = messages.length === 0
  const [selected, setSelected] = useState<Message | null>(display[0] ?? null)

  const rowStyle = (m: Message): React.CSSProperties => ({
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    gap: 12,
    padding: '14px 18px',
    border: 'none',
    borderBottom: '1px solid #F1EEE7',
    background: selected?.id === m.id ? '#F5F3EE' : '#FFFFFF',
    cursor: 'pointer',
  })

  return (
    <>
      {isSample && (
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 18px', borderRadius: 14, background: '#F3ECDD', border: '1px solid #E2D2AF', fontSize: 14 }}>
          <strong style={{ color: '#292929' }}>No messages yet.</strong>
          <span style={{ color: '#4A4A44' }}>Sample messages shown for reference. Connect email delivery in Integrations to receive real submissions.</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px,1fr) 2fr', gap: 16, alignItems: 'start' }}>
        <section style={{ background: '#FFFFFF', border: '1px solid #E4E1DA', borderRadius: 16, overflow: 'hidden' }}>
          {display.length === 0 && (
            <div style={{ padding: '24px 20px', color: '#6B6A65' }}>No messages yet.</div>
          )}
          {display.map(m => (
            <button key={m.id} onClick={() => setSelected(m)} style={rowStyle(m)}>
              <span style={{ width: 8, height: 8, marginTop: 6, flexShrink: 0, borderRadius: 9999, background: m.read ? 'transparent' : '#C5A875', border: m.read ? '1.5px solid #DDD9D0' : 'none' }} />
              <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontWeight: 700, color: '#292929' }}>{m.name}</span>
                  <span style={{ fontSize: 12, color: '#6B6A65', whiteSpace: 'nowrap' }}>{timeAgo(m.createdAt)}</span>
                </span>
                <span style={{ fontSize: 13, color: '#3A3A36', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.subject}</span>
                {isSample && <span style={{ alignSelf: 'flex-start', padding: '1px 7px', borderRadius: 9999, background: '#EEEBE5', fontSize: 10, fontWeight: 700, color: '#6B6A65' }}>SAMPLE</span>}
              </span>
            </button>
          ))}
        </section>

        {selected && (
          <section style={{ background: '#FFFFFF', border: '1px solid #E4E1DA', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#263D35' }}>{selected.subject}</span>
                <span style={{ color: '#6B6A65', fontSize: 13 }}>{selected.name} · {selected.email} · {timeAgo(selected.createdAt)}</span>
              </span>
              <a
                href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                style={{ padding: '8px 14px', borderRadius: 8, background: '#263D35', color: '#F8F6F1', fontSize: 13, fontWeight: 700, textDecoration: 'none', alignSelf: 'flex-start' }}
              >
                Reply
              </a>
            </div>
            <p style={{ margin: 0, paddingTop: 16, borderTop: '1px solid #EEEBE5', fontSize: 15, lineHeight: 1.7, color: '#292929', whiteSpace: 'pre-wrap' }}>
              {selected.message}
            </p>
          </section>
        )}
      </div>
    </>
  )
}
