import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "./ListItem";

const styles = theme => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper
  }
});

class TodoLists extends React.Component {
  state = {
    checked: [0]
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  render() {
    const { classes, todos } = this.props;

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
