import React from 'react';
import { Box, Link, Typography } from '@mui/material';

const Banner = () => {
  const bannerStyle = {
    backgroundImage: 'url("your-image-url.jpg")',  // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '200px',  // Adjust the height as needed
    position: 'relative',
  };

  const transparentBoxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0)',  // Transparent background
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '50%',  // Adjust the width as needed
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const leftLinkStyle = {
    left: 0,
  };

  const rightLinkStyle = {
    right: 0,
  };

  return (
    <Box sx={bannerStyle}>
      {/* Left transparent box */}
      <Box sx={{ ...transparentBoxStyle, ...leftLinkStyle }}>
        <Link href="/left-page" underline="none">
          <Typography variant="h6" color="inherit">
            Left Link
          </Typography>
        </Link>
      </Box>

      {/* Right transparent box */}
      <Box sx={{ ...transparentBoxStyle, ...rightLinkStyle }}>
        <Link href="/right-page" underline="none">
          <Typography variant="h6" color="inherit">
            Right Link
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default Banner;
