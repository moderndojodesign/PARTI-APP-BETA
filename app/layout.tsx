import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://parti.app"),
  title: {
    default: "PARTI — The Operating System for Civic Engagement",
    template: "%s · PARTI",
  },
  description:
    "Politics, finally explained. PARTI is a hybrid social platform and civic operating system — legislation, politicians, and power, contextualized for your life.",
  openGraph: {
    title: "PARTI — The Operating System for Civic Engagement",
    description:
      "Politics, finally explained. A civic operating system for the informed citizen.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen bg-parchment font-sans antialiased">
        <SiteNav />
        <main className="pb-24">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
