import React , { useState, useEffect } from 'react';
import { Navbar, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './SignupPage.css'; // Import your CSS file
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom

const Login = () => {
    
    return (
        <div>
            <Navbar bg="dark" variant="dark" className="fixed-top">
                <Navbar.Brand href="#">My App</Navbar.Brand>
            </Navbar>
            <Container className="login-container">
                <Row className="justify-content-center">
                    <Col xs={12} md={6}>
                        <Card className="login-card">
                            <Card.Body>
                                <h2 style={{fontWeight: 'bold'}}> Sign In </h2>
                                <h5 style={{marginBottom: '20px'}}>LogIn to Your Account</h5>
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
                                    <Row>
                                        <Col>
                                            <Button variant="primary" type="submit" className="btn-signup">
                                                Login
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col xs={6}>
                                        <NavLink to={"/signup"} className="nav-link bottom-nav-link" style={{ color: "blue", TextDecoration: 'underline', fontWeight: 'bold' }}>Register</NavLink>
                                        </Col>
                                        <Col xs={6}>
                                        <NavLink to={"/reset-password"} className="nav-link bottom-nav-link" style={{ color: "blue", fontWeight: 'bold',
                                            TextDecoration: 'underline' }}>&nbsp;&nbsp;Forget Password ?</NavLink>
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
