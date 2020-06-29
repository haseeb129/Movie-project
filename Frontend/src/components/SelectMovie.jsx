import React from "react";
import { Button, Form, Image, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Row, Col } from "reactstrap";
import axios from "axios";
import Loader from "react-loader-spinner";

import auth from "./authService";
export default class Selectmovie extends React.Component {
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  state = {
    user: null,
    _id: this.props.location.state._id,
    Name: this.props.location.state.Name,
    Director: this.props.location.state.Director,
    Cast: this.props.location.state.Cast,
    Picture: this.props.location.state.Picture,
    Platinum: this.props.location.state.Platinum,
    Gold: this.props.location.state.Gold,
    Silver: this.props.location.state.Silver,
    Screen: null,
    Total_price: null,
    Price: null,
    Seats: 1,
    Shedual: null,
    Slots: null,
    Selected_date: null,
    Selected_slot: null,
    bookingloader: false,
  };
  constructor(props) {
    super(props);
    this.onRadioChange = this.onRadioChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);

    axios
      .get("http://localhost:5000/api/schedule/get")
      .then((response) => {
        this.setState({ Shedual: response.data });
      })
      .catch((err) => {
        console.log("Error Occured", err);
      });
  }

  onRadioChange(e) {
    this.setState({ Screen: e.target.value });
    this.setState({ Seats: 1 });
    if (e.target.value === "Silver") {
      this.setState({ Price: this.state.Silver });
      this.setState({ Total_price: this.state.Silver });
    } else if (e.target.value === "Gold") {
      this.setState({ Price: this.state.Gold });
      this.setState({ Total_price: this.state.Gold });
    } else if (e.target.value === "Platinum") {
      this.setState({ Price: this.state.Platinum });
      this.setState({ Total_price: this.state.Platinum });
    }
  }
  onChange = async (date) => {
    if (date.target.name === "date" && date.target.value !== null) {
      this.setState({ Selected_date: date.target.value });
      const slots = this.state.Shedual.find(
        (element) => element.date === date.target.value
      );
      await this.setState({ Slots: slots });
    } else if (date.target.name === "slot") {
      if (date.target.value !== "Not Available")
        await this.setState({ Selected_slot: date.target.value });
    }
  };

  handleSubmit(event) {
    console.log(this.state);
    this.setState({ bookingloader: true });
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/ticket/post", {
        _id: this.state.user._id,
        FirstName: this.state.user.FirstName,
        Email: this.state.user.Email,
        Name: this.state.Name,
        Selected_date: this.state.Selected_date,
        Selected_slot: this.state.Selected_slot,
        Screen: this.state.Screen,
        Seats: this.state.Seats,
        Total_price: this.state.Total_price,
      })
      .then((res) => {
        alert("Ticket Book Successfully");
        this.props.history.push("/Tickets");
        console.log(res);
      })
      .catch((err) => {
        this.setState({ bookingloader: false });
        console.log("error", err);
      });
    console.log(this.state);
  }

  increment = (e) => {
    const { Seats } = this.state;
    if (Seats < 10) this.setState({ Seats: this.state.Seats + 1 }, this.update);
    else {
      alert("maximum 10 seats allow at a time ");
    }
  };
  decrement = async (e) => {
    const { Seats } = this.state;
    if (Seats > 1)
      await this.setState({ Seats: this.state.Seats - 1 }, this.update);
  };

  update = (e) => {
    let { Price } = this.state;
    Price = Price * this.state.Seats;
    this.setState({ Total_price: Price });
  };

  render() {
    if (!this.props.location.state) return <h1>No Movies In The Database</h1>;
    return (
      <Form className="container" onSubmit={this.handleSubmit.bind(this)}>
        <br />
        <h1>
          <Badge variant="success">Booking</Badge>
        </h1>
        <br />
        <Row>
          <Col sm="6" md="6">
            <Row>
              <Col sm="3" md="3">
                <Form.Label>
                  <h4>
                    <Badge variant="info">Name</Badge>
                  </h4>
                </Form.Label>
              </Col>
              <Col sm="9" md="9">
                <Form.Label>
                  <h3>{this.state.Name}</h3>
                </Form.Label>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm="3" md="3">
                <Form.Label>
                  <h4>
                    <Badge variant="info">Director</Badge>
                  </h4>
                </Form.Label>
              </Col>
              <Col sm="9" md="9">
                <Form.Label>
                  <h3>{this.state.Director}</h3>
                </Form.Label>
              </Col>
            </Row>

            <br />
            <Row>
              <Col sm="3" md="3">
                <Form.Label>
                  <h4>
                    <Badge variant="info">Cast</Badge>
                  </h4>
                </Form.Label>
              </Col>
              <Col sm="9" md="9">
                <Form.Label>
                  <h3>{this.state.Cast}</h3>
                </Form.Label>
              </Col>
            </Row>

            <br />
            <Row>
              <Col sm="7">
                {this.state.Shedual && (
                  <Form.Control
                    as="select"
                    onChange={this.onChange}
                    name="date"
                  >
                    <option selected="true" disabled="disabled">
                      Select Date{" "}
                    </option>
                    {this.state.Shedual.map((c) => (
                      <option>{c.date}</option>
                    ))}
                  </Form.Control>
                )}
              </Col>

              {this.state.Slots !== null && (
                <Col sm="5">
                  {this.state.Slots.length !== 0 && (
                    <Form.Control
                      as="select"
                      onChange={this.onChange}
                      name="slot"
                    >
                      <option selected="true" disabled="disabled">
                        Select Slot{" "}
                      </option>
                      <option>
                        {this.state.Slots.slot1 === this.state._id
                          ? "Slot 1 : 9AM-12PM"
                          : "Not Available"}
                      </option>
                      <option>
                        {this.state.Slots.slot2 === this.state._id
                          ? "Slot 2 : 1PM-4PM"
                          : "Not Available"}
                      </option>
                      <option>
                        {this.state.Slots.slot3 === this.state._id
                          ? "Slot 3 : 5PM-9PM"
                          : "Not Available"}
                      </option>
                    </Form.Control>
                  )}
                </Col>
              )}
            </Row>

            <br />
            <Form.Row>
              <Col sm="6">
                <Form.Label>
                  <h4>
                    <Badge variant="info">Select Screen</Badge>
                  </h4>
                </Form.Label>
              </Col>

              <Col sm="6">
                <h4>
                  <Badge variant="warning">{this.state.Screen}</Badge>
                </h4>
              </Col>
            </Form.Row>
            <br />
            <Form.Row>
              <Col sm="4">
                <Form.Check
                  type="radio"
                  label="Platinum"
                  name="screen"
                  value="Platinum"
                  onChange={this.onRadioChange}
                  style={{ marginLeft: "10%" }}
                />
                <Form.Label className="container ml-4">
                  {this.state.Platinum}
                </Form.Label>
              </Col>
              <Col sm="4">
                <Form.Check
                  type="radio"
                  label="Gold"
                  name="screen"
                  value="Gold"
                  onChange={this.onRadioChange}
                  style={{ marginLeft: "10%", size: "5rem" }}
                />
                <Form.Label className="container ml-4">
                  {this.state.Gold}
                </Form.Label>
              </Col>
              <Col sm="4">
                <Form.Check
                  type="radio"
                  label="sliver"
                  name="screen"
                  value="Silver"
                  onChange={this.onRadioChange}
                  style={{ marginLeft: "10%", size: "5rem" }}
                />
                <Form.Label className=" container ml-4">
                  {this.state.Silver}
                </Form.Label>
              </Col>
            </Form.Row>
            <br />
            {this.state.Screen && (
              <Form.Row>
                <Col sm="6">
                  <h1>
                    <Badge
                      variant="danger"
                      value={this.state.Seats}
                      name="Seats"
                    >
                      Seats : {this.state.Seats}
                    </Badge>
                  </h1>
                </Col>
                <Col sm="3">
                  <Button variant="success" onClick={this.increment}>
                    +
                  </Button>
                </Col>
                <Col sm="3">
                  <Button variant="danger" onClick={this.decrement}>
                    -
                  </Button>
                </Col>
              </Form.Row>
            )}

            <Form.Row>
              <Col>
                <h1>
                  <Badge
                    block
                    variant="danger"
                    value={this.state.Seats}
                    name="Seats"
                  >
                    Total Price : {this.state.Total_price}
                  </Badge>
                </h1>
              </Col>
            </Form.Row>
            <br />
            <br />

            <Form.Row>
              {this.state.user && !this.state.bookingloader && (
                <Col>
                  <Button variant="success" size="lg" block type="submit">
                    Conform Booking
                  </Button>
                </Col>
              )}
              {this.state.bookingloader && (
                <Loader type="Bars" color="#E23D26" width="30" />
              )}
              {!this.state.user && (
                <Col>
                  <h2>
                    <Badge variant="info">Need To LogIn Or Register</Badge>
                  </h2>
                </Col>
              )}
            </Form.Row>

            <br />
          </Col>

          <Col sm="6">
            <Image
              src={this.state.Picture}
              rounded
              height="650"
              width="650"
              allowfullscreen
              className="embed-responsive embed-responsive-16by9"
            />
          </Col>
        </Row>
      </Form>
    );
  }
}
