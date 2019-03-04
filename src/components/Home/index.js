import React, { Component, Fragment } from "react";
import Header from "./Header";
import Tabs from "./Tabs";
import SideDrawer from "./SideDrawer";

class Home extends Component {
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
      <Fragment>
        <Header drawerToggler={this.drawerToggler} />
        <SideDrawer
          isDrawerOpen={isDrawerOpen}
          drawerToggler={this.drawerToggler}
        />
        <Tabs />
      </Fragment>
    );
  }
}

export default Home;
