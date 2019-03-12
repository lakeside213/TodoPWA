import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { toggleTodo, deleteTodo } from "../../../../actions";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class Todo extends React.Component {
  handleToggle = id => {
    this.props.toggleTodo(id);
    window.navigator.vibrate(200);
  };
  handleDelete = id => {
    this.props.deleteTodo(id);
  };
  getTime = completedAt => {
    return Moment(completedAt).calendar();
  };

  render() {
    const { taskName, completed, completedAt, id } = this.props;

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
          <IconButton
            aria-label="Delete"
            onClick={() => {
              this.handleDelete(id);
            }}
          >
            <Delete />
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
  { toggleTodo, deleteTodo }
)(withStyles(styles)(Todo));
