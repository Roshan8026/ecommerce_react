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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming initial state is not logged in

  if(isLoggedIn){
    return (
      <Router>
        <div className="route-container">
        <Navigation />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path='/products' element={<ProductComponent />} />
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
