import type { Metadata } from "next";
import PPFCalculator from "./PPFCalculator";

export const metadata: Metadata = {
  title: "PPF Calculator | Calculate Public Provident Fund Returns",
  description:
    "Use this PPF calculator to estimate maturity amount, total investment, and returns for Public Provident Fund based on annual contribution and interest rate.",
};

export default function Page() {
  return (
    <div className="px-3 sm:px-6">
      <PPFCalculator />
    </div>
  );
}
