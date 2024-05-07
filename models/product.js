import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number },
  imgUrl: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model('Product', productSchema)
