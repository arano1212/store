import Product from '../models/product.js'

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    if (!product) {
      return res.status(404).json({ msg: 'error creating product' })
    }
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getAllPRoducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
    if (!products) {
      return res.status(404).json({ msg: 'Products not found' })
    }
    res.status(200).json(products)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getProductByid = async (req, res) => {
  if (!req.params.productId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json(({ msg: 'Product ID not found' }))
  }

  try {
    const product = await Product.findById({ _id: req.params.productId, isActive: true })
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateProduct = async (req, res) => {
  if (!req.params.productId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json(({ msg: 'Product ID not found' }))
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true })
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteProduct = async (req, res) => {
  if (!req.params.productId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json(({ msg: 'Product ID not found' }))
  }

  if (req.query.destroy === 'true') {
    try {
      const product = await Product
        .findByIdAndDelete(req.params.productId)
      if (!product) {
        return res.status(404).json({ msg: 'product not found' })
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.productId, { isActive: false }, { new: true })
    if (!product || !product.isActive === false) {
      return res.status(404).json({ msg: 'product not found' })
    }
    res.status(204).json()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getProductQuery = async (req, res) => {
  const queryDB = { isActive: true }

  const queryKeys = ['name']

  queryKeys.forEach(key => {
    if (req.query[key]) {
      queryDB[key] = { $regex: new RegExp(req.query[key], 'i') }
    }
  })
  try {
    const product = await Product.find(queryDB)
    if (!product) {
      return res.status(404).json({ msg: 'product no found ' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export {
  createProduct,
  getAllPRoducts,
  getProductByid,
  updateProduct,
  deleteProduct,
  getProductQuery
}
