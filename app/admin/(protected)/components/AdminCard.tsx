export function AdminCard({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section style={{ background: '#FFFFFF', border: '1px solid #E4E1DA', borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ padding: '18px 20px', borderBottom: '1px solid #EEEBE5', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#263D35' }}>{title}</span>
        {desc && <span style={{ fontSize: 13, color: '#6B6A65' }}>{desc}</span>}
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </section>
  )
}

export function AdminPageHeader({ title, desc }: { title: string; desc?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 4 }}>
      <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#263D35' }}>{title}</h1>
      {desc && <span style={{ fontSize: 13, color: '#6B6A65' }}>{desc}</span>}
    </div>
  )
}

export const fieldStyle: React.CSSProperties = {
  padding: '10px 12px',
  border: '1px solid #DDD9D0',
  borderRadius: 10,
  background: '#FFFFFF',
  fontSize: 14,
  color: '#292929',
  outline: 'none',
  width: '100%',
  fontFamily: 'inherit',
}

export const labelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
}

export const labelTextStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  color: '#3A3A36',
}
