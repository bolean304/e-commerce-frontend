import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/users/productview/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the product!", error);
      });
  }, [id]);

  const handleAddToCart = () => {
    axios.get(`/addtocart`, { params: { product_id: id } })
      .then(response => {
        // Handle add to cart success
      })
      .catch(error => {
        console.error("There was an error adding the product to the cart!", error);
      });
  };

  return (
    <div>
      {product && (
        <>
          <h1>{product.product_name}</h1>
          <p>Price: ${product.price}</p>
          <p>Rating: {product.rating}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </>
      )}
    </div>
  );
}

export default Product;
