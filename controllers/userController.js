import User from '../models/user.js'

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
    const users = await User.find()
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

export {
  getAllUsers,
  createUser,
  getUserById
}
