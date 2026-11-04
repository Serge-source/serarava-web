'use client'

import { useState } from 'react'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
  website: string // honeypot
}

type Status = null | 'sending' | 'sent' | 'error' | 'unconnected' | 'ratelimit'

type VisibleFields = Omit<FormState, 'website'>

function validate(f: FormState): Partial<VisibleFields> {
  const e: Partial<VisibleFields> = {}
  if (!f.name.trim()) e.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Please enter a valid email address.'
  if (!f.subject.trim()) e.subject = 'Please add a subject.'
  if (f.message.trim().length < 10) e.message = 'Please write a message of at least 10 characters.'
  return e
}

const notices: Record<string, { text: string; bg: string; border: string }> = {
  unconnected: {
    text: 'This form is not yet connected to a delivery service, so your message has not been sent. Please email or call us directly in the meantime.',
    bg: '#F3ECDD',
    border: '#C5A875',
  },
  sent: {
    text: 'Thank you. Your message has been sent and we will reply as soon as possible.',
    bg: '#E6ECE3',
    border: '#82947C',
  },
  error: {
    text: 'Something went wrong sending your message. Please try again or email us directly.',
    bg: '#F6E3DE',
    border: '#A3412F',
  },
  ratelimit: {
    text: 'Too many submissions. Please wait a few minutes before trying again.',
    bg: '#F3ECDD',
    border: '#C5A875',
  },
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '', website: '' })
  const [errors, setErrors] = useState<Partial<VisibleFields>>({})
  const [tried, setTried] = useState(false)
  const [status, setStatus] = useState<Status>(null)

  function set(key: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const updated = { ...form, [key]: e.target.value }
      setForm(updated)
      if (tried) setErrors(validate(updated))
      setStatus(null)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    setTried(true)
    setErrors(errs)
    if (Object.keys(errs).length) return

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', message: '', website: '' })
        setTried(false)
      } else if (res.status === 429) {
        setStatus('ratelimit')
      } else {
        setStatus('error')
      }
    } catch {
      // If no API route yet, show unconnected message
      setStatus('unconnected')
    }
  }

  const fieldStyle = (key: keyof FormState) => ({
    padding: '14px 16px',
    borderRadius: 14,
    border: `1px solid ${errors[key] ? '#A3412F' : 'rgba(38,61,53,0.18)'}`,
    background: '#F8F6F1',
    fontSize: 15,
    color: '#292929',
    outline: 'none',
    width: '100%',
    fontFamily: 'inherit',
    resize: 'vertical' as const,
  })

  const notice = status && status !== 'sending' ? notices[status] : null

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        gridColumn: 'span 2',
        minWidth: 0,
        background: '#FFFFFF',
        borderRadius: 24,
        padding: 'clamp(24px, 4vw, 44px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        boxShadow: '0 24px 50px -36px rgba(38,61,53,0.45)',
      }}
    >
      {/* Honeypot — hidden from real users */}
      <input
        name="website"
        type="text"
        tabIndex={-1}
        aria-hidden="true"
        value={form.website}
        onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
        style={{ position: 'absolute', left: '-9999px' }}
        autoComplete="off"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
        {(['name', 'email'] as const).map(key => (
          <label key={key} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#263D35' }}>
              {key === 'name' ? 'Name' : 'Email'}
            </span>
            <input
              name={key}
              type={key === 'email' ? 'email' : 'text'}
              autoComplete={key}
              value={form[key]}
              onChange={set(key)}
              aria-invalid={errors[key] ? 'true' : 'false'}
              style={fieldStyle(key)}
            />
            {errors[key] && (
              <span role="alert" style={{ fontSize: 13, color: '#A3412F' }}>{errors[key]}</span>
            )}
          </label>
        ))}
      </div>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#263D35' }}>Subject</span>
        <input
          name="subject"
          value={form.subject}
          onChange={set('subject')}
          aria-invalid={errors.subject ? 'true' : 'false'}
          style={fieldStyle('subject')}
        />
        {errors.subject && <span role="alert" style={{ fontSize: 13, color: '#A3412F' }}>{errors.subject}</span>}
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#263D35' }}>Message</span>
        <textarea
          name="message"
          rows={6}
          value={form.message}
          onChange={set('message')}
          aria-invalid={errors.message ? 'true' : 'false'}
          style={fieldStyle('message')}
        />
        {errors.message && <span role="alert" style={{ fontSize: 13, color: '#A3412F' }}>{errors.message}</span>}
      </label>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
        <button
          type="submit"
          disabled={status === 'sending'}
          style={{
            padding: '15px 30px',
            border: 'none',
            borderRadius: 9999,
            background: status === 'sending' ? '#82947C' : '#263D35',
            color: '#F8F6F1',
            fontSize: 15,
            fontWeight: 700,
            cursor: status === 'sending' ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            transition: 'background .2s',
          }}
        >
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
      </div>

      {notice && (
        <div
          role="status"
          style={{ padding: '16px 18px', borderRadius: 14, background: notice.bg, border: `1px solid ${notice.border}`, fontSize: 14, lineHeight: 1.6, color: '#292929' }}
        >
          {notice.text}
        </div>
      )}
    </form>
  )
}
