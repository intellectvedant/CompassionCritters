import React from "react";
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
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Search = () => {
  const search = useSelector((state) => state.search);

  return (
    <Layout>
      <Box>
        <h1>Search Results</h1>
        <Box>
          <h3>
            {search.keyword.length < 1
              ? "No Products Found"
              : `Found ${search.results?.product?.length || 0 }`}
          </h3>
        </Box>
        <Box>
          {search.results?.product?.map((product) => (
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
                    <Button>See {product.product_name}'s Story!</Button>
                    <Button>
                      <FavoriteIcon />
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default Search;
