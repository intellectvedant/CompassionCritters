import React from "react";
import { Typography, Button, styled } from "@mui/material";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const NotFoundContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  textAlign: "center",
});

const Title = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#ff7043", // Orange color, you can change it to your preferred color
});

const Description = styled(Typography)({
  fontSize: "1.2rem",
  marginBottom: "20px",
  maxWidth: "400px",
  color: "#546e7a", // Dark blue-gray color
});

const StyledButton = styled(Button)({
  backgroundColor: "#43a047", // Green color, you can change it
  color: "#fff",
  '&:hover': {
    backgroundColor: "#2e7031", // Darker green on hover
  },
});

const NotFoundImage = styled("img")({
  width: "300px",
  height: "auto",
  margin: "20px 0px",
});

const Pagenotfound = () => {
  return (
    <Layout>
      <NotFoundContainer>
        <NotFoundImage
          src="data:image/jpeg;base64,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" // Add your custom image path
          alt="Sad Puppy Illustration"
        />
        <Title variant="h1">Oops! Page Not Found</Title>
        <Description variant="body1">
          Looks like you've wandered into uncharted territory. Don't worry, our
          rescue animals are here to guide you back home!
        </Description>
        <StyledButton variant="contained" component={Link} to="/">
          Go Back Home
        </StyledButton>
      </NotFoundContainer>
    </Layout>
  );
};

export default Pagenotfound;
