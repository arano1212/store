import Product from '../models/product.js'
import Ticket from '../models/ticket.js'

const createTicket = async (req, res) => {
  try {
    const productsWithLowStock = await Product.find({ _id: { $in: req.body.products }, stock: { $lt: 1 } })
    const productsWithInsufficientStock = req.body.products.filter(productId => {
      const product = productsWithLowStock.find(p => p._id.toString() === productId.toString())
      const quantityRequested = req.body.products.filter(p => p === productId).length
      return product && product.stock < quantityRequested
    })

    if (productsWithInsufficientStock.length > 0) {
      const productIdsWithInsufficientStock = productsWithInsufficientStock.map(product => product._id)
      return res.status(400).json({ msg: `It is not possible to create the ticket, insufficient stock for product(s) with ID(s): ${productIdsWithInsufficientStock.join(', ')}` })
    }

    const stockEmpty = await Product.find({ _id: { $in: req.body.products }, stock: 0 })
    if (stockEmpty.length > 0) {
      const productIdsWithEmptyStock = stockEmpty.map(product => product._id)
      return res.status(400).json({ msg: `It is not possible to create the ticket, empty stock for product(s) with ID(s): ${productIdsWithEmptyStock.join(', ')}` })
    }

    const productsInTicket = req.body.products
    for (const productId of productsInTicket) {
      const product = await Product.findById(productId)
      const quantityRequested = productsInTicket.filter(p => p === productId).length
      if (!product || product.stock < quantityRequested) {
        return res.status(400).json({ msg: `It is not possible to create the ticket, insufficient stock for product with ID: ${productId}` })
      }
    }

    const ticket = await Ticket.create(req.body)
    res.status(201).json(ticket)
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Error while creating the ticket' })
  }
}

const getAllTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find({ isActive: true }).populate('products', 'name price')
    res.status(200).json(tickets)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

export {
  createTicket,
  getAllTicket
}
