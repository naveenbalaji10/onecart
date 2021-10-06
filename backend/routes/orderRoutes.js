import {
  createNewOrder,
  getMyOrders,
  getOrder,
  updateOrder,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'
import express from 'express'
const router = express.Router()

router.route('/').post(protect, createNewOrder)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrder)
router.route('/:id/pay').put(protect, updateOrder)
export default router
