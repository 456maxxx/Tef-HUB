'use client'

import Link from 'next/link'
import { User } from '@/components/Icons'
import { useSession } from '@/components/useSession'

const pill =
  'flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white hover:text-[#12382f]'

export function HeaderAccount() {
  const user = useSession()

  if (user) {
    return (
      <Link href="/perfil" className={pill} aria-label="Meu perfil">
        <User className="size-4" />
        <span className="hidden max-w-32 truncate sm:inline">{user.name.split(' ')[0]}</span>
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/cadastro" className="hidden px-3 py-2 text-sm font-semibold text-white/80 hover:text-white lg:inline">
        Criar conta
      </Link>
      <Link href="/login" className={pill}>
        <User className="size-4" />
        <span className="hidden sm:inline">Entrar</span>
      </Link>
    </div>
  )
}
