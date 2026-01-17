import type { Metadata } from "next";
import GratuityCalculator from "./GratuityClient";

export const metadata: Metadata = {
  title: "Gratuity Calculator – Calculate Gratuity Amount as per Indian Law",
  description:
    "Use this gratuity calculator to estimate the gratuity amount payable based on last drawn salary and years of service, as per the Payment of Gratuity Act, 1972.",
};

export default function GratuityCalculatorPage() {
  return (
    <div className="px-3 sm:px-6">
      <GratuityCalculator />
    </div>
  );
}
