import React from "react";
import { Box, Typography, TextField, styled, Button } from "@mui/material";

const MainBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Categoryform = ({handleCategorySubmit, value, setValue}) => {
  return (
    <MainBox>
      <Box>
        <TextField
        type="text"
        value={value}
        placeholder="Enter New Category"
        onChange={(e)=> setValue(e.target.value)}
        />
      </Box>
      <Box>
        <Button onClick={handleCategorySubmit}>Submit</Button>
      </Box>
    </MainBox>
  );
};

export default Categoryform;
