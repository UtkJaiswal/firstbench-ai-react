import React, { useState } from 'react';
import { Card, Typography, Button, Box, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

interface PracticeTestWindowProps {
  Class: string;  // Replace 'string' with the appropriate type for 'Class'
}

const PracticeTestWindow: React.FC<PracticeTestWindowProps> = ({ Class }) => {
  const navigate = useNavigate();
  const mode = 'Practice Test';

  const handleStartTest = () => {
    navigate(`/questions?mode=${mode}&class=${Class}`);
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full window height
        backgroundColor: '#5C5FC7', // Background color to match the screenshot
      }}
    >
      <Card
        sx={{
          width: "95vw", // Responsive width
          height: { xs: '50vh', sm: '60vh', md: '80vh' },
          padding: '100px',
          backgroundColor: '#fff',
          borderRadius: '20px', // Border radius to match the screenshot
          textAlign: 'center',
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Back Button */}
        <IconButton
          onClick={handleBack}
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            color: 'primary.main',
          }}
        >
          <ArrowBack />
        </IconButton>

        <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
          Practice Test
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: '10px', color: 'gray' }}>
          15qs English + 15qs Maths + 15qs EVS
        </Typography>

        <Typography variant="h6" sx={{ marginBottom: '30px', fontWeight: 'bold' }}>
          Total 45 Questions
        </Typography>

        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          sx={{
            position: 'absolute',
            bottom: 20,
            right: 20,
          }}
          onClick={handleStartTest}
        >
          Start
        </Button>
      </Card>
    </Box>
  );
};

export default PracticeTestWindow;
