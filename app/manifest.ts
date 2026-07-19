import type { MetadataRoute } from "next";
import { EVENT_TITLE } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: EVENT_TITLE,
    short_name: "Vrijgezellenfeest",
    description: "Alles wat je nodig hebt voor het vrijgezellenfeest op 8 augustus 2026.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#1b4332",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
