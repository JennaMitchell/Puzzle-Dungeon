// useCounter is a hook for managing a numeric counter value.
// It allows you to specify a min and max value, then gives you
// helper methods (increment, decrement, set, and reset) for managing the value.

import * as React from "react";

export default function useCounter(
  startingValue = 0,
  options = { min: 0, max: 1 }
) {
  const { min, max } = options;

  if (typeof min === "number" && startingValue < min) {
    throw new Error(
      `Your starting value of ${startingValue} is less than your min of ${min}.`
    );
  }

  if (typeof max === "number" && startingValue > max) {
    throw new Error(
      `Your starting value of ${startingValue} is greater than your max of ${max}.`
    );
  }

  const [count, setCount] = React.useState(startingValue);

  const increment = React.useCallback(() => {
    setCount((c) => {
      const nextCount = c + 1;

      if (typeof max === "number" && nextCount > max) {
        return c;
      }

      return nextCount;
    });
  }, [max]);

  const decrement = React.useCallback(() => {
    setCount((c) => {
      const nextCount = c - 1;

      if (typeof min === "number" && nextCount < min) {
        return c;
      }

      return nextCount;
    });
  }, [min]);

  const set = React.useCallback(
    (nextCount: number) => {
      setCount((c) => {
        if (typeof max === "number" && nextCount > max) {
          return c;
        }

        if (typeof min === "number" && nextCount < min) {
          return c;
        }

        return nextCount;
      });
    },
    [max, min]
  );

  const reset = React.useCallback(() => {
    setCount(startingValue);
  }, [startingValue]);

  return [
    count,
    {
      increment,
      decrement,
      set,
      reset,
    },
  ];
}
