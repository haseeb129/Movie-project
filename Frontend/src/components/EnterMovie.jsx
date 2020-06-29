import React from "react";
import { Form, Image, Button, Badge, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Default from "../Pictures/Default.jpg";
import { Row, Col } from "reactstrap";
import axios from "axios";
import Loader from "react-loader-spinner";
import inputButton from "./inputButton.css";
import auth from "./authService";

export default class EnterMovie extends React.Component {
  state = {
    Name: null,
    Director: null,
    Cast: null,
    Picture: Default,
    Platinum: null,
    Gold: null,
    Silver: null,
    file: null,
    loading: false,
    result: null,
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this._onChange = this._onChange.bind(this);
  }
  handleChange = async (e) => {
    await this.setState({ [e.target.name]: e.target.value });
  };

  _onChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
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
    await event.preventDefault();
    this.setState({ loading: true });
    this.setState({ result: null });
    const config = auth.getHeader();

    if (this.state.file !== null) {
      const data = new FormData();
      await data.append("file", this.state.file);
      await data.append("Name", this.state.Name);
      await data.append("Director", this.state.Director);
      await data.append("Cast", this.state.Cast);
      await data.append("Platinum", this.state.Platinum);
      await data.append("Gold", this.state.Gold);
      await data.append("Silver", this.state.Silver);
      await axios
        .post("http://localhost:5000/api/movie/post1122", data, config)
        .then((res) => {
          window.location = "/";
        })
        .catch((err) => {
          this.setState({ loading: false });
          this.setState({ result: err.response.data.message });
        });
    } else {
      this.setState({ loading: false });
      this.setState({ result: "Upload picture First" });
    }
  };

  render() {
    return (
      <Form className="container" onSubmit={this.handleSubmit}>
        <h1>Enter Movie</h1>
        <Row className="mb-5">
          <Col>
            <Image
              src={this.state.Picture}
              rounded
              height="600"
              width="1200"
              className="embed-responsive embed-responsive-16by9"
              allowfullscreen
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            />

            <div className="upload-btn-wrapper">
              <label>
                <button className="btn browse-btn brown ">
                  <span className="font"> Upload Image</span>
                </button>
                <input
                  type="file"
                  variant="danger"
                  ref="uploadImg"
                  name="selectedFile"
                  onChange={this._onChange}
                />
              </label>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="6">
            <Form.Row>
              <Col sm="12">
                <Form.Control
                  type="text"
                  placeholder="Enter Movie Name"
                  value={this.state.Name}
                  name="Name"
                  onChange={this.handleChange}
                  required
                />
              </Col>
            </Form.Row>

            <br />
            <Form.Row>
              <Col sm="12">
                <Form.Control
                  type="text"
                  placeholder="Enter Movie Director"
                  value={this.state.Director}
                  name="Director"
                  onChange={this.handleChange}
                  required
                />
              </Col>
            </Form.Row>
            <br />
            <Form.Row>
              <Col sm="12">
                <Form.Control
                  type="textbox"
                  placeholder="Enter Movie Cast"
                  value={this.state.Cast}
                  name="Cast"
                  onChange={this.handleChange}
                  required
                />
              </Col>
            </Form.Row>
            <br />
            <Form.Label>
              <h4>
                <Badge variant="info">Screen Price</Badge>
              </h4>{" "}
            </Form.Label>
            <br />
            <Form.Row>
              <Col sm="4">
                <Form.Control
                  type="number"
                  placeholder="Platinum Price"
                  value={this.state.Platinum}
                  name="Platinum"
                  onChange={this.handleChange}
                  required
                />
              </Col>
              <Col sm="4">
                <Form.Control
                  type="number"
                  placeholder="Gold Price"
                  value={this.state.Gold}
                  name="Gold"
                  onChange={this.handleChange}
                  required
                />
              </Col>
              <Col sm="4">
                <Form.Control
                  type="number"
                  placeholder="Silver Price"
                  value={this.state.Silver}
                  name="Silver"
                  onChange={this.handleChange}
                  required
                />
              </Col>
            </Form.Row>
          </Col>

          <Col sm="6">
            {!this.state.loading && (
              <div>
                <Button
                  variant="success"
                  size="lg"
                  block
                  type="submit"
                  style={{ padding: "10%" }}
                >
                  <h1>Enter This Movie</h1>
                </Button>
              </div>
            )}

            {this.state.loading && (
              <Loader
                type="Bars"
                color="#E23D26"
                height="50%"
                width="50%"
                style={{
                  marginTop: "2%",
                  marginLeft: "20%",
                  marginRight: "20%",
                  marginBottom: "2%",
                }}
              />
            )}

            <br />
            {this.state.result && (
              <h4>
                <Alert variant="danger">{this.state.result}</Alert>
              </h4>
            )}
          </Col>
        </Row>
      </Form>
    );
  }
}
