import React , { useState, useEffect } from 'react';
import { Navbar, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './SignupPage.css'; // Import your CSS file
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import './Transaction.css'; // Import your CSS file
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const Transaction = () => {

    return (
        <div>
            <Navbar bg="primary" variant="dark" className="fixed-top">
                <Navbar.Brand href="#" className='px-4'>Transaction</Navbar.Brand>
            </Navbar>
            <section className='mt-5 pt-5'>
    <div className="continer px-4">
        <div className="row">
            <div className="col-md-12">
            <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-5 "
      fill
    >
      <Tab eventKey="home" title="Other" >
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
      </Tab>
      <Tab eventKey="profile" title="Recharge">
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
      </Tab>
      <Tab eventKey="longer-tab" title="withdraw">
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
      </Tab>
    
    </Tabs>
          
            </div>
        </div>
    </div>
</section>
            <Container className="login-container d-none">
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

export default Transaction;
