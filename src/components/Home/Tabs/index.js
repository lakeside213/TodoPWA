import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Fab from "@material-ui/core/Fab";
import Create from "@material-ui/icons/Create";
import List from "./List";
import Badge from "@material-ui/core/Badge";
import EmptyState from "../../emptyState";

function TabContainer({ dir, todos, createToggler, viewToggler, viewOpen }) {
  return (
    <List
      dir={dir}
      todos={todos}
      createToggler={createToggler}
      viewToggler={viewToggler}
      viewOpen={viewOpen}
    />
  );
}

TabContainer.propTypes = {
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  fabMoveUp: {
    transform: "translate3d(0, -46px, 0)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut
    })
  },
  fabMoveDown: {
    transform: "translate3d(0, 0, 0)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp
    })
  }
});

class FullWidthTabs extends React.Component {
  constructor(props) {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    this.props.changeTab(value);
  };
  handleChangeIndex = index => {
    this.props.changeTab(index);
  };

  render() {
    const {
      classes,
      theme,
      createToggler,
      todos,
      lists,
      dialogToggler,
      selectedTabIndex,
      snackbarOpen,
      viewToggler,
      viewOpen
    } = this.props;
    const fabClassName = classNames(
      classes.fab,
      snackbarOpen ? classes.fabMoveUp : classes.fabMoveDown
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={selectedTabIndex} onChange={this.handleChange}>
            {lists.map((listName, index) => (
              <Tab
                label={
                  <Badge
                    className={classes.padding}
                    color="secondary"
                    badgeContent={
                      todos.filter(
                        todo =>
                          todo.list === listName && todo.completed !== true
                      ).length
                    }
                  >
                    {listName}
                  </Badge>
                }
                key={index}
                value={index}
              />
            ))}
          </Tabs>
        </AppBar>
        <div>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={selectedTabIndex}
            onChangeIndex={this.handleChangeIndex}
          >
            {lists.length > 0 ? (
              lists.map((listName, index) => (
                <TabContainer
                  dir={theme.direction}
                  todos={todos.filter(function(todo) {
                    return todo.list === listName;
                  })}
                  key={index}
                  createToggler={createToggler}
                  viewToggler={viewToggler}
                  viewOpen={viewOpen}
                />
              ))
            ) : (
              <EmptyState
                title="Create a list to get started"
                info="You currently have no lists create a list to get started"
                methodName="Create list"
                method={dialogToggler}
              />
            )}
          </SwipeableViews>
        </div>
        <Fab
          className={fabClassName}
          color="primary"
          onClick={() => {
            if (lists.length) {
              createToggler();
            } else {
              dialogToggler();
            }
          }}
        >
          <Create />
        </Fab>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
