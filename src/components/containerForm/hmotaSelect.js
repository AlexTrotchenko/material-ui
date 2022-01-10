import {
  Autocomplete,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { useFormikContext } from "formik";
import ChipsArray from "./chips";
import { options } from "./UNIQ_HMOTA";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "350px",
}));

const MySelect = () => {
  const {
    values,
    errors,

    handleBlur,
    setFieldTouched,
    touched,

    setFieldValue,
    setFieldError,
  } = useFormikContext();

  const handleClick = (item) => {
    setFieldValue("hmota", item);
  };
  return (
    <>
      <Grid item>
        <StyledFormControl>
          <Autocomplete
            id="hmota"
            name="hmota"
            value={values.hmota}
            onBlur={handleBlur("hmota")}
            variant="outlined"
            defaultValue=""
            onInputChange={() => {
              setFieldTouched("hmota", true);
            }}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                setFieldValue("hmota", newValue);
              } else {
                setFieldError("hmota", "Please choose hmota");
              }
            }}
            options={options}
            error={touched.hmota && Boolean(errors.hmota)}
            renderInput={(params) => <TextField {...params} label="Hmota" />}
          />
          <FormHelperText error={touched.hmota && Boolean(errors.hmota)}>
            {touched.hmota && errors.hmota}
          </FormHelperText>
        </StyledFormControl>
      </Grid>

      <ChipsArray handleClick={handleClick} />
    </>
  );
};

export default MySelect;
