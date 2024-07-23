import React, { useState } from 'react';
import './Home.css';
import { Navbar, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './SignupPage.css'; // Import your CSS file
const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
}

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
}


const BankAccount = () => {

    const [formData, setFormData] = useState({
        cardholderName: '',
        bankName: '',
        bankAccount: '',
        ifscCode: '',
        mobileNumber: '',
        withdrawPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Here you can handle the form submission, e.g., sending the data to a server
    };

    return (
        <>
            <Navbar bg="primary" variant="dark" className="fixed-top">
                <Navbar.Brand href="#" className='px-4'>Bank Account</Navbar.Brand>
            </Navbar>
            <div className="container my-5 pb-5">
                <div className="row">
                    <div className="col-md-12">
                        <Card className="reset-password-card card">

                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="cardholderName">
                                        <Form.Label>Cardholder Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Card holder name"
                                            name="cardholderName"
                                            value={formData.cardholderName}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="bankName">
                                        <Form.Label>Bank Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Bank Name"
                                            name="bankName"
                                            value={formData.bankName}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="bankAccount">
                                        <Form.Label>Bank Account</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Bank Account"
                                            name="bankAccount"
                                            value={formData.bankAccount}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="ifscCode">
                                        <Form.Label>IFSC Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="IFSC Code"
                                            name="ifscCode"
                                            value={formData.ifscCode}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="mobileNumber">
                                        <Form.Label>Mobile Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Mobile Number"
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="withdrawPassword">
                                        <Form.Label>Withdraw Password</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Withdraw Password"
                                            name="withdrawPassword"
                                            value={formData.withdrawPassword}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <span>
                                        Note:
                                    </span>
                                    <br />
                                    <Form.Text className="text-muted">
                                        Cardholder name (5-30 characters).
                                    </Form.Text>
                                    <br />
                                    <Form.Text className="text-muted">
                                        IFSC is 11 characters and the fifth digit is the number 0.
                                    </Form.Text>
                                    <br />
                                    <Form.Text className="text-muted">
                                        Mobile number is 10 digits.
                                    </Form.Text>
                                    <br />
                                    <Button variant="primary" type="submit" className='mt-3'>
                                        Save bank
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>


        </>
    )
}

export default BankAccount;