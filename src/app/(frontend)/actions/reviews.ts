'use server'

import config from '@payload-config'
import { revalidateTag } from 'next/cache'
import { getPayload } from 'payload'
import { appAuth } from '@/lib/app-auth'

export type ReviewState = {
  success: boolean
  message: string
}

export async function createReviewAction(
  _previous: ReviewState,
  formData: FormData,
): Promise<ReviewState> {
  try {
    const user = await appAuth.currentUser()

    if (!user) {
      return { success: false, message: 'Entre na sua conta para avaliar.' }
    }

    const attraction = String(formData.get('attraction') || '').trim()
    const rating = Number(formData.get('rating'))
    const comment = String(formData.get('comment') || '').trim()

    if (!attraction || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      return { success: false, message: 'Escolha uma nota de 1 a 5.' }
    }

    if (comment.length < 12 || comment.length > 800) {
      return {
        success: false,
        message: 'Conte sua experiência em 12 a 800 caracteres.',
      }
    }

    const payload = await getPayload({ config })

    const attractionResult = await payload.find({
      collection: 'attractions',
      limit: 1,
      depth: 0,
      overrideAccess: true,
      where: {
        and: [
          { id: { equals: attraction } },
          { _status: { equals: 'published' } },
        ],
      },
    })

    const selectedAttraction = attractionResult.docs[0]
    if (!selectedAttraction) {
      return { success: false, message: 'Este ponto turístico não está disponível.' }
    }

    // Use o ID retornado pelo Payload, preservando o tipo nativo do relacionamento.
    const selectedAttractionId = selectedAttraction.id

    const existing = await payload.find({
      collection: 'reviews',
      limit: 1,
      depth: 0,
      pagination: false,
      overrideAccess: true,
      where: {
        and: [
          { attraction: { equals: selectedAttractionId } },
          { user: { equals: user.id } },
        ],
      },
    })

    if (existing.docs.length > 0) {
      return {
        success: false,
        message: 'Você já avaliou este lugar com esta conta.',
      }
    }

    const authorName = String((user as any).name || 'Viajante')

    // A identidade vem da sessão validada no servidor, nunca do formulário do navegador.
    await payload.create({
      collection: 'reviews',
      data: {
        attraction: selectedAttractionId,
        rating,
        comment,
        user: user.id,
        authorName,
        title: `Avaliação de ${authorName}`,
        status: 'approved',
      } as any,
      draft: false,
      overrideAccess: true,
    })

    revalidateTag('reviews', 'max')
    revalidateTag(`reviews:${selectedAttractionId}`, 'max')
    revalidateTag('attractions', 'max')

    return {
      success: true,
      message: 'Avaliação publicada! Ela já pode ser vista por outros usuários.',
    }
  } catch (error) {
    console.error('TFHub: erro ao salvar avaliação:', error)
    return {
      success: false,
      message: 'Não foi possível salvar sua avaliação. Confira o terminal para ver o erro.',
    }
  }
}
