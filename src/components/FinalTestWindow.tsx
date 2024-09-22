import React, { useState } from 'react';
import { Card, Typography, Button, Box, IconButton, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importing back arrow icon
import QuestionComponent from './QuestionComponent';


interface FinalTestWindowProps {
  Class: string;  // Replace 'string' with the appropriate type for 'Class'
}

interface ComprehensionOption {
  [key: string]: string;
}

interface ComprehensionQuestionAndOption {
  question: string;
  options: ComprehensionOption;
}

interface ComprehensionQuestion {
  _id: string;
  comprehension: string;
  questions: ComprehensionQuestionAndOption[];
  correctAnswers: string[];
  explanations: string[];
}

interface NormalOption {
  [key: string]: string;
}

interface NormalQuestion {
  _id: string;
  question: string;
  options: NormalOption;
  correctAnswer: string;
  explanation: string;
}

const FinalTestWindow: React.FC<FinalTestWindowProps> = ({ Class }) => {
  const navigate = useNavigate();
  const mode = 'Final Test';

  const [comprehensionQuestions, setComprehensionQuestions] = useState<ComprehensionQuestion[]>([]);
  const [normalQuestions, setNormalQuestions] = useState<NormalQuestion[]>([]);
  const [testStarted, setTestStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStartTest = async () => {
    setLoading(true);
    try {
      await fetchQuestions();
      setTestStarted(true);
    } catch (err) {
      console.error("Error in handleStartTest:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const fetchQuestions = async () => {
    try {
      const grade: String = Class;
      const subjects = ["English", "EVS", "Mathematics"];
      let allNormalQuestions: NormalQuestion[] = [];
      let allComprehensionQuestions: ComprehensionQuestion[] = [];

      for (const subject of subjects) {
        const backendUrl = process.env.REACT_APP_BACKEND_URL
        const response = await axios.post(`${backendUrl}/questions/`, {
          grade,
          subject,
        });

        if (subject === "English") {
          const newComprehensionQuestions = response.data.map((comprehension: any) => ({
            _id: comprehension._id,
            comprehension: comprehension.comprehension,
            correctAnswers: comprehension.correctAnswers,
            explanations: comprehension.explanations,
            questions: comprehension.questions.map((q: any) => ({
              question: q.question,
              options: q.options,
            })),
          }));
          allComprehensionQuestions = [...allComprehensionQuestions, ...newComprehensionQuestions];
        } else {
          const newNormalQuestions = response.data.map((question: any) => ({
            _id: question._id,
            question: question.question,
            options: question.options,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation
          }));
          allNormalQuestions = [...allNormalQuestions, ...newNormalQuestions];
        }
      }

      setComprehensionQuestions(allComprehensionQuestions);
      setNormalQuestions(allNormalQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (testStarted) {
    // Check if questions are ready to be rendered
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      );
    }

    return (
      <QuestionComponent
        mode={mode}
        Class={Class}
        normalQuestions={normalQuestions}
        comprehensionQuestions={comprehensionQuestions}
      />
    );
  }

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
