import * as React from "react";

export default function useDocumentTitle(title: string) {
  // document.title 	Returns the <title> element
  // this Hook updates the entire webpages title to whatever is passed into it
  React.useEffect(() => {
    document.title = title;
  }, [title]);
}
