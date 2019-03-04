import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { createList } from "../../actions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class CreateList extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createList(this.state.value);
    this.setState({ value: "" });
  }
  render() {
    const { dialogToggler, isDialogOpen } = this.props;
    return (
      <Fragment>
        <Dialog
          open={isDialogOpen}
          onClose={dialogToggler}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Create a new Todolist
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              After the todolist has been created you can add as many todos as
              you want
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="List name"
              type="text"
              fullWidth
              value={this.state.value}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={dialogToggler} color="primary">
              Cancel
            </Button>
            <Button
              onClick={e => {
                this.handleSubmit(e);
                dialogToggler();
              }}
              color="primary"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { createList }
)(CreateList);
