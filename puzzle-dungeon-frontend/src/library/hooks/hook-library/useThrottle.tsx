// useThrottle gives you control over how often a value is updated.
// It accepts a value and an optional interval and returns a throttled value that will only be updated at most every interval milliseconds.

import * as React from "react";

export default function useThrottle(value: any, interval = 500) {
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastUpdated = React.useRef<null | any>(null);

  React.useEffect(() => {
    const now = Date.now();

    if (lastUpdated.current && now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      setThrottledValue(value);
    } else {
      const id = window.setTimeout(() => {
        lastUpdated.current = now;
        setThrottledValue(value);
      }, interval);

      return () => window.clearTimeout(id);
    }
  }, [value, interval]);

  return throttledValue;
}
