import React from "react";
import Layout from "../../components/layout/Layout";
import { Box, styled } from "@mui/material";
import Adminmenu from "../../components/layout/Adminmenu";
import { useSelector } from "react-redux";

const MainBox = styled(Box)({
  padding: "20px",
  display: "grid",
  gridTemplateColumns: "(3fr,1fr)",
  gap: "5px",
  "& > div": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    border: "1px solid black",
  },
});

const Admindashboard = () => {
  const user = useSelector((state) => state.auth);

  return (
    <Layout>
      <h3>Admindashboard</h3>
      <MainBox>
        <Box>
          <Adminmenu />
        </Box>
        <Box>
          <h5>{user?.user?.name}</h5>
          <h5>{user?.user?.email}</h5>
        </Box>
      </MainBox>
    </Layout>
  );
};

export default Admindashboard;
