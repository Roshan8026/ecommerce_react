import React from "react";
import "./ProductDetails.css"; // Import your CSS file for styling
import { useParams, Link } from "react-router-dom"; // Importing useParams hook
import { Navbar, Container, Nav } from "react-bootstrap"; // Importing Navbar components from react-bootstrap
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Import the arrow left icon

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        {" "}
        {/* Use bg and variant props for background color and dark theme */}
        <Container>
          <Link to="/products" className="navbar-brand">
            <FontAwesomeIcon icon={faArrowLeft} />{" "}
            {/* Use FontAwesomeIcon component to render the icon */}
            {product.name}
          </Link>
        </Container>
      </Navbar>
      <br />

      <div className="product-details">
        <div className="image-card">
          <img src={product.image} alt="Product" />
        </div>
        <br />
        <br />
        <div className="info-card">
          <div className="info-row">
            <span className="info-label">Name:</span>
            <span className="info-value">{product.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Brand:</span>
            <span className="info-value">{product.brand}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Category:</span>
            <span className="info-value">{product.category}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Price:</span>
            <span className="info-value">{product.price}</span>
          </div>
        </div>
        <b>Details</b>
        <div className="info-card">
          <div className="info-row">
            <span className="info-label">Name:</span>
            <span className="info-value">{product.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Brand:</span>
            <span className="info-value">{product.brand}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Category:</span>
            <span className="info-value">{product.category}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Price:</span>
            <span className="info-value">{product.price}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
