"use client";

import { useState } from "react";
import InternalCalculatorLinks from "@/app/components/InternalCalculatorLinks";
import FDForm from "./FDForm";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export default function FDCalculatorClient() {
  const [forms, setForms] = useState<number[]>([0]);

  const addForm = () => {
    if (forms.length >= 2) return;
    setForms((prev) => [...prev, prev.length]);
  };

  const isSingle = forms.length === 1;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 space-y-6">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "FD Calculator" }]}
      />
      {/* PAGE H1 */}
      <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
        Fixed Deposit (FD) Calculator
      </h1>

      {/* Add comparison */}
      <div className="flex justify-end">
        {forms.length < 2 && (
          <button
            onClick={addForm}
            className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-100"
          >
            + Add bank for comparison
          </button>
        )}
      </div>

      {/* Rates disclaimer */}
      <div className="text-sm text-gray-600 bg-gray-50 border rounded-md p-4">
        <strong>Note on interest rates:</strong> Fixed Deposit interest rates
        shown are indicative and based on publicly available information. Actual
        rates may vary depending on tenure, compounding frequency, and bank
        policies. You can manually adjust the interest rate using the slider or
        input field.
      </div>

      {/* Forms */}
      <div
        className={
          isSingle
            ? "flex justify-center"
            : "grid grid-cols-1 md:grid-cols-2 gap-6"
        }
      >
        {forms.map((id) => (
          <div key={id} className={isSingle ? "w-full max-w-lg" : ""}>
            <FDForm />
          </div>
        ))}
      </div>

      {/* Info / SEO Section */}
      <div className="mt-10 mx-auto w-full max-w-4xl">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 sm:p-6 space-y-4 text-sm text-gray-700">
          <h2 className="text-base font-semibold text-gray-900">
            About Fixed Deposits
          </h2>

          <p>
            A Fixed Deposit (FD) is a lump-sum investment option offered by
            banks where money is deposited for a fixed tenure and earns interest
            at a predetermined rate.
          </p>

          <p>
            Interest on fixed deposits is usually compounded quarterly or
            annually, depending on the bank and payout option selected. The
            maturity amount depends on the deposit amount, tenure, interest
            rate, and compounding frequency.
          </p>

          <p>
            This FD calculator provides indicative results for planning
            purposes. Actual maturity values may differ based on bank-specific
            rules, premature withdrawal conditions, and interest rate changes.
          </p>
        </div>
      </div>
      <InternalCalculatorLinks
        links={[
          {
            href: "/calculators/rd-calculator",
            label: "Recurring Deposit Calculator",
          },
          { href: "/calculators/ppf-calculator", label: "PPF Calculator" },
          { href: "/calculators/cagr-calculator", label: "CAGR Calculator" },
        ]}
      />
    </div>
  );
}
