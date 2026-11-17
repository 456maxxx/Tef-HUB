import { revalidateTag } from 'next/cache'
import type { Access, CollectionConfig } from 'payload'
import { recomputeAttractionRating } from '@/lib/recompute-rating'

const isAdmin = (req: { user?: { collection?: string } | null }) =>
  req.user?.collection === 'admins'

const canDeleteReview: Access = ({ req }) => {
  if (isAdmin(req)) return true
  if (req.user?.collection !== 'users') return false
  return { user: { equals: req.user.id } }
}

const getAttractionId = (doc: any) =>
  typeof doc?.attraction === 'object' ? doc.attraction?.id : doc?.attraction

async function refreshReviews(doc: any, req: any) {
  revalidateTag('reviews', 'max')
  const attractionId = getAttractionId(doc)
  if (!attractionId) return

  revalidateTag(`reviews:${attractionId}`, 'max')
  try {
    await recomputeAttractionRating(req.payload, attractionId, req)
    revalidateTag('attractions', 'max')
  } catch (error) {
    req.payload.logger.error({
      err: error,
      msg: 'TFHub: não foi possível recalcular a média das avaliações.',
    })
  }
}

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  access: {
    create: ({ req }) => req.user?.collection === 'users',
    read: ({ req }) => {
      if (isAdmin(req)) return true
      return { status: { equals: 'approved' } }
    },
    update: ({ req }) => isAdmin(req),
    delete: canDeleteReview,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'attraction', 'rating', 'status', 'createdAt'],
  },
  hooks: {
    beforeValidate: [
      ({ data, operation, req }) => {
        if (operation === 'create' && req.user?.collection === 'users') {
          const name = String((req.user as any).name || 'Viajante')
          return {
            ...data,
            user: req.user.id,
            authorName: name,
            title: `Avaliação de ${name}`,
            // Avaliações válidas são publicadas imediatamente para todos.
            status: 'approved',
          }
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, req }) => {
        await refreshReviews(doc, req)
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        await refreshReviews(doc, req)
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      access: {
        create: () => false,
        update: () => false,
        read: ({ req }) => isAdmin(req),
      },
    },
    {
      // Este campo precisa existir na coleção porque a consulta pública o seleciona.
      name: 'authorName',
      type: 'text',
      required: true,
      access: {
        read: () => true,
        create: () => false,
        update: () => false,
      },
    },
    {
      name: 'attraction',
      type: 'relationship',
      relationTo: 'attractions',
      required: true,
      filterOptions: {
        _status: { equals: 'published' },
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      access: {
        create: () => false,
        update: () => false,
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
      minLength: 12,
      maxLength: 800,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'approved',
      options: [
        { label: 'Pendente', value: 'pending' },
        { label: 'Aprovada', value: 'approved' },
        { label: 'Rejeitada', value: 'rejected' },
      ],
      access: {
        create: () => false,
        update: ({ req }) => isAdmin(req),
      },
    },
  ],
}
