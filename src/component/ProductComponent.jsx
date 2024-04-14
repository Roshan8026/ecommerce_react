import React, { useState } from 'react';
import './ProductComponent.css'; // Import your CSS file for styling

// Sample data for products and categories
const productsData = [
  { id: 1, name: "Product 1", category: "Category A", price: "$10" },
  { id: 2, name: "Product 2", category: "Category A", price: "$15" },
  { id: 3, name: "Product 3", category: "Category B", price: "$20" },
  { id: 4, name: "Product 4", category: "Category B", price: "$25" },
  { id: 5, name: "Product 5", category: "Category C", price: "$30" },
  { id: 6, name: "Product 6", category: "Category D", price: "$35" }, // Added product for Category D
  { id: 7, name: "Product 7", category: "Category D", price: "$40" }, // Added product for Category D
  { id: 8, name: "Product 8", category: "Category E", price: "$45" }, // Added product for Category E
  { id: 9, name: "Product 9", category: "Category E", price: "$50" }, // Added product for Category E
];

const categories = Array.from(new Set(productsData.map(product => product.category)));

const Product = ({ product }) => (
  <div className="product-card">
    <h3>{product.name}</h3>
    <p>Category: {product.category}</p>
    <p>Price: {product.price}</p>
  </div>
);

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
    </div>
  );
};

export default ProductComponent;
