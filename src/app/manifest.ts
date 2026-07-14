import type { MetadataRoute } from "next";
import { PROFILE } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PROFILE.name} — ${PROFILE.role}`,
    short_name: PROFILE.name,
    description: `Portfolio de ${PROFILE.name}, ${PROFILE.role.toLowerCase()} basé à ${PROFILE.location}, spécialisé en applications web/mobiles et VoIP.`,
    start_url: "/",
    display: "standalone",
    background_color: "#02010a",
    theme_color: "#02010a",
    lang: "fr",
    categories: ["portfolio", "technology", "productivity"],
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
