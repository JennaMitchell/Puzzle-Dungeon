// useIntervalWhen is useful for creating an interval timer that can be controlled based on a certain condition (when). It allows you to specify a callback function to be executed at a regular interval every ms milliseconds.

// Additionally, you can choose whether the interval should startImmediately or wait ms milliseconds (as is the default with useInterval).

import * as React from "react";

export default function useIntervalWhen(
  cb: () => void,
  {
    ms,
    when,
    startImmediately,
  }: { ms: number; when: Boolean; startImmediately: boolean }
) {
  const id = React.useRef<number | null>(null);

  const immediatelyCalled = React.useRef(
    startImmediately === true ? false : null
  );

  const handleClearInterval = React.useCallback(() => {
    if (id.current) {
      window.clearInterval(id.current);
      immediatelyCalled.current = false;
    }
  }, []);

  React.useEffect(() => {
    if (when === true) {
      id.current = window.setInterval(cb, ms);

      if (startImmediately === true && immediatelyCalled.current === false) {
        cb();
        immediatelyCalled.current = true;
      }

      return handleClearInterval;
    }
  }, [ms, when, startImmediately, handleClearInterval, cb]);

  return handleClearInterval;
}
