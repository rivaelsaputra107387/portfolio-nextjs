"use client";

import { useEffect, useState } from "react";

export default function FaviconLink() {
  const [faviconUrl, setFaviconUrl] = useState("/favicon.ico");

  useEffect(() => {
    async function fetchFavicon() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          if (data && data.favicon_url) {
            setFaviconUrl(data.favicon_url);
          }
        }
      } catch (err) {
        // Fallback to default favicon.ico
      }
    }
    fetchFavicon();
  }, []);

  return <link rel="icon" href={faviconUrl} />;
}
