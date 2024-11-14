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
import "./Transaction.css"; // Import your CSS file
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Transaction = () => {
  let token = localStorage.getItem("token");
  let user = JSON.parse(localStorage.getItem("user"));
  const [transactionList, setTransactionList] = useState([]);

    useEffect(() => {
      const transaction = async() => {
          console.log('userDetail',user.user.id)
          await FetchAllTransactionList(user.user.id)
      }

      transaction();
  },[])

  const FetchAllTransactionList = async (id) => {
        // Simulate API call for FetchTeamUser
        try {
              const url = new URL(`${process.env.REACT_APP_API_BASE_URL}/api/all_transaction/${id}`);
              const response = await fetch(url, {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `${token}`, // Ensure the token is prefixed with "Bearer"
                  },
              });

              if (!response.ok) {
                  throw new Error(`Error: ${response.status}`);
              }

              const data = await response.json(); // Assuming the response is in JSON format
              console.log('FetchAllTransactionList response', data);
              setTransactionList(data)
              return data;
          } catch (error) {
              console.error("FetchAllTransactionList failed", error);
              return { status: 500 }; // Return a failure status
          }
      };

  return (
    <div>
      <Navbar bg="primary" variant="dark" className="fixed-top">
        <Navbar.Brand href="#" className="px-4">
          Transaction
        </Navbar.Brand>
      </Navbar>
      <section className="mt-5 pt-5">
        <div className="continer px-4">
          <div className="row">
            <div className="col-md-12">
              <Tabs
                defaultActiveKey="profile"
                id="fill-tab-example"
                className="mb-5 "
                fill
              >
                <Tab eventKey="home" title="Other">
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
                        <th>Id</th>
                        <th>Email</th>
                        <th>Order Id</th>
                        <th>Payment Id</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(transactionList) && transactionList.length > 0 ? (
                        transactionList.map((item, index) => (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>{item.razorpay_order_id}</td>
                            <td>{item.razorpay_payment_id}</td>
                            <td>{item.amount}</td>
                             <td>{formatDateTime(item.createdAt)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No Transaction found.</td>
                        </tr>
                      )}
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
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn-signup"
                  >
                    other
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn-signup"
                  >
                    Recharge
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn-signup"
                  >
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

function formatDateTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Formats based on the user's locale
}

export default Transaction;
