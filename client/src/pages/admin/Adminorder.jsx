import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";
import {
  Box,
  styled,
  TableContainer,
  TableHead,
  TableBody,
  Table,
  TableRow,
  TableCell,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const REACT_APP_API = "http://localhost:8000";

const MainBox = styled(Box)({
  padding: "15px",
  display: "grid",
  gridTemplateColumns: "(3fr, 1fr)",
  gap: "5px",
  "& > div": {
    padding: "3px",
    border: "1px solid black",
  },
});

const Adminorder = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const auth = useSelector((state) => state.auth);

  const handleStatusChange = async (order_id, value) => {
    try {
      const response = await axios.put(
        `${REACT_APP_API}/auth/order-status/${order_id}`,
        { status: value },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllOrders = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API}/auth/get-all-orders`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllOrders();
  }, []);

  console.log({ status: orders[0]?.status });

  return (
    <Layout>
      <h1>Admindashboard</h1>
      <MainBox>
        <Box>
          <Adminmenu />
        </Box>
        <Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ProductID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Buyer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.product_id}>
                    <TableCell>{order.product_id}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select
                          onChange={(event) =>
                            handleStatusChange(
                              order.order_id,
                              event.target.value
                            )
                          }
                          defaultValue={order.status}
                        >
                          {status.map((s) => (
                            <MenuItem key={s} value={s}>
                              {s}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>{order.buyer}</TableCell>
                    <TableCell>{order.created_at}</TableCell>
                    <TableCell>{order.payment.success.toString()}</TableCell>
                    <TableCell>{order.product_quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </MainBox>
    </Layout>
  );
};

export default Adminorder;
