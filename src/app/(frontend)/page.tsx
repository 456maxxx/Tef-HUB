import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Compass, Leaf, MapPin, Star } from '@/components/Icons'
import { AttractionCard } from '@/components/AttractionCard'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getAttractions } from '@/lib/attractions'

export default async function HomePage() {
  const attractions = await getAttractions()
  const featured = attractions.slice(0, 3)
  const hero = featured[0]

  return (
    <main>
      <section className="relative min-h-[820px] overflow-hidden bg-[#14392f] text-white">
        <SiteHeader />
        {hero?.image ? (
          <Image
            src={hero.image.url}
            alt={hero.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,#4f8571_0%,#214b3e_36%,#102f27_72%)]" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,33,27,.88)_0%,rgba(8,33,27,.38)_54%,rgba(8,33,27,.12)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102f27]/80 via-transparent to-black/15" />

        <div className="relative z-10 mx-auto flex min-h-[820px] max-w-[1400px] items-end px-5 pb-20 pt-36 sm:px-8 lg:px-12 lg:pb-24">
          <div className="max-w-4xl">
            {hero?.image?.alt.toLowerCase().includes('ilustração demonstrativa') && (
              <p className="mb-4 inline-flex rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-white/90 backdrop-blur-sm">
                Imagem ilustrativa do destino
              </p>
            )}
            <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#edcc8f]">
              <span className="h-px w-9 bg-current" />
              Descubra o Médio Solimões
            </div>
            <h1 className="max-w-[900px] font-serif text-[clamp(4rem,10vw,9.5rem)] leading-[0.78] tracking-[-0.045em]">
              Tefé, onde a floresta encontra você.
            </h1>
            <div className="mt-9 flex flex-col gap-7 border-l border-white/35 pl-6 sm:flex-row sm:items-end sm:justify-between lg:max-w-3xl">
              <p className="max-w-xl text-base leading-7 text-white/75 sm:text-lg">
                Navegue por águas ancestrais, encontre saberes amazônicos e viva experiências que
                ficam muito além da viagem.
              </p>
              <Link
                href="/pontos-turisticos"
                className="flex shrink-0 items-center gap-3 text-sm font-bold"
              >
                Comece a explorar
                <span className="grid size-11 place-items-center rounded-full bg-[#e8ba68] text-[#173c32]">
                  <ArrowUpRight className="size-5" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-7 z-10 hidden items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/50 lg:flex">
          <MapPin className="size-4" />
          Amazonas, Brasil
        </div>
      </section>

      <section id="explorar" className="bg-[#f7f5ee] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="section-kicker">Escolhas de quem conhece</p>
              <h2 className="mt-5 max-w-xl font-serif text-5xl leading-[.98] text-[#153a31] sm:text-7xl">
                Viva Tefé por inteiro
              </h2>
            </div>
            <div className="lg:pb-2">
              <p className="max-w-xl text-base leading-8 text-[#66736d]">
                Da tranquilidade do lago à força viva da floresta, reunimos lugares e experiências
                que revelam a essência de Tefé.
              </p>
              <Link
                href="/pontos-turisticos"
                className="mt-7 inline-flex items-center gap-3 text-sm font-bold text-[#164c3e]"
              >
                Ver todos os lugares <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          {featured.length ? (
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((attraction, index) => (
                <AttractionCard key={attraction.id} attraction={attraction} large={index === 0} />
              ))}
            </div>
          ) : (
            <div className="mt-14 rounded-[2rem] border border-dashed border-[#234d41]/30 bg-white p-12 text-center">
              <Compass className="mx-auto size-10 text-[#c19145]" />
              <h3 className="mt-5 font-serif text-3xl text-[#153a31]">Novos caminhos em breve</h3>
              <p className="mx-auto mt-3 max-w-md text-[#66736d]">
                Os primeiros pontos turísticos estão sendo preparados para você.
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="gastronomia" className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <p className="section-kicker">Sabores da Amazônia</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
            <h2 className="max-w-2xl font-serif text-5xl leading-none text-[#153a31] sm:text-6xl">Uma experiência que também se descobre à mesa.</h2>
            <Link href="/pontos-turisticos?categoria=gastronomia" className="text-sm font-bold text-[#164c3e]">Explorar experiências <ArrowUpRight className="inline size-4" /></Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="group relative min-h-[360px] overflow-hidden rounded-[1.6rem] bg-[#153a31]">
              <Image src="/assets/gastronomia/prato-peixe-regional.jpg" alt="Prato de peixe regional amazônico" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white"><p className="text-xs font-bold uppercase tracking-[.2em] text-white/70">Gastronomia regional</p><h3 className="mt-2 font-serif text-3xl">Peixes amazônicos</h3></div>
            </article>
            <article className="group relative min-h-[360px] overflow-hidden rounded-[1.6rem] bg-[#153a31]">
              <Image src="/assets/gastronomia/cozinha-brasileira.jpg" alt="Culinária e ingredientes brasileiros" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white"><p className="text-xs font-bold uppercase tracking-[.2em] text-white/70">Sabores e ingredientes</p><h3 className="mt-2 font-serif text-3xl">Cozinha regional</h3></div>
            </article>
          </div>
          <div className="mt-5 relative min-h-[230px] overflow-hidden rounded-[1.6rem] bg-[#153a31]">
            <Image src="/assets/banners/gastronomia-regional.jpg" alt="Banner de gastronomia regional" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-center p-7 text-white sm:p-10"><p className="text-xs font-bold uppercase tracking-[.2em] text-white/75">Descubra novos sabores</p><h3 className="mt-3 font-serif text-3xl sm:text-4xl">A cultura de Tefé também vive na sua culinária.</h3></div>
          </div>
        </div>
      </section>

      <section id="comercio" className="bg-[#f7f5ee] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <p className="section-kicker">Conheça e valorize</p>
          <h2 className="mt-4 max-w-2xl font-serif text-5xl leading-none text-[#153a31] sm:text-6xl">Comércio local, encontros e hospitalidade.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { title: 'Restaurantes', subtitle: 'Ambientes para conhecer a culinária local', src: '/assets/estabelecimentos/restaurante-ambiente.jpg' },
              { title: 'Cafés e comércio', subtitle: 'Espaços para uma pausa e bons encontros', src: '/assets/estabelecimentos/cafe-comercio-local.jpg' },
              { title: 'Hospedagem', subtitle: 'Referências visuais de hotéis e pousadas', src: '/assets/estabelecimentos/hospedagem-restaurante.jpg' },
            ].map((item) => (
              <article key={item.title} className="group relative min-h-[340px] overflow-hidden rounded-[1.5rem] bg-[#153a31]">
                <Image src={item.src} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white"><h3 className="font-serif text-3xl">{item.title}</h3><p className="mt-2 text-sm text-white/75">{item.subtitle}</p></div>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-[#66736d]">Imagens ilustrativas. Confirme os estabelecimentos e seus dados antes de publicá-los como negócios reais de Tefé.</p>
        </div>
      </section>

      <section id="transporte" className="bg-[#e3ece5] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div><p className="section-kicker">Caminhos pelas águas</p><h2 className="mt-4 font-serif text-5xl leading-none text-[#153a31] sm:text-6xl">A vida de Tefé também navega pelos rios.</h2><p className="mt-5 max-w-lg text-base leading-7 text-[#66736d]">Conheça referências visuais de transporte fluvial e embarcações da região amazônica.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative min-h-[280px] overflow-hidden rounded-[1.5rem] bg-[#153a31]"><Image src="/assets/transporte/canoa-transporte-fluvial.jpg" alt="Canoa em transporte fluvial amazônico" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" /></div>
            <div className="relative min-h-[280px] overflow-hidden rounded-[1.5rem] bg-[#153a31]"><Image src="/assets/transporte/embarcacao-regional.jpg" alt="Embarcação regional em rio amazônico" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" /></div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f5ee] px-5 py-12 sm:px-8 lg:px-12">
        <div className="relative mx-auto min-h-[280px] max-w-[1400px] overflow-hidden rounded-[1.7rem] bg-[#153a31]">
          <Image src="/assets/banners/descubra-tefe.jpg" alt="Paisagem amazônica para descobrir Tefé" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-transparent" />
          <div className="absolute inset-y-0 left-0 flex max-w-2xl flex-col justify-center p-7 text-white sm:p-12"><p className="text-xs font-bold uppercase tracking-[.2em] text-white/75">TFHub • Tefé, Amazonas</p><h2 className="mt-3 font-serif text-4xl sm:text-5xl">Descubra novos caminhos pela Amazônia.</h2></div>
        </div>
      </section>

      <section id="recomendacoes" className="overflow-hidden bg-[#dfe9df]">
        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-2">
          <div className="relative min-h-[560px] bg-[#245447]">
            {featured[1]?.image ? (
              <Image
                src={featured[1].image.url}
                alt={featured[1].image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#386d5d,#173d33)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            {featured[1]?.image?.alt.toLowerCase().includes('ilustração demonstrativa') && (
              <span className="absolute left-8 top-8 rounded-full bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-white backdrop-blur-sm">
                Imagem ilustrativa
              </span>
            )}
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between text-white">
              <div>
                <span className="text-xs uppercase tracking-[.2em] text-white/65">Olhar local</span>
                <p className="mt-2 max-w-sm font-serif text-3xl">A Amazônia no tempo das águas</p>
              </div>
              <Leaf className="size-9 text-[#edca88]" />
            </div>
          </div>
          <div className="flex items-center px-6 py-20 sm:px-12 lg:px-20">
            <div className="max-w-xl">
              <p className="section-kicker">Recomendações para você</p>
              <h2 className="mt-5 font-serif text-5xl leading-none text-[#153a31] sm:text-6xl">
                Sua viagem, no seu ritmo.
              </h2>
              <p className="mt-7 text-base leading-8 text-[#5f7069]">
                Prefere aventura, cultura ou descanso? Crie sua conta, avalie o que viveu e guarde
                ideias para uma próxima descoberta.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  ['Natureza viva', 'Florestas, lagos e encontros com a fauna', '/pontos-turisticos?categoria=natureza'],
                  ['Cultura local', 'Saberes, sabores e histórias de Tefé', '/pontos-turisticos?categoria=cultura'],
                  ['Dias de aventura', 'Trilhas e navegações inesquecíveis', '/pontos-turisticos?categoria=aventura'],
                  ['Viagem tranquila', 'Experiências leves para toda a família', '/pontos-turisticos?ritmo=facil'],
                ].map(([title, text, href], index) => (
                  <Link
                    key={title}
                    href={href}
                    className="group block border-t border-[#1d4c3f]/20 pt-4 transition hover:border-[#b47d2e]"
                  >
                    <span className="text-xs font-bold text-[#b47d2e]">0{index + 1}</span>
                    <h3 className="mt-2 flex items-center justify-between font-serif text-xl text-[#173f34]">
                      {title}
                      <ArrowUpRight className="size-4 opacity-0 transition group-hover:opacity-100" />
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[#6a7872]">{text}</p>
                  </Link>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link href="/cadastro" className="primary-button inline-flex">
                  Criar meu perfil
                </Link>
                <Link href="/login" className="text-sm font-bold text-[#164c3e] hover:underline">
                  Já tenho conta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="planeje" className="bg-[#f7f5ee] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 rounded-[2rem] bg-[#173e34] p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_.8fr] lg:p-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.22em] text-[#e3b663]">
                Antes de embarcar
              </p>
              <h2 className="mt-5 max-w-2xl font-serif text-5xl leading-none sm:text-7xl">
                Planeje com calma. Viaje com presença.
              </h2>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-base leading-8 text-white/65">
                Tefé é acessível principalmente por barco e avião. Respeite os ciclos da cheia e da
                seca, escolha guias locais e leve apenas memórias.
              </p>
              <div className="mt-7 flex items-center gap-3 text-sm text-white/80">
                <Star className="size-5 text-[#e9bd6b]" />
                Melhor período: junho a novembro
              </div>
              <Link
                href="/pontos-turisticos"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#e8ba68] px-6 py-3 text-sm font-bold text-[#173c32] transition hover:bg-[#f0c97f]"
              >
                Ver pontos turísticos <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
