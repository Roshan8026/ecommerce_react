import React , {useState} from "react";
import "./ProductDetails.css"; // Import your CSS file for styling
import { useParams, Link } from "react-router-dom"; // Importing useParams hook
import { Navbar, Container, Modal } from "react-bootstrap"; // Importing Navbar, Modal, Button from react-bootstrap
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Import the arrow left icon
import { Button ,Badge} from 'react-bootstrap';
import axios from "axios";

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility

  const handleShow = () => setShowModal(true); // Show modal
  const handleClose = () => setShowModal(false); // Close modal

  if (!product) {
    return <div>Product not found</div>;
  }
  const checkoutHandler = async (amount) => {

        const { data: { key } } = await axios.get("http://www.localhost:3001/api/getkey")

        const { data: { order } } = await axios.post("http://localhost:3001/api/checkout", {
            amount
        })

        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "6 Pack Programmer",
            description: "Tutorial of RazorPay",
            image: "https://avatars.githubusercontent.com/u/25058652?v=4",
            order_id: order.id,
            callback_url: "http://localhost:3001/api/paymentverification",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "8053818026"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            },
              method: {
                    netbanking: true,
                    card: true,
                    upi: true,
                    wallet: true,
                    emi: true
                },
        };
        const razor = new window.Razorpay(options);
        razor.open();
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
         <Button
            variant="danger"
            type="button"
            className="btn-details"
            onClick={handleShow} // Attach the handleShow function to the button's onClick event

          >
            Join Now
          </Button>
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
        <br/>
        <br/>
           <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Product Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card border p-4 rounded">
              <div className="d-flex justify-content-between p-4 bg-primary text-white text-center rounded">
                <div className="rechare">
                  <p className="user-id">0</p>
                  <p className="other-info">Recharge</p>
                </div>
                <div className="rechare">
                  <p className="user-id">0</p>
                  <p className="other-info">Recharge</p>
                </div>
                <div className="rechare">
                  <p className="user-id">0</p>
                  <p className="other-info">Recharge</p>
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
                <button className="btn btn-light bg-light border px-5">Clear</button>
                <button className="btn btn-primary bg-primary border px-5"
                  onClick={() => checkoutHandler(300)} // Wrap the function call in an arrow function
                >Confirm</button>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ProductDetails;
