import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Create from "@material-ui/icons/Create";
import List from "./List";
import { withRouter } from "react-router-dom";
function TabContainer({ children, dir }) {
  return <List dir={dir} />;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class FullWidthTabs extends React.Component {
  constructor(props) {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    this.props.changeTab(event, value);
  };

  render() {
    const {
      classes,
      theme,
      history,
      todos,
      lists,
      dialogToggler,
      selectedTabIndex
    } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={selectedTabIndex} onChange={this.handleChange}>
            {lists.map((listName, index) => (
              <Tab label={listName} key={index} />
            ))}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={selectedTabIndex}
          onChangeIndex={this.handleChange}
        >
          <TabContainer dir={theme.direction}>Item One</TabContainer>
          <TabContainer dir={theme.direction}>Item Two</TabContainer>
          <TabContainer dir={theme.direction}>Item Three</TabContainer>
        </SwipeableViews>

        <Fab
          className={classes.fab}
          color="primary"
          onClick={() => {
            if (lists.length) {
              history.push("/create");
            } else {
              dialogToggler();
            }
          }}
        >
          <Create />
        </Fab>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withRouter(
  withStyles(styles, { withTheme: true })(FullWidthTabs)
);
