import type { Metadata } from "next";
import SIPCalculatorClient from "./SIPCalculator";

export const metadata: Metadata = {
  title: "SIP Calculator – Mutual Fund SIP & Step-Up SIP Calculator",
  description:
    "Use this SIP calculator to estimate mutual fund returns with or without step-up SIP. Calculate total investment, returns, and final corpus based on expected annual returns.",
};

export default function SIPCalculatorPage() {
  return (
    <div className="px-3 sm:px-6">
      <SIPCalculatorClient />
    </div>
  );
}
