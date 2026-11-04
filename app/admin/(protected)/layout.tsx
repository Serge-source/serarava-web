import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { connection } from 'next/server'
import { auth } from '@/auth'
import AdminShell from './AdminShell'

export const metadata: Metadata = {
  title: 'Admin | Serava Retreats',
  robots: { index: false, follow: false },
}

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  await connection()
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  return (
    <AdminShell user={session.user as { name?: string | null; email?: string | null; role?: string }}>
      {children}
    </AdminShell>
  )
}
