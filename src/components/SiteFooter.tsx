import Link from 'next/link'
import { Compass } from '@/components/Icons'

export function SiteFooter() {
  return (
    <footer className="bg-[#0e2c26] px-5 py-12 text-[#dbe8df] sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full border border-white/20">
              <Compass className="size-5" />
            </span>
            <span className="font-serif text-2xl text-white">TFHub</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
            Um guia feito para descobrir Tefé com respeito à floresta, à cultura e às pessoas que
            dão vida ao Médio Solimões.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#d6a95c]">
            Explore
          </p>
          <div className="grid gap-3 text-sm text-white/70">
            <Link href="/pontos-turisticos">Pontos turísticos</Link>
            <Link href="/#recomendacoes">Recomendações</Link>
            <Link href="/#planeje">Como chegar</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#d6a95c]">
            Sua conta
          </p>
          <div className="grid gap-3 text-sm text-white/70">
            <Link href="/login">Entrar</Link>
            <Link href="/cadastro">Criar conta</Link>
            <Link href="/perfil">Meu perfil</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
        <span>© 2026 TFHub</span>
        <span>Turismo responsável na Amazônia</span>
      </div>
    </footer>
  )
}
