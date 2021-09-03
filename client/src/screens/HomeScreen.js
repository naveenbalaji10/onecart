import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ProductItem from '../components/ProductItem'
import axios from 'axios'

const HomeScreen = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('/api/products')
      setProducts(res.data)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <h3>Latest products</h3>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
