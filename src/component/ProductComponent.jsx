import React, { useState, useEffect } from "react";
import "./ProductComponent.css"; // Import your CSS file for styling
import { Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Product = ({ product }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    console.log("Product ", product);
    navigate(`/product-details/${product.id}`);
    console.log(
      "product image -> ",
      `http://localhost:3001/${product.img_url}`
    );
  };

  return (
    <>
      {/* <div className="container d-none">
        <div className="row ">
          <div className="col-md-4">
            <div className="card border p-4 rounded">
              <div className="d-flex justify-content-between p-4 bg-primary text-white text-center rounded">
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
              <div className="content-product d-flex justify-content-between px-2 pt-3">
                <h6 className="text-muted">Title</h6>
                <p>aaaa</p>
              </div>
              <div className="content-product d-flex justify-content-between px-2">
                <h6 className="text-muted">Price</h6>
                <p>1000 Rs.</p>
              </div>
              <div className="content-product d-flex justify-content-between px-2">
                <h6 className="text-muted">Coupon</h6>
                <p>Select Coupon</p>
              </div>
              <div className="content-product d-flex justify-content-between px-2">
                <h6 className="text-muted">Final Price</h6>
                <p>1000 Rs.</p>
              </div>
              <div className="d-flex justify-content-between px-2">
                <button className="btn btn-light bg-light border px-5">
                  Clear
                </button>
                <button className="btn btn-primary bg-primary border px-5">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="product-card">
        <div className="product-image">
          <img
            className="products-image"
            src={`http://localhost:3001/${product.img_url}`}
            alt={product.title}
            style={{ width: "75%" }}
          />
        </div>

        <div className="product-details">
          <div className="row">
            <div className="col product-name">
              <h3>{product.title}</h3>
            </div>
            <div className="col-auto">
              <Badge bg="success">New</Badge>
            </div>
          </div>
          <p>
            Daily Income: <b>{product.daily_income}</b>
          </p>
          <p>
            Validity Period: <b>{product.validity_period}</b>
          </p>
          <p>
            Total Income: <b>{product.total_revenue}</b>
          </p>
          <p>
            Price: <b>{product.price}</b>
          </p>
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
  const [selectedCategory, setSelectedCategory] = useState(); // Initially select the first category
  const [productsData, setProductsData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/all_title_products`
        );
        console.log(response.data);
        setProductsData(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const category = Array.from(
      new Set(productsData.map((product) => product.product_title_id))
    );
    // console.log("first11",category)
    setCategories(category);
    setSelectedCategory(category[0]);
  }, [productsData]);

  const filteredProducts = productsData.filter(
    (product) => product.product_title_id === selectedCategory
  );

  return (
    <div className="product-container">
      <div className="category-list">
        <div className="category-row">
          {categories.map((category) => (
            <div
              key={category}
              className={`category ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {[
                "Category E",
                "Category A",
                " Category B",
                "Category C",
                "Category D",
              ][category] || "Category E"}
            </div>
          ))}
        </div>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
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
