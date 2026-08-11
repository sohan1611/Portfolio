import type { MetadataRoute } from "next";

import { portfolioData } from "@/data/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  const { name, subheadline } = portfolioData.personal;

  return {
    name: `${name} Portfolio`,
    short_name: name,
    description: subheadline,
    start_url: "/",
    display: "standalone",
    background_color: "#0B0F14",
    theme_color: "#0B0F14",
  };
}
