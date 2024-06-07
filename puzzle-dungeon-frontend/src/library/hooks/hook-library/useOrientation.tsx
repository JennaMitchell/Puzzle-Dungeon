// `useOrientation` gives you a convenient way to get the current orientation of the user's device.

// It works by listening for the `change` event on [`screen.orientation`](https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation)
//  if the browser supports it, or else it falls back to listen to [`orientationchange`](https://developer.mozilla.org/en-US/docs/Web/API/Window/orientationchange_event)
// on the `window` object if it doesn't.

import * as React from "react";

export default function useOrientation() {
  const [orientation, setOrientation] = React.useState({
    angle: 0,
    type: "UNKNOWN",
  });

  React.useLayoutEffect(() => {
    const handleChange = () => {
      const { angle, type } = window.screen.orientation;
      setOrientation({
        angle,
        type,
      });
    };

    const handle_orientationchange = () => {
      setOrientation({
        type: "UNKNOWN",
        angle: window.orientation,
      });
    };

    if (window.screen?.orientation) {
      handleChange();
      window.screen.orientation.addEventListener("change", handleChange);
    } else {
      handle_orientationchange();
      window.addEventListener("orientationchange", handle_orientationchange);
    }

    return () => {
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener("change", handleChange);
      } else {
        window.removeEventListener(
          "orientationchange",
          handle_orientationchange
        );
      }
    };
  }, []);

  return orientation;
}
