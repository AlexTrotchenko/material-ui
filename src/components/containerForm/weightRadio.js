import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useFormikContext } from "formik";
import { extValFromHmotaName } from "../../utilities";

const BatchWeight = () => {
  const { values, handleChange, setFieldValue } = useFormikContext();
  React.useEffect(() => {
    const { isHot } = extValFromHmotaName(values.hmota);
    if (typeof isHot === "boolean")
      setFieldValue("davkaWeight", isHot ? "2" : "1.85");
  }, [values.hmota, setFieldValue]);
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Hmotnosť dávky, kg</FormLabel>
      <RadioGroup
        name="davkaWeight"
        value={values.davkaWeight}
        onChange={handleChange}
        row
      >
        <FormControlLabel value="2" control={<Radio />} label="2000" />
        <FormControlLabel value="1" control={<Radio />} label="1000" />
        <FormControlLabel value="1.85" control={<Radio />} label="1850" />
        <FormControlLabel value="0.925" control={<Radio />} label="925" />
      </RadioGroup>
    </FormControl>
  );
};

export default BatchWeight;
