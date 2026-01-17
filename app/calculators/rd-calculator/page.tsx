import type { Metadata } from "next";
import RDCalculatorClient from "./RDCalculatorClient";

export const metadata: Metadata = {
  title: "RD Calculator – Recurring Deposit Maturity Calculator",
  description:
    "Use this RD calculator to estimate recurring deposit maturity amount, total investment, and returns. Compare RD returns across banks with adjustable interest rates.",
};

export default function RDCalculatorPage() {
  return (
    <div className="px-3 sm:px-6">
      <RDCalculatorClient />
    </div>
  );
}
