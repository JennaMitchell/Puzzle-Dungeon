// useRandomInterval is useful for executing a specified callback function at random intervals within a specified range.

import * as React from "react";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function useRandomInterval(
  cb: () => void,
  { minDelay, maxDelay }: { minDelay: number; maxDelay: number }
) {
  const timeoutId = React.useRef<null | any>(null);

  const handleClearTimeout = React.useCallback(() => {
    if (timeoutId) {
      window.clearTimeout(timeoutId.current);
    }
  }, []);

  React.useEffect(() => {
    const tick = () => {
      const interval = getRandomNumber(minDelay, maxDelay);
      timeoutId.current = window.setTimeout(() => {
        cb();
        tick();
      }, interval);
    };

    tick();

    return handleClearTimeout;
  }, [minDelay, maxDelay, handleClearTimeout, timeoutId, cb]);

  return handleClearTimeout;
}
