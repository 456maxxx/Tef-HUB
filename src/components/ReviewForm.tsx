'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createReviewAction, type ReviewState } from '@/app/(frontend)/actions/reviews'
import { useSession } from '@/components/useSession'

const initialState: ReviewState = { success: false, message: '' }

export function ReviewForm({ attractionId }: { attractionId: string | number }) {
  const [state, action, pending] = useActionState(createReviewAction, initialState)
  const user = useSession()

  if (user === undefined) {
    return <div className="min-h-64 rounded-[1.5rem] bg-[#f1f3ed]" aria-hidden />
  }

  // Quem não está logado vê botões para entrar/cadastrar (antes via o formulário e só recebia erro).
  if (user === null) {
    return (
      <div className="rounded-[1.5rem] bg-[#f1f3ed] p-6 sm:p-8">
        <h3 className="font-serif text-2xl text-[#163b31]">Já visitou este lugar?</h3>
        <p className="mt-2 text-sm leading-6 text-[#65746e]">
          Entre na sua conta ou crie uma gratuitamente para compartilhar sua experiência.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/login" className="primary-button inline-flex">
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="inline-flex items-center justify-center rounded-full border border-[#173e34]/25 px-6 py-3 text-sm font-bold text-[#173e34] transition hover:bg-white"
          >
            Criar conta
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form action={action} className="rounded-[1.5rem] bg-[#f1f3ed] p-6 sm:p-8">
      <input type="hidden" name="attraction" value={String(attractionId)} />
      <h3 className="font-serif text-2xl text-[#163b31]">Como foi sua experiência?</h3>
      <p className="mt-2 text-sm leading-6 text-[#65746e]">
        Sua avaliação ajuda outros viajantes a descobrirem Tefé.
      </p>
      <label className="mt-6 block">
        <span className="form-label">Sua nota</span>
        <select className="form-input" name="rating" required defaultValue="5">
          <option value="5">5 — Inesquecível</option>
          <option value="4">4 — Muito bom</option>
          <option value="3">3 — Bom</option>
          <option value="2">2 — Pode melhorar</option>
          <option value="1">1 — Ruim</option>
        </select>
      </label>
      <label className="mt-4 block">
        <span className="form-label">Conte os detalhes</span>
        <textarea
          className="form-input min-h-32 resize-y"
          name="comment"
          minLength={12}
          maxLength={800}
          required
          placeholder="O que mais encantou você? Tem alguma dica para outros visitantes?"
        />
      </label>
      {state.message && (
        <p className={`mt-4 text-sm ${state.success ? 'text-emerald-700' : 'text-red-700'}`} role="status">
          {state.message}
        </p>
      )}
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button className="primary-button flex" type="submit" disabled={pending}>
          {pending ? 'Enviando…' : 'Enviar avaliação'}
        </button>
        <Link href="/perfil" className="text-sm font-bold text-[#174c3e] hover:underline">
          Minhas avaliações
        </Link>
      </div>
    </form>
  )
}
