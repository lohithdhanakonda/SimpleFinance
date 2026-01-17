"use client";

import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Breadcrumbs from "@/app/components/Breadcrumbs";

/* ---------- Helpers ---------- */
function formatCurrency(v: number) {
  return v.toLocaleString("en-IN");
}

function calculatePPF(annual: number, rate: number, years: number) {
  let balance = 0;
  for (let i = 1; i <= years; i++) {
    balance = (balance + annual) * (1 + rate / 100);
  }
  return balance;
}

/* ---------- Component ---------- */
export default function PPFCalculator() {
  const [annual, setAnnual] = useState(150000);
  const [rate, setRate] = useState(7.1);
  const [years, setYears] = useState(15);

  const maturity = calculatePPF(annual, rate, years);
  const invested = annual * years;

  return (
    <div
      className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-xl
                 bg-white border rounded-lg
                 px-4 sm:px-6 py-6 space-y-6"
    >
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "PPF Calculator" }]}
      />
      {/* H1 */}
      <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
        PPF Calculator
      </h1>

      {/* Annual Contribution */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Annual Contribution (₹)
        </label>
        <input
          type="number"
          value={annual}
          onChange={(e) => setAnnual(Number(e.target.value))}
          className="border rounded-md p-2 w-full text-sm"
        />
      </div>

      {/* Investment Duration */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Investment Duration:{" "}
          <span className="font-semibold">{years} years</span>
        </label>
        <Slider
          min={15}
          max={50}
          step={1}
          value={years}
          onChange={(v) => setYears(v as number)}
        />
        <p className="text-xs text-gray-500">
          Minimum lock-in period is 15 years. Extensions allowed thereafter.
        </p>
      </div>

      {/* Interest Rate */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Interest Rate (%): <span className="font-semibold">{rate}</span>
        </label>
        <Slider
          min={6}
          max={8}
          step={0.1}
          value={rate}
          onChange={(v) => setRate(v as number)}
        />
      </div>

      {/* Result */}
      <div className="border-t pt-4 text-sm space-y-1">
        <p>
          <strong>Total Invested:</strong> ₹{formatCurrency(invested)}
        </p>
        <p>
          <strong>Maturity Amount:</strong> ₹
          {formatCurrency(Math.round(maturity))}
        </p>
      </div>

      {/* Info box */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5 space-y-4 text-sm text-gray-700">
        <h2 className="text-sm font-semibold text-gray-900">
          About Public Provident Fund (PPF)
        </h2>

        <p>
          Public Provident Fund (PPF) is a government-backed long-term savings
          scheme in India offering guaranteed returns and tax benefits under
          Section 80C.
        </p>

        <p>
          PPF has a mandatory lock-in period of 15 years. After maturity, the
          account can be extended in blocks of 5 years with or without further
          contributions.
        </p>

        <p>
          This calculator provides an indicative estimate assuming constant
          annual contribution and interest rate. Actual returns may vary based
          on official rate revisions.
        </p>
      </div>
    </div>
  );
}
