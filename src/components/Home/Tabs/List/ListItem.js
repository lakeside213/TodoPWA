import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DragIndicator from "@material-ui/icons/DragIndicator";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class Todo extends React.Component {
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
    const { classes, taskName, completed } = this.props;

    return (
      <ListItem role={undefined} dense button onClick={this.handleToggle()}>
        <Checkbox
          checked={this.state.checked.indexOf() !== -1}
          tabIndex={-1}
          disableRipple
          color="primary"
        />
        <ListItemText
          primary={completed ? <strike>{taskName}</strike> : taskName}
          secondary="Completed today 3:02am"
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Comments">
            <DragIndicator />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

Todo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Todo);
