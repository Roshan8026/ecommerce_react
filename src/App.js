// import logo from './logo.svg';
// import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './component/signup.jsx';
import { HomePage } from './component/HomePage.jsx';
import Navigation from './component/Navigation.js';
import Login from './component/Login.jsx';
import ResetPassword from './component/ResetPassword.jsx';

const App = () => {
  return (
    <Router>
      <div className="route-container">
      <Navigation />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
