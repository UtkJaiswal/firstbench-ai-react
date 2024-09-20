import React, { useState } from "react";
import TestDisplayWindow from "../components/PracticeTestWindow";
import { useLocation } from "react-router-dom";
import FinalTestWindow from "../components/FinalTestWindow";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Test = () => {
  const query = useQuery();
  const mode = query.get("mode");
  const Class = query.get("class");

  return (
    <>
      {mode == "Practice Test" ? (
        <TestDisplayWindow Class={Class} />
      ) : (
        <FinalTestWindow Class={Class} />
      )}
    </>
  );
};

export default Test;
