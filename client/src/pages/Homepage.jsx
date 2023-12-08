import React from "react";
import Layout from "../components/layout/Layout";
import { useSelector } from "react-redux";

const Homepage = () => {
  const user = useSelector((state) => state.auth);
  return (
    <Layout>
      <h1> Homepage </h1>
      <div>
      <div>
        <h5>{user.user ? user.user.name : "No Name"}</h5>
        <h5>{user.user ? user.user.email : "No Email"}</h5>
        <h5>{user.token ? user.token : "No Token"}</h5>
      </div>
      </div>
    </Layout>
  );
};

export default Homepage;
