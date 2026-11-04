import { AdminPageHeader } from '../components/AdminCard'
import MessagesClient from './MessagesClient'

export const metadata = { title: 'Messages | Serava Admin' }

async function getMessages() {
  if (!process.env.DATABASE_URL) return []
  try {
    const { db } = await import('@/lib/db')
    return await db.message.findMany({ orderBy: { createdAt: 'desc' }, take: 100 })
  } catch {
    return []
  }
}

export default async function MessagesPage() {
  const messages = await getMessages()
  return (
    <>
      <AdminPageHeader title="Messages" desc="Contact form submissions from your website." />
      <MessagesClient messages={messages as Array<{ id: string; name: string; email: string; subject: string; message: string; read: boolean; createdAt: Date }> } />
    </>
  )
}
