import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {theme} from './theme';
import { ThemeProvider } from "@emotion/react";

const debates = [
  {
    date: "November 24, 2024",
    time: "7:00-9:00",
    title: "English",
    description: "50 Questions",
  },
  {
    date: "November 25, 2024",
    time: "8:00-10:00",
    title: "History",
    description: "25 Questions",
  },

];

const MockTests = () => {
  const [activeSection, setActiveSection] = useState("On going");

  const handleButtonClick = (section: string) => {
    setActiveSection(section);
  };

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ backgroundColor: "#000", color: "#fff",maxWidth:'85%',marginX:'auto', marginY:12}}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Karma, serif",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Mock Tests
      </Typography>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "40px",
          width: "60vw",
          marginX: "auto",
          padding: "5px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => handleButtonClick("On going")}
          sx={{
            flex: 1,
            backgroundColor:
              activeSection === "On going" ? "#2DBC91" : "#FFFFFF",
            color: activeSection === "On going" ? "#000" : "gray",
            borderRadius: "20px",
            textTransform: "none",
            fontFamily: "Karma, serif",
            fontWeight: 700,
            "&:hover": {
              backgroundColor:
                activeSection === "On going" ? "#2DBC91" : "#f5f5f5",
            },
          }}
        >
          On going
        </Button>
        <Button
          onClick={() => handleButtonClick("Upcoming")}
          sx={{
            flex: 1,
            backgroundColor:
              activeSection === "Upcoming" ? "#2DBC91" : "#FFFFFF",
            color: activeSection === "Upcoming" ? "#000" : "gray",
            borderRadius: "20px",
            textTransform: "none",
            fontFamily: "Karma, serif",
            fontWeight: 700,
            "&:hover": {
              backgroundColor:
                activeSection === "Upcoming" ? "#2DBC91" : "#f5f5f5",
            },
          }}
        >
          Upcoming
        </Button>
      </Box>
      
      <Grid container spacing={4} sx={{ marginTop: "20px"}}>
        {debates.map((debate, index) => (
          <Grid
            item
            xs={12}
            md={6}
            key={index}
            sx={{
              display: activeSection === "On going" ? "block" : "none",
            }}
          >
            <Card
              sx={{
                backgroundColor: "#343232",
                borderRadius: "40px",
                width: {xs:'80vw',md:"40vw"},
                height: "280px",
                opacity:"95%",
              }}
            >
              <CardContent sx={{ position: "relative" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <Box
                    sx={{
                      padding: "5px 10px",
                      borderRadius: "15px",
                      border: "1px solid #fff",
                      color:"#ffffff",
                      fontFamily: "Karma, serif",
                    }}
                  >
                    {debate.date}
                  </Box>
                  <Box
                    sx={{
                      padding: "5px 10px",
                      borderRadius: "15px",
                      border: "1px solid #fff",
                      fontFamily: "Karma, serif",
                      color:"#ffffff",
                    }}
                  >
                    {debate.time}
                  </Box>
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "Karma, serif", fontWeight: 700 }}
                >
                  {debate.title}
                </Typography>
                <Typography sx={{ marginBottom: "10px" }}>
                  {debate.description}
                </Typography>
                <Box sx={{position: "relative"}}>
                  <Button
                  
                    sx={{
                      borderRadius: "20px",
                      fontFamily: "Karma, serif",
                      fontWeight: 700,
                      textTransform: "none",
                      width: "100%",
                      alignSelf: "center",
                      marginTop: "80px",
                      border:"1px solid #fff",
                      color:"#ffffff",
                      
                      
                    }}
                  >
                    START
                  </Button>
               
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {/* You can add another set of Grid items here for the "Upcoming" section */}
    
        {debates.map((debate, index) => (
          <Grid
            item
            xs={12}
            md={6}
            key={index}
            sx={{
              display: activeSection === "Upcoming" ? "block" : "none",
            }}
          >
            <Card
              sx={{
                backgroundColor: "#343232",
                borderRadius: "40px",
                width: {xs:'80vw',md:"40vw"},
                height: "280px",
                opacity:"95%",
              }}
            >
              <CardContent sx={{ position: "relative" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <Box
                    sx={{
                      padding: "5px 10px",
                      borderRadius: "15px",
                      border: "1px solid #fff",
                      color:"#ffffff",
                      fontFamily: "Karma, serif",
                    }}
                  >
                    {debate.date}
                  </Box>
                  <Box
                    sx={{
                      padding: "5px 10px",
                      borderRadius: "15px",
                      border: "1px solid #fff",
                      fontFamily: "Karma, serif",
                      color:"#ffffff",
                    }}
                  >
                    {debate.time}
                  </Box>
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "Karma, serif", fontWeight: 700 }}
                >
                  {debate.title}
                </Typography>
                <Typography sx={{ marginBottom: "10px" }}>
                  {debate.description}
                </Typography>
                <Box sx={{position: "relative"}}>
                  <Button
                  
                    sx={{
                      borderRadius: "20px",
                      fontFamily: "Karma, serif",
                      fontWeight: 700,
                      textTransform: "none",
                      width: "100%",
                      alignSelf: "center",
                      marginTop: "80px",
                      border:"1px solid #fff",
                      color:"#ffffff",
                      
                      
                    }}
                  >
                    START
                  </Button>
               
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {/* You can add another set of Grid items here for the "Upcoming" section */}
      </Grid>
      </Box>

      
    
    </ThemeProvider>
  );
};

export default MockTests;
