import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";

import logo from "../../assets/logo.svg";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3rem",
  },
  logo: {
    height: "7rem",
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tabs,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    fontFamily: "Pacifico, cursive",
    fontSize: "1rem",
    textTransform: "none",
    height: "45px",
    color: "white",
    fontWeight: "400",
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
  const [tab, setTab] = useState(0);
  const classes = useStyles();

  const { pathname } = useLocation();

  useEffect(() => {
    const tabsMap = {
      "/": 0,
      "/services": 1,
      "/theRevolution": 2,
      "/aboutUs": 3,
    };
    if (tabsMap[pathname] !== tab) {
      setTab(tabsMap[pathname]);
    }
  }, [tab, pathname]);

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  return (
    <>
      <ElevationScroll>
        <AppBar>
          {/* Toolbar allign items horisontally */}
          <Typography variant="h3">
            <Toolbar disableGutters>
              <img alt="company logo" className={classes.logo} src={logo} />
              <Tabs
                value={tab}
                onChange={handleTabChange}
                className={classes.tabContainer}
                indicatorColor="primary"
              >
                <Tab
                  className={classes.tab}
                  component={Link}
                  to="/"
                  label="Home"
                />
                <Tab
                  className={classes.tab}
                  component={Link}
                  to="/services"
                  label="Services"
                />
                <Tab
                  className={classes.tab}
                  component={Link}
                  to="/theRevolution"
                  label="The Revolution"
                />
                <Tab
                  className={classes.tab}
                  component={Link}
                  to="/aboutUs"
                  label="About us"
                />
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                >
                  Free estimate
                </Button>
              </Tabs>
            </Toolbar>
          </Typography>
        </AppBar>
      </ElevationScroll>
      <div className={`${classes.toolbarMargin}`} />
    </>
  );
};

export default Header;
