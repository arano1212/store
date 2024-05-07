import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const connect = () => {
  mongoose.connect(process.env.DB_CONNECT_URI)

  const { connection } = mongoose

  connection.once('open', () => {
    console.log('database connection stablished🔦')
  })

  connection.on('error', (error) => {
    console.log('database connection error ❎', error)
  })
}

export { connect }
