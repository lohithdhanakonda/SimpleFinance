import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import TextConstants from "./config/constants/textConstants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simple Finance",
  description: "Your friendly financial planner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col">
          {/* HEADER */}
          <header className="py-5 bg-gray-700 text-white px-6">
            <Link href="/" className="inline-block">
              <strong className="text-xl cursor-pointer hover:opacity-90">
                {TextConstants.title}
              </strong>
            </Link>
          </header>

          {/* MAIN CONTENT */}
          <main className="flex-1 p-6 main-content">{children}</main>
          <Analytics />
          {/* FOOTER */}
          <footer className="py-3 bg-gray-700 text-center text-white text-sm px-6">
            <strong>Disclaimer:</strong> This site provides financial
            calculators for understanding and planning. Results are indicative.
            Please verify details with official sources before acting.
          </footer>
        </div>
      </body>
    </html>
  );
}
