import { useState, useEffect } from "react";
import axios from 'axios';

const REACT_APP_API = "http://localhost:8000";

export default function useCategory(){
    const [categories, setCategories] = useState([])

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

      return categories;
}