import express from 'express'
import { login, register } from '../controllers/authcontroller.js'

const authRoutes = express.Router()

authRoutes.post('/register', register)
authRoutes.post('/login', login)

export default authRoutes
