import React, { Component } from "react";
import auth from "./authService";
export default class LogOut extends Component {
  componentDidMount() {
    auth.logout();
    window.location = "/";
  }
  render() {
    return (
      <div className="container" style={{ minHeight: "60vh" }}>
        <h1>Signing Out</h1>
      </div>
    );
  }
}
