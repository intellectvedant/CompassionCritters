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
  Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const REACT_APP_API = "http://localhost:8000";

const MainBox = styled(Box)({
  padding: "20px",
  display: "grid",
  gridTemplateColumns: "(3fr,1fr)",
  gap: "5px",
  "& > div": {
    padding: "3px",
    border: "1px solid black",
  },
});

const CardContainer = styled(Grid)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "10px",
  padding: "10px",
});

const Categorydetails = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

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
      <MainBox>
        <Box>
          <h3>
            {products?.length < 1
              ? "No Products Found"
              : `Found ${
                  products?.length || 0
                } Items During Search`}
          </h3>
        </Box>
        <Box>
          <CardContainer container spacing={2} alignItems="stretch">
            {products?.map((product) => (
              <Grid item key={product.product_id}>
                <Card
                  sx={{
                    borderRadius: "12px",
                    maxWidth: "300px",
                    height: "100%",
                    border: "1px solid #000",
                  }}
                >
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
                      <Button>See {product.product_name}'s Story!</Button>
                      <Button>
                        <FavoriteIcon />
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </CardContainer>
        </Box>
      </MainBox>
    </Layout>
  );
};

export default Categorydetails;
