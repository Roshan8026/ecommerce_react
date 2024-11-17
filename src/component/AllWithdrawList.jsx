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
import { Await, NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import "./Transaction.css"; // Import your CSS file
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const AllWithdrawList = () => {
   const navigate = useNavigate();
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    const [withdrawList, setWithdrawList] = useState([]);
    let username = JSON.parse(localStorage.getItem("user"));
    username = username?.user?.email?.split("@", 1);


    useEffect(() => {
      const withdrawList = async() => {
          let userDetail = JSON.parse(user);
          console.log('userDetail',userDetail.user.email)
          await FetchWithdrawList(userDetail.user.id)
      }

      withdrawList();

    },[])

      const FetchWithdrawList = async (id) => {
        // Simulate API call for FetchWithdrawList
        try {
              const url = new URL(`${process.env.REACT_APP_API_BASE_URL}/api/all_withdraw/${id}`);
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
              console.log('FetchWithdrawList response', data);
              setWithdrawList(data)
              return data;
          } catch (error) {
              console.error("FetchWithdrawList failed", error);
              toast.error("FetchWithdrawList failed. Please try again.");
              return { status: 500 }; // Return a failure status
          }
      };

      console.log('withdrawList',withdrawList);

      const handleApproveWithdraw = (id) => {
        console.log('approve', id)
      } 

      const handleRejectWithdraw = (id) => {
        console.log('reject', id)
      } 

  return (
    <div>
      <Navbar bg="primary" variant="dark" className="fixed-top">
        <Navbar.Brand href="#" className="px-4">
          All User List
        </Navbar.Brand>
      </Navbar>
      <section className="mt-5 pt-5">
        <div className="continer px-4">
          <div className="row">
            <div className="col-md-12">
               <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>UserID</th>
                        <th>Username</th>
                        <th>Amount</th>
                        <th>Transaction Fees</th>
                        <th>Created Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(withdrawList) && withdrawList.length > 0 ? (
                        withdrawList.map((item, index) => (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.user_id}</td>
                            <td>{username}</td>
                            <td>{item.amount} Rs</td>
                            <td>{item.transaction_fees} Rs</td>
                            <td>{formatDateTime(item.createdAt)}</td>
                            {item.status == "pending" ? <td><Button style={{ backgroundColor: "blue" }}  onClick={() => handleApproveWithdraw(item.id)}>Approve</Button> / <Button style={{ backgroundColor: "red"}}  onClick={() => handleRejectWithdraw(item.id)}>Reject</Button></td> : item.status == "approved" ?  <td> <Button style={{ backgroundColor: "green" }}>Approved</Button></td> : item.status == "rejected" ?  <td> <Button style={{ backgroundColor: "red" }}>Rejected</Button></td>: "null"}
                            
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No team members found.</td>
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

function formatDateTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Formats based on the user's locale
}

export default AllWithdrawList;
