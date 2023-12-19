import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Box,
  styled,
  Autocomplete,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";

const REACT_APP_API = "http://localhost:8000";

const MainBox = styled(Box)({
  padding: "15px",
  display: "grid",
  gridTemplateColumns: "(3fr, 1fr)",
  gap: "5px",
  "& > div": {
    padding: "3px",
    border: "1px solid black",
  },
});

const Imagebox = styled("label")`
  margin-top: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: none;
  background: #ac6464;
  color: #fff;
  border-radius: 12px;
  height: 35px;
  font-family: "Baloo 2", sans-serif;
  padding: 3px;
  &:hover {
    background-color: #1565c0;
  }
`;

const ImageTypography = styled(Typography)`
  margin: 7px;
  font-family: "Baloo 2", sans-serif;
`;

const CreateBox = styled(Box)`
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const initialProductState = {
  name: "",
  description: "",
  price: "",
  quantity: "",
  category: "",
  shipping: "",
};

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.auth);
  const [file, setFile] = useState("");
  const [product, setProduct] = useState(initialProductState);

  // Auto-Complete Section
  const categoryOption = categories?.map((c) => ({
    label: c.category_name,
    value: c.category_id,
  }));

  const shippingOption = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ];

  // handle Input for product

  const handleProductChange = (e) => {
    const productUpdate = { ...product, [e.target.name]: e.target.value };
    setProduct(productUpdate);
    console.log(productUpdate);
  };

  const handleAutocompleteChange = (name, value) => {
    const shippingValue = name === "shipping" ? value : value?.value || "";
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value?.value || "", // Set the selected value or an empty string if no value is selected
    }));
  };

  // create

  const createProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("quantity", product.quantity);
      formData.append("category", product.category);
      formData.append("shipping", product.shipping);
      formData.append("photo", file);

      const response = await axios.post(
        `${REACT_APP_API}/product/create-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: user?.token,
          },
        }
      );

      if (response?.data) {
        toast.success(
          `${response.data.product.product_name} is created Successfully!`
        );
        setProduct(initialProductState);
        setFile("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in Creating Product Details");
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
    getAllCategory();
  }, []);

  return (
    <Layout>
      <h1>Admindashboard</h1>
      <MainBox>
        <Box>
          <Adminmenu />
        </Box>
        <Box>
          <h1> Create Product</h1>
          <Box>
            <Autocomplete
              name="category"
              getOptionLabel={(option) => option.label}
              options={categoryOption}
              disablePortal
              sx={{ width: "300px" }}
              renderInput={(params) => (
                <TextField {...params} label="Select Categories" />
              )}
              onChange={(e, value) =>
                handleAutocompleteChange("category", value)
              }
            />
          </Box>
          <Box>
            <Imagebox variant="contained" htmlFor="inputPhoto">
              <ImageTypography>
                {file ? file.name : "Upload Picture"}
              </ImageTypography>
              <AddCircleIcon fontSize="medium" color="action" />
            </Imagebox>
            <input
              style={{ display: "none" }}
              id="inputPhoto"
              type="file"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setFile(selectedFile);
              }}
            />

            {file && (
              <Box>
                <img
                  src={URL.createObjectURL(file)}
                  alt="product_photo"
                  style={{ height: "300px", width: "300px" }}
                />
              </Box>
            )}
          </Box>
          <CreateBox>
            <TextField
              value={product.name}
              name="name"
              placeholder="Enter Product Name"
              type="text"
              onChange={(e) => handleProductChange(e)}
            />
            <TextField
              value={product.description}
              name="description"
              placeholder="Enter Product Description"
              type="text"
              onChange={(e) => handleProductChange(e)}
            />
            <TextField
              value={product.price}
              name="price"
              placeholder="Enter Product Price (In Rupees)"
              type="number"
              onChange={(e) => handleProductChange(e)}
              InputProps={{
                inputProps: {
                  step: 0.01, // set the step to control decimal places
                },
              }}
            />
            <TextField
              value={product.quantity}
              name="quantity"
              placeholder="Enter Product Quantity"
              type="number"
              onChange={(e) => handleProductChange(e)}
              InputProps={{
                inputProps: {
                  step: 1,
                },
              }}
            />
            <Autocomplete
              name="shipping"
              value={product.shipping}
              options={shippingOption}
              disablePortal
              sx={{ width: "300px" }}
              renderInput={(params) => (
                <TextField {...params} label="Shipping Status" />
              )}
              onChange={(e, value) =>
                handleAutocompleteChange("shipping", value)
              }
            />
            <Button variant="contained" onClick={() => createProduct()}>
              Create Product
            </Button>
          </CreateBox>
        </Box>
      </MainBox>
    </Layout>
  );
};

export default CreateProduct;
