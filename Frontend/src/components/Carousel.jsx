import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "./Card";
import axios from "axios";
import { Row } from "reactstrap";
import Loader from "react-loader-spinner";
export default class CarouselBar extends React.Component {
  state = {
    arrimage: [],
    loadingState: true,
    loading: true,
    emptyMessage: "No Movie Available",
    empty: false,
  };
  async componentDidMount() {
    await axios
      .get("http://localhost:5000/api/movie/get")
      .then((response) => {
        this.setState({ arrimage: response.data }, () => {
          this.setState({ loadingState: false });
          this.setState({ loading: false });
          if (this.state.arrimage === null || this.state.arrimage.length === 0)
            this.setState({ empty: true });
        });
        //
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  render() {
    const { loading } = this.state;
    if (this.state.empty)
      return (
        <div className="container">
          <h1>{this.state.emptyMessage}</h1>
        </div>
      );
    else {
      if (loading)
        return (
          <Loader
            type="Bars"
            className="loader"
            color="#E23D26"
            height={200}
            width={200}
          />
        );
      else
        return (
          <div>
            <Row>
              <Carousel
                pauseOnHover="true"
                interval="3000"
                className="container pt-3"
              >
                {this.state.arrimage.map((c) => (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={c.imagefile}
                      alt="First slide"
                      height="600"
                    />
                    <Carousel.Caption>
                      <h3>{c.Name}</h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Row>
            <Row>
              {!this.state.loadingState && <Card state={this.state.arrimage} />}
            </Row>
          </div>
        );
    }
  }
}
