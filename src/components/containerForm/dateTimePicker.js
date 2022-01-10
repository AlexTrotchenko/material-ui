import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { FormControl, TextField } from "@mui/material";
import { sk } from "date-fns/locale";
import { styled } from "@mui/system";
import { useFormikContext } from "formik";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "350px",
}));

const MyDateTimePicker = () => {
  const { values, errors, touched, setFieldValue } = useFormikContext();

  return (
    <StyledFormControl>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={sk}>
        <DateTimePicker
          renderInput={(props) => {
            return (
              <TextField
                helperText={
                  touched.dateTime &&
                  Boolean(errors.dateTime) &&
                  "Provide valid date time"
                }
                error={touched.dateTime && Boolean(errors.dateTime)}
                onChange={() => {}}
                {...props}
              />
            );
          }}
          label="Dátum a čas"
          name="dateTime"
          validate
          value={values.dateTime}
          ampm={false}
          onChange={(newValue) => {
            setFieldValue("dateTime", newValue);
          }}
        />
      </LocalizationProvider>
    </StyledFormControl>
  );
};

export default MyDateTimePicker;
