import type { Metadata } from 'next'
import { Suspense } from 'react'
import { connection } from 'next/server'

export const metadata: Metadata = {
  title: 'Admin Login | Serava Retreats',
  robots: { index: false, follow: false },
}

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  await connection()
  return <Suspense>{children}</Suspense>
}
