import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, openSnackbar } from "./actions";
import Home from "./components/Home";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();

    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };
    // Detects if device is in standalone mode
    const isInStandaloneMode = () =>
      "standalone" in window.navigator && window.navigator.standalone;
    if (isIos() && isInStandaloneMode()) {
      this.props.openSnackbar(
        "Install this app on your device.Tap the share icon and then Add to homescreen "
      );
    }

    if (!navigator.onLine) {
      this.props.openSnackbar("Not connected to the internet");
    }
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
  { fetchUser, openSnackbar }
)(App);
