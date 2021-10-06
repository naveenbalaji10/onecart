import axios from 'axios'
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
  USER_DETAILS_RESET,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USERSLIST_REQUEST,
  USERSLIST_SUCCESS,
  USERSLIST_FAIL,
  USERSLIST_RESET,
  USERSREMOVE_REQUEST,
  USERSREMOVE_SUCCESS,
  USERSREMOVE_FAIL,
} from '../ActionTypes/userTypes'
import { GET_MYORDERS_RESET } from '../ActionTypes/orderTypes'

const Login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const Logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: GET_MYORDERS_RESET })
  dispatch({ type: USERSLIST_RESET })
}

const Register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )
    dispatch({ type: REGISTER_SUCCESS, payload: data })
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
const getDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`api/users/${id}`, config)

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`api/users/profile`, user, config)

    dispatch({ type: USER_PROFILE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const getAdminUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USERSLIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/api/users', config)

    dispatch({ type: USERSLIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USERSLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USERSREMOVE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`/api/users/${id}`, config)

    dispatch({ type: USERSREMOVE_SUCCESS })
  } catch (error) {
    dispatch({
      type: USERSREMOVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export {
  Login,
  Logout,
  Register,
  getDetails,
  updateUserProfile,
  getAdminUsers,
  deleteUser,
}
