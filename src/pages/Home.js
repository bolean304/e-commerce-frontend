import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';  // Import the CSS file

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/users/productview')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Product List</h1>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product._id}>
             {console.log("Image URL:", product.image)}
            <img src={product.image} alt={product.product_name} className="product-image" />
            <div className="product-details">
              <h2 className="product-name">{product.product_name}</h2>
              {product.price > 0 ? (
                <p className="product-price">Price: ${product.price}</p>
              ) : (
                <p className="free-product">Mannat Sar jhuka ke mangi jati</p>
              )}
              <Link to={`/product/${product._id}`} className="product-link">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
