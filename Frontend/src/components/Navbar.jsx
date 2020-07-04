import React from "react";
import { Navbar, Nav, Form, NavDropdown, Badge } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import logo1 from "../Pictures/brand.png";

export default class SampleNavbar extends React.Component {
  state = {
    user: this.props.user,
  };
  render() {
    return (
      <div>
        <Navbar variant="tabs" bg="dark" expand="lg" default>
          <Navbar.Brand href="#home">
            <NavLink
              style={{ color: "white", marginRight: "2rem" }}
              exact
              to="/"
            >
              <img
                alt=""
                src={logo1}
                width="150"
                height="30"
                className="d-inline-block align-top mr-4"
              />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavLink
                style={{ color: "white", marginRight: "2rem" }}
                exact
                to="/"
              >
                Home
              </NavLink>

              {this.state.user && this.state.user.admin && (
                <NavLink
                  style={{ color: "white", marginRight: "2rem" }}
                  to="/EnterMovie"
                >
                  Add Movies
                </NavLink>
              )}
              {this.state.user && this.state.user.admin && (
                <NavLink
                  style={{
                    color: "white",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                  to="/Schedual"
                >
                  Book Slots
                </NavLink>
              )}
              {this.state.user && this.state.user.admin && (
                <NavLink
                  style={{
                    color: "white",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                  to="/Users"
                >
                  Show All Users
                </NavLink>
              )}
              {this.state.user && (
                <NavLink
                  style={{ color: "white", marginRight: "2rem" }}
                  to="/Tickets"
                >
                  Tickets
                </NavLink>
              )}
              <NavLink
                style={{ color: "white", marginRight: "2rem" }}
                to="/CompleteSchedule"
              >
                Complete Schedule
              </NavLink>
              {this.state.user && (
                <NavLink
                  style={{ color: "white", marginRight: "2rem" }}
                  to="/SignOut"
                >
                  LogOut
                </NavLink>
              )}

              {!this.state.user && (
                <NavDropdown
                  style={{
                    color: "white",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                  title="LogIn"
                  id="collasible-nav-dropdown"
                  bg="dark"
                >
                  <NavDropdown.Item>
                    <Link
                      bg="dark"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                      to="/SignIn"
                    >
                      SignIn
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      bg="dark"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                      to="/SignUp"
                    >
                      SignUp
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>

            {this.state.user && (
              <Form inline>
                <Form.Label
                  style={{
                    color: "white",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  <h4>{this.state.user.FirstName}</h4>
                </Form.Label>
              </Form>
            )}

            {this.state.user && this.state.user.admin && (
              <Form inline>
                <Form.Label>
                  <Badge variant="light">Admin Panel</Badge>
                </Form.Label>
              </Form>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
