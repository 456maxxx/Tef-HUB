'use client'

import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  deleteReviewAction,
  updateNameAction,
  type ProfileState,
} from '@/app/(frontend)/actions/profile'

const initialState: ProfileState = { success: false, message: '' }

export function NameForm({ currentName }: { currentName: string }) {
  const [state, action, pending] = useActionState(updateNameAction, initialState)
  const [name, setName] = useState(currentName)
  const router = useRouter()

  useEffect(() => {
    if (state.success) router.refresh()
  }, [state, router])

  return (
    <form action={action} className="mt-4 space-y-3">
      <label className="block">
        <span className="form-label">Seu nome</span>
        <input
          className="form-input"
          name="name"
          required
          minLength={2}
          maxLength={80}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      {state.message && (
        <p className={`text-sm ${state.success ? 'text-emerald-700' : 'text-red-700'}`} role="status">
          {state.message}
        </p>
      )}
      <button className="primary-button flex" type="submit" disabled={pending}>
        {pending ? 'Salvando…' : 'Salvar nome'}
      </button>
    </form>
  )
}

export function DeleteReviewButton({ id }: { id: string | number }) {
  const [state, action, pending] = useActionState(deleteReviewAction, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.success) router.refresh()
  }, [state, router])

  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm('Excluir esta avaliação?')) event.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={String(id)} />
      <button
        type="submit"
        disabled={pending}
        className="text-xs font-bold text-[#a34a3c] underline-offset-4 hover:underline disabled:opacity-50"
      >
        {pending ? 'Excluindo…' : 'Excluir'}
      </button>
      {state.message && !state.success && <span className="ml-3 text-xs text-red-700">{state.message}</span>}
    </form>
  )
}
