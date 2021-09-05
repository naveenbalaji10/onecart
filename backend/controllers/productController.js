import asyncHandler from 'express-async-handler'
import Product from '../models/product.js'

//des    get all products
// route  GET /api/products
//access  public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

//des get one product
//route GET /api/products/:_id
//access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
export { getProducts, getProductById }
