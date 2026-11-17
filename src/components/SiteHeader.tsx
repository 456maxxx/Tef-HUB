import Link from 'next/link'
import { Compass, Menu } from '@/components/Icons'
import { HeaderAccount } from '@/components/HeaderAccount'

const links = [
  { href: '/#explorar', label: 'Explorar' },
  { href: '/pontos-turisticos', label: 'Pontos turísticos' },
  { href: '/#planeje', label: 'Planeje sua viagem' },
]

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15 text-white">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="group flex items-center gap-3" aria-label="TFHub — início">
          <span className="grid size-10 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur">
            <Compass className="size-5 transition-transform duration-500 group-hover:rotate-45" />
          </span>
          <span>
            <span className="block font-serif text-xl leading-none">TFHub</span>
            <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.28em] text-white/65">
              coração da Amazônia
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Principal">
          {links.map((link) => (
            <Link key={link.href} className="nav-link" href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <HeaderAccount />
          {/* Menu do celular (sem JavaScript): antes os links sumiam em telas pequenas. */}
          <details className="relative md:hidden">
            <summary
              className="grid size-11 cursor-pointer list-none place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur [&::-webkit-details-marker]:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="size-5" />
            </summary>
            <div className="absolute right-0 top-14 w-64 rounded-2xl bg-[#0e2c26] p-3 shadow-2xl">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/cadastro"
                className="mt-1 block rounded-xl bg-[#e8ba68] px-4 py-3 text-center text-sm font-bold text-[#173c32]"
              >
                Criar conta
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
