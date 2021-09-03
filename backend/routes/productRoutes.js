import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/product.js'
const router = express.Router()

//des    get all products
// route  GET /api/products
//access  public

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

//des get one product
//route GET /api/products/:_id
//access public

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)
export default router
