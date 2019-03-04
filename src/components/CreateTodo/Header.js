import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
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
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <KeyboardBackspace />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Back
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>

          <List>
            <ListItem>
              <TextField
                id="standard-with-placeholder"
                label="Todo Name"
                placeholder="Todo Name"
                margin="fullWidth"
                className={classes.textField}
                color="secondary"
              />{" "}
            </ListItem>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary="Default notification ringtone"
                secondary={
                  <Input
                    placeholder="Placeholder"
                    className={classes.input}
                    inputProps={{
                      "aria-label": "Description"
                    }}
                  />
                }
              />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

CreateTodo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateTodo);
