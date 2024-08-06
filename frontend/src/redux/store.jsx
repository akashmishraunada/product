import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./reducers/userLogin";
import adminRegisterReducer from "./reducers/adminRegister";
import userRegisterReducer from "./reducers/userRegister";
import myProfileReducer from "./reducers/myProfile";

import getAllProductsReducer from "./reducers/product/getAllProducts";
import getAllCartItemsReducer from "./reducers/product/getAllCartItems";
import updateCartItemQuentityReducer from "./reducers/product/updateCartItemQuentity";
import addToCartItemReducer from "./reducers/product/addToCartItem";
import removeCartItemReducer from "./reducers/product/removeCartItem";
import removeallCartItemReducer from "./reducers/product/removeallCartItem";

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    adminRegister: adminRegisterReducer,
    userRegister: userRegisterReducer,
    myProfile: myProfileReducer,

    products: getAllProductsReducer,
    cartItems: getAllCartItemsReducer,
    updateCartItem: updateCartItemQuentityReducer,
    addToCartItem: addToCartItemReducer,
    removeCartItem: removeCartItemReducer,
    removeallCartItem: removeallCartItemReducer,
  },
});

export default store;

export const server = "http://localhost:4000/api/v1";
