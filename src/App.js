import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import SideDrawer from "./components/SideDrawer";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
class App extends Component {
  state = {
    isDrawerOpen: false
  };
  drawerToggler = () => {
    this.setState(prevState => {
      return { isDrawerOpen: !prevState.isDrawerOpen };
    });
  };
  render() {
    let { isDrawerOpen } = this.state;
    return (
      <Router>
        <Fragment>
          <Header drawerToggler={this.drawerToggler} />
          <SideDrawer
            isDrawerOpen={isDrawerOpen}
            drawerToggler={this.drawerToggler}
          />
        </Fragment>
      </Router>
    );
  }
}

export default App;
