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
  description: "Personal portfolio website.",
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
