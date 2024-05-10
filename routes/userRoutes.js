import express from 'express'
import { createUser, deleteUser, getAllUsers, getUserById, updateUserById } from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.post('/admin', createUser)
userRoutes.get('/', getAllUsers)
userRoutes.get('/:userId', getUserById)
userRoutes.patch('/:userId', updateUserById)
userRoutes.delete('/:userId', deleteUser)

export default userRoutes
