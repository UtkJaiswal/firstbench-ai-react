import React from 'react';
import { Card, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importing back arrow icon

interface FinalTestWindowProps {
  Class: string;  // Replace 'string' with the appropriate type for 'Class'
}

const FinalTestWindow: React.FC<FinalTestWindowProps> = ({ Class }) => {
  const navigate = useNavigate();
  const mode = 'Final Test';

  const handleStartTest = () => {
    navigate(`/questions?mode=${mode}&class=${Class}`);
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#5C5FC7',
      }}
    >
      <Card
        sx={{
          width: "95vw",
          height: { xs: '50vh', sm: '60vh', md: '80vh' },
          padding: '100px',
          backgroundColor: '#fff',
          borderRadius: '20px',
          textAlign: 'center',
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handleBack}
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ArrowBackIcon />
        </Button>

        <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
          Final Test
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
            right: 20
          }}
          onClick={handleStartTest}
        >
          Start
        </Button>
      </Card>
    </Box>
  );
};

export default FinalTestWindow;
