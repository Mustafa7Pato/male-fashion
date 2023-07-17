import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
} from "@mui/material";
import {
  Image,
  Lock,
  Mail,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
    city: "",
    phoneNumber: "",
    gender: "",
    agreeToTerms: false,
  };

  const onSubmit = async (values) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/users?username=${values.username}&email=${values.email}`
      );
      const existingUsers = response.data;

      if (existingUsers.length > 0) {
        if (existingUsers[0].username === values.username) {
          formik.setFieldError("username", "Username already exists");
        }
        if (existingUsers[0].email === values.email) {
          formik.setFieldError("email", "Email already exists");
        }
      } else {
        await axios.post(`http://localhost:9000/users`, {
          username: values.username,
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email,
          image: values.image,
          password: values.password,
          mobile: values.phoneNumber,
          gender: values.gender,
          role: "member",
          city: values.city,
        });
        navigate("/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    username: Yup.string()
      .required("Username is required")
      .matches(/^[a-zA-Z]+$/, "Username must contain only letters"),
    email: Yup.string()
      .matches(
        /^(?=[a-zA-Z0-9@.!#$%&'*+/=?^_`{|}~-]{6,254}$)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        "Invalid email format"
      )
      .required("Email is required"),
    image: Yup.string().required("Image is required (http://****.png)"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
        "Password must contain at least one letter and one number"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    city: Yup.string().required("City is required"),
    phoneNumber: Yup.number().required("Phone Number is required"),
    gender: Yup.string().required("Gender is required"),
    agreeToTerms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

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
          width: { md: "90%" },
          maxWidth: "600px",
          display: "flex",
          justifyContent: "center",
          backdropFilter: "blur(10px)",
          background: "rgba(22, 1, 1, 0.253)",
          borderRadius: "1rem",
          padding: "1rem",
        }}
      >
        <form
          className="signup-form"
          style={{ width: "100%" }}
          onSubmit={formik.handleSubmit}
        >
          <Typography
            variant="h3"
            sx={{ marginBottom: "1.5rem", color: "#fff", textAlign: "center" }}
          >
            Sign Up
          </Typography>
          <div className="flex justify-between">
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps("firstName")}
              sx={{ marginBottom: "1rem", mr: "10px" }}
              error={formik.touched.firstName && formik.errors.firstName}
              helperText={
                formik.touched.firstName &&
                formik.errors.firstName && (
                  <Typography variant="body2" color="error">
                    {formik.errors.firstName}
                  </Typography>
                )
              }
            />

            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps("lastName")}
              sx={{ marginBottom: "1rem", mr: "10px" }}
              error={formik.touched.lastName && formik.errors.lastName}
              helperText={
                formik.touched.lastName &&
                formik.errors.lastName && (
                  <Typography variant="body2" color="error">
                    {formik.errors.lastName}
                  </Typography>
                )
              }
            />
          </div>

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            {...formik.getFieldProps("username")}
            sx={{ marginBottom: "1rem" }}
            error={formik.touched.username && formik.errors.username}
            helperText={
              formik.touched.username &&
              formik.errors.username && (
                <Typography variant="body2" color="error">
                  {formik.errors.username}
                </Typography>
              )
            }
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail />
                </InputAdornment>
              ),
            }}
            {...formik.getFieldProps("email")}
            sx={{ marginBottom: "1rem" }}
            error={formik.touched.email && formik.errors.email}
            helperText={
              formik.touched.email &&
              formik.errors.email && (
                <Typography variant="body2" color="error">
                  {formik.errors.email}
                </Typography>
              )
            }
          />
          <TextField
            label="Image"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Image />
                </InputAdornment>
              ),
            }}
            {...formik.getFieldProps("image")}
            sx={{ marginBottom: "1rem" }}
            error={formik.touched.image && formik.errors.image}
            helperText={
              formik.touched.image &&
              formik.errors.image && (
                <Typography variant="body2" color="error">
                  {formik.errors.image}
                </Typography>
              )
            }
          />

          <TextField
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
            {...formik.getFieldProps("password")}
            sx={{ marginBottom: "1rem" }}
            error={formik.touched.password && formik.errors.password}
            helperText={
              formik.touched.password &&
              formik.errors.password && (
                <Typography variant="body2" color="error">
                  {formik.errors.password}
                </Typography>
              )
            }
          />
          <TextField
            label="Confirm Password"
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
            {...formik.getFieldProps("confirmPassword")}
            sx={{ marginBottom: "1rem" }}
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            helperText={
              formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <Typography variant="body2" color="error">
                  {formik.errors.confirmPassword}
                </Typography>
              )
            }
          />
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            {...formik.getFieldProps("city")}
            sx={{ marginBottom: "1rem" }}
            error={formik.touched.city && formik.errors.city}
            helperText={
              formik.touched.city &&
              formik.errors.city && (
                <Typography variant="body2" color="error">
                  {formik.errors.city}
                </Typography>
              )
            }
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            {...formik.getFieldProps("phoneNumber")}
            sx={{ marginBottom: "1rem" }}
            error={formik.touched.phoneNumber && formik.errors.phoneNumber}
            helperText={
              formik.touched.phoneNumber &&
              formik.errors.phoneNumber && (
                <Typography variant="body2" color="error">
                  {formik.errors.phoneNumber}
                </Typography>
              )
            }
          />
          <FormControl
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "1rem" }}
          >
            <InputLabel>Gender</InputLabel>
            <Select
              value={gender}
              onChange={handleGenderChange}
              label="Gender"
              {...formik.getFieldProps("gender")}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          {formik.touched.gender && formik.errors.gender && (
            <Typography variant="body2" color="error">
              {formik.errors.gender}
            </Typography>
          )}
          <FormControlLabel
            control={
              <Checkbox
                {...formik.getFieldProps("agreeToTerms")}
                color="primary"
              />
            }
            label="I agree to the terms and conditions"
            sx={{ marginBottom: "1rem" }}
          />
          {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
            <Typography variant="body2" color="error">
              {formik.errors.agreeToTerms}
            </Typography>
          )}
          <div className="w-full flex justify-center">
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ marginBottom: "1rem" }}
            >
              Sign Up
            </Button>
          </div>
          <Typography variant="body1" sx={{ color: "#fff" }}>
            Already have an account?{" "}
            <Link to="/signin" style={{ color: "#fff", fontWeight: "bold" }}>
              Log In
            </Link>
          </Typography>
        </form>
      </Container>
    </Box>
  );
};

export default SignUp;
