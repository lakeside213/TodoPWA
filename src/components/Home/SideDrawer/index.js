import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { deleteList } from "../../../actions";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Settings from "@material-ui/icons/Settings";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import Cancel from "@material-ui/icons/Cancel";
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
const SideList = props => {
  return (
    <div className={props.classes.list}>
      <ListItem>
        <ListItemText primary="Todos" secondary="Your lists" />
      </ListItem>
      <Divider />
      <List>
        {props.lists.length > 0 ? (
          props.lists.map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => {
                props.changeTab(index);
              }}
            >
              <ListItemText primary={text} />
              {props.manageLists ? (
                <ListItemIcon>
                  <RemoveCircle
                    onClick={() => {
                      props.deleteList(text);
                    }}
                  />
                </ListItemIcon>
              ) : (
                ""
              )}
            </ListItem>
          ))
        ) : (
          <ListItem onClick={props.dialogToggler}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Create a New List" />
          </ListItem>
        )}
      </List>
      <Divider />

      <List>
        {props.lists.length > 0 ? (
          <Fragment>
            <ListItem onClick={props.manageListsToggler}>
              <ListItemIcon>
                {props.manageLists == false ? <Edit /> : <Cancel />}
              </ListItemIcon>
              <ListItemText
                primary={props.manageLists == false ? "Manage Lists" : "Cancel"}
              />
            </ListItem>
            <ListItem onClick={props.dialogToggler}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary="Create a New List" />
            </ListItem>
          </Fragment>
        ) : (
          ""
        )}

        <ListItem>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </div>
  );
};
class Drawer extends React.Component {
  state = {
    manageLists: false
  };
  manageListsToggler = () => {
    this.setState(prevState => {
      return { manageLists: !prevState.manageLists };
    });
  };

  render() {
    const { manageLists } = this.state;
    const {
      classes,
      isDrawerOpen,
      drawerToggler,
      lists,
      dialogToggler,
      changeTab,
      deleteList
    } = this.props;

    return (
      <div>
        <SwipeableDrawer
          open={isDrawerOpen}
          onClose={drawerToggler}
          onOpen={drawerToggler}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
        >
          <div tabIndex={0} role="button" onKeyDown={drawerToggler}>
            <SideList
              classes={classes}
              lists={lists}
              dialogToggler={dialogToggler}
              changeTab={changeTab}
              deleteList={deleteList}
              manageLists={manageLists}
              manageListsToggler={this.manageListsToggler}
            />
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

Drawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { deleteList }
)(withStyles(styles)(Drawer));
