import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { pt as adminLanguage } from '@payloadcms/translations/languages/pt'
import { Admins } from './collections/Admins'
import { Media } from './collections/Media'
import { Folders } from './collections/Folders'
import { Tags } from './collections/Tags'
import { Users } from './collections/Users'
import { Attractions } from './collections/Attractions'
import { Reviews } from './collections/Reviews'
import { seedDemoData } from './seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * Local Payload configuration for TFHub.
 * This configuration does not require a Figma environment ID.
 * SQLite stores local development data in tfhub.db at the project root.
 */
export default buildConfig({
  secret:
    process.env.PAYLOAD_SECRET ||
    'tfhub-local-development-secret-change-before-deploying-2026',
  // Sem `serverURL` de propósito: assim as imagens vêm como /api/media/file/... (relativas)
  // e o next/image aceita. Com serverURL elas viravam http://localhost:3000/... e davam erro.
  admin: {
    user: Admins.slug,
    constrainWidth: true,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./tfhub.db',
    },
  }),
  // Painel /admin em português
  i18n: {
    fallbackLanguage: 'pt',
    supportedLanguages: { pt: adminLanguage },
  },
  onInit: async (payload) => {
    await seedDemoData(payload)
  },
  collections: [Admins, Users, Attractions, Reviews, Media, Folders, Tags],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  localization: {
    locales: [{ code: 'en', label: 'English' }],
    fallback: true,
    defaultLocale: 'en',
  },
})
