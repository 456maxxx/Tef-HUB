import Link from 'next/link'
import { redirect } from 'next/navigation'
import { appAuth } from '@/lib/app-auth'
import { AuthForm } from '@/components/AuthForm'
import { Compass } from '@/components/Icons'
import { signupAction } from '@/app/(frontend)/actions/auth'

export const metadata = { title: 'Criar conta | TFHub' }

export default async function SignupPage() {
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
        <div className="mt-12 max-w-md">
          <p className="section-kicker">Junte-se à comunidade</p>
          <h1 className="mt-5 font-serif text-5xl leading-none text-[#173e34] sm:text-6xl">
            Crie seu diário amazônico.
          </h1>
          <p className="mt-5 text-sm leading-7 text-[#65736d]">
            Compartilhe suas experiências e ajude outros viajantes a descobrirem Tefé.
          </p>
          <AuthForm mode="cadastro" action={signupAction} />
        </div>
      </div>
      <div className="auth-image auth-image-signup">
        <div className="auth-image-caption">
          <span>Viaje com propósito</span>
          <p>Descubra. Respeite. Compartilhe.</p>
        </div>
      </div>
    </main>
  )
}
