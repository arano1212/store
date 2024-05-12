import express from 'express'
import morgan from 'morgan'
import { connect } from './config/database.js'
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'

const PORT = process.env.PORT || 3000

connect()

const api = express()
api.use(express.json())
api.use(morgan('tiny'))
api.use('/api/v1/products', productRoutes)
api.use('/api/v1', authRoutes)
api.use('/api/v1/users', userRoutes)
api.use('/api/v1/tickets', ticketRoutes)

api.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}😇🌕 `)
})
