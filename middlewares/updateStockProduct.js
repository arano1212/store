import Product from '../models/product.js'

const updateTicket = async function (next) {
  try {
    const productIds = this.products
    const productQuantities = {}
    productIds.forEach(productId => {
      productQuantities[productId] = (productQuantities[productId] || 0) + 1
    })

    const products = await Product.find({ _id: { $in: productIds } })

    products.forEach(product => {
      const quantity = productQuantities[product._id]
      product.stock -= quantity
    })

    await Promise.all(products.map(product => product.save()))

    next()
  } catch (error) {
    next(error)
  }
}

export default updateTicket
