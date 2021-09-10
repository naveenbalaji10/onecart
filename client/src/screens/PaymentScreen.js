import React, { useState } from 'react'
import { Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutStep from '../components/CheckoutStep'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../reducers/Actions/cartAction'

const PaymentScreen = ({ history }) => {
  const [payment, setPayment] = useState('paypal')

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  if (!shippingAddress) {
    history.push('/shipping')
  }
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(payment))
    history.push('/placeorder')
  }
  return (
    <FormContainer>
      <CheckoutStep step1 step2 step3 />
      <h2>Payment</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-3'>
          <Form.Label as='legend'>Select payment method</Form.Label>

          <Col>
            <Form.Check
              type='radio'
              value='PayPal'
              name='paymentMethod'
              label='PayPal or Credit card'
              checked
              onChange={(e) => setPayment(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
