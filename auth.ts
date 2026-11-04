import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

if (!process.env.AUTH_SECRET) {
  console.error('[auth] AUTH_SECRET is not set — NextAuth will fail')
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string; id?: string }).role = token.role as string
        ;(session.user as { role?: string; id?: string }).id = token.id as string
      }
      return session
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        // When DATABASE_URL is configured and prisma is generated, check DB.
        if (process.env.DATABASE_URL) {
          try {
            const { db } = await import('@/lib/db')
            const user = await db.user.findUnique({
              where: { email: parsed.data.email },
            })
            if (!user || user.status !== 'Active') return null
            const bcrypt = (await import('bcryptjs')).default
            const ok = await bcrypt.compare(parsed.data.password, user.password)
            if (!ok) return null
            return { id: user.id, name: user.name, email: user.email, role: user.role }
          } catch {
            // DB not ready — fall through to env fallback
          }
        }

        // Env-var fallback for initial setup / dev without a DB.
        const ownerEmail = process.env.SEED_OWNER_EMAIL
        const ownerPass = process.env.SEED_OWNER_PASSWORD
        if (
          ownerEmail &&
          ownerPass &&
          parsed.data.email === ownerEmail &&
          parsed.data.password === ownerPass
        ) {
          return { id: 'env-owner', name: process.env.SEED_OWNER_NAME ?? 'Owner', email: ownerEmail, role: 'Owner' }
        }

        return null
      },
    }),
  ],
})
