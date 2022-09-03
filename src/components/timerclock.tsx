import React from 'react';
import { useState, useEffect } from 'react';

//timer function

interface State {
   time: number;
   seconds: number;
   minutes: number;
}

const Timer = () => {
   const [state, setState] = React.useState<State>({
      time: 60,
      seconds: 0,
      minutes: 1,
   });

   // one minute in milliseconds
   const oneMinute = 60;

   const [timeRemaining, setTimeRemaining] = useState(oneMinute);

   useEffect(() => {
      setInterval(() => {
         console.log('hello');
         setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
   }, []);

   return (
      <h2>
         {timeRemaining}
         {/* TIME:{' '}
         {`${state.minutes}: ${
            state.seconds <= 10 ? `0${state.seconds}` : state.seconds
         }`} */}
      </h2>
   );
};

export default Timer;
