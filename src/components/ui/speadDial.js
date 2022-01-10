import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PrintIcon from "@mui/icons-material/Print";
import { Delete, Edit, ExpandLess } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { deleteContainer } from "../../firestoreService";
import { openModal } from "../../redux/modalReducer/modalActions";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../redux/asyncReducer/asyncReducer";

const DetailPageActions = ({ handlePrint }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { authenticated } = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = () => {
    dispatch(
      openModal({
        modalType: "AddContainerForm",
        modalProps: { action: "Edit" },
      })
    );
  };
  const handleDelete = async () => {
    try {
      dispatch(asyncActionStart());
      deleteContainer(id);
      dispatch(asyncActionFinish());
      history.push("/");
    } catch (error) {
      dispatch(
        asyncActionError({
          code: "error",
          message: "Could not delete document",
        })
      );
      dispatch(asyncActionFinish());
    }
  };
  return (
    <SpeedDial
      ariaLabel="SpeedDial uncontrolled open example"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      icon={<ExpandLess />}
      onClose={handleClose}
      onOpen={handleOpen}
      hidden={!authenticated}
      open={open}
    >
      <SpeedDialAction
        icon={<Delete />}
        tooltipTitle={"Delete"}
        onClick={handleDelete}
      />
      <SpeedDialAction
        icon={<Edit />}
        tooltipTitle={"Edit"}
        onClick={handleEdit}
      />
      <SpeedDialAction
        icon={<PrintIcon />}
        tooltipTitle={"Print"}
        onClick={handlePrint}
      />
    </SpeedDial>
  );
};
export default DetailPageActions;
