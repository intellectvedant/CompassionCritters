import React, { useEffect, useState } from "react";
import {
  Box,
  styled,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import Layout from "../components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";

const REACT_APP_API = "http://localhost:8000";

// const Cards = styled(Box)`
//   padding: 3px;
//   display: flex;
//   background-color: red;
//   gap: 5px;
// `;

const Arrow = styled("div")`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 24px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
`;

const Homepage = () => {
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  console.log({ cart: cart });

  const getAllProduct = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_API}/product/get-all-product`
      );
      if (response?.data) {
        setProducts(response?.data.product);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching Product Details");
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <Arrow>{">"}</Arrow>,
    prevArrow: <Arrow>{"<"}</Arrow>,
  };

  console.log(user);
  return (
    <Layout>
      <Box sx={{ p: "10px" }}>
        <Box>
          <h1> Welcome, {user.user ? user.user.name : "Paw-sitivePal"}</h1>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1> Lets Listen their stories!</h1>
            <Link to="/explore">
              <Button variant="contained" sx={{ height: "40px" }}>
                Explore Every Story!...
              </Button>
            </Link>
          </Box>
          <Slider {...settings}>
            {products.map((product) => (
              // <Link to={`/dashboard/admin/update-product/${product.product_slug}`}>
              <Card key={product.product_id} sx={{ borderRadius: "12px" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.product_photo}
                  alt={`${product.product_name} - ${product.category_name}`}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.product_name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {product.category_name}
                  </Typography>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Link to={`/product/${product.product_slug}`}>
                      <Button>See {product.product_name}'s Story!</Button>
                    </Link>

                    <Button
                      onClick={(e) => {
                        dispatch(addToCart({ ...cart, product }));
                        toast.success("Loved Successfully");
                      }}
                    >
                      Loved
                    </Button>
                  </Box>
                </CardContent>
              </Card>
              // </Link>
            ))}
          </Slider>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1> Lets Listen their stories!</h1>
            <Link to="/explore">
              <Button variant="contained" sx={{ height: "40px" }}>
                Explore Every Story!...
              </Button>
            </Link>
          </Box>
          <Slider {...settings}>
            {products.map((product) => (
              // <Link to={`/dashboard/admin/update-product/${product.product_slug}`}>
              <Card key={product.product_id} sx={{ borderRadius: "12px" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.product_photo}
                  alt={`${product.product_name} - ${product.category_name}`}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.product_name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {product.category_name}
                  </Typography>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Link to={`/product/${product.product_slug}`}>
                      <Button>See {product.product_name}'s Story!</Button>
                    </Link>

                    <Button
                      onClick={(e) => {
                        dispatch(addToCart({ ...cart, product }));
                        toast.success("Loved Successfully");
                      }}
                    >
                      Loved
                    </Button>
                  </Box>
                </CardContent>
              </Card>
              // </Link>
            ))}
          </Slider>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1> Lets Listen their stories!</h1>
            <Link to="/explore">
              <Button variant="contained" sx={{ height: "40px" }}>
                Explore Every Story!...
              </Button>
            </Link>
          </Box>
          <Slider {...settings}>
            {products.map((product) => (
              // <Link to={`/dashboard/admin/update-product/${product.product_slug}`}>
              <Card key={product.product_id} sx={{ borderRadius: "12px" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.product_photo}
                  alt={`${product.product_name} - ${product.category_name}`}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.product_name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {product.category_name}
                  </Typography>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Link to={`/product/${product.product_slug}`}>
                      <Button>See {product.product_name}'s Story!</Button>
                    </Link>

                    <Button onClick={(e)=> {
                      dispatch(addToCart({...cart,product}))
                      toast.success("Loved Successfully")
                    }}>
                      Loved
                    </Button>
                  </Box>
                </CardContent>
              </Card>
              // </Link>
            ))}
          </Slider>
        </Box>

      </Box>
    </Layout>
  );
};

export default Homepage;
