'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { appAuth } from '@/lib/app-auth'

export type ProfileState = { success: boolean; message: string }

export async function updateNameAction(
  _previous: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const user = await appAuth.currentUser()
  if (!user) return { success: false, message: 'Sua sessão expirou. Entre novamente.' }

  const name = String(formData.get('name') || '').trim()
  if (name.length < 2 || name.length > 80) {
    return { success: false, message: 'Informe um nome com 2 a 80 caracteres.' }
  }

  try {
    const payload = await getPayload({ config })
    await payload.update({
      collection: 'users',
      id: user.id,
      data: { name },
      user,
      overrideAccess: false,
    })
    return { success: true, message: 'Nome atualizado.' }
  } catch {
    return { success: false, message: 'Não foi possível salvar agora.' }
  }
}

export async function deleteReviewAction(
  _previous: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const user = await appAuth.currentUser()
  if (!user) return { success: false, message: 'Sua sessão expirou. Entre novamente.' }

  const id = String(formData.get('id') || '')
  if (!id) return { success: false, message: 'Avaliação inválida.' }

  try {
    const payload = await getPayload({ config })
    // O acesso da coleção só permite excluir a PRÓPRIA avaliação.
    await payload.delete({ collection: 'reviews', id, user, overrideAccess: false })
    return { success: true, message: 'Avaliação excluída.' }
  } catch {
    return { success: false, message: 'Não foi possível excluir.' }
  }
}
