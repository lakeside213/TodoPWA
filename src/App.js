import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchUser } from "./actions";
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
  componentDidMount() {
    this.props.fetchUser();
  }

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

function mapStateToProps({ user }) {
  return { user };
}

export default connect(
  mapStateToProps,
  { fetchUser }
)(App);
