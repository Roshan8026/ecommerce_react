import React , {useState} from 'react';
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


const ChangePassword = () => {

    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        againPassword: ''
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
                <Navbar.Brand href="#">Change Password</Navbar.Brand>
            </Navbar>
            <Container className="login-container">
                <Row className="justify-content-center">
                    <Col xs={12} md={6}>
                        <Card className="reset-password-card" style={{width: '154%'}}>
                            <Card.Body>
                    <h3>Change Password </h3>
                    <br/>
                    <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="oldPassword">
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="please enter old Password" 
                                    name="oldPassword" 
                                    value={formData.oldPassword}
                                    onChange={handleChange} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="newPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Please Enter New Password" 
                                    name="newPassword" 
                                    value={formData.newPassword}
                                    onChange={handleChange} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="againPassword">
                                <Form.Label>Again Password</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Please enter new Password Again" 
                                    name="againPassword" 
                                    value={formData.againPassword}
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                        
                            <br/>
                            <Button variant="primary" type="submit">
                                confirm
                            </Button>
                    </Form>
                    </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </> 
    )
}

export default ChangePassword;