import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import QuestionComponent from '../components/QuestionComponent';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Questions = () => {

  const query = useQuery();
  const mode = query.get("mode");
  const Class = query.get("class");

  const [selectedMode, setSelectedMode] = useState(mode)
  const [selectedClass, setSelectedClass] = useState(Class)

  useEffect(() => {
    // fetch question paper w.r.t selectedMode and selectedClass.
    console.log(selectedMode, selectedClass)
  }, [])

  return (
    <div>
      {/* <QuestionComponent /> */}
    </div>
  )
}

export default Questions
