// usePageLeave is useful for tracking when a user leaves or navigates away from a web page.
//  It works by listening to the document's mouseout event under the hood.

import * as React from "react";

export default function usePageLeave(cb: () => void) {
  React.useEffect(() => {
    const onLeave = (event: any) => {
      const to = event.relatedTarget || event.toElement;
      if (!to || to.nodeName === "HTML") {
        cb();
      }
    };
    document.addEventListener("mouseout", onLeave);

    return () => {
      document.removeEventListener("mouseout", onLeave);
    };
  }, [cb]);
}
