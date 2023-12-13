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
import {useParams, useNavigate} from 'react-router-dom';

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

const Updateproduct = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("")
  const user = useSelector((state) => state.auth);
  const [file, setFile] = useState("");
  const [product, setProduct] = useState(initialProductState);
  const {slug} = useParams();
  const Naviagte = useNavigate();

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
    const shippingValue = name === "product_shipping" ? value : value?.value || "";
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value?.value || "", // Set the selected value or an empty string if no value is selected
    }));
  };

  // update

  const updateProduct = async () => {
    console.log(product)
    try {
      const formData = new FormData();
      formData.append("name", product.product_name);
      formData.append("description", product.product_description);
      formData.append("price", product.product_price);
      formData.append("quantity", product.product_quantity);
      formData.append("category", product.category_id);
      formData.append("shipping", product.product_shipping);
      if (file instanceof File) {
        formData.append("photo", file);
      }else{
        formData.append("photo", product.product_photo);
      }

      const response = await axios.put(
        `${REACT_APP_API}/product/update-product/${product.product_id}`,
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

  // delete

  const deleteProduct = async()=>{
    try {

      const response = await axios.delete(`${REACT_APP_API}/product/delete-product/${product.product_id}`,{
        headers:{
          Authorization: user?.token,
        }
   
      })
      if(response?.data){
          toast.success("Deleted Product Successfully!")
          Naviagte("/dashboard/admin/product")
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting Product Details")
    }
  }

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

  // read

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_API}/product/get-product/${slug}`
      );
      if (response?.data) {
        setProduct(response.data.product)
        if (response.data.product.category_id) {
            setCategoryId(response.data.product.category_id);
          }

        if(response.data.product.product_photo){
            setFile(response.data.product.product_photo)
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching Product Details");
    }
  };

  useEffect(() => {
    getAllCategory();
    getProduct();
  }, []);

  return (
    <Layout>
      <h1>Admindashboard</h1>
      <MainBox>
        <Box>
          <Adminmenu />
        </Box>
        <Box>
          <h1>Update Product</h1>
          <Box>
            <Autocomplete
              name="category_id"
              getOptionLabel={(option) => option.label}
              getOptionSelected={(option, value) => option.value === value.value}
              options={categoryOption}
              disablePortal
              sx={{ width: "300px" }}
              value={
                categoryOption.find((category) => category.value === categoryId) ||
                null
              }
              renderInput={(params) => (
                <TextField {...params} label="Select Categories" />
              )}
              onChange={(e, { value }) => {
                console.log("Selected category:", value);
                handleAutocompleteChange("category_id", value);
              }}
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
                setFile(selectedFile ? selectedFile : product?.product_photo );
              }}
            />

            {file && (
              <Box>
                <img
                  src={file instanceof File ? URL.createObjectURL(file) : file}
                  alt="product_photo"
                  style={{ height: "300px", width: "300px" }}
                />
              </Box>
            )}
          </Box>
          <CreateBox>
            <TextField
              value={product.product_name}
              name="product_name"
              placeholder="Enter Product Name"
              type="text"
              onChange={(e) => handleProductChange(e)}
            />
            <TextField
              value={product.product_description}
              name="product_description"
              placeholder="Enter Product Description"
              type="text"
              onChange={(e) => handleProductChange(e)}
            />
            <TextField
              value={product.product_price}
              name="product_price"
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
              value={product.product_quantity}
              name="product_quantity"
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
              name="product_shipping"
              value={"shipping" ? true : false}
              options={shippingOption}
              disablePortal
              sx={{ width: "300px" }}
              renderInput={(params) => (
                <TextField {...params} label="Shipping Status" />
              )}
              onChange={(e, value) =>
                handleAutocompleteChange("product_shipping", value)
              }
            />
            <Button variant="contained" onClick={() => updateProduct()}>
              Update Product
            </Button>
            <Button variant="contained" color="error" onClick={() => deleteProduct()}>
               Delete Product
            </Button>
          </CreateBox>
        </Box>
      </MainBox>
    </Layout>
  );
};

export default Updateproduct;
