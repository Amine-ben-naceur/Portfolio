import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import {
  PROFILE,
  SKILLS,
  PROJECTS,
  SITE_URL,
} from "@/lib/data";
import SeoContent from "@/components/dom/SeoContent";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const TITLE =
  "Mohamed Amine Ben Naceur — Développeur Full Stack | React, Node.js, VoIP & IA";
const DESCRIPTION =
  "Mohamed Amine Ben Naceur est un développeur Full-Stack basé à Bizerte, Tunisie, spécialisé dans les applications web et mobiles (React, Node.js, React Native), les technologies VoIP (WebRTC, SIP, Asterisk) et les services cloud Firebase. Diplômé de l'ISSAT Mateur, certifié Cisco.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Mohamed Amine Ben Naceur",
  },
  description: DESCRIPTION,
  applicationName: "Portfolio de Mohamed Amine Ben Naceur",
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  publisher: PROFILE.name,
  category: "technology",
  keywords: [
    "Mohamed Amine Ben Naceur",
    "Amine Ben Naceur",
    "Développeur Full Stack",
    "Full Stack Developer",
    "Développeur React",
    "React Native Developer",
    "Node.js Developer",
    "VoIP Developer",
    "WebRTC",
    "SIP",
    "Asterisk",
    "Firebase Developer",
    "2As Project",
    "ISSAT Mateur",
    "Bizerte developer",
    "développeur Tunisie",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    firstName: PROFILE.firstName,
    lastName: "Ben Naceur",
    username: "Amine-ben-naceur",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Portfolio de Mohamed Amine Ben Naceur",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#02010a",
  colorScheme: "dark",
};

/**
 * Rich, linked structured data (schema.org @graph). Answer engines and AI
 * crawlers use this to understand who Amine is, what he does, and what
 * he has built — the backbone of AEO / AI-SEO. Built from the same content
 * data that drives the site so it never drifts out of sync.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PROFILE.name,
      givenName: PROFILE.firstName,
      familyName: "Ben Naceur",
      jobTitle: PROFILE.role,
      description: PROFILE.bio,
      url: `${SITE_URL}/`,
      email: `mailto:${PROFILE.email}`,
      telephone: PROFILE.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bizerte",
        addressCountry: "TN",
      },
      worksFor: {
        "@type": "Organization",
        name: "2As Project",
      },
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "ISSAT Mateur (Institut Supérieur des Sciences Appliquées et de Technologie de Mateur)",
        },
        {
          "@type": "School",
          name: "Lycée Jeune Fille Bizerte",
        },
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: PROFILE.role,
        occupationLocation: {
          "@type": "City",
          name: "Bizerte, Tunisie",
        },
        skills: SKILLS.map((s) => s.items).join(" · "),
      },
      knowsAbout: [
        "React",
        "React Native",
        "Node.js",
        "Express.js",
        "TypeScript",
        "JavaScript",
        "PHP",
        "Python",
        "REST APIs",
        "SQL",
        "Firebase",
        "WebRTC",
        "SIP",
        "Asterisk",
        "VoIP",
        "Docker",
        "Linux",
        "Nginx",
      ],
      sameAs: [PROFILE.socials.github],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Portfolio de Mohamed Amine Ben Naceur",
      description: DESCRIPTION,
      inLanguage: "fr",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      name: TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#projects`,
      name: "Projets de Mohamed Amine Ben Naceur",
      numberOfItems: PROJECTS.length,
      itemListElement: PROJECTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: p.title,
          headline: p.tagline,
          description: p.description,
          keywords: p.tags.join(", "),
          creator: { "@id": `${SITE_URL}/#person` },
          ...(p.link ? { url: p.link } : {}),
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body>
        {children}
        {/* Text alternative to the WebGL experience — full, semantic content
            for screen readers and for AI/search crawlers that don't run JS. */}
        <SeoContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
