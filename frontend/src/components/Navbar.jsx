import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogoutUser } from "../redux/actions/userLogin";
import toast, { Toaster } from "react-hot-toast";
import { GetMyProfile } from "../redux/actions/myProfile";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logOut, setLogOut] = useState(true);

  const { isAuthenticated, user } = useSelector((state) => state.myProfile);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(LogoutUser());
    toast.success("Logged Out Successfully");
    dispatch({ type: "MY_PROFILE_FAIL" });
    setTimeout(() => {
      navigate("/");
      setLogOut(!logOut);
    }, 500);
  };

  useEffect(() => {
    dispatch(GetMyProfile());
  }, [dispatch, logOut]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cake Culture
        </Typography>
        <Box sx={{ display: "flex" }}>
          {!isAuthenticated ? (
            <>
              <Button color="inherit" onClick={() => handleNavigation("/")}>
                User Login
              </Button>
              <Button
                color="inherit"
                onClick={() => handleNavigation("/admin")}
              >
                Admin Login
              </Button>
              <Button
                color="inherit"
                onClick={() => handleNavigation("/user-register")}
              >
                User Register
              </Button>
              <Button
                color="inherit"
                onClick={() => handleNavigation("/admin-register")}
              >
                Admin Register
              </Button>
            </>
          ) : (
            <>
              {user && user.role === "admin" && (
                <Button
                  color="inherit"
                  onClick={() => handleNavigation("/create-product")}
                >
                  Create Product
                </Button>
              )}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
      <Toaster />
    </AppBar>
  );
};

export default Navbar;
