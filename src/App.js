import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import AddProduct from './Components/AddProduct';


function App() {

  const [cart, setCart] = useState([]);
  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };


  return (
    <div>
     <BrowserRouter>
            <Routes>
                <Route exact path='/' element = {<ProductList />} />
                <Route path='/Cart' element = {<Cart cart={cart} removeFromCart={removeFromCart}/>} />
                <Route exact path='/addproduct' element = {<AddProduct/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
