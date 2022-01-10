import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";

import AddContainerForm from "../../containerForm/form";
import { closeModal } from "../../../redux/modalReducer/modalActions";
import { useDispatch } from "react-redux";

const ContentContainer = styled("div")(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
}));

const FormDialog = ({ open = false }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <ContentContainer>
          <DialogTitle>Add record</DialogTitle>
          <DialogContent>
            <AddContainerForm />
          </DialogContent>
        </ContentContainer>
      </Dialog>
    </>
  );
};
export default FormDialog;
