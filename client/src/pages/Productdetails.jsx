import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import {
  Box,
  styled,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

const REACT_APP_API = "http://localhost:8000";

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

const Productdetails = () => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const { slug } = useParams();

  // read

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_API}/product/get-product/${slug}`
      );
      if (response?.data) {
        setProduct(response.data?.product);
        relatedProduct(
          response.data?.product.product_id,
          response.data?.product.category_id
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching Product Details");
    }
  };

  // related

  const relatedProduct = async (product_id, category_id) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API}/product/related-product/${product_id}/${category_id}`
      );
      if (response?.data) {
        setRelated(response.data?.product);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching Product Details");
    }
  };

  useEffect(() => {
    if (slug) getProduct();
  }, [slug]);

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <Arrow>{">"}</Arrow>,
    prevArrow: <Arrow>{"<"}</Arrow>,
  };

  return (
    <Layout>
      <Box sx={{ p: "20px" }}>
        <h1>Product Details</h1>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  alt={product.product_name}
                  height="400px"
                  image={product.product_photo || "/placeholder-image.jpg"}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    {product.product_name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Category: {product.category_name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Price: ${product.product_price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    Description: {product.product_description}
                  </Typography>
                  <Button variant="contained" color="primary">
                    Add to Cart
                  </Button>
                  {/* Add more details or actions as needed */}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <h1> Similar Product</h1>
          <Box >
            <h3>{related <1 && "No SImilar Product Found"}</h3>
            <Slider {...settings}>
              {related.map((product) => (
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

                      <Button>
                        <FavoriteIcon />
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Slider>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Productdetails;
