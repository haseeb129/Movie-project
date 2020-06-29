import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import SingleCard from "./SingleCard";
import axios from "axios";
import { Row, Col } from "reactstrap";
import auth from "./authService";
axios.defaults.headers.common["x-auth-token"] = "Token is here";

export default class MovieCard extends React.Component {
  state = {
    arrCards: this.props.state,
  };

  handleDelete = async (_id) => {
    const r = window.confirm("Do you really want to Delete ?");
    if (r === false) {
      return;
    }
    const originalState = this.state.arrCards;
    const arrCards = this.state.arrCards.filter((c) => c._id !== _id);
    this.setState({ arrCards: arrCards }); //remove from state
    const config = auth.getHeader();

    await axios
      .delete(`http://localhost:5000/api/movie/delete/${_id}`, config) //remove from Database
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        alert("ERROR : Movie Not Deleted");
        this.setState({ arrCards: originalState });
      });
  };
  render() {
    const { arrCards } = this.state;

    return (
      <div className="container">
        <h1>Movie available</h1>
        <Row>
          {arrCards.map((data) => {
            return (
              <Col xs lg="4">
                <SingleCard
                  _id={data._id}
                  Name={data.Name}
                  Director={data.Director}
                  Cast={data.Cast}
                  Picture={data.imagefile}
                  Platinum={data.Platinum}
                  Gold={data.Gold}
                  Silver={data.Silver}
                  onDelete={this.handleDelete}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}
