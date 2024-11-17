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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const Order = () => {
  let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    const [orderList, setOrderList] = useState([]);
    let username = JSON.parse(localStorage.getItem("user"));
    username = username?.user?.email?.split("@", 1);

    useEffect(() => {
      const OrderList = async() => {
          await FetchOrderList()
      }

      OrderList();
    },[])

      const FetchOrderList = async (id) => {
        // Simulate API call for FetchOrderList
        try {
              const url = new URL(`${process.env.REACT_APP_API_BASE_URL}/api/all_order`);
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
              console.log('FetchOrderList response', data);
              setOrderList(data.data)
              return data;
          } catch (error) {
              console.error("FetchOrderList failed", error);
              toast.error("FetchOrderList failed. Please try again.");
              return { status: 500 }; // Return a failure status
          }
      };  
    
      console.log('orderList', orderList);

      const handleWithdraw = (id) => {
        console.log('handleWithdraw', id);
      } 

  return (
    <div>
      <Navbar bg="primary" variant="dark" className="fixed-top">
        <Navbar.Brand href="#" className="px-4">
          Orders
        </Navbar.Brand>
      </Navbar>
      <section className="mt-5 pt-5">
        <div className="continer px-4">
          <div className="row">
            <div className="col-md-12">
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th>Sr No</th>
                        <th>Product Name</th>
                        <th>image</th>
                        <th>Daily Amount</th>
                        <th>Validity (In Days)</th>
                        <th>Withdraw Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(orderList) && orderList.length > 0 ? (
                        orderList.map((item, index) => (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.product.title}</td>
                            <td> <img
                                className="products"
                                src={`http://localhost:3001/${item.product.img_url}`}
                                alt={item.product.title}
                                style={{ width: "10%", height: "5%" }}
                              /></td>
                            <td>{item.product.daily_income} Rs</td>
                            <td>{item.product.validity_period}</td>
                            {item.status == "Not Completed" ? <td> <Button style={{ backgroundColor: "red"}}  onClick={() => handleWithdraw(item.id)}>Withdraw</Button></td> : <td> <Button style={{ backgroundColor: "green" }}>Completed</Button></td>}
                            
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No Order found.</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
