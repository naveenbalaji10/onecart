import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/user.js'

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_TOKEN)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('not authorized')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('not authorized')
  }
})

const Admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not autorized as a Admin')
  }
}
export { protect, Admin }
