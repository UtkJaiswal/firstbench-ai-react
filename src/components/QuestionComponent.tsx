import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Box, Grid, Dialog, DialogActions, DialogTitle } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  { 
    id: 1, 
    text: "What is the capital of France?", 
    options: ["A. London", "B. Berlin", "C. Paris", "D. Madrid"], 
    correctAnswer: "C. Paris" 
  },
  { 
    id: 2, 
    text: "Which planet is known as the Red Planet?", 
    options: ["A. Venus", "B. Mars", "C. Jupiter", "D. Saturn"], 
    correctAnswer: "B. Mars" 
  },
  { 
    id: 3, 
    text: "Who painted the famous artwork 'The Starry Night'?", 
    options: ["A. Leonardo da Vinci", "B. Vincent van Gogh", "C. Claude Monet", "D. Pablo Picasso"], 
    correctAnswer: "B. Vincent van Gogh" 
  },
  { 
    id: 4, 
    text: "What is the chemical symbol for gold?", 
    options: ["A. Ag", "B. Au", "C. Hg", "D. Pb"], 
    correctAnswer: "B. Au" 
  },
  { 
    id: 5, 
    text: "Which author wrote 'To Kill a Mockingbird'?", 
    options: ["A. F. Scott Fitzgerald", "B. Harper Lee", "C. Jane Austen", "D. J.K. Rowling"], 
    correctAnswer: "B. Harper Lee" 
  },
  { 
    id: 6, 
    text: "What is the largest mammal on Earth?", 
    options: ["A. Elephant", "B. Blue whale", "C. Hippopotamus", "D. Rhinoceros"], 
    correctAnswer: "B. Blue whale" 
  },
  { 
    id: 7, 
    text: "Which musician is known as the 'King of Rock and Roll'?", 
    options: ["A. Chuck Berry", "B. Elvis Presley", "C. Little Richard", "D. Jerry Lee Lewis"], 
    correctAnswer: "B. Elvis Presley" 
  },
  { 
    id: 8, 
    text: "What is the smallest country in the world?", 
    options: ["A. Vatican City", "B. Monaco", "C. Nauru", "D. Tuvalu"], 
    correctAnswer: "A. Vatican City" 
  },
  { 
    id: 9, 
    text: "Who was the first president of the United States?", 
    options: ["A. George Washington", "B. Thomas Jefferson", "C. Abraham Lincoln", "D. Franklin D. Roosevelt"], 
    correctAnswer: "A. George Washington" 
  },
  { 
    id: 10, 
    text: "What is the highest mountain peak in the solar system?", 
    options: ["A. Mount Everest", "B. Olympus Mons", "C. Denali", "D. Kilimanjaro"], 
    correctAnswer: "B. Olympus Mons" 
  },
  { 
    id: 11, 
    text: "Which element is the lightest in the periodic table?", 
    options: ["A. Hydrogen", "B. Helium", "C. Oxygen", "D. Nitrogen"], 
    correctAnswer: "A. Hydrogen" 
  },
  { 
    id: 12, 
    text: "Who wrote the famous novel '1984'?", 
    options: ["A. George Orwell", "B. Aldous Huxley", "C. Ray Bradbury", "D. Joseph Heller"], 
    correctAnswer: "A. George Orwell" 
  },
  { 
    id: 13, 
    text: "What is the largest living species of lizard?", 
    options: ["A. Komodo dragon", "B. Saltwater crocodile", "C. Black mamba", "D. Green anaconda"], 
    correctAnswer: "A. Komodo dragon" 
  },
  { 
    id: 14, 
    text: "Which artist created the famous sculpture 'David'?", 
    options: ["A. Michelangelo", "B. Leonardo da Vinci", "C. Raphael", "D. Donatello"], 
    correctAnswer: "A. Michelangelo" 
  },
  { 
    id: 15, 
    text: "What is the process by which plants convert sunlight into energy?", 
    options: ["A. Respiration", "B. Photosynthesis", "C. Decomposition", "D. Fermentation"], 
    correctAnswer: "B. Photosynthesis"
  }]

  const QuestionComponent: React.FC = () => {
    const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(new Array(questions.length).fill(null));
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
  
    const query = useQuery();
    const mode = query.get("mode") || "Practice";
    const Class = query.get("class");
  
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
      if (currentQuestion < questions.length) {
        setCurrentQuestion((prev) => prev + 1);
      }
    };
  
    const handlePrev = () => {
      if (currentQuestion > 1) {
        setCurrentQuestion((prev) => prev - 1);
      }
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
        return answer === questions[index].correctAnswer ? acc + 1 : acc;
      }, 0);
      setScore(newScore);
    };
  
    const getOptionStyle = (answer: string, index: number) => {
      const selectedAnswer = selectedAnswers[index];
      const correctAnswer = questions[index].correctAnswer;
  
      // Using pure black for dark text color on colored backgrounds
      const darkTextColor = '#000000';
  
      if (mode === "Practice Test") {
        if (selectedAnswer) {
          // Show immediate feedback in Practice Test mode once an answer is selected
          if (answer === correctAnswer) {
            return { backgroundColor: 'green', color: darkTextColor, fontWeight: 'bold' };
          }
          if (answer === selectedAnswer && answer !== correctAnswer) {
            return { backgroundColor: 'red', color: darkTextColor, fontWeight: 'bold' };
          }
        }
      } else if (!submitted) {
        // For other modes, only highlight the selected answer in blue before submission
        if (answer === selectedAnswer) {
          return { backgroundColor: 'blue', color: 'white', fontWeight: 'bold' };
        }
      } if(submitted) {
        // After submission, show correct and incorrect answers
        if (answer === correctAnswer) {
          return { backgroundColor: 'green', color: darkTextColor, fontWeight: 'bold' };
        }
        if (answer === selectedAnswer && answer !== correctAnswer) {
          return { backgroundColor: 'red', color: darkTextColor, fontWeight: 'bold' };
        }
        // Highlight the correct answer if it was not selected at all
        if (selectedAnswer === null && answer === correctAnswer) {
          return { backgroundColor: 'green', color: darkTextColor, fontWeight: 'bold' };
        }
      }
  
      return { backgroundColor: 'transparent', color: darkTextColor, fontWeight: 'normal' };
    };
  
    const renderQuestion = (question: Question, index: number) => {
      return (
        <Box key={question.id} sx={{ marginBottom: '30px' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            Question {question.id}
          </Typography>
          <Typography sx={{ fontSize: '1.5rem', marginBottom: '15px' }}>{question.text}</Typography>
  
          <Grid container spacing={3}>
            {question.options.map((answer) => (
              <Grid item xs={6} key={answer}>
                <Button
                  variant="outlined"
                  sx={{ ...getOptionStyle(answer, index), fontSize: '1.25rem', padding: '15px 20px' }}
                  onClick={() => handleAnswerClick(answer, index)}
                  fullWidth
                  disabled={submitted || (mode === "Practice Test" && selectedAnswers[index] !== null)}
                >
                  {answer}
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
          {!submitted && (
            <Button 
              variant="contained" 
              color="success" 
              sx={{ position: 'absolute', top: '20px', right: '20px', fontSize: '1.25rem', padding: '15px 20px' }} 
              onClick={handleConfirmSubmit}
            >
              Submit
            </Button>
          )}
          
          {!submitted && mode === "Practice Test" && (
            <Box sx={{ height: "80vh", width: "80vw", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button variant="contained" color="primary" onClick={handlePrev} disabled={currentQuestion === 1} sx={{ fontSize: '1.25rem', padding: '15px 20px' }}>
                <ArrowBackIcon />
              </Button>
  
              {renderQuestion(questions[currentQuestion - 1], currentQuestion - 1)}
  
              <Button variant="contained" color="primary" onClick={handleNext} disabled={currentQuestion === questions.length} sx={{ fontSize: '1.25rem', padding: '15px 20px' }}>
                <ArrowForwardIcon />
              </Button>
            </Box>
          )}
  
          {(!submitted && mode !== "Practice Test") || submitted ? (
            <Box sx={{ height: "80vh", width: "80vw", overflowY: 'scroll', padding: '30px' }}>
              {questions.map((question, index) => renderQuestion(question, index))}
            </Box>
          ) : null}
  
          <Dialog open={isSubmitDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle sx={{ fontSize: '1.5rem' }}>Are you sure you want to submit?</DialogTitle>
            <Typography sx={{ padding: '20px', fontSize: '1.25rem' }}>Your current score is {score} out of {questions.length}</Typography>
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