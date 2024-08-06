import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

const ProductCard = ({
  product,
  cartItem,
  onAddToCart,
  onIncrement,
  onDecrement,
  loading,
}) => {
  const handleAddToCart = () => {
    onAddToCart(product._id, cartItem ? cartItem.quantity : 1);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={product.images[0]?.url}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ₹{product.price}
        </Typography>

        {cartItem ? (
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                onDecrement(cartItem._id);
              }}
              aria-label="decrease quantity"
              disabled={loading}
            >
              -
            </Button>
            <Typography variant="body1" style={{ margin: "0 10px" }}>
              {cartItem.quantity}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                onIncrement(cartItem._id);
              }}
              aria-label="increase quantity"
              disabled={loading}
            >
              +
            </Button>
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart} // Add to cart
          >
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
