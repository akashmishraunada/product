import React, { useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Input,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { CreateAdmin } from "../redux/actions/adminRegister";
import { CLEAR_ERROR } from "../redux/reducers/adminRegister";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, isAuthenticated, message, error } = useSelector(
    (state) => state.adminRegister
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .required("Required"),
    }),
    onSubmit: (values) => {
      try {
        dispatch(CLEAR_ERROR()); 
        dispatch(
          CreateAdmin(values.name, values.email, values.password, values.phone)
        );
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(message);
      setTimeout(() => {
        navigate("/admin");
      }, 500);
    } else if (error) {
      toast.error(error);
    }
  }, [isAuthenticated, message, error]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Admin Register
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            margin="normal"
            fullWidth
            name="phone"
            label="Phone Number"
            id="phone"
            autoComplete="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </Box>
      </Box>
      <Toaster />
    </Container>
  );
};

export default AdminRegister;
