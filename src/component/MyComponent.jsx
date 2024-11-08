import React, { useState } from "react";
import { FaUser, FaAngleRight } from "react-icons/fa";
import "./MyComponent.css";
import { json, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import { IoIosMailOpen } from "react-icons/io";
import { RiBankCardLine } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaKey } from "react-icons/fa";
import { restAuthentication } from "../features/authenticationSlice";
import { useDispatch } from "react-redux"; // Correct for dispatching Redux actions
import {
  Navbar,
  Container,
  Row,
  Col,
  Card,
  Modal,
  Button,
} from "react-bootstrap";
import { FcBusinessman } from "react-icons/fc";
import axios from "axios";

let username = JSON.parse(localStorage.getItem("user"));
username = username?.user?.email?.split("@", 1);
let token = localStorage.getItem("token");

// new tab code //////////////////////////////////////////////////////////////////
const data = [
  { id: 1, icon: FaUser, isOpen: false, formType: "typeA", text: "My Order" },
  {
    id: 2,
    icon: GrTransaction,
    isOpen: false,
    formType: "typeB",
    text: "Transaction",
  },
  {
    id: 4,
    icon: IoIosMailOpen,
    isOpen: false,
    formType: "typeD",
    text: "Refer Friends",
  },
  {
    id: 5,
    icon: RiBankCardLine,
    isOpen: false,
    formType: "typeE",
    text: "My Bank Account",
  },
  {
    id: 6,
    icon: RiLockPasswordFill,
    isOpen: false,
    formType: "typeF",
    text: "Change Password",
  },
  {
    id: 7,
    icon: FaKey,
    isOpen: false,
    formType: "typeG",
    text: "WithDraw password",
  },
  {
    id: 8,
    icon: FaKey,
    isOpen: false,
    formType: "typeh",
    text: "All withdraw List",
  },
  {
    id: 9,
    icon: FaUser,
    isOpen: false,
    formType: "typei",
    text: "All User List",
  },
  {
    id: 10,
    icon: FaUser,
    isOpen: false,
    formType: "typej",
    text: "Ask Questions",
  },
];

const MyComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [accordionItems, setAccordionItems] = useState([
    { id: 1, title: "My Order", isOpen: false, formType: "typeA" },
    { id: 2, title: "Transaction", isOpen: false, formType: "typeB" },
    { id: 4, title: "Refer Friends", isOpen: false, formType: "typeD" },
    { id: 5, title: "My Bank Account", isOpen: false, formType: "typeE" },
    { id: 6, title: "Change Password", isOpen: false, formType: "typeF" },
    { id: 7, title: "WithDraw password", isOpen: false, formType: "typeG" },
    { id: 8, title: "All User List", isOpen: false, formType: "typeh" },
    { id: 9, title: "All withdraw List", isOpen: false, formType: "typei" },
    { id: 10, title: "query", isOpen: false, formType: "typej" },

  ]);
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const handleShow = () => setShowModal(true); // Show modal
  const handleClose = () => setShowModal(false); // Close modal

  const checkoutHandler = async (amount) => {
    try {
      const { data: { key } } = await axios.get("http://localhost:3001/api/getkey");
      const { data: { order } } = await axios.post("http://localhost:3001/api/checkout", { amount });

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Product Payment",
        description: "Payment for the product",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        callback_url: "http://localhost:3001/api/paymentverification",
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9876543210"
        },
        notes: {
          address: "Company Corporate Office"
        },
        theme: {
          color: "#121212"
        },
        method: {
          netbanking: true,
          card: true,
          upi: true,
          wallet: true,
          emi: true
        }
      };

      const razor = new window.Razorpay(options);
      razor.open();

      razor.on("payment.success", function (response) {
        console.log("Payment Success:", response);
      });

      razor.on("payment.error", function (response) {
        console.error("Payment Failed:", response.error);
      });
    } catch (error) {
      console.error("Error in checkoutHandler:", error);
    }
  };

  const toggleAccordion = (id) => {
    const updatedItems = accordionItems.map((item) =>
      item.id === id
        ? { ...item, isOpen: !item.isOpen }
        : { ...item, isOpen: false }
    );
    setAccordionItems(updatedItems);
  };

  const renderForm = (formType) => {
    switch (formType) {
      case "typeA":
        navigate("/orders");
        break;
      case "typeB":
        navigate("/transaction");
        break;
      case "typeD":
        navigate("/refer-friends");
        break;
      case "typeE":
        navigate("/bank-account");
        break;
      case "typeF":
        navigate("/change-password");
        break;
      case "typeG":
        navigate("/withdraw-password");
        break;
      case "typei":
        navigate("/user-list");
        break;
      case "typeh":
        navigate("/withdraw-list");
        break;
      case "typej":
        window.location.href = "https://wa.me/8053818026"
        break;
      default:
        return null;
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(restAuthentication());
    navigate("/login");
  };

  return (
    <>
      <div className="my-component ">
        {" "}
        <Navbar bg="primary" variant="dark" className="fixed-top">
          <Navbar.Brand href="#" className="px-4">
            Account Center{" "}
          </Navbar.Brand>
        </Navbar>
        <br />
        <br />
        <Card className="p-3 mt-4 mx-2 border-0">
          <div className="user-card">
            <div className="d-flex">
              <FcBusinessman className="men" />
              <div>
                <p className="user-id">{username}</p>
                {/* <p className="other-info text-danger">444</p> */}
              </div>
            </div>
            <div className="d-flex justify-content-around mt-3 text-center">
              <div>
                <p className="user-id">0</p>
                <p className="other-info">Recharge</p>
              </div>
              <div>
                <p className="user-id">0</p>
                <p className="other-info">Balance</p>
              </div>
            </div>
          </div>

          <div className="button-row-container">
            <div className="text-container">
              <p className="user-id">0</p>
              <p className="other-info">Total Income</p>
            </div>

            <div className="vr"></div>
            <div className="text-container">
              <p className="user-id">0</p>
              <p className="other-info"> Total Recharge</p>
            </div>
            <div className="vr"></div>
            <div className="text-container">
              <p className="user-id">0</p>
              <p className="other-info">Total Assets</p>
            </div>
          </div>

          <div className="button-row-container">
            <div className="text-container">
              <p className="user-id">0</p>
              <p className="other-info">Total Withdraw</p>
            </div>
            <div className="vr"></div>
            <div className="text-container">
              <p className="user-id">0</p>
              <p className="other-info">Today's Income</p>
            </div>
            <div className="vr "></div>
            <div className="text-container">
              <p className="user-id">0</p>
              <p className="other-info">Team Income</p>
            </div>
          </div>
        </Card>
        <br />
        <div className="button-row-container">
          <Button
            variant="primary"
            type="submit"
            className="btn-signup"
            onClick={() => checkoutHandler(200)}
          >
            Recharge
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="btn-signup"
            onClick={() => navigate("/withdraw")}
          >
            Withdraw
          </Button>
        </div>
        {/* new tab */}
        <div className="mb-5 pb-5">
          {data.map((item, index) => (
            <div
              key={index}
              className="d-flex justify-content-between px-4 mt-4"
            >
              <div onClick={() => toggleAccordion(item.id)}>
                <item.icon className="user-icon" /> <span>{item.text}</span>
              </div>
              <IoIosArrowForward />
              {item.isOpen && (
                <div className="accordion-content">
                  {renderForm(item.formType)}
                </div>
              )}
            </div>
          ))}
          <div className="text-center px-4">
            <button
              className="btn btn-primary mt-3 w-100"
              onClick={handleLogOut}
            >
              Log out
            </button>
          </div>
        </div>
        {/* d-none not use */}
        <div className="accordion mb-5 pb-5 d-none">
          {accordionItems.map((item) => (
            <div className="accordion-item" key={item.id}>
              <button
                className={`accordion-button ${item.isOpen ? "active" : ""}`}
                type="button"
                onClick={() => toggleAccordion(item.id)}
              >
                <FaUser className="user-icon" />
                <span className="accordion-title">{item.title}</span>
                {/* <span className={`arrow-icon ${item.isOpen ? 'open' : ''}`}>
              </span> */}
              </button>
              {item.isOpen && (
                <div className="accordion-content">
                  {renderForm(item.formType)}
                </div>
              )}
            </div>
          ))}
          <div className="text-center">
            <button className="btn btn-primary mt-3 w-100 ">Log out</button>
          </div>
        </div>
      </div>
        {/* <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Product Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card border p-4 rounded">
              <div className="d-flex justify-content-between p-4 bg-primary text-white text-center rounded">
                <div className="rechare">
                  <p className="user-id">{"20"}</p>
                  <p className="other-info">Recharge</p>
                </div>
                <div className="rechare">
                  <p className="user-id">{"10"}</p>
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
                  onClick={() => checkoutHandler(product.price)} // Use the product price for checkout
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
        </Modal> */}
    </>
  );
};

export default MyComponent;
