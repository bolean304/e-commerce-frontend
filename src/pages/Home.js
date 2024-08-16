import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/users/productview')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <div>
        {products.map(product => (
          <div key={product._id}>
            <h2>{product.product_name}</h2>
            <p>Price: ${product.price}</p>
            <Link to={`/product/${product._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
