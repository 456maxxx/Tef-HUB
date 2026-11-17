'use client'

import { useEffect, useState } from 'react'

export type SessionUser = { name: string } | null

/** undefined = carregando · null = ninguém logado · objeto = logado */
export function useSession() {
  const [user, setUser] = useState<SessionUser | undefined>(undefined)

  useEffect(() => {
    let alive = true
    fetch('/sessao', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => alive && setUser(data.user ?? null))
      .catch(() => alive && setUser(null))
    return () => {
      alive = false
    }
  }, [])

  return user
}
