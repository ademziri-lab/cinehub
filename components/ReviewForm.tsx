import { addReview } from '@/app/actions/review'
import SubmitButton from '@/components/SubmitButton'

export default function ReviewForm({ movieId }: { movieId: string }) {
  return (
    <form action={addReview} className="flex flex-col gap-3">
      <input type="hidden" name="movieId" value={movieId} />

      <select name="rating" required className="rounded-xl border p-3 dark:bg-gray-800">
        <option value="">Votre note</option>
        <option value="5">⭐⭐⭐⭐⭐ (5)</option>
        <option value="4">⭐⭐⭐⭐ (4)</option>
        <option value="3">⭐⭐⭐ (3)</option>
        <option value="2">⭐⭐ (2)</option>
        <option value="1">⭐ (1)</option>
      </select>

      <textarea
        name="comment"
        placeholder="Votre avis sur ce film..."
        required
        className="rounded-xl border p-3"
      />

      <SubmitButton label="Publier mon avis" />
    </form>
  )
}