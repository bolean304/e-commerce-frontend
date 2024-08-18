import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/user/cart')
      .then(response => {
        setCartItems(response.data.usercart);
      })
      .catch(error => {
        console.error("There was an error fetching the cart items!", error);
      });
  }, []);

  const handleRemoveItem = (productId) => {
    axios.get(`/removeitem`, { params: { product_id: productId } })
      .then(response => {
        // Handle remove item success
      })
      .catch(error => {
        console.error("There was an error removing the item from the cart!", error);
      });
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.map(item => (
        <div key={item._id}>
          <h2>{item.product_name}</h2>
          <p>Price: ${item.price}</p>
          <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
        </div>
      ))}
      <button>Proceed to Checkout</button>
    </div>
  );
}

export default Cart;
