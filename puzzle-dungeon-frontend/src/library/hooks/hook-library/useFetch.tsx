//useFetch allows you to easily fetch data from a specified url using the browser's fetch API and provides a consistent pattern
// for handling success (data) and error states. It also incorporates an internal caching mechanism to store and retrieve previously fetched data
//as well as a mechanism to ignore stale responses if the component
//unmounts or if a new request is made before the previous one completes.

import * as React from "react";

const initialState = {
  error: undefined,
  data: undefined,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "loading":
      return { ...initialState };
    case "fetched":
      return { ...initialState, data: action.payload };
    case "error":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default function useFetch(url: string, options: any) {
  const cacheRef = React.useRef<any>({});

  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    if (typeof url !== "string") return;

    let ignore = false;

    const fetchData = async () => {
      const cachedResponse = cacheRef.current[url];

      if (cachedResponse) {
        dispatch({ type: "fetched", payload: cachedResponse });
        return;
      }

      dispatch({ type: "loading" });

      try {
        const res = await fetch(url, options);

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const json = await res.json();
        cacheRef.current[url] = json;

        if (ignore === false) {
          dispatch({ type: "fetched", payload: json });
        }
      } catch (e) {
        if (ignore === false) {
          dispatch({ type: "error", payload: e });
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return state;
}
