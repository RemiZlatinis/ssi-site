import type { Metadata } from "next";
import { Geist, Geist_Mono, Bruno_Ace } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const brunoAce = Bruno_Ace({
  variable: "--font-bruno-ace",
  subsets: ["latin"],
  weight: "400",
});

import { Navbar } from "@/components/Navbar";
import { ConditionalFooter } from "@/components/ConditionalFooter";

export const metadata: Metadata = {
  title: "Service Status Indicator (SSI)",
  description:
    "Monitor your infrastructure with a lightweight, open-source agent system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${brunoAce.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <div className="flex-1 flex flex-col h-full">{children}</div>
        <ConditionalFooter />
      </body>
    </html>
  );
}
