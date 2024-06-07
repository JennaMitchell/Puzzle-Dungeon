// `useEventListener` gives you a simple way to add event listeners to a target element.

import * as React from "react";

export default function useEventListener(
  target: HTMLElement,
  eventName: string,
  handler: () => void,
  options: any
) {
  React.useEffect(() => {
    if (!target?.addEventListener) return;

    target.addEventListener(eventName, handler, options);

    return () => {
      target.removeEventListener(eventName, handler, options);
    };
  }, [target, eventName, options, handler]);
}
