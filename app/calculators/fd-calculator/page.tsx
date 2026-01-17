import type { Metadata } from "next";
import FDCalculatorClient from "./FDCalculatorClient";

export const metadata: Metadata = {
  title: "FD Calculator – Fixed Deposit Maturity & Interest Calculator",
  description:
    "Use this FD calculator to estimate fixed deposit maturity amount, interest earned, and compare FD returns across banks with adjustable interest rates.",
};

export default function FDCalculatorPage() {
  return (
    <div className="px-3 sm:px-6">
      <FDCalculatorClient />
    </div>
  );
}
