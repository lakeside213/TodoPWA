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
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
      isDialogOpen: false,
      selectedList: "Todos",
      selectedTabIndex: 0
    };
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (
      this.props.user.lists !== prevProps.user.lists &&
      prevProps.user.lists.length === 0
    ) {
      this.setState({ selectedList: this.props.user.lists[0] });
    }
  }
  changeTab = value => {
    let lists = this.props.user.lists;
    this.setState({ selectedList: lists[value] });
    this.setState({ selectedTabIndex: value });
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
    let {
      isDrawerOpen,
      isDialogOpen,
      selectedList,
      selectedTabIndex
    } = this.state;
    console.log(this.props);
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
        <Header
          selectedList={selectedList}
          drawerToggler={this.drawerToggler}
        />
        <SideDrawer
          isDrawerOpen={isDrawerOpen}
          drawerToggler={this.drawerToggler}
          lists={lists}
          dialogToggler={this.dialogToggler}
          changeTab={this.changeTab}
        />

        <Tabs
          dialogToggler={this.dialogToggler}
          lists={lists}
          todos={todos}
          selectedTabIndex={selectedTabIndex}
          changeTab={this.changeTab}
        />
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
