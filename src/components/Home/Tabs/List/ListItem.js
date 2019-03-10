import React from "react";
import Moment from "react-moment";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { toggleTodo } from "../../../../actions";
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

  handleToggle = id => {
    // const { checked } = this.state;
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];
    //
    // if (currentIndex === -1) {
    //   newChecked.push(value);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }
    //
    // this.setState({
    //   checked: newChecked
    // });
    this.props.toggleTodo(id);
  };
  getTime = completedAt => {
    return Moment(completedAt).calendar();
  };

  render() {
    const { classes, taskName, completed, completedAt, id } = this.props;

    return (
      <ListItem role={undefined} dense button>
        <Checkbox
          checked={completed}
          tabIndex={-1}
          disableRipple
          color="primary"
          onClick={() => {
            this.handleToggle(id);
          }}
        />
        <ListItemText
          primary={completed ? <strike>{taskName}</strike> : taskName}
          secondary={
            completed ? (
              <Moment
                filter={d => {
                  return "completed " + d;
                }}
                date={completedAt}
                fromNow
              />
            ) : (
              ""
            )
          }
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

export default connect(
  null,
  { toggleTodo }
)(withStyles(styles)(Todo));
