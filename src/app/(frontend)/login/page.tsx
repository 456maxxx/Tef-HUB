import Link from 'next/link'
import { redirect } from 'next/navigation'
import { appAuth } from '@/lib/app-auth'
import { AuthForm } from '@/components/AuthForm'
import { Compass } from '@/components/Icons'
import { loginAction } from '@/app/(frontend)/actions/auth'

export const metadata = { title: 'Entrar | TFHub' }

export default async function LoginPage() {
  if (await appAuth.currentUser()) redirect('/perfil')

  return (
    <main className="auth-shell">
      <div className="auth-panel">
        <Link href="/" className="inline-flex items-center gap-3 text-[#173e34]">
          <span className="grid size-10 place-items-center rounded-full border border-[#173e34]/20">
            <Compass className="size-5" />
          </span>
          <span className="font-serif text-2xl">TFHub</span>
        </Link>
        <div className="mt-16 max-w-md">
          <p className="section-kicker">Bem-vindo de volta</p>
          <h1 className="mt-5 font-serif text-5xl leading-none text-[#173e34] sm:text-6xl">
            Sua próxima descoberta começa aqui.
          </h1>
          <p className="mt-5 text-sm leading-7 text-[#65736d]">
            Entre para avaliar lugares e guardar suas melhores memórias de Tefé.
          </p>
          <AuthForm mode="login" action={loginAction} />
        </div>
      </div>
      <div className="auth-image auth-image-login">
        <div className="auth-image-caption">
          <span>Tefé, Amazonas</span>
          <p>Entre rios, floresta e encontros.</p>
        </div>
      </div>
    </main>
  )
}
