import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import axios from "axios";
import {
  Box,
  styled,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid

} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const REACT_APP_API = "http://localhost:8000";

const Categorydetails = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  console.log({ Slug: slug });

  // read products by categories

  const categoryProduct = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_API}/product/category-product/${slug}`
      );
      if (response.data) {
        setProducts(response.data?.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    categoryProduct();
  }, []);

  return (
    <Layout>
      <h1>Category Details</h1>
      <h3>{products?.length < 1 ? "No Product Found" : `Found ${products.length}`}</h3>
      <Box>
        <Grid
          container
          item
          lg={10}
          sm={10}
          xs={12}
          style={{ justifyContent: "center" }}
        >
          {products.map((product) => (
            <Grid
              container
              lg={3}
              sm={4}
              xs={12}
              sx={{ m: "2px" }}
              key={product.product_id}
            >
              {/* <Link to={`/dashboard/admin/update-product/${product.product_slug}`}> */}
              <Card sx={{ borderRadius: "12px" }}>
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
              {/* </Link> */}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Categorydetails;
