import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAIL,
  GET_PAY_REQUEST,
  GET_PAY_SUCCESS,
  GET_PAY_FAIL,
  GET_PAY_RESET,
  GET_MYORDERS_REQUEST,
  GET_MYORDERS_SUCCESS,
  GET_MYORDERS_FAIL,
  GET_MYORDERS_RESET,
} from '../ActionTypes/orderTypes'

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      }
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      }
    case GET_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PAY_REQUEST:
      return {
        loading: true,
      }
    case GET_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case GET_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case GET_PAY_RESET:
      return {}
    default:
      return state
  }
}

const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_MYORDERS_REQUEST:
      return {
        loading: true,
      }
    case GET_MYORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case GET_MYORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case GET_MYORDERS_RESET:
      return { orders: [] }
    default:
      return state
  }
}
export { orderReducer, orderDetailsReducer, orderPayReducer, myOrdersReducer }
