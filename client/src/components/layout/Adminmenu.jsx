import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Adminmenu = () => {
  return (
    <>
      <List>
        <ListItem>
          <ListItemText>
            <Link to="/dashboard/admin/create-category">Create Category</Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Link to="/dashboard/admin/create-product">Create Product</Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Link to="/dashboard/admin/users">Users</Link>
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
};

export default Adminmenu;