import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SignupPage from './component/signup.jsx';
import { HomePage } from './component/HomePage.jsx';
import Navigation from './component/Navigation.js';
import Login from './component/Login.jsx';
import ResetPassword from './component/ResetPassword.jsx';
import ProductComponent from './component/ProductComponent.jsx';
import MyComponent from './component/MyComponent.jsx';
import ProductDetails from './component/ProductDetails.jsx';
import BankAccount from './component/BankAccount.jsx';
import ChangePassword from './component/ChangePassword.jsx';
import WithDrawPassword from './component/WithDrawPassword.jsx';
import ReferFriend from './component/ReferFriend.jsx';
import Transaction from './component/Transaction.jsx';
import Order from './component/Order.jsx';
import WithDraw from './component/WithDraw.jsx';
import api from './interceptor';
import PaymentSuccess from './component/PaymentSuccess.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
  setUser,
  setIsLoggedIn,
} from "./features/authenticationSlice.js";
import { useDispatch } from "react-redux"; // Correct for dispatching Redux actions
import Teams from './component/Teams.jsx';


const App = () => {
  let isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let user_loggedIn = localStorage.getItem('user_loggedIn');

  useEffect(() => {
    if(isLoggedIn) {
      navigate('/home');
    } else {
      if(user_loggedIn) {
         dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
         dispatch(setIsLoggedIn(true));
      } else {
        navigate('/login');
      }
    }
  }, [isLoggedIn]);

  // const productsData = [
  //   { id: 1, name: "Product 1", category: "Category A", price: "$10", image: "https://via.placeholder.com/150" },
  //   { id: 2, name: "Product 2", category: "Category A", price: "$15", image: "https://via.placeholder.com/150" },
  //   { id: 3, name: "Product 3", category: "Category B", price: "$20", image: "https://via.placeholder.com/150" },
  //   // Add more products here...
  // ];

  return (
    <div className="route-container">
      {isLoggedIn ? (
        <>
          <Navigation />
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ProductComponent />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            {/* <Route path="/product-details/:id" element={<ProductDetails products={productsData} />} /> */}
            <Route path="/product-details/:id" element={<ProductDetails/>} />
            <Route path="/my-components" element={<MyComponent />} />
            <Route path="/bank-account" element={<BankAccount />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/withdraw-password" element={<WithDrawPassword />} />
            <Route path="/refer-friends" element={<ReferFriend />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/withdraw" element={<WithDraw />} />
            <Route path='/teams' element={<Teams />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
