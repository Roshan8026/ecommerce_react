import React , { useState, useEffect } from 'react';
import { Navbar, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './SignupPage.css'; // Import your CSS file
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom

const ResetPassword = () => {
      // State to manage the countdown timer
      const [countdown, setCountdown] = useState(0);
      // Text for the send button
      const [sendButtonText, setSendButtonText] = useState('Send');
  
        useEffect(() => {
          let intervalId;
  
          if (countdown > 0) {
              console.log('countdown',countdown);
              // Set the button text to the countdown number
              setSendButtonText(`${countdown}`);
              // Decrease countdown every second
              intervalId = setInterval(() => {
                  setCountdown((prevCountdown) => prevCountdown - 1);
              }, 1000);
          } else {
              // Reset the button text to "Send" when countdown finishes
              setSendButtonText('Send');
          }
  
          // Cleanup interval on component unmount or countdown end
          return () => clearInterval(intervalId);
      }, [countdown]);
  
      const handleSendClick = () => {
          // Start the countdown at 60 if it's not already in progress
          if (countdown === 0) {
              setCountdown(60);
          }
      };
      
    return (
        <div>
            <Navbar bg="primary" variant="dark" className="fixed-top">
                <Navbar.Brand href="#">PC Health App</Navbar.Brand>
            </Navbar>
            <Container className="login-container">
                <Row className="justify-content-center">
                    <Col xs={12} md={6}>
                        <Card className="reset-password-card">
                            <Card.Body>
                                <h2 style={{fontWeight: 'bold', marginBottom: '15px'}}> Reset Password </h2>
                                <Form>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Control type="number" placeholder="Please Enter Mobile Number" className="form-control" />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Control type="password" placeholder="Please input Password " className="form-control" />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Control type="password" placeholder="Please enter password again" className="form-control" />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col xs={8}>
                                            <Form.Control type="text" placeholder="Verification Code" className="form-control" />
                                        </Col>
                                        <Col xs={4}>
                                            <Button variant="primary" type="submit"
                                            disabled={countdown > 0} // Disable button while countdown is active
                                            onClick={handleSendClick}
                                            className="btn-send" style={{ height: "73%" }}>
                                                 {sendButtonText}
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button variant="primary" type="submit" className="btn-signup">
                                                Confirm
                                            </Button>
                                        </Col>
                                    </Row>
                                    <div>
                                        <p style={{ display: "inline-block" }}>Already have an account ? Login now&nbsp;&nbsp;</p>
                                        <NavLink to={"/login"} className="nav-link bottom-nav-link" style={{ color: "blue", fontWeight: 'bold', textDecoration: 'underline', display: "inline-block" }}>Log in</NavLink>
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
