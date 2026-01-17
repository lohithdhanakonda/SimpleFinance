"use client";

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
    <div className="max-w-3xl mx-auto p-6 space-y-4 bg-white border rounded-lg">
      <h2 className="text-lg font-semibold">CAGR Calculator</h2>

      <div>
        <label>Initial Value (₹)</label>
        <input
          type="number"
          value={initial}
          onChange={(e) => setInitial(Number(e.target.value))}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Final Value (₹)</label>
        <input
          type="number"
          value={final}
          onChange={(e) => setFinal(Number(e.target.value))}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Investment Duration (Years)</label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          className="border p-2 w-full"
        />
      </div>

      <div className="border-t pt-4">
        <p>
          <strong>CAGR:</strong> {cagr.toFixed(2)}% per year
        </p>
      </div>
    </div>
  );
}
