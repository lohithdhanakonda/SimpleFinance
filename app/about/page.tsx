import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Bharath Financial – Free Indian Financial Calculators",
  description:
    "Learn about Bharath Financial, a platform providing free Indian financial calculators for SIP, FD, RD, EMI, PPF, CAGR, and more.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white border rounded-lg">
      <h1 className="text-xl font-semibold">About Bharath Financial</h1>

      <p className="text-sm text-gray-700">
        Bharath Financial is an independent platform built to help Indian
        individuals understand, plan, and calculate their finances using
        simple, transparent, and easy-to-use tools.
      </p>

      <p className="text-sm text-gray-700">
        The platform provides free financial calculators such as SIP, Fixed
        Deposit (FD), Recurring Deposit (RD), EMI, PPF, CAGR, SWP, and Gratuity
        calculators. These tools are designed for clarity and practical
        financial planning.
      </p>

      <p className="text-sm text-gray-700">
        Bharath Financial is focused on Indian financial products, taxation
        structures, and savings instruments. All calculators provide
        indicative results for educational and planning purposes only.
      </p>

      <p className="text-sm text-gray-700">
        This platform does not sell financial products or offer investment
        advice. Users are encouraged to verify details with official sources
        or consult qualified financial professionals before making decisions.
      </p>
    </div>
  );
}
