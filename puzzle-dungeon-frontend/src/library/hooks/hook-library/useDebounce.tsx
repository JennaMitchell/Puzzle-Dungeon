// The `useDebounce` hook is useful for
// delaying the execution of functions or state updates until a specified
// time period has passed without any further changes to the debounced
// value. This is especially useful in scenarios such as handling user
// input or triggering network requests, where it effectively reduces
// unnecessary computations and ensures that resource-intensive operations
//are only performed after a pause in the input activity.

// This hook works by taking in two arguments, `value` and `delay`. `value`
// is the value you want to debounce, and `delay` is the amount of milliseconds you want to wait before updating the `value`.

import * as React from "react";

export default function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
}
