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
  { id: 1, text: "What is the capital of France?", options: ["A. London", "B. Berlin", "C. Paris", "D. Madrid"], correctAnswer: "C. Paris" },
  { id: 2, text: "Which planet is known as the Red Planet?", options: ["A. Venus", "B. Mars", "C. Jupiter", "D. Saturn"], correctAnswer: "B. Mars" },
  { id: 3, text: "Who painted the Mona Lisa?", options: ["A. Van Gogh", "B. Picasso", "C. Da Vinci", "D. Rembrandt"], correctAnswer: "C. Da Vinci" },
  { id: 4, text: "What is the largest ocean on Earth?", options: ["A. Atlantic", "B. Indian", "C. Arctic", "D. Pacific"], correctAnswer: "D. Pacific" },
  { id: 5, text: "Which element has the chemical symbol 'O'?", options: ["A. Gold", "B. Oxygen", "C. Silver", "D. Iron"], correctAnswer: "B. Oxygen" },
  { id: 6, text: "What is the largest mammal in the world?", options: ["A. Elephant", "B. Blue Whale", "C. Giraffe", "D. Hippopotamus"], correctAnswer: "B. Blue Whale" },
  { id: 7, text: "In which year did World War II end?", options: ["A. 1943", "B. 1945", "C. 1947", "D. 1950"], correctAnswer: "B. 1945" },
  { id: 8, text: "What is the capital of Japan?", options: ["A. Seoul", "B. Beijing", "C. Tokyo", "D. Bangkok"], correctAnswer: "C. Tokyo" },
  { id: 9, text: "Who wrote 'Romeo and Juliet'?", options: ["A. Charles Dickens", "B. William Shakespeare", "C. Jane Austen", "D. Mark Twain"], correctAnswer: "B. William Shakespeare" },
  { id: 10, text: "What is the largest planet in our solar system?", options: ["A. Earth", "B. Mars", "C. Jupiter", "D. Saturn"], correctAnswer: "C. Jupiter" },
  { id: 11, text: "Which country is home to the kangaroo?", options: ["A. New Zealand", "B. South Africa", "C. Australia", "D. Brazil"], correctAnswer: "C. Australia" },
  { id: 12, text: "What is the hardest natural substance on Earth?", options: ["A. Gold", "B. Iron", "C. Diamond", "D. Platinum"], correctAnswer: "C. Diamond" },
  { id: 13, text: "Who is known as the father of modern physics?", options: ["A. Isaac Newton", "B. Albert Einstein", "C. Galileo Galilei", "D. Stephen Hawking"], correctAnswer: "B. Albert Einstein" },
  { id: 14, text: "What is the largest continent by land area?", options: ["A. North America", "B. Africa", "C. Europe", "D. Asia"], correctAnswer: "D. Asia" },
  { id: 15, text: "Which of these is not a primary color?", options: ["A. Red", "B. Blue", "C. Green", "D. Yellow"], correctAnswer: "C. Green" },
];

