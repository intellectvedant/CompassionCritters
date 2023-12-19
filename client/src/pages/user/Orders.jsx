import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import {
  Box,
  List,
  styled,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import Usermenu from "../../components/layout/Usermenu";
import { useSelector } from "react-redux";
import axios from "axios";

const REACT_APP_API = "http://localhost:8000";

const MainBox = styled(Box)({
  padding: "20px",
  display: "grid",
  gridTemplateColumns: "(3fr,1fr)",
  gap: "5px",
  "& > div": {
    padding: "3px",
    border: "1px solid black",
  },
});

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API}/auth/orders`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setOrders(response.data.order);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders(); // Fetch orders initially
    }
  }, [auth?.token]);

  return (
    <Layout>
      <h1>Dashboard</h1>
      <MainBox>
        <Box>
          <Usermenu />
        </Box>
        <Box>
          <List>
            {orders.map((orderItem) => (
              <ListItem key={orderItem?.product_id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={orderItem?.product_name}
                    src={orderItem?.product_photo}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={orderItem?.product_name}
                  secondary={
                    <Typography variant="body2" color="textSecondary">
                      {`Order Id: ${orderItem?.order_id} | Product Id : ${
                        orderItem?.product_id
                      } | Payment Status: ${
                        orderItem.payment.success ? "Success" : "Error"
                      } | Order Status: ${orderItem.status}`}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </MainBox>
    </Layout>
  );
};

export default Orders;
