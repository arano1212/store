import express from 'express'
import { createUser, getAllUsers, getUserById } from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.post('/admin', createUser)
userRoutes.get('/', getAllUsers)
userRoutes.get('/:userId', getUserById)

export default userRoutes
