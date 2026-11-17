import { unstable_cache } from 'next/cache'
import { getPayloadClient } from '@/lib/payload'

export type AttractionCardData = {
  id: string | number
  name: string
  slug: string
  eyebrow: string
  shortDescription: string
  description: string
  category: string
  location: string
  duration: string
  difficulty: string
  featured: boolean
  rating: number
  reviewCount: number
  image: { url: string; alt: string; width?: number | null; height?: number | null } | null
  highlights: { text: string }[]
}

const localAttractionImages: Record<string, { url: string; alt: string }> = {
  'lago-de-tefe': { url: '/assets/turismo/canoa-lago-amazonico.jpg', alt: 'Canoa em lago amazônico' },
  'reserva-mamiraua': { url: '/assets/turismo/rio-floresta-amazonica.jpg', alt: 'Rio entre a floresta amazônica' },
  'feira-do-produtor': { url: '/assets/gastronomia/cozinha-brasileira.jpg', alt: 'Comida e ingredientes regionais' },
  'mirante-do-rio-solimoes': { url: '/assets/turismo/por-do-sol-nas-aguas.jpg', alt: 'Pôr do sol sobre águas amazônicas' },
  'sabores-do-solimoes': { url: '/assets/gastronomia/prato-peixe-regional.jpg', alt: 'Prato de peixe regional' },
}

function mapAttraction(doc: any): AttractionCardData {
  const uploadedImage = typeof doc.image === 'object' && doc.image?.url ? doc.image : null
  const localImage = localAttractionImages[doc.slug]
  const image = localImage ?? uploadedImage
  return {
    id: doc.id,
    name: doc.name,
    slug: doc.slug,
    eyebrow: doc.eyebrow,
    shortDescription: doc.shortDescription,
    description: doc.description,
    category: doc.category,
    location: doc.location,
    duration: doc.duration,
    difficulty: doc.difficulty,
    featured: Boolean(doc.featured),
    rating: Number(doc.rating || 0),
    reviewCount: Number(doc.reviewCount || 0),
    image: image
      ? {
          url: image.url,
          alt: image.alt || doc.name,
          width: image.width,
          height: image.height,
        }
      : null,
    highlights: Array.isArray(doc.highlights) ? doc.highlights : [],
  }
}

export const getAttractions = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'attractions',
      depth: 1,
      limit: 30,
      sort: '-featured,-rating',
      draft: false,
      overrideAccess: false,
      where: { _status: { equals: 'published' } },
    })
    return result.docs.map(mapAttraction)
  },
  ['attractions-list'],
  { tags: ['attractions'] },
)

export async function getAttractionBySlug(slug: string) {
  return unstable_cache(
    async () => {
      const payload = await getPayloadClient()
      const result = await payload.find({
        collection: 'attractions',
        depth: 1,
        limit: 1,
        draft: false,
        overrideAccess: false,
        where: {
          and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
        },
      })
      return result.docs[0] ? mapAttraction(result.docs[0]) : null
    },
    ['attraction-detail', slug],
    { tags: ['attractions', `attraction:${slug}`] },
  )()
}

export async function getApprovedReviews(attractionId: string | number) {
  return unstable_cache(
    async () => {
      const payload = await getPayloadClient()
      const result = await payload.find({
        collection: 'reviews',
        depth: 1,
        limit: 12,
        sort: '-createdAt',
        overrideAccess: false,
        where: {
          and: [{ attraction: { equals: attractionId } }, { status: { equals: 'approved' } }],
        },
      })
      return result.docs.map((review: any) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        author: review.authorName || 'Viajante',
        createdAt: review.createdAt,
      }))
    },
    ['attraction-reviews', String(attractionId)],
    { tags: ['reviews', `reviews:${attractionId}`] },
  )()
}
