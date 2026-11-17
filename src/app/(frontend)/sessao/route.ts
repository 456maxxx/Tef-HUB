import { NextResponse } from 'next/server'
import { appAuth } from '@/lib/app-auth'

export const dynamic = 'force-dynamic'

/** Diz ao navegador se há alguém logado, sem tornar as páginas públicas dinâmicas. */
export async function GET() {
  const user = await appAuth.currentUser()
  return NextResponse.json(
    { user: user ? { name: user.name || 'Viajante' } : null },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
