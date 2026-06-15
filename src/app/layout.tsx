import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
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

export const metadata: Metadata = {
  title: "Sohan Mandal | Software Engineering Portfolio",
  description: portfolioData.personal.subheadline,
  metadataBase: new URL('https://sohanmandal.com'),
  openGraph: {
    title: "Sohan Mandal | Portfolio",
    description: portfolioData.personal.subheadline,
    url: "https://sohanmandal.com",
    siteName: "Sohan Mandal",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
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
        "@id": "https://sohanmandal.com/#person",
        "name": portfolioData.personal.name,
        "jobTitle": "Software Engineering Intern Candidate",
        "url": "https://sohanmandal.com",
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
        "@id": "https://sohanmandal.com/#website",
        "url": "https://sohanmandal.com",
        "name": "Sohan Mandal Portfolio",
        "publisher": {
          "@id": "https://sohanmandal.com/#person"
        }
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geist.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
