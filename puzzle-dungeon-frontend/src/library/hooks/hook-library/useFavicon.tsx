// #  `useFavicon` allows you to dynamically update the document's favicon.
import * as React from "react";

type linkType = HTMLLinkElement | null;

export default function useFavicon(url: any) {
  React.useEffect(() => {
    let link: linkType = document.querySelector(`link[rel~="icon"]`);

    if (!link) {
      const newLink = document.createElement("link");
      if (newLink) {
        newLink.type = "image/x-icon";
        newLink.rel = "icon";
        newLink.href = url;
        document.head.appendChild(newLink);
      }
    } else {
      link.href = url;
    }
  }, [url]);
}
