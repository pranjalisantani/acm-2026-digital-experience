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
  title: "ACM 2026 // Association for Computing Machinery — Digital Experience Prototype",
  description:
    "Official architectural blueprint and digital experience prototype for ACM 2026. Advancing computing as a science and profession with next-generation digital infrastructure.",
  keywords: ["ACM 2026", "Association for Computing Machinery", "Computing", "Computer Science", "Digital Experience", "Research"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030712] text-slate-100 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
