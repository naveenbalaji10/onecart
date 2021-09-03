import mongoose from 'mongoose'
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`mongoDb connected :${connect.connection.host}`)
  } catch (error) {
    console.log(error.message)
  }
}
export default connectDB