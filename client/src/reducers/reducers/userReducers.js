import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_RESET,
  USER_DETAILS_RESET,
  USERSLIST_REQUEST,
  USERSLIST_SUCCESS,
  USERSLIST_FAIL,
  USERSLIST_RESET,
  USERSREMOVE_REQUEST,
  USERSREMOVE_SUCCESS,
  USERSREMOVE_FAIL,
} from '../ActionTypes/userTypes'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      }
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        loading: true,
      }
    case REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      }
    case USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_DETAILS_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
}

const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return {
        loading: true,
      }
    case USER_PROFILE_SUCCESS:
      return {
        success: true,
        loading: false,
        user: action.payload,
      }
    case USER_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USERSLIST_REQUEST:
      return {
        loading: true,
      }
    case USERSLIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      }
    case USERSLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USERSLIST_RESET:
      return { users: [] }
    default:
      return state
  }
}
const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USERSREMOVE_REQUEST:
      return {
        loading: true,
      }
    case USERSREMOVE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case USERSREMOVE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export {
  userReducer,
  registerReducer,
  userDetailsReducer,
  userProfileReducer,
  userListReducer,
  userDeleteReducer,
}
