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


const AllUserList = () => {
   const navigate = useNavigate();
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    const [userList, setUserList] = useState([]);


    useEffect(() => {
      const team = async() => {
          let userDetail = JSON.parse(user);
          console.log('userDetail',userDetail.user.email)
          await FetchAllUserList(userDetail.user.email)
      }

      team();

    },[])

      const FetchAllUserList = async (email) => {
        // Simulate API call for FetchTeamUser
        try {
              const url = new URL(`${process.env.REACT_APP_API_BASE_URL}/api/user-list`);
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
              console.log('FetchTeamUser response', data);
              setUserList(data.data)
              return data;
          } catch (error) {
              console.error("FetchTeamUser failed", error);
              toast.error("FetchTeamUser failed. Please try again.");
              return { status: 500 }; // Return a failure status
          }
      };

      console.log('userList',userList);

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
                        <th>#</th>
                        <th>id</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(userList) && userList.length > 0 ? (
                        userList.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1 +'#'}</td>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
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

export default AllUserList;
