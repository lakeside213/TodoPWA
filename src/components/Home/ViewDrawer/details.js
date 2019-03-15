import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Moment from "react-moment";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import AccessTime from "@material-ui/icons/AccessTime";
const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  chip: {
    marginRight: theme.spacing.unit
  },
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  },
  section2: {
    margin: theme.spacing.unit * 2
  },
  section3: {
    margin: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`
  },
  time: {
    marginBottom: "-6px",
    paddingRight: "4px"
  }
});

function MiddleDividers(props) {
  const {
    classes,
    taskName,
    list,
    notes,
    completed,
    dueDate,
    completedAt,
    id,
    handleToggle
  } = props;
  const completedFilter = d => {
    return `completed ${d} `;
  };
  const dueFilter = d => {
    return `due in ${d}`;
  };
  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5">
              {taskName}
            </Typography>
          </Grid>
          <Grid item>
            {completedAt || dueDate ? (
              <Typography gutterBottom variant="caption">
                {completed ? (
                  <Fragment>
                    <AccessTime className={classes.time} />
                    <Moment fromNow filter={completedFilter}>
                      {completedAt}
                    </Moment>
                  </Fragment>
                ) : dueDate.length > 0 ? (
                  <Fragment>
                    <AccessTime className={classes.time} />
                    <Moment durationFromNow date={dueDate} filter={dueFilter} />
                  </Fragment>
                ) : (
                  ""
                )}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <Typography color="textSecondary">{notes}</Typography>
      </div>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <Typography gutterBottom variant="body1">
          List
        </Typography>
        <div>
          <Chip className={classes.chip} label={list} />
        </div>
      </div>
      <div className={classes.section3}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            handleToggle(id);
          }}
        >
          {completed === true ? "Completed" : "Complete now"}
        </Button>
      </div>
    </div>
  );
}

MiddleDividers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MiddleDividers);
