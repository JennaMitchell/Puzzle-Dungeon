//  when the user clicks outside of the modal
// (the dialog element), the callback function passed to useClickAway is invoked which will then hide the modal.

import * as React from "react";

export default function useClickAway(cb: () => void) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref) {
      document.addEventListener("mousedown", cb);
      document.addEventListener("touchstart", cb);

      return () => {
        document.removeEventListener("mousedown", cb);
        document.removeEventListener("touchstart", cb);
      };
    }
  }, [cb]);

  return ref;
}
