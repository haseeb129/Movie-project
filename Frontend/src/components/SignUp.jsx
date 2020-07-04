import React from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import logo1 from "../Pictures/2.png";
import { Row, Col } from "reactstrap";
import axios from "axios";
import Loader from "react-loader-spinner";
import inputButton from "./inputButton.css";
import auth from "./authService";
export default class Signup extends React.Component {
  state = {
    FirstName: null,
    LastName: null,
    Email: null,
    Password: null,
    Phone: null,
    Picture: logo1,
    file: null,
    result: null,
    loading: false,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  _onChange = async (e) => {
    const file = this.refs.uploadImg.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        Picture: reader.result,
      });
    };
    await this.setState({ file });
    if (file) {
      reader.readAsDataURL(file);
      this.setState({
        Picture: reader.result,
      });
    } else {
      this.setState({
        Picture: "",
      });
    }
  };
  handleSubmit = async (event) => {
    this.setState({ loading: true });
    event.preventDefault();
    this.setState({ result: null });
    if (this.state.file !== null) {
      const data = new FormData();
      await data.append("file", this.state.file);
      await data.append("FirstName", this.state.FirstName);
      await data.append("LastName", this.state.LastName);
      await data.append("Email", this.state.Email);
      await data.append("Password", this.state.Password);
      await data.append("Phone", this.state.Phone);

      axios
        .post("http://localhost:5000/api/user/signUp", data)
        .then((res) => {
          auth.loginWithJWT(res.headers["x-auth-token"]);
          window.location = "/";
        })
        .catch((err) => {
          this.setState({ loading: false });
          this.setState({ result: err.response.data.message });
        });
    } else {
      alert("Select Image");
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div className="container">
        <Row>
          <Col xl="12">
            <h1>SignUp </h1>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <Card
                className="bg-dark text-white m-2"
                style={{
                  width: "35rem",
                  marginTop: "2%",
                  marginLeft: "8%",
                }}
              >
                <Card.Img
                  src={this.state.Picture}
                  alt="Card image"
                  className="rounded-circle pull-right"
                  style={{
                    width: "25rem",
                    height: "20rem",
                    marginLeft: "13%",
                    marginTop: "9%",
                  }}
                />
                <div className="upload-btn-wrapper">
                  <label>
                    <button className="btn browse-btn brown" size="lg" block>
                      Upload Image
                    </button>
                    <input
                      type="file"
                      variant="danger"
                      ref="uploadImg"
                      name="selectedFile"
                      size="lg"
                      block
                      onChange={this._onChange}
                    />
                  </label>
                </div>

                <Card.Body className="bg-dark text-white">
                  <br />
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name  Length must be 3 - 50 character "
                    value={this.state.FirstName}
                    name="FirstName"
                    onChange={this.handleChange}
                    required
                  />
                  <br />
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name  Length must be 3 - 50 character"
                    value={this.state.LastName}
                    name="LastName"
                    onChange={this.handleChange}
                    required
                  />
                  <br />
                  <Form.Control
                    type="email"
                    placeholder="Email   Length must be 5 - 50 character"
                    value={this.state.Email}
                    name="Email"
                    onChange={this.handleChange}
                    required
                  />
                  <br />
                  <Form.Control
                    type="number"
                    placeholder="Enter Phone  Length must be 5 - 25 digits"
                    value={this.state.Phone}
                    name="Phone"
                    onChange={this.handleChange}
                    required
                  />
                  <br />
                  <Form.Control
                    type="password"
                    placeholder="Enter Password  Length must be 4 - 30 "
                    name="Password"
                    value={this.state.Password}
                    onChange={this.handleChange}
                    required
                  />

                  <br />

                  {!this.state.loading && (
                    <Button size="lg" block variant="danger" type="submit">
                      Submit
                    </Button>
                  )}
                  <br />

                  {this.state.result && (
                    <h5>
                      <Alert variant="danger">{this.state.result}</Alert>
                    </h5>
                  )}

                  {this.state.loading && (
                    <Loader
                      type="Bars"
                      //                    className="loader"
                      color="#E23D26"
                      height={70}
                      width={60}
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
