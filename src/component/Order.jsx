import React , { useState, useEffect } from 'react';
import { Navbar, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './SignupPage.css'; // Import your CSS file
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import './Transaction.css'; // Import your CSS file


const Order = () => {

    return (
        <div>
            <Navbar bg="primary" variant="dark" className="fixed-top">
                <Navbar.Brand href="#">Orders</Navbar.Brand>
            </Navbar>
            <Container className="login-container">
                <Row className="justify-content-center">
                    <Col xs={12} md={6}>
                        <Card className="reset-password-card">
                            <Card.Body>
                                <div className="button-row-container">
                                    <Button variant="primary" type="submit" className="btn-signup">
                                    other
                                    </Button>
                                    <Button variant="primary" type="submit" className="btn-signup">
                                        Recharge
                                    </Button>
                                    <Button variant="primary" type="submit" className="btn-signup">
                                        Withdraw
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Order;
