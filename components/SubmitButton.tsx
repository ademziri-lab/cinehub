'use client'

import { useFormStatus } from 'react-dom'

export default function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-red-600 p-3 font-bold text-white hover:bg-red-700 disabled:opacity-50"
    >
      {pending ? 'Enregistrement...' : label}
    </button>
  )
}