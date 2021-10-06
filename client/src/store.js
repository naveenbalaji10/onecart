import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/reducers/productReducer'
import { cartReducer } from './reducers/reducers/cartReducer'
import {
  userReducer,
  registerReducer,
  userDetailsReducer,
  userProfileReducer,
  userListReducer,
  userDeleteReducer,
} from './reducers/reducers/userReducers'
import {
  orderReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrdersReducer,
} from './reducers/reducers/orderReducer'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userReducer,
  registerLogin: registerReducer,
  userDetails: userDetailsReducer,
  adminUsers: userListReducer,
  userDelete: userDeleteReducer,
  updateProfile: userProfileReducer,
  orderCreate: orderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrdersList: myOrdersReducer,
})
const cartItemsStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
const shippingStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}
const initialState = {
  cart: {
    cartItems: cartItemsStorage,
    shippingAddress: shippingStorage,
  },
  userLogin: {
    userInfo: userInfoStorage,
  },
}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
