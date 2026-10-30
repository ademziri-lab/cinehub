'use client'

import { useSession } from 'next-auth/react'
import { updateProfile } from '@/app/actions/auth'
import SubmitButton from '@/components/SubmitButton'

export default function ProfileForm({ name }: { name: string }) {
  const { update } = useSession()

  async function handleSubmit(formData: FormData) {
    await updateProfile(formData)
    await update({ name: formData.get('name') })
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-3">
      <input
        name="name"
        defaultValue={name}
        required
        className="w-full rounded-xl border p-3"
      />
      <SubmitButton label="Enregistrer" />
    </form>
  )
}