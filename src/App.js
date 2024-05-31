// import logo from './logo.svg';
// import './App.css';

import React , {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './component/signup.jsx';
import { HomePage } from './component/HomePage.jsx';
import Navigation from './component/Navigation.js';
import Login from './component/Login.jsx';
import ResetPassword from './component/ResetPassword.jsx';
import ProductComponent from './component/ProductComponent.jsx';
import MyComponent from './component/MyComponent.jsx';
import ProductDetails from './component/ProductDetails.jsx';
import BankAccount from './component/BankAccount.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming initial state is not logged in

  // Sample data for products
const productsData = [
  { id: 1, name: "Product 1", category: "Category A", price: "$10", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Product 2", category: "Category A", price: "$15", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Product 3", category: "Category B", price: "$20", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Product 4", category: "Category B", price: "$25", image: "https://via.placeholder.com/150" },
  { id: 5, name: "Product 5", category: "Category C", price: "$30", image: "https://via.placeholder.com/150" },
  { id: 6, name: "Product 6", category: "Category D", price: "$35", image: "https://via.placeholder.com/150" }, 
  { id: 7, name: "Product 7", category: "Category D", price: "$40", image: "https://via.placeholder.com/150" }, 
  { id: 8, name: "Product 8", category: "Category E", price: "$45", image: "https://via.placeholder.com/150" }, 
  { id: 9, name: "Product 9", category: "Category E", price: "$50", image: "https://via.placeholder.com/150" }, 
];

  if(isLoggedIn){
    return (
      <Router>
        <div className="route-container">
        <Navigation />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path='/products' element={<ProductComponent />} />
          <Route path="/product-details/:id" element={<ProductDetails products={productsData} />} />
          <Route path='/my-components' element={<MyComponent />} />
          <Route path='/bank-account' element={<BankAccount />} />
        </Routes>
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <div className="route-container">
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Routes>
        </div>
      </Router>
    );
  }
};

export default App;
