import React from 'react';
import { Navbar, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './SignupPage.css'; // Import your CSS file

const SignupPage = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" className="fixed-top">
                <Navbar.Brand href="#">My App</Navbar.Brand>
            </Navbar>
            <Container className="signup-container">
                <Row className="justify-content-center">
                    <Col xs={12} md={6}>
                        <Card className="signup-card">
                            <Card.Body>
                                <h2 className="visually-hidden">Sign Up</h2>
                                <Form>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Control type="text" placeholder="First Name" className="form-control" />
                                        </Col>
                                        <Col>
                                            <Form.Control type="text" placeholder="Last Name" className="form-control" />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Control type="text" placeholder="Mobile Number" className="form-control" />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Control type="password" placeholder="Password" className="form-control" />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col xs={8}>
                                            <Form.Control type="text" placeholder="Verification Code" className="form-control" />
                                        </Col>
                                        <Col xs={4}>
                                            <Button variant="primary" type="submit" className="btn-send" style={{ height: "100%" }}>
                                                Send
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button variant="primary" type="submit" className="btn-signup">
                                                Sign Up
                                            </Button>
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

export default SignupPage;
