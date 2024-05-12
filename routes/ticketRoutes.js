import express from 'express'
import { createTicket, deleteTicket, getAllTicket, getTicketById, updateTicketById } from '../controllers/ticketController.js'
import { isAuth } from '../middlewares/isAuth.js'

const ticketRoutes = express.Router()

ticketRoutes.post('/', isAuth, createTicket)
ticketRoutes.get('/', isAuth, getAllTicket)
ticketRoutes.get('/:ticketId', isAuth, getTicketById)
ticketRoutes.patch('/:ticketId', isAuth, updateTicketById)
ticketRoutes.delete('/:ticketId', isAuth, deleteTicket)

export default ticketRoutes
