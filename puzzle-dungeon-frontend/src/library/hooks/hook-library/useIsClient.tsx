// useIsClient is useful for determining if it's safe to run certain client-only hooks like useMediaQuery or useLocalStorage.
// It returns a boolean determining if React's useEffect hook has finished running (which means the app is being rendered on the client).
import * as React from "react";

export default function useIsClient() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
