import express from 'express'
import productRoutes from './routes/productRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import dotenv from 'dotenv'
import connectDB from './config/data.js'
import { notFound, errorHandler } from './middleware/errorhandler.js'
const app = express()
const PORT = process.env.PORT || 5000
dotenv.config()
connectDB()

app.use(express.json())
app.use('/api/products', productRoutes)
app.use('/api/users', usersRoutes)
app.listen(
  PORT,
  console.log(`app started ${process.env.NODE_ENV} mode at port ${PORT}`)
)
app.use(notFound)
app.use(errorHandler)
