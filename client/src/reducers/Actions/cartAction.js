import { ADD_CART_ITEM, DELETE_CART_ITEM } from '../ActionTypes/cartTypes'
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
