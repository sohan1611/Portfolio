import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
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
        },
        "knowsAbout": [
          ...portfolioData.skills.programmingLanguages,
          ...portfolioData.skills.frameworks,
          ...portfolioData.skills.databases,
        ]
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
    <html lang="en" className={`${geist.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <script
          dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }}
        />
      </head>
      <body
        className="font-sans min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary dark"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-card focus:px-4 focus:py-2 focus:text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        >
          Skip to main content
        </a>
        <Navbar />
        <CommandPalette />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
