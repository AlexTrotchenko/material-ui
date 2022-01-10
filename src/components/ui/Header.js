import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import React from "react";
import logo from "../../assets/Logo.png";

import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/modalReducer/modalActions";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: "3rem",
    padding: "0.5rem 0.5rem 0rem 0.7rem",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "50px",
  marginLeft: "auto",
  minWidth: 100,
  marginRight: "25px",
  fontSize: "1rem",
  textTransform: "none",
  height: "45px",
  color: "rgba(19, 0, 28, 1)",
  fontWeight: "400",
  "&:hover": {
    backgroundColor: "#fff700",
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
const Offset = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
  marginBottom: "3rem",
}));

const Header = () => {
  const classes = useStyles();
  const { authenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    authenticated
      ? dispatch(
          openModal({
            modalType: "AddContainerForm",
          })
        )
      : dispatch(
          openModal({
            modalType: "LoginForm",
          })
        );
  };

  return (
    <>
      <ElevationScroll>
        <AppBar color="secondary">
          {/* Toolbar allign items horisontally */}
          <Typography variant="h3">
            <Toolbar disableGutters>
              <Link to="/">
                <img src={logo} alt="logo" className={classes.logo} />
              </Link>

              <StyledButton
                variant="contained"
                color="primary"
                onClick={handleOpenModal}
              >
                Pridať dávku
              </StyledButton>
            </Toolbar>
          </Typography>
        </AppBar>
      </ElevationScroll>
      <Offset />
    </>
  );
};

export default Header;
