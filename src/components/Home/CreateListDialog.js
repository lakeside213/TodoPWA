import React, { Fragment, Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class CreateList extends Component {
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
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={dialogToggler} color="primary">
              Cancel
            </Button>
            <Button onClick={dialogToggler} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default CreateList;
