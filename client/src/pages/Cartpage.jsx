import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addToCart,
  clearCart,
  removeFromCart,
} from "../features/cart/cartSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

const REACT_APP_API = "http://localhost:8000";

const Cartpage = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  //   total

  const totalPrice = () => {
    try {
      let total = 0;

      if (cart.cart) {
        total = cart.cart.reduce(
          (acc, item) => acc + parseFloat(item.product_price),
          0
        );
      }

      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.error(error);
    }
  };

  //   Remove

  const handleRemoveFromCart = (product_id) => {
    try {
      dispatch(removeFromCart({ productId: product_id }));
      toast.success("Removed Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // Payment Gateway

  const getPaymentToken = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API}/product/order/token`);
      setClientToken(response?.data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  // payment

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const response = await axios.post(
        `${REACT_APP_API}/product/order/payment`,
        { nonce, cart },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (response.data) {
        setLoading(false);
        dispatch(clearCart());
        const order_id = await response.data.order[0].order_id
        Navigate(`/order-payment-status/${order_id}`);
        toast.success("Ordered Successfully");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPaymentToken();
  }, [auth?.token]);

  return (
    <Layout>
      <Box>
        <h1>Cart Section</h1>
        <List>
          {cart.cart?.map((cartItem) => (
            <ListItem key={cartItem?.product_id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={cartItem?.product_name}
                  src={cartItem?.product_photo}
                />
              </ListItemAvatar>
              <ListItemText
                primary={cartItem?.product_name}
                secondary={
                  <Typography variant="body2" color="textSecondary">
                    {`Category: ${cartItem?.category_name} | Price: $${cartItem?.product_price}`}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(e) => handleRemoveFromCart(cartItem?.product_id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "40px",
          }}
        >
          <h1>Total </h1>
          <h1>{totalPrice()}</h1>

          {!clientToken || !cart?.cart?.length ? (
            ""
          ) : (
            <Box>
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />
              <Button
                variant="contained"
                onClick={handlePayment}
                disabled={loading || !instance || !auth?.user}
              >
                Buy
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Cartpage;
