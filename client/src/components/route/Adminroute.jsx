import axios from "axios";
import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";

const REACT_APP_API = "http://localhost:8000";

const Adminroute = () => {
  const user = useSelector((state) => state.auth);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const adminRoute = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API}/auth/admin-auth`, {
          headers: {
            Authorization: user?.token,
          },
        });
        if (response.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setOk(false);
      }
    };
    if (user?.token) adminRoute();
  }, [user?.token]);

  return ok ? <Outlet /> : <Spinner path=""/>;
};

export default Adminroute;
