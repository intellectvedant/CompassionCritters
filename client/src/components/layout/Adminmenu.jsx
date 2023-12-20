import React from "react";
import { List, ListItem, ListItemText, styled, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const StyledList = styled(List)`
  display: flex;
  gap: 3px;
  & > * {
    text-decoration: none;
    border-radius: 12px;
  }

  & > *:hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }

  .active {
    background-color: #808080;
    color: #FFF;
    font-weight: bold;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #000;
  font-weight: bolder;
`;

const Adminmenu = () => {
  return (
    <>
      <StyledList>
        <StyledLink to="/dashboard/admin/create-category">
          <ListItem>
            <ListItemText>Create Category</ListItemText>
          </ListItem>
        </StyledLink>
        <StyledLink to="/dashboard/admin/create-product">
          <ListItem>
            <ListItemText>Create Product</ListItemText>
          </ListItem>
        </StyledLink>
        <StyledLink to="/dashboard/admin/product">
          <ListItem>
            <ListItemText>Products</ListItemText>
          </ListItem>
        </StyledLink>
        <StyledLink to="/dashboard/admin/orders">
          <ListItem>
            <ListItemText>Orders</ListItemText>
          </ListItem>
        </StyledLink>
        <StyledLink to="/dashboard/admin/users">
          <ListItem>
            <ListItemText>Users</ListItemText>
          </ListItem>
        </StyledLink>
      </StyledList>
    </>
  );
};

export default Adminmenu;
