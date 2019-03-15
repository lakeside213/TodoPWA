import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Tabs from "./Tabs";
import CreateList from "./CreateListDialog";
import CreateTodo from "../CreateTodo";
import SideDrawer from "./SideDrawer";
import ViewTodo from "./ViewDrawer";
import Snackbar from "../snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { openSnackbar, closeSnackbar } from "../../actions";

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
      isCreateTodoOpen: false,
      isViewDrawerOpen: false,
      selectedTodo: {},
      selectedList: "Todos",
      selectedTabIndex: 0
    };
  }
  componentDidMount() {
    if (this.props.user.lists.length > 0) {
      this.setState({ selectedList: this.props.user.lists[0] });
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (
      this.props.user.lists !== prevProps.user.lists &&
      prevProps.user.lists.length === 0
    ) {
      this.setState({ selectedList: this.props.user.lists[0] });
    }
    if (
      this.props.user.lists !== prevProps.user.lists &&
      this.props.user.lists.length === 0
    ) {
      this.setState({ selectedList: "Todos" });
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
  viewDrawerToggler = (todo = {}) => {
    this.setState(prevState => {
      return {
        isViewDrawerOpen: !prevState.isViewDrawerOpen,
        selectedTodo: todo
      };
    });
  };
  dialogToggler = () => {
    this.setState(prevState => {
      return { isDialogOpen: !prevState.isDialogOpen };
    });
  };
  createTodoToggler = () => {
    this.setState(prevState => {
      return { isCreateTodoOpen: !prevState.isCreateTodoOpen };
    });
  };

  render() {
    let {
      isDrawerOpen,
      isDialogOpen,
      selectedList,
      selectedTabIndex,
      isCreateTodoOpen,
      isViewDrawerOpen,
      selectedTodo
    } = this.state;
    let { user, classes, closeSnackbar, toast } = this.props;
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
          createToggler={this.createTodoToggler}
          viewToggler={this.viewDrawerToggler}
          lists={lists}
          todos={todos}
          selectedTabIndex={selectedTabIndex}
          changeTab={this.changeTab}
          snackbarOpen={toast.open}
          selectedList={selectedList}
          viewOpen={isViewDrawerOpen}
        />
        <CreateList
          dialogToggler={this.dialogToggler}
          isDialogOpen={isDialogOpen}
        />
        <CreateTodo
          dialogToggler={this.createTodoToggler}
          isDialogOpen={isCreateTodoOpen}
          selectedList={selectedList}
        />
        <ViewTodo
          todo={selectedTodo}
          open={isViewDrawerOpen}
          viewToggler={this.viewDrawerToggler}
        />
        <Snackbar
          closeSnackbar={closeSnackbar}
          message={toast.message}
          open={toast.open}
        />
      </Fragment>
    );
  }
}

function mapStateToProps({ snackbar }) {
  return { toast: snackbar.toast };
}
export default connect(
  mapStateToProps,
  { openSnackbar, closeSnackbar }
)(withStyles(styles)(Home));
