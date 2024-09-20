import React from 'react';
import Homepage from './pages/Homepage';
import Test from './pages/Test';
import { ThemeProvider } from '@emotion/react';
import { apptheme } from './components/apptheme';
import { CssBaseline } from '@mui/material';
import Questions from './pages/Questions';
import QuestionComponent from './components/QuestionComponent'; // Import the question component
import TestResult from './pages/TestResult'; // Import the test result component

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <ThemeProvider theme={apptheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/test' element={<Test />} />
          <Route path='/questions' element={<Questions />} />
          <Route path="/result/:mode/:selectedClass" element={<TestResult />} />
        </Routes>
      </Router>

    </ThemeProvider>
  );
}

export default App;
