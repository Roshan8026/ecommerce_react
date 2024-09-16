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
import "./SignupPage.css";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SignupPage = () => {
  // State to manage the countdown timer for the Send button
  const [countdown, setCountdown] = useState(0);
  const [sendButtonText, setSendButtonText] = useState("Send");

  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [invitationCode, setInvitationCode] = useState("");

  // State to manage the disabled state of buttons
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(false);
  const [isSignupButtonDisabled, setIsSignupButtonDisabled] = useState(true);

  // Use effect for countdown timer
  useEffect(() => {
    let intervalId;

    if (countdown > 0) {
      setSendButtonText(`${countdown}`);
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      setSendButtonText("Send");
    }

    return () => clearInterval(intervalId);
  }, [countdown]);

  const handleSendClick = async () => {
      if(email == '' || email == null) {
          alert("please enter email");
          return;
      }
     // Validate password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (countdown === 0) {
        toast.success("OTP sent successfully!");
       // Simulate API call for sending verification code
       const sendCodeResponse = await sendVerificationCodeAPI(email,password,invitationCode);
      setCountdown(60);
      setIsSendButtonDisabled(true);
      setIsSignupButtonDisabled(true);
      if (sendCodeResponse.status === 200) {
        // Enable the Verification Code input and Signup button on success
        setIsSignupButtonDisabled(false);
        setIsSendButtonDisabled(false);
      } else {
        // Handle failure case
        setIsSendButtonDisabled(false);
        setIsSignupButtonDisabled(true);
      }
    }
    
  };

  const sendVerificationCodeAPI = async () => {
    // Simulate API call for sending verification code
    try {
      // Example of actual API call
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email:email, password:password, invitationCode:invitationCode }),
      });
      console.log('sendVerificationCodeAPI response ', response);
      return response;
    } catch (error) {
      console.error("Failed to send verification code", error);
      toast.error("Failed to send OTP. Please try again.");
      return { status: 500 }; // Return a failure status
    }
  };

  const handleSignupClick = async (e) => {
    e.preventDefault();
    setIsSignupButtonDisabled(true);

    // Simulate API call for signup
    const signupResponse = await signupAPI();

    if (signupResponse.status === 200) {
        toast.success('verification is successfully Please login');
    } else {
        toast.success("Signup failed");
      setIsSignupButtonDisabled(false);
    }
  };

  const signupAPI = async () => {
    // Simulate API call for signup
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/verify_otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email:email, otp:verificationCode }),
      });
      console.log('signupAPI response', response)
      return response;
    } catch (error) {
      console.error("Signup failed", error);
      toast.error("verification failed. Please try again.");
      return { status: 500 }; // Return a failure status
    }
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark" className="fixed-top">
        <Navbar.Brand href="#" className="px-4">
          PC Health App
        </Navbar.Brand>
      </Navbar>

      <div className="container mt-5 pt-4">
            <ToastContainer />
        <div className="row">
          <div className="col-12">
            <Card className="signup-card">
              <Card.Body>
                <h2 className="visually-hidden"> New Account </h2>
                <h2 style={{ fontWeight: "bold" }}> New Account </h2>
                <h5 style={{ marginBottom: "20px" }}>Sign Up For Free, Now </h5>
                <Form>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control
                        type="email"
                        placeholder="Please Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control
                        type="password"
                        placeholder="Please input Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control
                        type="password"
                        placeholder="Please enter password again"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="form-control"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Please enter invitation code"
                        value={invitationCode}
                        onChange={(e) => setInvitationCode(e.target.value)}
                        className="form-control"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={8}>
                      <Form.Control
                        type="text"
                        placeholder="Verification Code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        disabled={isSignupButtonDisabled}
                        className="form-control"
                      />
                    </Col>
                    <Col xs={4}>
                      <Button
                        variant="primary"
                        type="button"
                        disabled={isSendButtonDisabled}
                        onClick={handleSendClick}
                        className="btn-send"
                        style={{ height: "73%" }}
                      >
                        {sendButtonText}
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        variant="primary"
                        type="submit"
                        className="btn-signup"
                        disabled={isSignupButtonDisabled}
                        onClick={handleSignupClick}
                      >
                        Sign Up
                      </Button>
                    </Col>
                  </Row>
                  <p>
                    Already have an account? Log in now{" "}
                    <NavLink
                      to={"/login"}
                      className="nav-link bottom-nav-link"
                      style={{
                        color: "blue",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Log in
                    </NavLink>{" "}
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
