import {
  ADD_CART_ITEM,
  DELETE_CART_ITEM,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ITEM,
} from '../ActionTypes/cartTypes'
import axios from 'axios'

export const addCartItem = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)
  dispatch({
    type: ADD_CART_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      price: data.price,
      image: data.image,
      countInStock: data.countInStock,
      qty,
    },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const deleteCartItem = (id) => async (dispatch, getState) => {
  dispatch({ type: DELETE_CART_ITEM, payload: id })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingItem = (data) => async (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_ITEM, payload: data })
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({ type: SAVE_PAYMENT_METHOD, payload: data })
  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
