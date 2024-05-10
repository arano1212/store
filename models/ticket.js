import mongoose from 'mongoose'
import calculateTicketTotalMiddleware from '../middlewares/calculateTicket.js'
import updateTicket from '../middlewares/updateStockProduct.js'

const ticketSchema = new mongoose.Schema({
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  subtotal: { type: Number, default: 0 },
  iva: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  seller: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

ticketSchema.pre('save', async function (next) {
  try {
    await calculateTicketTotalMiddleware.call(this, next)
    await updateTicket.call(this, next)
    next()
  } catch (error) {
    next(error)
  }
})

export default mongoose.model('Ticket', ticketSchema)
