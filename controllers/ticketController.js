import Product from '../models/product.js'
import Ticket from '../models/ticket.js'
import calculateTicketTotalMiddleware from '../middlewares/calculateTicket.js'

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
    if (!tickets) {
      return res.status(404).json({ msg: 'tickets not found' })
    }
    res.status(200).json(tickets)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const getTicketById = async (req, res) => {
  if (!req.params.ticketId.match(/^[0-9a-fA-F]{24}/)) {
    return res.status(400).json({ msg: 'invalid user ID' })
  }
  try {
    const ticket = await Ticket.findById({ _id: req.params.ticketId, isActive: true })
    if (!ticket) {
      return res.status(404).json({ msg: 'ticket no found' })
    }
    res.status(200).json(ticket)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const updateTicketById = async (req, res) => {
  if (!req.params.ticketId.match(/^[0-9a-fA-F]{24}/)) {
    return res.status(400).json({ msg: 'invalid user ID' })
  }
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
    const ticket = await Ticket.findByIdAndUpdate(req.params.ticketId, req.body, { new: true })
    if (!ticket) {
      return res.status(404).json({ msg: 'ticket no found' })
    }
    await calculateTicketTotalMiddleware.call(ticket, () => {})
    res.status(200).json(ticket)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const deleteTicket = async (req, res) => {
  if (!req.params.ticketId.match(/^[0-9a-fA-F]{24}/)) {
    return res.status(400).json({ msg: 'invalid user ID' })
  }

  if (req.query.destroy === 'true') {
    try {
      const ticket = await Ticket.findByIdAndDelete(req.params.ticketId)
      if (!ticket) {
        return res.status(404).json({ msg: 'ticket no found' })
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.ticketId,
      { isActive: false },
      { new: false }
    )
    if (!ticket) {
      return res.status(404).json({ msg: 'ticket no found' })
    }
    res.status(204).json()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export {
  createTicket,
  getAllTicket,
  getTicketById,
  updateTicketById,
  deleteTicket
}
