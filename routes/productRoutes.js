import express from 'express'
import { createProduct, deleteProduct, getAllPRoducts, getProductByid, updateProduct } from '../controllers/productController.js'

const productRoutes = express.Router()

productRoutes.post('/', createProduct)
productRoutes.get('/', getAllPRoducts)
productRoutes.get('/:productId', getProductByid)
productRoutes.patch('/:productId', updateProduct)
productRoutes.delete('/:productId', deleteProduct)

export default productRoutes
