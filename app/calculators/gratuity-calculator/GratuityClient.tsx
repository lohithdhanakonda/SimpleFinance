"use client";

import Breadcrumbs from "@/app/components/Breadcrumbs";
import { useState } from "react";

/* ---------- Helpers ---------- */
function formatCurrency(v: number) {
  return v.toLocaleString("en-IN");
}

/* ---------- Component ---------- */
export default function GratuityCalculatorClient() {
  const [salary, setSalary] = useState(50000);
  const [years, setYears] = useState(10);

  const gratuity = (salary * 15 * years) / 26;

  return (
    <div
      className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-xl
                 bg-white border rounded-lg
                 px-4 sm:px-6 py-6 space-y-6"
    >
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Gratuity Calculator" }]}
      />
      {/* H1 */}
      <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
        Gratuity Calculator
      </h1>

      {/* Salary */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Last Drawn Monthly Salary (Basic + DA) (₹)
        </label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          className="border rounded-md p-2 sm:p-3 w-full text-sm sm:text-base"
        />
      </div>

      {/* Years */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Years of Service
        </label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          className="border rounded-md p-2 sm:p-3 w-full text-sm sm:text-base"
        />
      </div>

      {/* Result */}
      <div className="border-t pt-4 text-sm">
        <p>
          <strong>Estimated Gratuity Amount:</strong> ₹
          {formatCurrency(Math.round(gratuity))}
        </p>
      </div>

      {/* Info box */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5 space-y-4 text-sm text-gray-700">
        <h2 className="text-sm font-semibold text-gray-900">
          About Gratuity Calculation
        </h2>

        <p>
          Gratuity is a lump sum amount paid by an employer to an employee as a
          recognition of long-term service, governed by the Payment of Gratuity
          Act, 1972.
        </p>

        <p>
          Gratuity is calculated using the formula:
          <br />
          <span className="font-medium">
            (Last drawn salary × 15 × years of service) ÷ 26
          </span>
        </p>

        <p>
          This calculator provides an indicative estimate. Actual gratuity
          payable may vary based on eligibility criteria, statutory limits, and
          employer-specific policies.
        </p>
      </div>
    </div>
  );
}
