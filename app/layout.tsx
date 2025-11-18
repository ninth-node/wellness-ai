import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BeautyAI Platform - The AI That Reads Skin Better Than Dermatologists",
  description: "Transform your salon or spa with AI that predicts skin issues, automates perfect product matches, and runs itself while you focus on beautiful results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
