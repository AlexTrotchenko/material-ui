import { Checkbox, FormControlLabel } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

const PtvarCheckBox = () => {
  const { values, handleChange } = useFormikContext();
  return (
    <FormControlLabel
      control={
        <Checkbox checked={values.isP} onChange={handleChange} name="isP" />
      }
      label="P tvar"
    />
  );
};

export default PtvarCheckBox;
