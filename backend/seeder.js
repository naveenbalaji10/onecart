import dotenv from 'dotenv'
import connectDB from './config/data.js'
import User from './models/user.js'
import Product from './models/product.js'
import Order from './models/orders.js'
import users from './data/user.js'
import products from './data/products.js'

dotenv.config()
connectDB()

const importdata = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id
    const adminProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })
    await Product.insertMany(adminProducts)
    console.log('Data imported')
    process.exit()
  } catch (error) {
    console.log(`${error}`)
    process.exit(1)
  }
}

const deleteData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    console.log('Data deleted')
  } catch (error) {
    console.log(`${error}`)
  }
}

if (process.argv[2] === '-d') {
  deleteData()
} else {
  importdata()
}
