import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { toggleTodo, deleteTodo } from "../../../actions";

import Details from "./details";
const styles = {
  drawer: {
    borderRadius: "10px"
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

class TemporaryDrawer extends React.Component {
  handleToggle = id => {
    this.props.toggleTodo(id);
    window.navigator.vibrate(200);
  };
  render() {
    const { classes, open, viewToggler, todo, toggleTodo } = this.props;

    return (
      <Drawer
        anchor="bottom"
        open={open}
        onClose={viewToggler}
        className={classes.drawer}
      >
        <div tabIndex={0} role="button" onClick={viewToggler}>
          <Details
            taskName={todo.taskName}
            completed={todo.completed}
            completedAt={todo.completedAt}
            notes={todo.notes}
            list={todo.list}
            dueDate={todo.dueDate}
            id={todo.id}
            handleToggle={this.handleToggle}
          />
        </div>
      </Drawer>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { toggleTodo }
)(withStyles(styles)(TemporaryDrawer));
