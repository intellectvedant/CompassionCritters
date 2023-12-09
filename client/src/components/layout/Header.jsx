import React, {useState} from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  styled,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-hot-toast";

const MainBox = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  background-color: #000;
  box-shadow: 0 10px 8px -6px gray;
  border-bottom: 1px solid grey;
`;

const LeftBox = styled(Box)`
  & > a {
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
    font-family: "Baloo 2", sans-serif;
    &:hover {
      color: #fff;
      border-bottom: 2px solid #fff;
    }
  }
`;

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const Navigate = useNavigate();



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (e) => {
    toast.success("Logout Successful!");
    dispatch(logout());
    localStorage.removeItem("auth");
    Navigate("/login");
  };

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
          <Link to="/cart">
            <Typography>Cart (0)</Typography>
          </Link>
          {!user.isAuthenticated ? (
            <>
              <Link to="/login">
                <Typography>Login</Typography>
              </Link>
            </>
          ) : (
            <>
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  {user.user.name}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}><Link to={`/dashboard/${user?.user?.is_admin === false ? "user" : "admin"}`}>Dashboard</Link></MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Button onClick={(e) => handleLogout(e)}>Logout</Button>
                  </MenuItem>
                </Menu>
              </div>
            </>
          )}
        </RightBox>
      </MainBox>
    </AppBar>
  );
};

export default Header;
