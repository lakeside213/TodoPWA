import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions";
import { withStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Tabs from "./Tabs";
import CreateList from "./CreateListDialog";
import SideDrawer from "./SideDrawer";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class Home extends Component {
  state = {
    isDrawerOpen: false,
    isDialogOpen: false
  };

  drawerToggler = () => {
    this.setState(prevState => {
      return { isDrawerOpen: !prevState.isDrawerOpen };
    });
  };
  dialogToggler = () => {
    this.setState(prevState => {
      return { isDialogOpen: !prevState.isDialogOpen };
    });
  };
  render() {
    let { isDrawerOpen, isDialogOpen } = this.state;
    let { user, classes } = this.props;
    let { lists, todos } = user;
    if (!user) {
      return (
        <Fragment>
          <Header drawerToggler={this.drawerToggler} />
          <CircularProgress className={classes.progress} />
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Header drawerToggler={this.drawerToggler} />
        <SideDrawer
          isDrawerOpen={isDrawerOpen}
          drawerToggler={this.drawerToggler}
          lists={lists}
          dialogToggler={this.dialogToggler}
        />

        <Tabs />
        <CreateList
          dialogToggler={this.dialogToggler}
          isDialogOpen={isDialogOpen}
        />
      </Fragment>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(withStyles(styles)(Home));
