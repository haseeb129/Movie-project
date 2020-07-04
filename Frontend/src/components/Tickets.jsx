import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import auth from "./authService";
import Loader from "react-loader-spinner";
export default class Tickets extends Component {
  state = {
    arrCards: [],
    loading: true,
    emptyMessage: "No Movie Ticket Available",
    empty: false,
  };
  handleDelete = async (data) => {
    const r = window.confirm("Do you really want to Delete Ticket ?");
    if (r === false) {
      return;
    }
    const originalState = this.state.arrCards;
    const arrCards = this.state.arrCards.filter((c) => c._id !== data._id);
    this.setState({ arrCards: arrCards }); //remove from state
    const config = auth.getHeader();
    await axios
      .delete(`http://localhost:5000/api/Ticket/${data._id}`, config) //remove from Database
      .then((res) => {
        alert("Ticket Is Deleted");
      })
      .catch((err) => {
        alert("ERROR : Ticket Not Deleted");
        this.setState({ arrCards: originalState });
      });
  };

  fetchData = (e) => {
    axios
      .get("http://localhost:5000/api/ticket/get")
      .then(async (response) => {
        await this.setState({ arrCards: response.data }, () => {
          this.setState({ loading: false });
          if (this.state.arrCards === null || this.state.arrCards.length === 0)
            this.setState({ empty: true });
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  User_fetchData = (e) => {
    const userid = auth.getCurrentUser()._id;
    axios
      .get("http://localhost:5000/api/ticket/get")
      .then((response) => {
        const arrCards = response.data.filter((c) => c.Customer_id === userid);
        this.setState({ arrCards }, () => {
          this.setState({ loading: false });
          if (this.state.arrCards === null || this.state.arrCards.length === 0)
            this.setState({ empty: true });
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  componentDidMount() {
    if (auth.getCurrentUser()) {
      if (auth.getCurrentUser().admin) this.fetchData();
      else this.User_fetchData();
    }
  }
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
            <h1>All Tickets</h1>
            <Table striped hover responsive variant="dark">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Movie</th>
                  <th>Date</th>
                  <th>Slot</th>
                  <th>Screen</th>
                  <th>Seats</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {this.state.arrCards.map((data) => {
                  return (
                    <tr>
                      <td>{data.Customer}</td>
                      <td>{data.Email}</td>
                      <td>{data.Name}</td>
                      <td>{data.Date}</td>
                      <td>{data.Slot}</td>
                      <td>{data.Screen}</td>
                      <td>{data.Seats}</td>
                      <td>{data.Price}</td>
                      <td>
                        {auth.getCurrentUser() !== null && (
                          <Button
                            variant="danger"
                            size="lg"
                            onClick={() => this.handleDelete(data)}
                          >
                            Cancel Booking
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
