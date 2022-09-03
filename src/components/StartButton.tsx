import React, { useState } from 'react';
import { Difficulty, fetchQuizQuestions } from '../API';

export type AnswerObject = {
   question: string;
   answer: string;
   correct: boolean;
   correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

interface IStartButton {
   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
   setQuestions: React.Dispatch<React.SetStateAction<any>>;
   setUserAnswers: React.Dispatch<React.SetStateAction<any>>;
   setNumber: React.Dispatch<React.SetStateAction<any>>;
   setScore: React.Dispatch<React.SetStateAction<any>>;
   setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
   toggleTimer: () => void;
}
const StartButton = ({
   setLoading,
   setQuestions,
   setUserAnswers,
   setNumber,
   setScore,
   setGameOver,
   toggleTimer,
}: IStartButton) => {
   const startTrivia = async () => {
      setLoading(true);
      setGameOver(false);

      const newQuestions = await fetchQuizQuestions(
         TOTAL_QUESTIONS,
         Difficulty.EASY
      );
      toggleTimer();
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
   };

   return (
      <button className="start" onClick={startTrivia}>
         Start
      </button>
   );
};

export default StartButton;
