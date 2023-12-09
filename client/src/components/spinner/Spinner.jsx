import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Box, styled, Typography } from "@mui/material";
import {useNavigate, useLocation} from 'react-router-dom';

const MainBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;

const Spinner = ({path ="login"}) => {
    const [count, setCount] = useState(3)
    const Navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      const interval = setInterval(()=>{
            setCount((prevvalue)=> --prevvalue)
      }, 1000)
      count === 0 && Navigate(`/${path}`,{
        state: location.pathname
      });
      console.log(location.pathname)

      return ()=> clearInterval(interval)
    

    }, [count, Navigate, path])
    

  return (
    <MainBox>
        <Typography variant="h6"> Redirecting you to login. Paws a moment, we'll get you there in {count} seconds!</Typography>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </MainBox>
  );
};

export default Spinner;
