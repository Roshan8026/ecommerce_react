import React, { useState } from "react";
import "./Home.css";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "400px",
};

const ChangePassword = () => {
      const navigate = useNavigate();
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    againPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const ChangePassword = async (email) => {
    // Simulate API call for ChangePassword
    try {
       const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/change_password`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}` // Replace `yourToken` with the actual token variable
            },
            body: JSON.stringify({ 
                email: email,
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
            }),
        });
      console.log('ChangePassword response', response)
      return response;
    } catch (error) {
      console.error("ChangePassword failed", error);
      toast.error("ChangePassword failed. Please try again.");
      return { status: 500 }; // Return a failure status
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    let userDetail = JSON.parse(user);
    console.log('userDetail',userDetail.user.email)
    if(formData.oldPassword == '' || formData.newPassword == '' || formData.againPassword == '') {
          toast.error("please enter valid input");
          return;
      }
     // Validate password match
    if (formData.newPassword !== formData.againPassword) {
        toast.error("Passwords do not match");
        return;
    }

    console.log("Form Data:", formData);
    // Simulate API call for signup
    const Response = await ChangePassword(userDetail.user.email);

    if (Response.status === 200) {
        toast.success('Change Password is successfull');
        setTimeout(() => {
            navigate('/home');
        },1000)
    } else {
        toast.error("Change Password failed");
    }

    // Here you can handle the form submission, e.g., sending the data to a server
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" className="fixed-top">
        <Navbar.Brand href="#" className="px-4">
          Change Password
        </Navbar.Brand>
      </Navbar>

      <section className="mt-5 pt-5">
        <div className="container">
            <ToastContainer />
          <div className="row">
            <div className="col-md-12">
              <Card
                className="reset-password-card card "
                style={{ width: "154%" }}
              >
                <Card.Body>
                  <h3>Change Password </h3>
                  <br />
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
                      <Form.Label>Re-enter Password</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Please enter new Password Again"
                        name="againPassword"
                        value={formData.againPassword}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <br />
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
  );
};

export default ChangePassword;
