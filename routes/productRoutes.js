import express from 'express'

import { createProduct, deleteProduct, getAllPRoducts, getProductByid, getProductQuery, updateProduct } from '../controllers/productController.js'
import { isAuth } from '../middlewares/isAuth.js'
import { isAdmin } from '../middlewares/isAdmin.js'

const productRoutes = express.Router()

productRoutes.post('/', isAuth, isAdmin, createProduct)
productRoutes.get('/query', getProductQuery)
productRoutes.get('/', getAllPRoducts)
productRoutes.get('/:productId', isAuth, getProductByid)
productRoutes.patch('/:productId', isAuth, isAdmin, updateProduct)
productRoutes.delete('/:productId', isAuth, isAdmin, deleteProduct)

export default productRoutes
