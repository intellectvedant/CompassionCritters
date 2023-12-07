import React from 'react'
import {Box, styled, Typography} from '@mui/material'
import { Link } from 'react-router-dom'

const Mainbox = styled(Box)`
  background-color: #000;
  color: #fff;
  padding: 2px;
`
const Maintext = styled('h4')({
  textAlign: "center",
  fontSize: "13px",
  margin: '1px 0', 
});

const Text = styled(Typography)({
  textAlign: "center",
  fontSize: "11px",
  '& > a': {
    color: 'blue !important',
    textDecoration: 'none',
    margin: '0 4px', 
  },
})


const Footer = () => {
  return (
    <Mainbox>
        <Maintext>All Rights Reserved &copy; CompassionCritters</Maintext>
        <Text>
          <Link to="/about">
            About
          </Link>
          |
          <Link to="/contact">
            Contact
          </Link>
          |
          <Link to="/policy">
            Privacy Policy
          </Link>
        </Text>
    </Mainbox>
  )
}

export default Footer