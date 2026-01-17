"use client";

import Breadcrumbs from "@/app/components/Breadcrumbs";
import { useState } from "react";

function formatCurrency(v: number) {
  return v.toLocaleString("en-IN");
}

export default function CAGRCalculator() {
  const [initial, setInitial] = useState(100000);
  const [final, setFinal] = useState(200000);
  const [years, setYears] = useState(5);

  const cagr =
    initial > 0 && years > 0
      ? (Math.pow(final / initial, 1 / years) - 1) * 100
      : 0;

  return (
    <div
      className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-xl 
                    bg-white border rounded-lg 
                    px-4 sm:px-6 py-6 space-y-6"
    >
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "CAGR Calculator" }]}
      />

      {/* H1 */}
      <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
        CAGR Calculator
      </h1>

      {/* Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Initial Value (₹)
          </label>
          <input
            type="number"
            value={initial}
            onChange={(e) => setInitial(Number(e.target.value))}
            className="border rounded-md p-2 sm:p-3 w-full text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Final Value (₹)
          </label>
          <input
            type="number"
            value={final}
            onChange={(e) => setFinal(Number(e.target.value))}
            className="border rounded-md p-2 sm:p-3 w-full text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Investment Duration (Years)
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="border rounded-md p-2 sm:p-3 w-full text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Result */}
      <div className="border-t pt-4">
        <p className="text-sm">
          <strong>CAGR:</strong>{" "}
          <span className="text-base font-semibold">{cagr.toFixed(2)}%</span>{" "}
          per year
        </p>
      </div>

      {/* Info box */}
      <div
        className="bg-gray-50 border border-gray-200 rounded-lg 
                      p-4 sm:p-5 text-sm text-gray-700 space-y-3"
      >
        <h2 className="text-sm font-semibold text-gray-900">About CAGR</h2>

        <p>
          CAGR (Compound Annual Growth Rate) represents the annualized rate at
          which an investment grows over a specific period, assuming consistent
          yearly growth.
        </p>

        <p>
          It helps compare long-term performance of investments such as stocks,
          mutual funds, or portfolios, even when durations differ.
        </p>

        <p>
          CAGR does not reflect year-to-year volatility. Actual returns may vary
          due to market conditions.
        </p>

        <p>
          This calculator provides an indicative CAGR based on the values
          entered and does not consider intermediate cash flows.
        </p>
      </div>
    </div>
  );
}
