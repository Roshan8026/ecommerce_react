import React, { useState } from 'react';
import './ProductComponent.css'; // Import your CSS file for styling
import { Button ,Badge} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

// Sample data for products and categories
const productsData = [
  { id: 1, name: "Product 1", category: "Category A", price: "$10", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Product 2", category: "Category A", price: "$15", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Product 3", category: "Category B", price: "$20", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Product 4", category: "Category B", price: "$25", image: "https://via.placeholder.com/150" },
  { id: 5, name: "Product 5", category: "Category C", price: "$30", image: "https://via.placeholder.com/150" },
  { id: 6, name: "Product 6", category: "Category D", price: "$35", image: "https://via.placeholder.com/150" }, // Added product for Category D
  { id: 7, name: "Product 7", category: "Category D", price: "$40", image: "https://via.placeholder.com/150" }, // Added product for Category D
  { id: 8, name: "Product 8", category: "Category E", price: "$45", image: "https://via.placeholder.com/150" }, // Added product for Category E
  { id: 9, name: "Product 9", category: "Category E", price: "$50", image: "https://via.placeholder.com/150" }, // Added product for Category E
];

const categories = Array.from(new Set(productsData.map(product => product.category)));

const Product = ({ product }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/product-details/${product.id}`, { state: { product } });
  };

  return (


<>
<div className="container">
  <div className="row ">
    <div className="col-md-4">
      <div className="card border p-4 rounded">
        <div className='d-flex justify-content-between p-4 bg-primary text-white text-center rounded'>
        <div class="rechare">
          <p class="user-id">0</p>
          <p class="other-info">Recharge</p>
          </div>
          <div class="rechare">
          <p class="user-id">0</p>
          <p class="other-info">Recharge</p>
          </div>
          <div class="rechare">
          <p class="user-id">0</p>
          <p class="other-info">Recharge</p>
          </div>
        </div>
        <div className='content-product d-flex justify-content-between px-2 pt-3'>
          <h6 className='text-muted'>Title</h6>
          <p>aaaa</p>
        </div>
        <div className='content-product d-flex justify-content-between px-2'>
          <h6 className='text-muted'>Price</h6>
          <p>1000 Rs.</p>
        </div>
        <div className='content-product d-flex justify-content-between px-2'>
          <h6 className='text-muted'>Coupon</h6>
          <p>Select Coupon</p>
        </div>
        <div className='content-product d-flex justify-content-between px-2'>
          <h6 className='text-muted'>Final Price</h6>
          <p>1000 Rs.</p>
        </div>
      <div className='d-flex justify-content-between px-2'>
        <button className='btn btn-light bg-light border px-5'>Clear</button>
        <button className='btn btn-primary bg-primary border px-5'>Confirm</button>

      </div>
      </div>
    </div>
  </div>
</div>

    
    <div className="product-card d-none">
      <div className="product-image">
        <img className="products-image" src={product.image} alt={product.name} />
      </div>
      <div className="product-details">
      <div className="row">
        <div className="col product-name">
          <h3>{product.name}</h3>
        </div>
        <div className="col-auto">
          <Badge bg="success">New</Badge>
        </div>
      </div>     
         <p>Category: <b>{product.category}</b></p>
        <p>Category: <b>{product.category}</b></p>
        <p>Category: <b>{product.category}</b></p>
        <p>Price: <b>{product.price}</b></p>
        <Button
          variant="danger"
          type="button"
          className="btn-details"
          onClick={handleDetailsClick}
        >
          Details
        </Button>
      </div>

    </div>
    </>
  );
};

const ProductComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); // Initially select the first category

  const filteredProducts = productsData.filter(product => product.category === selectedCategory);

  return (
    <div className="product-container">
      <div className="category-list">
        <div className="category-row">
          {categories.map(category => (
            <div
              key={category}
              className={`category ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default ProductComponent;
