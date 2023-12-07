// Layout.jsx
import React from "react";
import { Box, styled } from "@mui/material";

// Components
import Header from "./Header";
import Footer from "./Footer";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Mainbox = styled(Box)`
  flex: 1;
  padding: 40px 2px 0 2px;
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      <Mainbox>{children}</Mainbox>
      <Footer />
    </Container>
  );
};

export default Layout;
