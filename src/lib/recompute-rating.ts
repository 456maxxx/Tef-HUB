import type { Payload, PayloadRequest } from 'payload'

/**
 * Recalcula a nota média e a quantidade de avaliações APROVADAS de um ponto turístico.
 * Recebe o `req` do hook para participar da mesma transação do banco (evita travar o SQLite).
 */
export async function recomputeAttractionRating(
  payload: Payload,
  attractionId: string | number,
  req?: PayloadRequest,
) {
  const approved = await payload.find({
    collection: 'reviews',
    where: {
      and: [{ attraction: { equals: attractionId } }, { status: { equals: 'approved' } }],
    },
    depth: 0,
    pagination: false,
    overrideAccess: true,
    req,
  } as any)

  const count = approved.docs.length
  const sum = approved.docs.reduce((total: number, review: any) => total + Number(review.rating || 0), 0)
  const average = count ? Math.round((sum / count) * 10) / 10 : 0

  await payload.update({
    collection: 'attractions',
    id: attractionId,
    data: { rating: average, reviewCount: count },
    depth: 0,
    overrideAccess: true,
    req,
  } as any)
}
