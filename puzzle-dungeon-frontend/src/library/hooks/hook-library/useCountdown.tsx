//useCountdown is a convenient way to create and manage a countdown timer.
// Every interval until endTime, onTick will be invoked. When endTime is reached,
// onComplete will be invoked and the timer will stop.

// Function needs to be worked on

import * as React from "react";

export default function useCountdown(endTime: number, options: any) {
  const [count, setCount] = React.useState<null | number>(null);
  const intervalIdRef = React.useRef<any>(null);

  const handleClearInterval = () => {
    window.clearInterval(intervalIdRef.current);
  };

  React.useEffect(() => {
    setCount(Math.round((endTime - Date.now()) / options.interval));
  }, [endTime, options.interval]);

  React.useEffect(() => {
    if (count) {
      intervalIdRef.current = window.setInterval(() => {
        if (count === 0) {
          handleClearInterval();
          options.onComplete();
        } else {
          setCount(count - 1);
          options.onTick();
        }
      }, options.interval);

      return () => handleClearInterval();
    }
  }, [options, count]);

  return count;
}
