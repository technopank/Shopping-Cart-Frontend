// ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Col, Card } from 'react-bootstrap';
import API from '../Api';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  // const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get(`${API}/products/`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  const handleAddToCart = (id) => {
    axios
      .post(`${API}/cart/${id}`)
      .then((response) => {
        navigate('/cart');
       alert('Product added to cart');
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  };


  const handleRedirect = () => {
    navigate('/cart');
  };

  return (
    <div className="p-4">
      <Container className="custom-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">Shopping Cart</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="btn btn-primary" href="/addProduct">Add Product</a>
              </li>
            </ul>
          </div>
        </nav>
        {products.map((product) => (
          <Col key={product.id}>
            <Card>
              <Card.Title style={{ padding: '10px' }}>{product.name}</Card.Title>
              <Card.Body>
                <Card.Img variant="top" src={product.image} style={{ width: '100px', height: '100px' }} />
                <Card.Text>Price: ${product.price}</Card.Text>
                <Card.Text>Rating: {product.rating}</Card.Text>
                <div className="product-button">
                  <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                  <button className="btn btn-info" onClick={handleRedirect}>Go to Cart</button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Container>
    </div>
  );
};

export default ProductList;
