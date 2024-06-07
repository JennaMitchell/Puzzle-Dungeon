// useInterval provides a convenient way to create and manage intervals in React.
// Using window.setInterval under the hood, useInterval repeatedly invokes a provided
// callback function at a specified interval and automatically clears the interval when the component using useInterval is removed from the DOM.

import * as React from "react";

// MAKE USE OF useReducer useEffectEvent is in ALPHA

export default function useInterval(cb: any, ms: number) {
  const id: any = React.useRef(null);
  const [state, dispatch] = React.useReducer(cb, {});

  const handleClearInterval = React.useCallback(() => {
    if (id) {
      window.clearInterval(id.current);
    }
  }, []);
  // Always wrap intervals in useCallback so that it is unique to the instance

  React.useEffect(() => {
    id.current = window.setInterval(() => {
      dispatch();
    }, ms);
    return handleClearInterval;
  }, [ms, handleClearInterval]);

  return handleClearInterval;
}
