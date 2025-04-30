import React from "react";

// MUI component
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#272727",
        color: "white",
        textAlign: "center",
        padding: "20px 10px",
        marginTop: "40px"
      }}
    >
      <Typography variant="h6" gutterBottom>
        CraveKart 🍴
      </Typography>

      <Typography variant="body2" mb={1}>
        Delicious food delivered at your doorstep.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: "20px", mt: 2 }}>
        <Link href="#" underline="hover" color="inherit">
          Home
        </Link>
        <Link href="#" underline="hover" color="inherit">
          About
        </Link>
        <Link href="#" underline="hover" color="inherit">
          Contact
        </Link>
        <Link href="#" underline="hover" color="inherit">
          Privacy Policy
        </Link>
      </Box>

      <Typography variant="caption" display="block" mt={3}>
        © {new Date().getFullYear()} CraveKart. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
