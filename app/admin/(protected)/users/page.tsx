import { AdminPageHeader } from '../components/AdminCard'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import UsersClient from './UsersClient'
import { adminUsers } from '@/content/seed'

export const metadata = { title: 'Users & Roles | Serava Admin' }

async function getUsers() {
  if (!process.env.DATABASE_URL) return adminUsers
  try {
    const { db } = await import('@/lib/db')
    const users = await db.user.findMany({ orderBy: { createdAt: 'asc' } })
    return users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role, status: u.status }))
  } catch {
    return adminUsers
  }
}

export default async function UsersPage() {
  const session = await auth()
  const role = (session?.user as { role?: string })?.role
  if (role !== 'Owner') redirect('/admin')

  const users = await getUsers()

  return (
    <>
      <AdminPageHeader title="Users & Roles" desc="Manage who can access the admin and what they can do." />
      <UsersClient users={users as Array<{ id: string; name: string; email: string; role: string; status: string }>} />
    </>
  )
}
