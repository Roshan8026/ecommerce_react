import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import "./SignupPage.css"; // Import your CSS file
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import { useNavigate } from "react-router-dom";
import api from "../interceptor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setUser,
  setLoading,
  setIsLoggedIn,
} from "../features/authenticationSlice";
import { useDispatch } from "react-redux"; // Correct for dispatching Redux actions
import Spinner from "react-bootstrap/Spinner"; // Import spinner from Bootstrap

const Login = () => {
  const [email, setEmail] = useState(""); // State for mobile number
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate(); // For navigation
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Loading state to track loader

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    setLoading(true); // Start loader
    try {
      if (email && password) {
        // Call the API with email and password
        const response = await api.post("/api/login", {
          email, // Use email state
          password,
        });

        // Display success toast
        toast.success("Login successful!");
        // Assuming the response contains a token
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("user_loggedIn", true);
        // Simulate some delay if needed
        setLoading(false);
        setTimeout(() => {
          dispatch(setUser(response.data));
          dispatch(setIsLoggedIn(true));
          // Stop loader after successful login
        }, 2000);
      } else {
        setLoading(false); // Stop loader
        toast.error("Please enter valid credentials.");
      }
    } catch (error) {
      setLoading(false); // Stop loader
      // Display error toast
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div>
        
      <ToastContainer />
      <Navbar bg="primary" variant="dark" className="fixed-top">
        <Navbar.Brand href="#" className="px-4">
          Pc Health App
        </Navbar.Brand>
      </Navbar>

      <div className="container mt-5 pt-4">
        <div className="row">
          <div className="col-12">
            <Card className="login-card ">
              <Card.Body>
                <h2 style={{ fontWeight: "bold" }}> Sign In </h2>
                <h5 style={{ marginBottom: "20px" }}>LogIn to Your Account</h5>
                <Form onSubmit={handleSubmit}>
                  {" "}
                  {/* Attach the handleSubmit to the form */}
                  <Row className="mb-3">
                    <Col>
                      <Form.Control
                        type="email"
                        placeholder="Please Enter valid email"
                        className="form-control"
                        value={email} // Bind the input to state
                        onChange={(e) => setEmail(e.target.value)} // Update state
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control
                        type="password"
                        placeholder="Please input Password"
                        className="form-control"
                        value={password} // Bind the input to state
                        onChange={(e) => setPassword(e.target.value)} // Update state
                      />
                    </Col>
                  </Row>
                  {error && (
                    <Row className="mb-3">
                      <Col>
                        <div className="text-danger">{error}</div>{" "}
                        {/* Display error */}
                      </Col>
                    </Row>
                  )}
                  <Row>
                    <Col>
                      <Button
                        variant="primary"
                        type="submit"
                        className="btn-signup"
                      >
                        Login
                      </Button>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6}>
                      <NavLink
                        to="/signup"
                        className="nav-link bottom-nav-link"
                        style={{
                          color: "blue",
                          TextDecoration: "underline",
                          fontWeight: "bold",
                        }}
                      >
                        Register
                      </NavLink>
                    </Col>
                    <Col xs={6}>
                      <NavLink
                        to="/reset-password"
                        className="nav-link bottom-nav-link"
                        style={{
                          color: "blue",
                          fontWeight: "bold",
                          TextDecoration: "underline",
                        }}
                      >
                        &nbsp;&nbsp;Forget Password?
                      </NavLink>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <Container className="login-container d-none">
        <Row className="justify-content-center">
          <Col xs={12} md={12} lg={12}>
            <Card className="login-card">
              <Card.Body>
                <h2 style={{ fontWeight: "bold" }}> Sign In </h2>
                <h5 style={{ marginBottom: "20px" }}>LogIn to Your Account</h5>
                <Form>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control
                        type="number"
                        placeholder="Please Enter Mobile Number"
                        className="form-control"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control
                        type="password"
                        placeholder="Please input Password "
                        className="form-control"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        variant="primary"
                        type="submit"
                        className="btn-signup"
                      >
                        Login
                      </Button>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6}>
                      <NavLink
                        to={"/signup"}
                        className="nav-link bottom-nav-link"
                        style={{
                          color: "blue",
                          TextDecoration: "underline",
                          fontWeight: "bold",
                        }}
                      >
                        Register
                      </NavLink>
                    </Col>
                    <Col xs={6}>
                      <NavLink
                        to={"/reset-password"}
                        className="nav-link bottom-nav-link"
                        style={{
                          color: "blue",
                          fontWeight: "bold",
                          TextDecoration: "underline",
                        }}
                      >
                        &nbsp;&nbsp;Forget Password ?
                      </NavLink>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

        
    </div>
  );
};

export default Login;
