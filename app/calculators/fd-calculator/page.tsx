"use client";

import { useState } from "react";
import FDForm from "./FDForm";

export default function FDCalculator() {
  const [forms, setForms] = useState<number[]>([0]);

  const addForm = () => {
    if (forms.length >= 2) return;
    setForms((prev) => [...prev, prev.length]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-4">

      {/* Header row with Add button */}
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
      <div className="text-sm text-gray-600 bg-gray-50 border rounded-md p-3">
        <strong>Note on interest rates:</strong>{" "}
        Fixed Deposit interest rates shown are indicative and based on publicly
        available information. Actual rates may vary based on tenure, payout
        option, and bank policies. Use the slider or input field to adjust the
        interest rate based on your assumptions.
      </div>

      {/* Forms */}
      <div
        className={`grid gap-6 ${
          forms.length === 1 ? "grid-cols-1" : "grid-cols-2"
        }`}
      >
        {forms.map((id) => (
          <FDForm key={id} />
        ))}
      </div>
    </div>
  );
}
