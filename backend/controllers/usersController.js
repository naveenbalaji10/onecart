import aysncHandler from 'express-async-handler'
import User from '../models/user.js'
import generateToken from '../utils/generateToken.js'

//des login user
//route post /api/users/login
//public
const authUsers = aysncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('invalid email or password')
  }
})

//des Register user
//route post /api/users
//public
const registerUsers = aysncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const existUser = await User.findOne({ email })

  if (existUser) {
    res.status(400)
    throw new Error('user already exists')
  }
  const user = await User.create({
    name,
    email,
    password,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('invalid data')
  }
})

//des get logged in user
//route post /api/users/profile
//private
const getUserProfile = aysncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})

//des update user
//route put /api/users/profile
//private

const updateUser = aysncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})

export { authUsers, getUserProfile, registerUsers, updateUser }
