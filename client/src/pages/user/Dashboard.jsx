import React from 'react'
import { useSelector } from "react-redux";
import Layout from '../../components/layout/Layout'
import { Box, styled } from "@mui/material";
import Usermenu from '../../components/layout/Usermenu';

const MainBox = styled(Box)({
  display: "grid",
  gridTemplateColumns: "(3fr,1fr)",
  gap: "5px",
  "& > div": {
    padding: "3px",
    border: "1px solid black",
  },
});

const Dashboard = () => {
  const user = useSelector((state)=> state.auth)

  return (
    <Layout title={"PawBoard"}>
        <h1>Dashboard</h1>
        <MainBox>
        <Box>
          <Usermenu />
        </Box>
        <Box>
          <h5>{user?.user?.name}</h5>
          <h5>{user?.user?.email}</h5>
        </Box>
      </MainBox>
    </Layout>
  )
}

export default Dashboard