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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
          const navigate = useNavigate();
  // State to manage the countdown timer
  const [countdown, setCountdown] = useState(0);
  // Text for the send button
  const [sendButtonText, setSendButtonText] = useState("Send");
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  // State to manage the disabled state of buttons
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(false);
  const [isSignupButtonDisabled, setIsSignupButtonDisabled] = useState(true);

  useEffect(() => {
    let intervalId;

    if (countdown > 0) {
      console.log("countdown", countdown);
      // Set the button text to the countdown number
      setSendButtonText(`${countdown}`);
      // Decrease countdown every second
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      // Reset the button text to "Send" when countdown finishes
      setSendButtonText("Send");
      setIsSendButtonDisabled(false);
    }

    // Cleanup interval on component unmount or countdown end
    return () => clearInterval(intervalId);
  }, [countdown]);

 const handleSendClick = async () => {
      if(email == '' || email == null) {
        toast.error("please enter email");
          return;
      }
     // Validate password match
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
    }

    if (countdown === 0) {
        toast.success("OTP sent successfully!");
       // Simulate API call for sending verification code
       const sendCodeResponse = await sendVerificationCodeAPI(email,password);
      setCountdown(60);
      setIsSendButtonDisabled(true);
      setIsSignupButtonDisabled(true);
      if (sendCodeResponse.status === 200) {
        // Enable the Verification Code input and Signup button on success
        setIsSignupButtonDisabled(false);
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
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/reset_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email:email, password:password }),
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
            setTimeout(() => {
                navigate('/login');
            },2000)
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
            <Card className="reset-password-card">
              <Card.Body>
                <h2 style={{ fontWeight: "bold", marginBottom: "15px" }}>
                  {" "}
                  Reset Password{" "}
                </h2>
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
                        Confirm
                      </Button>
                    </Col>
                  </Row>
                  <div>
                    <p style={{ display: "inline-block" }}>
                      Already have an account ? Login now&nbsp;&nbsp;
                    </p>
                    <NavLink
                      to={"/login"}
                      className="nav-link bottom-nav-link"
                      style={{
                        color: "blue",
                        fontWeight: "bold",
                        textDecoration: "underline",
                        display: "inline-block",
                      }}
                    >
                      Log in
                    </NavLink>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <Container className="login-container d-none">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Card className="reset-password-card">
              <Card.Body>
                <h2 style={{ fontWeight: "bold", marginBottom: "15px" }}>
                  {" "}
                  Reset Password{" "}
                </h2>
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
                  <Row className="mb-3">
                    <Col>
                      <Form.Control
                        type="password"
                        placeholder="Please enter password again"
                        className="form-control"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={8}>
                      <Form.Control
                        type="text"
                        placeholder="Verification Code"
                        className="form-control"
                      />
                    </Col>
                    <Col xs={4}>
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={countdown > 0} // Disable button while countdown is active
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
                      >
                        Confirm
                      </Button>
                    </Col>
                  </Row>
                  <div>
                    <p style={{ display: "inline-block" }}>
                      Already have an account ? Login now&nbsp;&nbsp;
                    </p>
                    <NavLink
                      to={"/login"}
                      className="nav-link bottom-nav-link"
                      style={{
                        color: "blue",
                        fontWeight: "bold",
                        textDecoration: "underline",
                        display: "inline-block",
                      }}
                    >
                      Log in
                    </NavLink>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPassword;
