import { describe, it, expect } from 'vitest'
import { z } from 'zod'

// Mirror the schema from app/api/contact/route.ts
const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(10).max(5000),
  website: z.string().max(0), // honeypot: must be empty
})

describe('contact form validation', () => {
  const valid = {
    name: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Availability inquiry',
    message: 'Hello, I am looking to book a studio for two weeks in March.',
    website: '',
  }

  it('accepts a valid payload', () => {
    expect(() => contactSchema.parse(valid)).not.toThrow()
  })

  it('rejects empty name', () => {
    expect(() => contactSchema.parse({ ...valid, name: '' })).toThrow()
  })

  it('rejects name longer than 120 chars', () => {
    expect(() => contactSchema.parse({ ...valid, name: 'A'.repeat(121) })).toThrow()
  })

  it('rejects invalid email', () => {
    expect(() => contactSchema.parse({ ...valid, email: 'not-an-email' })).toThrow()
  })

  it('rejects empty subject', () => {
    expect(() => contactSchema.parse({ ...valid, subject: '' })).toThrow()
  })

  it('rejects message shorter than 10 chars', () => {
    expect(() => contactSchema.parse({ ...valid, message: 'Short' })).toThrow()
  })

  it('rejects message longer than 5000 chars', () => {
    expect(() => contactSchema.parse({ ...valid, message: 'A'.repeat(5001) })).toThrow()
  })

  it('rejects filled honeypot (bot detected)', () => {
    expect(() => contactSchema.parse({ ...valid, website: 'http://spam.com' })).toThrow()
  })

  it('accepts message of exactly 10 chars', () => {
    expect(() => contactSchema.parse({ ...valid, message: '1234567890' })).not.toThrow()
  })
})
