import type { Metadata } from "next";
import SWPCalculatorClient from "./SWPCalculator";

export const metadata: Metadata = {
  title: "SWP Calculator – Systematic Withdrawal Plan Calculator",
  description:
    "Calculate monthly withdrawals, total withdrawals, and remaining corpus using this SWP (Systematic Withdrawal Plan) calculator. Ideal for retirement and regular income planning.",
};

export default function SWPCalculatorPage() {
  return (
    <div className="px-3 sm:px-6">
      <SWPCalculatorClient />
    </div>
  );
}
