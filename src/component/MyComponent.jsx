import React, { useState } from 'react';
import { FaUser, FaAngleRight } from 'react-icons/fa';
import './MyComponent.css';
import { useNavigate } from "react-router-dom";


const MyComponent = () => {
  const [accordionItems, setAccordionItems] = useState([
    { id: 1, title: "My Order", isOpen: false, formType: 'typeA' },
    { id: 2, title: "Transaction", isOpen: false, formType: 'typeB' },
    { id: 3, title: "My Coupons", isOpen: false, formType: 'typeC' },
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
        return (
          <>
            <input type="text" className="input-field" placeholder="Input 1" />
            <input type="text" className="input-field" placeholder="Input 2" />
            <input type="text" className="input-field" placeholder="Input 3" />
            <input type="text" className="input-field" placeholder="Input 4" />
            <input type="text" className="input-field" placeholder="Input 5" />
          </>
        );
      case 'typeB':
        return (
          <>
            <input type="text" className="input-field" placeholder="Input 1" />
            <input type="text" className="input-field" placeholder="Input 2" />
          </>
        );
      case 'typeC':
        return (
          <>
            <input type="text" className="input-field" placeholder="Input 1" />
            <input type="text" className="input-field" placeholder="Input 2" />
            <input type="text" className="input-field" placeholder="Input 3" />
            <input type="text" className="input-field" placeholder="Input 4" />
          </>
        );
        case 'typeD':
        return (
          <>
            <input type="text" className="input-field" placeholder="Input 1" />
            <input type="text" className="input-field" placeholder="Input 2" />
            <input type="text" className="input-field" placeholder="Input 3" />
            <input type="text" className="input-field" placeholder="Input 4" />
          </>
        );
        case 'typeE':
          navigate('/bank-account');
          break;
        case 'typeF':
          return (
            <>
              <input type="text" className="input-field" placeholder="Input 1" />
              <input type="text" className="input-field" placeholder="Input 2" />
              <input type="text" className="input-field" placeholder="Input 3" />
              <input type="text" className="input-field" placeholder="Input 4" />
            </>
          );
        case 'typeG':
          return (
            <>
              <input type="text" className="input-field" placeholder="Input 1" />
              <input type="text" className="input-field" placeholder="Input 2" />
              <input type="text" className="input-field" placeholder="Input 3" />
              <input type="text" className="input-field" placeholder="Input 4" />
            </>
          );
      default:
        return null;
    }
  };

  return (
    <div className="my-component">
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
              <span className={`arrow-icon ${item.isOpen ? 'open' : ''}`}>
                <FaAngleRight />
              </span>
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
  );
};

export default MyComponent;
