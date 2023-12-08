import React, { useState } from "react";
import { Box, Typography, TextField, styled, Button } from "@mui/material";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import dotenv from "dotenv";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {login } from "../../features/auth/authSlice";

const REACT_APP_API = "http://localhost:8000";

const MainBox = styled(Box)`
  margin: 40px 0px;
  text_align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #000;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  padding: 15px 10px;
  border-radius: 12px;
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 10px 20px;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const Auth = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState("login");
  const [loginData, setLoginData] = useState("");
  const [signup, setSignup] = useState("");
  const Naviagte = useNavigate();
  

  const toggleAccount = () => {
    {
      toggle === "login" ? setToggle("signup") : setToggle("login");
    }
  };

  // Signup Section:

  const inputSignupChange = (e) => {
    const updatedSignup = { ...signup, [e.target.name]: e.target.value };
    setSignup(updatedSignup);
  };

  const signupUser = async () => {
    try {
      const response = await axios.post(`${REACT_APP_API}/auth/register`, {
        signup,
      });
      if (response.status === 201) {
        toast.success(response.data.msg);
        setSignup("");
        setToggle("login");
        setLoginData({ email1: signup.email, password1: signup.password });
      } else {
        toast.error(error.response.data.msg);
        setSignup("");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      if (error.response) {
        if (error.response.status === 409) {
          toast.error(error.response.data.msg);
        } else if (error.response.status === 400) {
          // Extract and display the error message from the response
          const errorMessage =
            error.response.data.msg ||
            "An unexpected error occurred during signup.";
          toast.error(errorMessage);
        } else {
          // Handle other error status codes
          toast.error("An unexpected error occurred during signup.");
        }
      } else {
        // Handle network errors or other issues
        toast.error("An unexpected error occurred during signup.");
      }
    }
  };

  // Login Section:

  const inputLoginChange = (e) => {
    const updatedLogin = { ...loginData, [e.target.name]: e.target.value };
    setLoginData(updatedLogin);
  };

  const loginUser = async () => {
    try {
      const response = await axios.post(`${REACT_APP_API}/auth/login`, {
        loginData,
      });
      if (response.status === 201) {
        toast.success(response.data.msg);
        setLoginData("");
        dispatch(login({user: response.data.user, token: response.data.token}));
        localStorage.setItem("auth",JSON.stringify(response.data));
        Naviagte("/");
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      if (error.response) {
        if (error.response.status === 401) {
          toast.error(error.response.data.msg);
        } else {
          // Handle other error status codes
          toast.error("An unexpected error occurred during signup.");
        }
      } else {
        // Handle network errors or other issues
        toast.error("An unexpected error occurred during signup.");
      }
    }
  };

  return (
    <Layout>
      <MainBox>
        <Box>
          <Typography variant="h5">
            {toggle === "login" ? "Login" : "Register"}
          </Typography>
        </Box>
        {toggle === "login" ? (
          <Wrapper>
            <TextField
              value={loginData.email1}
              variant="standard"
              name="email1"
              label="Email"
              type="email"
              onChange={(e) => inputLoginChange(e)}
              required
            />
            <TextField
              value={loginData.password1}
              variant="standard"
              name="password1"
              label="Password"
              type="password"
              onChange={(e) => inputLoginChange(e)}
              required
            />
            <Button variant="contained" onClick={() => loginUser()}>
              Login
            </Button>
            <Typography
              variant="h7"
              style={{ textAlign: "center", marginTop: "10px" }}
            >
              OR
            </Typography>
            <Button variant="contained" onClick={() => toggleAccount()}>
              Signup
            </Button>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              value={signup.name}
              variant="standard"
              name="name"
              label="Name"
              type="name"
              onChange={(e) => inputSignupChange(e)}
              required
            />
            <TextField
              value={signup.email}
              variant="standard"
              name="email"
              label="Email"
              type="email"
              onChange={(e) => inputSignupChange(e)}
              required
            />
            <TextField
              value={signup.password}
              variant="standard"
              name="password"
              label="Password"
              type="password"
              onChange={(e) => inputSignupChange(e)}
              required
            />
            <Button variant="contained" onClick={() => signupUser()}>
              Signup
            </Button>
            <Typography
              variant="h7"
              style={{ textAlign: "center", marginTop: "10px" }}
            >
              OR
            </Typography>
            <Button variant="contained" onClick={() => toggleAccount()}>
              Login
            </Button>
          </Wrapper>
        )}
      </MainBox>
    </Layout>
  );
};

export default Auth;
