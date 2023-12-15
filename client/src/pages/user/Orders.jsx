import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Box, styled } from "@mui/material";
import Usermenu from "../../components/layout/Usermenu";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

const REACT_APP_API = "http://localhost:8000";

const MainBox = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "5px",
  "& > div": {
    padding: "3px",
    border: "1px solid black",
  },
});

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const auth = useSelector((state) => state.auth);


  const getOrders = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API}/auth/orders`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setOrders(response.data.order)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(auth?.token) getOrders();
  }, []);

  return (
    <Layout>
      <h1>Dashboard</h1>
      <MainBox>
        <Box>
          <Usermenu />
        </Box>
        <Box>
          <h1>Orders</h1>
          <h3>{JSON.stringify(orders,null,4)}</h3>
        </Box>
      </MainBox>
    </Layout>
  );
};

export default Orders;
