import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import banner from '../assets/banner.jpg'

const Banner = () => {
  const bannerStyle = {
    backgroundImage: `url("${banner}")`,  // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '290px',  // Adjust the height as needed
    position: 'relative',
  };

  const transparentBoxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s', // Smooth transition for the box shadow
    '&:hover': {
      backgroundColor: '#FFFFFF20',
    },
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
      <Link href={`/category/consumer-electronics`} underline="none">
      <Box sx={{ ...transparentBoxStyle, ...leftLinkStyle }}>

      </Box>
      </Link>

      {/* Right transparent box */}
      <Link href={`/category/grocery`} underline="none">
      <Box sx={{ ...transparentBoxStyle, ...rightLinkStyle }}>
      </Box>
      </Link>

    </Box>
  );
};

export default Banner;
