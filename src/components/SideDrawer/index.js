import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Settings from "@material-ui/icons/Settings";
import Edit from "@material-ui/icons/Edit";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  primary: {
    color: "white"
  }
};
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
class Drawer extends React.Component {
  render() {
    const { classes, isDrawerOpen, drawerToggler } = this.props;

    const sideList = (
      <div className={classes.list}>
        <ListItem>
          <ListItemText primary="Todos" secondary="Your lists" />
        </ListItem>
        <Divider />
        <List>
          {[
            "Inbox",
            "Starred",
            "Send email",
            "Drafts",
            "Drafts",
            "Drafts",
            "Drafts"
          ].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />

        <List>
          <ListItem>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Manage Lists" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <SwipeableDrawer
          open={isDrawerOpen}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={drawerToggler}
            onKeyDown={drawerToggler}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

Drawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Drawer);
