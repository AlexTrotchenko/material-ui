import React from "react";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { CircularProgress, Button, Grid } from "@mui/material";
import MySelect from "./hmotaSelect";

import {
  addHours,
  currentShift,
  extValFromHmotaName,
  getTimeToReady,
} from "../../utilities";
import {
  addContainer,
  editContainer,
  setLastHmotaVal,
} from "../../firestoreService";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MyDateTimePicker from "./dateTimePicker";
import InputSlider from "./temperatureSlider";
import BatchWeight from "./weightRadio";
import PtvarCheckBox from "./pTvarCheckBox";
import { closeModal } from "../../redux/modalReducer/modalActions";
import DialogWrapper from "../modals/DialogWrapper";
import SelectContainer from "./containerSelect";

const validationSchema = yup.object({
  hmota: yup.string("Select hmota").required("Vyberte hmotu zo zoznamy"),
  dateTime: yup.date("Set date").required("Zadajte dátum a čas"),
  tempKiln: yup.number().required(),
  tempCont: yup.number().required(),
});

const SliderContainer = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingButtom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  paddingRight: 0,
}));

const AddContainerForm = ({ action }) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { selectedRecord } = useSelector((state) => state.records);
  const { lastVal } = useSelector((state) => state.records);
  const emptyForm = {
    container: "b.b",
    davkaWeight: "2",
    hmota: "",
    dateTime: new Date(),
    tempKiln: 120,
    tempCont: 130,
    isP: false,
  };
  const initialValues =
    action !== "Edit"
      ? emptyForm
      : {
          davkaWeight: String(selectedRecord.davkaWeight),
          hmota: selectedRecord.hmota,
          dateTime: selectedRecord.dateTime,
          tempKiln: selectedRecord.tempKiln || 120,
          tempCont: selectedRecord.tempCont || 130,
          isP: selectedRecord.isP,
          container: selectedRecord.container,
        };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const { hmota, dateTime, isP, tempCont, tempKiln, davkaWeight } = values;
    const shift = currentShift(dateTime);
    const { isHot, carbonAmount } = extValFromHmotaName(hmota);
    const timeToReady = getTimeToReady(
      hmota,
      isP,
      dateTime,
      extValFromHmotaName
    );
    const temp = isHot
      ? { tempCont, tempKiln }
      : { tempCont: null, tempKiln: null };
    const readyDateTime = addHours(dateTime, timeToReady);
    const isItemInArr = lastVal.includes(values.hmota);

    if (!isItemInArr) {
      setLastHmotaVal(values.hmota);
    }
    let response;
    const fieldsToSubmit = {
      ...values,
      ...temp,
      shift,
      davkaWeight: Number(davkaWeight),
      readyDateTime,
      isHot,
      carbonAmount,
      odlisovano: false,
    };
    try {
      if (action === "Edit") {
        await editContainer(selectedRecord.id, fieldsToSubmit);
      } else {
        response = await addContainer(fieldsToSubmit);
      }

      setSubmitting(false);
      history.push(
        action === "Edit" ? `${selectedRecord.id}` : `/records/${response?.id}`
      );
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      setErrors({ auth: "Problem with username or password" });
      setSubmitting(false);
    }

    return { ...values, ...temp, shift, readyDateTime, isHot, carbonAmount };
  };
  return (
    <DialogWrapper
      header={action === "Edit" ? "Opraviť dávku" : "Pridať dávku"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur
      >
        {({ values, isValid, dirty, isSubmitting }) => {
          return (
            <Form>
              <Grid
                container
                spacing={2}
                style={{ marginTop: "1rem" }}
                direction="column"
              >
                <Grid item>
                  <MyDateTimePicker />
                </Grid>
                <MySelect />

                <Grid item>
                  <PtvarCheckBox />
                </Grid>
                <SelectContainer />

                <Grid item>
                  <BatchWeight />
                </Grid>

                {values.hmota[0] === "C" && (
                  <SliderContainer>
                    <InputSlider
                      labelInput="tempKiln"
                      labelSlider="Teplota bubna"
                      min={100}
                      max={200}
                    />

                    <InputSlider
                      labelInput="tempCont"
                      labelSlider="Teplota hmoty"
                      min={100}
                      max={200}
                    />
                  </SliderContainer>
                )}

                <Grid item container spacing={2} justifyContent="flex-end">
                  <Grid item>
                    <StyledButton
                      classes={{ ".MuiButton-root": { padding: 0 } }}
                      color="primary"
                      variant="text"
                      disabled={!isValid || isSubmitting}
                      type="submit"
                    >
                      {isSubmitting ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Potvrdiť"
                      )}
                    </StyledButton>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </DialogWrapper>
  );
};

export default AddContainerForm;
