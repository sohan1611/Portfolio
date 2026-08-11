import { ImageResponse } from "next/og";

import { portfolioData } from "@/data/portfolio";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  const initials = portfolioData.personal.name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("");

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0B0F14",
          color: "#F3F4F6",
          display: "flex",
          fontSize: 256,
          fontWeight: 800,
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {initials}
      </div>
    ),
    size,
  );
}
