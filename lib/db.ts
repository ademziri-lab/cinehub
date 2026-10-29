import mongoose from 'mongoose'

let isConnected = false 

export async function connectDB() {
  if (isConnected) {
    console.log('MongoDB est déjà connecté')
    return
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string)

    isConnected = true
    console.log('Connecté à MongoDB :', db.connection.name)
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB :', error)
  }
}