import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, MapPin, Star } from '@/components/Icons'
import type { AttractionCardData } from '@/lib/attractions'

export function AttractionCard({
  attraction,
  large = false,
}: {
  attraction: AttractionCardData
  large?: boolean
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[1.6rem] bg-[#153a31] ${
        large ? 'min-h-[540px] md:col-span-2' : 'min-h-[420px]'
      }`}
    >
      {attraction.image ? (
        <Image
          src={attraction.image.url}
          alt={attraction.image.alt}
          fill
          sizes={large ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#356f5e,#0f3028)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/5" />
      {attraction.image?.alt.toLowerCase().includes('ilustração demonstrativa') && (
        <span className="pointer-events-none absolute left-5 top-5 z-20 rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-white backdrop-blur-sm">
          Imagem ilustrativa
        </span>
      )}
      {/* O cartão inteiro é clicável (antes só a setinha era). */}
      <Link
        href={`/pontos-turisticos/${attraction.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Conhecer ${attraction.name}`}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-6 text-white sm:p-8">
        <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
          <span>{attraction.category}</span>
          <span className="size-1 rounded-full bg-[#d6a95c]" />
          <span className="flex items-center gap-1 normal-case tracking-normal">
            <Star className="size-4 fill-[#eabf68] text-[#eabf68]" />
            {attraction.rating > 0 ? attraction.rating.toFixed(1) : 'Novo'}
          </span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className={`${large ? 'text-4xl sm:text-5xl' : 'text-3xl'} font-serif`}>
              {attraction.name}
            </h3>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-white/70">
              <MapPin className="size-4" />
              {attraction.location}
            </p>
          </div>
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-[#163d33] transition group-hover:rotate-45">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </div>
    </article>
  )
}
