import Product from '../models/product.js'

const calculateTicketTotalMiddleware = async function (next) {
  try {
    const productIds = this.products
    const productQuantities = {}

    productIds.forEach(productId => {
      productQuantities[productId] = (productQuantities[productId] || 0) + 1
    })

    const products = await Product.find({ _id: { $in: productIds } })

    let subtotal = 0
    products.forEach(product => {
      const quantity = productQuantities[product._id]
      subtotal += product.price * quantity
    })

    const ivaRate = 0.16
    const iva = subtotal * ivaRate

    const total = subtotal + iva

    this.subtotal = subtotal
    this.iva = iva
    this.total = total

    next()
  } catch (error) {
    next(error)
  }
}

export default calculateTicketTotalMiddleware
