"use client";

import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import InternalCalculatorLinks from "@/app/components/InternalCalculatorLinks";
import Breadcrumbs from "@/app/components/Breadcrumbs";

function formatCurrency(v: number) {
  return v.toLocaleString("en-IN");
}
function parseNumber(v: string) {
  return Number(v.replace(/,/g, ""));
}

function calculateEMI(P: number, r: number, n: number) {
  const monthlyRate = r / 100 / 12;
  const months = n * 12;

  const emi =
    (P * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  const interest = totalPayment - P;

  return { emi, interest, totalPayment };
}

export default function EMICalculator() {
  const [amountInput, setAmountInput] = useState("10,00,000");
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(20);

  const principal = parseNumber(amountInput);
  const result = calculateEMI(principal, rate, years);

  return (
    <div
      className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-xl
                 bg-white border rounded-lg
                 px-4 sm:px-6 py-6 space-y-6"
    >
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "EMI Calculator" }]}
      />
      {/* H1 */}
      <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
        EMI Calculator
      </h1>

      {/* Loan Amount */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Loan Amount (₹)
        </label>
        <input
          value={amountInput}
          onChange={(e) =>
            setAmountInput(formatCurrency(parseNumber(e.target.value)))
          }
          className="border rounded-md p-2 sm:p-3 w-full text-sm sm:text-base"
        />
      </div>

      {/* Interest Rate */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Interest Rate (%): <span className="font-semibold">{rate}</span>
        </label>
        <Slider
          min={5}
          max={20}
          step={0.1}
          value={rate}
          onChange={(v) => setRate(v as number)}
        />
      </div>

      {/* Tenure */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Loan Tenure: <span className="font-semibold">{years}</span> years
        </label>
        <Slider
          min={1}
          max={30}
          value={years}
          onChange={(v) => setYears(v as number)}
        />
      </div>

      {/* Results */}
      <div className="border-t pt-4 text-sm space-y-1">
        <p>
          <strong>Monthly EMI:</strong> ₹
          {formatCurrency(Math.round(result.emi))}
        </p>
        <p>
          <strong>Total Interest:</strong> ₹
          {formatCurrency(Math.round(result.interest))}
        </p>
        <p>
          <strong>Total Payment:</strong> ₹
          {formatCurrency(Math.round(result.totalPayment))}
        </p>
      </div>
      <InternalCalculatorLinks
        links={[
          { href: "/calculators/sip-calculator", label: "SIP Calculator" },
          {
            href: "/calculators/fd-calculator",
            label: "Fixed Deposit Calculator",
          },
        ]}
      />
    </div>
  );
}
