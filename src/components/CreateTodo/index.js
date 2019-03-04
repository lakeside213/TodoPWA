import React from "react";
import ListPicker from "./ListPicker";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { createTodo } from "../../actions";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";
import Alarm from "@material-ui/icons/Alarm";
import Notes from "@material-ui/icons/Notes";
import Create from "@material-ui/icons/Create";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  textField: {
    marginLeft: "1.5%",
    marginRight: "1.5%"
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CreateTodo extends React.Component {
  state = {
    open: false,
    taskName: "",
    date: "",
    desc: "",
    list: ""
  };
  handleChange = event => {
    console.log(event);
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  setList = listName => {
    this.setState({
      list: listName
    });
  };
  handleSubmit = () => {
    const { taskName, date, desc, list } = this.state;
    this.props.createTodo(taskName, desc, date, list);
  };
  render() {
    const { classes, history, lists } = this.props;
    return (
      <div>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Close"
              onClick={() => {
                history.push("/");
              }}
            >
              <KeyboardBackspace />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.flex}
              onClick={() => {
                history.push("/");
              }}
            >
              Back
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                this.handleSubmit();
                history.push("/");
              }}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>

        <List>
          <ListItem>
            <ListItemIcon>
              <Create />
            </ListItemIcon>
            <ListItemText
              primary="Task Name"
              secondary={
                <TextField
                  id="standard-with-placeholder"
                  placeholder="Task Name"
                  value={this.state.taskName}
                  name="taskName"
                  onChange={this.handleChange}
                />
              }
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <Alarm />
            </ListItemIcon>
            <ListItemText
              primary="Due Date"
              secondary={
                <TextField
                  id="datetime-local"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                  name="date"
                  value={this.state.date}
                  onChange={this.handleChange}
                />
              }
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <Notes />
            </ListItemIcon>
            <ListItemText
              primary="Notes"
              secondary={
                <Input
                  placeholder="write a description"
                  className={classes.input}
                  inputProps={{
                    "aria-label": "Description"
                  }}
                  name="desc"
                  value={this.state.desc}
                  onChange={this.handleChange}
                />
              }
            />
            <Divider />
          </ListItem>
          <ListPicker lists={lists} setList={this.setList} />
        </List>
      </div>
    );
  }
}

CreateTodo.propTypes = {
  classes: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return { lists: state.user.lists };
}
export default connect(
  mapStateToProps,
  { createTodo }
)(withRouter(withStyles(styles)(CreateTodo)));
