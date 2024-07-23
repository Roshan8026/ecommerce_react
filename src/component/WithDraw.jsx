import React , { useState, useEffect } from 'react';
import { Navbar, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './SignupPage.css'; // Import your CSS file
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom

const WithDraw = () => {
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
                <Navbar.Brand href="#" className='px-4'>Withdraw </Navbar.Brand>
            </Navbar>
         <section>
            <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col-md-12">
                    <Card className="reset-password-card">
                            <Card.Body>
                                <Card>
                                <Card.Body>
                                    <h6>0 Rs </h6>
                                    Total Balance
                                </Card.Body>
                                </Card>
                                <br/>
                                <Form>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Control type="number" placeholder="Withraw Amount" className="form-control" />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Control type="password" placeholder="withdraw Password " className="form-control" />
                                        </Col>
                                    </Row>
                                    <h6> Total Transaction fees : 6 %</h6>

                                    <Row>
                                        <Col>
                                            <Button variant="primary" type="submit" className="btn-signup mt-3">
                                                Withdraw
                                            </Button>
                                        </Col>
                                    </Row>
                                  
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
         </section>
        </div>
    );
};

export default WithDraw;
