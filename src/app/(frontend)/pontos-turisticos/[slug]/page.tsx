import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, MapPin, Star } from '@/components/Icons'
import { ReviewForm } from '@/components/ReviewForm'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getApprovedReviews, getAttractionBySlug, getAttractions } from '@/lib/attractions'

export async function generateStaticParams() {
  const attractions = await getAttractions()
  return attractions.map((attraction) => ({ slug: attraction.slug }))
}

export default async function AttractionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const attraction = await getAttractionBySlug(slug)
  if (!attraction) notFound()
  const reviews = await getApprovedReviews(attraction.id)

  return (
    <main>
      <section className="relative min-h-[700px] bg-[#14392f] text-white">
        <SiteHeader />
        {attraction.image && (
          <Image
            src={attraction.image.url}
            alt={attraction.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25" />
        <div className="relative z-10 mx-auto flex min-h-[700px] max-w-[1400px] items-end px-5 pb-16 pt-36 sm:px-8 lg:px-12 lg:pb-20">
          <div className="max-w-4xl">
            {attraction.image?.alt.toLowerCase().includes('ilustração demonstrativa') && (
              <span className="mb-5 inline-flex rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-white/90 backdrop-blur-sm">
                Imagem ilustrativa — não é foto do local
              </span>
            )}
            <p className="text-xs font-bold uppercase tracking-[.24em] text-[#edc77e]">
              {attraction.eyebrow}
            </p>
            <h1 className="mt-5 font-serif text-6xl leading-[.88] sm:text-8xl lg:text-9xl">
              {attraction.name}
            </h1>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/75">
              <span className="flex items-center gap-2">
                <MapPin className="size-4" />
                {attraction.location}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="size-4" />
                {attraction.duration}
              </span>
              <span className="flex items-center gap-2">
                <Star className="size-4 fill-[#eabc68] text-[#eabc68]" />
                {attraction.rating.toFixed(1)} ({attraction.reviewCount} avaliações)
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f5ee] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[1.25fr_.75fr]">
          <div>
            <p className="section-kicker">Sobre a experiência</p>
            <p className="mt-6 font-serif text-3xl leading-[1.3] text-[#173d33] sm:text-4xl">
              {attraction.shortDescription}
            </p>
            <p className="mt-7 whitespace-pre-line text-base leading-8 text-[#65736d]">
              {attraction.description}
            </p>
            {attraction.highlights.length > 0 && (
              <div className="mt-10 border-t border-[#183f34]/15 pt-8">
                <h2 className="font-serif text-2xl text-[#173d33]">O que você vai encontrar</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {attraction.highlights.map((item, index) => (
                    <li key={index} className="flex gap-3 text-sm leading-6 text-[#5f6f68]">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#c48d3c]" />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <aside>
            <div className="sticky top-6 rounded-[1.5rem] bg-[#173e34] p-7 text-white">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#e4b660]">
                Informações práticas
              </p>
              <dl className="mt-6 divide-y divide-white/10">
                <div className="flex justify-between gap-4 py-4 text-sm">
                  <dt className="text-white/55">Categoria</dt>
                  <dd className="capitalize">{attraction.category}</dd>
                </div>
                <div className="flex justify-between gap-4 py-4 text-sm">
                  <dt className="text-white/55">Duração</dt>
                  <dd>{attraction.duration}</dd>
                </div>
                <div className="flex justify-between gap-4 py-4 text-sm">
                  <dt className="text-white/55">Ritmo</dt>
                  <dd className="capitalize">{attraction.difficulty}</dd>
                </div>
              </dl>
              <p className="mt-5 text-xs leading-6 text-white/50">
                Confirme condições de acesso e horários com guias e operadores locais antes da
                visita.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[1fr_.9fr]">
          <div>
            <p className="section-kicker">Quem já viveu</p>
            <h2 className="mt-5 font-serif text-5xl text-[#173d33]">Avaliações de viajantes</h2>
            <div className="mt-8 space-y-5">
              {reviews.length ? (
                reviews.map((review) => (
                  <article key={review.id} className="border-t border-[#173d33]/15 pt-5">
                    <div className="flex items-center justify-between gap-4">
                      <strong className="text-sm text-[#173d33]">{review.author}</strong>
                      <span
                        className="flex gap-0.5 text-[#d79d46]"
                        aria-label={`${review.rating} estrelas`}
                      >
                        {Array.from({ length: 5 }, (_, index) => (
                          <Star
                            key={index}
                            className={`size-4 ${index < review.rating ? 'fill-current' : 'opacity-25'}`}
                          />
                        ))}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[#65736d]">{review.comment}</p>
                  </article>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-[#173d33]/20 p-7 text-sm leading-7 text-[#65736d]">
                  Ainda não há avaliações publicadas. Seja a primeira pessoa a compartilhar sua
                  experiência.
                </div>
              )}
            </div>
          </div>
          <ReviewForm attractionId={attraction.id} />
        </div>
      </section>
      <div className="bg-white px-5 pb-20 text-center">
        <Link href="/pontos-turisticos" className="text-sm font-bold text-[#174c3e]">
          ← Voltar aos pontos turísticos
        </Link>
      </div>
      <SiteFooter />
    </main>
  )
}
