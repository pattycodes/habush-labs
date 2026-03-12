import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "HABUSH LABS — App & Marketing Studio",
  description:
    "We build apps, software, and market brands. A subsidiary of H3AT Studios.",
  openGraph: {
    title: "HABUSH LABS — App & Marketing Studio",
    description:
      "We build apps, software, and market brands. A subsidiary of H3AT Studios.",
    siteName: "HABUSH LABS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HABUSH LABS — App & Marketing Studio",
    description:
      "We build apps, software, and market brands. A subsidiary of H3AT Studios.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
