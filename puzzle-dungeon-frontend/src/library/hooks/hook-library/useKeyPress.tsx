//useKeyPress gives you a convenient way to listen for key presses on a specific target.
//It defaults to adding an event listener for the keydown event on window, but allows the user to customize that via its third options argument.

import * as React from "react";

export default function useKeyPress(
  key: string,
  cb: () => void,
  options = { event: null, target: null, eventOptions: {} }
) {
  const { event = "keydown", target = window ?? null, eventOptions } = options;

  React.useEffect(() => {
    if (target && event) {
      const handler = (event: any) => {
        if (event.key === key) {
          cb();
        }
      };

      target.addEventListener(event, handler, eventOptions);

      return () => {
        target.removeEventListener(event, handler, eventOptions);
      };
    }
  }, [key, target, event, eventOptions, cb]);
}
