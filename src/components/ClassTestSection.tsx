import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const ClassTestSection = () => {
  const [activeSection, setActiveSection] = useState("Practice Test");
  const navigate = useNavigate()

  const handleButtonClick = (section: string) => {
    setActiveSection(section);
  };

  const handleClassClick = (classSelected: string) => {
    navigate(`/test?mode=${activeSection}&class=${classSelected}`)
  }

  return (
    <Box sx={{ backgroundColor: "#000", color: "#fff", maxWidth: '85%', marginX: "auto", marginY: 12 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Karma, serif",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Class Tests
      </Typography>
      <Box
        sx={{
          backgroundColor: "#FFFEED",
          borderRadius: "40px",
          width: "60vw",
          marginX: "auto",
          padding: "5px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => handleButtonClick("Practice Test")}
          sx={{
            flex: 1,
            backgroundColor:
              activeSection === "Practice Test" ? "#2DBC91" : "#FFFEED",
            color: activeSection === "Practice Test" ? "#000" : "gray",
            borderRadius: "20px",
            textTransform: "none",
            fontFamily: "Karma, serif",
            fontWeight: 700,
            "&:hover": {
              backgroundColor:
                activeSection === "Practice Test" ? "#2DBC91" : "#f5f5f5",
            },
          }}
        >
          Practice Test
        </Button>
        <Button
          onClick={() => handleButtonClick("Final Test")}
          sx={{
            flex: 1,
            backgroundColor:
              activeSection === "Final Test" ? "#2DBC91" : "#FFFEED",
            color: activeSection === "Final Test" ? "#000" : "gray",
            borderRadius: "20px",
            textTransform: "none",
            fontFamily: "Karma, serif",
            fontWeight: 700,
            "&:hover": {
              backgroundColor:
                activeSection === "Final Test" ? "#2DBC91" : "#f5f5f5",
            },
          }}
        >
          Final Test
        </Button>
      </Box>

      <Card
        sx={{
          backgroundColor: "#FFFBEA",
          borderRadius: "40px",
          width: { xs: '80vw', md: "40vw" },
          height: "280px",
          marginTop: "40px",
          marginX: "auto",
          display: "flex",
          flexDirection: "column", // Stack heading and buttons vertically
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          // display: activeSection === "Practice Test" ? "block" : "none",
        }}
      >

        <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
          Choose Class
        </Typography>


        <Box sx={{ display: "flex", gap: "20px" }}>
          <Button variant="outlined" onClick={() => handleClassClick('3')}>Class 3</Button>
          <Button variant="outlined" onClick={() => handleClassClick('6')}>Class 6</Button>
          <Button variant="outlined" onClick={() => handleClassClick('9')}>Class 9</Button>
        </Box>

      </Card>

    </Box>
  );
};

export default ClassTestSection;
