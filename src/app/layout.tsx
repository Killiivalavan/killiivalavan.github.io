import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Killiivalavan",
  description: "Personal portfolio website showcasing projects, skills, and experience",
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
