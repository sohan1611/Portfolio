import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { portfolioData } from "@/data/portfolio";

const geist = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist",
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: 'swap',
});

const siteUrl = portfolioData.personal.siteUrl;

export const metadata: Metadata = {
  title: "Sohan Mandal | Software Engineering Portfolio",
  description: portfolioData.personal.subheadline,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sohan Mandal | Portfolio",
    description: portfolioData.personal.subheadline,
    url: siteUrl,
    siteName: "Sohan Mandal",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sohan Mandal | Portfolio",
    description: portfolioData.personal.subheadline,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export const viewport: Viewport = {
  themeColor: "#0B0F14",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        "name": portfolioData.personal.name,
        "jobTitle": "Software Engineering Intern Candidate",
        "url": siteUrl,
        "sameAs": [
          portfolioData.personal.linkedin,
          portfolioData.personal.github
        ],
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "KIIT University"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Sohan Mandal Portfolio",
        "publisher": {
          "@id": `${siteUrl}/#person`
        }
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geist.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary dark`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
