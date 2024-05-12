import express from 'express'
import { createUser, deleteUser, getAllUsers, getUserById, historyTicketByUser, updateUserById } from '../controllers/userController.js'
import { isAuth } from '../middlewares/isAuth.js'
import { isAdmin } from '../middlewares/isAdmin.js'

const userRoutes = express.Router()

userRoutes.post('/admin', isAuth, isAdmin, createUser)
userRoutes.get('/', isAuth, isAdmin, getAllUsers)
userRoutes.get('/:userId', isAuth, getUserById)
userRoutes.get('/:userId/tickets', isAuth, isAdmin, historyTicketByUser)
userRoutes.patch('/:userId', isAuth, isAdmin, updateUserById)
userRoutes.delete('/:userId', isAuth, isAdmin, deleteUser)

export default userRoutes
