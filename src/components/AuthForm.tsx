'use client'

import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { AuthState } from '@/app/(frontend)/actions/auth'

const initialState: AuthState = { success: false, message: '' }

export function AuthForm({
  mode,
  action,
}: {
  mode: 'login' | 'cadastro'
  action: (state: AuthState, data: FormData) => Promise<AuthState>
}) {
  const [state, formAction, pending] = useActionState(action, initialState)
  const router = useRouter()
  const isSignup = mode === 'cadastro'

  // Campos controlados: o que a pessoa digitou NÃO some quando há erro.
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (state.values?.name !== undefined) setName(state.values.name)
    if (state.values?.email !== undefined) setEmail(state.values.email)
  }, [state])

  useEffect(() => {
    if (state.success) {
      const timeout = window.setTimeout(() => {
        router.push('/perfil')
        router.refresh()
      }, 600)
      return () => window.clearTimeout(timeout)
    }
  }, [state.success, router])

  const passwordType = showPassword ? 'text' : 'password'

  return (
    <form action={formAction} className="mt-8 space-y-5" noValidate={false}>
      {isSignup && (
        <label className="block">
          <span className="form-label">Nome completo</span>
          <input
            className="form-input"
            name="name"
            autoComplete="name"
            required
            maxLength={80}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Como podemos chamar você?"
          />
        </label>
      )}
      <label className="block">
        <span className="form-label">E-mail</span>
        <input
          className="form-input"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="voce@exemplo.com"
        />
      </label>
      <label className="block">
        <span className="form-label">Senha</span>
        <input
          className="form-input"
          name="password"
          type={passwordType}
          autoComplete={isSignup ? 'new-password' : 'current-password'}
          required
          minLength={8}
          placeholder="Mínimo de 8 caracteres"
        />
      </label>
      {isSignup && (
        <label className="block">
          <span className="form-label">Confirmar senha</span>
          <input
            className="form-input"
            name="confirm"
            type={passwordType}
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="Repita a senha"
          />
        </label>
      )}

      <button
        type="button"
        onClick={() => setShowPassword((value) => !value)}
        className="text-xs font-bold text-[#1c5a49] underline-offset-4 hover:underline"
      >
        {showPassword ? 'Ocultar senha' : 'Mostrar senha'}
      </button>

      {state.message && (
        <div
          className={`rounded-xl px-4 py-3 text-sm ${
            state.success ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'
          }`}
          role="status"
        >
          <p>{state.message}</p>
          {state.code === 'email_taken' && (
            <Link
              href="/login"
              className="mt-2 inline-block font-bold underline underline-offset-4"
            >
              Ir para o login →
            </Link>
          )}
        </div>
      )}

      <button className="primary-button flex w-full" type="submit" disabled={pending}>
        {pending ? 'Só um instante…' : isSignup ? 'Criar minha conta' : 'Entrar na minha conta'}
      </button>

      <p className="text-center text-sm text-[#65746e]">
        {isSignup ? 'Já tem uma conta?' : 'Ainda não tem uma conta?'}{' '}
        <Link
          className="font-bold text-[#1c5a49] underline-offset-4 hover:underline"
          href={isSignup ? '/login' : '/cadastro'}
        >
          {isSignup ? 'Entrar' : 'Cadastre-se'}
        </Link>
      </p>
      <p className="text-center">
        <Link className="text-xs font-semibold text-[#65746e] hover:underline" href="/">
          ← Voltar para o início
        </Link>
      </p>
    </form>
  )
}
