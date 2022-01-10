import {
  Autocomplete,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { useFormikContext } from "formik";

const options = ["5", "10", "b.b"];

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "80px",
}));

const SelectContainer = () => {
  const {
    values,
    errors,

    handleBlur,
    setFieldTouched,
    touched,

    setFieldValue,
    setFieldError,
  } = useFormikContext();

  return (
    <>
      <Grid item>
        <StyledFormControl>
          <Autocomplete
            id="container"
            name="container"
            value={values.container}
            onBlur={handleBlur("container")}
            defaultValue="b.b"
            onInputChange={() => {
              setFieldTouched("container", true);
            }}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                setFieldValue("container", newValue);
              } else {
                setFieldError("container", "Please choose container");
              }
            }}
            options={options}
            error={touched.container && Boolean(errors.container)}
            renderInput={(params) => (
              <TextField {...params} label="Kontajner" variant="standard" />
            )}
          />
          <FormHelperText
            error={touched.container && Boolean(errors.container)}
          >
            {touched.container && errors.container}
          </FormHelperText>
        </StyledFormControl>
      </Grid>
    </>
  );
};

export default SelectContainer;
