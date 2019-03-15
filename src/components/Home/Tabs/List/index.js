import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "./ListItem";
import EmptyState from "../../../emptyState";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    overflow: "auto",
    webkitOverflowScrolling: "touch"
  }
});

class TodoLists extends React.Component {
  render() {
    const { classes, todos, createToggler, viewToggler, viewOpen } = this.props;

    if (todos.length < 1) {
      return (
        <EmptyState
          title="Create a todo"
          info="You currently have no todos"
          methodName="Create Todo"
          method={() => {
            createToggler();
          }}
        />
      );
    }
    return (
      <List className={classes.root}>
        {todos.map((todo, index) => (
          <Fragment key={index}>
            <ListItem
              todo={todo}
              viewToggler={viewToggler}
              viewOpen={viewOpen}
            />

            <Divider />
          </Fragment>
        ))}
      </List>
    );
  }
}

TodoLists.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TodoLists);
