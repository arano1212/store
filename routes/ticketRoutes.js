import express from 'express'
import { createTicket, deleteTicket, getAllTicket, getTicketById, updateTicketById } from '../controllers/ticketController.js'

const ticketRoutes = express.Router()

ticketRoutes.post('/', createTicket)
ticketRoutes.get('/', getAllTicket)
ticketRoutes.get('/:ticketId', getTicketById)
ticketRoutes.patch('/:ticketId', updateTicketById)
ticketRoutes.delete('/:ticketId', deleteTicket)

export default ticketRoutes
