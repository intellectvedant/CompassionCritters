import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";
import {
  Box,
  styled,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PetsIcon from "@mui/icons-material/Pets";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const REACT_APP_API = "http://localhost:8000";

const MainBox = styled(Box)({
  padding: "15px",
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "5px",
  "& > div": {
    padding: "3px",
    border: "1px solid black",
  },
});

const Products = () => {
  const [products, setProducts] = useState([]);

  // read all

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

  return (
    <Layout>
      <h1>Admin Dashboard</h1>
      <MainBox>
        <Box>
          <Adminmenu />
        </Box>
        <Box>
          <h1>All Products List</h1>
          {products.map((product) => (
            <Link to={`/dashboard/admin/update-product/${product.product_slug}`}>
              <Card key={product.product_id}>
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
                  <Typography variant="body2" color="textSecondary" mb={2}>
                    {product.product_description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      </MainBox>
    </Layout>
  );
};

export default Products;
