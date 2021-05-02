import { AppBar, Toolbar, Typography } from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/styles";
import React from "react";

import logo from "../../assets/logo.svg";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3rem",
  },
  logo: {
    height: "7rem",
  },
}));

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <ElevationScroll>
        <AppBar>
          {/* Toolbar allign items horisontally */}
          <Typography variant="h3">
            <Toolbar disableGutters>
              <img alt="company logo" className={classes.logo} src={logo} />
            </Toolbar>
          </Typography>
        </AppBar>
      </ElevationScroll>
      <div className={`${classes.toolbarMargin}`} />
    </>
  );
};

export default Header;
