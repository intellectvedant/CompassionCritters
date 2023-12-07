import React from "react";
import { AppBar, Box, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const MainBox = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  background-color: #000;
  box-shadow: 0 10px 8px -6px gray;
  border-bottom: 1px solid grey;
`;

const LeftBox = styled(Box)`
  & > a{
    text-decoration: none;
    color: #fff;
  }
`;

const RightBox = styled(Box)`
  display: flex;
  gap: 12px;
  & > a {
    padding: 7px;
    text-decoration: none;
    color: grey;
    font-family: 'Baloo 2', sans-serif;
    &:hover {
      color: #fff;
      border-bottom: 2px solid #fff;
    }
  }
`;


const Header = () => {
  return (
    <AppBar>
      <MainBox>
        <LeftBox>
          <Link to="/">
          <Typography variant="h5">CompassionCritters</Typography>
          </Link>
        </LeftBox>
        <RightBox>
          <Link to="/">
            <Typography>Home</Typography>
          </Link>
          <Link to="/category">
            <Typography>Category</Typography>
          </Link>
          <Link to="/login">
            <Typography>Login</Typography>
          </Link>
          <Link to="/cart">
            <Typography>Cart (0)</Typography>
          </Link>
        </RightBox>
      </MainBox>
    </AppBar>
  );
};

export default Header;
