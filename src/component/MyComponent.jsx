import React, { useState } from "react";
import { FaUser, FaAngleRight } from "react-icons/fa";
import "./MyComponent.css";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import { IoIosMailOpen } from "react-icons/io";
import { RiBankCardLine } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaKey } from "react-icons/fa";



import {
  Navbar,
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { FcBusinessman } from "react-icons/fc";


// new tab code //////////////////////////////////////////////////////////////////
const data = [
  { icon: FaUser, text: 'My Order' },
  { icon: GrTransaction, text: 'Transaction' },
  { icon: IoIosMailOpen, text: 'Refer Friends' },
  { icon: RiBankCardLine, text: 'My Bank Account' },
  { icon: RiLockPasswordFill, text: 'Change Password' },
  { icon: FaKey, text: 'WithDraw password' }
];

const MyComponent = () => {
  const [accordionItems, setAccordionItems] = useState([
    { id: 1, title: "My Order", isOpen: false, formType: "typeA" },
    { id: 2, title: "Transaction", isOpen: false, formType: "typeB" },
    { id: 4, title: "Refer Friends", isOpen: false, formType: "typeD" },
    { id: 5, title: "My Bank Account", isOpen: false, formType: "typeE" },
    { id: 6, title: "Change Password", isOpen: false, formType: "typeF" },
    { id: 7, title: "WithDraw password", isOpen: false, formType: "typeG" },
  ]);
  const navigate = useNavigate();

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
      default:
        return null;
    }
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
   
    <FcBusinessman className="men"/>
    <div>
             <p className="user-id">78788</p>
             <p className="other-info text-danger">444</p>
             </div>
           </div>
            <div className="d-flex justify-content-around mt-3 text-center">
             <div>
                  <p className="user-id">0</p>
                  <p className="other-info">Recharge</p>
                </div>
                <div>
                  <p className="user-id">0</p>
                  <p className="other-info">Recharge</p>
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
            onClick={() => navigate("/withdraw-password")}
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
        <>
      {data.map((item, index) => (
        <div key={index} className="d-flex justify-content-between px-4 mt-4">
          <div>
            <item.icon className="user-icon" /> <span>{item.text}</span>
          </div>
          <IoIosArrowForward />
        </div>
      ))}
    </>

        <div className="accordion mb-5 pb-5">
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
    </>
  );
};

export default MyComponent;
