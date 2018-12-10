const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/guys', {
  useNewUrlParser: true
})

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  measures: {
      height: { feet: { type: Number }, inches: { type: Number } },
      weight: { type: Number },
   }
})

module.exports = mongoose.model('users', userSchema)