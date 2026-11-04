import { AdminPageHeader } from '../components/AdminCard'
import { Calendar } from 'lucide-react'

export const metadata = { title: 'Booking | Serava Admin' }

const FUTURE_MODULES = [
  { label: 'Availability calendar', desc: 'Block dates, set minimum stays and configure seasonal rules.' },
  { label: 'Reservation management', desc: 'View, confirm and manage guest reservations.' },
  { label: 'Pricing & rates', desc: 'Set nightly rates, seasonal pricing and discount rules.' },
  { label: 'Guest communication', desc: 'Automated confirmation and pre-arrival emails.' },
  { label: 'Channel manager', desc: 'Sync availability with Airbnb, Booking.com and others.' },
  { label: 'Payments', desc: 'Accept deposits and payments via Stripe or similar.' },
]

export default function BookingAdminPage() {
  return (
    <>
      <AdminPageHeader title="Booking" desc="Reservation and availability management — coming in a future phase." />

      <div style={{ background: '#F3ECDD', border: '1px solid #E2D2AF', borderRadius: 14, padding: '16px 18px', display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 14 }}>
        <Calendar size={16} style={{ color: '#6B5530', flexShrink: 0, marginTop: 2 }} />
        <span style={{ lineHeight: 1.6, color: '#4A4A44' }}>
          <strong style={{ color: '#292929' }}>Placeholder mode.</strong> The <code>/booking</code> page shows a message and two buttons only. Reservations, availability, pricing and payments are not active.
        </span>
      </div>

      <section style={{ background: '#FFFFFF', border: '1px solid #E4E1DA', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid #EEEBE5', display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#263D35' }}>Reservation modules</span>
          <span style={{ fontSize: 13, color: '#6B6A65' }}>Reserved for the next phase. These can be enabled once a booking engine is integrated.</span>
        </div>
        {FUTURE_MODULES.map(m => (
          <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: '1px solid #F1EEE7' }}>
            <span style={{ display: 'flex', color: '#8A8984' }}><Calendar size={16} /></span>
            <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontWeight: 700, color: '#55554F' }}>{m.label}</span>
              <span style={{ fontSize: 12, color: '#6B6A65' }}>{m.desc}</span>
            </span>
            <span style={{ padding: '3px 9px', borderRadius: 9999, background: '#F3ECDD', color: '#6B5530', fontSize: 11, fontWeight: 700 }}>Coming soon</span>
          </div>
        ))}
      </section>
    </>
  )
}
