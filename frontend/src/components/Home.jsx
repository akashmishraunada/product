import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Tooltip,
} from "@mui/material";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { GetProducts } from "../redux/actions/product/getAllProducts";
import { GetCartItems } from "../redux/actions/product/getAllCartItems";
import { updateCartItem } from "../redux/actions/product/updateCartItemQuentity";
import { AddToCartItem } from "../redux/actions/product/addToCartItem";
import { RemoveCartItem } from "../redux/actions/product/removeCartItem";
import { RemoveAllCartItem } from "../redux/actions/product/removeallCartItem";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import toast, { Toaster } from 'react-hot-toast';
import DeleteIcon from "@mui/icons-material/Delete";
import { debounce } from "lodash";
import { GetMyProfile } from "../redux/actions/myProfile";

const Home = () => {
  const dispatch = useDispatch();
  const { Products } = useSelector((state) => state.products);
  const { CartItems } = useSelector((state) => state.cartItems);

  const [updateMyCart, setUpdateMyCart] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(GetProducts());
    dispatch(GetCartItems());
    dispatch(GetMyProfile());
    dispatch({ type: "MY_PROFILE_SUCCESS" });

  }, [dispatch, updateMyCart]);

  const handleAddToCart = (productId, quantity) => {
    dispatch(AddToCartItem(productId, quantity));
    setTimeout(() => {
      setUpdateMyCart(!updateMyCart);
    }, 600);
  };

  const debouncedUpdateCartItem = debounce((cartId, quantity) => {
    dispatch(updateCartItem(cartId, quantity));
  }, 300);

  const handleIncrement = (cartItemId) => {
    const item = CartItems?.cartItems?.find((item) => item._id === cartItemId);
    if (item) {
      debouncedUpdateCartItem(item._id, item.quantity + 1);
    }
  };

  const handleDecrement = (cartItemId) => {
    const item = CartItems?.cartItems?.find((item) => item._id === cartItemId);
    if (item) {
      if (item.quantity > 1) {
        debouncedUpdateCartItem(item._id, item.quantity - 1);
      } else {
        debouncedUpdateCartItem(item._id, 0);
      }
    }
  };

  const getTotalPrice = () => {
    return CartItems?.cartItems
      ?.reduce((total, item) => total + item.productId.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleConfirmOrder = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleStartNewOrder = () => {
    dispatch(RemoveAllCartItem());
    setTimeout(() => {
      setUpdateMyCart(!updateMyCart);
    }, 600);
    handleCloseDialog();
  };

  const handleRemoveItem = (productId) => {
    dispatch(RemoveCartItem(productId));
    setTimeout(() => {
      setUpdateMyCart(!updateMyCart);
    }, 600);
  };

  const getCartItemDetails = () => {
    return CartItems?.cartItems?.map((item) => (
      <ListItem key={item._id} style={{ borderBottom: "1px solid #ddd" }}>
        <ListItemAvatar>
          <Avatar
            src={item.productId?.images[0]?.url}
            alt={item.productId?.name}
            variant="rounded"
          />
        </ListItemAvatar>
        <ListItemText
          primary={item.productId?.name}
          secondary={`Price: ₹${item.productId?.price} - Quantity: ${item.quantity}`}
        />
        <IconButton
          onClick={() => handleRemoveItem(item._id)}
          style={{ color: "red" }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItem>
    ));
  };

  return (
    <>
      <Grid container spacing={2}>
        {/* Left side for products */}
        <Grid item xs={8}>
          <Paper sx={{ p: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textAlign: "center", padding: "30px", fontWeight: "bold" }}
            >
              Desserts
            </Typography>
            <Grid container spacing={2}>
              {Products && Products.Products && Products.Products.length > 0 ? (
                Products.Products.map((product) => {
                  const cartItem = CartItems?.cartItems?.find(
                    (item) => item.productId._id === product._id
                  );
                  return (
                    <Grid item xs={12} sm={6} md={4} key={product._id}>
                      <ProductCard
                        product={product}
                        cartItem={cartItem}
                        onAddToCart={handleAddToCart}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                      />
                    </Grid>
                  );
                })
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "50px",
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography>No products available</Typography>
                </div>
              )}
            </Grid>
          </Paper>
        </Grid>
        {/* Right side for cart */}
        <Grid item xs={4}>
          <Paper
            sx={{
              p: 2,
              bgcolor: "#fafafa",
              minHeight: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textAlign: "left", padding: "5px", fontWeight: "bold" }}
            >
              Your Cart ({CartItems?.cartItems?.length})
            </Typography>
            {CartItems?.cartItems?.length > 0 ? (
              <>
                <List>{getCartItemDetails()}</List>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Total Price: ₹{getTotalPrice()}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleConfirmOrder}
                >
                  Confirm Order
                </Button>
              </>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                {/* <img
                  src="https://i.pinimg.com/736x/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.jpg"
                  alt="Empty Cart"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                /> */}
                <Typography variant="h6" color="textSecondary">
                  Your cart is empty
                </Typography>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog for order confirmation */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
          }}
        >
          {/* <CheckCircleOutlineIcon sx={{ fontSize: 40, color: "green", mr: 1 }} /> */}
          <Typography variant="h4" sx={{ paddingTop: "20px" }}>
            Order Confirmation
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            We hope you enjoy your food!
          </Typography>
          <List>{getCartItemDetails()}</List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Total: ₹{getTotalPrice()}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleStartNewOrder}
            color="primary"
            variant="contained"
            sx={{ bgcolor: "red", width: "30%" }}
          >
            Start New Order
          </Button>
          <Button
            onClick={handleCloseDialog}
            color="secondary"
            sx={{ bgcolor: "blue", width: "30%", color: "black" }}
          >
            Cancel
          </Button>
        </DialogActions>
        <Toaster />
      </Dialog>
    </>
  );
};

export default Home;
