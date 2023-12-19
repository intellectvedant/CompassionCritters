import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { Box, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const REACT_APP_API = "http://localhost:8000";

const Container = styled(Box)`
  margin: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 400px;
`;

const OrderSuccessfull = () => {
  const [order, setOrder] = useState([]);
  const auth = useSelector((state) => state.auth);
  const [processedOrders, setProcessedOrders] = useState([]);
  const [countdown, setCountdown] = useState(10);
  const Navigate = useNavigate();

  const { order_id } = useParams();

  console.log({ o_id: order_id });

  const getOrder = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_API}/auth/order-payment-status/${order_id}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      setOrder(response.data.order);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductQuantity = async (o) => {
    try {
      if (o?.payment.success && !processedOrders.includes(o.order_id)) {
        const response = await axios.put(
          `${REACT_APP_API}/auth/update-product-quantity`,
          {
            product_id: o?.ordered_products.toString(),
            quantity: 1,
          },
          {
            headers: {
              Authorization: auth?.token,
            },
          }
        );

        if (response.data) {
          setProcessedOrders((prevOrders) => [...prevOrders, o.order_id]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrder(); // Fetch orders initially
    }
  }, [auth?.token]);

  useEffect(() => {
    order?.forEach((o) => {
      handleProductQuantity(o);
    });

    // Redirect to the orders page after 5 seconds
    const redirectTimeout = setTimeout(() => {
      Navigate("/dashboard/user/orders");
    }, countdown * 1000);

    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Clear the timeout on component unmount
    return () => {
      clearTimeout(redirectTimeout);
      clearInterval(countdownInterval);
    };
  }, [order, Navigate, countdown]);

  return (
    <Layout>
      <Container>
        <Box
          sx={{
            border: "2px solid #000",
            padding: "15px",
            borderRadius: "12px",
          }}
        >
          {order?.map((o) => (
            <>
              <Typography variant="body2" color="textSecondary">
                Redirecting in {countdown} seconds...
              </Typography>
              <h1>
                {o?.payment?.success ? "Payment Success !" : "Payment Error !"}
              </h1>
              <Typography variant="body2" color="textSecondary">
                GlobalID:
                {o?.payment?.transaction?.paymentReceipt.globalId}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                TransactionID:
                {o?.payment?.transaction.paymentReceipt.id}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                OrderID: {o?.order_id}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ProductID: {o?.ordered_products}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                MIN No:
                {
                  o?.payment?.transaction.paymentReceipt
                    .merchantIdentificationNumber
                }
              </Typography>
            </>
          ))}
        </Box>
      </Container>
    </Layout>
  );
};

export default OrderSuccessfull;
