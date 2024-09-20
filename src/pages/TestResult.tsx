import React from 'react';
import { useParams } from 'react-router-dom';
import PracticeResultWindow from '../components/PracticeResultWindow'; // Import your result window component

const TestResult: React.FC = () => {
  const { mode, selectedClass } = useParams<{ mode: string; selectedClass: string }>();

  return (
    <div>
      {/* Render the result window */}
      <PracticeResultWindow />
    </div>
  );
};

export default TestResult;
