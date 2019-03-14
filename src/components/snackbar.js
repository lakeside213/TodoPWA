import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  },
  snackbar: {
    position: "absolute"
  }
});

class SimpleSnackbar extends React.Component {
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.props.closeSnackbar();
  };

  render() {
    const { classes, open, message } = this.props;
    return (
      <Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          className={classes.snackbar}
          open={open}
          autoHideDuration={4000}
          onClose={this.handleClose}
          onRequestClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Fragment>
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSnackbar);
