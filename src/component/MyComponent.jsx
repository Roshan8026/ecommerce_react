import React, { useState } from 'react';
import { FaUser, FaAngleRight } from 'react-icons/fa';
import './MyComponent.css';

const MyComponent = () => {
  const [accordionItems, setAccordionItems] = useState([
    { id: 1, title: "Accordion Item 1", isOpen: false },
    { id: 2, title: "Accordion Item 2", isOpen: false },
    { id: 3, title: "Accordion Item 3", isOpen: false },
  ]);

  const toggleAccordion = (id) => {
    const updatedItems = accordionItems.map(item =>
      item.id === id ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }
    );
    setAccordionItems(updatedItems);
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyComponent;
