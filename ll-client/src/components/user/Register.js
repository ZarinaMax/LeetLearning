import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Link as MuiLink,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import authService from "../../services/authService";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register = () => {
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    authService
      .register(values.username, values.email, values.password)
      .then((response) => {
        // Handle success (e.g., show a success message, redirect to login page)
        setFeedback({ type: "success", message: response.data.message });
      })
      .catch((error) => {
        // Handle error (e.g., show an error message)
        setFeedback({ type: "error", message: error.response.data.message });
        setErrors({ submit: "Registration failed. Please try again." });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {feedback && (
          <Typography
            color={feedback.type === "success" ? "primary" : "error"}
            variant="body2"
          >
            {feedback.message}
          </Typography>
        )}
        {feedback && feedback.type === "success" && (
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "16px" }}
          >
            <MuiLink component={Link} to="/login">
              Go to Login
            </MuiLink>
          </Typography>
        )}
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
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
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Register;
