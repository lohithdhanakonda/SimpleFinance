"use client";

import { useState } from "react";
import InternalCalculatorLinks from "@/app/components/InternalCalculatorLinks";
import RDForm from "./RDForm";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export default function RDCalculatorClient() {
  const [forms, setForms] = useState<number[]>([0]);

  const addForm = () => {
    if (forms.length >= 2) return;
    setForms((prev) => [...prev, prev.length]);
  };

  const isSingle = forms.length === 1;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 space-y-6">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "RD Calculator" }]}
      />
      {/* PAGE H1 */}
      <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
        Recurring Deposit (RD) Calculator
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
      <div className="text-xs sm:text-sm text-gray-600 bg-gray-50 border rounded-md p-3">
        <strong>Note on interest rates:</strong> Interest rates shown are
        indicative and based on publicly available information. Rates may change
        over time or vary across banks and branches. You can adjust the interest
        rate using the slider or input field.
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
          <div key={id} className={isSingle ? "w-full max-w-xl" : ""}>
            <RDForm />
          </div>
        ))}
      </div>

      {/* Info box */}
      <div className="mx-auto w-full max-w-4xl bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5 space-y-4 text-sm text-gray-700">
        <h2 className="text-sm sm:text-base font-semibold text-gray-900">
          About Recurring Deposits
        </h2>

        <div>
          <h3 className="font-medium text-gray-800">
            What is a Recurring Deposit?
          </h3>
          <p className="mt-1">
            A Recurring Deposit (RD) is a savings scheme offered by banks where
            a fixed amount is deposited every month for a chosen tenure, earning
            interest over time.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-gray-800">
            How is RD maturity calculated?
          </h3>
          <p className="mt-1">
            Each monthly deposit earns interest for a different duration until
            maturity. The final amount depends on the deposit amount, tenure,
            interest rate, and compounding frequency.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-gray-800">
            Accuracy of this calculator
          </h3>
          <p className="mt-1">
            This calculator provides indicative results for planning purposes.
            Actual RD returns may vary based on bank policies and compounding
            rules.
          </p>
        </div>
      </div>
      <InternalCalculatorLinks
        links={[
          {
            href: "/calculators/fd-calculator",
            label: "Fixed Deposit Calculator",
          },
          { href: "/calculators/sip-calculator", label: "SIP Calculator" },
          { href: "/calculators/ppf-calculator", label: "PPF Calculator" },
        ]}
      />
    </div>
  );
}
