import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";

import LoginForm from "../pages/login/loginForm";
import { closeModal } from "../redux/modalReducer/modalActions";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";

const ContentContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
}));

const LoginDialog = ({ open = false }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Dialog maxWidth="sm" open={open} onClose={handleClose}>
        <ContentContainer>
          <DialogTitle>
            <Typography variant="h4" align="center">
              Prihláste sa
            </Typography>
          </DialogTitle>
          <DialogContent>
            <LoginForm />
          </DialogContent>
        </ContentContainer>
      </Dialog>
    </>
  );
};
export default LoginDialog;
