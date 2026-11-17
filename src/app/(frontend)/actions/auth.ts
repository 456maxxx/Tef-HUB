'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { appAuth } from '@/lib/app-auth'

export type AuthState = {
  success: boolean
  message: string
  /** 'email_taken' = e-mail já cadastrado (o formulário mostra o botão "Entrar"). */
  code?: 'email_taken' | 'invalid'
  /** Devolve o que a pessoa digitou para o formulário não apagar tudo quando há erro. */
  values?: { name?: string; email?: string }
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function emailExists(email: string) {
  const payload = await getPayload({ config })
  const found = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
    pagination: false,
    overrideAccess: true, // só para checar existência; nenhum dado é devolvido ao navegador
  })
  return found.docs.length > 0
}

export async function loginAction(_previous: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get('email') || '')
    .trim()
    .toLowerCase()
  const password = String(formData.get('password') || '')
  const values = { email }

  if (!emailPattern.test(email) || password.length < 8) {
    return { success: false, code: 'invalid', message: 'Confira seu e-mail e sua senha.', values }
  }

  try {
    await appAuth.login(email, password)
    return { success: true, message: 'Login realizado. Bem-vindo de volta!', values }
  } catch {
    return { success: false, code: 'invalid', message: 'E-mail ou senha incorretos.', values }
  }
}

export async function signupAction(_previous: AuthState, formData: FormData): Promise<AuthState> {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '')
    .trim()
    .toLowerCase()
  const password = String(formData.get('password') || '')
  const confirm = String(formData.get('confirm') || '')
  const values = { name, email }

  if (name.length < 2 || name.length > 80) {
    return { success: false, code: 'invalid', message: 'Informe seu nome completo.', values }
  }
  if (!emailPattern.test(email)) {
    return { success: false, code: 'invalid', message: 'Informe um e-mail válido.', values }
  }
  if (password.length < 8) {
    return { success: false, code: 'invalid', message: 'A senha deve ter pelo menos 8 caracteres.', values }
  }
  if (password !== confirm) {
    return { success: false, code: 'invalid', message: 'As senhas não conferem.', values }
  }

  const takenMessage = 'Este e-mail já está cadastrado. Entre na sua conta ou use outro e-mail.'

  // 1) Bloqueia e-mail repetido com mensagem clara (o banco também impede: e-mail é único).
  if (await emailExists(email)) {
    return { success: false, code: 'email_taken', message: takenMessage, values }
  }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'users',
      data: { name, email, password },
      overrideAccess: false,
    })
  } catch {
    // 2) Corrida: dois cadastros ao mesmo tempo com o mesmo e-mail.
    if (await emailExists(email)) {
      return { success: false, code: 'email_taken', message: takenMessage, values }
    }
    return { success: false, code: 'invalid', message: 'Não foi possível criar a conta. Tente novamente.', values }
  }

  try {
    await appAuth.login(email, password)
    return { success: true, message: 'Conta criada e salva! Vamos explorar Tefé.', values }
  } catch {
    return { success: false, code: 'invalid', message: 'Conta criada! Entre com seu e-mail e senha.', values }
  }
}

export async function logoutAction() {
  await appAuth.logout()
}
