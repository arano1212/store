import express from 'express'
import { createProduct, deleteProduct, getAllPRoducts, getProductByid, getProductQuery, updateProduct } from '../controllers/productController.js'

const productRoutes = express.Router()

productRoutes.post('/', createProduct)
productRoutes.get('/query', getProductQuery)
productRoutes.get('/', getAllPRoducts)
productRoutes.get('/:productId', getProductByid)
productRoutes.patch('/:productId', updateProduct)
productRoutes.delete('/:productId', deleteProduct)

export default productRoutes
