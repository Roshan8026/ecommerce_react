import React , { useState, useEffect } from 'react';
import { Navbar, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './SignupPage.css'; // Import your CSS file
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import QRCode from 'react-qr-code';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const ReferFriend = () => {
    const [qrData, setQRData] = useState('http://localhost:3000/registeration/N802eb');
    const [copied, setCopied] = useState(false);
    const textToCopy = "N802eb";

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      };

    return (
        <div>
            <Navbar bg="primary" variant="dark" className="fixed-top">
                <Navbar.Brand href="#">Refer Friends</Navbar.Brand>
            </Navbar>
            <Container className="login-container">
                <Row className="justify-content-center">
                    <Col xs={12} md={6}>
                        <Card className="reset-password-card">
                            <Card.Body>
                                <h2 style={{fontWeight: 'bold', marginBottom: '15px'}}> Scan Qr Code to Join </h2>
                                    <div>
                                        <QRCode value={qrData} />
                                    </div>
                                    <hr/>
                                    <br/>
                                <h2 style={{fontWeight: 'bold', marginBottom: '15px'}}> My Invitation Code </h2>
                                <br/>
                                <Button variant="primary" type="submit" className="btn-signup">
                                    {textToCopy}
                                </Button>

                                <br/>
                                <br/>
                                <div>
                                <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
                                    <button>Copy to Clipboard</button>
                                </CopyToClipboard>
                                {copied ? <span style={{ color: 'green' }}>Copied!</span> : null}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ReferFriend;
