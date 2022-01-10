import { Grid, Input, Slider, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useFormikContext } from "formik";

const StyledSlider = styled("div")(({ theme }) => ({
  width: "300px",
  paddingLeft: theme.spacing(3),
}));

const InputSlider = ({ labelInput, labelSlider, min, max }) => {
  const { values, setFieldValue } = useFormikContext();

  const handleSliderChange = (event, newValue) => {
    console.log(newValue);
    setFieldValue(labelInput, newValue);
  };

  const handleInputChange = (event) => {
    const value = event.target.value === "" ? "" : Number(event.target.value);
    setFieldValue(labelInput, value);
  };

  const handleBlurInput = () => {
    if (values[labelInput] < min) {
      setFieldValue(labelInput, min);
    } else if (values[labelInput] > max) {
      setFieldValue(labelInput, max);
    }
  };

  return (
    <StyledSlider>
      <Typography id="input-slider" gutterBottom>
        {labelSlider}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={
              typeof values[labelInput] === "number" ? values[labelInput] : min
            }
            onChange={handleSliderChange}
            min={min}
            max={max}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={values[labelInput]}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlurInput}
            inputProps={{
              step: 1,
              min: min,
              max: max,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </StyledSlider>
  );
};

export default InputSlider;