const QuestionComponent: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(new Array(questions.length).fill(null));
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [score, setScore] = useState(0);

  const query = useQuery();
  const mode = query.get("mode") || "Practice";
  const Class = query.get("class");

  const navigate = useNavigate();

  useEffect(() => {
    calculateScore();
  }, [selectedAnswers]);

  const handleAnswerClick = (answer: string) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion - 1] = answer;
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
    navigate(`/result/${mode}/${Class}`, { state: { score, totalQuestions: questions.length } });
  };

  const calculateScore = () => {
    const newScore = selectedAnswers.reduce((acc, answer, index) => {
      return answer === questions[index].correctAnswer ? acc + 1 : acc;
    }, 0);
    setScore(newScore);
  };

  const getQuestionColor = (questionId: number) => {
    const selectedAnswer = selectedAnswers[questionId - 1];
    const correctAnswer = questions[questionId - 1].correctAnswer;
  
    // Only check the answer in Practice mode
    if (mode === "Practice" && selectedAnswer !== null) {
      // Green if correct, red if wrong
      return selectedAnswer === correctAnswer ? 'success' : 'error';
    }
  
    // Default outline when unanswered
    return 'inherit';
  };

  const getButtonStyles = (questionId:any) => {
    const selectedAnswer = selectedAnswers[questionId - 1];
    const correctAnswer = questions[questionId - 1].correctAnswer;

    if (mode === "Practice" && selectedAnswer !== null) {
      if (selectedAnswer === correctAnswer) {
        return { backgroundColor: 'green', color: 'white' }; // Green for correct
      } else {
        return { backgroundColor: 'red', color: 'white' };   // Red for incorrect
      }
    }
    return {}; // Default style for unanswered or other modes
  };
  

  const currentQuestionData = questions[currentQuestion - 1];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#5C5FC7', padding: '20px' }}>
      <Card sx={{ width: "95vw", height: { xs: '80vh', sm: '60vh', md: '90vh' }, padding: '20px', backgroundColor: '#fff', borderRadius: '20px', position: 'relative', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Button variant="contained" color="success" sx={{ position: 'absolute', top: '15px', right: '15px', height: { xs: '25px', sm: '40px', md: '40px' } }} onClick={handleSubmitClick}>
          Submit
        </Button>

        <Box sx={{ height: "80vh", width: "80vw", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button variant="contained" color="primary" onClick={handlePrev} sx={{ minWidth: { xs: '30px', sm: '30px', md: '50px' }, height: { xs: '30px', sm: '30px', md: '50px' }, borderRadius: '50%', padding:'0px' }}>
            <ArrowBackIcon />
          </Button>

          <Box sx={{ width: '70%', height: '80%', padding: '5px', marginY:'20px', border: '2px solid #5C5FC7', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
              Question {currentQuestionData.id}
            </Typography>
            <Typography sx={{ marginBottom: '5px' }}>{currentQuestionData.text}</Typography>

            <Grid container spacing={2}>
              {currentQuestionData.options.map((answer) => (
                <Grid item xs={6} key={answer}>
                  <Button
                    variant={selectedAnswers[currentQuestion - 1] === answer ? 'contained' : 'outlined'}
                    color={selectedAnswers[currentQuestion - 1] === answer ? 'primary' : 'inherit'}
                    onClick={() => handleAnswerClick(answer)}
                    fullWidth
                  >
                    {answer}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Button variant="contained" color="primary" onClick={handleNext} sx={{ minWidth: { xs: '30px', sm: '30px', md: '50px' }, height: { xs: '30px', sm: '30px', md: '50px' }, borderRadius: '50%', padding:'0px' }}>
            <ArrowForwardIcon />
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexWrap:'wrap', justifyContent: 'center', gap: '10px', marginTop: '10px', padding: '10px' }}>
          {questions.map((question) => (
            <Button
            key={question.id}
            variant={currentQuestion === question.id ? 'contained' : 'outlined'}
            onClick={() => setCurrentQuestion(question.id)} // Navigate between questions
            sx={{
              minWidth: '40px',
              height: '40px',
              borderRadius: '50%',
              fontWeight: 'bold',
              ...getButtonStyles(question.id),  // Apply dynamic styles here
            }}
          >
            {question.id}
          </Button>
          ))}
        </Box>

        <Dialog
          PaperProps={{
            sx: {
              width: '300px',
              height: '300px',
              borderRadius: '20px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },
          }}
          open={isSubmitDialogOpen}
          onClose={handleCloseDialog}
        >
          <Box sx={{ backgroundColor: '#5C5FC7', height: '60px', width: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginY: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)' }}>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>?</Typography>
          </Box>

          <DialogTitle sx={{ textAlign: 'center' }}>Are you sure you want to submit?</DialogTitle>

          <DialogActions sx={{ justifyContent: 'space-around' }}>
            <Button onClick={handleCloseDialog} color="error">No</Button>
            <Button sx={{ color: "green" }} onClick={handleConfirmSubmit}>Yes</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Box>
  );
};

export default QuestionComponent;