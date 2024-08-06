import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../redux/store";
import { GetMyProfile } from "../redux/actions/myProfile";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Product description is required"),
  price: Yup.number().required("Product price is required"),
  category: Yup.string().required("Product category is required"),
  stock: Yup.number().required("Product stock is required"),
  brand: Yup.string().required("Product brand is required"),
  images: Yup.array().min(1, "At least one image is required"),
});

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(GetMyProfile());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      brand: "",
      images: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("stock", values.stock);
      formData.append("brand", values.brand);

      values.images.forEach((image) => {
        formData.append("files", image.file);
      });

      try {
        const { data } = await axios.post(
          `${server}/create-product`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        if (data.success && data.message === "Product Created Successfully") {
          alert("Product created successfully");
          navigate(`/home`);
        }
      } catch (error) {
        console.error("Error creating Product:", error.response?.data);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const uploadedImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImages.push({
          file: file,
          url: e.target.result,
        });

        if (uploadedImages.length === files.length) {
          setImages(uploadedImages);
          formik.setFieldValue("images", uploadedImages);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Create New Product
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Product Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Product Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="category"
              name="category"
              label="Product Category"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="stock"
              name="stock"
              label="Product Stock"
              type="number"
              value={formik.values.stock}
              onChange={formik.handleChange}
              error={formik.touched.stock && Boolean(formik.errors.stock)}
              helperText={formik.touched.stock && formik.errors.stock}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="brand"
              name="brand"
              label="Product Brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
              error={formik.touched.brand && Boolean(formik.errors.brand)}
              helperText={formik.touched.brand && formik.errors.brand}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="price"
              name="price"
              label="Product Price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              accept="image/*"
              id="image-upload"
              multiple
              type="file"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <label htmlFor="image-upload">
              <Button variant="contained" component="span">
                Upload Images
              </Button>
            </label>
            <Box sx={{ display: "flex", marginTop: 2 }}>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`product-${index}`}
                  style={{ width: 100, height: 100, margin: 5 }}
                />
              ))}
            </Box>
            {formik.errors.images && (
              <Box sx={{ color: "error.main", mt: 1 }}>
                {formik.errors.images}
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Creating..." : "Create Product"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={formik.isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
};

export default CreateProduct;
