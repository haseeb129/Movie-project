import React from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import auth from "./authService";
export default class MovieCard extends React.Component {
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user }, function () {});
  }
  state = {
    user: null,
    _id: this.props._id,
    Name: this.props.Name,
    Director: this.props.Director,
    Cast: this.props.Cast,
    Picture: this.props.Picture,
    Platinum: this.props.Platinum,
    Gold: this.props.Gold,
    Silver: this.props.Silver,
    buttonString: "Show details",
  };
  render() {
    return (
      <Card className="bg-dark text-white m-2" style={{ width: "23rem" }}>
        <Card.Img variant="top" src={this.props.Picture} height="300" />
        <Card.Body>
          <Card.Title>{this.props.Name}</Card.Title>
          <Card.Subtitle>{this.props.Director}</Card.Subtitle>
          <Card.Text>{this.props.Cast}</Card.Text>
          <Row className="mb-2">
            <Col sm="6">
              <Link
                to={{
                  pathname: "/SelectMovie",
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
                <Button variant="success" block className="container">
                  {this.state.buttonString}
                </Button>
              </Link>
            </Col>

            {this.state.user && this.state.user.admin && (
              <Col sm="6">
                <Link
                  to={{
                    pathname: "/Update",
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
                  <Button variant="warning" block className="container">
                    Update the Details
                  </Button>
                </Link>
              </Col>
            )}
          </Row>

          <Row>
            {this.state.user && this.state.user.admin && (
              <Col sm="12">
                <Button
                  variant="danger"
                  block
                  onClick={() => this.props.onDelete(this.props._id)}
                  style={{ padding: "9%" }}
                >
                  Delete
                </Button>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
    );
  }
}
