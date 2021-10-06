import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import CheckoutStep from '../components/CheckoutStep'
import { createOrder } from '../reducers/Actions/orderAction'

const PlaceOrderScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { success, error, order } = orderCreate
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, success])

  // itemsprice,taxprice,shippingprice ,total price caculations
  const addDecimals = (num) => {
    return Math.round((num * 100) / 100).toFixed(2)
  }
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number(cart.itemsPrice * 0.15))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const dispatch = useDispatch()

  //place order

  const placeorderHandler = (e) => {
    e.preventDefault()
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsprice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }
  return (
    <>
      <CheckoutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city},{cart.shippingAddress.postalcode},
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            rounded
                            fluid
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {`${item.qty} * ${item.price} = ${(
                            item.qty * item.price
                          ).toFixed(2)} `}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Itemsprice:</Col>
                  <Col>{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price:</Col>
                  <Col>{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax price:</Col>
                  <Col>{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total price:</Col>
                  <Col>{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <Button
                variant='primary'
                onClick={placeorderHandler}
                className='btn-block'
              >
                Place Order
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
