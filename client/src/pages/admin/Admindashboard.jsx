import React from "react";
import Layout from "../../components/layout/Layout";
import { Box, styled } from "@mui/material";
import Adminmenu from "../../components/layout/Adminmenu";
import { useSelector } from "react-redux";

const MainBox = styled(Box)({
  display: "grid",
  gridTemplateColumns: "(3fr,1fr)",
  gap: "5px",
  "& > div": {
    padding: "3px",
    border: "1px solid black",
  },
});

const Admindashboard = () => {
  const user = useSelector((state) => state.auth);

  return (
    <Layout>
      <h1>Admindashboard</h1>
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
