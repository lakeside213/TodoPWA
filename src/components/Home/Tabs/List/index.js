import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListItem from "./ListItem";

const styles = theme => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper
  }
});

class TodoLists extends React.Component {
  render() {
    const { classes, todos } = this.props;

    if (todos.length < 1) {
      return (
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography variant="h5" gutterBottom>
            Add Items to this list **EDIT
          </Typography>
        </Grid>
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

export default withStyles(styles)(TodoLists);
