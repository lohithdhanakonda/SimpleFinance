import type { Metadata } from "next";
import EMICalculator from "./EmiCalculatorClient";

export const metadata: Metadata = {
  title: "EMI Calculator – Calculate Loan EMI, Interest & Total Payment",
  description:
    "Use this EMI calculator to estimate your monthly loan EMI, total interest payable, and total payment based on loan amount, interest rate, and tenure.",
};

export default function EMICalculatorPage() {
  return (
    <div className="px-3 sm:px-6">
      <EMICalculator />
    </div>
  );
}
