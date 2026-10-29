import { register } from '@/app/actions/auth'
import SubmitButton from '@/components/SubmitButton'

export default function RegisterPage() {
  const inputClass = 'w-full rounded-xl border p-3'

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-bold">Inscription</h1>

      <form action={register} className="flex flex-col gap-3">
        <input name="name" placeholder="Nom" required className={inputClass} />
        <input name="email" type="email" placeholder="E-mail" required className={inputClass} />
        <input name="password" type="password" placeholder="Mot de passe" required minLength={6} className={inputClass} />

        <SubmitButton label="S'inscrire" />
      </form>
    </div>
  )
}