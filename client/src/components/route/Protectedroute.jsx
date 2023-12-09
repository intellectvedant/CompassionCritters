import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../spinner/Spinner.jsx";

const REACT_APP_API = "http://localhost:8000";


const Protectedroute = ({ element: Element, ...rest }) => {
  const [ok, setOk] = useState(false);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API}/auth/user-auth`, {
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
  
    if (user?.token) {
      authCheck();
    }
  }, [user?.token]);
  

  return ok ? <Outlet /> : <Spinner/>;
};
export default Protectedroute;
