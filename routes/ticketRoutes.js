import express from 'express'
import { createTicket, getAllTicket } from '../controllers/ticketController.js'

const ticketRoutes = express.Router()

ticketRoutes.post('/', createTicket)
ticketRoutes.get('/', getAllTicket)

export default ticketRoutes
