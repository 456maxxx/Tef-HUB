import config from '@payload-config'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { logoutAction } from '@/app/(frontend)/actions/auth'
import { Compass, User } from '@/components/Icons'
import { DeleteReviewButton, NameForm } from '@/components/ProfileForms'
import { appAuth } from '@/lib/app-auth'

export const metadata = { title: 'Meu perfil | TFHub' }
export const dynamic = 'force-dynamic'

const STATUS: Record<string, { label: string; className: string }> = {
  pending: { label: 'Em análise', className: 'bg-amber-100 text-amber-800' },
  approved: { label: 'Publicada', className: 'bg-emerald-100 text-emerald-800' },
  rejected: { label: 'Não aprovada', className: 'bg-red-100 text-red-700' },
}

export default async function ProfilePage() {
  const user = await appAuth.currentUser()
  if (!user) redirect('/login')

  // Filtrado pelo id da pessoa logada: ela vê as próprias avaliações, inclusive as pendentes.
  const payload = await getPayload({ config })
  const mine = await payload.find({
    collection: 'reviews',
    where: { user: { equals: user.id } },
    sort: '-createdAt',
    depth: 1,
    limit: 50,
    overrideAccess: true,
  })

  return (
    <main className="min-h-screen bg-[#f5f3ec] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-3 text-[#173e34]">
          <span className="grid size-10 place-items-center rounded-full border border-[#173e34]/20">
            <Compass className="size-5" />
          </span>
          <span className="font-serif text-2xl">TFHub</span>
        </Link>
        <section className="mt-16 overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_80px_rgba(21,58,49,.08)]">
          <div className="bg-[#173e34] px-8 py-12 text-white sm:px-12">
            <div className="grid size-16 place-items-center rounded-full bg-[#e4b660] text-[#173e34]">
              <User className="size-7" />
            </div>
            <p className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-[#e6bf78]">Meu perfil</p>
            <h1 className="mt-3 font-serif text-5xl">{user.name || 'Viajante'}</h1>
            <p className="mt-2 text-sm text-white/55">{user.email}</p>
          </div>

          <div className="grid gap-8 p-8 sm:grid-cols-2 sm:p-12">
            <div>
              <h2 className="font-serif text-2xl text-[#173e34]">Seus dados</h2>
              <NameForm currentName={user.name || ''} />
            </div>
            <div className="border-t border-[#173e34]/10 pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
              <h2 className="font-serif text-2xl text-[#173e34]">Pronto para explorar?</h2>
              <p className="mt-3 text-sm leading-7 text-[#65736d]">
                Visite um ponto turístico e compartilhe sua avaliação com a comunidade.
              </p>
              <Link href="/pontos-turisticos" className="primary-button mt-6 inline-flex">
                Explorar lugares
              </Link>
              <form action={logoutAction} className="mt-8">
                <button
                  type="submit"
                  className="text-sm font-bold text-[#a34a3c] underline-offset-4 hover:underline"
                >
                  Sair da conta
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-[#173e34]/10 p-8 sm:p-12">
            <h2 className="font-serif text-2xl text-[#173e34]">Minhas avaliações</h2>
            {mine.docs.length === 0 ? (
              <p className="mt-3 text-sm leading-7 text-[#65736d]">
                Você ainda não avaliou nenhum lugar.{' '}
                <Link href="/pontos-turisticos" className="font-bold text-[#174c3e] hover:underline">
                  Escolha um ponto turístico
                </Link>{' '}
                para começar.
              </p>
            ) : (
              <ul className="mt-6 space-y-5">
                {mine.docs.map((review: any) => {
                  const attraction = typeof review.attraction === 'object' ? review.attraction : null
                  const status = STATUS[review.status] ?? STATUS.pending
                  return (
                    <li key={review.id} className="rounded-2xl border border-[#173e34]/10 p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        {attraction?.slug ? (
                          <Link
                            href={`/pontos-turisticos/${attraction.slug}`}
                            className="font-serif text-xl text-[#173e34] hover:underline"
                          >
                            {attraction.name}
                          </Link>
                        ) : (
                          <span className="font-serif text-xl text-[#173e34]">Ponto turístico</span>
                        )}
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${status.className}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[#d79d46]">
                        {'★'.repeat(review.rating)}
                        <span className="opacity-30">{'★'.repeat(5 - review.rating)}</span>
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[#65736d]">{review.comment}</p>
                      <div className="mt-3">
                        <DeleteReviewButton id={review.id} />
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
