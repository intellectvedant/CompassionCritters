import React, { useState } from "react";
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
import SearchInputs from "../form/Searchinputs";
import useCategory from "../../hooks/useCategory";

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
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const categoryMenuOpen = Boolean(categoryAnchorEl);
  const userMenuOpen = Boolean(userAnchorEl);
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const categories = useCategory();

  console.log({cart:cart});

  const handleCategoryClick = (event) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleUserClick = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setCategoryAnchorEl(null);
    setUserAnchorEl(null);
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
        <Box
          sx={{  p: "3px", m: "2px", borderRadius: "12px" }}
        >
          <SearchInputs />
        </Box>

        <RightBox>
          <Link to="/">
            <Typography>Home</Typography>
          </Link>

          <div>
            <Button
              id="category-button"
              aria-controls={categoryMenuOpen ? "category-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={categoryMenuOpen ? "true" : undefined}
              onClick={handleCategoryClick}
            >
              Category
            </Button>
            <Menu
              id="category-menu"
              anchorEl={categoryAnchorEl}
              open={categoryMenuOpen}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "category-button",
              }}
            >
              {categories?.map((category) => (
                <Link
                  key={category.category_id}
                  to={`/category/${category?.slug}`}
                >
                  <MenuItem onClick={handleClose}>
                    {" "}
                    {category.category_name}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </div>

          <Link to="/cart">
            <Typography>Cart {cart.cart?.length}</Typography>
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
                  id="user-button"
                  aria-controls={userMenuOpen ? "user-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={userMenuOpen ? "true" : undefined}
                  onClick={handleUserClick}
                >
                  {user.user.name}
                </Button>
                <Menu
                  id="user-menu"
                  anchorEl={userAnchorEl}
                  open={userMenuOpen}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "user-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                      to={`/dashboard/${
                        user?.user?.is_admin === false ? "user" : "admin"
                      }`}
                    >
                      Dashboard
                    </Link>
                  </MenuItem>
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
