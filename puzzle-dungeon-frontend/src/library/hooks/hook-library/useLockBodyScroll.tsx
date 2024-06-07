// The useLockBodyScroll hook temporarily
// disables scrolling on the document. This can be beneficial in scenarios
// where you want to restrict scrolling while displaying a modal, a
// dropdown menu, or any other component that requires the user’s focus.
// Once the component using useLockBodyScroll is removed from
// the DOM, the original overflow style should be reapplied, ensuring that
// the scroll behavior is reverted to its previous state.
import * as React from "react";

export default function useLockBodyScroll() {
  React.useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
}
