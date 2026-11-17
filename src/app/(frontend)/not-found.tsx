import Link from 'next/link'

export const metadata = { title: 'Página não encontrada | TFHub' }

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-8 py-16 text-center">
      <p className="section-kicker">Erro 404</p>
      <h1 className="mt-5 font-serif text-5xl leading-none text-[#173e34] sm:text-6xl">
        Esse caminho não leva a lugar nenhum.
      </h1>
      <p className="mt-5 text-base leading-7 text-[#65736d]">
        A página que você procura não existe ou mudou de endereço.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="primary-button inline-flex">
          Voltar ao início
        </Link>
        <Link
          href="/pontos-turisticos"
          className="inline-flex items-center rounded-full border border-[#173e34]/25 px-6 py-3 text-sm font-bold text-[#173e34] hover:bg-white"
        >
          Ver pontos turísticos
        </Link>
      </div>
    </main>
  )
}
