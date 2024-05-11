import User from '../models/user.js'
import Ticket from '../models/ticket.js'

const createUser = async (req, res) => {
  try {
    const user = await

    User.create(req.body)
    if (!user) {
      return res.status(400).json({ msg: 'data is missing' })
    }
    res.status(201).json(user)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
    if (!users) {
      return res.status(404).json({ msg: 'users noy found' })
    }
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const getUserById = async (req, res) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}/)) {
    return res.status(400).json({ msg: 'invalid user ID' })
  }
  try {
    const user = await User.findById({ _id: req.params.userId, isActive: true })
    if (!user) {
      return res.status(404).json({ msg: 'user no found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const updateUserById = async (req, res) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}/)) {
    return res.status(400).json({ msg: 'invalid user ID' })
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    if (!user) {
      return res.status(404).json({ msg: 'user no found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const deleteUser = async (req, res) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json(({ msg: 'Product ID not found' }))
  }

  if (req.query.destroy === 'true') {
    try {
      const user = await User
        .findByIdAndDelete(req.params.userId)
      if (!user) {
        return res.status(404).json({ msg: 'user not found' })
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isActive: false }, { new: true })
    if (!user || !user.isActive === false) {
      return res.status(404).json({ msg: 'user not found' })
    }
    res.status(204).json()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const historyTicketByUser = async (req, res) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}/)) {
    return res.status(400).json({ msg: 'invalid user ID' })
  }
  try {
    const userId = req.params.userId
    const tickets = await Ticket.find({ seller: userId })
      .populate('products', 'name price').populate('seller', 'firstName lastName dni rol')
    if (!tickets || !tickets.length === 0) {
      return res.status(404).json({ msg: 'user and tickets no found' })
    }
    res.status(200).json(tickets)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

export {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUser,
  historyTicketByUser
}
