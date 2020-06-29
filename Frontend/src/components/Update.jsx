import React from "react";
import { Button, Alert, Form, Image, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Row, Col } from "reactstrap";
import axios from "axios";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

export default class Update extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    _id: this.props.location.state._id,
    Name: this.props.location.state.Name,
    Director: this.props.location.state.Director,
    Cast: this.props.location.state.Cast,
    Picture: this.props.location.state.Picture,
    Platinum: this.props.location.state.Platinum,
    Gold: this.props.location.state.Gold,
    Silver: this.props.location.state.Silver,
    loading: false,
    result: null,
  };

  handleChange = async (e) => {
    await this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (event) => {
    this.setState({ loading: true });
    this.setState({ result: null });
    await event.preventDefault();

    await axios
      .put(`http://localhost:5000/api/movie/update/${this.state._id}`, {
        Name: this.state.Name,
        Director: this.state.Director,
        Cast: this.state.Cast,
        Platinum: this.state.Platinum,
        Gold: this.state.Gold,
        Silver: this.state.Silver,
        Picture: this.state.Picture,
      })
      .then((res) => {
        window.location = "/";
      })
      .catch((err) => {
        this.setState({ loading: false });
        this.setState({ result: err.response.data.message });
      });
  };

  render() {
    return (
      <Form className="container" onSubmit={this.handleSubmit}>
        <h1>Update This Movie</h1>
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
                <Badge variant="info">Select Price</Badge>
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
            <br />
            <br />
            <Form.Row>
              {this.state.result && (
                <h6>
                  <Alert variant="danger">{this.state.result}</Alert>
                </h6>
              )}
            </Form.Row>
          </Col>

          <Col sm="6">
            {!this.state.loading && (
              <Button
                variant="success"
                size="lg"
                block
                type="submit"
                style={{ padding: "6%" }}
              >
                <h1>Update Details</h1>
              </Button>
            )}
            {this.state.loading && (
              <Loader
                type="Bars"
                color="#E23D26"
                height="85%"
                width="70%"
                style={{
                  marginTop: "1%",
                  marginLeft: "20%",
                  marginRight: "20%",
                  marginBottom: "1%",
                }}
              />
            )}
            {!this.state.loading && (
              <Link
                to={{
                  pathname: "/",
                  state: {
                    _id: this.props._id,
                    Name: this.props.Name,
                    Director: this.props.Director,
                    Cast: this.props.Cast,
                    Picture: this.props.Picture,
                    Platinum: this.props.Platinum,
                    Silver: this.props.Platinum,
                    Gold: this.props.Gold,
                  },
                }}
              >
                <Button
                  variant="warning"
                  size="lg"
                  block
                  className="mt-4"
                  type="submit"
                  style={{ padding: "6%" }}
                >
                  <h1>Back To Home</h1>
                </Button>
              </Link>
            )}
          </Col>
        </Row>
      </Form>
    );
  }
}
