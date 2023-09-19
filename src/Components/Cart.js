import React from 'react';
import { Container, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import API from '../Api';

const CartPage = () => {
  // const handleRemoveFromCart = (product) => {
  //   removeFromCart(product);
  // };
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/cart/cartProducts`)
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  const handleRemoveFromCart = (id) => {
    axios
      .delete(`${API}/cart/${id}`)
      .then(() => {
        const updatedCartItems = cart.filter((cartItem) => cartItem.id !== id);
        setCart(updatedCartItems);
        alert('Product removed from cart');
      })
      .catch((error) => {
        console.error('Error removing product from cart:', error);
      });
  };


  const cartMessage =
    cart.length === 0 ? (
      <p>Your Cart is empty</p>
    ) : (
      <p>Your Cart contains {cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
    );

  return (
    <div className="p-4">
      <Container className="custom-container">
        <h1 className="text-center">
          <Link to="/">Shopping Cart</Link>
        </h1>
        {cartMessage}
        {cart.map((cartItem) => (
          <Col key={cartItem.id}>
            <Card>
            <Card.Title>{cartItem.name}</Card.Title>
              <Card.Body>
              <Card.Img variant="top" src={cartItem.image} style={{ width: '100px', height: '100px' }} />
              <Card.Text>Price: ${cartItem.price}</Card.Text>
                <Card.Text>Rating: {cartItem.rating}</Card.Text>
                <div className="product-button">
                <button onClick={() => handleRemoveFromCart(cartItem.id)}>Remove</button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Container>
    </div>
  );
};

export default CartPage;
