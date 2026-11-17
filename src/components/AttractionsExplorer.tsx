'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AttractionCard } from '@/components/AttractionCard'
import { Compass } from '@/components/Icons'
import type { AttractionCardData } from '@/lib/attractions'

const CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'natureza', label: 'Natureza' },
  { id: 'cultura', label: 'Cultura' },
  { id: 'aventura', label: 'Aventura' },
  { id: 'gastronomia', label: 'Gastronomia' },
]

export function AttractionsExplorer({ attractions }: { attractions: AttractionCardData[] }) {
  const params = useSearchParams()
  const categoria = params.get('categoria') ?? 'todos'
  const ritmo = params.get('ritmo')

  const visible = attractions.filter(
    (item) =>
      (categoria === 'todos' || item.category === categoria) && (!ritmo || item.difficulty === ritmo),
  )

  const hrefFor = (id: string) => {
    const next = new URLSearchParams()
    if (id !== 'todos') next.set('categoria', id)
    if (ritmo) next.set('ritmo', ritmo)
    const query = next.toString()
    return query ? `/pontos-turisticos?${query}` : '/pontos-turisticos'
  }

  return (
    <div className="mx-auto max-w-[1400px]">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
        <p className="text-sm text-[#68756f]">
          <strong className="text-[#153a31]">{visible.length}</strong> experiências selecionadas
          {ritmo === 'facil' && (
            <Link
              href={categoria === 'todos' ? '/pontos-turisticos' : `/pontos-turisticos?categoria=${categoria}`}
              scroll={false}
              className="ml-3 rounded-full bg-[#e8ba68]/30 px-3 py-1 text-xs font-bold text-[#7a5316]"
            >
              Viagem tranquila ✕
            </Link>
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((item) => {
            const active = item.id === categoria
            return (
              <Link
                key={item.id}
                href={hrefFor(item.id)}
                scroll={false}
                aria-current={active ? 'true' : undefined}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  active
                    ? 'bg-[#173e34] text-white'
                    : 'border border-[#173e34]/15 text-[#52635c] hover:border-[#173e34]/40 hover:bg-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>

      {visible.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] bg-white p-16 text-center">
          <Compass className="mx-auto size-10 text-[#b78339]" />
          <h2 className="mt-5 font-serif text-3xl text-[#153a31]">
            {attractions.length ? 'Nada nesta categoria ainda' : 'A rota está sendo preparada'}
          </h2>
          <p className="mt-3 text-[#68756f]">
            {attractions.length
              ? 'Tente outra categoria ou veja todos os lugares.'
              : 'Volte em breve para conhecer os primeiros lugares.'}
          </p>
          {attractions.length > 0 && (
            <Link href="/pontos-turisticos" className="primary-button mt-6 inline-flex">
              Ver todos os lugares
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
