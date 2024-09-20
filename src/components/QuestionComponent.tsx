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
  { id: 3, text: "Who painted the famous artwork 'The Starry Night'?", options: ["A. Leonardo da Vinci", "B. Vincent van Gogh", "C. Claude Monet", "D. Pablo Picasso"], correctAnswer: "B. Vincent van Gogh" },
  { id: 4, text: "What is the chemical symbol for gold?", options: ["A. Ag", "B. Au", "C. Hg", "D. Pb"], correctAnswer: "B. Au" },
  { id: 5, text: "Which author wrote 'To Kill a Mockingbird'?", options: ["A. F. Scott Fitzgerald", "B. Harper Lee", "C. Jane Austen", "D. J.K. Rowling"], correctAnswer: "B. Harper Lee" },
  { id: 6, text: "What is the largest mammal on Earth?", options: ["A. Elephant", "B. Blue whale", "C. Hippopotamus", "D. Rhinoceros"], correctAnswer: "B. Blue whale" },
  { id: 7, text: "Which musician is known as the 'King of Rock and Roll'?", options: ["A. Chuck Berry", "B. Elvis Presley", "C. Little Richard", "D. Jerry Lee Lewis"], correctAnswer: "B. Elvis Presley" },
  { id: 8, text: "What is the smallest country in the world?", options: ["A. Vatican City", "B. Monaco", "C. Nauru", "D. Tuvalu"], correctAnswer: "A. Vatican City" },
  { id: 9, text: "Who was the first president of the United States?", options: ["A. George Washington", "B. Thomas Jefferson", "C. Abraham Lincoln", "D. Franklin D. Roosevelt"], correctAnswer: "A. George Washington" },
  { id: 10, text: "What is the highest mountain peak in the solar system?", options: ["A. Mount Everest", "B. Olympus Mons", "C. Denali", "D. Kilimanjaro"], correctAnswer: "B. Olympus Mons" },
  { id: 11, text: "Which element is the lightest in the periodic table?", options: ["A. Hydrogen", "B. Helium", "C. Oxygen", "D. Nitrogen"], correctAnswer: "A. Hydrogen" },
  { id: 12, text: "Who wrote the famous novel '1984'?", options: ["A. George Orwell", "B. Aldous Huxley", "C. Ray Bradbury", "D. Joseph Heller"], correctAnswer: "A. George Orwell" },
  { id: 13, text: "What is the largest living species of lizard?", options: ["A. Komodo dragon", "B. Saltwater crocodile", "C. Black mamba", "D. Green anaconda"], correctAnswer: "A. Komodo dragon" },
  { id: 14, text: "Which artist created the famous sculpture 'David'?", options: ["A. Michelangelo", "B. Leonardo da Vinci", "C. Raphael", "D. Donatello"], correctAnswer: "A. Michelangelo" },
  { id: 15, text: "What is the process by which plants convert sunlight into energy?", options: ["A. Respiration", "B. Photosynthesis", "C. Decomposition", "D. Fermentation"], correctAnswer: "B. Photosynthesis" },
  { id: 16, text: "What is the capital of Japan?", options: ["A. Seoul", "B. Beijing", "C. Tokyo", "D. Bangkok"], correctAnswer: "C. Tokyo" },
  { id: 17, text: "Which gas do plants absorb from the atmosphere?", options: ["A. Oxygen", "B. Carbon Dioxide", "C. Nitrogen", "D. Helium"], correctAnswer: "B. Carbon Dioxide" },
  { id: 18, text: "What is the hardest natural substance on Earth?", options: ["A. Gold", "B. Iron", "C. Diamond", "D. Sapphire"], correctAnswer: "C. Diamond" },
  { id: 19, text: "Which ocean is the largest?", options: ["A. Atlantic", "B. Indian", "C. Arctic", "D. Pacific"], correctAnswer: "D. Pacific" },
  { id: 20, text: "Who discovered penicillin?", options: ["A. Marie Curie", "B. Alexander Fleming", "C. Louis Pasteur", "D. Isaac Newton"], correctAnswer: "B. Alexander Fleming" },
  { id: 21, text: "What is the tallest building in the world?", options: ["A. Taipei 101", "B. Burj Khalifa", "C. One World Trade Center", "D. Willis Tower"], correctAnswer: "B. Burj Khalifa" },
  { id: 22, text: "Which animal is known as the 'Ship of the Desert'?", options: ["A. Horse", "B. Camel", "C. Elephant", "D. Donkey"], correctAnswer: "B. Camel" },
  { id: 23, text: "What is the capital city of Australia?", options: ["A. Sydney", "B. Melbourne", "C. Canberra", "D. Brisbane"], correctAnswer: "C. Canberra" },
  { id: 24, text: "Which planet is known for its rings?", options: ["A. Jupiter", "B. Saturn", "C. Neptune", "D. Uranus"], correctAnswer: "B. Saturn" },
  { id: 25, text: "In which year did the Titanic sink?", options: ["A. 1912", "B. 1905", "C. 1915", "D. 1920"], correctAnswer: "A. 1912" },
  { id: 26, text: "What is the main ingredient in guacamole?", options: ["A. Tomato", "B. Avocado", "C. Onion", "D. Pepper"], correctAnswer: "B. Avocado" },
  { id: 27, text: "Who is known as the Father of Geometry?", options: ["A. Euclid", "B. Pythagoras", "C. Archimedes", "D. Descartes"], correctAnswer: "A. Euclid" },
  { id: 28, text: "Which famous scientist developed the theory of relativity?", options: ["A. Isaac Newton", "B. Albert Einstein", "C. Galileo Galilei", "D. Nikola Tesla"], correctAnswer: "B. Albert Einstein" },
  { id: 29, text: "What is the main language spoken in Brazil?", options: ["A. Spanish", "B. English", "C. Portuguese", "D. French"], correctAnswer: "C. Portuguese" },
  { id: 30, text: "What is the largest continent on Earth?", options: ["A. Africa", "B. Asia", "C. North America", "D. Antarctica"], correctAnswer: "B. Asia" },
  { id: 31, text: "Who wrote the play 'Romeo and Juliet'?", options: ["A. Charles Dickens", "B. William Shakespeare", "C. Mark Twain", "D. Jane Austen"], correctAnswer: "B. William Shakespeare" },
  { id: 32, text: "What is the boiling point of water?", options: ["A. 90°C", "B. 100°C", "C. 120°C", "D. 150°C"], correctAnswer: "B. 100°C" },
  { id: 33, text: "Which planet is closest to the sun?", options: ["A. Venus", "B. Earth", "C. Mercury", "D. Mars"], correctAnswer: "C. Mercury" },
  { id: 34, text: "What is the currency of Japan?", options: ["A. Yen", "B. Dollar", "C. Euro", "D. Peso"], correctAnswer: "A. Yen" },
  { id: 35, text: "What is the largest organ in the human body?", options: ["A. Heart", "B. Brain", "C. Skin", "D. Liver"], correctAnswer: "C. Skin" },
  { id: 36, text: "Which planet is known for its Great Red Spot?", options: ["A. Venus", "B. Jupiter", "C. Saturn", "D. Neptune"], correctAnswer: "B. Jupiter" },
  { id: 37, text: "What is the capital of Italy?", options: ["A. Rome", "B. Milan", "C. Venice", "D. Florence"], correctAnswer: "A. Rome" },
  { id: 38, text: "What is the longest river in the world?", options: ["A. Amazon", "B. Nile", "C. Yangtze", "D. Mississippi"], correctAnswer: "B. Nile" },
    { id: 39, text: "Which vitamin is primarily obtained from sunlight?", options: ["A. Vitamin A", "B. Vitamin B12", "C. Vitamin C", "D. Vitamin D"], correctAnswer: "D. Vitamin D" },
    { id: 40, text: "What is the main language spoken in Egypt?", options: ["A. Arabic", "B. French", "C. English", "D. Spanish"], correctAnswer: "A. Arabic" },
    { id: 41, text: "Who wrote the famous book 'Pride and Prejudice'?", options: ["A. Charlotte Brontë", "B. Jane Austen", "C. Emily Dickinson", "D. Louisa May Alcott"], correctAnswer: "B. Jane Austen" },
    { id: 42, text: "What is the currency of the European Union?", options: ["A. Pound", "B. Dollar", "C. Euro", "D. Franc"], correctAnswer: "C. Euro" },
    { id: 43, text: "What is the most widely spoken language in the world?", options: ["A. English", "B. Mandarin Chinese", "C. Spanish", "D. Hindi"], correctAnswer: "B. Mandarin Chinese" },
    { id: 44, text: "Which planet has the most moons?", options: ["A. Earth", "B. Mars", "C. Jupiter", "D. Saturn"], correctAnswer: "C. Jupiter" },
    { id: 45, text: "Who was the first woman to fly solo across the Atlantic Ocean?", options: ["A. Amelia Earhart", "B. Bessie Coleman", "C. Harriet Quimby", "D. Jacqueline Cochran"], correctAnswer: "A. Amelia Earhart" }]


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
    
        const darkTextColor = '#000000';
    
        if (mode === "Practice Test") {
          if (selectedAnswer) {
            if (answer === correctAnswer) {
              return { backgroundColor: 'green', color: darkTextColor, fontWeight: 'bold' };
            }
            if (answer === selectedAnswer && answer !== correctAnswer) {
              return { backgroundColor: 'red', color: darkTextColor, fontWeight: 'bold' };
            }
          }
        } else if (!submitted) {
          if (answer === selectedAnswer) {
            return { backgroundColor: 'blue', color: 'white', fontWeight: 'bold' };
          }
        } if (submitted) {
          if (answer === correctAnswer) {
            return { backgroundColor: 'green', color: darkTextColor, fontWeight: 'bold' };
          }
          if (answer === selectedAnswer && answer !== correctAnswer) {
            return { backgroundColor: 'red', color: darkTextColor, fontWeight: 'bold' };
          }
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
      
            {submitted && (
              <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold', position: 'absolute', top: '10px', textAlign: 'center' }}>
                Your score: {score} out of {questions.length}
              </Typography>
            )}
      
            {mode === "Practice Test" && !submitted ? (
              <Box sx={{ height: "80vh", width: "80vw", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Button variant="contained" color="primary" onClick={handlePrev} disabled={currentQuestion === 1} sx={{ fontSize: '1.25rem', padding: '15px 20px' }}>
                    <ArrowBackIcon />
                  </Button>
      
                  <Typography sx={{ fontSize: '1.5rem' }}>
                    {`Question ${currentQuestion} of ${questions.length}`}
                  </Typography>
      
                  <Button variant="contained" color="primary" onClick={handleNext} disabled={currentQuestion === questions.length} sx={{ fontSize: '1.25rem', padding: '15px 20px' }}>
                    <ArrowForwardIcon />
                  </Button>
                </Box>
      
                {renderQuestion(questions[currentQuestion - 1], currentQuestion - 1)}
      
                {currentQuestion === questions.length && (
                  <Button 
                    variant="contained" 
                    color="success" 
                    sx={{ mt: 3, fontSize: '1.25rem', padding: '15px 20px' }} 
                    onClick={handleConfirmSubmit}
                  >
                    Submit
                  </Button>
                )}
              </Box>
            ) : null}
      
            {(!submitted && mode !== "Practice Test") || submitted ? (
              <Box sx={{ height: "80vh", width: "80vw", overflowY: 'scroll', padding: '30px' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => navigate('/')}
                  sx={{ mb: 2, fontSize: '1.25rem', padding: '15px 20px' }}
                >
                  <ArrowBackIcon />
                </Button>
                {questions.map((question, index) => renderQuestion(question, index))}
      
                {!submitted && (
                  <Button 
                    variant="contained" 
                    color="success" 
                    sx={{ mt: 3, fontSize: '1.25rem', padding: '15px 20px' }} 
                    onClick={handleConfirmSubmit}
                  >
                    Submit
                  </Button>
                )}
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