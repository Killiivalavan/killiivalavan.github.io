import type { Metadata } from "next";

// Node.js 22/25+ creates a global localStorage but limits access if missing the --localstorage-file flag.
// Deleting it inside the Next.js process disables this broken behavior and allows SSR packages to fallback gracefully.
if (typeof globalThis !== "undefined" && globalThis.localStorage) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (globalThis as any).localStorage;
  } catch (e) {
    // Ignore if un-deletable
  }
}

import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  weight: ['300', '400', '700', '900'],
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Killiivalavan",
  description: "Developer, Producer, and Thinker. Tinkering with code and music.",
  metadataBase: new URL('https://killiivalavan.github.io'),
  openGraph: {
    title: "Killiivalavan",
    description: "Developer, Producer, and Thinker. Exploring the intersection of tech and art.",
    url: 'https://killiivalavan.github.io',
    siteName: 'Killiivalavan Portfolio',
    images: [
      {
        url: '/images/profile.webp',
        width: 1200,
        height: 630,
        alt: 'Killiivalavan Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Killiivalavan",
    description: "Portfolio",
    creator: '@killiivalavan',
    images: ['/images/profile.webp'],
  },
  icons: {
    icon: [
      {
        url: "/images/favicon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/favicon.png",
        sizes: "16x16",
        type: "image/png",
      }
    ],
    apple: [
      {
        url: "/images/favicon.png",
        sizes: "180x180",
        type: "image/png",
      }
    ],
    shortcut: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable}`} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body suppressHydrationWarning className={`${outfit.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
