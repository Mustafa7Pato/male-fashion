import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Lock, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AdminAuth } from "../context/AuthContext";
import { UserId } from "../context/UserInfo";
import Swal from "sweetalert2";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[A-Za-z]+$/, "Username must contain only letters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = AdminAuth();
  const { setUser } = UserId();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      setSubmitting(true);
      const response = await axios.get(`http://localhost:9000/users`);
      const users = response.data;

      // Find the user with the matching username
      const matchedUser = users.find(
        (user) => user.username === values.username
      );

      if (!matchedUser) {
        // Check if the password matches
        setFieldError("username", "Username does not exist");
      } else if (matchedUser.password !== values.password) {
        setFieldError("password", "Invalid password");
      } else {
        localStorage.admin = matchedUser.role;
        sessionStorage.setItem("userId", matchedUser.id);
        setAuth(localStorage.admin);
        setUser(sessionStorage.userId);
        Swal.fire({
          position: "center",
          title: "Sign-in...",
          showConfirmButton: false,
          timer: 1500,
          background: "linear-gradient(to right, #9af3ff, #8705a7)",
          color: "#ffff",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1abc9c 0%, #8e7cc3 100%)",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        border: "1px solid rgba(255, 255, 255, 0.18)",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        margin: { xs: "4em 0 1em 0", md: "5rem" },
      }}
    >
      <Container
        sx={{
          width: { md: "40%" },
          maxWidth: "600px",
          display: "flex",
          justifyContent: "center",
          backdropFilter: "blur(10px)",
          background: "rgba(22, 1, 1, 0.253)",
          borderRadius: "1rem",
          padding: "1rem",
        }}
      >
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="signin-form" style={{ width: "100%" }}>
              <Typography
                variant="h3"
                sx={{
                  marginBottom: "1.5rem",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Sign In
              </Typography>
              <Field
                as={TextField}
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
                sx={{ marginBottom: "1rem" }}
              />
              <ErrorMessage
                name="username"
                component="div"
                style={{ color: "red", marginBottom: "0.5rem" }}
              />
              <Field
                as={TextField}
                name="password"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ marginBottom: "1rem" }}
              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red", marginBottom: "0.5rem" }}
              />
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  id="remember"
                  name="remember"
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          width: "1.5em",
                          height: "1.5em",
                          color: "#fff",
                        },
                        "& .Mui-checked": {
                          color: "#1abc9c",
                        },
                      }}
                    />
                  )}
                />
                <label
                  htmlFor="remember"
                  className="text-xl text-white cursor-pointer"
                >
                  Remember Me
                </label>
              </div>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  sx={{
                    width: "100%",
                    maxWidth: { md: "150px" },
                    height: "40px",
                    color: "white",
                    background: "linear-gradient(to right, #1abc9c, #17a6b8)",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                    borderRadius: "20px",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      background: "linear-gradient(to right, #17a6b8, #1abc9c)",
                      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  Login
                </Button>
                <Link to="/signup">
                  <Button
                    variant="contained"
                    sx={{
                      width: "100%",
                      maxWidth: { md: "fit-content" },
                      height: "40px",
                      marginTop: { xs: "1rem", md: 0 },
                      marginLeft: { xs: 0, md: "1rem" },
                      color: "white",
                      background: "linear-gradient(to right, #1abc9c, #17a6b8)",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                      borderRadius: "20px",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                        background:
                          "linear-gradient(to right, #17a6b8, #1abc9c)",
                        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    Create New Account
                  </Button>
                </Link>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default SignIn;
