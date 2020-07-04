import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import auth from "./authService";
import Loader from "react-loader-spinner";
export default class Users extends Component {
  constructor(props) {
    super(props);
    this.fetchData();
  }

  state = {
    arrCards: [],
    loading: true,
    emptyMessage: "No Regiter in System",
    empty: false,
  };
  handleDelete = async (data) => {
    const r = window.confirm("Do you really want to Delete User ?");
    if (r === false) {
      return;
    }
    const config = auth.getHeader();
    const originalState = this.state.arrCards;
    const arrCards = this.state.arrCards.filter((c) => c._id !== data._id);
    this.setState({ arrCards: arrCards }); //remove from state

    await axios
      .delete(`http://localhost:5000/api/user/${data._id}`, config) //remove from Database
      .then((res) => {
        alert("User Is Deleted");
      })
      .catch((err) => {
        alert("ERROR : User Not Deleted");
        this.setState({ arrCards: originalState });
      });
  };

  fetchData = (e) => {
    axios
      .get("http://localhost:5000/api/user/get")
      .then((response) => {
        this.setState({ arrCards: response.data }, () => {
          this.setState({ loading: false });
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  componentDidMount() {
    this.fetchData();
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
            <h1>All Users</h1>

            <Table striped hover responsive variant="dark">
              <thead>
                <tr>
                  <th>
                    <h4>Name</h4>
                  </th>
                  <th>
                    <h4>Email</h4>
                  </th>
                  <th>
                    <h4>Phone_No</h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.arrCards.map((data) => {
                  return (
                    <tr>
                      <td>
                        <h6>{data.FirstName}</h6>
                      </td>
                      <td>
                        <h6>{data.Email}</h6>
                      </td>
                      <td>
                        <h6>{data.Phone}</h6>
                      </td>
                      <td>
                        {!data.admin && (
                          <Button
                            variant="danger"
                            onClick={() => this.handleDelete(data)}
                            size="lg"
                          >
                            Delete
                          </Button>
                        )}
                        {data.admin && (
                          <h3>
                            <Badge variant="light">ADMIN</Badge>
                          </h3>
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
