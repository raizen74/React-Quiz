import { useState, useCallback } from "react";
// useCallback hook ensures that new functions ARE NOT RECREATED unless any of its dependencies change

import QUESTIONS from "../questions.js";
// import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]); // store user answers

  const activeQuestionIndex = userAnswers.length; // derived state
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length; // bool, quiz is over

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
    }, [] // update state based on the previous state // handleSelectAnswer recreates after moving to next question
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer] // if handleSelectAnswer changes (state change), triggers reevaluation of the function
  );

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers}/>
  }

  // key prop is accepted by all components, when it changes React recreates the component
  return (
    <div id='quiz'>
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
