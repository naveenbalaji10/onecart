import Order from '../models/orders.js'
import aysncHandler from 'express-async-handler'

//des create new orders
//route post /api/orders
//private
const createNewOrder = aysncHandler(async (req, res) => {
  const {
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderItems,
    shippingAddress,
    paymentMethod,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('Your cart is empty')
    return
  } else {
    const order = new Order({
      user: req.user._id,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderItems,
      shippingAddress,
      paymentMethod,
    })
    const saveOrder = await order.save()
    res.status(201).json(saveOrder)
  }
})

//des get order by id
//route post /api/orders/:id
//private

const getOrder = aysncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'email name'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('order not found')
  }
})

//des update order status
//route put /api/orders/:id/pay
//private

const updateOrder = aysncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedOrder = await order.save()
    res.send(updatedOrder)
  } else {
    res.status(400)
    throw new Error('order not found')
  }
})

//des get users s orders
//route put /api/orders/myorders
//private

const getMyOrders = aysncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  if (orders) {
    res.json(orders)
  } else {
    res.status(400)
    throw new Error('order not found')
  }
})

export { createNewOrder, getOrder, updateOrder, getMyOrders }
