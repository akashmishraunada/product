import React, { useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../redux/actions/userLogin";
import { CLEAR_ERROR } from "../redux/reducers/userLogin";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, isAuthenticated, message, error } = useSelector(
    (state) => state.userLogin
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(CLEAR_ERROR());
        await dispatch(LoginUser(values.email, values.password, 'user'));
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(message);
      setTimeout(() => {
        navigate("/home");
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
          User Login
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </Box>
      </Box>
      <Toaster />
    </Container>
  );
};

export default UserLogin;
