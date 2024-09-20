import React from 'react';
import { Card, Typography, Button, Box, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';

interface LocationState {
  score: number;
  totalQuestions: number;
}

const PracticeResultWindow: React.FC = () => {
  const location = useLocation();
  const { score, totalQuestions } = location.state as LocationState;

  const percentage = Math.round((score / totalQuestions) * 100);

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
          height: { xs: '50vh', sm: '60vh', md: '90vh' },
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '20px',
          textAlign: 'center',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: 'relative',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ 
            position: 'absolute', 
            top: 20, 
            right: 20 
          }}
          onClick={() => window.print()}
        >
          Print
        </Button>

        <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
          Quiz Result
        </Typography>

        <Box sx={{ position: 'relative', display: 'inline-flex', marginBottom: '20px' }}>
          <CircularProgress
            variant="determinate"
            value={percentage}
            size={120}
            thickness={5}
            sx={{ color: percentage >= 70 ? 'green' : 'red' }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" component="div" color="text.secondary">
              {`${percentage}%`}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h6" sx={{ marginBottom: '10px' }}>
          Your Score: {score}/{totalQuestions}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: '20px' }}>
          {percentage >= 70 ? 'Congratulations! You passed the quiz.' : 'Keep practicing. You can do better!'}
        </Typography>

        <Box
          sx={{
            width: '200px',
            padding: '10px',
            backgroundColor: percentage >= 70 ? 'green' : 'red',
            color: 'white',
            borderRadius: '5px',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          {percentage >= 70 ? 'PASS' : 'FAIL'}
        </Box>

        {/* <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ marginTop: '20px' }}
          onClick={() => window.location.href = '/'}
        >
          Take Another Quiz
        </Button> */}
      </Card>
    </Box>
  );
};

export default PracticeResultWindow;