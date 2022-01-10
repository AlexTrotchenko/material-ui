import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";

import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/modalReducer/modalActions";

const ContentContainer = styled("div")(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
}));

const DialogWrapper = ({children, header}) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Dialog open={true} onClose={handleClose}>
        <ContentContainer>
        {header &&<DialogTitle>{header}</DialogTitle>}
          
          <DialogContent>
            {children}
          </DialogContent>
        </ContentContainer>
      </Dialog>
    </>
  );
};
export default DialogWrapper;
