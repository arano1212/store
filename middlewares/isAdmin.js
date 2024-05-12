const isAdmin = (req, res, next) => {
  if (req.role === 'admin') {
    next()
  } else {
    return res.status(403).json({ msg: 'you do not have the neccesary permisions' })
  }
}

export { isAdmin }
