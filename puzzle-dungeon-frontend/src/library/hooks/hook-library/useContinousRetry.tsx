// useContinuousRetry allows you to repeatedly call a
// specified callback function at a defined interval until the callback
// returns a truthy value, indicating a successful resolution. This hook is
// particularly handy when dealing with asynchronous operations or API
// calls that may fail temporarily and need to be retried automatically.

import * as React from "react";

export default function useContinuousRetry(
  callback: () => boolean,
  interval = 100,
  numberOfRetries = Infinity
) {
  const [hasResolved, setHasResolved] = React.useState(false);

  React.useEffect(() => {
    let retries = 0;

    const id = window.setInterval(() => {
      if (callback()) {
        setHasResolved(true);
        window.clearInterval(id);
      } else if (retries >= numberOfRetries) {
        window.clearInterval(id);
      } else {
        retries += 1;
      }
    }, interval);

    return () => window.clearInterval(id);
  }, [interval, numberOfRetries, callback]);

  return hasResolved;
}
