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
import { Link } from "react-router-dom";

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

const Explore = () => {
  const user = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

  // filter

  const filterProduct = async () => {
    try {
      const response = await axios.post(
        `${REACT_APP_API}/product/filter-product`,
        { checked, radio }
      );
      if (response?.data) {
        setProducts(response.data.product);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching Filtered Product Details");
    }
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

  // total

  const getTotal = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_API}/product/count-product`
      );
      if (response?.data) {
        setTotal(response.data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    if (!checked.lentgh || !radio.length) getAllProduct();
  }, []);

  useEffect(() => {
    if (checked.lentgh || radio.length) filterProduct();
  }, [checked, radio]);

  console.log(user);
  return (
    <Layout>
      <MainBox>
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
              <h5>Reset Filters:</h5>
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </Button>
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
          </Grid>
        </Grid>
        <Box>
          <h3>{total}</h3>
        </Box>
      </MainBox>
    </Layout>
  );
};

export default Explore;
