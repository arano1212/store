import mongoose from 'mongoose'

const userEnum = ['customer', 'admin', 'employee']

const userSchema = new mongoose.Schema({
  dni: {
    type: Number,
    unique: true,
    default: function () {
      return Math.floor(Math.random() * 10000000)
    }
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (email) {
        return /\S+@\S+\.\S+/.test(email)
      },
      message: props => `${props.value} no es un correo electronico valido`
    }
  },
  password: { type: String, required: true },
  rol: {
    type: String,
    required: true,
    default: 'customer',
    enum: userEnum
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model('User', userSchema)
