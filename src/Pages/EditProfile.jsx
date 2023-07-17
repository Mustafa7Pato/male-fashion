import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:9000/users/${id}`)
      .then((res) => {
        const {
          username,
          firstname,
          lastname,
          email,
          image,
          password,
          mobile,
          gender,
          role,
          city,
        } = res.data;
        formik.setValues({
          username,
          firstname,
          lastname,
          email,
          image,
          password,
          mobile,
          gender,
          role,
          city,
        });
      })
      .catch((error) => alert(error));
  }, []);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      image: "",
      password: "",
      mobile: "",
      gender: "",
      role: "",
      city: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      firstname: Yup.string().required("First Name is required"),
      lastname: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      image: Yup.string()
        .url("Invalid image URL")
        .required("Image URL is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*\d)/,
          "Password must contain at least one numeric digit"
        ),
      mobile: Yup.string().required("Mobile Number is required"),
      gender: Yup.string().required("Gender is required"),
      city: Yup.string().required("City is required"),
    }),
    onSubmit: (values) => {
      axios
        .put(`http://localhost:9000/users/${id}`, values)
        .then(() => {
          setLoading(true);
          setTimeout(() => {
            navigate(`/profile/${id}`);
          }, 2000);
        })
        .catch((error) => alert(error));
    },
  });

  return (
    <Box sx={{ p: "2rem", mt: "1rem" }}>
      <Typography variant="h3" color="initial" className="my-4 text-center">
        Update Profile
      </Typography>

      <Box
        sx={{
          background: "linear-gradient(135deg, #054b4bac 0%, #1a1a1a92 100%)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(4px)",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          padding: "2rem",
        }}
      >
        <Container maxWidth="sm">
          <form
            style={{ gap: "10px" }}
            className="d-flex justify-content-center flex-wrap"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex justify-between gap-3 w-full">
              <TextField
                fullWidth
                label="First Name"
                color="info"
                variant="filled"
                type="text"
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                error={formik.touched.firstname && formik.errors.firstname}
                helperText={formik.touched.firstname && formik.errors.firstname}
              />
              <TextField
                fullWidth
                label="Last Name"
                color="info"
                variant="filled"
                type="text"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                error={formik.touched.lastname && formik.errors.lastname}
                helperText={formik.touched.lastname && formik.errors.lastname}
              />
            </div>
            <TextField
              fullWidth
              label="Username"
              color="info"
              variant="filled"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              fullWidth
              label="Email"
              color="info"
              variant="filled"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              color="info"
              variant="filled"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
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

            <TextField
              fullWidth
              label="Product Image"
              color="info"
              variant="filled"
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              error={formik.touched.image && formik.errors.image}
              helperText={formik.touched.image && formik.errors.image}
            />

            <TextField
              fullWidth
              label="Mobile Number"
              color="info"
              variant="filled"
              type="tel"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              inputProps={{
                min: 1,
                max: 1000,
              }}
              error={formik.touched.mobile && formik.errors.mobile}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
            <div className="flex justify-between gap-3 w-full">
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
                </Select>
                {formik.touched.gender && formik.errors.gender && (
                  <Typography variant="body2" color="error">
                    {formik.errors.gender}
                  </Typography>
                )}
              </FormControl>
              <TextField
                fullWidth
                label="City"
                color="info"
                variant="filled"
                type="text"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && formik.errors.city}
                helperText={formik.touched.city && formik.errors.city}
              />
            </div>
            <Button variant="contained" color="success" type="submit">
              <span className="d-flex align-items-center">
                {loading ? (
                  <Spinner animation="border" variant="dark" />
                ) : (
                  <span>Submit</span>
                )}
              </span>
            </Button>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default EditProfile;
