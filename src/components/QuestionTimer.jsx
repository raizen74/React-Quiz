import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return () => {  // executed before useEffect is run again or before QuestionTimer component is unmounted from the DOM
      clearTimeout(timer);
    };
  }
  , [onTimeout, timeout]); // this useEffect function reexecutes if
  // any dependency changes (onTimeout or timeout) 

  useEffect(() => { // executes after <progress/> is rendered
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {  // executed before useEffect is run again or before QuestionTimer component is unmounted from the DOM
      clearInterval(interval);
    };
  }, []); // since [] is empty -> useEffect only executes once

  return <progress id='question-time' max={timeout} value={remainingTime} />;
}
