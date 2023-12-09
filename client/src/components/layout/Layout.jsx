// Layout.jsx
import React from "react";
import { Box, styled } from "@mui/material";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

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
  padding: 55px 2px 0 2px;
`;

const Layout = ({ children, title, description, keyword, author }) => {
  return (
    <Container>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keyword" content={keyword} />
      </Helmet>
      <Header />
      <Mainbox>
        <Toaster position="top-center" reverseOrder={true} />
        {children}
      </Mainbox>
      <Footer />
    </Container>
  );
};

Layout.defaultProps = {
  title: "CompassionCritters",
  description: "Empowering hearts, creating havens for rescued.",
  keyword: "Dogs, Cat, Puppy, Kitten, Pet, Animal ,Rescue, Shelter",
  author: "Vedant",
};

export default Layout;
