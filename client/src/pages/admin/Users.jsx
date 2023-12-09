import React from 'react'
import Layout from '../../components/layout/Layout'
import Adminmenu from '../../components/layout/Adminmenu'
import { Box, styled } from "@mui/material";

const MainBox = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "5px",
  "& > div": {
    padding: "3px",
    border: "1px solid black",
  },
});

const Users = () => {
  return (
    <Layout>
            <h1>Admindashboard</h1>
        <MainBox>
        <Box>
          <Adminmenu />
        </Box>
        <Box>
        <h1>Users</h1>
        </Box>
      </MainBox>
    </Layout>
  )
}

export default Users