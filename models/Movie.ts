import mongoose, { Schema, models } from 'mongoose'

const MovieSchema = new Schema({
  title: { type: String, required: true },
  poster: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  director: { type: String, required: true },
  duration: { type: Number, required: true },
  averageRating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

export const Movie = models.Movie || mongoose.model('Movie', MovieSchema)