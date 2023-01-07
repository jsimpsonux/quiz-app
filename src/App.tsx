import React, { useEffect, useState } from 'react';
// Components
import QuestionCard from './components/QuestionCard';
// Types
import { QuestionState } from './API';
import Timer, { useTimer } from './components/Timer';

import StartButton from './components/StartButton';

export type AnswerObject = {
   question: string;
   answer: string;
   correct: boolean;
   correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;
const TIME_ALLOWED = 5;

const App = () => {
   const [loading, setLoading] = useState(false);
   const [questions, setQuestions] = useState<QuestionState[]>([]);
   const [number, setNumber] = useState(0);
   const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
   const [score, setScore] = useState(0);
   const [gameOver, setGameOver] = useState(true);

   const { timeRemaining, toggle, reset, isActive } = useTimer(TIME_ALLOWED);

   const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!gameOver) {
         //Users answer
         const answer = e.currentTarget.value;
         // Check answer against correct answer
         const correct = questions[number].correct_answer === answer;
         // Add score if answer is correct
         if (correct) setScore((prev) => prev + 1);
         // Save answer in the array for user answers
         const answerObject = {
            question: questions[number].question,
            answer,
            correct,
            correctAnswer: questions[number].correct_answer,
         };
         setUserAnswers((prev) => [...prev, answerObject]);
         console.log({ answerObject });
      }
   };

   const nextQuestion = () => {
      // Move on to the next question if not the last question
      const nextQuestion = number + 1;

      if (nextQuestion === TOTAL_QUESTIONS) {
         setGameOver(true);
      } else {
         setNumber(nextQuestion);
      }
   };

   useEffect(() => {
      // If the timer reaches 0, the game is over
      if (timeRemaining <= 0) {
         setGameOver(true);
      }
   }, [timeRemaining]);

   return (
      <div className="App">
         <h1>REACT QUIZ</h1>
         {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
            <StartButton
               setLoading={setLoading}
               setQuestions={setQuestions}
               setUserAnswers={setUserAnswers}
               setNumber={setNumber}
               setScore={setScore}
               setGameOver={setGameOver}
               toggleTimer={toggle}
            />
         )}

         {!gameOver ? <p className="score">Score: {score}</p> : null}
         {loading && <p>Loading Questions...</p>}
         {!loading && !gameOver && (
            <QuestionCard
               questionNr={number + 1}
               totalQuestions={TOTAL_QUESTIONS}
               question={questions[number].question}
               answers={questions[number].answers}
               userAnswer={userAnswers ? userAnswers[number] : undefined}
               callback={checkAnswer}
            />
         )}
         {!gameOver &&
         !loading &&
         userAnswers.length === number + 1 &&
         number !== TOTAL_QUESTIONS - 1 ? (
            <button className="next" onClick={nextQuestion}>
               Next Question
            </button>
         ) : null}
         <Timer
            timeRemaining={timeRemaining}
            isActive={isActive}
            toggle={toggle}
            reset={reset}
         />
      </div>
   );
};

export default App;
