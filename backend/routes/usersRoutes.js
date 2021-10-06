import express from 'express'
import {
  authUsers,
  getUserProfile,
  registerUsers,
  updateUser,
  getUsers,
  deleteUser,
  getUser,
  updateUserById,
} from '../controllers/usersController.js'
import { protect, Admin } from '../middleware/authMiddleware.js'

const router = express.Router()
router.route('/').post(registerUsers).get(protect, Admin, getUsers)
router.post('/login', authUsers)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUser)
router
  .route('/:id')
  .delete(protect, Admin, deleteUser)
  .get(protect, Admin, getUser)
  .put(protect, Admin, updateUserById)
export default router
