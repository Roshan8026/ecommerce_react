import React from 'react';
import './Home.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
    return (
        <>
         <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </> 
    )
}

export default BankAccount;