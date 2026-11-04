import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendContactNotification } from '@/lib/email'
import { integrations } from '@/content/seed'

// In-memory rate limiter: max 3 submissions per IP per 10 minutes.
// Resets on server restart — good enough for a low-traffic contact form.
const rateMap = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 3

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= MAX_PER_WINDOW) return false
  entry.count++
  return true
}

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  website: z.string().max(0, 'Bot detected'), // honeypot — must be empty
})

export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a few minutes before trying again.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const { name, email, subject, message } = parsed.data

  // Persist to DB if Prisma is available (DATABASE_URL set + prisma generate run)
  if (process.env.DATABASE_URL) {
    try {
      const { db } = await import('@/lib/db')
      await db.message.create({ data: { name, email, subject, message } })
    } catch (err) {
      console.error('[contact] DB write failed:', err)
      // Don't fail the request — email delivery is the primary path
    }
  }

  // Send notification email if a destination is configured
  const notifyEmail = process.env.NOTIFY_EMAIL || integrations.notifyEmail
  if (notifyEmail) {
    try {
      await sendContactNotification({ name, email, subject, message, notifyEmail })
    } catch (err) {
      console.error('[contact] Email delivery failed:', err)
      return NextResponse.json({ error: 'Message saved but email notification failed.' }, { status: 500 })
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
