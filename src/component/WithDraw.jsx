import React , { useState, useEffect } from 'react';
import { Navbar, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './SignupPage.css'; // Import your CSS file
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom

const WithDraw = () => {
    let token = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("user"));
    const [myDetail, setMyDetail] = useState();
    const [amount, setAmount] = useState(null);
    const [password, setPassword] = useState(""); // State for password

      // State to manage the countdown timer
      const [countdown, setCountdown] = useState(0);
      // Text for the send button
      const [sendButtonText, setSendButtonText] = useState('Send');
  
    useEffect(() => {
          let intervalId;
  
        if (countdown > 0) {
            console.log('countdown',countdown);
            // Set the button text to the countdown number
            setSendButtonText(`${countdown}`);
            // Decrease countdown every second
            intervalId = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        } else {
            // Reset the button text to "Send" when countdown finishes
            setSendButtonText('Send');
        }

        // Cleanup interval on component unmount or countdown end
        return () => clearInterval(intervalId);
    }, [countdown]);

    useEffect(() => {
        const MyDetail = async() => {
            console.log('userDetail',user.user.id)
            await FetchMyDetail(user.user.id)
        }
        MyDetail();
    },[])
  
    const FetchMyDetail = async (id) => {
        // Simulate API call for FetchTeamUser
        try {
            const url = new URL(`${process.env.REACT_APP_API_BASE_URL}/api/my_details/${id}`);
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
            console.log('FetchMyDetail response', data);
            setMyDetail(data)
            return data;
        } catch (error) {
            console.error("FetchMyDetail failed", error);
            return { status: 500 }; // Return a failure status
        }
    };

       const WithDrawBalance = async () => {
            // Simulate API call for WithDrawBalance
            try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/withdraw_balance`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}` // Replace `yourToken` with the actual token variable
                },
                body: JSON.stringify({ 
                    amount: amount,
                    password: password,
                }),
            });
            console.log('WithDrawBalance response', response)
            return response;
            } catch (error) {
            console.error("WithDrawBalance failed", error);
            toast.error("WithDrawBalance failed. Please try again.");
            return { status: 500 }; // Return a failure status
            }
        };

      const handleSubmit = async (e) => {
        try {
                e.preventDefault();

                if(amount == "" || password == "") {
                    toast.error("Validation Failed");
                } else {
                    const BankWithdrawResponse = await WithDrawBalance();
                    if (BankWithdrawResponse.status === 200) {
                        toast.success('Withdraw intiate successfully');
                        setTimeout(() => {
                            navigate('/my-components');
                        },2000)
                    } else {
                        toast.error("Something went wrong");
                    }
                }
            } catch (error) {
                console.error("handleSubmit", error);
                toast.error("handleSubmit. Please try again.");
                return { status: 500 }; // Return a failure status
            }
      }


    return (
        <div>
            <Navbar bg="primary" variant="dark" className="fixed-top">
                <Navbar.Brand href="#" className='px-4'>Withdraw </Navbar.Brand>
            </Navbar>
         <section>
            <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col-md-12">
                    <Card className="reset-password-card">
                            <Card.Body>
                                <Card>
                                <Card.Body>
                                    <h6>{myDetail?.balance} Rs </h6>
                                    Total Balance
                                </Card.Body>
                                </Card>
                                <br/>
                                <Form onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Control type="number" placeholder="Withraw Amount" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Control type="password" placeholder="withdraw Password " className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </Col>
                                    </Row>
                                    <h6> Total Transaction fees : 6 %</h6>

                                    <Row>
                                        <Col>
                                            <Button variant="primary" type="submit" className="btn-signup mt-3">
                                                Withdraw
                                            </Button>
                                        </Col>
                                    </Row>
                                  
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
         </section>
        </div>
    );
};

export default WithDraw;
