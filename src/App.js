// import logo from './logo.svg';
// import './App.css';

import React, { useEffect, useState } from 'react';
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
import ChangePassword from './component/ChangePassword.jsx';
import WithDrawPassword from './component/WithDrawPassword.jsx';
import ReferFriend from './component/ReferFriend.jsx';
import Transaction from './component/Transaction.jsx';
import Order from './component/Order.jsx';
import WithDraw from './component/WithDraw.jsx';
import api from './interceptor';
import PaymentSuccess from './component/PaymentSuccess.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming initial state is not logged in
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Example API call to fetch users
  //   api.get('/users')
  //     .then(response => {
  //       setData(response.data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       setError(error.message);
  //       setLoading(false);
  //     });
  // }, []);
 async  function check() {
    try {
      let email = "protein19910001@gmail.com";
      let password = "1234567890";

      const response = await api.post('/api/login', {
        email,
        password
      })
  
        // Assuming the response contains a token
        localStorage.setItem('token', response.data.token);
        
        // Redirect or do something after successful login
        console.log('Login successful:', response.data);
      } catch (error) {
        setError('Login failed. Please check your credentials.');
        console.error('Login error:', error);
      }
    };

// check();

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
  // console.log('data list of user',data);
  // return (
  //   <div>
  //     <h1>Users:</h1>
  //     <ul>
  //       {data && data.map(user => (
  //         <li key={user.id}>{user.name} - {user.email}</li>
  //       ))}
  //     </ul>
  //   </div>
  // );

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
          <Route path='paymentsuccess' element={<PaymentSuccess />} />
          <Route path="/product-details/:id" element={<ProductDetails products={productsData} />} />
          <Route path='/my-components' element={<MyComponent />} />
          <Route path='/bank-account' element={<BankAccount />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/withdraw-password' element={<WithDrawPassword />} />
          <Route path='/refer-friends' element={<ReferFriend />}/>
          <Route path='/transaction' element={<Transaction />} />
          <Route path='/orders' element={<Order />} />
          <Route path='/withdraw' element={<WithDraw />} />
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
