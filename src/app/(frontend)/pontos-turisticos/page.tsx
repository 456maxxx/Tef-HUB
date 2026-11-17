import { Suspense } from 'react'
import { AttractionsExplorer } from '@/components/AttractionsExplorer'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getAttractions } from '@/lib/attractions'

export const metadata = {
  title: 'Pontos turísticos de Tefé | TFHub',
  description: 'Descubra natureza, cultura e experiências imperdíveis em Tefé, Amazonas.',
}

export default async function AttractionsPage() {
  const attractions = await getAttractions()

  return (
    <main>
      <section className="relative bg-[#14392f] px-5 pb-20 pt-40 text-white sm:px-8 lg:px-12 lg:pb-28">
        <SiteHeader />
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-[#e7bd70]">
            Guia de Tefé
          </p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <h1 className="font-serif text-6xl leading-[.92] sm:text-8xl">
              Lugares que contam histórias.
            </h1>
            <p className="max-w-xl text-base leading-8 text-white/65">
              Explore os destinos mais marcantes da cidade e dos arredores. Compare avaliações,
              encontre dicas e escolha sua próxima experiência.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#f7f5ee] px-5 py-20 sm:px-8 lg:px-12">
        <Suspense fallback={<div className="mx-auto min-h-96 max-w-[1400px]" />}>
          <AttractionsExplorer attractions={attractions} />
        </Suspense>
      </section>
      <SiteFooter />
    </main>
  )
}
