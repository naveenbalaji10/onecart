import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/profileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'

const App = () => {
  return (
    <Router>
      <>
        <Header />
        <main className='py-3'>
          <Container>
            <Switch>
              <Route path='/register' component={RegisterScreen} />
              <Route path='/login' component={LoginScreen} />
              <Route path='/' exact component={HomeScreen} />
              <Route path='/profile' component={ProfileScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/payment' component={PaymentScreen} />
              <Route path='/placeorder' component={PlaceOrderScreen} />
              <Route path='/product/:_id' component={ProductScreen} />
              <Route path='/cart/:_id?' component={CartScreen} />
            </Switch>
          </Container>
        </main>
        <Footer />
      </>
    </Router>
  )
}

export default App
