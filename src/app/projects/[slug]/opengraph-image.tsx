import { ImageResponse } from "next/og";

import { portfolioData } from "@/data/portfolio";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sohan Mandal project";

type ImageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioData.projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const project = portfolioData.projects.find((item) => item.slug === slug);
  const title = project?.title ?? portfolioData.personal.name;
  const secondaryLine = project
    ? `${project.status} · ${project.technologies[0]}`
    : `${portfolioData.education[0].degree} @ ${portfolioData.education[0].institution}`;
  const siteUrl = portfolioData.personal.siteUrl.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          background: "linear-gradient(180deg, #0B0F14 0%, #111827 100%)",
          boxSizing: "border-box",
          color: "#E5E7EB",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "80px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              background: "#344055",
              height: "1px",
              marginBottom: "38px",
              width: "72px",
            }}
          />
          <div
            style={{
              color: "#F3F4F6",
              fontSize: "76px",
              fontWeight: 700,
              letterSpacing: "-3px",
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "#9CA9BC",
              fontSize: "29px",
              letterSpacing: "-0.4px",
              marginTop: "24px",
            }}
          >
            {secondaryLine}
          </div>
        </div>
        <div
          style={{
            color: "#77859A",
            fontSize: "22px",
            letterSpacing: "0.2px",
          }}
        >
          {siteUrl}
        </div>
      </div>
    ),
    size,
  );
}
