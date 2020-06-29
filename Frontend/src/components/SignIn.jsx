import React, { Component } from "react";
import { Button, Card, Alert, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import User from "../Pictures/user.png";
import axios from "axios";
import auth from "./authService";

import { Row, Col } from "reactstrap";
import Loader from "react-loader-spinner";
class SignIn extends Component {
  state = {
    Email: null,
    Password: null,
    result: null,
    loading: false,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (event) => {
    this.setState({ loading: true });
    event.preventDefault();
    this.setState({ result: null });
    await axios
      .post("http://localhost:5000/api/user/signIn", {
        Email: this.state.Email,
        Password: this.state.Password,
      })
      .then(async (res) => {
        auth.logout();
        auth.loginWithJWT(res.data.token);
        window.location = "/";
      })
      .catch((err) => {
        this.setState({ loading: false });
        this.setState({ result: err.response.data.message });
      });
  };
  render() {
    return (
      <div className="container">
        <Row>
          <Col xl="12">
            <h1>SignIn </h1>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <Card
                className=" text-white bg-dark"
                style={{
                  width: "35rem",
                  marginTop: "2%",
                  marginLeft: "8%",
                }}
              >
                <Card.Img
                  src={User}
                  alt="Card image"
                  className="rounded-circle pull-right"
                  style={{
                    width: "25rem",
                    height: "20rem",
                    marginLeft: "13%",
                    marginTop: "9%",
                  }}
                />

                <Card.Body className="bg-dark text-white">
                  <br />
                  <Form.Control
                    type="email"
                    placeholder="Enter Your Email"
                    value={this.state.Email}
                    name="Email"
                    onChange={this.handleChange}
                    required
                  />
                  <br />
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={this.state.Password}
                    name="Password"
                    onChange={this.handleChange}
                    required
                  />
                  <br />
                  {!this.state.loading && (
                    <Button variant="danger" type="submit">
                      Submit
                    </Button>
                  )}
                  <br />
                  <br />
                  {this.state.result && (
                    <h5>
                      <Alert variant="danger">{this.state.result}</Alert>
                    </h5>
                  )}
                  {this.state.loading && (
                    <Loader
                      type="Bars"
                      color="#E23D26"
                      height={40}
                      width={78}
                    />
                  )}
                </Card.Body>
              </Card>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SignIn;
