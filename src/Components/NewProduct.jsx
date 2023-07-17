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
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [clr, setClr] = useState("");
  const handleColorChange = (event) => {
    setClr(event.target.value);
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      image: "",
      items: "",
      sale: "",
      clr: "",
      title: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product Name is required"),
      price: Yup.number()
        .typeError("Product Price must be a number")
        .required("Product Price is required"),
      image: Yup.string().required(
        "Product Image is required and Url(https://*****)"
      ),
      clr: Yup.string().required("Color is required"),
      title: Yup.string().required("Product Title is required "),
      items: Yup.number()
        .typeError("Product Items must be a number")
        .required("Product Items is required"),
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: ` http://localhost:9000/products`,
        data: {
          name: values.name,
          price: values.price,
          image: values.image,
          items: values.items,
          sale: values.sale,
          clr: values.clr,
          title: values.title,
        },
      });
      setLoading(true);
      setTimeout(() => {
        navigate("products");
      }, 2000);
    },
  });

  return (
    <Box sx={{ p: "2rem" }}>
      <Typography variant="h3" color="initial" className="my-4">
        Add New Product
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
            {/* Product Name */}
            <TextField
              fullWidth
              label="Product Name"
              color="info"
              variant="filled"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              label="Product Title"
              color="info"
              variant="filled"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && formik.errors.title}
              helperText={formik.touched.title && formik.errors.title}
            />
            <div className="flex gap-3 justify-between w-full">
              <FormControl
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "1rem" }}
              >
                <InputLabel>Color</InputLabel>
                <Select
                  value={clr}
                  onChange={handleColorChange}
                  label="Color"
                  {...formik.getFieldProps("clr")}
                >
                  <MenuItem value="white">White</MenuItem>
                  <MenuItem value="black">Black</MenuItem>
                  <MenuItem value="red">Red</MenuItem>
                  <MenuItem value="blue">Blue</MenuItem>
                </Select>
                {formik.touched.clr && formik.errors.clr && (
                  <Typography variant="body2" color="error">
                    {formik.errors.clr}
                  </Typography>
                )}
              </FormControl>
              <TextField
                fullWidth
                label="Sale"
                color="info"
                variant="filled"
                name="sale"
                value={formik.values.sale}
                onChange={formik.handleChange}
                error={formik.touched.sale && formik.errors.sale}
                helperText={formik.touched.sale && formik.errors.sale}
              />
            </div>
            {/* Product Price */}
            <TextField
              fullWidth
              label="Product Price"
              color="info"
              variant="filled"
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              inputProps={{
                min: 1,
              }}
              error={formik.touched.price && formik.errors.price}
              helperText={formik.touched.price && formik.errors.price}
            />

            {/* Product Image */}
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

            {/* Product Items */}
            <TextField
              fullWidth
              label="Product Items"
              color="info"
              variant="filled"
              type="number"
              name="items"
              value={formik.values.items}
              onChange={formik.handleChange}
              inputProps={{
                min: 1,
                max: 1000,
              }}
              error={formik.touched.items && formik.errors.items}
              helperText={formik.touched.items && formik.errors.items}
            />

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

export default NewProduct;
