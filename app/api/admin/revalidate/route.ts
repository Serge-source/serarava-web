import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'

const PUBLIC_PATHS = [
  '/',
  '/accommodations',
  '/accommodations/studios',
  '/accommodations/suites',
  '/accommodations/villa',
  '/amenities',
  '/gallery',
  '/explore-aruba',
  '/about',
  '/contact',
  '/booking',
]

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let paths: string[] = PUBLIC_PATHS
  try {
    const body = await req.json()
    if (Array.isArray(body.paths)) paths = body.paths
  } catch {
    // use default
  }

  for (const p of paths) {
    revalidatePath(p)
  }

  return NextResponse.json({ revalidated: paths })
}
