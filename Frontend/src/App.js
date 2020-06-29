import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import { Redirect } from "react-router-dom";
import Users from "./components/Users";
import Signup from "./components/SignUp";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import Tickets from "./components/Tickets";
import Selectmovie from "./components/SelectMovie";
import Entermovie from "./components/EnterMovie";
import Update from "./components/Update";
import Footer1 from "./components/Footer1";
import Schedual from "./components/Schedual";
import CompleteShedule from "./components/CompleteShedule";
import auth from "./components/authService";
import "./App.css";

class App extends Component {
  state = { present: false };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user }, function () {
      this.setState({ present: true });
    });
  }
  render() {
    return (
      <React.Fragment>
        <Router>
          <div className="background">
            <div className="transbox">
              {this.state.present && <Navbar user={this.state.user} />}
              <br />
              <Switch>
                <Route exact path="/" component={Carousel} />
                <Route
                  path="/Tickets"
                  render={(props) => {
                    if (!this.state.user) return <Redirect to="/" />;
                    else return <Tickets {...props} />;
                  }}
                />
                <Route
                  path="/SignOut"
                  render={(props) => {
                    if (!this.state.user) return <Redirect to="/" />;
                    else return <SignOut {...props} />;
                  }}
                />
                <Route
                  path="/SignIn"
                  render={(props) => {
                    if (this.state.user) return <Redirect to="/" />;
                    else return <SignIn {...props} />;
                  }}
                />
                <Route
                  path="/SignUp"
                  render={(props) => {
                    if (this.state.user) return <Redirect to="/" />;
                    else return <Signup {...props} />;
                  }}
                />
                {this.state.present && (
                  <Route
                    path="/CompleteSchedule"
                    component={() => <CompleteShedule user={this.state.user} />}
                  />
                )}
                <Route
                  path="/SelectMovie"
                  render={(props) => {
                    if (!this.state.user) return <Redirect to="/SignIn" />;
                    else return <Selectmovie {...props} />;
                  }}
                />

                <Route
                  path="/Update"
                  render={(props) => {
                    if (
                      !(
                        this.state.user &&
                        this.state.user &&
                        this.state.user.admin
                      )
                    )
                      return <Redirect to="/SignIn" />;
                    else return <Update {...props} />;
                  }}
                />

                <Route
                  path="/Schedual"
                  render={(props) => {
                    if (
                      this.state.present &&
                      this.state.user &&
                      this.state.user.admin
                    )
                      return <Schedual {...props} />;
                    else return <Redirect to="/SignIn" />;
                  }}
                />

                <Route
                  path="/Users"
                  render={(props) => {
                    if (
                      this.state.present &&
                      this.state.user &&
                      this.state.user.admin
                    )
                      return <Users {...props} />;
                    else return <Redirect to="/SignIn" />;
                  }}
                />

                <Route
                  path="/Entermovie"
                  render={(props) => {
                    if (
                      this.state.present &&
                      this.state.user &&
                      this.state.user.admin
                    )
                      return <Entermovie {...props} />;
                    else return <Redirect to="/SignIn" />;
                  }}
                />
              </Switch>
              <br />
              <Footer1 />
            </div>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
