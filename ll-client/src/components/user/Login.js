// src/components/user/Login.js
import React from "react";
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
import { useNavigate, Link } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    authService
      .login(values.email, values.password)
      .then((response) => {
        // Handle success (e.g., store the JWT token, redirect to dashboard)
        console.log("Login successful", response);
        navigate("/dashboard"); // Redirect to dashboard
      })
      .catch((error) => {
        // Handle error (e.g., show an error message)
        console.error("Login error", error);
        setErrors({ submit: "Login failed. Please try again." });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                Login
              </Button>
              <Typography
                variant="body2"
                align="center"
                style={{ marginTop: "16px" }}
              >
                Don't have an account yet?{" "}
                <MuiLink component={Link} to="/register">
                  Register
                </MuiLink>
              </Typography>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Login;