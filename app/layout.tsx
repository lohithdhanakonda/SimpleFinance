import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bharath Financial – Indian Financial Calculators",
  description:
    "Free Indian financial calculators for SIP, FD, RD, EMI, PPF, CAGR, Gratuity and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Bharath Financial",
              url: "https://bharathfinancial.co",
              logo: "https://bharathfinancial.co/favicon.ico",
              description:
                "Bharath Financial provides free Indian financial calculators for SIP, FD, RD, EMI, PPF, CAGR, Gratuity and SWP.",
              sameAs: [],
            }),
          }}
        />

        <div className="min-h-screen flex flex-col">
          {/* HEADER */}
          <header className="py-3 sm:py-5 bg-gray-700 text-white px-4 sm:px-6">
            <Link href="/" className="inline-block">
              <strong className="text-xl cursor-pointer hover:opacity-90">
                Bharath Financial
              </strong>
            </Link>
          </header>

          {/* MAIN CONTENT */}
          <main className="flex-1 p-6 main-content">{children}</main>
          <Analytics />
          {/* FOOTER */}
          <footer className="py-3 text-xs sm:text-sm">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              {/* Disclaimer */}
              <p className="text-center sm:text-left">
                <strong>Disclaimer:</strong> This site provides financial
                calculators for understanding and planning. Results are
                indicative. Please verify details with official sources before
                acting.
              </p>

              {/* Footer links */}
              <div className="flex justify-center sm:justify-end gap-4">
                <Link href="/about" className="underline hover:opacity-80">
                  About
                </Link>
                <Link href="/contact" className="underline hover:opacity-80">
                  Contact
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
