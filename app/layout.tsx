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
  title: "GDGoC IET DAVV - Tech Unleash 4.0 Registration Form (Session 2026-27)",
  description: "Official Google Developer Groups on Campus (GDGoC) Tech Unleash 4.0 Registration Form for Institute of Engineering & Technology, DAVV Indore (Session 2026-27).",
  icons: {
    icon: [
      { url: '/tech.png', type: 'image/png' },
    ],
    shortcut: '/tech.png',
    apple: '/tech.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/tech.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/tech.png" type="image/png" />
        <link rel="apple-touch-icon" href="/tech.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#e6edf5] text-[#0B1B3D] selection:bg-[#0B1B3D] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
