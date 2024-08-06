import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "./components/Error";
import UserLogin from "./components/userLogin";
import AdminLogin from "./components/adminLogin";
import UserRegister from "./components/userRegister";
import AdminRegister from "./components/adminRegister";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import toast, { Toaster } from "react-hot-toast";
import CreateProduct from "./components/CreateProduct";
import { GetMyProfile } from "./redux/actions/myProfile";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  const { isAuthenticated, user, message, error, loading } = useSelector(
    (state) => state.myProfile
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "CLEAR_ERROR" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "CLEAR_Message" });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(GetMyProfile());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;
