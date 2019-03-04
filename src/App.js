import React, { Component, Fragment } from "react";
import Home from "./components/Home";
import CreateTodo from "./components/CreateTodo";
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
          <Route path="/create" component={CreateTodo} />
          <Route exact path="/" component={Home} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
