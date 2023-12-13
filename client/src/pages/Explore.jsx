import React, { useEffect, useState } from "react";
import {
  Box,
  styled,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import Layout from "../components/layout/Layout";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid } from "@mui/material";
import { Prices } from "../components/Prices";

const REACT_APP_API = "http://localhost:8000";

const Cards = styled(Box)`
  padding: 3px;
  display: flex;
  background-color: red;
  gap: 5px;
`;

const Explore = () => {
  const user = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  //   filter by category

  const handleCategoryFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //   read all product

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

  // read all

  const getAllCategory = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_API}/category/get-all-category`
      );
      if (response?.data) {
        setCategories(response.data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching Category Details");
    }
  };

  useEffect(() => {
    getAllProduct();
    getAllCategory();
  }, []);

  console.log(user);
  return (
    <Layout>
      <Box sx={{ p: "20px", textAlign: "center" }}>
        <Box>
          <h1> Ready to Explore, {user.user ? user.user.name : "Stranger!"}</h1>
          <h5>{JSON.stringify(checked, null, 4)}</h5>
          <h5>{JSON.stringify(radio, null, 4)}</h5>
        </Box>
        <Grid container>
          <Grid item lg={2} sm={2} xs={12}>
            <h3> Sort Your Choice!</h3>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <h5> Sort By Category</h5>
              {categories?.map((category) => (
                <FormControlLabel
                  sx={{ textAlign: "left", marginLeft: "0px" }}
                  key={category.category_id}
                  control={<Checkbox />}
                  label={category.category_name}
                  onChange={(e) =>
                    handleCategoryFilter(e.target.checked, category.category_id)
                  }
                />
              ))}
              <h5> Sort By Price</h5>
              <RadioGroup
                name="price"
                onChange={(e) =>
                  setRadio(
                    Prices.find((price) => price.name === e.target.value)
                      ?.array || []
                  )
                }
              >
                {Prices?.map((price) => (
                  <FormControlLabel
                    key={price._id}
                    value={price.name}
                    control={<Radio />}
                    label={price.name}
                  />
                ))}
              </RadioGroup>
            </Box>
          </Grid>
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
                      <Button>See {product.product_name}'s Story!</Button>
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
        </Grid>
      </Box>
    </Layout>
  );
};

export default Explore;
