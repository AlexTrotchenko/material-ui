import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { signInWithEmail } from "../firebaseServis";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../redux/modalReducer/modalActions";
import DialogWrapper from "./modals/DialogWrapper";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  errorText: {
    paddingTop: theme.spacing(4),
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "350px",
}));

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(5, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleClose = () => {
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      console.log("sumbit");
      try {
        await signInWithEmail(values).then(() => {
          setSubmitting(false);
          dispatch(
            openModal({
              modalType: "AddContainerForm",
            })
          );
        });
      } catch (error) {
        setErrors({ auth: "Problem with username or password" });
        setSubmitting(false);
      }
    },
  });

  return (
    <DialogWrapper header="Login">
      <Grid
        className={classes.formContainer}
        container
        component="form"
        direction="column"
        spacing={2}
        onSubmit={formik.handleSubmit}
      >
        <Grid item>
          <StyledFormControl>
            <TextField
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onBlur={formik.handleBlur("email")}
              fullWidth
              autoFocus
              variant="outlined"
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </StyledFormControl>
        </Grid>
        <Grid item>
          <StyledFormControl>
            <TextField
              fullWidth
              variant="outlined"
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </StyledFormControl>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          className={classes.buttonContainer}
        >
          <Grid item>
            <Button
              color="primary"
              size="large"
              onClick={handleClose}
              variant="text"
              fullWidth
              type="submit"
            >
              Zrušiť
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              size="large"
              disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
              variant="text"
              fullWidth
              type="submit"
            >
              Ok
              {formik.isSubmitting && <CircularProgress size={24} />}
            </Button>
          </Grid>
        </Grid>
        {formik.errors.auth && (
          <Typography
            className={classes.errorText}
            color="error"
            textAlign="center"
          >
            {" "}
            Wrong user login or password
          </Typography>
        )}
      </Grid>
    </DialogWrapper>
  );
};

export default LoginForm;
