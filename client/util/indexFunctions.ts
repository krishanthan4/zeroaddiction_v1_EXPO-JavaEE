import { MutableRefObject } from 'react';

// Define the types for the refs
type TimerRefs = {
  timerRef: MutableRefObject<NodeJS.Timeout | null>;
  usageTimeRef: MutableRefObject<number>;
  startTimeRef: MutableRefObject<number>;
};

// Custom hook to start the timer
export const useTimer = ({ timerRef, usageTimeRef, startTimeRef }: TimerRefs) => {
  const startTimer = () => {
    startTimeRef.current = Date.now();
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
        usageTimeRef.current = elapsedTime;
      }, 1000);
    }
  };

  // Optional: You could return the timer status or additional control functions
  return { startTimer };
};
