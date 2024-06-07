// useTimeout provides a convenient way to create and manage timeouts in React. Using window.setTimeout under the hood,
// useTimeout invokes a provided callback
//  function after ms milliseconds and automatically clears the
// timeout when the component using useTimeout is removed from the DOM.

import * as React from "react";

export default function useTimeout(cb: any, ms: number) {
  const id: any = React.useRef(null);
  const [state, dispatch] = React.useReducer(cb, 0);

  const handleClearTimeout = React.useCallback(() => {
    if (id) {
      window.clearTimeout(id.current);
    }
  }, []);

  React.useEffect(() => {
    id.current = window.setTimeout(dispatch, ms);

    return handleClearTimeout;
  }, [ms, handleClearTimeout]);

  return handleClearTimeout;
}
