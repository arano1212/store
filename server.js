import express from 'express'
import { connect } from './config/database.js'
import productRoutes from './routes/productRoutes.js'

const PORT = process.env.PORT || 3000

connect()

const api = express()
api.use(express.json())
api.use('/api/v1/products', productRoutes)

api.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}😇🌕 `)
})
