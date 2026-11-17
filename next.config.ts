import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(dirname),
  },
  output: 'standalone',
  // As imagens vêm do Payload (/api/media/file/...). Permite a query string de cache usada nas URLs.
  images: {
    localPatterns: [
      { pathname: '/api/media/file/**' },
      { pathname: '/assets/**' },
    ],
  },
  // Uploaded Payload media is served from this app, so the default Next image
  // loader is sufficient and does not need the Figma image service.
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    cpus: 2,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
