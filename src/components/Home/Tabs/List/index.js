import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListItem from "./ListItem";
import EmptyState from "../../../emptyState";
const styles = theme => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper
  }
});

class TodoLists extends React.Component {
  render() {
    const { classes, todos, history } = this.props;

    if (todos.length < 1) {
      return (
        <EmptyState
          title="Create a todo"
          info="You currently have no todos"
          methodName="Create Todo"
          method={() => {
            history.push("/create");
          }}
        />
      );
    }
    return (
      <List className={classes.root}>
        {todos.map((todo, index) => (
          <ListItem
            taskName={todo.taskName}
            completed={todo.completed}
            completedAt={todo.completedAt}
            id={todo.id}
          />
        ))}
      </List>
    );
  }
}

TodoLists.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(TodoLists));
