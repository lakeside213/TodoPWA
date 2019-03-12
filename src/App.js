import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser } from "./actions";
import Home from "./components/Home";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return <Home user={this.props.user} />;
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(
  mapStateToProps,
  { fetchUser }
)(App);
