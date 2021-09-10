import {
  ADD_CART_ITEM,
  DELETE_CART_ITEM,
  SAVE_SHIPPING_ITEM,
  SAVE_PAYMENT_METHOD,
} from '../ActionTypes/cartTypes'

const initialState = {
  cartItems: [],
  shippingAddress: {},
}
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find((x) => x.product === item.product)
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case DELETE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }
    case SAVE_SHIPPING_ITEM:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    default:
      return state
  }
}
