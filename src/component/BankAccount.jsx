import React, { useState } from 'react';
import './Home.css';
import { Navbar, Card, Form, Button } from 'react-bootstrap';
import './SignupPage.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const BankAccount = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cardholderName: '',
        bankName: '',
        bankAccount: '',
        ifscCode: '',
        mobileNumber: '',
        withdrawPassword: ''
    });

    const [errors, setErrors] = useState({});
    let token = localStorage.getItem("token");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate Cardholder Name (5-30 characters)
        if (formData.cardholderName.length < 5 || formData.cardholderName.length > 30) {
            newErrors.cardholderName = 'Cardholder name must be between 5 and 30 characters.';
        }

        // Validate Bank Name (not empty)
        if (!formData.bankName) {
            newErrors.bankName = 'Bank name is required.';
        }

        // Validate Bank Account (not empty)
        if (!formData.bankAccount) {
            newErrors.bankAccount = 'Bank account is required.';
        }

        // Validate IFSC Code (4 uppercase letters followed by at least 3 alphanumeric characters)
        if (!/^[A-Z]{4}[0-9A-Z]{3,}$/.test(formData.ifscCode)) {
            newErrors.ifscCode = 'IFSC Code must start with 4 letters followed by at least 3 alphanumeric characters.';
        }

        // Validate Mobile Number (10 digits)
        if (!/^\d{10}$/.test(formData.mobileNumber)) {
            newErrors.mobileNumber = 'Mobile number must be 10 digits.';
        }

        // Validate Withdraw Password (not empty)
        if (!formData.withdrawPassword) {
            newErrors.withdrawPassword = 'Withdraw password is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

     const BankAccountAdd = async () => {
        // Simulate API call for BankAccountAdd
        try {
         const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/bank-add`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}` // Replace `yourToken` with the actual token variable
            },
            body: JSON.stringify({ 
                cardholder_name: formData.cardholderName,
                bank_name: formData.bankName,
                bank_account: formData.bankAccount,
                ifsc_code: formData.ifscCode,
                bank_mobile_number: formData.mobileNumber,
                withdraw_password: formData.withdrawPassword 
            }),
        });
        console.log('BankAccountAdd response', response)
        return response;
        } catch (error) {
        console.error("BankAccountAdd failed", error);
        toast.error("BankAccountAdd failed. Please try again.");
        return { status: 500 }; // Return a failure status
        }
    };

    const handleSubmit = async (e) => {
        try {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form Data:', formData);
            // Handle successful submission (e.g., send data to server)
            const BankAddedResponse = await BankAccountAdd();

            if (BankAddedResponse.status === 200) {
                toast.success('Bank added is successfully');
                setTimeout(() => {
                    navigate('/my-components');
                },2000)
            } else {
                toast.error("Bank added is created Some thing went wrong please contant your senior team");
            }
            } else {
                toast.error("Validation Failed");
            }
        } catch (error) {
            console.error("Bank added failed", error);
            toast.error("Bank added failed. Please try again.");
            return { status: 500 }; // Return a failure status
        }
    };

    return (
        <>
            <Navbar bg="primary" variant="dark" className="fixed-top">
                <Navbar.Brand href="#" className="px-4">Bank Account</Navbar.Brand>
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
                                            isInvalid={!!errors.cardholderName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.cardholderName}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="bankName">
                                        <Form.Label>Bank Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Bank Name"
                                            name="bankName"
                                            value={formData.bankName}
                                            onChange={handleChange}
                                            isInvalid={!!errors.bankName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.bankName}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="bankAccount">
                                        <Form.Label>Bank Account</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Bank Account"
                                            name="bankAccount"
                                            value={formData.bankAccount}
                                            onChange={handleChange}
                                            isInvalid={!!errors.bankAccount}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.bankAccount}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="ifscCode">
                                        <Form.Label>IFSC Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="IFSC Code"
                                            name="ifscCode"
                                            value={formData.ifscCode}
                                            onChange={handleChange}
                                            isInvalid={!!errors.ifscCode}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.ifscCode}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="mobileNumber">
                                        <Form.Label>Mobile Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Mobile Number"
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                            isInvalid={!!errors.mobileNumber}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.mobileNumber}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="withdrawPassword">
                                        <Form.Label>Withdraw Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Withdraw Password"
                                            name="withdrawPassword"
                                            value={formData.withdrawPassword}
                                            onChange={handleChange}
                                            isInvalid={!!errors.withdrawPassword}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.withdrawPassword}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="mt-3">
                                        Save bank
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BankAccount;
