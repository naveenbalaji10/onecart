import express from 'express'
import {
  authUsers,
  getUserProfile,
  registerUsers,
  updateUser,
} from '../controllers/usersController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()
router.route('/').post(registerUsers)
router.post('/login', authUsers)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUser)
export default router
