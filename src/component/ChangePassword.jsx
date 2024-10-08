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
                <Navbar.Brand href="#" className='px-4'>Change Password</Navbar.Brand>
            </Navbar>

            <section className='mt-5 pt-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        <Card className="reset-password-card card " style={{width: '154%'}}>
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
                        </div>
                    </div>
                </div>
            </section>
          
        </> 
    )
}

export default ChangePassword;