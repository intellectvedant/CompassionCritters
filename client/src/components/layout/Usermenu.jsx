import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Usermenu = () => {
  return (
    <>
      <List>
        <ListItem>
          <ListItemText>
            <Link to="/dashboard/user/profile">Profile</Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Link to="/dashboard/user/orders">Orders</Link>
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
};

export default Usermenu;
