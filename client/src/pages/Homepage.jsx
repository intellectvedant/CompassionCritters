import React from "react";
import Layout from "../components/layout/Layout";
import { useSelector } from "react-redux";

const Homepage = () => {
  const user = useSelector((state) => state.auth);
  console.log(user);
  return (
    <Layout>
      <h1> Homepage </h1>
      <div>
        <div>
          {user.user ? (
            Object.entries(user.user).map(([key, value]) => (
              <h5 key={key}>{`${key}: ${value}`}</h5>
            ))
          ) : (
            <p>No Data</p>
          )}
          <h5>{user.token ? user.token : "No Token"}</h5>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
