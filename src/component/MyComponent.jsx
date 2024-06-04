import React, { useState } from 'react';
import { FaUser, FaAngleRight } from 'react-icons/fa';
import './MyComponent.css';
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';


const MyComponent = () => {
  const [accordionItems, setAccordionItems] = useState([
    { id: 1, title: "My Order", isOpen: false, formType: 'typeA' },
    { id: 2, title: "Transaction", isOpen: false, formType: 'typeB' },
    { id: 4, title: "Refer Friends", isOpen: false, formType: 'typeD' },
    { id: 5, title: "My Bank Account", isOpen: false, formType: 'typeE' },
    { id: 6, title: "Change Password", isOpen: false, formType: 'typeF' },
    { id: 7, title: "WithDraw password", isOpen: false, formType: 'typeG' },
  ]);
  const navigate = useNavigate();


  const toggleAccordion = (id) => {
    const updatedItems = accordionItems.map(item =>
      item.id === id ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }
    );
    setAccordionItems(updatedItems);
  };

  const renderForm = (formType) => {
    switch (formType) {
      case 'typeA':
          navigate('/orders');
        break;
      case 'typeB':
        navigate('/transaction');
        break;
        case 'typeD':
          navigate('/refer-friends');
          break;
        case 'typeE':
          navigate('/bank-account');
          break;
        case 'typeF':
          navigate('/change-password');
          break;
        case 'typeG':
          navigate('/withdraw-password');
          break;
      default:
        return null;
    }
  };

  return (
    <>
   

    <div className="my-component"> <Navbar bg="primary" variant="dark" className="fixed-top">
                <Navbar.Brand href="#">Account Center </Navbar.Brand>
            </Navbar>
   <br/>
   <br/>
   <Card>
   <Card.Body className="card-body-container">
      <div className="icon-container">
        <FaUser className="user-icon" />
      </div>
      <div className="text-container">
        <p className="user-id">78788</p>
        <p className="other-info">444</p>
      </div>
    </Card.Body>
    <div className="button-row-container">    
            <div className="text-container">
                <p className="user-id">0</p>
                <p className="other-info">Recharge</p>
              </div>
               <div className="text-container">
                <p className="user-id">0</p>
                <p className="other-info">Balance</p>
              </div>
        </div>
        <div className="button-row-container">    
            <div className="text-container">
                <p className="user-id">0</p>
                <p className="other-info">Recharge</p>
              </div>
               <div className="text-container">
                <p className="user-id">0</p>
                <p className="other-info">Balance</p>
              </div>
              <div className="text-container">
                <p className="user-id">0</p>
                <p className="other-info">Balance</p>
              </div>
              
        </div>
        <div className="button-row-container">    
            <div className="text-container">
                <p className="user-id">0</p>
                <p className="other-info">Recharge</p>
              </div>
               <div className="text-container">
                <p className="user-id">0</p>
                <p className="other-info">Balance</p>
              </div>
              <div className="text-container">
                <p className="user-id">0</p>
                <p className="other-info">Balance</p>
              </div>
              
        </div>
                                </Card>
   <br/>

        <div className="button-row-container">    
            <Button variant="primary" type="submit" className="btn-signup"
                          onClick={() => navigate('/withdraw-password')}
                          >
                Recharge
            </Button>
            <Button variant="primary" type="submit" className="btn-signup"
              onClick={() => navigate('/withdraw')}>
                Withdraw
            </Button>
        </div>
      <div className="accordion">
        {accordionItems.map(item => (
          <div className="accordion-item" key={item.id}>
            <button
              className={`accordion-button ${item.isOpen ? 'active' : ''}`}
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
      </div>
    </div>
     
    </>
  );
};

export default MyComponent;
