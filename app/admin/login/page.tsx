'use client'

import { useState, useTransition } from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export default function AdminLoginPage() {
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl') ?? '/admin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      })
      console.log('[login] signIn result:', JSON.stringify(res))
      if (res?.error) {
        setError('Invalid email or password.')
      } else {
        window.location.href = callbackUrl
      }
    })
  }

  const field = {
    padding: '11px 14px',
    border: '1px solid #DDD9D0',
    borderRadius: 10,
    background: '#FFFFFF',
    fontSize: 15,
    color: '#292929',
    outline: 'none',
    width: '100%',
    fontFamily: 'inherit',
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F4F3EF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        fontFamily: "'Lato', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          background: '#FFFFFF',
          borderRadius: 20,
          border: '1px solid #E4E1DA',
          padding: '40px 36px',
          boxShadow: '0 20px 60px -24px rgba(38,61,53,0.18)',
        }}
      >
        <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: '#263D35' }}>
            Serava
          </span>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', color: '#7A6236' }}>
            ADMIN
          </span>
        </div>

        <h1 style={{ margin: '0 0 24px', fontSize: 20, fontWeight: 700, color: '#263D35' }}>
          Sign in
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#3A3A36' }}>Email</span>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={field}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#3A3A36' }}>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={field}
            />
          </label>

          {error && (
            <div
              role="alert"
              style={{
                padding: '10px 14px',
                borderRadius: 10,
                background: '#F6E3DE',
                border: '1px solid #E2B8B0',
                fontSize: 14,
                color: '#A3412F',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            style={{
              marginTop: 4,
              padding: '13px 20px',
              border: 'none',
              borderRadius: 10,
              background: pending ? '#82947C' : '#263D35',
              color: '#F8F6F1',
              fontSize: 15,
              fontWeight: 700,
              cursor: pending ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              transition: 'background .2s',
            }}
          >
            {pending ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
