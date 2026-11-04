interface ContactEmailPayload {
  name: string
  email: string
  subject: string
  message: string
  notifyEmail: string
}

export async function sendContactNotification(p: ContactEmailPayload): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY
  const smtpHost = process.env.SMTP_HOST

  const html = `
    <p><strong>From:</strong> ${p.name} &lt;${p.email}&gt;</p>
    <p><strong>Subject:</strong> ${p.subject}</p>
    <hr />
    <p>${p.message.replace(/\n/g, '<br />')}</p>
  `
  const text = `From: ${p.name} <${p.email}>\nSubject: ${p.subject}\n\n${p.message}`

  if (resendKey) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Serava Retreats Website <noreply@seravaretreats.com>',
        to: [p.notifyEmail],
        reply_to: p.email,
        subject: `Contact form: ${p.subject}`,
        html,
        text,
      }),
    })
    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Resend error ${res.status}: ${body}`)
    }
    return
  }

  // SMTP path: install `nodemailer`, add it to serverExternalPackages in next.config,
  // and set SMTP_HOST + SMTP_PORT + SMTP_USER + SMTP_PASS + SMTP_FROM in .env.
  // For now Resend is the only bundled adapter.
  if (smtpHost) {
    console.warn('[email] SMTP_HOST is set but nodemailer is not installed. Add nodemailer to dependencies and configure serverExternalPackages to enable SMTP delivery.')
    return
  }

  // No delivery adapter configured — log to stdout in dev, silently skip in prod.
  if (process.env.NODE_ENV !== 'production') {
    console.log('[email] No delivery adapter configured. Message payload:', p)
  }
}
