import { useEffect } from "react";

/**
 * Sets the document title and meta description for a route.
 * Restores the previous values on unmount so navigation stays clean.
 */
export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    let prevDesc: string | null = null;
    let descMeta: HTMLMetaElement | null = null;
    if (description) {
      descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        prevDesc = descMeta.getAttribute("content");
        descMeta.setAttribute("content", description);
      }
    }

    return () => {
      document.title = prevTitle;
      if (descMeta && prevDesc !== null) {
        descMeta.setAttribute("content", prevDesc);
      }
    };
  }, [title, description]);
}