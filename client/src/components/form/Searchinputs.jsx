import React from "react";
import { TextField, Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setSearch } from "../../features/product/searchSlice";
import SearchIcon from "@mui/icons-material/Search";

const REACT_APP_API = "http://localhost:8000";

const SearchInputs = () => {
  const Naviagte = useNavigate();
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  console.log({ keyword: search });
  console.log({ keyword1: search.keyword });

  const handleChange = (e) => {
    dispatch(setSearch({ keyword: e.target.value, results: [] }));
  };

  const handleSearch = async (e) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API}/product/search-product/${search.keyword}`
      );
      if (response.data) {
        dispatch(
          setSearch({ keyword: search.keyword, results: response.data })
        );
        Naviagte("/search");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: "5px", maxHeight: "200px", justifyContent: "center", alignItems: "center" }}>
      <TextField
        sx={{ bgcolor: "grey", borderRadius: "12px", "&:hover": { bgcolor: "white" }  }}
        size="small"
        fullWidth
        placeholder="Search"
        values={search.keyword}
        onChange={handleChange}
      />
      <SearchIcon sx={{ bgcolor: "grey",borderRadius: "12px" , p: "5px", color: "black", cursor: "pointer", "&:hover": { color: "white" } }} onClick={() => handleSearch()} />
    </Box>
  );
};

export default SearchInputs;
