import React from 'react'
import Layout from '../../components/layout/Layout'
import { Box, styled } from "@mui/material";
import Usermenu from '../../components/layout/Usermenu';

const MainBox = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "5px",
  "& > div": {
    padding: "3px",
    border: "1px solid black",
  },
});

const Profile = () => {
  return (
    <Layout>
        <h1>Dashboard</h1>
        <MainBox>
        <Box>
          <Usermenu />
        </Box>
        <Box>
        <h1>Profile</h1>
        </Box>
      </MainBox>
    </Layout>
  )
}

export default Profile