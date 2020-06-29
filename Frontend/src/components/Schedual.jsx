import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import { Row, Col } from "reactstrap";
import Calendar from "react-calendar";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import auth from "./authService";
export default class Schedual extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    axios
      .get("http://localhost:5000/api/movie/get")
      .then((response) => {
        this.setState({ movies: response.data });
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
  state = {
    date: null,
    movies: [{ Name: "", _id: "" }],
    slot1: null,
    slot2: null,
    slot3: null,
    solt1Badge: null,
    solt2Badge: null,
    solt3Badge: null,
  };
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value }, function () {});
  }

  findElement(movie) {
    if (movie !== null)
      return this.state.movies.find(
        (element) => element.Name === movie || element._id === movie
      );
    else return null;
  }

  onChange = async (date) => {
    const str = "" + date;
    const res = str.split(" ", 5);
    const result = res[1] + "-" + res[2] + "-" + res[3];
    this.setState({ date: result }, function () {
      axios
        .post("http://localhost:5000/api/Schedule/find", {
          date: this.state.date,
        })
        .then((response) => {
          if (response.data !== "" && response.data !== null) {
            const checkSlot1 = this.findElement(response.data.slot1);
            this.setState({
              solt1Badge: checkSlot1 === null ? "Available" : checkSlot1.Name,
            });
            this.setState({
              slot1: checkSlot1 === null ? "" : checkSlot1.Name,
            });
            const checkSlot2 = this.findElement(response.data.slot2);
            this.setState({
              solt2Badge: checkSlot2 === null ? "Available" : checkSlot2.Name,
            });
            this.setState({
              slot2: checkSlot2 === null ? "" : checkSlot2.Name,
            });
            const checkSlot3 = this.findElement(response.data.slot3);
            this.setState({
              solt3Badge: checkSlot3 === null ? "Available" : checkSlot3.Name,
            });
            this.setState({
              slot3: checkSlot3 === null ? "" : checkSlot3.Name,
            });
          } else {
            this.setState({ solt1Badge: "Available" });
            this.setState({ solt2Badge: "Available" });
            this.setState({ solt3Badge: "Available" });
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.date === null) {
      alert("Please select date");
      return;
    }

    const config = auth.getHeader();
    await this.setState({
      slot1:
        this.findElement(this.state.slot1) === null
          ? null
          : this.findElement(this.state.slot1)._id,
    });
    await this.setState({
      slot2:
        this.findElement(this.state.slot2) === null
          ? null
          : this.findElement(this.state.slot2)._id,
    });
    await this.setState({
      slot3:
        this.findElement(this.state.slot3) === null
          ? null
          : this.findElement(this.state.slot3)._id,
    });
    axios
      .post(
        "http://localhost:5000/api/Schedule/post",
        {
          date: this.state.date,
          slot1: this.state.slot1,
          slot2: this.state.slot2,
          slot3: this.state.slot3,
        },
        config
      )
      .then((res) => {
        window.location = "/CompleteSchedule";
      })
      .catch((err) => {
        alert("Data Missing");
      });
  };

  render() {
    return (
      <Form className="container" onSubmit={this.handleSubmit.bind(this)}>
        <h1 className="d-flex mb-2 mt-2">Select Your Time </h1>

        <Row>
          <Col sm="5">
            <h5 class="d-flex ">Date</h5>
            <Calendar onChange={this.onChange} defaultValue="" required />
          </Col>
          <Col sm="7">
            <Row className="mb-4">
              <Col>
                <h3 class="d-flex justify-content-sm-center">
                  <Badge variant="info">Slot 1</Badge>
                </h3>
                <h4 class="d-flex justify-content-sm-center">
                  <Badge variant="info">9AM-12PM</Badge>
                </h4>
                <Row>
                  <Col sm="8">
                    <Form.Control
                      as="select"
                      value={this.state.slot1}
                      name="slot1"
                      onChange={this.handleChange}
                    >
                      <option selected="true" disabled="disabled">
                        {"Select Movie For Slot 1 "}
                      </option>

                      {this.state.movies.map((c) => (
                        <option>{c.Name}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col sm="4">
                    <h3>
                      <Badge variant="danger">{this.state.solt1Badge}</Badge>
                    </h3>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <h3 class="d-flex justify-content-sm-center">
                  <Badge variant="info">Slot 2</Badge>
                </h3>
                <h4 class="d-flex justify-content-sm-center">
                  <Badge variant="info">2PM-5PM</Badge>
                </h4>
                <Row>
                  <Col sm="8">
                    <Form.Control
                      as="select"
                      value={this.state.slot2}
                      name="slot2"
                      onChange={this.handleChange}
                    >
                      <option selected="true" disabled="disabled">
                        Select Movie For Slot 2{" "}
                      </option>
                      {this.state.movies.map((c) => (
                        <option>{c.Name}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col sm="4">
                    <h3>
                      <Badge variant="danger">{this.state.solt2Badge}</Badge>
                    </h3>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <h3 class="d-flex justify-content-sm-center">
                  <Badge variant="info">Slot 3</Badge>
                </h3>
                <h4 class="d-flex justify-content-sm-center">
                  <Badge variant="info">7PM-10PM</Badge>
                </h4>
                <Row>
                  <Col sm="8">
                    <Form.Control
                      as="select"
                      value={this.state.slot3}
                      name="slot3"
                      onChange={this.handleChange}
                    >
                      <option selected="true" disabled="disabled">
                        Select Movie For Slot 3
                      </option>
                      ))
                      {this.state.movies.map((c) => (
                        <option>{c.Name}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col sm="4">
                    <h3>
                      <Badge variant="danger">{this.state.solt3Badge}</Badge>
                    </h3>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col sm="12">
            <Button variant="primary" size="lg" block type="submit">
              Conform day booking
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
