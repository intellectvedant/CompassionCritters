import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";
import {
  Box,
  styled,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Modal,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import Categoryform from "../../components/form/Categoryform";

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

const MainModal = styled(Modal)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  padding: "16px",
  textAlign: "center",
  maxHeight: "70vh", // Adjust the value as needed
  overflowY: "auto",
});

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const user = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // create

  const handleCategorySubmit = async () => {
    try {
      const response = await axios.post(
        `${REACT_APP_API}/category/create-category`,
        { name },
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );

      if (response?.data) {
        toast.success(
          `${response.data.category.category_name} is created Succesfully!`
        );
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in Creating New Category Category");
    }
  };

  // read all

  const getAllCategory = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_API}/category/get-all-category`
      );
      if (response.data) {
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
          <h1>Manage Category</h1>
          <Typography>
            <Categoryform
              handleCategorySubmit={handleCategorySubmit}
              value={name}
              setValue={setName}
            />
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category ID</TableCell>
                  <TableCell>Categories</TableCell>
                  <TableCell>action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories?.map((c) => (
                  <TableRow key={c.category_id}>
                    <TableCell>{c.category_id}</TableCell>
                    <TableCell>{c.category_name}</TableCell>
                    <TableCell style={{ display: "flex", gap: "5px" }}>
                      <Box>
                        <Button variant="contained" onClick={handleOpen}>
                          <EditNoteIcon />
                        </Button>
                        <MainModal
                          open={open}
                          onClose={handleClose}
                        >
                          <Box>
                            <Categoryform />
                          </Box>
                        </MainModal>
                      </Box>
                      <Box>
                        <Button variant="contained" color="error">
                          <DeleteForeverIcon />
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}

                {/* Add more rows as needed */}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </MainBox>
    </Layout>
  );
};

export default CreateCategory;
