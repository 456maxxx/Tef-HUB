// The local version of TFHub uses Next.js' built-in image loader.
// This file is kept only for compatibility with older project references.
export default function localImageLoader({ src }: { src: string }) {
  return src
}
