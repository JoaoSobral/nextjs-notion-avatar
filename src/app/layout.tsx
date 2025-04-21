/*
MIT License

Original project: https://github.com/zonemeen/react-notion-avatar (c) 2021 zonemeen and contributors.
This fork and update: (c) 2025 Joao Pedro Goncalves: https://github.com/JoaoSobral/nextjs-notion-avatar
*/
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Notion Avatar Generator",
  description: "A Next.js app for creating Notion-style avatars",
};

/**
 * Root layout for the Next.js app.
 *
 * Wraps the app with global styles and font variables.
 *
 * :param children: The app content.
 * :returns: The root layout as a React component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
