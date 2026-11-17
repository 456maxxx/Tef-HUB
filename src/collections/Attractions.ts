import { revalidateTag } from 'next/cache'
import type { CollectionConfig } from 'payload'

const revalidateAttraction = ({
  doc,
  previousDoc,
}: {
  doc?: { slug?: string }
  previousDoc?: { slug?: string }
}) => {
  revalidateTag('attractions', 'max')
  if (doc?.slug) revalidateTag(`attraction:${doc.slug}`, 'max')
  if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
    revalidateTag(`attraction:${previousDoc.slug}`, 'max')
  }
}

const isAdmin = ({ req }: { req: { user?: { collection?: string } | null } }) =>
  req.user?.collection === 'admins'

export const Attractions: CollectionConfig = {
  slug: 'attractions',
  access: {
    // Qualquer visitante pode consultar os pontos turísticos publicados.
    read: () => true,
    // Somente administradores podem cadastrar, editar ou excluir pontos turísticos.
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'location', 'featured', '_status'],
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [
      ({ doc, previousDoc, req }) => {
        // O seed roda durante a inicialização de uma função em cache do Next.js.
        // Nesse contexto, revalidateTag não pode ser chamado; a página será
        // preenchida normalmente após a inicialização do Payload.
        if (req.context?.skipCacheRevalidation) return
        revalidateAttraction({ doc, previousDoc })
      },
    ],
    afterDelete: [
      ({ doc, req }) => {
        if (req.context?.skipCacheRevalidation) return
        revalidateAttraction({ doc })
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'slug', useAsSlug: 'name' },
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      admin: { description: 'Ex.: Natureza exuberante' },
    },
    { name: 'shortDescription', type: 'textarea', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Natureza', value: 'natureza' },
        { label: 'Cultura', value: 'cultura' },
        { label: 'Aventura', value: 'aventura' },
        { label: 'Gastronomia', value: 'gastronomia' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'location', type: 'text', required: true },
    { name: 'duration', type: 'text', required: true },
    {
      name: 'difficulty',
      type: 'select',
      required: true,
      options: [
        { label: 'Fácil', value: 'facil' },
        { label: 'Moderada', value: 'moderada' },
        { label: 'Aventureira', value: 'aventureira' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
      defaultValue: 0,
      admin: { readOnly: true, description: 'Calculada automaticamente a partir das avaliações aprovadas.' },
    },
    {
      name: 'reviewCount',
      type: 'number',
      min: 0,
      defaultValue: 0,
      admin: { readOnly: true, description: 'Calculado automaticamente.' },
    },
    {
      name: 'highlights',
      type: 'array',
      minRows: 1,
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
}
