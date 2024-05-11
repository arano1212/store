import express from 'express'
import { createUser, deleteUser, getAllUsers, getUserById, historyTicketByUser, updateUserById } from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.post('/admin', createUser)
userRoutes.get('/', getAllUsers)
userRoutes.get('/:userId', getUserById)
userRoutes.get('/:userId/tickets', historyTicketByUser)
userRoutes.patch('/:userId', updateUserById)
userRoutes.delete('/:userId', deleteUser)

export default userRoutes
