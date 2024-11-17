import React, { useState, useEffect } from "react";
import "./ProductDetails.css"; // Import your CSS file for styling
import { useParams, Link } from "react-router-dom"; // Importing useParams hook
import { Navbar, Container, Modal } from "react-bootstrap"; // Importing Navbar, Modal, Button from react-bootstrap
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Import the arrow left icon
import { Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { json, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); // Initialize product state as null
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const [myDetail, setMyDetail] = useState();
  let token = localStorage.getItem("token");
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/product_details/${id}`);
        console.log(response.data);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();

     const MyDetail = async() => {
          console.log('userDetail',user.user.id)
          await FetchMyDetail(user.user.id)
      }

      MyDetail();

  }, [id]); // The effect depends on the product ID

  const handleShow = () => setShowModal(true); // Show modal
  const handleClose = () => setShowModal(false); // Close modal

   const CreateOrder = async () => {
      // Simulate API call for CreateOrder
      try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/create_order`, {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}` // Replace `yourToken` with the actual token variable
          },
          body: JSON.stringify({ 
              product_Id: id,
          }),
      });
      console.log('CreateOrder response', response)
      // Parse the response body as JSON
      const data = await response.json();

        // Return both the status and the response body
        return {
          status: response.status,
          data,
        };
      } catch (error) {
       console.error("CreateOrder failed", error);
       toast.error("CreateOrder failed. Please try again.");
        return {
          status: 500,
          data: { error: "Internal Server Error" },
        };
      }
  };

  const BuyProducts = async (amount) => {
    console.log('amount', amount);
    if(amount < myDetail.balance ) {
        const OrderResponse = await CreateOrder();

        console.log('OrderResponse', OrderResponse)
        console.log('OrderResponse.data', OrderResponse.data)
        if (OrderResponse.status === 200 || OrderResponse.status === 201) {
            toast.success('Order created successfully');
            setTimeout(() => {
                navigate('/my-components');
            },2000)
        } else {
             toast.error(OrderResponse.data.error || "Something went wrong");
        }
        
    } else {
      toast.error("Insufficient balance. Please recharge");
    }
  };

  const FetchMyDetail = async (id) => {
  // Simulate API call for FetchTeamUser
    try {
          const url = new URL(`${process.env.REACT_APP_API_BASE_URL}/api/my_details/${id}`);
          const response = await fetch(url, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `${token}`, // Ensure the token is prefixed with "Bearer"
              },
          });

          if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
          }

          const data = await response.json(); // Assuming the response is in JSON format
          console.log('FetchMyDetail response', data);
          setMyDetail(data)
          return data;
      } catch (error) {
          console.error("FetchMyDetail failed", error);
          return { status: 500 }; // Return a failure status
      }
  };

  if (!product) {
    return <div>Loading product details...</div>; // Display loading state if product details are not yet loaded
  }

  return (
    <div className="product-main">
       <ToastContainer />
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Link to="/products" className="navbar-brand">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Products
          </Link>
        </Container>
      </Navbar>
      <br />

      <div>
      <div className="image-card product-details">
          <img src={`http://localhost:3001/${product.img_url}`} alt="Product" />
          
        </div>
        <br />
        <div className="info-card product-details">
          <div className="info-row">
            <span className="info-label">Name:</span>
            <span className="info-value">{product.title}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Validity:</span>
            <span className="info-value">{product.validity_period}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Category:</span>
            <span className="info-value">{product.product_title_id==1?"Category A":product.product_title_id==2?"Category B":product.product_title_id==3?"Category C":product.product_title_id==4?"Category D":"Category E"}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Price:</span>
            <span className="info-value">{product.price}</span>
          </div>
        
        </div>

        <b>Details</b>

        <div className="info-card product-details">
          <div className="info-row">
            <div className="info-label">✅{product.title}  {product.price}Rs; Daily Income {product.daily_income}Rs, Total Income {product.total_revenue}Rs, Contract Period {product.validity_period} days</div><br/><br/>
          </div>  
          <div className="info-row">   
            <div className="info-label">Purchase limit: {product.purchase_limit}</div><br/><br/>
          </div>  
          <div className="info-row">   
            <div className="info-label">💰Invitation Bonus: {product.invitation_bonus}</div><br/><br/>
          </div>  
          <div className="info-row">  
            <div className="info-label">💰Purchase Bonus: {product.purchase_bonus}</div><br/><br/>
          </div>  
          <div className="info-row">  
            <div className="info-label">Lucky Draw: {product.lucky_draw}</div><br/><br/>
          </div>
          <div className="info-row">  
            <div className="info-label">1️⃣ (%) A-level team bonus Rs</div><br/><br/>
          </div>
          {/* <div className="info-row">  
            <div className="info-label">2️⃣ (%) B-level team bonus Rs</div><br/><br/>
          </div>
          <div className="info-row">  
            <div className="info-label">3️⃣ (%) C-level team bonus Rs</div><br/><br/><br/><br/>
          </div> */}
          <div className="info-row">  
            <div className="info-label">1️⃣ (%) A-level team commision: Rs, Total commision: Rs </div><br/><br/>
          </div>
          {/* <div className="info-row">  
            <div className="info-label">2️⃣ (%) B-level team commision: Rs, Total commision: Rs </div><br/><br/>
          </div>
          <div className="info-row">  
            <div className="info-label">3️⃣ (%) C-level team commision: Rs, Total commision: Rs </div><br/><br/>
          </div> */}

        </div>
        <div className="product-button">
          <Button
            variant="danger"
            type="button"
            className="btn-details mb-5"
            onClick={handleShow} 
          >
            Join Now
          </Button>
          </div>
        <br />
        <br />

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Product Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card border p-4 rounded">
              <div className="d-flex justify-content-between p-4 bg-primary text-white text-center rounded">
                <div className="rechare">
                  <p className="user-id">{myDetail?.recharge}</p>
                  <p className="other-info">Recharge</p>
                </div>
                <div className="rechare">
                  <p className="user-id">{myDetail?.balance}</p>
                  <p className="other-info">Balance</p>
                </div>
                <div className="rechare">
                  <p className="user-id">0</p>
                  <p className="other-info">Voucher</p>
                </div>
              </div>
              <div className="content-product d-flex justify-content-between px-2 pt-3">
                <h6 className="text-muted">Title</h6>
                <p>{product.title}</p>
              </div>
              <div className="content-product d-flex justify-content-between px-2">
                <h6 className="text-muted">Price</h6>
                <p>{product.price} Rs.</p>
              </div>
              <div className="content-product d-flex justify-content-between px-2">
                <h6 className="text-muted">Coupon</h6>
                <p>Select Coupon</p>
              </div>
              <div className="content-product d-flex justify-content-between px-2">
                <h6 className="text-muted">Final Price</h6>
                <p>{product.price} Rs.</p>
              </div>
              <div className="d-flex justify-content-between px-2">
                <button className="btn btn-light bg-light border px-5">Clear</button>
                <button className="btn btn-primary bg-primary border px-5"
                  onClick={() => BuyProducts(product.price)} // Use the product price for checkout
                >
                  Confirm
                </button>
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
    </div>
  );
};

export default ProductDetails;
