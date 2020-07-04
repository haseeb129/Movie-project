import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import axios from "axios";
import auth from "./authService";
import Loader from "react-loader-spinner";
export default class CompleteSchedule extends Component {
  state = {
    shedualMovies: [],
    user: this.props.user,
    loading: true,
    emptyMessage: "No Movie Schedule Available",
    empty: false,
  };
  async componentDidMount() {
    axios
      .get("http://localhost:5000/api/schedule/scheduleList")
      .then((response) => {
        this.setState({ shedualMovies: response.data }, () => {
          this.setState({ loading: false });
          if (
            this.state.shedualMovies === null ||
            this.state.shedualMovies.length === 0
          )
            this.setState({ empty: true });
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  handleDelete = async (event) => {
    const r = window.confirm("Do you really want to Delete ?");
    const _id = event._id;
    if (r === false) {
      return;
    }
    const originalState = this.state.shedualMovies;
    const shedualMovies = this.state.shedualMovies.filter((c) => c._id !== _id);
    this.setState({ shedualMovies: shedualMovies }); //remove from state
    const config = auth.getHeader();

    await axios
      .delete(`http://localhost:5000/api/schedule/delete/${_id}`, config) //remove from Database
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        alert("ERROR : Movie Not Deleted");
        this.setState({ shedualMovies: originalState });
      });
  };

  render() {
    const { loading } = this.state;
    if (this.state.empty)
      return (
        <div className="container" style={{ minHeight: "60vh" }}>
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
          <div className="container" style={{ minHeight: "60vh" }}>
            <h1>Complete Schedule</h1>
            <Table striped hover variant="dark" className="text-center">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>
                    Slot 1 <br />
                    <h5>
                      <Badge variant="light">9 AM - 12 PM</Badge>
                    </h5>
                  </th>
                  <th>
                    Slot 2 <br />{" "}
                    <h5>
                      {" "}
                      <Badge variant="light">2 PM - 5 PM</Badge>
                    </h5>
                  </th>
                  <th>
                    Slot 3 <br />{" "}
                    <h5>
                      {" "}
                      <Badge variant="light">7 PM - 10 PM</Badge>
                    </h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.shedualMovies &&
                  this.state.shedualMovies.map((data) => {
                    return (
                      <tr>
                        <td>{data.date}</td>
                        <td>{data.slot1}</td>
                        <td>{data.slot2}</td>
                        <td>{data.slot3}</td>
                        <td>
                          {this.state.user && this.state.user.admin && (
                            <Button
                              variant="danger"
                              onClick={() => this.handleDelete(data)}
                              size="lg"
                            >
                              Delete
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        );
    }
  }
}
