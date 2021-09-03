import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css'
import ProductScreen from './screens/ProductScreen'

const App = () => {
  return (
    <Router>
      <>
        <Header />
        <main className='py-3'>
          <Container>
            <Switch>
              <Route path='/' exact component={HomeScreen} />
              <Route path='/product/:_id' component={ProductScreen} />
            </Switch>
          </Container>
        </main>
        <Footer />
      </>
    </Router>
  )
}

export default App
