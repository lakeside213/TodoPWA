import React from "react";
import ListPicker from "./ListPicker";

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
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";
import Alarm from "@material-ui/icons/Alarm";
import Notes from "@material-ui/icons/Notes";
import Create from "@material-ui/icons/Create";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Dialog from "@material-ui/core/Dialog";
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
  constructor(props) {
    super();
    this.state = {
      open: false,
      taskName: "",
      date: "",
      desc: "",
      list: ""
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.selectedList !== prevProps.selectedList) {
      this.setState({ selectedList: this.props.selectedList });
    }
  }

  handleChange = event => {
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
    this.setState({
      taskName: "",
      date: "",
      desc: "",
      list: ""
    });
  };
  render() {
    const {
      classes,
      dialogToggler,
      lists,
      isDialogOpen,
      selectedList
    } = this.props;
    return (
      <Dialog
        fullScreen
        open={isDialogOpen}
        onClose={dialogToggler}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Close"
              onClick={() => {
                dialogToggler();
              }}
            >
              <KeyboardBackspace />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.flex}
              onClick={() => {
                dialogToggler();
              }}
            >
              Back
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                this.handleSubmit();
                dialogToggler();
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
          <ListPicker
            lists={lists}
            setList={this.setList}
            selectedList={selectedList}
          />
        </List>
      </Dialog>
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
)(withStyles(styles)(CreateTodo));
