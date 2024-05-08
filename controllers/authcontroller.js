import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple'

const register = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ msg: 'email and password are required' })
    }
    const saltRounds = 10

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    req.body.password = hashedPassword

    const newUser = await User.create(req.body)

    newUser.password = undefined

    return res.status(201).json({
      msg: 'user created succesfully',
      newUser
    })
  } catch (error) {
    return res.status(400).json({ msg: `error creating register, ${error.message}` })
  }
}

const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ msg: 'email and password are required' })
    }
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).json({ msg: ' user or password error' })
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'user or password error' })
    }
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000 + (60 * 60 * 24 * 7))
    }
    const token = jwt.encode(payload, process.env.SECRET)
    return res.status(200).json({ msg: 'login succesfully', token })
  } catch (error) {
    res.status(404).json({ msg: 'data error' })
  }
}

export {
  register,
  login

}
