import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Box, Grid, Dialog, DialogActions, DialogTitle } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useLocation } from 'react-router-dom';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface Question {
  _id: string;
  question: string;
  options: {
    [key: string]: string;
  };
  correctAnswer: string;
  explanation:string;
  type:string;
  comprehension: string;
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

interface QuestionsProps {
  mode: string;
  Class: string;
  normalQuestions: NormalQuestion[];
  comprehensionQuestions: ComprehensionQuestion[];
}



// const questions: Question[] = [
//   { 
//     id: 1, 
//     text: "What is the capital of France?", 
//     options: {A: "London", B: "Berlin", C: "Paris", D: "Madrid"}, 
//     correctAnswer: "C"
//   },
//   { 
//     id: 2, 
//     text: "Which planet is known as the Red Planet?", 
//     options: {A: "Venus", B: "Mars", C: "Jupiter", D: "Saturn"}, 
//     correctAnswer: "B"
//   }
// ];


const QuestionComponent: React.FC<QuestionsProps> = ({ mode, Class, normalQuestions, comprehensionQuestions }) => {
  const allQuestions = [
    ...normalQuestions.map((q) => ({ ...q, type: 'normal', comprehension:"" })),
    ...comprehensionQuestions.flatMap((comp) =>
      comp.questions.map((q, index) => ({
        ...q,
        _id: comp._id,
        comprehension: comp.comprehension,
        correctAnswer: comp.correctAnswers[index],
        explanation: comp.explanations[index],
        type: 'comprehension',
      }))
    ),
  ];
    const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(new Array(allQuestions.length).fill(null));
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [questionNumber, setQuestionNumber] = useState(0)

  
    // const query = useQuery();
    // const mode = query.get("mode") || "Practice";
    // const Class = query.get("class");
  
    const navigate = useNavigate();
  
    useEffect(() => {
      calculateScore();
    }, [selectedAnswers]);

    
  
    const handleAnswerClick = (answer: string, index: number) => {
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[index] = answer;
      setSelectedAnswers(newSelectedAnswers);
    };
  
    const handleNext = () => {
      if (currentQuestion < allQuestions.length) {
        setCurrentQuestion((prev) => prev + 1);
      }
    };
  
    const handlePrev = () => {
  if (currentQuestion > 1) {
    setCurrentQuestion((prev) => prev - 1);
  } else {
    // Redirect to the previous page
    navigate(-1); // This will navigate back to the last page in the history
  }
};
const handleBackClick = () => {
  navigate(-1);
};
  
    const handleSubmitClick = () => {
      setIsSubmitDialogOpen(true);
    };
  
    const handleCloseDialog = () => {
      setIsSubmitDialogOpen(false);
    };
  
    const handleConfirmSubmit = () => {
      setSubmitted(true);
      calculateScore();
      setIsSubmitDialogOpen(false);
    };
  
    const calculateScore = () => {
      const newScore = selectedAnswers.reduce((acc, answer, index) => {
        return answer === allQuestions[index].correctAnswer ? acc + 1 : acc;
      }, 0);
      setScore(newScore);
    };
  
    const getOptionStyle = (optionKey: string, index: number) => {
      const selectedAnswer = selectedAnswers[index];
      const correctAnswer = allQuestions[index].correctAnswer;
  
      const darkTextColor = '#000000';
  
      if (mode === "Practice Test") {
        if (selectedAnswer) {
          if (optionKey === correctAnswer) {
            return { backgroundColor: 'green', color: darkTextColor, fontWeight: 'bold' };
          }
          if (optionKey === selectedAnswer && optionKey !== correctAnswer) {
            return { backgroundColor: 'red', color: darkTextColor, fontWeight: 'bold' };
          }
        }
      } else if (!submitted) {
        if (optionKey === selectedAnswer) {
          return { backgroundColor: 'blue', color: 'white', fontWeight: 'bold' };
        }
      } else if (submitted) {
        if (optionKey === correctAnswer) {
          return { backgroundColor: 'green', color: darkTextColor, fontWeight: 'bold' };
        }
        if (optionKey === selectedAnswer && optionKey !== correctAnswer) {
          return { backgroundColor: 'red', color: darkTextColor, fontWeight: 'bold' };
        }
        if (selectedAnswer === null && optionKey === correctAnswer) {
          return { backgroundColor: 'green', color: darkTextColor, fontWeight: 'bold' };
        }
      }
  
      return { backgroundColor: 'transparent', color: darkTextColor, fontWeight: 'normal' };
    };
  
  
    const renderQuestion = (question: Question, index: number) => {
      return (
        <Box key={question._id} sx={{ marginBottom: '30px' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            Question {index+1}
          </Typography>
          <Typography sx={{ fontSize: '1.5rem', marginBottom: '15px' }}>{question.comprehension}</Typography>
          <Typography sx={{ fontSize: '1.5rem', marginBottom: '15px' }}>{question.question}</Typography>
  
          <Grid container spacing={3}>
            {Object.entries(question.options).map(([key, value]) => (
              <Grid item xs={6} key={key}>
                <Button
                  variant="outlined"
                  sx={{ ...getOptionStyle(key, index), fontSize: '1.25rem', padding: '15px 20px' }}
                  onClick={() => handleAnswerClick(key, index)}
                  fullWidth
                  disabled={submitted || (mode === "Practice Test" && selectedAnswers[index] !== null)}
                >
                  {`${key}. ${value}`}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    };
  
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#5C5FC7', padding: '20px' }}>
        <Card sx={{ width: "95vw", height: { xs: '80vh', sm: '60vh', md: '90vh' }, padding: '30px', backgroundColor: '#fff', borderRadius: '20px', position: 'relative', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          
        {submitted && (
        <Box sx={{ width: "100%", display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: '20px' }}>
          <Button onClick={handleBackClick} sx={{ marginRight: '10px', minWidth: '40px' }}>
            <ArrowBackIcon />
          </Button>
          <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>
            Your Score: {score} out of {allQuestions.length}
          </Typography>
          {/* Back button for post submission */}
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleBackClick} 
            sx={{ marginLeft: 'auto', minWidth: '100px' }}
          >
            Go Back
          </Button>
        </Box>
      )}
  
          {!submitted && mode === "Practice Test" && (
            <Box sx={{ height: "80vh", width: "80vw", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handlePrev} 
                sx={{ fontSize: '1.25rem', padding: '15px 20px' }}
              >
                <ArrowBackIcon />
              </Button>
  
              {renderQuestion(allQuestions[currentQuestion - 1], currentQuestion - 1)}
  
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleNext} 
                disabled={currentQuestion === allQuestions.length} 
                sx={{ fontSize: '1.25rem', padding: '15px 20px' }}
              >
                <ArrowForwardIcon />
              </Button>
            </Box>
          )}
  
          {(!submitted && mode !== "Practice Test") || submitted ? (
            <Box sx={{ height: "80vh", width: "80vw", overflowY: 'scroll', padding: '30px' }}>
              {allQuestions.map((question, index) => renderQuestion(question, index))}
              {!submitted && mode !== "Practice Test" && (
                <Button 
                  variant="contained" 
                  color="success" 
                  sx={{ width: "20%", marginTop: '20px', fontSize: '1.25rem', padding: '15px 20px' }} 
                  onClick={handleConfirmSubmit}
                >
                  Submit
                </Button>
              )}
            </Box>
          ) : null}
  
          {/* Submit button for Practice Test on the last question */}
          {!submitted && mode === "Practice Test" && currentQuestion === allQuestions.length && (
            <Button 
              variant="contained" 
              color="success" 
              sx={{ width: "20%", marginTop: '20px', fontSize: '1.25rem', padding: '15px 20px' }} 
              onClick={handleConfirmSubmit}
            >
              Submit
            </Button>
          )}
  
          <Dialog open={isSubmitDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle sx={{ fontSize: '1.5rem' }}>Are you sure you want to submit?</DialogTitle>
            <Typography sx={{ padding: '20px', fontSize: '1.25rem' }}>Your current score is {score} out of {allQuestions.length}</Typography>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary" sx={{ fontSize: '1.25rem', padding: '15px 20px' }}>
                Cancel
              </Button>
              <Button onClick={handleConfirmSubmit} color="secondary" sx={{ fontSize: '1.25rem', padding: '15px 20px' }}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      </Box>
    );
  





  };
  
  export default QuestionComponent;