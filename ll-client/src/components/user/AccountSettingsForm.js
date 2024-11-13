// src/components/user/AccountSettingsForm.js
import React from "react";
import { TextField, Button, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import userService from "../../services/userService";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
});

const AccountSettingsForm = ({ userData }) => {
  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    userService
      .updateUserData(values)
      .then((response) => {
        // Handle success (e.g., show a success message)
        console.log("Update successful", response);
      })
      .catch((error) => {
        // Handle error (e.g., show an error message)
        console.error("Update error", error);
        setErrors({ submit: "Update failed. Please try again." });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{
        username: userData.username,
        email: userData.email,
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors }) => (
        <Form>
          <Field
            as={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            helperText={<ErrorMessage name="username" />}
          />
          <Field
            as={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            helperText={<ErrorMessage name="email" />}
          />
          <Field
            as={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={<ErrorMessage name="password" />}
          />
          {errors.submit && (
            <Typography color="error" variant="body2">
              {errors.submit}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Update
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AccountSettingsForm;
