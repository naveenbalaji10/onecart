import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingItem } from '../reducers/Actions/cartAction'
import CheckoutStep from '../components/CheckoutStep'

const ShippingScreen = ({ history }) => {
  //address in local storage
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalcode, setPostalcode] = useState(shippingAddress.postalcode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingItem({ address, city, postalcode, country }))
    history.push('/payment')
  }
  return (
    <FormContainer>
      <CheckoutStep step1 step2 />
      <h2>Shipping</h2>
      <Form type='submit'>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalcode'>
          <Form.Label>Postal code</Form.Label>
          <Form.Control
            type='text'
            value={postalcode}
            onChange={(e) => setPostalcode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>country</Form.Label>
          <Form.Control
            type='text'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button variant='primary' onClick={submitHandler}>
          Submit
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
