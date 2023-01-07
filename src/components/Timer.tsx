import React, { useMemo, useState, useEffect } from 'react';

export const useTimer = (timeAllowed: number) => {
   const [seconds, setSeconds] = useState(0);
   const [isActive, setIsActive] = useState(false);

   const timeRemaining = useMemo(
      () => timeAllowed - seconds,
      [timeAllowed, seconds]
   );
   function toggle() {
      setIsActive(!isActive);
   }

   function reset() {
      setSeconds(0);
      setIsActive(false);
   }

   useEffect(() => {
      let interval: any = null;
      if (isActive) {
         interval = setInterval(() => {
            setSeconds((seconds) => seconds + 1);
         }, 1000);
      } else if (!isActive && seconds !== 0) {
         clearInterval(interval);
      }
      return () => clearInterval(interval);
   }, [isActive, seconds]);

   return { timeRemaining, toggle, reset, isActive };
};

const Timer = ({ timeRemaining }: any) => {
   return <p className="time">{timeRemaining}s</p>;
};

export default Timer;
