import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import "./SignupPage.css"; // Import your CSS file
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import QRCode from "react-qr-code";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector } from 'react-redux';

const ReferFriend = () => {
  const [qrData, setQRData] = useState("");
  const [copied, setCopied] = useState(false);
  
  let user = useSelector((state) => state.authentication.user);
  let textToCopy = user?.user?.invitation_code;

  useEffect(() => {
    console.log('user', user?.user?.invitation_code);
    setQRData(`http://localhost:3000/registeration/${user?.user?.invitation_code}`);
  },[]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark" className="fixed-top">
        <Navbar.Brand href="#" className="px-4">
          Refer Friends
        </Navbar.Brand>
      </Navbar>

      <div className="container mb-5 pb-5">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card scanner-card">
              <h4 className="text-center py-3">SCAN QR Code to Join</h4>
              <div className="d-block m-auto">
                <QRCode value={qrData} />
              </div>
              <em className="text-center py-3">My Invitation Code</em>
              <div className="text-center">
                <button
                  type="submit"
                  class="btn-signup btn btn-light border w-25"
                >
                   {textToCopy}
                </button>
              </div>
              <>
                <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
                    <button class=" btn btn-primary my-4 mx-5" >Copy to Clipboard</button>
                  </CopyToClipboard>
                  {copied ? (
                    <span style={{ color: "green" }}>Copied!</span>
                  ) : null}
              </>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>

      <Container className="login-container d-none">
        <Row className="justify-content-center">
          <Col xs={12} md={12} lg={12}>
            <Card className="reset-password-card">
              <Card.Body>
                <h2 style={{ fontWeight: "bold", marginBottom: "15px" }}>
                  {" "}
                  Scan Qr Code to Join{" "}
                </h2>
                <div>
                  <QRCode value={qrData} />
                </div>
                <hr />
                <br />
                <h2 style={{ fontWeight: "bold", marginBottom: "15px" }}>
                  {" "}
                  My Invitation Code{" "}
                </h2>
                <br />
                <Button variant="primary" type="submit" className="btn-signup">
                  {textToCopy}
                </Button>

                <br />
                <br />
                <div>
                  <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
                    <button>Copy to Clipboard</button>
                  </CopyToClipboard>
                  {copied ? (
                    <span style={{ color: "green" }}>Copied!</span>
                  ) : null}
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
