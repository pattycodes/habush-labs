import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import PasswordGate from "@/components/password-gate";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "HABUSH.LABS",
  description: "apps, software & marketing. done right.",
  openGraph: {
    title: "HABUSH.LABS",
    description: "apps, software & marketing. done right.",
    siteName: "HABUSH.LABS",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HABUSH.LABS",
    description: "apps, software & marketing. done right.",
    images: ["/og-image.png"],
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
        <PasswordGate>
          {children}
        </PasswordGate>
        <Analytics />
      </body>
    </html>
  );
}
